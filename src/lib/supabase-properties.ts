import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface PropertySearchFilters {
    city?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    minCapacity?: number;
    features?: string[];
    lat?: number;
    lng?: number;
    radius?: number; // en km
    checkIn?: string;
    checkOut?: string;
    page?: number;
    limit?: number;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    property_type: string;
    price_per_hour: number;
    location: { lat: number; lng: number } | null;
    address: string;
    city: string;
    postal_code?: string;
    max_guests: number;
    surface_area?: number;
    min_booking_hours: number;
    image_urls: string[];
    rules?: string[];
    status: string;
    host_id: string;
    created_at: string;
    updated_at: string;
}

interface NearbyLocation {
    id: string;
}

interface Review {
    id: string;
    rating: number;
    cleanliness_rating?: number;
    communication_rating?: number;
    accuracy_rating?: number;
    comment?: string;
    created_at: string;
}

interface CreatePropertyData {
    title: string;
    description: string;
    property_type: string;
    price_per_hour: number;
    location?: { lat: number; lng: number } | null;
    address: string;
    city: string;
    postal_code?: string;
    max_guests: number;
    surface_area?: number;
    min_booking_hours: number;
    image_urls?: string[];
    rules?: string[];
}

interface UpdatePropertyData {
    title?: string;
    description?: string;
    property_type?: string;
    price_per_hour?: number;
    location?: { lat: number; lng: number } | null;
    address?: string;
    city?: string;
    postal_code?: string;
    max_guests?: number;
    surface_area?: number;
    min_booking_hours?: number;
    image_urls?: string[];
    rules?: string[];
    status?: string;
}

/**
 * Buscar propiedades con filtros avanzados
 */
export async function searchProperties(filters: PropertySearchFilters) {
    let query = supabase
        .from('properties')
        .select(`
      *,
      property_features(*),
      users!properties_host_id_fkey(id, name, email, image)
    `, { count: 'exact' })
        .eq('status', 'active');

    // Filtro por ciudad
    if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
    }

    // Filtro por tipo de propiedad
    if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
    }

    // Filtro por precio
    if (filters.minPrice !== undefined) {
        query = query.gte('price_per_hour', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
        query = query.lte('price_per_hour', filters.maxPrice);
    }

    // Filtro por capacidad
    if (filters.minCapacity) {
        query = query.gte('max_guests', filters.minCapacity);
    }

    // Paginación
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error('Error searching properties:', error);
        throw error;
    }

    // Si hay búsqueda geográfica, usar la función de PostGIS
    if (filters.lat && filters.lng && filters.radius) {
        const { data: nearbyData, error: nearbyError } = await supabase
            .rpc('find_nearby_locations', {
                lat: filters.lat,
                lng: filters.lng,
                distance_km: filters.radius
            });

        if (nearbyError) {
            console.error('Error in geographic search:', nearbyError);
        } else if (nearbyData && data) {
            // Filtrar las propiedades que están en el radio
            const nearbyIds = (nearbyData as NearbyLocation[]).map((item) => item.id);
            return {
                data: data.filter((prop) => nearbyIds.includes(prop.id)),
                count: nearbyData.length,
                page,
                limit,
                totalPages: nearbyData.length ? Math.ceil(nearbyData.length / limit) : 0
            };
        }
    }

    return {
        data,
        count,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0
    };
}

/**
 * Obtener detalles de una propiedad
 */
export async function getPropertyById(id: string) {
    const { data, error } = await supabase
        .from('properties')
        .select(`
      *,
      property_features(*),
      users!properties_host_id_fkey(id, name, email, image, created_at),
      reviews(
        id,
        rating,
        cleanliness_rating,
        communication_rating,
        accuracy_rating,
        comment,
        created_at,
        users!reviews_reviewer_id_fkey(id, name, image)
      )
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching property:', error);
        throw error;
    }

    // Calcular rating promedio
    if (data.reviews && data.reviews.length > 0) {
        const avgRating = (data.reviews as Review[]).reduce((acc: number, review) => acc + review.rating, 0) / data.reviews.length;
        return {
            ...data,
            avgRating: Math.round(avgRating * 10) / 10,
            totalReviews: data.reviews.length
        };
    }

    return {
        ...data,
        avgRating: 0,
        totalReviews: 0
    };
}

/**
 * Crear una nueva propiedad
 */
export async function createProperty(property: CreatePropertyData, userId: string) {
    const { data, error } = await supabase
        .from('properties')
        .insert({
            ...property,
            host_id: userId,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating property:', error);
        throw error;
    }

    return data;
}

/**
 * Actualizar una propiedad
 */
export async function updateProperty(id: string, updates: UpdatePropertyData, userId: string) {
    // Verificar que el usuario es el dueño
    const { data: existing, error: fetchError } = await supabase
        .from('properties')
        .select('host_id')
        .eq('id', id)
        .single();

    if (fetchError || !existing) {
        throw new Error('Property not found');
    }

    if (existing.host_id !== userId) {
        throw new Error('Unauthorized: You are not the owner of this property');
    }

    const { data, error } = await supabase
        .from('properties')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating property:', error);
        throw error;
    }

    return data;
}

/**
 * Eliminar una propiedad (soft delete)
 */
export async function deleteProperty(id: string, userId: string) {
    // Verificar que el usuario es el dueño
    const { data: existing, error: fetchError } = await supabase
        .from('properties')
        .select('host_id')
        .eq('id', id)
        .single();

    if (fetchError || !existing) {
        throw new Error('Property not found');
    }

    if (existing.host_id !== userId) {
        throw new Error('Unauthorized: You are not the owner of this property');
    }

    // Soft delete: cambiar status a 'inactive'
    const { error } = await supabase
        .from('properties')
        .update({ status: 'inactive' })
        .eq('id', id);

    if (error) {
        console.error('Error deleting property:', error);
        throw error;
    }

    return { success: true };
}

/**
 * Obtener propiedades de un host
 */
export async function getHostProperties(userId: string) {
    const { data, error } = await supabase
        .from('properties')
        .select(`
      *,
      property_features(*),
      bookings(id, status, total_amount)
    `)
        .eq('host_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching host properties:', error);
        throw error;
    }

    return data;
}

/**
 * Verificar disponibilidad de una propiedad
 */
export async function checkPropertyAvailability(
    propertyId: string,
    checkIn: string,
    checkOut: string
) {
    const { data, error } = await supabase
        .rpc('check_property_availability', {
            p_property_id: propertyId,
            p_start_date: checkIn,
            p_end_date: checkOut
        });

    if (error) {
        console.error('Error checking availability:', error);
        throw error;
    }

    return data; // true si está disponible, false si no
}

