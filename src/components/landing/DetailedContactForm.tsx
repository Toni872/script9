'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Send, Search, TrendingUp, ShieldCheck, Loader2 } from 'lucide-react';

export function DetailedContactForm() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const ContactFeature = ({ icon: Icon, title, desc }: any) => (
        <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-800 flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-slate-950 border-t border-slate-800 relative overflow-hidden" id="contacto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Context & Value */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                        >
                            Hablemos de <br />
                            <span className="text-emerald-400">Rentabilidad</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-400 mb-12 font-light leading-relaxed"
                        >
                            ¿Tienes dudas sobre qué se puede automatizar en tu empresa?
                            Agenda una auditoría gratuita y te diremos exactamente dónde estás perdiendo dinero.
                        </motion.p>

                        <div className="space-y-8">
                            <ContactFeature
                                icon={TrendingUp}
                                title="Sin costes iniciales elevados"
                                desc="Modelos de pago flexibles o basados en éxito."
                            />
                            <ContactFeature
                                icon={ShieldCheck}
                                title="Garantía de Privacidad"
                                desc="Tus datos y procesos están blindados bajo NDA."
                            />
                            <ContactFeature
                                icon={Clock}
                                title="Respuesta en 24h"
                                desc="No somos un bot (irónicamente). Te contestará un humano experto."
                            />
                        </div>

                        {/* Direct Contact Info */}
                        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-8">
                            <div>
                                <h4 className="text-white font-bold mb-2">Email Directo</h4>
                                <a href="mailto:hola@script9.ai" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    hola@script9.ai
                                </a>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">WhatsApp Business</h4>
                                <a href="https://wa.me/34600000000" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    +34 600 000 000
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Form Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

                        {isSuccess ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Recibido!</h3>
                                <p className="text-slate-400 mb-8">
                                    Gracias por contactarnos, {formState.name}. Un especialista revisará tu proyecto y te contactará pronto.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="px-6 py-2 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Nombre</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Empresa</label>
                                        <input
                                            type="text"
                                            value={formState.company}
                                            onChange={e => setFormState({ ...formState, company: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                            placeholder="Web o Nombre"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Email Profesional</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                        placeholder="nombre@empresa.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">¿Qué desafío quieres resolver?</label>
                                    <textarea
                                        rows={4}
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none"
                                        placeholder="Ej: Paso 4 horas al día respondiendo emails repetitivos..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-lg shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
                                        </span>
                                    ) : (
                                        <>Solicitar Auditoría Gratuita <Send className="w-5 h-5" /></>
                                    )}
                                </button>

                                <p className="text-center text-xs text-slate-500">
                                    Sin spam. Solo soluciones. Respuesta garantizada en 24h.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
