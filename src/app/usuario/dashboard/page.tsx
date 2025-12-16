'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Clock, User, Heart, LogOut, Sparkles, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
    id: string;
    itemTitle: string;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
    total: number;
}

export default function UsuarioDashboard() {
    const [activeTab, setActiveTab] = useState<'pedidos' | 'favoritos' | 'perfil'>('pedidos');
    const [orders, setOrders] = useState<Order[]>([]);
    const [userName, setUserName] = useState('Cliente');

    useEffect(() => {
        loadMockData();
    }, []);

    const loadMockData = () => {
        // Try to load last order
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
            const data = JSON.parse(lastOrder);
            const mockOrder: Order = {
                id: `ORD-${Date.now().toString().slice(-6)}`,
                itemTitle: data.propertyTitle,
                date: data.date,
                status: 'completed',
                total: parseFloat(data.total) || 0,
            };
            setOrders([mockOrder]);
            setUserName(data.customerName || 'Cliente');
        }
    };

    const getStatusBadge = (status: Order['status']) => {
        const config = {
            pending: { label: 'En Proceso', className: 'bg-blue-100 text-blue-700' },
            completed: { label: 'Completado', className: 'bg-green-100 text-green-700' },
            cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-700' },
        };
        const { label, className } = config[status];
        return <Badge className={className}>{label}</Badge>;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            {/* Header */}
            <div className="bg-[#003D82] text-white py-12">
                <div className="container-script9">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                                Hola, {userName} 👋
                            </h1>
                            <p className="text-white/80 font-mono text-sm">Panel de Gestión Integral</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={() => {
                                alert('Función de cerrar sesión próximamente');
                            }}
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
                        <Card className="border-gray-200 shadow-sm sticky top-20 bg-white">
                            <CardContent className="p-4">
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setActiveTab('pedidos')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'pedidos'
                                            ? 'bg-[#003D82] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <BarChart className="h-5 w-5" />
                                        <span>Mis Proyectos</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('favoritos')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'favoritos'
                                            ? 'bg-[#003D82] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Heart className="h-5 w-5" />
                                        <span>Favoritos</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('perfil')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'perfil'
                                            ? 'bg-[#003D82] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <User className="h-5 w-5" />
                                        <span>Mi Cuenta</span>
                                    </button>

                                    <hr className="my-4 border-gray-100" />

                                    <Link
                                        href="/catalogo"
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium"
                                    >
                                        <Sparkles className="h-5 w-5 text-[#EF4444]" />
                                        <span>Nuevo Proyecto</span>
                                    </Link>

                                    <Link
                                        href="/como-funciona"
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium"
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span>Soporte</span>
                                    </Link>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Tab Content */}
                        {activeTab === 'pedidos' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-[#333333]">
                                        Mis Proyectos Activos
                                    </h2>
                                    <Link href="/catalogo">
                                        <Button className="bg-[#EF4444] text-white hover:bg-[#DC2626]">
                                            + Contratar Servicio
                                        </Button>
                                    </Link>
                                </div>

                                {orders.length === 0 ? (
                                    <Card className="border-gray-200 shadow-sm bg-white">
                                        <CardContent className="p-12 text-center">
                                            <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-[#333333] mb-2">
                                                No tienes proyectos activos
                                            </h3>
                                            <p className="text-gray-500 mb-6">
                                                Automatiza tu negocio hoy mismo con nuestros servicios.
                                            </p>
                                            <Link href="/catalogo">
                                                <Button className="bg-[#003D82] text-white hover:bg-[#002E5C]">
                                                    Explorar Catálogo
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <Card
                                                key={order.id}
                                                className="border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h3 className="text-xl font-bold text-[#333333]">
                                                                    {order.itemTitle}
                                                                </h3>
                                                                {getStatusBadge(order.status)}
                                                            </div>
                                                            <p className="text-sm text-gray-500 font-mono">
                                                                ID: {order.id}
                                                            </p>
                                                        </div>
                                                        <p className="text-2xl font-bold text-[#003D82]">
                                                            €{order.total.toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar className="h-5 w-5 text-[#003D82]" />
                                                            <span className="text-sm">{formatDate(order.date)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Clock className="h-5 w-5 text-[#003D82]" />
                                                            <span className="text-sm">
                                                                Entrega Digital Inmediata
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-gray-200 hover:bg-gray-50 text-gray-700"
                                                        >
                                                            Ver Factura
                                                        </Button>
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            className="bg-[#003D82] text-white hover:bg-[#002E5C]"
                                                        >
                                                            Contactar Experto
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Favoritos Tab */}
                        {activeTab === 'favoritos' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-[#333333]">
                                    Mis Favoritos
                                </h2>

                                <Card className="border-gray-200 shadow-sm bg-white">
                                    <CardContent className="p-12 text-center">
                                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-[#333333] mb-2">
                                            Lista de deseos vacía
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            Guarda las herramientas que te interesen para más tarde.
                                        </p>
                                        <Link href="/catalogo">
                                            <Button className="bg-[#003D82] text-white hover:bg-[#002E5C]">
                                                Explorar Servicios
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Perfil Tab */}
                        {activeTab === 'perfil' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-[#333333]">
                                    Mi Perfil
                                </h2>

                                <Card className="border-gray-200 shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle>Información Personal</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nombre completo
                                            </label>
                                            <input
                                                id="userName"
                                                type="text"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="Tu nombre completo"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003D82]"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Corporativo
                                            </label>
                                            <input
                                                id="userEmail"
                                                type="email"
                                                placeholder="tu@empresa.com"
                                                title="Email del usuario"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003D82]"
                                            />
                                        </div>

                                        <Button className="bg-[#003D82] text-white hover:bg-[#002E5C]">
                                            Guardar Cambios
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="border-gray-200 shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle>Notificaciones</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="emailNotifications" className="flex-1">
                                                <p className="font-medium text-[#333333]">Actualizaciones de Proyecto</p>
                                                <p className="text-sm text-gray-500">
                                                    Recibe avisos sobre el estado de tus automatizaciones
                                                </p>
                                            </label>
                                            <input
                                                id="emailNotifications"
                                                type="checkbox"
                                                defaultChecked
                                                title="Activar notificaciones"
                                                className="w-5 h-5 accent-[#003D82]"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
