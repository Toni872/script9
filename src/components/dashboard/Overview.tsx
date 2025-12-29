'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpRight, DollarSign, Package, Zap, Lock, TrendingUp, Rocket } from 'lucide-react';
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
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Upsell Card 1: ROI Potential */}
                    <Card className="border-slate-800 bg-slate-900/50 relative overflow-hidden group hover:border-slate-700 transition-all backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-3 opacity-5">
                            <TrendingUp className="w-24 h-24 text-emerald-500" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-400">Ahorro Potencial</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">€1,200/mes</div>
                            <p className="text-xs text-slate-400 mt-1">Automatizando tus tareas actuales</p>
                        </CardContent>
                    </Card>

                    {/* Upsell Card 2: Efficiency */}
                    <Card className="border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Horas Recuperables</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-200">~20h/semana</div>
                            <p className="text-xs text-slate-500 mt-1">Tiempo libre para ventas</p>
                        </CardContent>
                    </Card>

                    {/* Upsell Card 3: Unlock Pro */}
                    <Card className="border-dashed border-2 border-slate-800 bg-slate-950/50 flex flex-col justify-center items-center text-center p-6 hover:border-slate-700 transition-all backdrop-blur-sm">
                        <Lock className="w-8 h-8 text-slate-600 mb-2" />
                        <h3 className="font-bold text-slate-300">Desbloquear Analytics</h3>
                        <p className="text-xs text-slate-500 mb-4">Ver métricas reales de negocio</p>
                        <Link href="/soporte">
                            <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                                Consultar Plan Pro
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Free Tier "Next Steps" */}
                <Card className="border-slate-800 border-l-4 border-l-emerald-500 shadow-lg bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-emerald-500" />
                                Impulsa tu negocio hoy
                            </h3>
                            <p className="text-slate-400 text-sm">Empieza tu primer proyecto de automatización desde 150€. Sin compromisos.</p>
                        </div>
                        <Link href="/nuevo-proyecto">
                            <Button className="mt-4 bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 whitespace-nowrap">
                                <Zap className="w-4 h-4 mr-2" /> Empezar Ahora
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Standard View for Paid Tiers
    const cards = [
        {
            title: "Inversión Total",
            value: `€${stats.totalSpent.toFixed(2)}`,
            description: "+0% desde el mes pasado",
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-900/20 border-emerald-500/20"
        },
        {
            title: "Servicios Activos",
            value: stats.activeProjects.toString(),
            description: "Automatizaciones funcionando",
            icon: Zap,
            color: "text-blue-400",
            bg: "bg-blue-900/20 border-blue-500/20"
        },
        {
            title: "Proyectos Totales",
            value: stats.activeProjects.toString(),
            description: "En tu historial",
            icon: Package,
            color: "text-purple-400",
            bg: "bg-purple-900/20 border-purple-500/20"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {cards.map((card, index) => (
                <Card key={index} className="border-slate-800 bg-slate-900/50 shadow-sm hover:border-slate-700 transition-all backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full border ${card.bg}`}>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{card.value}</div>
                        <p className="text-xs text-slate-500 mt-1">
                            {card.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
