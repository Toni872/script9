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
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pb-20 relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Header */}
            <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-[40px] font-semibold text-white mb-2">
                                Gestión de Reservas
                            </h1>
                            <p className="text-[17px] text-slate-400">
                                Administra todas las reservas de la plataforma
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/admin')}
                            className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-xl font-medium text-white hover:bg-slate-800 transition-colors"
                        >
                            Volver al Dashboard
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <p className="text-sm text-slate-400 mb-1">Total Reservas</p>
                            <p className="text-2xl font-bold text-white">{bookings.length}</p>
                        </div>
                        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4">
                            <p className="text-sm text-emerald-400 mb-1">Confirmadas</p>
                            <p className="text-2xl font-bold text-emerald-400">
                                {bookings.filter((b) => b.status === 'confirmed').length}
                            </p>
                        </div>
                        <div className="bg-yellow-950/30 border border-yellow-900/50 rounded-xl p-4">
                            <p className="text-sm text-yellow-400 mb-1">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-400">
                                {bookings.filter((b) => b.status === 'pending').length}
                            </p>
                        </div>
                        <div className="bg-purple-950/30 border border-purple-900/50 rounded-xl p-4">
                            <p className="text-sm text-purple-400 mb-1">Ingresos Totales</p>
                            <p className="text-2xl font-bold text-purple-400">
                                €{getTotalRevenue().toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-0">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar por propiedad, huésped o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 border border-slate-800 bg-slate-900/50 text-[15px] text-white placeholder:text-slate-600 rounded-xl shadow-sm focus:shadow-md focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 h-12 bg-slate-900/50 border border-slate-800 rounded-xl shadow-sm text-[15px] text-white focus:shadow-md focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none appearance-none pr-10"
                            aria-label="Filtrar por estado"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="pending">Pendientes</option>
                            <option value="confirmed">Confirmadas</option>
                            <option value="completed">Completadas</option>
                            <option value="cancelled">Canceladas</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
                {filteredBookings.length === 0 ? (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
                        <Calendar className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No se encontraron reservas
                        </h3>
                        <p className="text-slate-500">
                            Ajusta los filtros para ver más resultados
                        </p>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-sm overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-950/50 border-b border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Propiedad
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Huésped
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Fechas
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Personas
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {filteredBookings.map((booking, index) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.02 }}
                                            className="hover:bg-slate-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
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
                                                        <p className="font-medium text-white">
                                                            {booking.property?.title}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {booking.property?.city}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-white">
                                                    {booking.guest?.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {booking.guest?.email}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-300">
                                                    {formatDate(booking.check_in)}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    hasta {formatDate(booking.check_out)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-slate-300">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm">{booking.guests_count}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-emerald-400">
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
                                                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-slate-600"
                                                        title="Ver detalles"
                                                        aria-label="Ver detalles"
                                                    >
                                                        <Eye className="w-4 h-4 text-slate-400" />
                                                    </button>
                                                    {(booking.status === 'confirmed' ||
                                                        booking.status === 'pending') && (
                                                            <button
                                                                onClick={() => handleCancelBooking(booking.id)}
                                                                className="p-2 hover:bg-red-900/20 border border-transparent hover:border-red-900/30 rounded-lg transition-colors"
                                                                title="Cancelar reserva"
                                                                aria-label="Cancelar reserva"
                                                            >
                                                                <Ban className="w-4 h-4 text-red-500" />
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
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedBooking(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Detalles de la Reserva
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-500">ID de Reserva</p>
                                <p className="font-mono text-sm text-slate-300">{selectedBooking.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Propiedad</p>
                                <p className="font-medium text-white">{selectedBooking.property?.title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Huésped</p>
                                <p className="font-medium text-white">{selectedBooking.guest?.name}</p>
                                <p className="text-sm text-slate-500">{selectedBooking.guest?.email}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Check-in</p>
                                    <p className="font-medium text-white">{formatDate(selectedBooking.check_in)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Check-out</p>
                                    <p className="font-medium text-white">{formatDate(selectedBooking.check_out)}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    €{selectedBooking.total_amount.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="mt-6 w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
                        >
                            Cerrar
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}


