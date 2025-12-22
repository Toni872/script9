"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Brain, Rocket, FileSearch } from "lucide-react";

const levels = [
    {
        level: "Nivel 1",
        title: "Auditoría & Diagnóstico",
        description: "Analizamos tus procesos actuales para identificar cuellos de botella y oportunidades ocultas de automatización.",
        icon: FileSearch,
        color: "bg-blue-500",
        lightColor: "bg-blue-100",
        textColor: "text-blue-600",
        delay: 0.2
    },
    {
        level: "Nivel 2",
        title: "Estrategia a Medida",
        description: "Diseñamos un plan de acción detallado y un presupuesto personalizado basado en el ROI proyectado.",
        icon: Brain,
        color: "bg-purple-500",
        lightColor: "bg-purple-100",
        textColor: "text-purple-600",
        delay: 0.4
    },
    {
        level: "Nivel 3",
        title: "Implementación & Despegue",
        description: "Desarrollamos, probamos y desplegamos tus soluciones de IA mientras tú te enfocas en vender.",
        icon: Rocket,
        color: "bg-emerald-500",
        lightColor: "bg-emerald-100",
        textColor: "text-emerald-600",
        delay: 0.6
    }
];

export function ProcessSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            Tu Camino hacia la <span className="text-[#003D82]">Escalabilidad</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            No vendemos "paquetes". Construimos soluciones. <br className="hidden md:block" />
                            Nuestro proceso de 3 niveles garantiza resultados antes de escribir una línea de código.
                        </p>
                    </motion.div>
                </div>

                {/* LEVELS GRID */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 -z-10" />

                    {levels.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: item.delay }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Icon Circle */}
                            <div className={`w-24 h-24 rounded-2xl ${item.lightColor} flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-100`}>
                                <item.icon className={`w-10 h-10 ${item.textColor}`} />
                                <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${item.color}`}>
                                    {item.level}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                                {item.description}
                            </p>

                            {/* Decorative Arrow (Mobile only) */}
                            {index < 2 && (
                                <div className="md:hidden mt-8 text-gray-300">
                                    <ArrowRight className="w-8 h-8 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex flex-col items-center bg-[#003D82] rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">

                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#10B981] rounded-full blur-[100px] opacity-40 animate-pulse" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-6">
                                ¿Listo para desbloquear el Nivel 1?
                            </h3>
                            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                                Agenda una consultoría gratuita de 15 minutos. Sin compromisos de venta, solo estrategia pura.
                            </p>

                            <button
                                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-[#003D82] text-lg font-bold rounded-xl hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center gap-3 mx-auto"
                            >
                                Agendar Llamada Ahora
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
