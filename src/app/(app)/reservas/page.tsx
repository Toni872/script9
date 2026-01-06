'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Star,
    MessageSquare,
    X,
    CheckCircle,
    XCircle,
    Loader2,
} from 'lucide-react';
import Image from 'next/image';
import CreateReviewModal from '@/components/CreateReviewModal';

interface Booking {
    id: string;
    property_id: string;
    check_in: string;
    check_out: string;
    guests_count: number;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    payment_status: string;
    created_at: string;
    property?: {
        id: string;
        title: string;
        city: string;
        region: string;
        images: string[];
        property_type: string;
    };
    review?: {
        id: string;
        rating: number;
    };
}

export default function MisReservas() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/login');
            return;
        }

        fetchBookings();
    }, [session, status, router]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            if (response.ok) {
                const data = await response.json();
                setBookings(data.bookings || []);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            return;
        }

        try {
            const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Reserva cancelada exitosamente');
                fetchBookings();
            } else {
                alert('Error al cancelar la reserva');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            alert('Error al cancelar la reserva');
        }
    };

    const openReviewModal = (booking: Booking) => {
        setSelectedBooking(booking);
        setReviewModalOpen(true);
    };

    const filteredBookings = bookings.filter((booking) => {
        if (statusFilter === 'all') return true;
        return booking.status === statusFilter;
    });

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-green-100 text-green-700',
            completed: 'bg-blue-100 text-blue-700',
            cancelled: 'bg-emerald-100 text-emerald-700',
        };

        const labels = {
            pending: 'Pendiente',
            confirmed: 'Confirmada',
            completed: 'Completada',
            cancelled: 'Cancelada',
        };

        return (
            <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.pending
                    }`}
            >
                {status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                {status === 'cancelled' && <XCircle className="w-3 h-3" />}
                {labels[status as keyof typeof labels] || status}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const canLeaveReview = (booking: Booking) => {
        return booking.status === 'completed' && !booking.review;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#10B981]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-b border-gray-200"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-[40px] font-semibold text-[#1d1d1f] mb-2">
                        Mis Reservas
                    </h1>
                    <p className="text-[17px] text-[#86868b]">
                        Gestiona tus reservas y deja reseñas de tu experiencia
                    </p>
                </div>
            </motion.div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-3"
                >
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'all'
                            ? 'bg-[#10B981] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Todas ({bookings.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('confirmed')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'confirmed'
                            ? 'bg-[#10B981] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Confirmadas ({bookings.filter((b) => b.status === 'confirmed').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('completed')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'completed'
                            ? 'bg-[#10B981] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Completadas ({bookings.filter((b) => b.status === 'completed').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('cancelled')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'cancelled'
                            ? 'bg-[#10B981] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Canceladas ({bookings.filter((b) => b.status === 'cancelled').length})
                    </button>
                </motion.div>
            </div>

            {/* Bookings List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredBookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-12 text-center"
                    >
                        <Calendar className="w-16 h-16 text-[#86868b] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                            No tienes reservas
                        </h3>
                        <p className="text-[#86868b] mb-6">
                            Explora nuestros espacios y haz tu primera reserva
                        </p>
                        <button
                            onClick={() => router.push('/soluciones')}
                            className="px-6 py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-colors"
                            style={{ color: 'white' }} /* Forzar color blanco para botones premium */
                        >
                            Explorar Espacios
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {filteredBookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                                        <Image
                                            src={
                                                booking.property?.images?.[0] ||
                                                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
                                            }
                                            alt={booking.property?.title || 'Propiedad'}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            {getStatusBadge(booking.status)}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                                                    {booking.property?.title || 'Propiedad'}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-[#86868b]">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.property?.city}, {booking.property?.region}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {booking.guests_count} personas
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                                            <div>
                                                <p className="text-xs text-[#86868b] mb-1">Check-in</p>
                                                <p className="text-sm font-medium text-[#1d1d1f]">
                                                    {formatDate(booking.check_in)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#86868b] mb-1">Check-out</p>
                                                <p className="text-sm font-medium text-[#1d1d1f]">
                                                    {formatDate(booking.check_out)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-[#86868b]">Total pagado</p>
                                                <p className="text-2xl font-bold text-[#1d1d1f]">
                                                    €{booking.total_amount.toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Leave Review Button */}
                                                {canLeaveReview(booking) && (
                                                    <button
                                                        onClick={() => openReviewModal(booking)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-xl font-medium hover:bg-[#059669] transition-colors"
                                                        style={{ color: 'white' }} /* Forzar color blanco */
                                                    >
                                                        <Star className="w-4 h-4" />
                                                        Dejar Reseña
                                                    </button>
                                                )}

                                                {/* Review Left Indicator */}
                                                {booking.review && (
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium">
                                                        <CheckCircle className="w-4 h-4" />
                                                        Reseña publicada
                                                    </div>
                                                )}

                                                {/* Cancel Button */}
                                                {booking.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="flex items-center gap-2 px-4 py-2 border border-emerald-300 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Cancelar
                                                    </button>
                                                )}

                                                {/* Contact Host */}
                                                {(booking.status === 'confirmed' ||
                                                    booking.status === 'pending') && (
                                                        <button
                                                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#1d1d1f] rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                                        >
                                                            <MessageSquare className="w-4 h-4" />
                                                            Contactar
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {selectedBooking && (
                <CreateReviewModal
                    isOpen={reviewModalOpen}
                    onClose={() => {
                        setReviewModalOpen(false);
                        setSelectedBooking(null);
                    }}
                    bookingId={selectedBooking.id}
                    propertyTitle={selectedBooking.property?.title || 'Propiedad'}
                    onSuccess={() => {
                        fetchBookings();
                        setReviewModalOpen(false);
                        setSelectedBooking(null);
                    }}
                />
            )}
        </div>
    );
}


