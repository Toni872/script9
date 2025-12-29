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
        <div className="min-h-screen bg-slate-950">
            {/* Hero Header Section - Deep Tech Blue converted to Slate */}
            <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    {/* Deep Tech Background Layer */}
                    <div className="absolute inset-0 bg-slate-950" />

                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    {/* Radial Gradient Glows */}
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500/20 opacity-20 blur-[100px]" />
                    <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] bg-indigo-500/10 opacity-20 blur-[100px]" />

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    {/* Fade to bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Catálogo de Servicios
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
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
                            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                                <div className="p-4 bg-slate-950/50 border-b border-slate-800">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                        <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
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
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 rounded-lg shadow-sm font-medium transition-colors"
                        >
                            <SlidersHorizontal className="h-5 w-5 text-emerald-500" />
                            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                        </button>

                        {showFilters && (
                            <div className="mt-4 bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-4 animate-in slide-in-from-top-2">
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
                            <p className="text-slate-400">
                                Mostrando <span className="font-bold text-white">{properties.length}</span> resultados
                            </p>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Grid3x3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('compact')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'compact' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content States */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mb-4" />
                                <p className="text-slate-400 font-medium">Buscando las mejores soluciones...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-slate-900 rounded-xl border border-emerald-500/20 p-8">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="h-8 w-8 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Error al cargar</h3>
                                <p className="text-slate-400 mb-6">{error}</p>
                                <Button onClick={fetchProperties} className="bg-emerald-600 text-white hover:bg-emerald-500">Reintentar</Button>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="text-center py-20 bg-slate-900 rounded-xl border border-slate-800 p-8">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="h-8 w-8 text-slate-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
                                <p className="text-slate-400 mb-6">Intenta ajustar tus filtros de búsqueda.</p>
                                <Button onClick={handleClearFilters} variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500">Limpiar Filtros</Button>
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

                                    {/* Custom Solution Card / Banner */}
                                    <div className={`
                                        rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 
                                        flex flex-col items-center justify-center text-center p-8 
                                        hover:border-emerald-500/40 transition-colors group cursor-pointer
                                        ${viewMode === 'grid' ? 'min-h-[400px]' : 'min-h-[200px]'}
                                    `}
                                        onClick={() => window.location.href = '/contacto?subject=Solicitud%20Personalizada'}
                                    >
                                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            ¿No encuentras lo que buscas?
                                        </h3>
                                        <p className="text-slate-400 mb-6 max-w-xs">
                                            Diseñamos soluciones de automatización 100% a medida para tu negocio.
                                        </p>
                                        <span className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold group-hover:bg-emerald-500 transition-colors">
                                            Consultar Proyecto
                                        </span>
                                    </div>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                                        >
                                            Primera
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                                        >
                                            Anterior
                                        </Button>
                                        <span className="flex items-center px-4 font-semibold text-emerald-400">
                                            Página {currentPage} de {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                                        >
                                            Siguiente
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
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
