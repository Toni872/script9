'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, MapPin, Users, DollarSign, Sparkles, Search } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface Property {
    id: string;
    title: string;
    description: string;
    property_type: string;
    city: string;
    region: string;
    price_per_hour: number;
    max_guests: number;
    image_urls: string[];
    status: string;
    created_at: string;
}

export default function HostPropertiesPage() {
    const { status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated') {
            fetchProperties();
        }

        // Mostrar mensaje de éxito si viene de crear/editar
        if (searchParams.get('success') === 'true') {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    }, [status, router, searchParams]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            console.log('📡 Fetching my properties...');
            const response = await fetch('/api/properties/my-properties');

            console.log('📊 Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Properties loaded:', data.properties?.length || 0);
                setProperties(data.properties || []);
            } else {
                const errorData = await response.json();
                console.error('❌ Error response:', errorData);
                alert(`Error: ${errorData.error || 'No se pudieron cargar las propiedades'}`);
            }
        } catch (error) {
            console.error('❌ Error fetching properties:', error);
            alert('Error al cargar propiedades. Revisa la consola.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (propertyId: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
            return;
        }

        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProperties(prev => prev.filter(p => p.id !== propertyId));
            } else {
                alert('Error al eliminar la propiedad');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Error al eliminar la propiedad');
        }
    };

    // Filtrar propiedades por búsqueda
    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.region.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-[17px] text-[#86868b] font-medium">Cargando tus propiedades...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header animado */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 rounded-full mb-4"
                            >
                                <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
                                <span className="text-sm font-semibold text-[#8B5CF6]">Panel de Anfitrión</span>
                            </motion.div>
                            <h1 className="text-[48px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">
                                Mis Propiedades
                            </h1>
                            <p className="text-[19px] text-[#86868b]">
                                Gestiona tus espacios y reservas
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Link href="/host/properties/new">
                                <button
                                    type="button"
                                    className="group relative px-8 py-3.5 bg-[#8B5CF6]/80 !text-white border border-[#8B5CF6] hover:bg-[#8B5CF6] rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] active:scale-[0.98] font-semibold text-[15px]"
                                >
                                    <span className="relative z-10 flex items-center gap-2 !text-white">
                                        <Plus className="w-5 h-5" />
                                        Nueva Propiedad
                                    </span>
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Barra de búsqueda funcional */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-md"
                    >
                        <div className="relative flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                                <Input
                                    type="text"
                                    placeholder="Buscar por nombre, ciudad o región..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            // La búsqueda ya es automática, solo agregamos feedback visual
                                            e.currentTarget.blur();
                                        }
                                    }}
                                    className="pl-12 pr-4 h-12 border-0 bg-white text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] rounded-xl shadow-sm focus:shadow-md transition-all"
                                />
                            </div>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="px-4 h-12 bg-white text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white rounded-xl transition-all duration-300 font-medium text-[14px] border border-[#8B5CF6] shadow-sm"
                                    aria-label="Limpiar búsqueda"
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <p className="text-[13px] text-[#86868b] mt-2">
                                Mostrando {filteredProperties.length} de {properties.length} propiedades
                            </p>
                        )}
                    </motion.div>
                </motion.div>

                {/* Success Message animado */}
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl flex items-center gap-3"
                    >
                        <Sparkles className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Propiedad guardada exitosamente</span>
                    </motion.div>
                )}

                {/* Properties Grid */}
                {filteredProperties.length === 0 && properties.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border-dashed border-2 border-gray-300 bg-white rounded-2xl">
                            <CardContent className="py-20 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                                    className="w-24 h-24 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Plus className="w-12 h-12 text-[#8B5CF6]" />
                                </motion.div>
                                <h3 className="text-[28px] font-semibold text-[#1d1d1f] mb-3">
                                    No tienes propiedades aún
                                </h3>
                                <p className="text-[17px] text-[#86868b] mb-8">
                                    Publica tu primer espacio y empieza a recibir reservas
                                </p>
                                <Link href="/host/properties/new">
                                    <button
                                        type="button"
                                        className="group relative px-8 py-3.5 bg-[#8B5CF6]/80 !text-white border border-[#8B5CF6] hover:bg-[#8B5CF6] rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] active:scale-[0.98] font-semibold text-[15px]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 !text-white">
                                            <Plus className="w-5 h-5" />
                                            Crear Primera Propiedad
                                        </span>
                                    </button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : filteredProperties.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-16 bg-white rounded-2xl border border-gray-200/50"
                    >
                        <Search className="h-16 w-16 text-[#86868b] mx-auto mb-4" />
                        <h3 className="text-[24px] font-semibold text-[#1d1d1f] mb-2">
                            No se encontraron resultados
                        </h3>
                        <p className="text-[17px] text-[#86868b] mb-6">
                            Intenta con otro término de búsqueda
                        </p>
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="px-6 py-2.5 bg-[#8B5CF6] !text-white rounded-lg hover:bg-[#7C3AED] transition-all duration-300 font-medium"
                        >
                            Limpiar búsqueda
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-2xl border border-gray-200/50 bg-white">
                                    {/* Image con hover effect */}
                                    <div className="relative h-56 bg-[#f5f5f7] overflow-hidden">
                                        {property.image_urls && property.image_urls.length > 0 ? (
                                            <Image
                                                src={property.image_urls[0]}
                                                alt={property.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Eye className="w-12 h-12 text-[#86868b]" />
                                            </div>
                                        )}

                                        {/* Status Badge premium */}
                                        <div className="absolute top-3 right-3">
                                            <Badge
                                                className={`${property.status === 'active'
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : property.status === 'draft'
                                                        ? 'bg-[#86868b] hover:bg-gray-600'
                                                        : 'bg-emerald-500 hover:bg-emerald-600'
                                                    } !text-white font-medium px-3 py-1 rounded-lg shadow-md`}
                                            >
                                                {property.status === 'active' ? 'Activa' : property.status === 'draft' ? 'Borrador' : 'Inactiva'}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-6">
                                        <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-4 line-clamp-2 group-hover:text-[#8B5CF6] transition-colors duration-300">
                                            {property.title}
                                        </h3>

                                        <div className="space-y-3 text-[14px] text-[#86868b] mb-6">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                                                <span>{property.city}, {property.region}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-[#8B5CF6]" />
                                                <span>Hasta {property.max_guests} personas</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-[#8B5CF6]" />
                                                <span className="font-semibold text-[#1d1d1f]">€{property.price_per_hour}/hora</span>
                                            </div>
                                        </div>

                                        {/* Actions - Mejorados */}
                                        <div className="flex gap-2">
                                            <Link href={`/soluciones/${property.id}`} className="flex-1">
                                                <button
                                                    type="button"
                                                    className="w-full px-4 py-2.5 bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white rounded-lg transition-all duration-300 font-medium text-[14px] flex items-center justify-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Ver
                                                </button>
                                            </Link>
                                            <Link href={`/host/properties/${property.id}/edit`} className="flex-1">
                                                <button
                                                    type="button"
                                                    className="w-full px-4 py-2.5 bg-[#8B5CF6] text-white hover:bg-[#7C3AED] rounded-lg transition-all duration-300 font-medium text-[14px] flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Editar
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(property.id)}
                                                className="px-3 py-2.5 bg-white border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 rounded-lg transition-all duration-300"
                                                aria-label="Eliminar propiedad"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}





