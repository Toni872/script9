import { NextRequest, NextResponse } from 'next/server';
import { CatalogService } from '@/services/catalogService';
import { searchMockServices } from '@/lib/mockData';
import { z } from 'zod';

// Esquema de validación para búsqueda avanzada
// Esquema de validación para búsqueda avanzada
const advancedSearchSchema = z.object({
    query: z.string().optional(), // Búsqueda de texto libre
    city: z.string().optional(),
    region: z.string().optional(),
    minPricePerHour: z.number().positive().optional(),
    maxPricePerHour: z.number().positive().optional(),
    minPricePerDay: z.number().positive().optional(),
    maxPricePerDay: z.number().positive().optional(),
    minGuests: z.number().int().positive().optional(),
    maxGuests: z.number().int().positive().optional(),
    propertyTypes: z.array(z.string()).optional(), // Changed from features to align with frontend
    amenities: z.array(z.string()).optional(),     // Added explicit amenities support
    features: z.array(z.string()).optional(),      // Kept for backward compatibility
    location: z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        radiusKm: z.number().positive().max(100),
    }).optional(),
    sortBy: z.enum(['price_asc', 'price_desc', 'distance', 'newest', 'rating', 'relevance']).optional(),
    limit: z.number().int().positive().max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
});

/**
 * GET /api/properties/search
 * Búsqueda de propiedades con query params
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Extraer parámetros de la query string
        const params: any = {};

        if (searchParams.get('query')) params.query = searchParams.get('query');
        if (searchParams.get('city')) params.city = searchParams.get('city');
        if (searchParams.get('region')) params.region = searchParams.get('region');
        if (searchParams.get('minPricePerHour')) params.minPricePerHour = Number(searchParams.get('minPricePerHour'));
        if (searchParams.get('maxPricePerHour')) params.maxPricePerHour = Number(searchParams.get('maxPricePerHour'));
        if (searchParams.get('minPricePerDay')) params.minPricePerDay = Number(searchParams.get('minPricePerDay'));
        if (searchParams.get('maxPricePerDay')) params.maxPricePerDay = Number(searchParams.get('maxPricePerDay'));
        if (searchParams.get('minGuests')) params.minGuests = Number(searchParams.get('minGuests'));
        if (searchParams.get('maxGuests')) params.max_guests = Number(searchParams.get('maxGuests'));
        if (searchParams.get('capacity_min')) params.minGuests = Number(searchParams.get('capacity_min'));

        // Handle array params correctly
        if (searchParams.get('propertyTypes')) params.propertyTypes = searchParams.get('propertyTypes')?.split(',');
        if (searchParams.get('amenities')) params.amenities = searchParams.get('amenities')?.split(',');
        if (searchParams.get('features')) params.features = searchParams.get('features')?.split(',');

        if (searchParams.get('sortBy')) params.sortBy = searchParams.get('sortBy');
        if (searchParams.get('limit')) params.limit = Number(searchParams.get('limit'));
        if (searchParams.get('page')) {
            const page = Number(searchParams.get('page'));
            const limit = params.limit || 20;
            params.offset = (page - 1) * limit;
        } else if (searchParams.get('offset')) {
            params.offset = Number(searchParams.get('offset'));
        }

        const searchData = advancedSearchSchema.parse(params);
        return await performSearch(searchData);
    } catch (error) {
        console.error('Error in GET search:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid search parameters', details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Search failed' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/properties/search
 * Búsqueda avanzada de propiedades
 */
// Función auxiliar para realizar la búsqueda
async function performSearch(searchParams: z.infer<typeof advancedSearchSchema>) {
    let properties: any[] = [];

    try {
        // Construir filtros para el servicio
        const filters: Record<string, string | number | string[] | undefined> = {};
        if (searchParams.city) filters.city = searchParams.city;
        if (searchParams.region) filters.region = searchParams.region;
        if (searchParams.maxPricePerHour) filters.maxPricePerHour = searchParams.maxPricePerHour;
        if (searchParams.minGuests) filters.minGuests = searchParams.minGuests;
        if (searchParams.features) filters.features = searchParams.features;
        // Pass new filters if needed by real service (omitted for now as we focus on mock fix)

        if (searchParams.location) {
            filters.latitude = searchParams.location.latitude;
            filters.longitude = searchParams.location.longitude;
            filters.radiusKm = searchParams.location.radiusKm;
        }

        // Buscar servicios
        // Note: Real service might ignore new filters if not updated, but we prioritize Mock data for now since supbase is likely not fully set up for these custom columns
        const result = await CatalogService.searchServices(filters);
        properties = result.data;
    } catch (dbError) {
        // Si falla Supabase, usar datos mock para desarrollo del MVP
        // console.warn('Usando datos mock - Supabase no disponible:', dbError); // Reduce log noise

        const mockResult = searchMockServices({
            query: searchParams.query,
            location: searchParams.city || searchParams.region,
            // capacity_min: searchParams.minGuests, // Legacy
            price_min: searchParams.minPricePerHour,
            price_max: searchParams.maxPricePerHour,
            types: searchParams.propertyTypes?.join(',') || searchParams.features?.join(','), // Map propertyTypes to types
            // amenities: searchParams.amenities?.join(','), // Map amenitites
            page: Math.floor(searchParams.offset / searchParams.limit) + 1,
            limit: searchParams.limit,
        });

        return NextResponse.json({
            success: true,
            properties: mockResult.services, // Updated to services
            pagination: mockResult.pagination,
            _usingMockData: true, // Indicador para desarrollo
        });
    }

    // Aplicar filtros adicionales que no están en el servicio base
    if (searchParams.minPricePerHour) {
        properties = properties.filter(p => p.price_per_hour >= searchParams.minPricePerHour!);
    }
    if (searchParams.maxPricePerDay) {
        properties = properties.filter(p => p.price_per_day && p.price_per_day <= searchParams.maxPricePerDay!);
    }
    if (searchParams.minPricePerDay) {
        properties = properties.filter(p => p.price_per_day && p.price_per_day >= searchParams.minPricePerDay!);
    }
    if (searchParams.maxGuests) {
        properties = properties.filter(p => p.max_guests <= searchParams.maxGuests!);
    }

    // Búsqueda de texto libre (en título y descripción)
    if (searchParams.query) {
        const query = searchParams.query.toLowerCase();
        properties = properties.filter(p =>
            p.title.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
    }

    // Aplicar ordenamiento
    if (searchParams.sortBy) {
        switch (searchParams.sortBy) {
            case 'price_asc':
                properties.sort((a, b) => a.price_per_hour - b.price_per_hour);
                break;
            case 'price_desc':
                properties.sort((a, b) => b.price_per_hour - a.price_per_hour);
                break;
            case 'newest':
                properties.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            // Para 'distance' y 'rating' necesitarías lógica adicional
        }
    }

    // Aplicar paginación
    const total = properties.length;
    const paginatedProperties = properties.slice(
        searchParams.offset,
        searchParams.offset + searchParams.limit
    );

    return NextResponse.json({
        success: true,
        properties: paginatedProperties,
        pagination: {
            total,
            limit: searchParams.limit,
            offset: searchParams.offset,
            page: Math.floor(searchParams.offset / searchParams.limit) + 1,
            totalPages: Math.ceil(total / searchParams.limit),
            hasMore: searchParams.offset + searchParams.limit < total,
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        // Parsear y validar datos de entrada
        const body = await request.json();
        const searchParams = advancedSearchSchema.parse(body);
        return await performSearch(searchParams);
    } catch (error) {
        console.error('Error in POST search:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid search parameters', details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Search failed' },
            { status: 500 }
        );
    }
}
