'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProcessSteps() {
    const router = useRouter();

    const steps = [
        {
            id: "01",
            icon: Search,
            title: "Auditoría & Diagnóstico",
            description: "Analizamos tus procesos actuales para identificar cuellos de botella y oportunidades ocultas de automatización.",
            details: [
                "Mapeo de procesos críticos",
                "Identificación de ineficiencias",
                "Reporte de viabilidad técnica"
            ]
        },
        {
            id: "02",
            icon: PenTool,
            title: "Estrategia a Medida",
            description: "Diseñamos un plan de acción detallado y un presupuesto personalizado basado en el ROI proyectado.",
            details: [
                "Diseño de arquitectura de IA",
                "Selección de tecnologías",
                "Cálculo de ROI estimado"
            ]
        },
        {
            id: "03",
            icon: Rocket,
            title: "Implementación & Despegue",
            description: "Desarrollamos, probamos y desplegamos tus soluciones de IA mientras tú te enfocas en vender.",
            details: [
                "Desarrollo ágil y pruebas rigurosas",
                "Integración con sistemas existentes",
                "Capacitación y soporte post-lanzamiento"
            ]
        }
    ];

    return (
        <section className="py-24 bg-slate-900/30 border-y border-slate-800 text-white relative overflow-hidden">
            {/* Minimal Background */}


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Tu Camino hacia la Escalabilidad
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        No vendemos "paquetes". Construimos soluciones.
                        <br />
                        Nuestro proceso probado garantiza resultados antes de escribir una línea de código.
                    </motion.p>
                </div>

                <div className="relative mb-24">
                    {/* Connector Line (Desktop) - Subtle Slate */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -translate-y-1/2" />

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                className="group relative"
                            >
                                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 hover:border-emerald-500/50 transition-all duration-300 h-full relative z-20 shadow-xl">

                                    {/* Step ID Badge - Emerald Accent */}
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center border-4 border-slate-950 z-30 shadow-md">
                                        {step.id}
                                    </div>

                                    <div className="text-center mt-6 mb-6">
                                        <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-800">
                                            <step.icon className="w-8 h-8 stroke-[1.5]" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-slate-900">
                                        <ul className="space-y-2">
                                            {step.details.map((detail, idx) => (
                                                <li key={idx} className="text-xs text-slate-500 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-12"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">¿Listo para escalar tu negocio?</h3>
                    <p className="text-slate-400 mb-8 font-light">
                        Agenda una consultoría gratuita de 45 minutos. Sin compromisos de venta, solo estrategia pura.
                    </p>
                    <button
                        onClick={() => router.push('/contacto')}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
                    >
                        Agendar Llamada Ahora <Rocket className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
