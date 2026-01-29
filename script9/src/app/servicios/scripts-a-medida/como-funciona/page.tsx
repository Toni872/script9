'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Terminal, Cpu, Database, Cloud, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TechnicalTerminal } from '@/components/services/demo/TechnicalTerminal';

export default function HowItWorksScriptsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">

            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/servicios/scripts-a-medida" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Volver a Servicio</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-mono text-blue-500 tracking-widest uppercase">Custom Runtime Env</span>
                    </div>
                </div>
            </header>

            <section className="pt-40 pb-20 px-6 border-b border-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono mb-8"
                    >
                        <Code2 className="w-3 h-3" />
                        PURE_CODE_SOLUTIONS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Cuando el No-Code <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Se Queda Corto</span>
                    </motion.h1>

                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
                        Hay problemas que Zapier no puede resolver. Algoritmos de optimización, scraping masivo o procesamiento de imágenes. Ahí entramos nosotros con Python y Node.js.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <TechnicalTerminal service="script" />
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold mb-4">Ciclo de Desarrollo SDLC</h2>
                        <p className="text-slate-500">Metodología de ingeniería de software real, aplicada a tu negocio.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-10 hidden lg:block" />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                            <BlueprintNode
                                number="01"
                                title="Análisis"
                                icon={Terminal}
                                color="emerald"
                                desc="Definimos los requisitos técnicos. Input, Output y restricciones de rendimiento (tiempo/coste)."
                                tech={["Specs", "Architecture"]}
                            />

                            <BlueprintNode
                                number="02"
                                title="Desarrollo"
                                icon={Code2}
                                color="blue"
                                desc="Escribimos código limpio y modular (SOLID). Nada de scripts sucios que se rompen al mes."
                                tech={["Python", "TypeScript"]}
                            />

                            <BlueprintNode
                                number="03"
                                title="Cloud Deploy"
                                icon={Cloud}
                                color="purple"
                                desc="Desplegamos el código en funciones Serverless (AWS Lambda o Supabase Functions) para escalar infinitamente."
                                tech={["Docker", "Serverless"]}
                            />

                            <BlueprintNode
                                number="04"
                                title="Mantenimiento"
                                icon={Shield}
                                color="amber"
                                desc="Monitorizamos la ejecución. Si la API cambia, nosotros actualizamos el código."
                                tech={["CI/CD", "GitOps"]}
                            />

                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-900 border-y border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Casos de Uso "Solo Código"</h2>
                            <div className="space-y-6">
                                <UseCase
                                    title="Scraping de Competencia"
                                    desc="Bots que navegan webs rivales, extraen precios y te alertan si bajan."
                                />
                                <UseCase
                                    title="Generación masiva de PDFs"
                                    desc="Crear 1.000 facturas o informes personalizados con datos de Excel en segundos."
                                />
                                <UseCase
                                    title="Algoritmos de Asignación"
                                    desc="Repartir leads entre comerciales basado en ubicación, carga de trabajo y score (Lógica compleja)."
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20"></div>
                            <div className="relative bg-[#0d1117] rounded-lg border border-slate-800 p-4 font-mono text-xs md:text-sm shadow-2xl">
                                <pre className="text-slate-300">
                                    <code>
                                        <span className="text-slate-500"># Algoritmo de Asignación de Leads</span><br />
                                        <span className="text-blue-400">def</span> <span className="text-purple-400">assign_lead</span>(lead):<br />
                                        &nbsp;&nbsp;agents = db.get_active_agents()<br />
                                        <br />
                                        &nbsp;&nbsp;<span className="text-slate-500"># Lógica de scoring compleja</span><br />
                                        &nbsp;&nbsp;best_agent = <span className="text-blue-400">max</span>(agents, key=<span className="text-blue-400">lambda</span> a: (<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;a.conversion_rate * <span className="text-orange-400">0.7</span> + <br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;a.availability_score * <span className="text-orange-400">0.3</span><br />
                                        &nbsp;&nbsp;))<br />
                                        <br />
                                        &nbsp;&nbsp;<span className="text-purple-400">return</span> best_agent.id
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <div className="max-w-lg mx-auto">
                    <p className="text-blue-400 font-mono text-sm mb-4">CUSTOM ENGINEERING</p>
                    <h2 className="text-3xl font-bold text-white mb-8">Soluciones a medida, problemas únicos</h2>
                    <Link href="/contacto">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all text-lg shadow-xl shadow-blue-500/20">
                            Hablar con un Desarrollador
                        </button>
                    </Link>
                </div>
            </section>

        </main>
    );
}

function BlueprintNode({ number, title, icon: Icon, color, desc, tech }: any) {
    const colors: any = {
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    }

    return (
        <div className="relative group">
            <div className={`p-6 rounded-2xl border ${colors[color].split(' ')[2]} ${colors[color].split(' ')[1]} backdrop-blur-sm hover:scale-105 transition-transform duration-300 h-full`}>
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 bg-slate-950`}>
                        <Icon className={`w-5 h-5 ${colors[color].split(' ')[0]}`} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 opacity-50">{number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{desc}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tech.map((t: string) => (
                        <span key={t} className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function UseCase({ title, desc }: any) {
    return (
        <div className="pl-6 border-l-2 border-slate-800 hover:border-blue-500 transition-colors">
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
