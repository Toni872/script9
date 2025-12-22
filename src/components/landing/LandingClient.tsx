"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Terminal, Code2 } from "lucide-react";
import SearchBar, { SearchParams } from "@/components/SearchBar";
import { ProcessSection } from "@/components/ProcessSection";
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
        <div className="bg-[#F5F5F5]">
            {/* HERO SECTION - Refined copy */}
            <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#003D82]">
                {/* Abstract Tech Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] bg-gradient-to-b from-[#10B981]/20 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-8 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
                            Agencia de Automatización & IA
                        </div>

                        <h1 className="text-4xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                            Escala tu Negocio <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">sin contratar</span> más personal.
                        </h1>

                        <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed font-light">
                            Delegamos tu trabajo manual a scripts de Inteligencia Artificial. <br className="hidden lg:block" />
                            Recupera 20+ horas semanales y céntrate en lo que importa: <strong>Vender.</strong>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg font-semibold text-lg transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] flex items-center justify-center gap-2 group"
                            >
                                Solicitar Auditoría
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => router.push('/catalogo')}
                                className="px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
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

            {/* PROBLEM VS SOLUTION (NEW) */}
            <ProblemSolution />

            {/* SERVICE PILLARS (NEW) */}
            <ServicePillars />



            {/* INDUSTRY CASES (NEW) */}
            <IndustryCases />

            {/* CATEGORIES GRID (KEPT BUT SUBTLE) */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-[#333333] mb-2">Explora por Categoría</h2>
                            <p className="text-lg text-[#666666]">Soluciones específicas para cada necesidad.</p>
                        </div>
                        <button
                            onClick={() => router.push('/catalogo')}
                            className="hidden md:flex items-center gap-2 text-[#003D82] font-semibold hover:text-[#10B981] transition-colors"
                        >
                            Ver todo el catálogo <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Automatizaciones', icon: Bot, count: '45+', color: 'bg-blue-50 text-blue-600' },
                            { name: 'Workflows AI', icon: Zap, count: '32+', color: 'bg-indigo-50 text-indigo-600' },
                            { name: 'Scripts Python', icon: Terminal, count: '28+', color: 'bg-green-50 text-green-600' },
                            { name: 'Integraciones', icon: Code2, count: '50+', color: 'bg-orange-50 text-orange-600' },
                        ].map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => router.push(`/catalogo?category=${cat.name}`)}
                                className="flex flex-col p-6 rounded-2xl bg-white hover:bg-white shadow-md hover:shadow-xl border border-transparent hover:border-[#003D82]/20 transition-all duration-300 text-left group"
                            >
                                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-[#333333] mb-1">{cat.name}</h3>
                                <p className="text-sm text-[#666666]">{cat.count} soluciones</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW PROCESS SECTION (Replaces Pricing) */}
            <ProcessSection />

            {/* DETAILED CONTACT FORM (NEW) */}
            <DetailedContactForm />

        </div>
    );
}
