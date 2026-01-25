'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { Activity, Server, Shield, Clock, Plus, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface OverviewProps {
    subscriptionTier?: 'free' | 'starter' | 'pro' | 'enterprise';
}

export function DashboardOverview({ subscriptionTier = 'free' }: OverviewProps) {
    const [userName, setUserName] = useState('');
    const supabase = createClientComponentClient();

    useEffect(() => {
        // Fetch user name for personalization
        async function getName() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Cliente');
            }
        }
        getName();
    }, [supabase]);

    // MOCK DATA: Simulate real-time monitoring of client assets
    const systems = [
        { name: "n8n Workflow Engine", status: "operational", uptime: "99.98%", latency: "45ms" },
        { name: "OpenAI/Gemini Gateway", status: "operational", uptime: "100%", latency: "120ms" },
        { name: "Supabase Database", status: "operational", uptime: "99.99%", latency: "22ms" },
    ];

    if (subscriptionTier === 'free') {
        return (
            <div className="space-y-8">
                {/* 1. WELCOME BANNER (Empty State) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 sm:p-12 text-center"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono">
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" />
                            System.Ready
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Bienvenido al Centro de Comando, <span className="text-emerald-400">{userName}</span>
                        </h2>

                        <p className="text-slate-400 text-lg leading-relaxed">
                            Aún no tienes sistemas activos. Si ya has hablado con nosotros, estamos configurando tu ingeniería.
                            Si no, solicita tu primera automatización.
                        </p>

                        <div className="pt-4 flex justify-center gap-4">
                            <Link href="/nuevo-proyecto">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 px-8 py-6 text-lg">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Solicitar Proyecto
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* 2. DEMO METRICS (What they could have) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none">
                    <StatusCard title="Ahorro Potencial" value="~$2,400/mo" icon={Activity} color="text-emerald-400" />
                    <StatusCard title="Horas Recuperables" value="~40 hrs" icon={Clock} color="text-amber-400" />
                    <StatusCard title="Seguridad de Datos" value="Encrypted" icon={Shield} color="text-blue-400" />
                </div>
                <p className="text-center text-xs text-slate-600 uppercase tracking-widest mt-2">Vista Previa del Monitor de Rendimiento</p>
            </div>
        )
    }

    // PAID VIEW (Pro / Enterprise)
    return (
        <div className="space-y-8">

            {/* 1. SYSTEM HEALTH STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HealthCard label="SERVICE STATUS" value="ALL SYSTEMS GO" color="text-emerald-400" bg="bg-emerald-500/10" dot="bg-emerald-500" />
                <HealthCard label="API REQUESTS (24H)" value="1,248" color="text-white" bg="bg-slate-800/50" dot="bg-blue-500" />
                <HealthCard label="ERROR RATE" value="0.00%" color="text-white" bg="bg-slate-800/50" dot="bg-slate-500" />
                <HealthCard label="NEXT MAINTENANCE" value="FEB 04" color="text-slate-400" bg="bg-slate-800/50" dot="bg-yellow-500" />
            </div>

            {/* 2. MAIN DASHBOARD SPLIT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: ACTIVE SYSTEMS (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Server className="w-5 h-5 text-emerald-500" />
                            Infraestructura Activa
                        </h3>
                        <Link href="/soporte" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                            Reportar Incidencia <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/50">
                        {systems.map((sys, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <Activity className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{sys.name}</div>
                                        <div className="text-xs text-slate-500 font-mono">Latency: {sys.latency}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Uptime</div>
                                        <div className="text-sm font-mono text-emerald-400">{sys.uptime}</div>
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20 capitalize flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {sys.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: SUPPORT / UPSELL (1/3) */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        Soporte Dedicado
                    </h3>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                                <span className="text-xl">👨‍💻</span>
                            </div>
                            <h4 className="text-white font-bold mb-1">Tu Ingeniero Asignado</h4>
                            <p className="text-sm text-slate-400 mb-6">Estamos monitorizando tus sistemas. Si necesitas escalar o modificar algo, abre un ticket prioritario.</p>

                            <Link href="/soporte">
                                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-white">
                                    Abrir Ticket
                                </Button>
                            </Link>

                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    Mantenimiento Preventivo: <strong>Activo</strong>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    Backups Diarios: <strong>03:00 AM OK</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatusCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${color}`} />
                <AlertCircle className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500">{title}</div>
        </div>
    );
}

function HealthCard({ label, value, color, bg, dot }: any) {
    return (
        <div className={`${bg} border border-slate-800/50 rounded-xl p-4 flex flex-col justify-between h-24`}>
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 tracking-widest">{label}</span>
                <div className={`w-2 h-2 rounded-full ${dot} shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
            </div>
            <div className={`text-lg font-bold font-mono tracking-tight ${color}`}>{value}</div>
        </div>
    )
}
