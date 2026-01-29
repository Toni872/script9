'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Network, Link as LinkIcon, Layers, Server, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TechnicalTerminal } from '@/components/services/demo/TechnicalTerminal';

export default function HowItWorksIntegrationsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 font-sans">

            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/servicios/integraciones" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Volver a Servicio</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">Middleware Logic</span>
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
                        <Network className="w-3 h-3" />
                        UNIFIED_DATA_SCHEMA
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Tus herramientas (al fin) <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hablan el Mismo Idioma</span>
                    </motion.h1>

                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
                        Eliminamos los silos de datos. Creamos un "Middleware" intermedio que traduce los datos de tu Ecommerce para que tu ERP los entienda perfectamente.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <TechnicalTerminal service="integration" />
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold mb-4">Pipeline ETL (Extract, Transform, Load)</h2>
                        <p className="text-slate-500">Cómo movemos los datos sin perderlos por el camino.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-10 hidden lg:block" />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                            <BlueprintNode
                                number="01"
                                title="Extracción (API)"
                                icon={Server}
                                color="blue"
                                desc="Nos conectamos a las APIs de tus herramientas (REST/GraphQL). Accedemos a los datos crudos."
                                tech={["Axios", "Oauth 2.0"]}
                            />

                            <BlueprintNode
                                number="02"
                                title="Normalización"
                                icon={Layers}
                                color="purple"
                                desc="Limpiamos los datos. Convertimos fechas, monedas y formatos para que coincidan con el destino."
                                tech={["Typescript Maps", "Zod Validation"]}
                            />

                            <BlueprintNode
                                number="03"
                                title="Sincronización"
                                icon={LinkIcon}
                                color="emerald"
                                desc="Enviamos los datos limpios al sistema destino, gestionando límites de velocidad (Rate Limits)."
                                tech={["Queue System", "BullMQ"]}
                            />

                            <BlueprintNode
                                number="04"
                                title="Logging Audit"
                                icon={ShieldCheck}
                                color="amber"
                                desc="Registramos cada movimiento. Si un dato falla, tenemos un log exacto de por qué sucedió."
                                tech={["Sentry", "CloudWatch"]}
                            />

                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-900 border-y border-slate-800">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Stack de Integración</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <TechItem name="REST APIs" />
                        <TechItem name="GraphQL" />
                        <TechItem name="Webhooks" />
                        <TechItem name="SQL / NoSQL" />
                        <TechItem name="gRPC" />
                        <TechItem name="SOAP (Legacy)" />
                        <TechItem name="OAuth 2.0" />
                        <TechItem name="JWT Auth" />
                    </div>
                    <p className="mt-8 text-slate-400 text-sm">
                        Nos conectamos a <strong>cualquier cosa</strong> que tenga documentación. Desde CRMs modernos a ERPs antiguos.
                    </p>
                </div>
            </section>

            <section className="py-24 text-center">
                <div className="max-w-lg mx-auto">
                    <p className="text-purple-400 font-mono text-sm mb-4">SINGLE SOURCE OF TRUTH</p>
                    <h2 className="text-3xl font-bold text-white mb-8">Centraliza tu negocio</h2>
                    <Link href="/contacto">
                        <button className="bg-purple-500 text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-purple-400 transition-all text-lg shadow-xl shadow-purple-500/20">
                            Auditar mis Herramientas
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

function TechItem({ name }: { name: string }) {
    return (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono text-sm hover:border-purple-500/50 transition-colors cursor-default">
            {name}
        </div>
    )
}
