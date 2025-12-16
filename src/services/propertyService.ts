import { createServerSupabaseClient } from '@/lib/supabase';
import { Property, PropertyFeature, PropertyImage } from '../types';
import { NotFoundError, DatabaseError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';

const supabase = createServerSupabaseClient();

export interface CreatePropertyData {
    title: string;
    description: string;
    address: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
    price_per_hour: number;
    price_per_day: number;
    min_booking_hours: number;
    max_guests: number;
    features: string[];
    host_id: string;
}

export interface PropertySearchFilters {
    city?: string;
    region?: string;
    maxPricePerHour?: number;
    minGuests?: number;
    features?: string[];
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    page?: number;
    limit?: number;
}

export class PropertyService {
    /**
     * Crear una nueva propiedad
     */
    static async createProperty(data: CreatePropertyData): Promise<Property> {
        const { data: property, error } = await supabase
            .from('properties')
            .insert({
                title: data.title,
                description: data.description,
                address: data.address,
                city: data.city,
                region: data.region,
                location: `POINT(${data.longitude} ${data.latitude})`, // PostGIS format
                price_per_hour: data.price_per_hour,
                price_per_day: data.price_per_day,
                min_booking_hours: data.min_booking_hours,
                max_guests: data.max_guests,
                host_id: data.host_id,
            })
            .select()
            .single();

        if (error) {
            throw new DatabaseError(`Error al crear la propiedad: ${error.message}`);
        }

        if (!property) {
            throw new DatabaseError('No se pudo crear la propiedad');
        }

        // Añadir características de la propiedad
        if (data.features.length > 0) {
            await this.addPropertyFeatures(property.id, data.features);
        }

        return property;
    }

    /**
     * Obtener una propiedad por ID
     */
    static async getPropertyById(id: string): Promise<Property> {
        const { data: property, error } = await supabase
            .from('properties')
            .select(`
        *,
        property_features (feature),
        property_images (id, image_url, is_primary),
        users!properties_host_id_fkey (id, name, email)
      `)
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Propiedad');
            }
            throw new DatabaseError(`Error al obtener la propiedad: ${error.message}`);
        }

        return property;
    }

    /**
     * Buscar propiedades con filtros y paginación
     */
    static async searchProperties(filters: PropertySearchFilters): Promise<PaginatedResponse<Property>> {
        const { page, limit, offset } = calculatePagination({
            page: filters.page,
            limit: filters.limit
        });

        let query = supabase
            .from('properties')
            .select(`
        *,
        property_features (feature),
        property_images (id, image_url, is_primary)
      `, { count: 'exact' });

        // Aplicar filtros
        if (filters.city) {
            query = query.ilike('city', `%${filters.city}%`);
        }
        if (filters.region) {
            query = query.eq('region', filters.region);
        }
        if (filters.maxPricePerHour) {
            query = query.lte('price_per_hour', filters.maxPricePerHour);
        }
        if (filters.minGuests) {
            query = query.gte('max_guests', filters.minGuests);
        }

        // Búsqueda geoespacial
        if (filters.latitude && filters.longitude && filters.radiusKm) {
            const radiusMeters = filters.radiusKm * 1000;
            const { data: radiusFilteredProperties, error: radiusError } = await supabase.rpc('properties_within_radius', {
                lat: filters.latitude,
                lng: filters.longitude,
                radius_meters: radiusMeters,
            });

            if (radiusError) {
                throw new DatabaseError(`Error en búsqueda geoespacial: ${radiusError.message}`);
            }

            if (radiusFilteredProperties && radiusFilteredProperties.length > 0) {
                query = query.in('id', radiusFilteredProperties.map((property: { id: string }) => property.id));
            } else {
                // No hay propiedades en el radio especificado
                return createPaginatedResponse([], 0, page, limit);
            }
        }

        // Aplicar paginación
        query = query.range(offset, offset + limit - 1);

        const { data: properties, error, count } = await query;

        if (error) {
            throw new DatabaseError(`Error al buscar propiedades: ${error.message}`);
        }

        // Filtrar por características si se especifican
        let filteredProperties = properties || [];
        if (filters.features && filters.features.length > 0) {
            filteredProperties = filteredProperties.filter(property =>
                filters.features!.every(feature =>
                    property.property_features.some((pf: PropertyFeature) => pf.feature === feature)
                )
            );
        }

        return createPaginatedResponse(filteredProperties, count || 0, page, limit);
    }

    /**
     * Actualizar una propiedad por ID
     */
    static async updateProperty(id: string, data: Partial<CreatePropertyData>): Promise<Property> {
        const { data: updatedProperty, error } = await supabase
            .from('properties')
            .update({
                title: data.title,
                description: data.description,
                address: data.address,
                city: data.city,
                region: data.region,
                location: data.latitude && data.longitude ? `POINT(${data.longitude} ${data.latitude})` : undefined,
                price_per_hour: data.price_per_hour,
                price_per_day: data.price_per_day,
                min_booking_hours: data.min_booking_hours,
                max_guests: data.max_guests,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Propiedad');
            }
            throw new DatabaseError(`Error al actualizar la propiedad: ${error.message}`);
        }

        // Actualizar características si se proporcionan
        if (data.features) {
            await supabase.from('property_features').delete().eq('property_id', id);
            await this.addPropertyFeatures(id, data.features);
        }

        return updatedProperty;
    }

    /**
     * Eliminar una propiedad por ID
     */
    static async deleteProperty(id: string): Promise<void> {
        const { error } = await supabase.from('properties').delete().eq('id', id);

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Propiedad');
            }
            throw new DatabaseError(`Error al eliminar la propiedad: ${error.message}`);
        }
    }

    /**
     * Añadir características a una propiedad
     */
    private static async addPropertyFeatures(propertyId: string, features: string[]): Promise<void> {
        if (features.length === 0) return;

        const featureData = features.map(feature => ({
            property_id: propertyId,
            feature,
        }));

        const { error } = await supabase
            .from('property_features')
            .insert(featureData);

        if (error) {
            throw new DatabaseError(`Error al añadir características: ${error.message}`);
        }
    }

    /**
     * Asociar una imagen a una propiedad
     */
    static async addPropertyImage(propertyId: string, imageKey: string, isPrimary: boolean): Promise<PropertyImage> {
        const { data: propertyImage, error } = await supabase
            .from('property_images')
            .insert({
                property_id: propertyId,
                image_url: imageKey,
                is_primary: isPrimary,
            })
            .select()
            .single();

        if (error) {
            throw new DatabaseError(`Error al añadir imagen: ${error.message}`);
        }

        if (!propertyImage) {
            throw new DatabaseError('No se pudo añadir la imagen');
        }

        return propertyImage;
    }

    /**
     * Eliminar una imagen de una propiedad
     */
    static async removePropertyImage(imageId: string): Promise<void> {
        const { error } = await supabase
            .from('property_images')
            .delete()
            .eq('id', imageId);

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Imagen');
            }
            throw new DatabaseError(`Error al eliminar imagen: ${error.message}`);
        }
    }

    /**
     * Verificar disponibilidad de una propiedad para fechas específicas
     */
    static async checkAvailability(propertyId: string, checkIn: string, checkOut: string): Promise<boolean> {
        // Verificar que la propiedad existe
        await this.getPropertyById(propertyId);

        // Buscar reservas que se superpongan con las fechas solicitadas
        const { data: overlappingBookings, error } = await supabase
            .from('bookings')
            .select('id')
            .eq('property_id', propertyId)
            .in('status', ['confirmed', 'pending'])
            .or(`and(check_in.lte.${checkOut},check_out.gte.${checkIn})`);

        if (error) {
            throw new DatabaseError(`Error al verificar disponibilidad: ${error.message}`);
        }

        // Si no hay reservas superpuestas, la propiedad está disponible
        return !overlappingBookings || overlappingBookings.length === 0;
    }

    /**
     * Obtener propiedades de un host específico
     */
    static async getHostProperties(hostId: string): Promise<Property[]> {
        const { data: properties, error } = await supabase
            .from('properties')
            .select(`
                *,
                property_features (feature),
                property_images (id, image_url, is_primary)
            `)
            .eq('host_id', hostId)
            .order('created_at', { ascending: false });

        if (error) {
            throw new DatabaseError(`Error al obtener propiedades del host: ${error.message}`);
        }

        return properties || [];
    }
}
