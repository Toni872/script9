'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Home,
    MapPin,
    Users,
    DollarSign,
    CheckCircle,
    XCircle,
    Eye,
    Trash2,
    Loader2,
    Edit,
} from 'lucide-react';
import Image from 'next/image';

interface Property {
    id: string;
    title: string;
    description: string;
    property_type: string;
    city: string;
    region: string;
    max_guests: number;
    price_per_hour: number;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
    images: string[];
    host: {
        name: string;
        email: string;
    };
}

export default function AdminPropiedades() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user?.role !== 'admin') {
            router.push('/');
            return;
        }

        fetchProperties();
    }, [session, status, router]);

    const fetchProperties = async () => {
        try {
            const response = await fetch('/api/properties/search?limit=1000&admin=true');
            if (response.ok) {
                const data = await response.json();
                setProperties(data.properties || []);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProperty = async (propertyId: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
            return;
        }

        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Propiedad eliminada exitosamente');
                fetchProperties();
            } else {
                alert('Error al eliminar la propiedad');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Error al eliminar la propiedad');
        }
    };

    const handleToggleStatus = async (propertyId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                alert(`Propiedad ${newStatus === 'active' ? 'activada' : 'desactivada'} exitosamente`);
                fetchProperties();
            } else {
                alert('Error al cambiar el estado');
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Error al cambiar el estado');
        }
    };

    const filteredProperties = properties.filter((property) => {
        const matchesSearch =
            property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.host?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
        const matchesType = typeFilter === 'all' || property.property_type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusBadge = (status: string) => {
        const styles = {
            active: 'bg-green-100 text-green-700',
            inactive: 'bg-gray-100 text-gray-700',
            pending: 'bg-yellow-100 text-yellow-700',
        };

        const labels = {
            active: 'Activa',
            inactive: 'Inactiva',
            pending: 'Pendiente',
        };

        return (
            <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.pending
                    }`}
            >
                {status === 'active' && <CheckCircle className="w-3 h-3" />}
                {status === 'inactive' && <XCircle className="w-3 h-3" />}
                {labels[status as keyof typeof labels] || status}
            </span>
        );
    };

    const getTypeLabel = (type: string) => {
        const labels: { [key: string]: string } = {
            villa: 'Villa',
            finca: 'Finca',
            loft: 'Loft',
            chalet: 'Chalet',
            atico: 'Ático',
            cortijo: 'Cortijo',
            casa: 'Casa',
            apartamento: 'Apartamento',
        };
        return labels[type] || type;
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
                                Gestión de Propiedades
                            </h1>
                            <p className="text-[17px] text-slate-400">
                                Administra todas las propiedades de la plataforma
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
                            <p className="text-sm text-slate-400 mb-1">Total Propiedades</p>
                            <p className="text-2xl font-bold text-white">{properties.length}</p>
                        </div>
                        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4">
                            <p className="text-sm text-emerald-400 mb-1">Activas</p>
                            <p className="text-2xl font-bold text-emerald-400">
                                {properties.filter((p) => p.status === 'active').length}
                            </p>
                        </div>
                        <div className="bg-yellow-950/30 border border-yellow-900/50 rounded-xl p-4">
                            <p className="text-sm text-yellow-400 mb-1">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-400">
                                {properties.filter((p) => p.status === 'pending').length}
                            </p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                            <p className="text-sm text-slate-400 mb-1">Inactivas</p>
                            <p className="text-2xl font-bold text-slate-300">
                                {properties.filter((p) => p.status === 'inactive').length}
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
                            placeholder="Buscar por título, ciudad o anfitrión..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 border border-slate-800 bg-slate-900/50 text-[15px] text-white placeholder:text-slate-600 rounded-xl shadow-sm focus:shadow-md focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                        />
                    </div>

                    {/* Filters */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 h-12 bg-slate-900/50 border border-slate-800 rounded-xl shadow-sm text-[15px] text-white focus:shadow-md focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none appearance-none pr-10"
                            aria-label="Filtrar por estado"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Activas</option>
                            <option value="pending">Pendientes</option>
                            <option value="inactive">Inactivas</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 h-12 bg-slate-900/50 border border-slate-800 rounded-xl shadow-sm text-[15px] text-white focus:shadow-md focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none appearance-none pr-10"
                            aria-label="Filtrar por tipo"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="villa">Villa</option>
                            <option value="finca">Finca</option>
                            <option value="loft">Loft</option>
                            <option value="chalet">Chalet</option>
                            <option value="atico">Ático</option>
                            <option value="cortijo">Cortijo</option>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
                {filteredProperties.length === 0 ? (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
                        <Home className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No se encontraron propiedades
                        </h3>
                        <p className="text-slate-500">
                            Ajusta los filtros para ver más resultados
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-500/30 transition-all group"
                            >
                                {/* Image */}
                                <div className="relative w-full h-48 bg-slate-950">
                                    <Image
                                        src={
                                            property.images?.[0] ||
                                            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
                                        }
                                        alt={property.title}
                                        fill
                                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {getStatusBadge(property.status)}
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-slate-900/90 backdrop-blur-sm border border-slate-700 px-3 py-1 rounded-full text-xs font-medium text-white">
                                            {getTypeLabel(property.property_type)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                        {property.title}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <MapPin className="w-4 h-4" />
                                            {property.city}, {property.region}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Users className="w-4 h-4" />
                                            Hasta {property.max_guests} personas
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                                            <DollarSign className="w-4 h-4" />
                                            €{property.price_per_hour}/hora
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-800 pt-3 mb-4">
                                        <p className="text-xs text-slate-500">Anfitrión</p>
                                        <p className="text-sm font-medium text-slate-300">
                                            {property.host?.name}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedProperty(property)}
                                            className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-slate-700"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(property.id, property.status)}
                                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${property.status === 'active'
                                                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                                : 'bg-emerald-900/20 text-emerald-400 border-emerald-900/30 hover:bg-emerald-900/30'
                                                }`}
                                        >
                                            {property.status === 'active' ? 'Desactivar' : 'Activar'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProperty(property.id)}
                                            className="p-2 bg-red-900/20 text-red-500 border border-red-900/30 rounded-xl hover:bg-red-900/40 transition-colors"
                                            title="Eliminar"
                                            aria-label="Eliminar propiedad"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Property Details Modal */}
            {selectedProperty && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedProperty(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="relative w-full h-64 bg-slate-950">
                            <Image
                                src={
                                    selectedProperty.images?.[0] ||
                                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop'
                                }
                                alt={selectedProperty.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {selectedProperty.title}
                                    </h3>
                                    <p className="text-slate-400">
                                        {selectedProperty.city}, {selectedProperty.region}
                                    </p>
                                </div>
                                {getStatusBadge(selectedProperty.status)}
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Tipo</p>
                                    <p className="font-medium text-slate-200">{getTypeLabel(selectedProperty.property_type)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Descripción</p>
                                    <p className="text-slate-300">{selectedProperty.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Capacidad</p>
                                        <p className="font-medium text-slate-200">{selectedProperty.max_guests} personas</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Precio por hora</p>
                                        <p className="font-medium text-emerald-400">
                                            €{selectedProperty.price_per_hour}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                    <p className="text-sm text-slate-500 mb-2">Anfitrión</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                            <span className="font-bold text-slate-400">{selectedProperty.host?.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{selectedProperty.host?.name}</p>
                                            <p className="text-sm text-slate-500">{selectedProperty.host?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedProperty(null)}
                                className="w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}


