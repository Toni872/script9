'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bot, Database, Globe, Lock, Server, MessageSquare, Zap, Cpu, Code2 } from 'lucide-react';
import Link from 'next/link';
import { TechnicalTerminal } from '@/components/services/demo/TechnicalTerminal';

export default function HowItWorksAgentPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">

            {/* 1. HEADER TÉCNICO */}
            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/servicios/agente-comercial" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Volver a Servicio</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">System Architecture v2.0</span>
                    </div>
                </div>
            </header>

            {/* 2. HERO INTRO */}
            <section className="pt-40 pb-20 px-6 border-b border-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono mb-8"
                    >
                        <Cpu className="w-3 h-3" />
                        TECHNICAL_BLUEPRINT: CONSUMER_AI_AGENT
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Ingeniería detrás de la <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Inteligencia Artificial</span>
                    </motion.h1>

                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
                        No usamos "plugins" mágicos. Desplegamos una arquitectura de microservicios que conecta tu Knowledge Base con un LLM (Gemini/GPT-4) y tu CRM. Así fluyen los datos.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <TechnicalTerminal service="agent" />
                    </motion.div>
                </div>
            </section>

            {/* 3. DIAGRAMA DE ARQUITECTURA (CSS PURO) */}
            <section className="py-24 px-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold mb-4">Flujo de Datos</h2>
                        <p className="text-slate-500">Visualización del pipeline de procesamiento de leads.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Lines Layer */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-10 hidden lg:block" />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                            {/* NODE 1: INPUT */}
                            <BlueprintNode
                                number="01"
                                title="Ingesta"
                                icon={Globe}
                                color="blue"
                                desc="El usuario escribe en WhatsApp o Web. El webhook captura el mensaje en <100ms."
                                tech={["Webhook", "Next.js Edge"]}
                            />

                            {/* NODE 2: PROCESSING */}
                            <BlueprintNode
                                number="02"
                                title="Razonamiento"
                                icon={Cpu}
                                color="purple"
                                desc="El LLM analiza la intención. Consulta tu Base de Datos Vectorial (RAG) para buscar respuestas precisas."
                                tech={["OpenAI GPT-4", "Pinecone DB"]}
                            />

                            {/* NODE 3: ACTION */}
                            <BlueprintNode
                                number="03"
                                title="Ejecución"
                                icon={Zap}
                                color="emerald"
                                desc="Si el cliente quiere cita, el agente consulta la API de Google Calendar y bloquea el hueco."
                                tech={["Google API", "Function Calling"]}
                            />

                            {/* NODE 4: STORAGE */}
                            <BlueprintNode
                                number="04"
                                title="Persistencia"
                                icon={Database}
                                color="amber"
                                desc="La conversación y los datos del lead se guardan estructurados en tu CRM o Airtable."
                                tech={["Supabase", "Salesforce/HubSpot"]}
                            />

                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SECURITY & PRIVACY */}
            <section className="py-24 px-6 bg-slate-900 border-y border-slate-800">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
                            <Lock className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6">Seguridad Grado Empresarial</h2>
                        <div className="space-y-6">
                            <SecurityPoint
                                title="Datos Encriptados"
                                desc="Tus datos viajan con encriptación TLS 1.3 y reposan en servidores europeos (GDPR Compliant)."
                            />
                            <SecurityPoint
                                title="Alucinaciones Controladas"
                                desc="Usamos 'Temperature 0' y RAG estricto. El agente nunca inventa precios ni servicios que no existan en tu doc."
                            />
                            <SecurityPoint
                                title="Rate Limiting"
                                desc="Protección contra ataques DDoS y abuso de uso de tokens mediante Middleware edge."
                            />
                        </div>
                    </div>
                    {/* Code Snippet Visual */}
                    <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-6 font-mono text-sm overflow-hidden relative group">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <pre className="text-slate-400 pt-8">
                            <code>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">systemPrompt</span> = <span className="text-emerald-300">`</span><br />
                                <span className="text-emerald-300">  Erest un asistente comercial experto.</span><br />
                                <span className="text-emerald-300">  Tus reglas de seguridad son:</span><br />
                                <span className="text-emerald-300">  1. NUNCA ofrezcas descuentos no listados.</span><br />
                                <span className="text-emerald-300">  2. Si no sabes, deriva a humano.</span><br />
                                <span className="text-emerald-300">  3. Contexto: {"{ context_data }"} </span><br />
                                <span className="text-emerald-300">`</span>;<br />
                                <br />
                                <span className="text-purple-400">await</span> openai.chat.completions.create({'{'}<br />
                                model: <span className="text-amber-300">"gpt-4-turbo"</span>,<br />
                                temperature: <span className="text-orange-400">0</span>,<br />
                                messages: [...]<br />
                                {'}'});
                            </code>
                        </pre>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-50" />
                    </div>
                </div>
            </section>

            {/* 5. TIMELINE IMPLEMENTACION */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">Cronograma de Despliegue</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                        <TimelineItem day="Día 1" title="Auditoría y Knowledge Base" desc="Nos reunimos para extraer toda la info de tu negocio y limpiar los datos." />
                        <TimelineItem day="Día 3" title="Configuración del Agente" desc="Programamos el System Prompt y conectamos las APIs (Google Calendar, CRM)." />
                        <TimelineItem day="Día 5" title="Testing en Staging" desc="Te damos acceso a un entorno de pruebas para que intentes 'romper' al agente." />
                        <TimelineItem day="Día 7" title="Despliegue a Producción" desc="Conectamos el agente a tu WhatsApp real. ¡Empiezas a recibir leads!" />
                    </div>
                </div>
            </section>

            {/* 6. CTA */}
            <section className="py-24 text-center">
                <div className="max-w-lg mx-auto">
                    <p className="text-emerald-400 font-mono text-sm mb-4">¿LISTO PARA LA INGENIERÍA?</p>
                    <h2 className="text-3xl font-bold text-white mb-8">Empieza con una Auditoría Gratuita</h2>
                    <Link href="/contacto">
                        <button className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition-all text-lg shadow-xl shadow-white/10">
                            Solicitar Análisis Viabilidad
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

function SecurityPoint({ title, desc }: any) {
    return (
        <div className="flex gap-4">
            <div className="w-1 h-full min-h-[50px] bg-slate-800 rounded-full" />
            <div>
                <h4 className="text-white font-bold mb-1">{title}</h4>
                <p className="text-sm text-slate-400">{desc}</p>
            </div>
        </div>
    )
}

function TimelineItem({ day, title, desc }: any) {
    return (
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors group-hover:border-emerald-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-lg">{title}</span>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">{day}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
