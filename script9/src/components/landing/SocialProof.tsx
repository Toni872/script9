"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const testimonials = [
    {
        text: "Tony me ahorró contratar a una persona extra. El bot de WhatsApp cualifica mejor que mi equipo anterior.",
        author: "CEO Agencia Marketing",
        role: "Madrid",
        date: "Hace 2 semanas"
    },
    {
        text: "La automatización de facturas es magia. Antes perdía 3 mañanas al mes, ahora ni entro al banco.",
        author: "Founder SaaS B2B",
        role: "Remoto",
        date: "Hace 1 mes"
    },
    {
        text: "Brutal la integración con Notion. Todo lo que cae en Stripe se me organiza solo. Ingeniería de verdad.",
        author: "Consultor Independiente",
        role: "Barcelona",
        date: "Hace 3 días"
    }
];

export function SocialProof() {
    return (
        <section className="py-24 bg-slate-950 border-t border-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Lo que dicen del trabajo "en las trincheras"</h2>
                    <p className="text-slate-500">Feedback real de gente que ya ha escalado con estos sistemas.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-full">
                                    <MessageCircle className="w-4 h-4 text-blue-400" />
                                </div>
                                <span className="text-xs text-slate-500 font-mono">{t.date}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                "{t.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {t.author[0]}
                                </div>
                                <div>
                                    <div className="text-white text-xs font-bold">{t.author}</div>
                                    <div className="text-slate-500 text-[10px] uppercase tracking-wider">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
