'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Zap, Bot, Code, Settings, Globe, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Service } from '@/types';
import AISDRVisualCard from '@/components/marketing/AISDRVisualCard';
import { IntegrationsVisual } from '@/components/services/visuals/IntegrationsVisual';
import { FinanceVisual } from '@/components/services/visuals/FinanceVisual';
import { ScriptVisual } from '@/components/services/visuals/ScriptVisual';

interface ServiceCardProps {
    service: Service;
    onFavoriteToggle?: (serviceId: string) => void;
    onDemoClick?: () => void;
}

const serviceTypeConfig: Record<string, { icon: typeof Zap; label: string }> = {
    automatizacion: { icon: Zap, label: 'Automatización' },
    ia_chatbot: { icon: Bot, label: 'IA & Chatbot' },
    workflow: { icon: Settings, label: 'Workflow' },
    script: { icon: Code, label: 'Script' },
    integracion: { icon: Globe, label: 'Integración' },
    consultoria: { icon: MessageSquare, label: 'Consultoría' },
};

export default function ServiceCard({ service, onFavoriteToggle, onDemoClick }: ServiceCardProps) {
    const [isFavorite, setIsFavorite] = useState(false); // TODO: Add favorite logic back when User model supports it
    const [imageError, setImageError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.(service.id);
    };

    // Fallback logic for property_type legacy field
    const serviceType = service.property_type || 'automatizacion';
    const config = serviceTypeConfig[serviceType] || serviceTypeConfig.automatizacion;
    const ServiceIcon = config.icon;
    const mainImage = service.image_urls?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80';
    // Handle both rating fields during migration
    const displayRating = service.rating || service.average_rating || 5.0;

    // Handle amenities/features legacy
    const technologies = service.features?.map(f => f.name) || service.amenities || [];

    return (
        <Link href={service.custom_url || `/soluciones/${service.id}`} className="group block h-full">
            <article className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                    {/* Dynamic Visual Rendering */}
                    {service.property_type === 'ia_chatbot' ? (
                        <AISDRVisualCard />
                    ) : (service.property_type === 'integracion' || service.category === 'integracion' || service.title.toLowerCase().includes('workflow')) ? (
                        <IntegrationsVisual />
                    ) : (service.property_type === 'automatizacion' || service.category === 'automatizacion') ? (
                        <FinanceVisual />
                    ) : (service.property_type === 'script' || service.category === 'script') ? (
                        <ScriptVisual />
                    ) : (
                        <Image
                            src={mainImage}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            onError={() => setImageError(true)}
                        />
                    )}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-xs font-semibold text-white border border-white/10 shadow-sm">
                            <ServiceIcon className="w-3 h-3 text-emerald-400" />
                            {config.label}
                        </span>
                    </div>
                    {/* is_script9_select logic */}
                    {service.is_script9_select && (
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-900/20">
                                SELECT
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {service.title.replace(/\*\*/g, '')}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-medium text-slate-300">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            {displayRating.toFixed(1)}
                        </div>
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
                        {service.description.replace(/\*\*/g, '')}
                    </p>

                    {/* Tech Stack / Features */}
                    {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {technologies.slice(0, 3).map((tech: string, i: number) => (
                                <span key={i} className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    {tech}
                                </span>
                            ))}
                            {technologies.length > 3 && (
                                <span className="text-xs text-slate-500 self-center">+{technologies.length - 3}</span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 uppercase tracking-wide">
                                {service.unit === 'project' ? 'Precio fijo' : 'Inversión'}
                            </span>
                            <span className="text-xl font-bold text-white">
                                {service.price_display_text ? (
                                    <span>{service.price_display_text}</span>
                                ) : (
                                    <span className="text-lg">Solución a medida</span>
                                )}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            {onDemoClick && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onDemoClick();
                                    }}
                                    className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                                >
                                    Ver Demo
                                </button>
                            )}
                            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
