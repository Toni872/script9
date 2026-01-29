'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Sparkles, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
            // ... (keep existing fetch logic same as before, assume it works)
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
                // @ts-ignore
                setOrders(data);
            }
            setLoading(false);
        }

        fetchOrders();
    }, [supabase]);

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
            completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        };
        const labels: Record<string, string> = {
            confirmed: 'En Progreso',
            completed: 'Completado',
            pending: 'Pendiente',
            cancelled: 'Cancelado'
        };

        return (
            <Badge className={`${styles[status] || styles.pending} backdrop-blur-md border px-3 py-1`}>
                {labels[status] || status}
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-80 rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center backdrop-blur-md"
            >
                <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-5"></div>
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 ring-1 ring-white/10">
                        <Sparkles className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No tienes proyectos activos</h3>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        Tu panel está esperando. Inicia tu primera automatización y transformaremos tu negocio juntos.
                    </p>
                    <Link href="/soluciones">
                        <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 rounded-xl px-8 h-12 text-[15px]">
                            Explorar Catálogo <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                Mis Proyectos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md hover:border-emerald-500/30 hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image Header */}
                        <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                            <div className="absolute top-4 right-4 z-20">
                                {getStatusBadge(order.status)}
                            </div>
                            {order.properties?.image_urls?.[0] ? (
                                <img
                                    src={order.properties.image_urls[0]}
                                    alt={order.properties.title}
                                    className="h-full w-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                    <Sparkles className="w-12 h-12 text-slate-700" />
                                </div>
                            )}
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 p-6 flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
                                    {order.properties?.title || 'Servicio Desconocido'}
                                </h3>
                                <p className="text-xs text-slate-500 font-mono">
                                    ID: {order.id.slice(0, 8).toUpperCase()}
                                </p>
                            </div>

                            {/* AI Training Progress (Mocked/Visual) */}
                            {(order.properties?.title.includes('Agente') || order.properties?.title.includes('IA')) && (
                                <div className="mb-6 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-emerald-400 font-medium">Entrenando IA</span>
                                        <span className="text-white">82%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full w-[82%] shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(order.created_at).toLocaleDateString()}
                                </div>

                                <div className="flex gap-2">
                                    <Link href={`/factura/${order.id}`} target="_blank">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button size="sm" variant="outline" className="h-8 text-xs border-slate-700 bg-transparent text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10">
                                        Detalles
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
