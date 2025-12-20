'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Users,
    Mail,
    Phone,
    CheckCircle,
    XCircle,
    Clock,
    Loader2,
    MessageSquare,
    Eye,
} from 'lucide-react';
import Image from 'next/image';

interface Booking {
    id: string;
    property_id: string;
    check_in: string;
    check_out: string;
    guests_count: number;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    payment_status: string;
    guest_notes?: string;
    created_at: string;
    property?: {
        id: string;
        title: string;
        images: string[];
    };
    guest?: {
        name: string;
        email: string;
        phone?: string;
    };
}

export default function HostReservas() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || (session.user?.role !== 'host' && session.user?.role !== 'admin')) {
            router.push('/');
            return;
        }

        fetchBookings();
    }, [session, status, router]);

    const fetchBookings = async () => {
        try {
            // Endpoint que devuelve las reservas de las propiedades del host
            const response = await fetch('/api/bookings?hostView=true');
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

    const handleConfirmBooking = async (bookingId: string) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}/confirm`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Reserva confirmada exitosamente');
                fetchBookings();
            } else {
                alert('Error al confirmar la reserva');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Error al confirmar la reserva');
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
                {status === 'pending' && <Clock className="w-3 h-3" />}
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

    const getTotalEarnings = () => {
        return bookings
            .filter((b) => b.status !== 'cancelled')
            .reduce((sum, b) => sum + b.total_amount, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#8B5CF6]" />
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
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-[40px] font-semibold text-[#1d1d1f] mb-2">
                                Reservas de Mis Propiedades
                            </h1>
                            <p className="text-[17px] text-[#86868b]">
                                Gestiona las reservas de tus espacios
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/host/properties')}
                            className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-[#1d1d1f] hover:bg-gray-50 transition-colors"
                        >
                            Mis Propiedades
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-[#f5f5f7] rounded-xl p-4">
                            <p className="text-sm text-[#86868b] mb-1">Total Reservas</p>
                            <p className="text-2xl font-bold text-[#1d1d1f]">{bookings.length}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4">
                            <p className="text-sm text-yellow-700 mb-1">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-700">
                                {bookings.filter((b) => b.status === 'pending').length}
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-sm text-green-700 mb-1">Confirmadas</p>
                            <p className="text-2xl font-bold text-green-700">
                                {bookings.filter((b) => b.status === 'confirmed').length}
                            </p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4">
                            <p className="text-sm text-purple-700 mb-1">Ingresos Totales</p>
                            <p className="text-2xl font-bold text-purple-700">
                                €{getTotalEarnings().toFixed(2)}
                            </p>
                        </div>
                    </div>
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
                            ? 'bg-[#8B5CF6] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Todas ({bookings.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('pending')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'pending'
                            ? 'bg-[#8B5CF6] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Pendientes ({bookings.filter((b) => b.status === 'pending').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('confirmed')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'confirmed'
                            ? 'bg-[#8B5CF6] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Confirmadas ({bookings.filter((b) => b.status === 'confirmed').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('completed')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === 'completed'
                            ? 'bg-[#8B5CF6] text-white'
                            : 'bg-white text-[#1d1d1f] hover:bg-gray-50'
                            }`}
                    >
                        Completadas ({bookings.filter((b) => b.status === 'completed').length})
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
                            Tus espacios aparecerán aquí cuando recibas reservas
                        </p>
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
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm text-[#86868b]">
                                                        <Users className="w-4 h-4" />
                                                        {booking.guest?.name}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-[#86868b]">
                                                        <Mail className="w-4 h-4" />
                                                        {booking.guest?.email}
                                                    </div>
                                                    {booking.guest?.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-[#86868b]">
                                                            <Phone className="w-4 h-4" />
                                                            {booking.guest.phone}
                                                        </div>
                                                    )}
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

                                        {/* Guest Notes */}
                                        {booking.guest_notes && (
                                            <div className="mb-4 p-3 bg-[#f5f5f7] rounded-xl">
                                                <p className="text-xs text-[#86868b] mb-1">Notas del huésped</p>
                                                <p className="text-sm text-[#1d1d1f]">{booking.guest_notes}</p>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-[#86868b]">Ingreso</p>
                                                <p className="text-2xl font-bold text-[#8B5CF6]">
                                                    €{booking.total_amount.toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Confirm Button */}
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleConfirmBooking(booking.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                                                        style={{ color: 'white' }} /* Forzar color blanco */
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Confirmar
                                                    </button>
                                                )}

                                                {/* Details Button */}
                                                <button
                                                    onClick={() => setSelectedBooking(booking)}
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#1d1d1f] rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Detalles
                                                </button>

                                                {/* Cancel Button */}
                                                {(booking.status === 'confirmed' || booking.status === 'pending') && (
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="flex items-center gap-2 px-4 py-2 border border-emerald-300 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Cancelar
                                                    </button>
                                                )}

                                                {/* Contact Guest */}
                                                <button
                                                    className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-xl font-medium hover:bg-[#7c3aed] transition-colors"
                                                    style={{ color: 'white' }} /* Forzar color blanco */
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    Contactar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedBooking(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl max-w-2xl w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">
                            Detalles de la Reserva
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-[#86868b]">ID de Reserva</p>
                                <p className="font-mono text-sm">{selectedBooking.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#86868b]">Propiedad</p>
                                <p className="font-medium">{selectedBooking.property?.title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#86868b]">Huésped</p>
                                <p className="font-medium">{selectedBooking.guest?.name}</p>
                                <p className="text-sm text-[#86868b]">{selectedBooking.guest?.email}</p>
                                {selectedBooking.guest?.phone && (
                                    <p className="text-sm text-[#86868b]">{selectedBooking.guest.phone}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[#86868b]">Check-in</p>
                                    <p className="font-medium">{formatDate(selectedBooking.check_in)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#86868b]">Check-out</p>
                                    <p className="font-medium">{formatDate(selectedBooking.check_out)}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[#86868b]">Número de huéspedes</p>
                                <p className="font-medium">{selectedBooking.guests_count} personas</p>
                            </div>
                            {selectedBooking.guest_notes && (
                                <div>
                                    <p className="text-sm text-[#86868b]">Notas del huésped</p>
                                    <p className="text-[#1d1d1f]">{selectedBooking.guest_notes}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-[#86868b]">Ingreso total</p>
                                <p className="text-2xl font-bold text-[#8B5CF6]">
                                    €{selectedBooking.total_amount.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="mt-6 w-full px-6 py-3 bg-[#8B5CF6] text-white rounded-xl font-semibold hover:bg-[#7c3aed] transition-colors"
                            style={{ color: 'white' }} /* Forzar color blanco */
                        >
                            Cerrar
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}


