'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BarChart3, DollarSign, Eye, Settings, LogOut, Plus, Edit, Sparkles, Code, Globe, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

interface Service {
    id: string;
    title: string;
    status: 'active' | 'inactive' | 'pending';
    sales: number;
    revenue: number;
    views: number;
    is_script9_select?: boolean;
}

interface Sale {
    id: string;
    clientName: string;
    serviceTitle: string;
    date: string;
    amount: number;
    status: 'completed' | 'refunded';
}

export default function CreatorDashboard() {
    const [activeTab, setActiveTab] = useState<'resumen' | 'servicios' | 'ventas'>('resumen');
    const [services, setServices] = useState<Service[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);
    const [creatorName, setCreatorName] = useState('Creator');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // 1. Obtener usuario actual
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                return;
            }

            setCreatorName(user.user_metadata?.name || user.email?.split('@')[0] || 'Creator');

            // 2. Obtener servicios reales del usuario (mapped from 'properties' table)
            const { data: realServices, error } = await supabase
                .from('properties')
                .select('*')
                .eq('host_id', user.id);

            if (error) throw error;

            if (realServices) {
                const mappedServices: Service[] = realServices.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    status: p.status || 'active',
                    sales: 0, // TODO: Connect to real orders table
                    revenue: 0,
                    views: 0,
                    is_script9_select: p.is_script9_select
                }));
                setServices(mappedServices);
            }

        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    };

    const totalRevenue = services.reduce((sum, s) => sum + s.revenue, 0);
    const totalSales = services.reduce((sum, s) => sum + s.sales, 0);
    const totalViews = services.reduce((sum, s) => sum + s.views, 0);

    const getStatusBadge = (status: Service['status']) => {
        const config = {
            active: { label: 'Activo', className: 'bg-green-100 text-green-700' },
            inactive: { label: 'Inactivo', className: 'bg-gray-100 text-gray-700' },
            pending: { label: 'Revisión', className: 'bg-yellow-100 text-yellow-700' },
        };
        const { label, className } = config[status];
        return <Badge className={className}>{label}</Badge>;
    };

    const handlePromote = async (propertyId: string) => {
        try {
            const res = await fetch('/api/stripe/promote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ propertyId })
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else alert('Error: ' + (data.error || 'No se pudo iniciar el pago'));
        } catch (e) {
            alert('Error de conexión');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800 text-white py-12">
                <div className="container-script9">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                                Panel de Creator 🚀
                            </h1>
                            <p className="text-white/80 font-mono text-sm">Gestiona y escala tus servicios digitales</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={() => alert('Función de cerrar sesión próximamente')}
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Salir
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container-script9 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="border-slate-800 shadow-sm sticky top-20 bg-slate-900 text-slate-200">
                            <CardContent className="p-4">
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setActiveTab('resumen')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'resumen'
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        <BarChart3 className="h-5 w-5" />
                                        <span>Resumen</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('servicios')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'servicios'
                                            ? 'bg-[#003D82] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Code className="h-5 w-5" />
                                        <span>Mis Servicios</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('ventas')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'ventas'
                                            ? 'bg-[#003D82] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <DollarSign className="h-5 w-5" />
                                        <span>Ventas</span>
                                    </button>

                                    <hr className="my-4 border-gray-100" />

                                    <Link
                                        href="/ayuda"
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium"
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span>Configuración</span>
                                    </Link>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Resumen Tab */}
                        {activeTab === 'resumen' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white">
                                    Resumen General
                                </h2>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card className="border-slate-800 shadow-sm bg-slate-900 text-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 bg-[#003D82]/10 rounded-xl">
                                                    <DollarSign className="h-6 w-6 text-[#003D82]" />
                                                </div>
                                                <div className="flex items-center text-green-600 text-sm font-medium">
                                                    +12% <span className="ml-1 text-gray-400">vs mes ant.</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">Ingresos Totales</p>
                                            <p className="text-3xl font-bold text-[#003D82]">
                                                €{totalRevenue.toLocaleString()}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-slate-800 shadow-sm bg-slate-900 text-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 bg-[#003D82]/10 rounded-xl">
                                                    <BarChart3 className="h-6 w-6 text-[#003D82]" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">Ventas Totales</p>
                                            <p className="text-3xl font-bold text-white">{totalSales}</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-slate-800 shadow-sm bg-slate-900 text-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 bg-[#003D82]/10 rounded-xl">
                                                    <Eye className="h-6 w-6 text-[#003D82]" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">Visualizaciones</p>
                                            <p className="text-3xl font-bold text-white">{totalViews}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Quick Actions */}
                                <Card className="border-gray-200 shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-white">Acciones Rápidas</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Button className="bg-[#003D82] text-white hover:bg-[#002E5C] h-auto py-4 text-lg">
                                            <Plus className="h-5 w-5 mr-2" />
                                            Publicar Nuevo Servicio
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-[#003D82] text-[#003D82] hover:bg-[#003D82]/5 h-auto py-4 text-lg"
                                        >
                                            <Globe className="h-5 w-5 mr-2" />
                                            Ver mi Perfil Público
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Servicios Tab */}
                        {activeTab === 'servicios' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">
                                        Mis Servicios Activos
                                    </h2>
                                    <Link href="/anfitrion/propiedades/nueva">
                                        <Button className="bg-[#10B981] text-white hover:bg-[#059669]">
                                            <Plus className="h-5 w-5 mr-2" />
                                            Nuevo Servicio
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {services.map((service) => (
                                        <Card
                                            key={service.id}
                                            className="border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="text-xl font-bold text-white">
                                                                {service.title}
                                                            </h3>
                                                            {getStatusBadge(service.status)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Ventas</p>
                                                        <p className="text-xl font-bold text-white">
                                                            {service.sales}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Ingresos</p>
                                                        <p className="text-xl font-bold text-[#003D82]">
                                                            €{service.revenue}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Vistas</p>
                                                        <p className="text-xl font-bold text-white">
                                                            {service.views}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-gray-200 text-gray-700 hover:bg-gray-50"
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-gray-200 text-gray-700 hover:bg-gray-50"
                                                    >
                                                        <Link href={`/soluciones/${service.id}`} className="flex items-center">
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Ver
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[#10B981] text-[#10B981] hover:bg-[#10B981]/5 hover:text-[#059669]"
                                                        onClick={() => handlePromote(service.id)}
                                                    >
                                                        <Sparkles className="h-4 w-4 mr-1" />
                                                        Destacar (29€)
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ventas Tab */}
                        {activeTab === 'ventas' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white">
                                    Historial de Ventas
                                </h2>

                                <div className="space-y-4">
                                    {sales.length === 0 ? (
                                        <Card className="border-slate-800 shadow-sm bg-slate-900 text-white">
                                            <CardContent className="p-12 text-center text-gray-500">
                                                No hay ventas registradas aún.
                                            </CardContent>
                                        </Card>
                                    ) : sales.map((sale) => (
                                        <Card
                                            key={sale.id}
                                            className="border-gray-200 shadow-sm"
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-white">
                                                            {sale.serviceTitle}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            Cliente: {sale.clientName}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {sale.date}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-[#003D82]">
                                                            €{sale.amount}
                                                        </p>
                                                        <Badge className="bg-green-100 text-green-700">Completado</Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
