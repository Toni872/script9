'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpRight, DollarSign, Package, Zap, Lock, TrendingUp, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface OverviewProps {
    subscriptionTier?: 'free' | 'starter' | 'pro' | 'enterprise';
}

export function DashboardOverview({ subscriptionTier = 'free' }: OverviewProps) {
    const [stats, setStats] = useState({ totalSpent: 0, activeProjects: 0, completedProjects: 0 });
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchStats() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('bookings')
                .select('total_price, status')
                .eq('guest_id', user.id);

            if (data) {
                // @ts-ignore
                const totalSpent = data.reduce((acc: any, curr: any) => acc + (curr.total_price || 0), 0);
                const activeProjects = data.length;

                setStats({ totalSpent, activeProjects, completedProjects: 0 });
            }
        }
        fetchStats();
    }, [supabase]);

    if (subscriptionTier === 'free') {
        return (
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Upsell Card 1: ROI Potential */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-24 h-24 text-emerald-500" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-sm font-medium text-emerald-400 mb-1">Ahorro Estimado</h3>
                            <div className="text-3xl font-bold text-white mb-2">€1,200<span className="text-sm text-slate-500 font-normal">/mes</span></div>
                            <p className="text-xs text-slate-400">Automatizando tus flujos actuales</p>
                        </div>
                    </motion.div>

                    {/* Upsell Card 2: Efficiency */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md hover:border-blue-500/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-24 h-24 text-blue-500" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-sm font-medium text-blue-400 mb-1">Tiempo Recuperable</h3>
                            <div className="text-3xl font-bold text-white mb-2">~20h<span className="text-sm text-slate-500 font-normal">/semana</span></div>
                            <p className="text-xs text-slate-400">Dedicable a ventas y estrategia</p>
                        </div>
                    </motion.div>
                </div>

                {/* Free Tier "Next Steps" Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/50 p-8 shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                                <Sparkles className="w-3 h-3" />
                                <span>Recomendado para ti</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Comienza tu transformación digital</h3>
                            <p className="text-slate-400 max-w-xl">
                                Selecciona un servicio de nuestro catálogo y empieza a automatizar tu negocio desde hoy mismo.
                                Sin costes ocultos, sin suscripciones forzosas.
                            </p>
                        </div>
                        <Link href="/soluciones">
                            <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 px-8">
                                <Rocket className="w-4 h-4 mr-2" />
                                Nuevo Proyecto
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Standard View for Paid Tiers / Active Users
    const cards = [
        {
            title: "Inversión Total",
            value: `€${stats.totalSpent.toFixed(2)}`,
            description: "ROI estimado: +150%",
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
            delay: 0.1
        },
        {
            title: "Servicios Activos",
            value: stats.activeProjects.toString(),
            description: "Funcionando 24/7",
            icon: Zap,
            color: "text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/20",
            delay: 0.2
        },
        {
            title: "Proyectos Totales",
            value: stats.completedProjects > 0 ? stats.completedProjects.toString() : stats.activeProjects.toString(), // Fallback logic
            description: "En tu historial",
            icon: Package,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
            delay: 0.3
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay }}
                    className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md hover:border-slate-700 hover:shadow-lg transition-all duration-300 group"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-400 mb-1">{card.title}</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{card.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl border ${card.bg} group-hover:scale-110 transition-transform duration-300`}>
                            <card.icon className={`h-5 w-5 ${card.color}`} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <p className="text-xs text-slate-500">{card.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
