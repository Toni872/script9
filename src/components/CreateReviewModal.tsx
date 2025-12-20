'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string;
    propertyTitle: string;
    onSuccess: () => void;
}

export default function CreateReviewModal({
    isOpen,
    onClose,
    bookingId,
    propertyTitle,
    onSuccess,
}: CreateReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [cleanlinessRating, setCleanlinessRating] = useState(0);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [accuracyRating, setAccuracyRating] = useState(0);
    const [locationRating, setLocationRating] = useState(0);
    const [valueRating, setValueRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (rating === 0) {
            setError('Por favor, selecciona una calificación general');
            return;
        }

        if (reviewText.length < 10) {
            setError('La reseña debe tener al menos 10 caracteres');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId,
                    rating,
                    cleanlinessRating: cleanlinessRating || undefined,
                    communicationRating: communicationRating || undefined,
                    accuracyRating: accuracyRating || undefined,
                    locationRating: locationRating || undefined,
                    valueRating: valueRating || undefined,
                    reviewText,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al crear la reseña');
            }

            onSuccess();
            onClose();

            // Reset form
            setRating(0);
            setCleanlinessRating(0);
            setCommunicationRating(0);
            setAccuracyRating(0);
            setLocationRating(0);
            setValueRating(0);
            setReviewText('');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const StarRating = ({
        value,
        setValue,
        label,
    }: {
        value: number;
        setValue: (val: number) => void;
        label: string;
    }) => {
        const [hovered, setHovered] = useState(0);

        return (
            <div>
                <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    {label}
                </label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setValue(star)}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                            className="transition-transform hover:scale-110"
                            aria-label={`${star} estrellas`}
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hovered || value)
                                    ? 'fill-[#10B981] text-[#10B981]'
                                    : 'text-gray-300'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1d1d1f]">
                                        Deja tu reseña
                                    </h2>
                                    <p className="text-sm text-[#86868b] mt-1">{propertyTitle}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-[#f5f5f7] transition-colors"
                                    aria-label="Cerrar modal"
                                >
                                    <X className="w-6 h-6 text-[#86868b]" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Error Message */}
                                {error && (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                        <p className="text-sm text-emerald-600">{error}</p>
                                    </div>
                                )}

                                {/* Overall Rating */}
                                <StarRating
                                    value={rating}
                                    setValue={setRating}
                                    label="Calificación General *"
                                />

                                {/* Detailed Ratings */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                    <StarRating
                                        value={cleanlinessRating}
                                        setValue={setCleanlinessRating}
                                        label="Limpieza"
                                    />
                                    <StarRating
                                        value={communicationRating}
                                        setValue={setCommunicationRating}
                                        label="Comunicación"
                                    />
                                    <StarRating
                                        value={accuracyRating}
                                        setValue={setAccuracyRating}
                                        label="Exactitud"
                                    />
                                    <StarRating
                                        value={locationRating}
                                        setValue={setLocationRating}
                                        label="Ubicación"
                                    />
                                    <StarRating
                                        value={valueRating}
                                        setValue={setValueRating}
                                        label="Relación calidad-precio"
                                    />
                                </div>

                                {/* Review Text */}
                                <div className="pt-4 border-t border-gray-200">
                                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                                        Tu experiencia *
                                    </label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Cuéntanos sobre tu experiencia en este espacio..."
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent resize-none"
                                        required
                                    />
                                    <p className="text-xs text-[#86868b] mt-2">
                                        Mínimo 10 caracteres ({reviewText.length}/10)
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={loading || rating === 0}
                                    >
                                        {loading ? 'Publicando...' : 'Publicar Reseña'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}


