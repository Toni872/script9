import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Property } from '@/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Heart, Star } from 'lucide-react';

interface PropertyFeatureCardProps {
    property: Property;
    showActions?: boolean;
}

export const PropertyFeatureCard: FC<PropertyFeatureCardProps> = ({
    property,
    showActions = true
}) => {
    const {
        id,
        title,
        description,
        price_per_hour,
        image_urls,
        location,
        rating,
        review_count,
        features,
    } = property;

    return (
        <div className="group bg-white rounded-2xl shadow-script9-sm hover:shadow-script9-lg transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-[16/10] rounded-t-2xl overflow-hidden">
                <Image
                    src={image_urls?.[0] || '/placeholder.jpg'}
                    alt={title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {showActions && (
                    <button
                        className="absolute top-4 right-4 p-2 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                        aria-label="Guardar en favoritos"
                    >
                        <Heart className="h-5 w-5 text-brand-primary-600" />
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
                        <p className="text-sm text-brand-neutral-600 mb-2">{location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{rating}</span>
                        <span className="text-brand-neutral-500">({review_count})</span>
                    </div>
                </div>

                <p className="text-brand-neutral-600 text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {features.map((feature) => (
                        <Badge
                            key={feature.id}
                            variant="secondary"
                            className="bg-brand-primary-50 text-brand-primary-700"
                        >
                            {feature.name}
                        </Badge>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-brand-primary-600">
                            {formatCurrency(price_per_hour || 0)}
                        </span>
                        <span className="text-brand-neutral-500 text-sm">/hora</span>
                    </div>
                    <Button asChild>
                        <Link href={`/espacios/${id}`}>Ver Detalle</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyFeatureCard;
