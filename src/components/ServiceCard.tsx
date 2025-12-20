'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Zap, Bot, Code, Settings, Globe, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Service } from '@/types';

interface ServiceCardProps {
    service: Service;
    onFavoriteToggle?: (serviceId: string) => void;
}

const serviceTypeConfig: Record<string, { icon: typeof Zap; label: string }> = {
    automatizacion: { icon: Zap, label: 'Automatización' },
    ia_chatbot: { icon: Bot, label: 'IA & Chatbot' },
    workflow: { icon: Settings, label: 'Workflow' },
    script: { icon: Code, label: 'Script' },
    integracion: { icon: Globe, label: 'Integración' },
    consultoria: { icon: MessageSquare, label: 'Consultoría' },
};

export default function ServiceCard({ service, onFavoriteToggle }: ServiceCardProps) {
    const [isFavorite, setIsFavorite] = useState(false); // TODO: Add favorite logic back when User model supports it
    const [imageError, setImageError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.(service.id);
    };

    // Fallback logic for property_type legacy field
    const serviceType = (service as any).property_type || 'automatizacion';
    const config = serviceTypeConfig[serviceType] || serviceTypeConfig.automatizacion;
    const ServiceIcon = config.icon;
    const mainImage = service.image_urls?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80';
    // Handle both rating fields during migration
    const displayRating = service.rating || (service as any).average_rating || 5.0;

    // Handle amenities/features legacy
    const technologies = service.features?.map(f => f.name) || (service as any).amenities || [];

    return (
        <Link href={`/catalogo/${service.id}`} className="group block h-full">
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                        src={mainImage}
                        alt={service.title}
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
                    {/* is_script9_select logic */}
                    {(service as any).is_script9_select && (
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full bg-[#10B981] text-white text-xs font-bold shadow-sm">
                                SELECT
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#003D82] transition-colors line-clamp-1">
                            {service.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-medium text-[#333333]">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {displayRating.toFixed(1)}
                        </div>
                    </div>

                    <p className="text-sm text-[#666666] line-clamp-2 mb-4 flex-1">
                        {service.description}
                    </p>

                    {/* Tech Stack / Features */}
                    {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {technologies.slice(0, 3).map((tech: string, i: number) => (
                                <span key={i} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                    <CheckCircle2 className="w-3 h-3 text-[#003D82]" />
                                    {tech}
                                </span>
                            ))}
                            {technologies.length > 3 && (
                                <span className="text-xs text-gray-400 self-center">+{technologies.length - 3}</span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-[#86868b] uppercase tracking-wide">
                                {service.unit === 'project' ? 'Precio fijo' : 'Inversión'}
                            </span>
                            <span className="text-xl font-bold text-[#003D82]">
                                €{service.price}
                                {service.unit && service.unit !== 'project' && <span className="text-sm font-normal text-gray-500">/{service.unit}</span>}
                            </span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#333333] group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}
