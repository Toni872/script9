'use client';

import { Star, User } from 'lucide-react';

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

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                            ? 'fill-[#10B981] text-[#10B981]'
                            : 'text-slate-700'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-[#10B981]/10 flex items-center justify-center overflow-hidden">
                        {review.guest.avatar_url ? (
                            <img
                                src={review.guest.avatar_url}
                                alt={review.guest.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-6 h-6 text-[#10B981]" />
                        )}
                    </div>

                    {/* Name and Date */}
                    <div>
                        <p className="font-semibold text-white">
                            {review.guest.name}
                        </p>
                        <p className="text-sm text-slate-400">{formatDate(review.created_at)}</p>
                    </div>
                </div>

                {/* Overall Rating */}
                <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-lg font-bold text-white">{review.rating}</span>
                </div>
            </div>

            {/* Detailed Ratings */}
            {(review.cleanliness_rating ||
                review.communication_rating ||
                review.accuracy_rating ||
                review.location_rating ||
                review.value_rating) && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4 pb-4 border-b border-slate-800">
                        {review.cleanliness_rating && (
                            <div className="text-center">
                                <p className="text-xs text-slate-400 mb-1">Limpieza</p>
                                <p className="text-sm font-semibold text-white">
                                    {review.cleanliness_rating}/5
                                </p>
                            </div>
                        )}
                        {review.communication_rating && (
                            <div className="text-center">
                                <p className="text-xs text-slate-400 mb-1">Comunicación</p>
                                <p className="text-sm font-semibold text-white">
                                    {review.communication_rating}/5
                                </p>
                            </div>
                        )}
                        {review.accuracy_rating && (
                            <div className="text-center">
                                <p className="text-xs text-slate-400 mb-1">Exactitud</p>
                                <p className="text-sm font-semibold text-white">
                                    {review.accuracy_rating}/5
                                </p>
                            </div>
                        )}
                        {review.location_rating && (
                            <div className="text-center">
                                <p className="text-xs text-slate-400 mb-1">Ubicación</p>
                                <p className="text-sm font-semibold text-white">
                                    {review.location_rating}/5
                                </p>
                            </div>
                        )}
                        {review.value_rating && (
                            <div className="text-center">
                                <p className="text-xs text-slate-400 mb-1">Relación calidad-precio</p>
                                <p className="text-sm font-semibold text-white">
                                    {review.value_rating}/5
                                </p>
                            </div>
                        )}
                    </div>
                )}

            {/* Review Text */}
            <p className="text-slate-300 leading-relaxed mb-4">{review.review_text}</p>

            {/* Host Response */}
            {review.host_response && (
                <div className="bg-slate-800 rounded-xl p-4 mt-4">
                    <p className="text-sm font-semibold text-white mb-2">
                        Respuesta del proveedor
                    </p>
                    <p className="text-sm text-slate-300 mb-2">{review.host_response}</p>
                    {review.host_response_date && (
                        <p className="text-xs text-[#86868b]">
                            {formatDate(review.host_response_date)}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}



