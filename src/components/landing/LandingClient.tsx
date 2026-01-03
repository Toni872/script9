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





            {/* SERVICE PILLARS (NEW) */}
            <ServicePillars />

            {/* INDUSTRY CASES (REMOVED FOR SIMPLICITY) */}
            {/* <IndustryCases /> */}

            {/* CATEGORIES GRID (REMOVED FOR SIMPLICITY) */}


            {/* NEW PROCESS SECTION (Replaces Pricing) */}
            <ProcessSteps />

            {/* DETAILED CONTACT FORM (NEW) */}
            <DetailedContactForm />

        </div>
    );
}
