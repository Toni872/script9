'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Workflow, ChevronRight, Zap, Code2 } from 'lucide-react';

export function ServicePillars() {
    const pillars = [
        {
            icon: Bot,
            title: "Agentes IA",
            description: "Vendedores que nunca duermen. Atiende clientes, cualifica leads y cierra ventas 24/7 sin intervención humana.",
            delay: 0,
            href: "/servicios/agente-comercial",
            theme: {
                icon: "text-emerald-400",
                hoverIcon: "group-hover:text-emerald-300",
                hoverBorder: "hover:border-emerald-500/50",
                hoverTitle: "group-hover:text-emerald-400",
                action: "text-emerald-500"
            }
        },
        {
            icon: Zap,
            title: "Automatizaciones",
            description: "Tu negocio en piloto automático. Sistemas de email, facturación y datos que funcionan solos.",
            delay: 0.1,
            href: "/servicios/automatizaciones",
            theme: {
                icon: "text-amber-400",
                hoverIcon: "group-hover:text-amber-300",
                hoverBorder: "hover:border-amber-500/50",
                hoverTitle: "group-hover:text-amber-400",
                action: "text-amber-500"
            }
        },
        {
            icon: Workflow,
            title: "Workflows",
            description: "Conecta tus apps (Stripe, Slack, Notion). Crea super-flujos de trabajo integrados End-to-End.",
            delay: 0.2,
            href: "/servicios/workflows",
            theme: {
                icon: "text-indigo-400",
                hoverIcon: "group-hover:text-indigo-300",
                hoverBorder: "hover:border-indigo-500/50",
                hoverTitle: "group-hover:text-indigo-400",
                action: "text-indigo-500"
            }
        },
        {
            icon: Code2,
            title: "Scripts a Medida",
            description: "Ingeniería de software pura (Python / Node.js) para cuando las herramientas No-Code se quedan cortas.",
            delay: 0.3,
            href: "/servicios/scripts-a-medida",
            theme: {
                icon: "text-blue-400",
                hoverIcon: "group-hover:text-blue-300",
                hoverBorder: "hover:border-blue-500/50",
                hoverTitle: "group-hover:text-blue-400",
                action: "text-blue-500"
            }
        }
    ];

    return (
        <section className="py-24 bg-slate-900/20 border-y border-slate-800 relative overflow-hidden">
            {/* Background Ambience */}



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Nuestras Soluciones
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-light"
                    >
                        Tecnología de élite para escalar tu negocio sin aumentar personal.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar, i) => (
                        <Link href={pillar.href} key={i} className="block group h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: pillar.delay, duration: 0.5 }}
                                className={`h-full relative bg-slate-950 rounded-2xl p-6 border border-slate-800 ${pillar.theme.hoverBorder} hover:bg-slate-900 transition-all duration-300 overflow-hidden shadow-xl flex flex-col`}
                            >
                                <div className={`w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 ${pillar.theme.icon} ${pillar.theme.hoverIcon} group-hover:border-current/30 transition-all duration-300 relative z-10`}>
                                    <pillar.icon className="w-7 h-7 stroke-[1.5]" />
                                </div>

                                <h3 className={`text-xl font-bold text-white mb-3 ${pillar.theme.hoverTitle} transition-colors relative z-10`}>
                                    {pillar.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10 font-light flex-grow">
                                    {pillar.description}
                                </p>

                                <div className={`flex items-center ${pillar.theme.action} font-semibold text-xs uppercase tracking-wider opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 relative z-10 mt-auto`}>
                                    Explorar <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
