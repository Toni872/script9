"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Terminal, Code2, Server, TrendingUp, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutFounder() {
    return (
        <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Quién está detrás de Script9</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        No somos una agencia de marketing. Somos ingenieros construyendo sistemas de producción.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* PROFILE 1: TONY */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left group"
                    >
                        <div className="shrink-0 relative">
                            <div className="w-40 h-56 rounded-xl overflow-hidden border-2 border-slate-800 bg-slate-950 relative z-10 group-hover:border-emerald-500/50 transition-colors">
                                <Image
                                    src="/images/team/tony.jpg"
                                    alt="Tony Lloret"
                                    fill
                                    sizes="160px"
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-1">Tony Lloret</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">FOUNDER & LEAD ENGINEER</span>
                                <div className="h-px bg-emerald-500/50 w-8" />
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Ingeniero de Software especializado en sistemas de automatización escalables. Convierte procesos caóticos en pipelines de código robusto.
                            </p>

                            <div className="space-y-2 mb-6 text-left">
                                <SkillItem icon={Code2} text="Ingeniería de Software" />
                                <SkillItem icon={Terminal} text="Automatización con n8n/Python" />
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <a href="https://www.linkedin.com/in/tony-lloret-080166156" target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="https://github.com/Toni872" target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                    <Github className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* PROFILE 2: CHRISTIAN */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left group"
                    >
                        <div className="shrink-0 relative">
                            <div className="w-40 h-56 rounded-xl overflow-hidden border-2 border-slate-800 bg-slate-950 relative z-10 group-hover:border-blue-500/50 transition-colors">
                                <Image
                                    src="/images/team/chris.jpg"
                                    alt="Christian Hernández"
                                    fill
                                    sizes="160px"
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-1">Christian Hernández</h3>
                            <p className="text-blue-400 font-mono text-xs mb-4 uppercase tracking-wider font-bold">CO-FOUNDER & STRATEGY</p>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Experto en estrategia de negocio y expansión tecnológica. Traduce necesidades empresariales complejas en soluciones técnicas viables.
                            </p>

                            <div className="space-y-2 mb-6 text-left">
                                <SkillItem icon={Cpu} text="Estrategia Tecnológica" color="text-blue-500" />
                                <SkillItem icon={TrendingUp} text="Desarrollo de Negocio Digital" color="text-blue-500" />
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <a href="https://www.linkedin.com/in/christian-hernández" target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/contacto">
                        <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-emerald-400 hover:text-white transition-all shadow-xl shadow-white/5 text-lg hover:shadow-emerald-500/20 hover:-translate-y-1">
                            Hablar con el Equipo
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function SkillItem({ icon: Icon, text, color = "text-emerald-500" }: any) {
    return (
        <div className="flex items-center gap-3 text-slate-300 text-sm">
            <div className={`p-2 rounded bg-slate-900 border border-slate-800 ${color}`}>
                <Icon className="w-4 h-4" />
            </div>
            {text}
        </div>
    );
}
