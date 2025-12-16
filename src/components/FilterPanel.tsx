'use client';

import { SlidersHorizontal, MapPin, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export interface FilterOptions {
    location?: string;
    maxPrice?: number;
    minCapacity?: number;
}

interface FilterPanelProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    onClearFilters: () => void;
}

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
    const handleLocationChange = (value: string) => {
        onFilterChange({
            ...filters,
            location: value || undefined,
        });
    };

    const handleMaxPriceChange = (value: number) => {
        onFilterChange({
            ...filters,
            maxPrice: value || undefined,
        });
    };

    const handleMinCapacityChange = (value: number) => {
        onFilterChange({
            ...filters,
            minCapacity: value || undefined,
        });
    };

    const activeFiltersCount =
        (filters.location ? 1 : 0) +
        (filters.maxPrice ? 1 : 0) +
        (filters.minCapacity ? 1 : 0);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-brand-primary-600" />
                    <h3 className="font-semibold text-lg text-brand-neutral-800">Filtros</h3>
                    {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-brand-primary-100 text-brand-primary-700">
                            {activeFiltersCount}
                        </Badge>
                    )}
                </div>
                {activeFiltersCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-sm text-brand-neutral-600 hover:text-brand-primary-600"
                    >
                        Limpiar
                    </Button>
                )}
            </div>

            {/* Location Filter */}
            <div className="mb-5">
                <label className="flex items-center gap-2 font-medium text-sm text-brand-neutral-700 mb-2">
                    <MapPin className="h-4 w-4 text-brand-primary-600" />
                    Ubicación
                </label>
                <Input
                    type="text"
                    placeholder="Ciudad o región..."
                    value={filters.location || ''}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="w-full"
                />
                <p className="text-xs text-brand-neutral-500 mt-1">Ej: Valencia, Barcelona, Madrid</p>
            </div>

            {/* Max Price Filter */}
            <div className="mb-5">
                <label className="flex items-center gap-2 font-medium text-sm text-brand-neutral-700 mb-2">
                    <DollarSign className="h-4 w-4 text-brand-primary-600" />
                    Precio Máximo (por hora)
                </label>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Ej: 100"
                        value={filters.maxPrice || ''}
                        onChange={(e) => handleMaxPriceChange(parseInt(e.target.value) || 0)}
                        className="w-full"
                        min="0"
                    />
                    <span className="text-sm text-brand-neutral-600 whitespace-nowrap">€/h</span>
                </div>
                <p className="text-xs text-brand-neutral-500 mt-1">Filtra espacios hasta este precio</p>
            </div>

            {/* Min Capacity Filter */}
            <div>
                <label className="flex items-center gap-2 font-medium text-sm text-brand-neutral-700 mb-2">
                    <Users className="h-4 w-4 text-brand-primary-600" />
                    Capacidad Mínima
                </label>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Ej: 10"
                        value={filters.minCapacity || ''}
                        onChange={(e) => handleMinCapacityChange(parseInt(e.target.value) || 0)}
                        className="w-full"
                        min="1"
                    />
                    <span className="text-sm text-brand-neutral-600 whitespace-nowrap">personas</span>
                </div>
                <p className="text-xs text-brand-neutral-500 mt-1">Número mínimo de invitados</p>
            </div>
        </div>
    );
}

