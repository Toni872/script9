'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar, { SearchParams } from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { Loader2, Zap, Grid3x3, LayoutGrid, Sparkles, Code, Bot, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    const resultsRef = useRef<HTMLDivElement>(null);

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

            // Direct Mock Data call to ensure filtering works as intended
            const { searchMockServices } = await import('@/lib/mockData');

            const searchParams = {
                query: search?.query,
                location: filters?.location,
                types: filters?.propertyTypes?.join(','),
                amenities: filters?.amenities?.join(','),
                price_min: filters?.minPrice,
                price_max: filters?.maxPrice,
                page: currentPage,
            };

            // Simulate network delay for UX
            await new Promise(resolve => setTimeout(resolve, 300));

            const { properties: result } = searchMockServices(searchParams);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const transformedProperties: Service[] = result.map((prop: any) => ({
                id: prop.id,
                title: prop.title || prop.name,
                description: prop.description,
                category: prop.property_type || 'General',
                price: prop.price || prop.price_per_hour,
                unit: prop.unit || 'project',
                location: prop.address || prop.location,
                city: prop.city,
                region: prop.region,
                capacity: prop.max_guests || prop.capacity,
                max_guests: prop.max_guests || prop.capacity,
                features: prop.features || prop.amenities?.map((a: string) => ({ id: a, name: a })) || [],
                amenities: prop.amenities || [],
                image_urls: prop.image_urls || [],
                rating: prop.average_rating || prop.rating,
                review_count: prop.review_count,
                provider_id: prop.host_id,
                host_id: prop.host_id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_script9_select: prop.is_script9_select || false,
                property_type: prop.property_type,
                tech_stack: prop.tech_stack,
                price_display_text: prop.price_display_text,
                delivery_time: prop.delivery_time,
                maintenance_support: prop.maintenance_support
            }));

            setProperties(transformedProperties);
            setTotalResults(transformedProperties.length);
            setTotalPages(Math.ceil(transformedProperties.length / 9));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching properties:', err);
        } finally {
            // Remove artificial delay for faster feel, or keep small if desired
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
                        Soluciones <span className="text-emerald-500">Tecnológicas</span>
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

            {/* Main Content Area with Sidebar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Categories */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
                        <div className="sticky top-24">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                                Categorías
                            </h3>
                            <div className="space-y-2">
                                {/* All Solutions */}
                                <button
                                    onClick={handleClearFilters}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-center gap-3
                                        ${filters.propertyTypes?.length === 0
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1'}`}
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                    <span className="font-medium">Todas</span>
                                </button>

                                {/* Agentes IA */}
                                <button
                                    onClick={() => handleFilterChange({ ...filters, propertyTypes: ['ia_chatbot'] })}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-center gap-3
                                        ${filters.propertyTypes?.includes('ia_chatbot')
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1'}`}
                                >
                                    <Bot className="w-5 h-5 flex-shrink-0" />
                                    <div className="flex flex-col text-left">
                                        <span className="font-medium">Agentes IA</span>
                                        <span className={`text-xs transition-colors ${filters.propertyTypes?.includes('ia_chatbot') ? 'text-emerald-100/70' : 'text-slate-500 group-hover:text-slate-400'}`}>Vendedores 24/7</span>
                                    </div>
                                </button>

                                {/* Automatizaciones */}
                                <button
                                    onClick={() => handleFilterChange({ ...filters, propertyTypes: ['automatizacion'] })}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-center gap-3
                                        ${filters.propertyTypes?.includes('automatizacion')
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1'}`}
                                >
                                    <Zap className="w-5 h-5 flex-shrink-0" />
                                    <div className="flex flex-col text-left">
                                        <span className="font-medium">Automatizaciones</span>
                                        <span className={`text-xs transition-colors ${filters.propertyTypes?.includes('automatizacion') ? 'text-blue-100/70' : 'text-slate-500 group-hover:text-slate-400'}`}>Piloto automático</span>
                                    </div>
                                </button>

                                {/* Integraciones (Antes Workflows) */}
                                <button
                                    onClick={() => handleFilterChange({ ...filters, propertyTypes: ['integracion'] })}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-center gap-3
                                        ${filters.propertyTypes?.includes('integracion')
                                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1'}`}
                                >
                                    <Globe className="w-5 h-5 flex-shrink-0" />
                                    <div className="flex flex-col text-left">
                                        <span className="font-medium">Integraciones</span>
                                        <span className={`text-xs transition-colors ${filters.propertyTypes?.includes('integracion') ? 'text-purple-100/70' : 'text-slate-500 group-hover:text-slate-400'}`}>Conecta apps</span>
                                    </div>
                                </button>

                                {/* Scripts */}
                                <button
                                    onClick={() => handleFilterChange({ ...filters, propertyTypes: ['script'] })}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-center gap-3
                                        ${filters.propertyTypes?.includes('script')
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1'}`}
                                >
                                    <Code className="w-5 h-5 flex-shrink-0" />
                                    <div className="flex flex-col text-left">
                                        <span className="font-medium">Scripts a Medida</span>
                                        <span className={`text-xs transition-colors ${filters.propertyTypes?.includes('script') ? 'text-orange-100/70' : 'text-slate-500 group-hover:text-slate-400'}`}>Código puro</span>
                                    </div>
                                </button>
                            </div>

                            {/* Banner Promocional Sidebar */}
                            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20">
                                <Sparkles className="w-8 h-8 text-emerald-400 mb-3" />
                                <h4 className="text-white font-bold mb-2">¿Necesitas algo único?</h4>
                                <p className="text-sm text-slate-400 mb-4">Creamos soluciones a medida para tu empresa.</p>
                                <Button
                                    onClick={() => window.location.href = '/contacto'}
                                    variant="outline"
                                    className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-white text-sm"
                                >
                                    Contactar
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1 min-w-0">
                        <div ref={resultsRef} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">

                            {/* Result Count */}
                            <div className="text-slate-400 text-sm">
                                Mostrando <span className="text-white font-bold">{totalResults}</span> resultados
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
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
                            <div className="text-center py-20 bg-slate-950 rounded-xl border border-emerald-500/20 p-8">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="h-8 w-8 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Error al cargar</h3>
                                <p className="text-slate-400 mb-6">{error}</p>
                                <Button onClick={fetchProperties} className="bg-emerald-600 text-white hover:bg-emerald-500">Reintentar</Button>
                            </div>
                        ) : (
                            <>
                                <motion.div
                                    layout
                                    className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
                                >
                                    <AnimatePresence mode="popLayout">
                                        {properties.map((service) => (
                                            <motion.div
                                                layout
                                                key={service.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ServiceCard
                                                    service={service}
                                                    onFavoriteToggle={handleFavoriteToggle}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

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

