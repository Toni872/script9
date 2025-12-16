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
                                Gestión de Propiedades
                            </h1>
                            <p className="text-[17px] text-[#86868b]">
                                Administra todas las propiedades de la plataforma
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
                            <p className="text-sm text-[#86868b] mb-1">Total Propiedades</p>
                            <p className="text-2xl font-bold text-[#1d1d1f]">{properties.length}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-sm text-green-700 mb-1">Activas</p>
                            <p className="text-2xl font-bold text-green-700">
                                {properties.filter((p) => p.status === 'active').length}
                            </p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4">
                            <p className="text-sm text-yellow-700 mb-1">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-700">
                                {properties.filter((p) => p.status === 'pending').length}
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-4">
                            <p className="text-sm text-gray-700 mb-1">Inactivas</p>
                            <p className="text-2xl font-bold text-gray-700">
                                {properties.filter((p) => p.status === 'inactive').length}
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
                            placeholder="Buscar por título, ciudad o anfitrión..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 border-0 bg-white text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] rounded-xl shadow-sm focus:shadow-md transition-all"
                        />
                    </div>

                    {/* Filters */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 h-12 bg-white border-0 rounded-xl shadow-sm text-[15px] text-[#1d1d1f] focus:shadow-md transition-all"
                        aria-label="Filtrar por estado"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="active">Activas</option>
                        <option value="pending">Pendientes</option>
                        <option value="inactive">Inactivas</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 h-12 bg-white border-0 rounded-xl shadow-sm text-[15px] text-[#1d1d1f] focus:shadow-md transition-all"
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
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredProperties.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center">
                        <Home className="w-16 h-16 text-[#86868b] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                            No se encontraron propiedades
                        </h3>
                        <p className="text-[#86868b]">
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
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                            >
                                {/* Image */}
                                <div className="relative w-full h-48">
                                    <Image
                                        src={
                                            property.images?.[0] ||
                                            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
                                        }
                                        alt={property.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {getStatusBadge(property.status)}
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#1d1d1f]">
                                            {getTypeLabel(property.property_type)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 line-clamp-1">
                                        {property.title}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-[#86868b]">
                                            <MapPin className="w-4 h-4" />
                                            {property.city}, {property.region}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#86868b]">
                                            <Users className="w-4 h-4" />
                                            Hasta {property.max_guests} personas
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-[#8B5CF6]">
                                            <DollarSign className="w-4 h-4" />
                                            €{property.price_per_hour}/hora
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-3 mb-4">
                                        <p className="text-xs text-[#86868b]">Anfitrión</p>
                                        <p className="text-sm font-medium text-[#1d1d1f]">
                                            {property.host?.name}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedProperty(property)}
                                            className="flex-1 px-4 py-2 bg-[#f5f5f7] text-[#1d1d1f] rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(property.id, property.status)}
                                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${property.status === 'active'
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                        >
                                            {property.status === 'active' ? 'Desactivar' : 'Activar'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProperty(property.id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
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
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProperty(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="relative w-full h-64">
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
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">
                                        {selectedProperty.title}
                                    </h3>
                                    <p className="text-[#86868b]">
                                        {selectedProperty.city}, {selectedProperty.region}
                                    </p>
                                </div>
                                {getStatusBadge(selectedProperty.status)}
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-sm text-[#86868b] mb-1">Tipo</p>
                                    <p className="font-medium">{getTypeLabel(selectedProperty.property_type)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#86868b] mb-1">Descripción</p>
                                    <p className="text-[#1d1d1f]">{selectedProperty.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-[#86868b] mb-1">Capacidad</p>
                                        <p className="font-medium">{selectedProperty.max_guests} personas</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#86868b] mb-1">Precio por hora</p>
                                        <p className="font-medium text-[#8B5CF6]">
                                            €{selectedProperty.price_per_hour}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-[#86868b] mb-1">Anfitrión</p>
                                    <p className="font-medium">{selectedProperty.host?.name}</p>
                                    <p className="text-sm text-[#86868b]">{selectedProperty.host?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedProperty(null)}
                                className="w-full px-6 py-3 bg-[#8B5CF6] text-white rounded-xl font-semibold hover:bg-[#7c3aed] transition-colors"
                                style={{ color: 'white' }} /* Forzar color blanco */
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


