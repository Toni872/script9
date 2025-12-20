'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

export function ProcessSteps() {
    const steps = [
        {
            id: "01",
            icon: Search,
            title: "Análisis",
            description: "Estudiamos tus procesos actuales para identificar cuellos de botella y oportunidades."
        },
        {
            id: "02",
            icon: PenTool,
            title: "Diseño",
            description: "Arquitectura de la solución a medida. Definimos herramientas y flujos de datos."
        },
        {
            id: "03",
            icon: Code,
            title: "Desarrollo",
            description: "Programación e integración de sistemas. Conectamos APIs y configuramos agentes."
        },
        {
            id: "04",
            icon: Rocket,
            title: "Optimización",
            description: "Despliegue y mejora continua. Monitoreamos el rendimiento para maximizar el ROI."
        }
    ];

    return (
        <section className="py-24 bg-[#002E5C] text-white relative overflow-hidden">
            {/* Minimal Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Cómo Trabajamos
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light"
                    >
                        Un método probado para transformar tu negocio en 4 pasos claros.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) - Subtle White */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />

                    <div className="grid md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                className="group relative"
                            >
                                <div className="bg-[#003D82] border border-white/10 rounded-xl p-8 hover:border-[#10B981]/30 transition-all duration-300 h-full relative z-20">

                                    {/* Step ID Badge - Red Accent */}
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#10B981] text-white font-bold text-sm flex items-center justify-center border-4 border-[#002E5C] z-30 shadow-md">
                                        {step.id}
                                    </div>

                                    <div className="mt-6 text-center">
                                        <div className="text-white w-10 h-10 mx-auto mb-4 group-hover:text-[#10B981] transition-colors">
                                            <step.icon className="w-full h-full stroke-[1.5]" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                                        <p className="text-blue-100/60 text-sm leading-relaxed antialiased font-light">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
