'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, Network, Code2, ArrowRight } from 'lucide-react';
import { DeepTechHero } from '@/components/ui/DeepTechHero';
import { AboutVisual } from '@/components/marketing/AboutVisual';
import Link from 'next/link';

export default function AboutPage() {

    // Texto del usuario:
    // "Script9 es una consultoría Estratégica en TI + Automatización SaaS..."
    const pillars = [
        {
            title: "Agentes IA",
            description: "Empleados digitales que atienden, cualifican y venden 24/7.",
            icon: Bot,
            color: "text-blue-400",
            border: "group-hover:border-blue-500/50"
        },
        {
            title: "Automatización (N8N)",
            description: "Workflows que conectan todo tu ecosistema (Stripe, Slack, CRM).",
            icon: Zap,
            color: "text-amber-400",
            border: "group-hover:border-amber-500/50"
        },
        {
            title: "Integraciones",
            description: "Unificamos tus herramientas dispersas en un solo flujo de datos.",
            icon: Network,
            color: "text-purple-400",
            border: "group-hover:border-purple-500/50"
        },
        {
            title: "Scripts a Medida",
            description: "Desarrollo Python/Node.js para problemas que el No-Code no resuelve.",
            icon: Code2,
            color: "text-emerald-400",
            border: "group-hover:border-emerald-500/50"
        }
    ];

    const stack = ["Python", "TypeScript", "N8N", "Google Gemini", "Supabase", "Next.js"];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
            {/* Hero Section */}
            <div className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-sm font-medium"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Consultoría Estratégica TI + Automatización
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Ingeniería de Producto que <span className="text-emerald-400">Ejecuta Rápido</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-400 leading-relaxed"
                        >
                            Ayudamos a empresas a escalar sin aumentar su estructura de personal, sustituyendo tareas manuales por sistemas inteligentes. <br /><br />
                            <span className="text-white font-medium">No somos una consultora tradicional.</span> Somos ingenieros obsesionados con la eficiencia.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link href="/contacto" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-all group">
                                Automatizar mi negocio
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <AboutVisual />
                    </motion.div>
                </div>
            </div>

            {/* Pillars Section */}
            <section className="py-24 bg-slate-900/30 border-y border-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Nuestros 4 Pilares</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Una arquitectura completa para cubrir todos los ángulos de tu crecimiento digital.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900/50 transition-all group ${pillar.border}`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6 ${pillar.color}`}>
                                    <pillar.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stack & Mission */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-12">

                    {/* Mission */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-mono text-emerald-400">NUESTRA MISIÓN</h2>
                        <p className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            "Eliminar el trabajo repetitivo para que los humanos se dediquen a crear."
                        </p>
                    </div>

                    {/* Stack */}
                    <div className="pt-12 border-t border-slate-800">
                        <p className="text-slate-500 text-sm font-mono mb-8 uppercase tracking-widest">Stack Tecnológico</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {stack.map((tech, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-medium text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
