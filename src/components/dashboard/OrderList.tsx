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
            cancelled: 'bg-red-100 text-red-700'
        };
        // @ts-ignore
        return <Badge className={styles[status] || styles.pending}>{status === 'confirmed' ? 'Activo' : status}</Badge>;
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {[1, 2].map(i => (
                    <Card key={i} className="animate-pulse h-48 bg-gray-100 border-0" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
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
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#333333]">Mis Proyectos Activos</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all bg-white group">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Image / Icon */}
                                <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    {order.properties?.image_urls?.[0] ? (
                                        <img
                                            src={order.properties.image_urls[0]}
                                            alt={order.properties.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Sparkles className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#333333] group-hover:text-[#003D82] transition-colors">
                                                {order.properties?.title || 'Servicio Desconocido'}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-mono mb-2">
                                                ID: {order.id.slice(0, 8).toUpperCase()}
                                            </p>
                                        </div>
                                        <p className="text-2xl font-bold text-[#003D82]">
                                            €{order.total_price?.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {getStatusBadge(order.status)}
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Clock className="h-4 w-4" />
                                            Entrega Inmediata
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <Link href={`/factura/${order.id}`} target="_blank">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Download className="w-4 h-4" /> Factura
                                            </Button>
                                        </Link>
                                        <Button size="sm" className="bg-[#003D82] hover:bg-[#002E5C] text-white gap-2">
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
