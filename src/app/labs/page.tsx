"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bot, Zap, MessageSquare, CheckCircle2, Server, Database, Lock, Code2, Cpu, Network, ShieldCheck, Terminal } from "lucide-react";
import Link from "next/link";

export default function LabsPage() {
    return (
        <main className="min-h-screen bg-[#0B0F17] text-white font-sans selection:bg-emerald-500/30">
            <header className="fixed top-0 w-full z-50 bg-[#0B0F17]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono">Volver a Home</span>
                    </Link>
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase font-bold">SCRIPT9 LABS: OPEN RESEARCH</span>
                    </div>
                </div>
            </header>

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex gap-2"
                    >
                        <span className="text-emerald-500 font-mono text-xs uppercase tracking-wider mb-2 block">&gt; ./init_protocols.sh</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-bold mb-8 tracking-tight text-white"
                    >
                        Ingeniería <span className="text-slate-600">vs</span> Hype.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-3xl"
                    >
                        El mercado está saturado de "wrappers de GPT". En <span className="text-white font-medium">Script9 Labs</span>, construimos sistemas autónomos resilientes.
                        <br /><br />
                        Aquí documentamos públicamente nuestra arquitectura interna. Sin secretos comerciales.
                        Solo código, métricas de latencia y stacks de producción.
                    </motion.p>
                </div>

                <div className="max-w-6xl mx-auto space-y-40">

                    {/* CASE 1: AGENT */}
                    <CaseStudy
                        number="01"
                        id="sales-agent"
                        title="Agente IA de Ventas (Inbound)"
                        category="Autonomous Systems"
                        icon={Bot}
                        color="emerald"
                        stats={[
                            { label: "Tiempo Respuesta", value: "45s" },
                            { label: "Tasa Conversión", value: "5.5%" },
                            { label: "Coste Operativo", value: "-92%" }
                        ]}
                        stack={["OpenAI GPT-4o", "Pinecone (Vector DB)", "n8n (Orquestador)", "Twilio API"]}
                        context="Una agencia de marketing recibía 50 leads/día. 3 SDRs humanos cualificaban manualmente. Resultado: Leads contactados 4 horas tarde, seguimiento nulo en fines de semana y quemado del equipo."
                        technical_solution={[
                            { title: "Ingesta & Sanitización", desc: "Webhook receptor desde Typeform. Validación de emails con Regex y ZeroBounce API antes de procesar." },
                            { title: "Core Cognitivo (RAG)", desc: "El agente consulta una base de conocimiento vectorial (Pinecone) con casos de éxito de la agencia antes de responder. No alucina." },
                            { title: "Tool Calling", desc: "El LLM tiene permisos para ejecutar funciones: `check_calendar_availability()` y `book_meeting()` directamente en Google Calendar." }
                        ]}
                    />

                    {/* CASE 2: BILLING */}
                    <CaseStudy
                        number="02"
                        id="finance-orch"
                        title="Orquestador Financiero Event-Driven"
                        category="FinOps Automation"
                        icon={Zap}
                        color="amber"
                        stats={[
                            { label: "Ahorro Mensual", value: "25h" },
                            { label: "Errores Humanos", value: "0%" },
                            { label: "Dunning Recovery", value: "+15%" }
                        ]}
                        stack={["Stripe Webhooks", "Quaderno API", "Slack Block Kit", "PostgreSQL"]}
                        context="El proceso de facturación era manual. Al escalar a 200 clientes, el Founder pasaba los días 1-5 del mes conciliando Stripe con facturas PDF y persiguiendo pagos fallidos manualmente."
                        technical_solution={[
                            { title: "Arquitectura Idempotente", desc: "Uso de `idempotency_keys` para asegurar que ningún cargo se duplique, incluso si el webhook de Stripe se dispara dos veces." },
                            { title: "Conciliación Automática", desc: "Evento `invoice.payment_succeeded` dispara la generación de PDF legal en Quaderno y lo sube a Drive organizado por /Año/Mes/Cliente." },
                            { title: "Log de Auditoría", desc: "Cada movimiento financiero se registra en un canal privado de Slack #finances-log con metadatos completos para trazabilidad instantánea." }
                        ]}
                    />

                    {/* CASE 3: SUPPORT */}
                    <CaseStudy
                        number="03"
                        id="logistic-support"
                        title="Soporte Logístico Nivel 1"
                        category="Ecommerce Operations"
                        icon={MessageSquare}
                        color="blue"
                        stats={[
                            { label: "Tickets Automáticos", value: "72%" },
                            { label: "CSAT Score", value: "4.8/5" },
                            { label: "Disponibilidad", value: "24/7" }
                        ]}
                        stack={["Shopify API", "Aftership Webhooks", "Zendesk API", "LangSmith"]}
                        context="Ecommerce con 1000 pedidos/mes. El 80% de los tickets de soporte eran WISMO ('Where Is My Order'). El equipo de soporte humano estaba saturado respondiendo la misma pregunta repetitiva."
                        technical_solution={[
                            { title: "Routing Inteligente", desc: "Clasificador NLP analiza el ticket entrante. Si la intención es `check_order_status`, se enruta al Agente. Si es `product_issue`, escala a humano." },
                            { title: "API Chain", desc: "El Agente consulta Shopify para validar el pedido y Aftership para obtener la ubicación real del paquete en tiempo real." },
                            { title: " Respuesta Dinámica", desc: "Genera una respuesta empática con el link de tracking directo y fecha estimada, cerrando el ticket automáticamente en Zendesk." }
                        ]}
                    />

                </div>
            </section>

            <section className="py-24 bg-[#0B0F17] border-t border-slate-900 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-900/0 to-slate-900/0 pointer-events-none" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">¿Tu infraestructura está lista?</h2>
                    <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                        No vendemos "software empaquetado". Diseñamos e implementamos estos
                        <span className="text-emerald-400 font-medium"> sistemas a medida </span>
                        en tu propia nube privada. Tú eres dueño del código, los datos y la propiedad intelectual.
                    </p>
                    <Link href="/contacto">
                        <button className="group relative px-8 py-4 bg-white text-slate-950 font-bold rounded-xl text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                            <span className="relative z-10 flex items-center gap-2">
                                Agendar Auditoría Técnica
                                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

function CaseStudy({ number, id, title, category, icon: Icon, color, stats, stack, context, technical_solution }: any) {
    const colors: any = {
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    };

    return (
        <div id={id} className="relative group">
            {/* Timeline Line */}
            <div className="absolute left-0 md:-left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden xl:block" />

            <div className="flex flex-col xl:flex-row gap-16">

                {/* Visual / Stats Column */}
                <div className="w-full xl:w-1/3 shrink-0">
                    <div className="sticky top-32">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-6xl font-black text-slate-800 opacity-50 select-none font-mono">{number}</span>
                            <div className={`p-3 rounded-xl border ${colors[color]} backdrop-blur-sm`}>
                                <Icon className="w-8 h-8" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
                        <div className={`inline-block mb-8 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-slate-800 text-slate-400 bg-slate-900/50`}>
                            {category}
                        </div>

                        {/* KPIS */}
                        <div className="grid grid-cols-1 gap-4 mb-8">
                            {stats.map((stat: any, i: number) => (
                                <div key={i} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between group-hover:border-slate-700 transition-colors">
                                    <span className="text-slate-500 text-xs font-mono uppercase">{stat.label}</span>
                                    <span className={`text-xl font-bold ${i === 0 ? `text-${color}-400` : 'text-white'}`}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* TECH STACK */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Code2 className="w-3 h-3" /> Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {stack.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono hover:text-white hover:border-slate-600 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-12 pt-8">
                    {/* Context Block */}
                    <div className="bg-[#111620] p-8 rounded-2xl border border-slate-800/60 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck className="w-24 h-24 text-slate-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-rose-500" />
                            El Desafío (Legacy)
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {context}
                        </p>
                    </div>

                    {/* Solution Steps */}
                    <div className="space-y-6 relative">
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-800 z-0"></div>

                        <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2 relative z-10 pl-1">
                            <Network className="w-4 h-4 text-emerald-500" />
                            Arquitectura de Solución
                        </h3>

                        {technical_solution.map((step: any, i: number) => (
                            <div key={i} className="relative z-10 pl-12 group/step">
                                <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-[#0B0F17] bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 group-hover/step:bg-emerald-500 group-hover/step:text-slate-950 transition-colors shadow-xl`}>
                                    {i + 1}
                                </div>
                                <div className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-xl hover:bg-slate-900/60 hover:border-slate-700 transition-all">
                                    <h4 className="text-white font-bold mb-2 text-base">{step.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
