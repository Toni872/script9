"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, MessageSquare, TrendingUp, Activity, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const labs = [
    {
        id: "marketing-agent",
        title: "Agente IA Comercial",
        category: "Agencia de Marketing",
        description: "De leads fríos a citas cualificadas en automático.",
        before: "Leads sin responder por horas, seguimiento manual errático.",
        after: "Respuesta en <2min, cualificación 24/7 y agenda llena.",
        metric: "60%",
        metricLabel: "Ahorro Tiempo",
        subMetric: "Más citas, mismo tráfico",
        icon: Bot,
        color: "emerald"
    },
    {
        id: "saas-billing",
        title: "Facturación & Reporting",
        category: "SaaS B2B",
        description: "Orquestación financiera sin abrir Excel.",
        before: "Facturas manuales, exportar CSVs, caos a fin de mes.",
        after: "Stripe -> Quaderno -> Slack -> Dashboard en tiempo real.",
        metric: "25h",
        metricLabel: "Ahorro / mes",
        subMetric: "Para el Founder",
        icon: Zap,
        color: "amber"
    },
    {
        id: "ecommerce-support",
        title: "Soporte Nivel 1",
        category: "Ecommerce",
        description: "Resolución de dudas logísticas sin humanos.",
        before: "Soporte saturado respondiendo '¿Dónde está mi pedido?'.",
        after: "IA conectada a API de envíos responde estado exacto.",
        metric: "70%",
        metricLabel: "Automático",
        subMetric: "Consultas resueltas",
        icon: MessageSquare, // Changed to MessageSquare for cleanliness, user requested non-generic
        color: "blue"
    }
];

export function BlueprintsLabs() {
    return (
        <section className="py-24 bg-[#0B0F17] relative overflow-hidden border-t border-slate-900/50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-400 text-xs font-mono mb-6"
                        >
                            <Layers className="w-3 h-3" />
                            SCRIPT9_LABS: INTERNAL_BUILDS
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            Lo que ya hemos automatizado
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
                            Casos reales de nuestro laboratorio. Arquitectura probada en producción.
                        </p>
                    </div>
                    <Link href="/labs" className="hidden md:flex group items-center gap-2 text-sm font-mono text-emerald-400 hover:text-emerald-300 transition-colors">
                        EXPLORAR EL LABORATORIO
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {labs.map((lab, index) => (
                        <motion.div
                            key={lab.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#111620] border border-slate-800/60 rounded-xl p-8 hover:border-slate-700 transition-all group flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] relative"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className={`text-[10px] font-mono uppercase tracking-widest text-${lab.color}-400 mb-2 font-semibold`}>
                                        {lab.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-white leading-tight">{lab.title}</h3>
                                </div>
                                <div className={`p-2 rounded-lg bg-${lab.color}-500/10 border border-${lab.color}-500/20 text-${lab.color}-400`}>
                                    <lab.icon className="w-5 h-5" />
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm mb-8 font-light min-h-[40px] leading-relaxed">
                                {lab.description}
                            </p>

                            {/* Comparison Block - Symmetrical */}
                            <div className="grid grid-cols-1 gap-4 mb-8 flex-grow">
                                <div className="relative pl-4 border-l border-slate-800">
                                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-wider">Antes</div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-light">{lab.before}</p>
                                </div>
                                <div className="relative pl-4 border-l border-emerald-500/30">
                                    <div className="text-[10px] text-emerald-500 font-mono mb-1 uppercase tracking-wider">Después</div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{lab.after}</p>
                                </div>
                            </div>

                            {/* Footer / Metrics */}
                            <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between mt-auto">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-white">{lab.metric}</span>
                                        <span className="text-xs text-slate-500 font-mono">{lab.metricLabel}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-600 mt-1 uppercase tracking-wide">
                                        {lab.subMetric}
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/labs" className="inline-flex items-center gap-2 text-sm font-mono text-emerald-400">
                        EXPLORAR EL LABORATORIO
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
