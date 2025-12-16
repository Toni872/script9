'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Users,
    Home,
    Calendar,
    TrendingUp,
    DollarSign,
    Activity,
    AlertCircle,
    CheckCircle,
} from 'lucide-react';

interface DashboardStats {
    totalUsers: number;
    totalProperties: number;
    totalBookings: number;
    totalRevenue: number;
    activeBookings: number;
    pendingApprovals: number;
    userGrowth: number;
    revenueGrowth: number;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user?.role !== 'admin') {
            router.push('/');
            return;
        }

        fetchStats();
    }, [session, status, router]);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B5CF6]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">
                            Panel de Administración
                        </h1>
                        <p className="mt-2 text-lg text-[#86868b]">
                            Gestiona usuarios, propiedades y reservas de Script9
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#86868b]">Usuarios Totales</p>
                                <p className="text-3xl font-bold text-[#1d1d1f] mt-2">
                                    {stats?.totalUsers?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-sm text-green-500 font-medium">
                                        +{stats?.userGrowth || 0}%
                                    </span>
                                    <span className="text-sm text-[#86868b] ml-1">este mes</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center">
                                <Users className="w-7 h-7 text-blue-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Properties */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#86868b]">Propiedades</p>
                                <p className="text-3xl font-bold text-[#1d1d1f] mt-2">
                                    {stats?.totalProperties?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500 mr-1" />
                                    <span className="text-sm text-orange-500 font-medium">
                                        {stats?.pendingApprovals || 0}
                                    </span>
                                    <span className="text-sm text-[#86868b] ml-1">pendientes</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-purple-50 flex items-center justify-center">
                                <Home className="w-7 h-7 text-[#8B5CF6]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Bookings */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#86868b]">Reservas Totales</p>
                                <p className="text-3xl font-bold text-[#1d1d1f] mt-2">
                                    {stats?.totalBookings?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <Activity className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-sm text-green-500 font-medium">
                                        {stats?.activeBookings || 0}
                                    </span>
                                    <span className="text-sm text-[#86868b] ml-1">activas</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center">
                                <Calendar className="w-7 h-7 text-green-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Revenue */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#86868b]">Ingresos Totales</p>
                                <p className="text-3xl font-bold text-[#1d1d1f] mt-2">
                                    €{stats?.totalRevenue?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-sm text-green-500 font-medium">
                                        +{stats?.revenueGrowth || 0}%
                                    </span>
                                    <span className="text-sm text-[#86868b] ml-1">este mes</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center">
                                <DollarSign className="w-7 h-7 text-emerald-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <button
                        onClick={() => router.push('/admin/usuarios')}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B5CF6] hover:shadow-lg transition-all text-left group"
                    >
                        <Users className="w-8 h-8 text-[#8B5CF6] mb-4" />
                        <h3 className="text-lg font-semibold text-[#1d1d1f] group-hover:text-[#8B5CF6] transition-colors">
                            Gestionar Usuarios
                        </h3>
                        <p className="text-sm text-[#86868b] mt-2">
                            Ver, editar y gestionar todos los usuarios de la plataforma
                        </p>
                    </button>

                    <button
                        onClick={() => router.push('/admin/propiedades')}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B5CF6] hover:shadow-lg transition-all text-left group"
                    >
                        <Home className="w-8 h-8 text-[#8B5CF6] mb-4" />
                        <h3 className="text-lg font-semibold text-[#1d1d1f] group-hover:text-[#8B5CF6] transition-colors">
                            Gestionar Propiedades
                        </h3>
                        <p className="text-sm text-[#86868b] mt-2">
                            Aprobar, rechazar y editar propiedades publicadas
                        </p>
                    </button>

                    <button
                        onClick={() => router.push('/admin/reservas')}
                        className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B5CF6] hover:shadow-lg transition-all text-left group"
                    >
                        <Calendar className="w-8 h-8 text-[#8B5CF6] mb-4" />
                        <h3 className="text-lg font-semibold text-[#1d1d1f] group-hover:text-[#8B5CF6] transition-colors">
                            Gestionar Reservas
                        </h3>
                        <p className="text-sm text-[#86868b] mt-2">
                            Ver todas las reservas y resolver problemas
                        </p>
                    </button>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-white rounded-2xl p-6 border border-gray-200"
                >
                    <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">
                        Actividad Reciente
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-[#f5f5f7] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-[#1d1d1f]">
                                    Nueva reserva confirmada
                                </p>
                                <p className="text-xs text-[#86868b]">Hace 5 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-[#f5f5f7] rounded-xl">
                            <AlertCircle className="w-5 h-5 text-orange-500 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-[#1d1d1f]">
                                    Propiedad pendiente de aprobación
                                </p>
                                <p className="text-xs text-[#86868b]">Hace 15 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-[#f5f5f7] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-[#1d1d1f]">
                                    Nuevo usuario registrado
                                </p>
                                <p className="text-xs text-[#86868b]">Hace 1 hora</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}





