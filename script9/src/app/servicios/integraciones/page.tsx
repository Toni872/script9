'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Workflow, Link2, Server, Activity, Layers, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WorkflowHeroVisual } from '@/components/services/WorkflowHeroVisual';

export default function WorkflowServicePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/20 border border-indigo-800 text-indigo-400 text-sm font-medium mb-6">
                            <Workflow className="w-4 h-4" />
                            <span>Integraciones n8n & Make</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Conecta todas tus <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Apps y Herramientas
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                            Hacemos que tu Stripe hable con tu Slack, que tu Web actualice tu Notion y que tus Leads lleguen a tu CRM. Sin copiar datos a mano.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 transition-all duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                                Conectar mi Ecosistema
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>

                        </div>
                    </motion.div>

                    {/* ANIMATED COMPONENT */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <WorkflowHeroVisual />
                    </motion.div>
                </div>
            </section>

            {/* 2. SCHEMATIC EXPLANATION */}
            <section className="py-24 bg-slate-950 border-y border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Orquestación Digital</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Creamos puentes invisibles para que la información fluya sola.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group">
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Activity className="w-7 h-7 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">1. Trigger</h3>
                            <p className="text-slate-400">
                                Detectamos un evento: una venta en Stripe, un nuevo email, un formulario rellenado.
                                <br />
                                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">El Disparador</span>
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group relative">
                            <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1px] bg-slate-700"></div>
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shuffle className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">2. Lógica</h3>
                            <p className="text-slate-400">
                                Filtramos, formateamos y decidimos qué hacer con esa información según tus reglas de negocio.
                                <br />
                                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">El Cerebro</span>
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group relative">
                            <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1px] bg-slate-700"></div>
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Link2 className="w-7 h-7 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">3. Distribución</h3>
                            <p className="text-slate-400">
                                Enviamos los datos procesados a Slack, Notion, Google Sheets o tu CRM simultáneamente.
                                <br />
                                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Sincronización</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* 4. CTA FINAL */}
            <section className="py-24 px-6 bg-slate-950 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Unifica tu negocio hoy mismo</h2>
                    <p className="text-xl text-slate-400 mb-10">
                        Deja de saltar entre 10 pestañas diferentes. Haz que tus apps trabajen para ti.
                    </p>
                    <Link href="/contacto" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-slate-950 transition-all duration-200 bg-white rounded-lg hover:bg-indigo-400 hover:scale-105 shadow-xl">
                        Diseñar mi Workflow
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
