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
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
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
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Panel de Administración
                        </h1>
                        <p className="mt-2 text-lg text-slate-400">
                            Gestiona usuarios, propiedades y reservas de Script9
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">Usuarios Totales</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {stats?.totalUsers?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                                    <span className="text-sm text-emerald-500 font-medium">
                                        +{stats?.userGrowth || 0}%
                                    </span>
                                    <span className="text-sm text-slate-500 ml-1">este mes</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                <Users className="w-7 h-7 text-blue-400" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Properties */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">Propiedades</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {stats?.totalProperties?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500 mr-1" />
                                    <span className="text-sm text-orange-500 font-medium">
                                        {stats?.pendingApprovals || 0}
                                    </span>
                                    <span className="text-sm text-slate-500 ml-1">pendientes</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                                <Home className="w-7 h-7 text-purple-400" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Bookings */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">Reservas Totales</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {stats?.totalBookings?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <Activity className="w-4 h-4 text-emerald-500 mr-1" />
                                    <span className="text-sm text-emerald-500 font-medium">
                                        {stats?.activeBookings || 0}
                                    </span>
                                    <span className="text-sm text-slate-500 ml-1">activas</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                                <Calendar className="w-7 h-7 text-emerald-400" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Revenue */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">Ingresos Totales</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    €{stats?.totalRevenue?.toLocaleString() || '0'}
                                </p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                                    <span className="text-sm text-emerald-500 font-medium">
                                        +{stats?.revenueGrowth || 0}%
                                    </span>
                                    <span className="text-sm text-slate-500 ml-1">este mes</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                                <DollarSign className="w-7 h-7 text-emerald-400" />
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
                        className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all text-left group"
                    >
                        <Users className="w-8 h-8 text-blue-500 mb-4 group-hover:text-blue-400 transition-colors" />
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            Gestionar Usuarios
                        </h3>
                        <p className="text-sm text-slate-400 mt-2 group-hover:text-slate-300">
                            Ver, editar y gestionar todos los usuarios de la plataforma
                        </p>
                    </button>


                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-slate-900/50 rounded-2xl p-6 border border-slate-800"
                >
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Actividad Reciente
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Nueva reserva confirmada
                                </p>
                                <p className="text-xs text-slate-500">Hace 5 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <AlertCircle className="w-5 h-5 text-orange-500 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Propiedad pendiente de aprobación
                                </p>
                                <p className="text-xs text-slate-500">Hace 15 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Nuevo usuario registrado
                                </p>
                                <p className="text-xs text-slate-500">Hace 1 hora</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}





