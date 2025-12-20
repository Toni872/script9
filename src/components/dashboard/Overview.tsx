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
                    <Card className="border-blue-100 bg-blue-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <TrendingUp className="w-24 h-24 text-blue-600" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600">Ahorro Potencial</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#003D82]">€1,200/mes</div>
                            <p className="text-xs text-blue-600 mt-1">Automatizando tus tareas actuales</p>
                        </CardContent>
                    </Card>

                    {/* Upsell Card 2: Efficiency */}
                    <Card className="border-gray-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Horas Recuperables</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-700">~20h/semana</div>
                            <p className="text-xs text-gray-500 mt-1">Tiempo libre para ventas</p>
                        </CardContent>
                    </Card>

                    {/* Upsell Card 3: Unlock Pro */}
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50 flex flex-col justify-center items-center text-center p-6">
                        <Lock className="w-8 h-8 text-gray-400 mb-2" />
                        <h3 className="font-bold text-gray-600">Desbloquear Analytics</h3>
                        <p className="text-xs text-gray-400 mb-4">Ver métricas reales de negocio</p>
                        <Link href="/soporte">
                            <Button size="sm" variant="outline">Consultar Plan Pro</Button>
                        </Link>
                    </Card>
                </div>

                {/* Free Tier "Next Steps" */}
                <Card className="border-[#003D82] border-l-4 shadow-sm bg-white">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-[#333333] mb-1 flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-[#10B981]" />
                                Impulsa tu negocio hoy
                            </h3>
                            <p className="text-gray-600 text-sm">Empieza tu primer proyecto de automatización desde 150€. Sin compromisos.</p>
                        </div>
                        <Link href="/nuevo-proyecto">
                            <Button className="mt-4 bg-[#10B981] text-white hover:bg-[#059669] shadow-lg shadow-green-900/20 whitespace-nowrap">
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
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            title: "Servicios Activos",
            value: stats.activeProjects.toString(),
            description: "Automatizaciones funcionando",
            icon: Zap,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            title: "Proyectos Totales",
            value: stats.activeProjects.toString(),
            description: "En tu historial",
            icon: Package,
            color: "text-purple-600",
            bg: "bg-purple-100"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {cards.map((card, index) => (
                <Card key={index} className="border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${card.bg}`}>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#333333]">{card.value}</div>
                        <p className="text-xs text-gray-500 mt-1">
                            {card.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
