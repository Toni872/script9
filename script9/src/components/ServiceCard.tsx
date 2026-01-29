'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Zap, Bot, Code, Settings, Globe, MessageSquare, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { useState } from 'react';
import { Service } from '@/types';
import AISDRVisualCard from '@/components/marketing/AISDRVisualCard';
import EnrichmentVisualCard from '@/components/services/visuals/EnrichmentVisualCard';
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
    ia_agent: { icon: Bot, label: 'Agente IA' },
    workflow: { icon: Settings, label: 'Workflow' },
    script: { icon: Code, label: 'Script' },
    data_intelligence: { icon: Code, label: 'Intelligence' },
    data_mining: { icon: Search, label: 'Data Mining' }, // New Type
    integracion: { icon: Globe, label: 'Integración' },
    desarrollo_medida: { icon: Globe, label: 'Ingeniería SaaS' },
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
            <article className="relative bg-[#020617] rounded-2xl border border-slate-800/60 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                {/* Header Background Image/Visual */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                    {/* Dynamic Visual Rendering */}
                    {(service.property_type === 'ia_agent') ? (
                        <div className="absolute inset-0">
                            <AISDRVisualCard />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                        </div>
                    ) : (service.property_type === 'data_mining') ? (
                        <div className="absolute inset-0">
                            <EnrichmentVisualCard />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                        </div>
                    ) : (
                        <Image
                            src={mainImage}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                    )}

                    {/* Status Indicators (Cyber Style) */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-xs font-mono tracking-widest text-emerald-400 uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {service.property_type === 'data_mining' ? 'SCANNING' : 'ONLINE'}
                        </div>
                    </div>

                    {/* SELECT Badge */}
                    {service.is_script9_select && (
                        <div className="absolute top-4 right-4">
                            <span className="px-2.5 py-1 bg-emerald-500 text-slate-950 text-xs font-bold tracking-tight uppercase rounded-sm shadow-lg">
                                SELECT
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col relative">
                    {/* Decorative Line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0" />

                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                        {service.title}
                    </h3>

                    {/* Description - Truncated cleanly */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                        {service.description.split('\n')[0]} {/* Take first paragraph only for card */}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-bold">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-200 font-medium flex items-center gap-1.5 shadow-sm">
                                    {tech === 'n8n' && <Zap className="w-3.5 h-3.5 text-yellow-500" />}
                                    {tech.includes('Gemini') && <Bot className="w-3.5 h-3.5 text-blue-400" />}
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-5 border-t border-slate-800/60 flex items-end justify-between">
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-bold mb-1">Inversión</p>
                            <p className="text-lg font-bold text-white tracking-tight">
                                {service.price_display_text || 'A medida'}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300 shadow-emerald-500/10 group-hover:shadow-emerald-500/50 hover:shadow-lg">
                            <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:text-slate-950" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
