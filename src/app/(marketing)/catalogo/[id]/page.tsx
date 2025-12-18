'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    MapPin,
    Users,
    Home,
    Star,
    Calendar,
    Clock,
    Check,
    Share2,
    Heart,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import { Service } from '@/types';

// Alias for easier refactor inside this file, or rename everything
type Property = Service;

interface Review {
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

export default function PropertyDetail() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const propertyId = params.id as string;

    const [property, setProperty] = useState<Property | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);

    useEffect(() => {
        if (propertyId) {
            fetchProperty();
            fetchReviews();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propertyId]);

    const fetchProperty = async () => {
        try {
            const response = await fetch(`/api/properties/${propertyId}`);
            if (!response.ok) {
                console.error('❌ Error al cargar propiedad:', response.status);
                setProperty(null);
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log('✅ Datos de propiedad recibidos:', data);

            // Transformar datos del API al formato Property
            // El API retorna directamente los campos de la BD
            const transformedProperty: Service = {
                id: data.id,
                title: data.title || data.name,
                description: data.description,
                category: data.category || data.property_type || 'General', // map category
                price: data.price || data.price_per_hour,
                unit: data.unit || 'project',
                location: data.address || data.location,
                city: data.city,
                region: data.region,

                // Mappings
                capacity: data.max_guests || data.capacity || 10,
                max_guests: data.max_guests || data.capacity || 10, // legacy

                image_urls: Array.isArray(data.image_urls) ? data.image_urls :
                    Array.isArray(data.images) ? data.images : [],

                rating: data.average_rating || data.rating || 0,
                review_count: data.review_count || 0,

                features: data.features || [],
                amenities: data.amenities || [], // legacy

                provider_id: data.host_id,
                host_id: data.host_id,
                created_at: data.created_at || new Date().toISOString(),
                updated_at: data.updated_at || new Date().toISOString(),

                is_script9_select: data.is_script9_select || false,
                property_type: data.property_type,
            };

            console.log('✅ Propiedad transformada:', transformedProperty);
            setProperty(transformedProperty);
        } catch (error) {
            console.error('❌ Error crítico fetching property:', error);
            setProperty(null);
        } finally {
            setLoading(false);
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
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const handleReservation = () => {
        if (!session) {
            router.push('/login');
            return;
        }
        // Aquí iría la lógica de reserva
        router.push(`/checkout?propertyId=${propertyId}`);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#EF4444]" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2">
                        Propiedad no encontrada
                    </h2>
                    <button
                        onClick={() => router.push('/catalogo')}
                        className="px-6 py-3 bg-[#EF4444] text-white rounded-xl font-semibold hover:bg-[#DC2626] transition-colors hero-text-white"
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
        <div className="min-h-screen bg-[#f5f5f7] pb-20">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#1d1d1f] hover:text-[#EF4444] transition-colors"
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
                    />

                    {/* Navigation Arrows */}
                    {property.image_urls && property.image_urls.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeft className="w-6 h-6 text-[#1d1d1f]" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                                aria-label="Imagen siguiente"
                            >
                                <ChevronRight className="w-6 h-6 text-[#1d1d1f]" />
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
                            className="bg-white rounded-2xl p-8"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-[40px] font-semibold text-[#1d1d1f] mb-3">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-[#86868b]">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            {property.city}{property.region && `, ${property.region}`}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            Hasta {property.max_guests} personas
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Home className="w-5 h-5" />
                                            {property.property_type}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2 bg-[#EF4444]/10 px-4 py-2 rounded-xl">
                                        <Star className="w-5 h-5 fill-[#EF4444] text-[#EF4444]" />
                                        <span className="text-lg font-bold text-[#1d1d1f]">
                                            {averageRating}
                                        </span>
                                        <span className="text-sm text-[#86868b]">
                                            ({reviews.length} reseñas)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <p className="text-[17px] text-[#1d1d1f] leading-relaxed">
                                {property.description}
                            </p>
                        </motion.div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl p-8"
                            >
                                <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-6">
                                    Comodidades
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.map((amenity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-[#1d1d1f]"
                                        >
                                            <Check className="w-5 h-5 text-[#EF4444]" />
                                            <span>{amenity}</span>
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
                            className="bg-white rounded-2xl p-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                                    Reseñas
                                    {reviews.length > 0 && (
                                        <span className="text-[#86868b] font-normal ml-2">
                                            ({reviews.length})
                                        </span>
                                    )}
                                </h2>

                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Star className="w-6 h-6 fill-[#EF4444] text-[#EF4444]" />
                                        <span className="text-2xl font-bold text-[#1d1d1f]">
                                            {averageRating}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {reviews.length === 0 ? (
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
                                            className="mt-6 w-full px-6 py-3 border border-[#EF4444] text-[#EF4444] rounded-xl font-semibold hover:bg-[#EF4444]/5 transition-colors"
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
                            className="bg-white rounded-2xl p-8 shadow-lg sticky top-24"
                        >
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-[40px] font-bold text-[#1d1d1f]">
                                        €{property.price_per_hour}
                                    </span>
                                    <span className="text-[#86868b]">/ proyecto</span>
                                </div>
                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Star className="w-4 h-4 fill-[#EF4444] text-[#EF4444]" />
                                        <span className="font-semibold">{averageRating}</span>
                                        <span className="text-[#86868b]">
                                            ({reviews.length} reseñas)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-[#86868b]">
                                    <Check className="w-5 h-5" />
                                    <span>Entrega Digital / Implementación</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#86868b]">
                                    <Clock className="w-5 h-5" />
                                    <span>Soporte incluido</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#86868b]">
                                    <Users className="w-5 h-5" />
                                    <span>Trato directo con el experto</span>
                                </div>
                            </div>

                            <button
                                onClick={handleReservation}
                                className="w-full px-6 py-4 bg-[#EF4444] text-white rounded-xl font-semibold text-lg hover:bg-[#DC2626] transition-colors shadow-lg hover:shadow-xl hero-text-white"
                            >
                                Contratar Servicio
                            </button>

                            <p className="text-center text-sm text-[#86868b] mt-4">
                                Pago seguro vía Stripe
                            </p>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[#86868b]">Precio del servicio</span>
                                    <span className="font-semibold">€{property.price_per_hour}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[#86868b]">Protección Script9</span>
                                    <span className="font-semibold text-green-600">Incluida</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

