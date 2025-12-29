"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Terminal, Code2 } from "lucide-react";
import SearchBar, { SearchParams } from "@/components/SearchBar";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { ServicePillars } from "@/components/landing/ServicePillars";
import { IndustryCases } from "@/components/landing/IndustryCases";
import { DetailedContactForm } from "@/components/landing/DetailedContactForm";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HeroAdvancedVisual } from "@/components/landing/HeroAdvancedVisual";
import { TechStack } from "@/components/landing/TechStack";



export default function LandingClient() {
    const router = useRouter();

    const handleSearch = (params: SearchParams) => {
        const searchParams = new URLSearchParams();
        if (params.query) searchParams.set("q", params.query);
        router.push(`/catalogo?${searchParams.toString()}`);
    };

    return (
        <div className="bg-slate-950 min-h-screen">
            {/* HERO SECTION - Refined copy */}
            <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-950 border-b border-slate-800">
                {/* Abstract Tech Background */}
                <div className="absolute inset-0 overflow-hidden">


                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg shadow-emerald-900/10">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Agencia de Automatización & IA
                        </div>

                        <h1 className="text-4xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                            Recupera <span className="inline-block text-emerald-400 transition-transform duration-300 hover:scale-110 cursor-default">30+ Horas</span> <br className="hidden lg:block" />
                            Semanales
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-8 text-lg font-medium text-emerald-400/90 font-mono">
                            <span className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-default">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Implementación en 4 Semanas
                            </span>
                            <span className="hidden sm:inline text-slate-700">|</span>
                            <span className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-default">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Resultados Garantizados
                            </span>
                        </div>

                        <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light">
                            Genera leads 24/7 con scripts IA personalizados.
                            Sin contratar más personal. Sin sorpresas.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] flex items-center justify-center gap-2 group"
                            >
                                Solicitar Auditoría
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => router.push('/catalogo')}
                                className="px-8 py-4 bg-transparent border border-slate-700 text-white hover:bg-slate-800 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
                            >
                                Ver Soluciones
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Visual/Search */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center lg:h-[600px] w-full scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100"
                    >
                        <HeroAdvancedVisual />
                    </motion.div>
                </div>
            </section>

            {/* TECH STACK MARQUEE */}
            <TechStack />

            {/* FEATURED SERVICE: COMMERCIAL AGENT */}
            <section className="py-20 bg-slate-900/30 text-white relative overflow-hidden border-y border-slate-800">


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Nuevo Lanzamiento
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                                Agente Comercial <span className="text-emerald-400">Omnicanal</span>
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-light">
                                Imagina un vendedor que conoce todo tu inventario, responde al instante por WhatsApp y Email, y nunca duerme.
                                Ya es una realidad.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={() => router.push('/servicios/agente-comercial')}
                                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2 group"
                                >
                                    Ver Demo en Vivo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => router.push('/servicios/agente-comercial')}
                                    className="px-8 py-4 bg-transparent border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 rounded-lg font-semibold transition-all"
                                >
                                    Calcular ROI
                                </button>
                            </div>
                        </div>

                        {/* Visual Rep for Agent */}
                        <div className="flex-1 w-full relative">
                            <div className="relative z-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">Agente de Ventas IA</div>
                                        <div className="text-xs text-emerald-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            En línea ahora
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 font-mono text-sm">
                                    <div className="bg-zinc-900 p-3 rounded-lg rounded-tl-none mr-12 text-zinc-300 border border-zinc-800">
                                        Hola, estoy interesado en automatizar mis ventas. ¿Cómo funciona?
                                    </div>
                                    <div className="bg-emerald-900/20 border border-emerald-500/20 p-3 rounded-lg rounded-tr-none ml-12 text-emerald-100">
                                        ¡Hola! Me integro en tu CRM y atiendo leads 24/7. Puedo agendar citas, cualificar prospectos y enviar presupuestos PDF. ¿Te gustaría ver un ejemplo?
                                    </div>
                                    <div className="bg-zinc-900 p-3 rounded-lg rounded-tl-none mr-12 text-zinc-300 border border-zinc-800">
                                        Sí, por favor.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEM VS SOLUTION (NEW) */}
            <ProblemSolution />

            {/* SERVICE PILLARS (NEW) */}
            <ServicePillars />

            {/* INDUSTRY CASES (NEW) */}
            <IndustryCases />

            {/* CATEGORIES GRID (KEPT BUT SUBTLE) */}
            <section className="py-24 bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Explora por Categoría</h2>
                            <p className="text-lg text-slate-400">Soluciones específicas para cada necesidad.</p>
                        </div>
                        <button
                            onClick={() => router.push('/catalogo')}
                            className="hidden md:flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                        >
                            Ver todo el catálogo <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Automatizaciones', icon: Bot, count: '45+', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                            { name: 'Workflows AI', icon: Zap, count: '32+', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                            { name: 'Scripts Python', icon: Terminal, count: '28+', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                            { name: 'Integraciones', icon: Code2, count: '50+', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
                        ].map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => router.push(`/catalogo?category=${cat.name}`)}
                                className="flex flex-col p-6 rounded-2xl bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 text-left group"
                            >
                                <div className={`w-12 h-12 rounded-xl ${cat.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                                <p className="text-sm text-slate-500">{cat.count} soluciones</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW PROCESS SECTION (Replaces Pricing) */}
            <ProcessSteps />

            {/* DETAILED CONTACT FORM (NEW) */}
            <DetailedContactForm />

        </div>
    );
}
