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
import { HeroAdvancedVisual } from "@/components/landing/HeroAdvancedVisual";
import { TechStack } from "@/components/landing/TechStack";
import AutomationComparison from "@/components/marketing/AutomationComparison";
import HackerTerminal from "@/components/marketing/HackerTerminal";



export default function LandingClient() {
    const router = useRouter();

    const handleSearch = (params: SearchParams) => {
        const searchParams = new URLSearchParams();
        if (params.query) searchParams.set("q", params.query);
        router.push(`/soluciones?${searchParams.toString()}`);
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
                            Consultoría Estratégica en TI + Automatización SaaS
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
                                onClick={() => router.push('/soluciones')}
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





            {/* SERVICE PILLARS (NEW) */}
            <ServicePillars />

            {/* VISUAL PERSUASION: AUTOMATION LOOP */}
            <section className="py-24 bg-slate-950 border-b border-slate-800 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Deja de trabajar como un robot.
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                            Tus competidores ya están automatizando. <br />
                            Mira la diferencia entre hacerlo a mano y usar Script9.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <AutomationComparison />
                    </motion.div>
                </div>
            </section>

            {/* VISUAL PERSUASION: HACKER TERMINAL */}
            <section className="py-24 bg-slate-950 border-b border-slate-800 relative z-10 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono mb-6">
                            <Terminal className="w-3 h-3" />
                            <span>DEEP_TECH_INFRASTRUCTURE</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Arquitectura escalable.<br />
                            <span className="text-slate-500">Más allá del No-Code.</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-light mb-8">
                            Cuando las herramientas visuales no bastan, desplegamos <strong>ingeniería de software a medida</strong>.
                            Diseñamos sistemas robustos capaces de procesar millones de datos sin interrupciones.
                        </p>

                        <ul className="space-y-4 font-mono text-sm text-slate-300">
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500">➜</span> Procesamiento de 1M+ registros/hora
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500">➜</span> Seguridad Bancaria End-to-End
                            </li>
                        </ul>
                    </motion.div>

                    {/* Right: Terminal Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <HackerTerminal />
                    </motion.div>
                </div>
            </section>

            {/* INDUSTRY CASES (REMOVED FOR SIMPLICITY) */}
            {/* <IndustryCases /> */}

            {/* CATEGORIES GRID (REMOVED FOR SIMPLICITY) */}


            {/* NEW PROCESS SECTION (Replaces Pricing) */}
            <ProcessSteps />

            {/* DETAILED CONTACT FORM (NEW) */}
            <DetailedContactForm />

        </div >
    );
}
