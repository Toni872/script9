'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Sparkles, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Order {
    id: string;
    created_at: string;
    status: string;
    total_price: number;
    properties: {
        title: string;
        image_urls: string[] | null;
    };
}

export function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchOrders() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    id,
                    created_at,
                    status,
                    total_price,
                    properties (title, image_urls)
                `)
                .eq('guest_id', user.id)
                .order('created_at', { ascending: false });

            if (data) {
                // @ts-ignore - Supabase types join inference
                setOrders(data);
            }
            setLoading(false);
        }

        fetchOrders();
    }, [supabase]);

    const getStatusBadge = (status: string) => {
        const styles = {
            confirmed: 'bg-green-100 text-green-700',
            pending: 'bg-blue-100 text-blue-700',
            cancelled: 'bg-emerald-100 text-emerald-700'
        };
        // @ts-ignore
        return <Badge className={styles[status] || styles.pending}>{status === 'confirmed' ? 'Activo' : status}</Badge>;
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {[1, 2].map(i => (
                    <Card key={i} className="animate-pulse h-48 bg-slate-900 border-slate-800" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <Card className="border-slate-800 shadow-sm bg-slate-900">
                <CardContent className="p-12 text-center">
                    <Sparkles className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                        No tienes proyectos activos
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Automatiza tu negocio hoy mismo con nuestros servicios.
                    </p>
                    <Link href="/catalogo">
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20">
                            Explorar Catálogo
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Mis Proyectos Activos</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="border-slate-800 shadow-sm hover:shadow-lg transition-all bg-slate-900 group">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Image / Icon */}
                                <div className="w-full md:w-32 h-32 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-800">
                                    {order.properties?.image_urls?.[0] ? (
                                        <img
                                            src={order.properties.image_urls[0]}
                                            alt={order.properties.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                            <Sparkles className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                                {order.properties?.title || 'Servicio Desconocido'}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-mono mb-2">
                                                ID: {order.id.slice(0, 8).toUpperCase()}
                                            </p>
                                        </div>
                                        <p className="text-2xl font-bold text-white">
                                            €{order.total_price?.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {getStatusBadge(order.status)}
                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* AI Agent Status Simulation */}
                                    {(order.properties?.title.includes('Agente') || order.properties?.title.includes('IA')) && (
                                        <div className="mb-6 bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4" />
                                                    Estado del Entrenamiento
                                                </span>
                                                <span className="text-sm font-bold text-emerald-400">82%</span>
                                            </div>
                                            <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                                                <div
                                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                    style={{ width: '82%' }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                Fase actual: <span className="font-medium text-slate-300">Procesando base de conocimiento (RAG)...</span>
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-3 mt-4">
                                        <Link href={`/factura/${order.id}`} target="_blank">
                                            <Button variant="outline" size="sm" className="gap-2 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                                                <Download className="w-4 h-4" /> Factura
                                            </Button>
                                        </Link>
                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 border-none">
                                            Ver Detalles <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
