'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    MapPin,
    Users,
    Home,
    Star,
    Clock,
    Check,
    Share2,
    Heart,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import { Service } from '@/types';

// Define Review type locally if not in shared types, or ideally move to types/index.ts
export interface Review {
    id: string;
    rating: number;
    cleanliness_rating?: number;
    communication_rating?: number;
    accuracy_rating?: number;
    location_rating?: number;
    value_rating?: number;
    review_text: string;
    host_response?: string;
    host_response_date?: string;
    created_at: string;
    guest: {
        id: string;
        name: string;
        avatar_url?: string;
    };
}

interface ServiceDetailClientProps {
    initialProperty: Service | null;
    propertyId: string;
}

export default function ServiceDetailClient({ initialProperty, propertyId }: ServiceDetailClientProps) {
    const router = useRouter();
    const { data: session } = useSession();

    const [property, setProperty] = useState<Service | null>(initialProperty);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);

    useEffect(() => {
        // If no initial property (e.g. static gen failed or fallback), fetch it
        if (!property && propertyId) {
            fetchProperty();
        }
        if (propertyId) {
            fetchReviews();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propertyId]);

    const fetchProperty = async () => {
        try {
            const response = await fetch(`/api/properties/${propertyId}`);
            if (response.ok) {
                const data = await response.json();
                // Transformation logic similar to original page if needed, 
                // but ideally API returns standard format.
                // For now assuming the API returns what we need or we reuse the transformation logic here if strictly necessary.
                // Given the context, let's keep it simple.
                setProperty(data); // Note: Might need the transformation logic if API is raw DB.
            }
        } catch (error) {
            console.error('Error fetching property:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`/api/reviews?propertyId=${propertyId}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews || []);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoadingReviews(false);
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const handleReservation = () => {
        // Pivot to High-Touch: Redirect to Contact instead of Checkout
        const subject = encodeURIComponent(`Solicitud de Auditoría: ${property?.title}`);
        router.push(`/contacto?subject=${subject}`);
    };

    const nextImage = () => {
        if (property?.image_urls && property.image_urls.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === property.image_urls!.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (property?.image_urls && property.image_urls.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.image_urls!.length - 1 : prev - 1
            );
        }
    };

    if (!property) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2">
                        Propiedad no encontrada
                    </h2>
                    <button
                        onClick={() => router.push('/soluciones')}
                        className="px-6 py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-colors hero-text-white"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
    const averageRating = calculateAverageRating();

    return (
        <div className="min-h-screen bg-slate-950 pb-20 pt-20">
            {/* Back Button */}
            <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-300 hover:text-[#10B981] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Volver
                    </button>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative h-[500px] rounded-3xl overflow-hidden">
                    <Image
                        src={
                            property.image_urls?.[currentImageIndex] ||
                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
                        }
                        alt={property.title}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Navigation Arrows */}
                    {property.image_urls && property.image_urls.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeft className="w-6 h-6 text-slate-900" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                                aria-label="Imagen siguiente"
                            >
                                <ChevronRight className="w-6 h-6 text-slate-900" />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                        {currentImageIndex + 1} / {property.image_urls?.length || 1}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                            aria-label="Compartir propiedad"
                        >
                            <Share2 className="w-5 h-5 text-[#1d1d1f]" />
                        </button>
                        <button
                            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                            aria-label="Guardar en favoritos"
                        >
                            <Heart className="w-5 h-5 text-[#1d1d1f]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title and Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-[40px] font-semibold text-white mb-3">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            {property.city}{property.region && `, ${property.region}`}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            {property.delivery_time || `${property.capacity || 1} semanas`}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Home className="w-5 h-5" />
                                            {property.property_type}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2 bg-[#10B981]/10 px-4 py-2 rounded-xl">
                                        <Star className="w-5 h-5 fill-[#10B981] text-[#10B981]" />
                                        <span className="text-lg font-bold text-white">
                                            {averageRating}
                                        </span>
                                        <span className="text-sm text-[#86868b]">
                                            ({reviews.length} reseñas)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <p className="text-[17px] text-slate-300 leading-relaxed">
                                {property.description}
                            </p>
                        </motion.div>

                        {/* Tech Stack */}
                        {(property.tech_stack?.length || 0) > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
                            >
                                <h2 className="text-2xl font-semibold text-white mb-6">
                                    Stack Tecnológico
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.tech_stack?.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-slate-300"
                                        >
                                            <Check className="w-5 h-5 text-[#10B981]" />
                                            <span>{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Reviews Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-white">
                                    Reseñas
                                    {reviews.length > 0 && (
                                        <span className="text-[#86868b] font-normal ml-2">
                                            ({reviews.length})
                                        </span>
                                    )}
                                </h2>

                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Star className="w-6 h-6 fill-[#10B981] text-[#10B981]" />
                                        <span className="text-2xl font-bold text-white">
                                            {averageRating}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {loadingReviews ? (
                                <div className="text-center py-12 text-gray-500">Cargando reseñas...</div>
                            ) : reviews.length === 0 ? (
                                <div className="text-center py-12">
                                    <Star className="w-16 h-16 text-[#86868b] mx-auto mb-4 opacity-30" />
                                    <p className="text-[#86868b]">
                                        Aún no hay reseñas para esta propiedad
                                    </p>
                                    <p className="text-sm text-[#86868b] mt-2">
                                        Sé el primero en dejar una reseña después de tu estancia
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        {displayedReviews.map((review) => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))}
                                    </div>

                                    {reviews.length > 3 && (
                                        <button
                                            onClick={() => setShowAllReviews(!showAllReviews)}
                                            className="mt-6 w-full px-6 py-3 border border-[#10B981] text-[#10B981] rounded-xl font-semibold hover:bg-[#10B981]/5 transition-colors"
                                        >
                                            {showAllReviews
                                                ? 'Ver menos reseñas'
                                                : `Ver todas las reseñas (${reviews.length})`}
                                        </button>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-800 sticky top-24"
                        >
                            <div className="mb-6">
                                {property.price_display_text ? (
                                    <span className="text-[32px] font-bold text-white">
                                        {property.price_display_text}
                                    </span>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xl font-medium text-emerald-400">Totalmente personalizado</span>
                                        <span className="text-[32px] font-bold text-white">
                                            Consultar Presupuesto
                                        </span>
                                    </div>
                                )}
                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm mt-2">
                                        <Star className="w-4 h-4 fill-[#10B981] text-[#10B981]" />
                                        <span className="font-semibold">{averageRating}</span>
                                        <span className="text-[#86868b]">
                                            ({reviews.length} reseñas)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Check className="w-5 h-5" />
                                    <span>{property.maintenance_support || 'Soporte incluido'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Clock className="w-5 h-5" />
                                    <span>Entrega: {property.delivery_time || 'Consultar'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Users className="w-5 h-5" />
                                    <span>Trato directo experto</span>
                                </div>
                            </div>

                            <button
                                onClick={handleReservation}
                                className="w-full px-6 py-4 bg-[#10B981] text-white rounded-xl font-semibold text-lg hover:bg-[#059669] transition-colors shadow-lg hover:shadow-xl hero-text-white"
                            >
                                Agendar Consultoría
                            </button>

                            <p className="text-center text-sm text-[#86868b] mt-4">
                                Sin compromiso inicial
                            </p>

                            {/* Precio fijo footer eliminado para modelo consultoría */}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
