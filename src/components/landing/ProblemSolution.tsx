'use client';

import { motion } from 'framer-motion';
import { X, Check, ArrowRight, MinusCircle, Zap, ShieldAlert, Clock, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

export function ProblemSolution() {
    const containerRef = useRef(null);

    const problems = [
        {
            icon: Clock,
            title: "Cuello de Botella Operativo",
            desc: "Tu equipo pierde el 40% del día en tareas repetitivas (emails, datos, citas) que no generan valor estratégico."
        },
        {
            icon: ShieldAlert,
            title: "Fuga de Clientes",
            desc: "Los leads se enfrían porque la respuesta tarda horas. La competencia con IA responde en segundos."
        },
        {
            icon: MinusCircle,
            title: "Errores Costosos",
            desc: "Copiar y pegar datos manualmente genera errores humanos que afectan la facturación y la confianza."
        }
    ];

    const solutions = [
        {
            icon: Zap,
            title: "Ejecución Instantánea 24/7",
            desc: "Nuestros agentes de IA trabajan mientas duermes. Respuesta inmediata, cero tiempos de espera."
        },
        {
            icon: TrendingUp,
            title: "Escalabilidad Infinita",
            desc: "Atiende a 10 o 10.000 clientes simultáneamente sin contratar más personal ni aumentar costes fijos."
        },
        {
            icon: Check,
            title: "Precisión Quirúrgica",
            desc: "Flujos de datos automatizados con 100% de exactitud. Tu CRM y contabilidad siempre perfectos."
        }
    ];

    return (
        <section className="py-24 bg-slate-950 border-y border-slate-800 relative overflow-hidden" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            La Evolución de tu Negocio
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                            La gestión tradicional tiene un límite. La automatización inteligente no.
                            <br className="hidden md:block" />
                            <span className="text-white font-semibold">¿De qué lado quieres estar?</span>
                        </p>
                    </motion.div>
                </div>

                {/* HORIZONTAL LAYOUT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">

                    {/* PROBLEM CARD (The Old Way - Grayscale/Red) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group relative bg-slate-900/50 rounded-[2rem] p-8 md:p-10 shadow-lg border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden flex flex-col h-full grayscale hover:grayscale-0"
                    >
                        <div className="flex items-center gap-4 mb-8 opacity-70">
                            <div className="uppercase tracking-widest text-xs font-bold text-slate-500 border border-slate-700 px-3 py-1 rounded-full">
                                El modelo tradicional
                            </div>
                            <div className="h-px bg-slate-800 flex-1" />
                        </div>

                        <div className="space-y-8 flex-1">
                            {problems.map((item, i) => (
                                <div key={i} className="flex gap-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 border border-slate-700">
                                        <item.icon className="w-5 h-5 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-300 mb-2">{item.title}</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* VS BADGE */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="bg-slate-900 p-2 rounded-full shadow-xl border border-slate-800">
                            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-[3px] border-slate-900">
                                VS
                            </div>
                        </div>
                    </div>

                    {/* SOLUTION CARD (The Script9 Way - strict Blue/White/Red) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group relative bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl text-white overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 flex flex-col h-full border border-emerald-500/20 hover:border-emerald-500/50"
                    >


                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="uppercase tracking-widest text-xs font-bold text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/10 backdrop-blur-md">
                                    El Método Script9
                                </div>
                                <div className="h-px bg-emerald-500/20 flex-1" />
                            </div>

                            <div className="space-y-8 flex-1">
                                {solutions.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        className="flex gap-5"
                                    >
                                        <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                            <item.icon className="w-5 h-5 stroke-[1.5]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{item.title}</h3>
                                            <p className="text-zinc-400 leading-relaxed text-sm antialiased font-light">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
