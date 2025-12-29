'use client';

import { motion } from 'framer-motion';
import { Home, ShoppingBag, Stethoscope, Briefcase, ArrowRight } from 'lucide-react';

export function IndustryCases() {
    const industries = [
        {
            title: "Inmobiliaria",
            icon: Home,
            stat: "+40% Leads",
            description: "Automatización de captación, cualificación de inquilinos y gestión de visitas.",
            tags: ["Scraping", "WhatsApp Bot"],
        },
        {
            title: "E-Commerce",
            icon: ShoppingBag,
            stat: "-15h/semana",
            description: "Gestión automática de inventario, atención post-venta y recuperación de carritos.",
            tags: ["Shopify API", "Soporte IA"],
        },
        {
            title: "Sector Salud",
            icon: Stethoscope,
            stat: "Citas 24/7",
            description: "Sistemas de recordatorio de citas y triaje inicial inteligente.",
            tags: ["Gestión Citas", "Privacidad"],
        },
        {
            title: "Agencias",
            icon: Briefcase,
            stat: "Report Auto",
            description: "Generación automática de informes para clientes y auditorías SEO.",
            tags: ["Reporting", "n8n"],
        }
    ];

    return (
        <section className="py-24 bg-slate-950 border-y border-slate-800 relative overflow-hidden">
            {/* Subtle Noise Texture */}


            {/* Ambient Light (Neutral / Emerald) */}


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            Resultados Reales
                        </h2>
                        <p className="text-xl text-slate-400 font-light">
                            Soluciones probadas en entornos de alta exigencia.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors mt-4 md:mt-0 group">
                        Ver casos detallados <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {industries.map((ind, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-emerald-500/30 hover:bg-slate-800 transition-all duration-300 group shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                {/* Icon: Pure White, Simple */}
                                <div className="p-0 text-white group-hover:text-emerald-400 transition-colors">
                                    <ind.icon className="w-8 h-8 stroke-[1.5]" />
                                </div>

                                {/* Stat Badge: Red Accent, Professional */}
                                <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    {ind.stat}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3">{ind.title}</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light min-h-[60px]">
                                {ind.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto border-t border-slate-800 pt-4">
                                {ind.tags.map(tag => (
                                    <span key={tag} className="text-[11px] uppercase tracking-wide font-medium text-slate-500">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
