import { Button } from "@/components/ui/button";
import { Check, Bot, MessageSquare, Database, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ROICalculator from "@/components/marketing/ROICalculator";
// import AgentChatDemo from "@/components/agent/AgentChatDemo"; // REMOVED

export default function AgenteComercialPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    {/* Deep Tech Background Layer */}
                    <div className="absolute inset-0 bg-slate-950" />

                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    {/* Radial Gradient Glows */}
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500/20 opacity-20 blur-[100px]" />
                    <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] bg-indigo-500/10 opacity-20 blur-[100px]" />

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    {/* Fade to bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <Bot className="w-4 h-4" />
                            <span>Nueva Tecnología Script9</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                            El Primer Agente Comercial <br />
                            <span className="text-emerald-400">Que Realmente Vende</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                            No es un chatbot básico. Es un asistente inteligente que resuelve dudas técnicas, genera presupuestos personalizados conectados a tu ERP y cierra ventas mientras duermes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                            <Link href="/contacto">
                                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full px-8 h-12">
                                    Solicitar Demo
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="#como-funciona">
                                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white">
                                    Ver Cómo Funciona
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="como-funciona" className="py-24 bg-slate-900/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
                                title: "Atención Real",
                                desc: "Resuelve dudas complejas en tiempo real usando RAG sobre tu base de conocimiento."
                            },
                            {
                                icon: <Database className="w-6 h-6 text-emerald-400" />,
                                title: "Conexión ERP",
                                desc: "Calcula precios exactos y genera presupuestos PDF conectados a tu base de datos."
                            },
                            {
                                icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
                                title: "CRM Automático",
                                desc: "Cada interacción valiosa se guarda como lead cualificado en tu CRM automáticamente."
                            },
                            {
                                icon: <Bot className="w-6 h-6 text-emerald-400" />,
                                title: "Omnicanal",
                                desc: "Vive en tu Web, WhatsApp y Email simultáneamente. Una sola mente, múltiples canales."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-slate-950 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section className="py-24 bg-slate-950 relative border-y border-slate-800">
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Míralo en Acción</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Una imagen vale más que mil palabras. Un agente trabajando live con tus clientes vale más que mil imágenes.
                    </p>
                </div>
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-800 bg-slate-900 group">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                            </div>
                        </div>
                        {/* Placeholder Thumbnail - In prod use real video thumbnail */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-8 left-8 text-left z-20">
                            <h3 className="text-2xl font-bold">Demo Agente Inmobiliario</h3>
                            <p className="text-slate-300">Captación y cualificación en tiempo real</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator Section */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-4">
                    <ROICalculator />
                </div>
            </section>

            {/* Social Proof / Plan Moves Case */}
            <section className="py-24 border-y border-slate-800 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 text-white text-xs font-medium border border-slate-700">
                                Caso de Éxito
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold">
                                "Cuando la automatización se aplica bien, se nota."
                            </h2>
                            <p className="text-slate-400 text-lg">
                                Implementamos este sistema para <span className="text-emerald-400 font-semibold">Empresa del Sector Energético</span>. El resultado: menos tareas manuales, respuestas inmediatas y un proceso comercial fluido sin perder el trato humano.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Centralización de operativa comercial",
                                    "Presupuestos automáticos en segundos",
                                    "Cualificación de leads 24/7"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 h-[400px] flex items-center justify-center">
                            {/* Placeholder for Plan Moves Interface Image */}
                            <div className="text-center p-8">
                                <Bot className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-600">Interfaz del Agente Plan Moves</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">¿Listo para automatizar tus ventas?</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Implementamos tu propio Agente Comercial Inteligente en menos de 2 semanas. Escala tu negocio sin escalar tu equipo de soporte.
                    </p>
                    <Link href="/contacto">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-10 h-14 text-lg font-bold shadow-lg shadow-white/10">
                            Contratar Agente IA
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
