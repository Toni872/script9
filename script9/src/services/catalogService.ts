import { createServerSupabaseClient } from '@/lib/supabase';
import { Service, DatabaseProperty } from '../types';
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

export interface ServiceSearchFilters {
    category?: string; // mapped to city/region in DB for now
    maxPrice?: number;
    minCapacity?: number; // mapped to max_guests
    technologies?: string[]; // mapped to features
    page?: number;
    limit?: number;
}

export class CatalogService {
    /**
     * Crear un nuevo servicio
     */
    /**
     * Crear un nuevo servicio
     */
    static async createService(data: CreatePropertyData): Promise<Service> {
        // Implementation pending full backend refactor, keep placeholder
        // Mapping creation to 'properties' table
        const { data: service, error } = await supabase
            .from('properties')
            .insert({
                title: data.title,
                description: data.description,
                price_per_hour: data.price_per_hour, // Store fixed price in price_per_hour column
                max_guests: data.max_guests,  // Store capacity in max_guests
                host_id: data.host_id,
                // Add other mapped fields if necessary
            })
            .select()
            .single();

        if (error) throw new DatabaseError(`Error al crear el servicio: ${error.message}`);
        return this.mapToService(service as unknown as DatabaseProperty);
    }

    /**
     * Helper to map DB Property to Service
     */
    private static mapToService(dbRecord: DatabaseProperty): Service {
        return {
            id: dbRecord.id,
            title: dbRecord.title,
            description: dbRecord.description,
            price: dbRecord.price_per_hour, // Map DB column to 'price'
            unit: 'project', // Fixed unit
            category: dbRecord.property_type || 'General',
            provider_id: dbRecord.host_id,
            host_id: dbRecord.host_id, // Compatibility
            image_urls: dbRecord.images || dbRecord.property_images?.map(img => img.image_url) || [],
            features: dbRecord.property_features?.map((f) => ({ id: f.feature, name: f.feature })) || [],

            // Legacy/Compat fields
            price_per_hour: dbRecord.price_per_hour,
            location: dbRecord.address,
            city: dbRecord.city,
            region: dbRecord.region,
            latitude: dbRecord.latitude,
            longitude: dbRecord.longitude,
            rating: dbRecord.average_rating || 0,
            review_count: dbRecord.review_count || 0,
            created_at: dbRecord.created_at,
            updated_at: dbRecord.updated_at,
            is_script9_select: dbRecord.is_script9_select,
        } as Service;
    }

    /**
     * Obtener un servicio por ID
     */
    /**
     * Obtener un servicio por ID
     */
    static async getServiceById(id: string): Promise<Service> {
        // TEMPORARY: Force mock data as requested
        // const { getMockServiceById } = require('@/lib/mockData');
        // const mockService = getMockServiceById(id);
        // if (mockService) {
        //     return mockService;
        // }

        const { data: record, error } = await supabase
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
                throw new NotFoundError('Servicio');
            }
            throw new DatabaseError(`Error al obtener el servicio: ${error.message}`);
        }

        return this.mapToService(record as unknown as DatabaseProperty);
    }

    /**
     * Buscar servicios con filtros
     */
    /**
     * Buscar servicios con filtros
     */
    static async searchServices(filters: ServiceSearchFilters): Promise<PaginatedResponse<Service>> {
        // TEMPORARY: Force mock data as requested by user ("only one test service")
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
        if (filters.maxPrice) {
            query = query.lte('price_per_hour', filters.maxPrice);
        }

        query = query.range(offset, offset + limit - 1);

        const { data: records, error, count } = await query;

        if (error) {
            throw new DatabaseError(`Error al buscar servicios: ${error.message}`);
        }

        const services = (records || []).map(r => this.mapToService(r));

        return createPaginatedResponse(services, count || 0, page, limit);

        /*
        // Import dynamically to avoid circular ref issues if any, or just use mockData directly
        const { searchMockServices } = require('@/lib/mockData');
        const mockResult = searchMockServices(filters);

        return createPaginatedResponse(
            mockResult.services,
            mockResult.pagination.total,
            mockResult.pagination.page,
            mockResult.pagination.limit
        );
        */
    }

    /**
     * Añadir imagen al servicio
     */
    static async addServiceImage(serviceId: string, imageKey: string, isPrimary: boolean): Promise<any> {
        const { data, error } = await supabase
            .from('property_images')
            .insert({
                property_id: serviceId,
                image_url: imageKey,
                is_primary: isPrimary
            })
            .select()
            .single();

        if (error) throw new DatabaseError(`Error al añadir imagen: ${error.message}`);
        return data;
    }

    /**
     * Eliminar imagen del servicio
     */
    static async removeServiceImage(imageId: string): Promise<void> {
        const { error } = await supabase
            .from('property_images')
            .delete()
            .eq('id', imageId);

        if (error) throw new DatabaseError(`Error al eliminar imagen: ${error.message}`);
    }
}
