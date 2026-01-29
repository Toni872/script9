'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Workflow, Zap, Database, GitBranch, ArrowRight, Server, Repeat, Globe } from 'lucide-react';
import Link from 'next/link';
import { TechnicalTerminal } from '@/components/services/demo/TechnicalTerminal';

export default function HowItWorksAutomationPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-amber-500/30 font-sans">

            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/servicios/automatizaciones" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Volver a Servicio</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">Orchestration Layer</span>
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
                        <Workflow className="w-3 h-3" />
                        EVENT_DRIVEN_ARCHITECTURE
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Tu empresa, funcionando <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">en Piloto Automático</span>
                    </motion.h1>

                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
                        Sustituimos el "Copy-Paste" por Webhooks. Construimos una arquitectura de eventos donde una venta en Stripe dispara 7 acciones simultáneas sin intervención humana.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <TechnicalTerminal service="automation" />
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold mb-4">Arquitectura del Flujo</h2>
                        <p className="text-slate-500">Ejemplo: Proceso de Onboarding Automático.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-10 hidden lg:block" />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                            <BlueprintNode
                                number="01"
                                title="Trigger (Disparador)"
                                icon={Globe}
                                color="blue"
                                desc="El evento raíz. Puede ser un pago en Stripe, un Formulario Typeform o un Email recibido."
                                tech={["Stripe Webhook", "IMAP Watcher"]}
                            />

                            <BlueprintNode
                                number="02"
                                title="Transformación"
                                icon={GitBranch}
                                color="purple"
                                desc="Estandarizamos los datos (JSON). Si falta el teléfono, usamos herramientas de enriquecimiento para buscarlo."
                                tech={["JSON Parser", "Apollo API"]}
                            />

                            <BlueprintNode
                                number="03"
                                title="Orquestación"
                                icon={Workflow}
                                color="amber"
                                desc="Aquí ocurre la magia. N8N distribuye las tareas: crea factura, crea usuario y manda email de bienvenida."
                                tech={["n8n Self-Hosted", "Logic Gates"]}
                            />

                            <BlueprintNode
                                number="04"
                                title="Notificación"
                                icon={Server}
                                color="emerald"
                                desc="Slack te avisa: 'Nuevo Cliente VIP ($2,000)'. El sistema duerme hasta el próximo evento."
                                tech={["Slack Webhook", "Telegram Bot"]}
                            />

                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-900 border-y border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-8 shadow-2xl">
                                <h3 className="text-slate-500 text-xs font-mono mb-4 uppercase tracking-widest font-semibold">Workflow.json</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 font-bold text-xs">IN</div>
                                        <div className="text-sm">Webhook: New Order</div>
                                    </div>
                                    <div className="flex justify-center"><div className="w-px h-6 bg-slate-700" /></div>
                                    <div className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <div className="w-8 h-8 bg-amber-500/20 rounded flex items-center justify-center text-amber-400">
                                            <Workflow className="w-4 h-4" />
                                        </div>
                                        <div className="text-sm">Router: Is Deal {'>'} $1000?</div>
                                    </div>
                                    <div className="flex justify-center relative h-6">
                                        <div className="w-px h-full bg-slate-700 left-1/2 absolute"></div>
                                        <div className="w-24 h-px bg-slate-700 top-full absolute left-1/2 -translate-x-1/2"></div>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <div className="p-2 border border-green-500/30 bg-green-500/10 rounded text-xs text-green-400">VIP Flow</div>
                                        <div className="p-2 border border-slate-700 bg-slate-800 rounded text-xs text-slate-400">Standard Flow</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl font-bold mb-6">Lógica Condicional Compleja</h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                No son simples "zaps" lineales. Creamos if/else, bucles y lógica de reintento.
                                <br /><br />
                                <strong className="text-white">Ejemplo Real:</strong> Si un pago falla, esperamos 3 días, reintentamos, y si falla de nuevo, enviamos WhatsApp automático y alertamos a finanzas.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    <span>Ejecución en Nube Privada (Sin límites de pasos)</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Repeat className="w-4 h-4 text-amber-500" />
                                    <span>Manejo de Errores y Reintentos Automáticos</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <div className="max-w-lg mx-auto">
                    <p className="text-amber-400 font-mono text-sm mb-4">STOP MANUAL WORK</p>
                    <h2 className="text-3xl font-bold text-white mb-8">¿Cuántas horas vas a recuperar?</h2>
                    <Link href="/contacto">
                        <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-all text-lg shadow-xl shadow-amber-500/20">
                            Diseñar mi Workflow
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
