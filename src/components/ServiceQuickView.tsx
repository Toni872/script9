'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, ChevronLeft, ChevronRight,
    CheckCircle, Sparkles, Zap, Bot, Code, Settings, Globe, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/types';

interface ServiceQuickViewProps {
    service: Service;
    isOpen: boolean;
    onClose: () => void;
}

// Mapeo de tipos de servicio a iconos y etiquetas
const serviceTypeConfig: Record<string, { icon: typeof Zap; label: string; color: string }> = {
    automatizacion: { icon: Zap, label: 'Automatización', color: 'bg-purple-100 text-purple-700' },
    ia_chatbot: { icon: Bot, label: 'IA & Chatbot', color: 'bg-blue-100 text-blue-700' },
    workflow: { icon: Settings, label: 'Workflow', color: 'bg-green-100 text-green-700' },
    script: { icon: Code, label: 'Script', color: 'bg-orange-100 text-orange-700' },
    integracion: { icon: Globe, label: 'Integración', color: 'bg-cyan-100 text-cyan-700' },
    consultoria: { icon: MessageSquare, label: 'Consultoría', color: 'bg-pink-100 text-pink-700' },
};

// Mapeo de tecnologías
const techLabels: Record<string, string> = {
    python: 'Python',
    nodejs: 'Node.js',
    openai: 'OpenAI / GPT',
    make: 'Make',
    zapier: 'Zapier',
    n8n: 'n8n',
    api_rest: 'API REST',
    web_scraping: 'Web Scraping',
};

export default function ServiceQuickView({ service, isOpen, onClose }: ServiceQuickViewProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        if (service.image_urls) {
            setCurrentImageIndex((prev) => (prev + 1) % service.image_urls.length);
        }
    };

    const prevImage = () => {
        if (service.image_urls) {
            setCurrentImageIndex((prev) => (prev - 1 + service.image_urls.length) % service.image_urls.length);
        }
    };

    // Obtener configuración del tipo de servicio
    // Use fallback for property_type legacy
    const serviceType = (service as any).property_type || service.category || 'automatizacion';
    const config = serviceTypeConfig[serviceType] || serviceTypeConfig.automatizacion;
    const ServiceIcon = config.icon;

    // Convertir nivel / capacity
    const getServiceLevel = () => {
        const capacity = service.capacity || service.max_guests || 10;
        if (capacity <= 10) return { label: 'Básico', color: 'bg-gray-100 text-gray-700' };
        if (capacity <= 25) return { label: 'Standard', color: 'bg-blue-100 text-blue-700' };
        if (capacity <= 50) return { label: 'Profesional', color: 'bg-purple-100 text-purple-700' };
        return { label: 'Enterprise', color: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' };
    };

    const level = getServiceLevel();
    const technologies = service.features?.map(f => f.name) || (service as any).amenities || [];
    const displayRating = service.rating || (service as any).average_rating || 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="bg-white rounded-3xl shadow-script9-xl max-w-5xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full glass-script9 hover:bg-white shadow-script9-md transition-all duration-300 group"
                                aria-label="Cerrar vista rápida"
                            >
                                <X className="h-6 w-6 text-brand-neutral-800 group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                                {/* Left Side - Images */}
                                <div className="relative h-96 md:h-full bg-gradient-script9-soft">
                                    <Image
                                        src={service.image_urls?.[currentImageIndex] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Image Navigation */}
                                    {service.image_urls && service.image_urls.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass-script9 hover:bg-white shadow-script9-md transition-all duration-300"
                                                aria-label="Imagen anterior"
                                            >
                                                <ChevronLeft className="h-5 w-5 text-brand-primary-600" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass-script9 hover:bg-white shadow-script9-md transition-all duration-300"
                                                aria-label="Imagen siguiente"
                                            >
                                                <ChevronRight className="h-5 w-5 text-brand-primary-600" />
                                            </button>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 glass-script9 rounded-full shadow-script9-sm">
                                                <span className="text-sm font-semibold text-brand-neutral-800">
                                                    {currentImageIndex + 1} / {service.image_urls.length}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {service.is_script9_select && (
                                            <Badge className="bg-gradient-script9 text-white border-0 shadow-script9-md">
                                                <Sparkles className="h-3.5 w-3.5 mr-1" />
                                                Script9 Select
                                            </Badge>
                                        )}
                                        <Badge className={config.color}>
                                            <ServiceIcon className="h-3.5 w-3.5 mr-1" />
                                            {config.label}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Right Side - Content */}
                                <div className="p-6 md:p-8 space-y-6">
                                    {/* Header */}
                                    <div>
                                        <h2 className="text-3xl font-bold font-heading text-brand-neutral-900 mb-3">
                                            {service.title}
                                        </h2>
                                        <div className="flex items-center gap-3 text-brand-neutral-600">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${level.color}`}>
                                                {level.label}
                                            </span>
                                            {service.review_count > 0 && (
                                                <div className="flex items-center bg-gradient-script9-soft px-2.5 py-1 rounded-full">
                                                    <Star className="h-4 w-4 fill-brand-primary-600 text-brand-primary-600 mr-1" />
                                                    <span className="font-bold text-sm text-brand-primary-700">
                                                        {displayRating.toFixed(1)}
                                                    </span>
                                                    <span className="text-xs text-brand-primary-600 ml-1">
                                                        ({service.review_count} reviews)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="p-4 bg-gradient-script9-soft rounded-xl border border-brand-primary-100">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold font-heading bg-gradient-script9 bg-clip-text text-transparent">
                                                €{service.price}
                                            </span>
                                            <span className="text-brand-neutral-600">
                                                {service.unit === 'project' ? '/ proyecto' : `/ ${service.unit || 'proyecto'}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="font-semibold text-brand-neutral-900 mb-2">Descripción del Servicio</h3>
                                        <p className="text-sm text-brand-neutral-700 line-clamp-4 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    {technologies.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-brand-neutral-900 mb-2">Tecnologías Utilizadas</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {technologies.slice(0, 6).map((tech: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-1.5 text-xs bg-brand-primary-50 text-brand-primary-700 px-3 py-1.5 rounded-full border border-brand-primary-100"
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5" />
                                                        {techLabels[tech] || tech}
                                                    </div>
                                                ))}
                                                {technologies.length > 6 && (
                                                    <span className="text-xs text-brand-primary-600 px-3 py-1.5 bg-brand-primary-50 rounded-full font-medium">
                                                        +{technologies.length - 6} más
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Buttons */}
                                    <div className="space-y-3 pt-4">
                                        <Link href={`/catalogo/${service.id}`} onClick={onClose}>
                                            <Button className="w-full bg-gradient-script9 text-white hover:shadow-script9-glow border-0 font-semibold py-6 rounded-xl">
                                                Ver Detalles Completos
                                            </Button>
                                        </Link>
                                        <Link href="/contacto" onClick={onClose}>
                                            <Button variant="outline" className="w-full border-brand-primary-600 text-brand-primary-600 hover:bg-brand-primary-50 font-semibold">
                                                <MessageSquare className="h-5 w-5 mr-2" />
                                                Solicitar Información
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
