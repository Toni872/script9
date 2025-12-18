'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar, { SearchParams } from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/types';
import AdvancedFilters from '@/components/catalog/AdvancedFilters';
import { Button } from '@/components/ui/button';
import { Loader2, Zap, SlidersHorizontal, Grid3x3, LayoutGrid, Sparkles, Code, Bot, Globe } from 'lucide-react';

interface AdvancedFilterOptions {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minCapacity?: number;
    maxCapacity?: number;
    propertyTypes?: string[];
    amenities?: string[];
    sortBy?: string;
}

export default function Catalogo() {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

    // State for filters
    const [filters, setFilters] = useState<AdvancedFilterOptions>({
        location: '',
        minPrice: undefined,
        maxPrice: undefined,
        minCapacity: undefined,
        maxCapacity: undefined,
        propertyTypes: [],
        amenities: [],
        sortBy: undefined,
    });

    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // State for search
    const [search, setSearch] = useState<SearchParams>({
        query: searchParams.get('q') || '',
        location: searchParams.get('location') || '',
        guests: parseInt(searchParams.get('guests') || '1'),
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 12;

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filters, currentPage]);

    const fetchProperties = async () => {
        setLoading(true);
        setError(null);

        try {
            // Build query params
            const params = new URLSearchParams();
            if (search.query) params.set('query', search.query);
            if (search.location) params.set('city', search.location);
            if (search.guests) params.set('capacity_min', search.guests.toString());

            // Advanced filters
            if (filters.location) params.set('city', filters.location);
            if (filters.minPrice) params.set('minPricePerHour', filters.minPrice.toString());
            if (filters.maxPrice) params.set('maxPricePerHour', filters.maxPrice.toString());
            if (filters.minCapacity) params.set('minGuests', filters.minCapacity.toString());
            if (filters.maxCapacity) params.set('maxGuests', filters.maxCapacity.toString());
            if (filters.propertyTypes && filters.propertyTypes.length > 0) {
                params.set('propertyTypes', filters.propertyTypes.join(','));
            }
            if (filters.amenities && filters.amenities.length > 0) {
                params.set('amenities', filters.amenities.join(','));
            }
            if (filters.sortBy) params.set('sortBy', filters.sortBy);

            params.set('page', currentPage.toString());
            params.set('limit', propertiesPerPage.toString());

            // Mock fetch if API fails or for demo
            const response = await fetch(`/api/properties/search?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Error al cargar los servicios');
            }

            const data = await response.json();

            // Update pagination info
            if (data.pagination) {
                setTotalResults(data.pagination.total || 0);
                setTotalPages(data.pagination.totalPages || 1);
            }

            // Transform API data to match Service interface
            const transformedProperties: Service[] = data.properties?.map((prop: any) => ({
                id: prop.id,
                title: prop.title || prop.name,
                description: prop.description,
                price: prop.price || prop.price_per_hour,
                unit: prop.unit || 'project',
                location: prop.address || prop.location,
                city: prop.city,
                region: prop.region,
                capacity: prop.max_guests || prop.capacity,
                max_guests: prop.max_guests || prop.capacity,
                features: prop.features || prop.amenities?.map((a: string) => ({ id: a, name: a })) || [],
                amenities: prop.amenities || [], // legacy
                image_urls: prop.image_urls || [],
                rating: prop.average_rating,
                review_count: prop.review_count,
                provider_id: prop.host_id,
                host_id: prop.host_id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_script9_select: prop.is_script9_select || false,
                latitude: prop.latitude,
                longitude: prop.longitude,
            })) || [];

            setProperties(transformedProperties);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (params: SearchParams) => {
        setSearch(params);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilters: AdvancedFilterOptions) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters({
            location: '',
            minPrice: undefined,
            maxPrice: undefined,
            minCapacity: undefined,
            maxCapacity: undefined,
            propertyTypes: [],
            amenities: [],
            sortBy: undefined,
        });
        setCurrentPage(1);
    };

    const handleFavoriteToggle = async (propertyId: string) => {
        // TODO: Implement favorite toggle
        console.log('Toggle favorite:', propertyId);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            {/* Hero Header Section - Deep Tech Blue */}
            <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden bg-[#003D82]">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#002E5C]/50" />

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Catálogo de Servicios
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                        {totalResults > 0
                            ? `${totalResults} soluciones de automatización disponibles para tu negocio`
                            : 'Explora nuestra selección de scripts, bots y workflows empresariales'}
                    </p>

                    {/* Search Bar Wrapper */}
                    <div className="max-w-3xl mx-auto transform translate-y-4">
                        <SearchBar onSearch={handleSearch} initialParams={search} />
                    </div>
                </div>
            </section>

            {/* Spacer for Search Bar overlap */}
            <div className="h-8" />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-200">
                                    <h3 className="font-semibold text-[#333333] flex items-center gap-2">
                                        <SlidersHorizontal className="w-5 h-5 text-[#EF4444]" />
                                        Filtros
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <AdvancedFilters
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        onClearFilters={handleClearFilters}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filters Toggle */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#333333] hover:bg-gray-50 rounded-lg shadow-sm font-medium transition-colors"
                        >
                            <SlidersHorizontal className="h-5 w-5 text-[#EF4444]" />
                            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                        </button>

                        {showFilters && (
                            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-in slide-in-from-top-2">
                                <AdvancedFilters
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    onClearFilters={handleClearFilters}
                                />
                            </div>
                        )}
                    </div>

                    {/* Properties Grid */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                            <p className="text-[#666666]">
                                Mostrando <span className="font-bold text-[#333333]">{properties.length}</span> resultados
                            </p>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#EF4444] text-white' : 'text-gray-400 hover:text-[#333333]'}`}
                                >
                                    <Grid3x3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('compact')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'compact' ? 'bg-[#EF4444] text-white' : 'text-gray-400 hover:text-[#333333]'}`}
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content States */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-[#EF4444] mb-4" />
                                <p className="text-[#666666] font-medium">Buscando las mejores soluciones...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-red-100 p-8">
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="h-8 w-8 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-[#333333] mb-2">Error al cargar</h3>
                                <p className="text-[#666666] mb-6">{error}</p>
                                <Button onClick={fetchProperties} className="bg-[#003D82] text-white">Reintentar</Button>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 p-8">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-[#333333] mb-2">No se encontraron resultados</h3>
                                <p className="text-[#666666] mb-6">Intenta ajustar tus filtros de búsqueda.</p>
                                <Button onClick={handleClearFilters} variant="outline" className="border-[#003D82] text-[#003D82]">Limpiar Filtros</Button>
                            </div>
                        ) : (
                            <>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {properties.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                            onFavoriteToggle={handleFavoriteToggle}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="border-gray-300 text-[#333333]"
                                        >
                                            Primera
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="border-gray-300 text-[#333333]"
                                        >
                                            Anterior
                                        </Button>
                                        <span className="flex items-center px-4 font-semibold text-[#003D82]">
                                            Página {currentPage} de {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="border-gray-300 text-[#333333]"
                                        >
                                            Siguiente
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="border-gray-300 text-[#333333]"
                                        >
                                            Última
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
