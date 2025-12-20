'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    Users,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock,
    Loader2,
    Eye,
    Ban,
} from 'lucide-react';
import Image from 'next/image';

interface Booking {
    id: string;
    property_id: string;
    guest_id: string;
    check_in: string;
    check_out: string;
    guests_count: number;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    payment_status: string;
    created_at: string;
    property?: {
        title: string;
        city: string;
        images: string[];
    };
    guest?: {
        name: string;
        email: string;
    };
}

export default function AdminReservas() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user?.role !== 'admin') {
            router.push('/');
            return;
        }

        fetchBookings();
    }, [session, status, router]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings?admin=true');
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminOverride: true }),
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
        const matchesSearch =
            booking.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.guest?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
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
        });
    };

    const getTotalRevenue = () => {
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
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-[40px] font-semibold text-[#1d1d1f] mb-2">
                                Gestión de Reservas
                            </h1>
                            <p className="text-[17px] text-[#86868b]">
                                Administra todas las reservas de la plataforma
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/admin')}
                            className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-[#1d1d1f] hover:bg-gray-50 transition-colors"
                        >
                            Volver al Dashboard
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-[#f5f5f7] rounded-xl p-4">
                            <p className="text-sm text-[#86868b] mb-1">Total Reservas</p>
                            <p className="text-2xl font-bold text-[#1d1d1f]">{bookings.length}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-sm text-green-700 mb-1">Confirmadas</p>
                            <p className="text-2xl font-bold text-green-700">
                                {bookings.filter((b) => b.status === 'confirmed').length}
                            </p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4">
                            <p className="text-sm text-yellow-700 mb-1">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-700">
                                {bookings.filter((b) => b.status === 'pending').length}
                            </p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4">
                            <p className="text-sm text-purple-700 mb-1">Ingresos Totales</p>
                            <p className="text-2xl font-bold text-purple-700">
                                €{getTotalRevenue().toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                        <input
                            type="text"
                            placeholder="Buscar por propiedad, huésped o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 border-0 bg-white text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] rounded-xl shadow-sm focus:shadow-md transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 h-12 bg-white border-0 rounded-xl shadow-sm text-[15px] text-[#1d1d1f] focus:shadow-md transition-all"
                        aria-label="Filtrar por estado"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pending">Pendientes</option>
                        <option value="confirmed">Confirmadas</option>
                        <option value="completed">Completadas</option>
                        <option value="cancelled">Canceladas</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center">
                        <Calendar className="w-16 h-16 text-[#86868b] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                            No se encontraron reservas
                        </h3>
                        <p className="text-[#86868b]">
                            Ajusta los filtros para ver más resultados
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#f5f5f7] border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Propiedad
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Huésped
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Fechas
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Personas
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredBookings.map((booking, index) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.02 }}
                                            className="hover:bg-[#f5f5f7] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={
                                                                booking.property?.images?.[0] ||
                                                                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop'
                                                            }
                                                            alt={booking.property?.title || 'Propiedad'}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[#1d1d1f]">
                                                            {booking.property?.title}
                                                        </p>
                                                        <p className="text-xs text-[#86868b]">
                                                            {booking.property?.city}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-[#1d1d1f]">
                                                    {booking.guest?.name}
                                                </p>
                                                <p className="text-xs text-[#86868b]">
                                                    {booking.guest?.email}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-[#1d1d1f]">
                                                    {formatDate(booking.check_in)}
                                                </p>
                                                <p className="text-xs text-[#86868b]">
                                                    hasta {formatDate(booking.check_out)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-[#1d1d1f]">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm">{booking.guests_count}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-[#1d1d1f]">
                                                    €{booking.total_amount.toFixed(2)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(booking.status)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedBooking(booking)}
                                                        className="p-2 hover:bg-[#8B5CF6]/10 rounded-lg transition-colors"
                                                        title="Ver detalles"
                                                        aria-label="Ver detalles"
                                                    >
                                                        <Eye className="w-4 h-4 text-[#8B5CF6]" />
                                                    </button>
                                                    {(booking.status === 'confirmed' ||
                                                        booking.status === 'pending') && (
                                                            <button
                                                                onClick={() => handleCancelBooking(booking.id)}
                                                                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                                                                title="Cancelar reserva"
                                                                aria-label="Cancelar reserva"
                                                            >
                                                                <Ban className="w-4 h-4 text-emerald-600" />
                                                            </button>
                                                        )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                                <p className="text-sm text-[#86868b]">Total</p>
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


