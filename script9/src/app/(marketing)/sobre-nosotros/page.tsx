'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, Network, Code2, ArrowRight, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { AboutVisual } from '@/components/marketing/AboutVisual';
import Link from 'next/link';

import { AboutFounder } from '@/components/landing/AboutFounder';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">

            {/* 1. HERO MANIFESTO: Bold, Text-Heavy, Editorial Style */}
            <section className="pt-32 pb-24 px-6 border-b border-slate-900">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-8"
                    >
                        <Terminal className="w-3 h-3" />
                        System.Init(Script9)
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white"
                    >
                        Ingeniería Primero.<br />
                        <span className="text-slate-600">Marketing Segundo.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-light"
                    >
                        Script9 nació de una frustración: ver a empresas pagar fortunas por "consultoría digital" que terminaba en PDFs vacíos.
                        <br /><br />
                        Nosotros no vendemos humo. Vendemos <span className="text-white font-medium border-b border-emerald-500/50">Sistemas que Funcionan</span>.
                    </motion.p>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY (Grid) */}
            <section className="py-24 px-6 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Cpu className="w-8 h-8 text-emerald-500" />
                                Nuestra Filosofía Técnica
                            </h2>
                            <div className="space-y-8">
                                <PhilosophyItem
                                    title="Código sobre No-Code"
                                    desc="El No-Code es genial para prototipos. Para escalar, usamos Python, Typscript y SQL. Construimos activos sólidos, no parches temporales."
                                />
                                <PhilosophyItem
                                    title="Automatización Radical"
                                    desc="Si se hace más de 3 veces, se automatiza. Creemos que el talento humano es demasiado valioso para desperdiciarlo en 'Copy-Paste'."
                                />
                                <PhilosophyItem
                                    title="Privacidad por Diseño"
                                    desc="Tus datos operan en silos seguros. No compartimos modelos ni datos entre clientes. Tu IP es tuya."
                                />
                            </div>
                        </div>

                        {/* Right: Technical Visual */}
                        <div className="relative h-[500px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transform md:rotate-3 transition-transform hover:rotate-0 duration-500">
                            <AboutVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. METRICS / IMPACT (Dark Strip) */}
            <section className="py-20 bg-slate-900 border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <MetricItem value="25,000+" label="Horas Ahorradas/Año" />
                        <MetricItem value="99.9%" label="Uptime de Sistemas" />
                        <MetricItem value="< 2s" label="Tiempo de Respuesta IA" />
                        <MetricItem value="100%" label="Propiedad del Código" />
                    </div>
                </div>
            </section>

            {/* 4. FOUNDER BIO / TEAM SECTION */}
            <AboutFounder />
        </div>
    );
}

function PhilosophyItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="pl-6 border-l-2 border-slate-800 hover:border-emerald-500 transition-colors duration-300">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function MetricItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-white font-mono">{value}</div>
            <div className="text-xs text-emerald-500 font-bold tracking-widest uppercase">{label}</div>
        </div>
    );
}

