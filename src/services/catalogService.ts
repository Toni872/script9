import { createServerSupabaseClient } from '@/lib/supabase';
import { Service } from '../types';
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
    static async createService(data: any): Promise<Service> {
        // Implementation pending full backend refactor, keep placeholder
        // Mapping creation to 'properties' table
        const { data: service, error } = await supabase
            .from('properties')
            .insert({
                title: data.title,
                description: data.description,
                price_per_hour: data.price, // Store fixed price in price_per_hour column
                max_guests: data.capacity,  // Store capacity in max_guests
                host_id: data.provider_id,
            })
            .select()
            .single();

        if (error) throw new DatabaseError(`Error al crear el servicio: ${error.message}`);
        return this.mapToService(service);
    }

    /**
     * Helper to map DB Property to Service
     */
    private static mapToService(dbRecord: any): Service {
        return {
            ...dbRecord,
            price: dbRecord.price_per_hour, // Map DB column to 'price'
            unit: 'project', // Fixed unit
            category: dbRecord.property_type || 'General',
            provider_id: dbRecord.host_id,
            image_urls: dbRecord.images || [], // Access images directly if generic json/array
            features: dbRecord.property_features?.map((f: any) => ({ name: f.feature })) || [],
            // Legacy fields for compat
            price_per_hour: dbRecord.price_per_hour,
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
        const { getMockServiceById } = require('@/lib/mockData');
        const mockService = getMockServiceById(id);
        if (mockService) {
            return mockService;
        }

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

        return this.mapToService(record);
    }

    /**
     * Buscar servicios con filtros
     */
    /**
     * Buscar servicios con filtros
     */
    static async searchServices(filters: ServiceSearchFilters): Promise<PaginatedResponse<Service>> {
        // TEMPORARY: Force mock data as requested by user ("only one test service")
        // const { page, limit, offset } = calculatePagination({
        //     page: filters.page,
        //     limit: filters.limit
        // });

        /* 
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
        */

        // Import dynamically to avoid circular ref issues if any, or just use mockData directly
        const { searchMockServices } = require('@/lib/mockData');
        const mockResult = searchMockServices(filters);

        return createPaginatedResponse(
            mockResult.services,
            mockResult.pagination.total,
            mockResult.pagination.page,
            mockResult.pagination.limit
        );
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
