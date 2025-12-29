'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';

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

interface AdvancedFiltersProps {
    filters: AdvancedFilterOptions;
    onFilterChange: (filters: AdvancedFilterOptions) => void;
    onClearFilters: () => void;
}

export default function AdvancedFilters({ filters, onFilterChange, onClearFilters }: AdvancedFiltersProps) {
    const [localFilters, setLocalFilters] = useState<AdvancedFilterOptions>(filters);

    // Tipos de servicio Script9
    const propertyTypeOptions = [
        { value: 'automatizacion', label: 'Automatizaciones' },
        { value: 'ia_chatbot', label: 'IA & Chatbots' },
        { value: 'workflow', label: 'Workflows' },
        { value: 'script', label: 'Scripts a Medida' },
        { value: 'integracion', label: 'Integraciones API' },
        { value: 'consultoria', label: 'Consultoría' },
    ];

    // Tecnologías/Características de los servicios
    const amenityOptions = [
        { value: 'python', label: 'Python' },
        { value: 'nodejs', label: 'Node.js' },
        { value: 'openai', label: 'OpenAI / GPT' },
        { value: 'make', label: 'Make (Integromat)' },
        { value: 'zapier', label: 'Zapier' },
        { value: 'n8n', label: 'n8n' },
        { value: 'api_rest', label: 'API REST' },
        { value: 'web_scraping', label: 'Web Scraping' },
    ];

    const sortOptions = [
        { value: 'relevance', label: 'Más Relevantes' },
        { value: 'price_asc', label: 'Inversión: Menor a Mayor' },
        { value: 'price_desc', label: 'Inversión: Mayor a Menor' },
        { value: 'rating_desc', label: 'Mejor Valorados' },
        { value: 'newest', label: 'Más Recientes' },
    ];

    const handlePropertyTypeToggle = (type: string) => {
        const currentTypes = localFilters.propertyTypes || [];
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter(t => t !== type)
            : [...currentTypes, type];

        const newFilters = { ...localFilters, propertyTypes: newTypes };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleAmenityToggle = (amenity: string) => {
        const currentAmenities = localFilters.amenities || [];
        const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];

        const newFilters = { ...localFilters, amenities: newAmenities };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handlePriceChange = (min?: number, max?: number) => {
        const newFilters = { ...localFilters, minPrice: min, maxPrice: max };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleSortChange = (sortBy: string) => {
        const newFilters = { ...localFilters, sortBy };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClear = () => {
        setLocalFilters({});
        onClearFilters();
    };

    const hasActiveFilters = Object.values(localFilters).some(v =>
        v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true)
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-sm font-medium text-slate-500">
                    Opciones de búsqueda
                </span>
                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-wide transition-colors"
                    >
                        Limpiar todo
                    </button>
                )}
            </div>

            {/* Tipo de Servicio - Pills */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Categoría</h4>
                <div className="flex flex-wrap gap-2">
                    {propertyTypeOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handlePropertyTypeToggle(option.value)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${localFilters.propertyTypes?.includes(option.value)
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rango de Presupuesto */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Rango de Presupuesto (€)</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500 text-sm">€</span>
                        <input
                            type="number"
                            min="0"
                            placeholder="Min"
                            value={localFilters.minPrice || ''}
                            onChange={(e) => handlePriceChange(e.target.value ? parseInt(e.target.value) : undefined, localFilters.maxPrice)}
                            className="w-full pl-7 pr-3 py-2 text-sm bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500 text-sm">€</span>
                        <input
                            type="number"
                            min="0"
                            placeholder="Max"
                            value={localFilters.maxPrice || ''}
                            onChange={(e) => handlePriceChange(localFilters.minPrice, e.target.value ? parseInt(e.target.value) : undefined)}
                            className="w-full pl-7 pr-3 py-2 text-sm bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </div>

            {/* Tecnologías - Checkboxes */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Tecnologías</h4>
                <div className="space-y-2">
                    {amenityOptions.map(option => {
                        const isChecked = localFilters.amenities?.includes(option.value) || false;
                        return (
                            <label
                                key={option.value}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900 border-slate-700 group-hover:border-slate-500'}`}>
                                    {isChecked && <Check className="w-3.5 h-3.5 text-slate-950" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={isChecked}
                                    onChange={() => handleAmenityToggle(option.value)}
                                />
                                <span className={`text-sm ${isChecked ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
                                    {option.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Ordenar Por */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Ordenar</h4>
                <select
                    value={localFilters.sortBy || 'relevance'}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
