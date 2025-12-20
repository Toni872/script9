import { FC } from 'react';
import { Property } from '@/types';
import PropertyFeatureCard from './PropertyFeatureCard';
import { AlertCircle, Search } from 'lucide-react';

interface PropertyGridProps {
    properties: Property[];
    loading?: boolean;
    error?: string;
    emptyMessage?: string;
}

export const PropertyGrid: FC<PropertyGridProps> = ({
    properties,
    loading = false,
    error,
    emptyMessage = 'No hay espacios disponibles con estos criterios.',
}) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-script9-sm p-4 animate-pulse"
                    >
                        <div className="aspect-[16/10] rounded-xl bg-brand-neutral-100 mb-4" />
                        <div className="space-y-3">
                            <div className="h-4 bg-brand-neutral-100 rounded w-3/4" />
                            <div className="h-4 bg-brand-neutral-100 rounded w-1/2" />
                            <div className="h-4 bg-brand-neutral-100 rounded w-5/6" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-script9-sm border border-emerald-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-brand-neutral-900 mb-2">
                    Ocurrió un error
                </h3>
                <p className="text-brand-neutral-600">{error}</p>
            </div>
        );
    }

    if (!properties.length) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-script9-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-100 text-brand-primary-600 mb-4">
                    <Search className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-brand-neutral-900 mb-2">
                    No se encontraron resultados
                </h3>
                <p className="text-brand-neutral-600">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
                <PropertyFeatureCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export default PropertyGrid;
