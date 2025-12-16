import { createServerSupabaseClient } from '@/lib/supabase';
import { Property } from '@/types';
import { DatabaseError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';

const supabase = createServerSupabaseClient();

export interface AdvancedSearchFilters {
  query?: string;
  city?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  minGuests?: number;
  maxGuests?: number;
  minRating?: number;
  lat?: number;
  lng?: number;
  radius?: number; // km
  amenities?: string[];
  instantBook?: boolean;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'distance';
  page?: number;
  limit?: number;
}

export class SearchService {
  /**
   * Búsqueda avanzada con full-text search y ordenamiento
   */
  static async advancedSearch(filters: AdvancedSearchFilters): Promise<PaginatedResponse<Property>> {
    const { page, limit, offset } = calculatePagination(filters);

    let query = supabase
      .from('properties')
      .select('*, property_images!left(image_url, is_primary)', { count: 'exact' })
      .eq('status', 'active');

    // Full-text search
    if (filters.query) {
      query = query.textSearch('search_vector', filters.query.split(' ').join(' & '), {
        type: 'websearch',
        config: 'spanish',
      });
    }

    // Filtros básicos
    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }
    if (filters.region) {
      query = query.ilike('region', `%${filters.region}%`);
    }
    if (filters.minPrice) {
      query = query.gte('price_per_hour', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price_per_hour', filters.maxPrice);
    }
    if (filters.minGuests) {
      query = query.gte('max_guests', filters.minGuests);
    }
    if (filters.maxGuests) {
      query = query.lte('max_guests', filters.maxGuests);
    }
    if (filters.minRating) {
      query = query.gte('average_rating', filters.minRating);
    }

    // Búsqueda geoespacial
    if (filters.lat && filters.lng && filters.radius) {
      // PostGIS query para búsqueda por radio
      const radiusInMeters = filters.radius * 1000;
      query = query
        .filter('lat', 'gte', filters.lat - (filters.radius / 111)) // Aproximación 1 grado latitud ~= 111 km
        .filter('lat', 'lte', filters.lat + (filters.radius / 111))
        .filter('lng', 'gte', filters.lng - (filters.radius / (111 * Math.cos(filters.lat * Math.PI / 180))))
        .filter('lng', 'lte', filters.lng + (filters.radius / (111 * Math.cos(filters.lat * Math.PI / 180))));
    }

    // Ordenamiento
    switch (filters.sort) {
      case 'price_asc':
        query = query.order('price_per_hour', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price_per_hour', { ascending: false });
        break;
      case 'rating':
        query = query.order('average_rating', { ascending: false, nullsFirst: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    const { data: properties, error, count } = await query;

    if (error) {
      throw new DatabaseError(`Error en búsqueda: ${error.message}`);
    }

    // Log de búsqueda para analytics
    await this.logSearch(filters.query || '', filters, count || 0);

    return createPaginatedResponse(properties || [], count || 0, page, limit);
  }

  /**
   * Obtener sugerencias de búsqueda (autocompletado)
   */
  static async getSearchSuggestions(query: string, limit: number = 10): Promise<string[]> {
    if (!query || query.length < 2) return [];

    const { data, error } = await supabase
      .from('properties')
      .select('title, city')
      .or(`title.ilike.%${query}%,city.ilike.%${query}%`)
      .eq('status', 'active')
      .limit(limit);

    if (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }

    const suggestions = new Set<string>();
    data?.forEach((prop) => {
      if (prop.title?.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(prop.title);
      }
      if (prop.city?.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(prop.city);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Obtener búsquedas populares
   */
  static async getPopularSearches(limit: number = 10): Promise<{ query: string; count: number }[]> {
    const { data, error } = await supabase
      .from('search_logs')
      .select('search_query')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Últimos 30 días
      .not('search_query', 'is', null)
      .neq('search_query', '');

    if (error) {
      console.error('Error getting popular searches:', error);
      return [];
    }

    // Contar frecuencia
    const queryCounts: Record<string, number> = {};
    data?.forEach((log) => {
      const query = log.search_query.toLowerCase().trim();
      if (query) {
        queryCounts[query] = (queryCounts[query] || 0) + 1;
      }
    });

    return Object.entries(queryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query, count]) => ({ query, count }));
  }

  /**
   * Registrar búsqueda para analytics
   */
  private static async logSearch(query: string, filters: any, resultsCount: number): Promise<void> {
    try {
      await supabase.from('search_logs').insert({
        search_query: query,
        filters: filters,
        results_count: resultsCount,
      });
    } catch (error) {
      console.error('Error logging search:', error);
      // No fallar la búsqueda por error de logging
    }
  }

  /**
   * Búsqueda por texto (simple)
   */
  static async searchByText(query: string, limit: number = 20): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images!left(image_url, is_primary)')
      .textSearch('search_vector', query, {
        type: 'websearch',
        config: 'spanish',
      })
      .eq('status', 'active')
      .limit(limit);

    if (error) {
      throw new DatabaseError(`Error en búsqueda: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Búsqueda geoespacial optimizada
   */
  static async searchNearby(
    lat: number,
    lng: number,
    radiusKm: number = 10,
    limit: number = 20
  ): Promise<Property[]> {
    const { data, error } = await supabase.rpc('nearby_properties', {
      lat,
      lng,
      radius_meters: radiusKm * 1000,
      result_limit: limit,
    });

    if (error) {
      throw new DatabaseError(`Error en búsqueda geoespacial: ${error.message}`);
    }

    return data || [];
  }
}

