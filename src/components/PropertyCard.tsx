'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, Zap, Bot, Code, Settings, Globe, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export interface Property {
    id: string;
    title: string;
    description: string;
    price_per_hour: number;
    location: string;
    city?: string;
    region?: string;
    capacity: number;
    image_urls?: string[];
    images?: string[];
    rating?: number;
    review_count?: number;
    amenities?: string[];
    property_type?: string;
    is_favorite?: boolean;
    is_script9_select?: boolean;
    max_guests?: number;
    latitude?: number;
    longitude?: number;
}

interface PropertyCardProps {
    property: Property;
    onFavoriteToggle?: (propertyId: string) => void;
}

const serviceTypeConfig: Record<string, { icon: typeof Zap; label: string }> = {
    automatizacion: { icon: Zap, label: 'Automatización' },
    ia_chatbot: { icon: Bot, label: 'IA & Chatbot' },
    workflow: { icon: Settings, label: 'Workflow' },
    script: { icon: Code, label: 'Script' },
    integracion: { icon: Globe, label: 'Integración' },
    consultoria: { icon: MessageSquare, label: 'Consultoría' },
};

export default function PropertyCard({ property, onFavoriteToggle }: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(property.is_favorite || false);
    const [imageError, setImageError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.(property.id);
    };

    const serviceType = property.property_type || 'automatizacion';
    const config = serviceTypeConfig[serviceType] || serviceTypeConfig.automatizacion;
    const ServiceIcon = config.icon;
    const mainImage = property.image_urls?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80';
    const displayRating = property.rating || 5.0;

    return (
        <Link href={`/catalogo/${property.id}`} className="group block h-full">
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                        src={mainImage}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#003D82] shadow-sm">
                            <ServiceIcon className="w-3 h-3" />
                            {config.label}
                        </span>
                    </div>
                    {property.is_script9_select && (
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full bg-[#EF4444] text-white text-xs font-bold shadow-sm">
                                SELECT
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#003D82] transition-colors line-clamp-1">
                            {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-medium text-[#333333]">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {displayRating.toFixed(1)}
                        </div>
                    </div>

                    <p className="text-sm text-[#666666] line-clamp-2 mb-4 flex-1">
                        {property.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-[#86868b] uppercase tracking-wide">Desde</span>
                            <span className="text-xl font-bold text-[#003D82]">€{property.price_per_hour}</span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#333333] group-hover:bg-[#EF4444] group-hover:text-white transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}
