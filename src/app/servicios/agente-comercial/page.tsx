'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Bot, Clock, BarChart3, Globe, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AgentHeroVisual } from '@/components/services/AgentHeroVisual';
import CommercialAgentWidget from '@/components/ai/CommercialAgentWidget';

export default function AgentServicePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* 1. HERO SECTION: Directo y Visual */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-800 text-emerald-400 text-sm font-medium mb-6">
                            <Bot className="w-4 h-4" />
                            <span>Tecnología Google Gemini Pro</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            El Vendedor que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                Nunca Duerme
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                            Instalamos un Cerebro Digital en tu web y WhatsApp. Atiende clientes, resuelve dudas y agenda citas las 24 horas del día. Sin sueldos, sin bajas, sin esperas.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 transition-all duration-200 bg-emerald-400 rounded-lg hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                                Agendar Demo Personalizada
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link href="/como-funciona" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-slate-600">
                                Ver Cómo Funciona
                            </Link>
                        </div>
                    </motion.div>

                    {/* ANIMATED COMPONENT: Cerebro Digital */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <AgentHeroVisual />
                    </motion.div>
                </div>
            </section>

            {/* 2. SCHEMATIC EXPLANATION (Lo simple y visual) */}
            <section className="py-24 bg-slate-950 border-y border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">¿Cómo funciona exactamente?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            No es magia, es ingeniería. Conectamos 3 puntos clave de tu negocio.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">1. Conexión</h3>
                            <p className="text-slate-400">
                                Vinculamos el Agente a tu Web, WhatsApp e Instagram.
                                <br />
                                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Entrada de Leads</span>
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1px] bg-slate-700"></div>
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Bot className="w-7 h-7 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">2. Inteligencia</h3>
                            <p className="text-slate-400">
                                El IA usa tu info (PDFs, webs) para responder dudas y filtrar curiosos.
                                <br />
                                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Cualificación 24/7</span>
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1px] bg-slate-700"></div>
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">3. Conversión</h3>
                            <p className="text-slate-400">
                                Si el cliente es válido, el Agente cierra la cita en tu calendario.
                                <br />
                                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Venta Automática</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* 4. CTA FINAL */}
            <section className="py-24 px-6 bg-slate-950 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">¿Listo para contratar a tu mejor vendedor?</h2>
                    <p className="text-xl text-slate-400 mb-10">
                        La instalación tarda menos de 1 semana. Empieza a captar leads automáticamente.
                    </p>
                    <Link href="/contacto" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-slate-950 transition-all duration-200 bg-white rounded-lg hover:bg-emerald-400 hover:scale-105 shadow-xl">
                        Quiero mi Agente IA
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Link>
                </div>
            </section>
            {/* 5. LIVE DEMO WIDGET */}
            <CommercialAgentWidget />
        </main>
    );
}
