'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Code2, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { DeepTechHero } from '@/components/ui/DeepTechHero';

export default function AboutPage() {
    const team = [
        {
            name: "Daniel Torres",
            role: "CEO & Lead Architect",
            bio: "Ingeniero de Software con +10 años en automatización. Obsesionado con eliminar el trabajo repetitivo.",
            icon: BrainCircuit
        },
        {
            name: "Alex Riva",
            role: "CTO & AI Specialist",
            bio: "Experto en LLMs y arquitecturas escalables. Construyendo el futuro de los agentes autónomos.",
            icon: Code2
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            {/* Hero Section */}
            <DeepTechHero
                title={<>Quiénes <span className="text-emerald-400">Somos</span></>}
                subtitle="Somos un equipo de ingenieros y estrategas dedicados a una misión: democratizar la automatización inteligente para empresas que quieren liderar, no solo competir."
            />

            {/* History Section */}
            <section className="py-24 bg-slate-900/50 border-y border-slate-900">
                <div className="max-w-4xl mx-auto px-5">
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-4 relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-slate-800 flex items-center justify-center p-8">
                                <div className="text-8xl font-bold text-white/5 font-mono select-none">S9</div>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay rounded-2xl" />
                            </div>
                        </div>
                        <div className="md:col-span-8 space-y-6">
                            <h2 className="text-3xl font-bold text-white">Nuestros Orígenes</h2>
                            <div className="space-y-4 text-slate-400 leading-relaxed text-lg font-light">
                                <p>
                                    Nacimos en 2023 con una premisa radical pero necesaria: <span className="text-emerald-400 font-medium">la automatización de élite no debería ser exclusiva de las grandes corporaciones.</span>
                                </p>
                                <p>
                                    Todo comenzó en un pequeño coworking de Madrid, cuando ayudamos a una agencia local a recuperar 20 horas semanales automatizando sus reportes manuales. Lo que empezó como una colección de scripts personales (de ahí el nombre "Script9", por nuestro noveno script que cambió la arquitectura por completo) se transformó rápidamente en algo más grande.
                                </p>
                                <p>
                                    Hoy, Script9 no es solo una consultora de software. Somos arquitectos de tiempo. Diseñamos ecosistemas digitales que permiten a los fundadores dejar de operar su negocio para empezar a dirigirlo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-12">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all group"
                            >
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 group-hover:bg-slate-800/80 transition-colors">
                                        <member.icon className="w-10 h-10 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                                        <p className="text-emerald-400 font-medium">{member.role}</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    {member.bio}
                                </p>
                                <div className="flex gap-4">
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                        <Github className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
