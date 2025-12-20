'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Shield,
    Ban,
    CheckCircle,
    User,
} from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'guest' | 'host' | 'admin';
    email_verified: boolean;
    created_at: string;
    phone?: string;
}

export default function AdminUsuarios() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user?.role !== 'admin') {
            router.push('/');
            return;
        }

        fetchUsers();
    }, [session, status, router]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role: string) => {
        const styles = {
            admin: 'bg-emerald-100 text-emerald-700',
            host: 'bg-purple-100 text-purple-700',
            guest: 'bg-blue-100 text-blue-700',
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${styles[role as keyof typeof styles] || styles.guest
                    }`}
            >
                {role === 'admin' ? 'Admin' : role === 'host' ? 'Anfitrión' : 'Usuario'}
            </span>
        );
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
                    <div className="flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => router.push('/admin')}
                                className="text-sm text-[#8B5CF6] hover:underline mb-2"
                            >
                                ← Volver al Dashboard
                            </button>
                            <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">
                                Gestión de Usuarios
                            </h1>
                            <p className="mt-2 text-lg text-[#86868b]">
                                {filteredUsers.length} usuarios en total
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
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                        aria-label="Filtrar por rol"
                    >
                        <option value="all">Todos los roles</option>
                        <option value="guest">Usuarios</option>
                        <option value="host">Anfitriones</option>
                        <option value="admin">Administradores</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#f5f5f7] border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                        Registro
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-[#f5f5f7] transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-[#8B5CF6]" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-[#1d1d1f]">
                                                        {user.name}
                                                    </div>
                                                    {user.phone && (
                                                        <div className="text-sm text-[#86868b]">{user.phone}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-[#1d1d1f]">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.email_verified ? (
                                                <span className="flex items-center text-sm text-green-600">
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Verificado
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-sm text-orange-600">
                                                    <Mail className="w-4 h-4 mr-1" />
                                                    Pendiente
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#86868b]">
                                            {new Date(user.created_at).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-[#8B5CF6] hover:text-[#7c3aed] transition-colors"
                                                aria-label="Más opciones"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <User className="w-12 h-12 text-[#86868b] mx-auto mb-4" />
                                <p className="text-[#86868b]">No se encontraron usuarios</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


