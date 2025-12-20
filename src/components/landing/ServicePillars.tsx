'use client';

import { motion } from 'framer-motion';
import { Bot, Workflow, LineChart, ChevronRight } from 'lucide-react';

export function ServicePillars() {
    const pillars = [
        {
            icon: Bot,
            title: "IA Conversacional",
            description: "Chatbots y asistentes virtuales 24/7 que gestionan clientes, agendan citas y cierran ventas automáticamente.",
            delay: 0
        },
        {
            icon: Workflow,
            title: "RPA y Automatización",
            description: "Robotic Process Automation para eliminar tareas repetitivas. Conectamos tus apps (CRM, Email, Sheets) en flujos autónomos.",
            delay: 0.2
        },
        {
            icon: LineChart,
            title: "Análisis Predictivo",
            description: "Transformamos datos en decisiones. Dashboards inteligentes que anticipan tendencias y optimizan tu inventario o recursos.",
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 bg-[#003D82] relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Nuestros Pilares Tecnológicos
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light"
                    >
                        Dominamos las tres áreas clave para la transformación digital de tu negocio.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: pillar.delay, duration: 0.5 }}
                            className="group relative bg-[#002E5C]/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#10B981]/30 hover:bg-[#002E5C] transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:text-[#10B981] group-hover:border-[#10B981]/20 transition-all duration-300 relative z-10">
                                <pillar.icon className="w-8 h-8 stroke-[1.5]" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-50 transition-colors relative z-10">
                                {pillar.title}
                            </h3>

                            <p className="text-blue-100/70 leading-relaxed mb-6 relative z-10 font-light min-h-[80px]">
                                {pillar.description}
                            </p>

                            <div className="flex items-center text-[#10B981] font-semibold text-sm opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 relative z-10">
                                Saber más <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
