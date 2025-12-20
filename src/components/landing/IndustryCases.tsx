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
        <section className="py-24 bg-[#002E5C] relative overflow-hidden">
            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

            {/* Ambient Light (Brand Blue, not multi-color) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#003D82] rounded-full blur-[120px] opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            Resultados Reales
                        </h2>
                        <p className="text-xl text-blue-100/80 font-light">
                            Soluciones probadas en entornos de alta exigencia.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-white font-medium hover:text-[#10B981] transition-colors mt-4 md:mt-0 group">
                        Ver casos detallados <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {industries.map((ind, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:border-[#10B981]/30 hover:bg-white/[0.07] transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                {/* Icon: Pure White, Simple */}
                                <div className="p-0 text-white group-hover:text-[#10B981] transition-colors">
                                    <ind.icon className="w-8 h-8 stroke-[1.5]" />
                                </div>

                                {/* Stat Badge: Red Accent, Professional */}
                                <span className="text-[#10B981] font-bold text-sm bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                                    {ind.stat}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3">{ind.title}</h3>
                            <p className="text-blue-100/60 text-sm mb-8 leading-relaxed font-light min-h-[60px]">
                                {ind.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto border-t border-white/5 pt-4">
                                {ind.tags.map(tag => (
                                    <span key={tag} className="text-[11px] uppercase tracking-wide font-medium text-blue-200/60">
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
