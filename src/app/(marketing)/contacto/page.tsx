'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2, Building2, Sparkles, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookingCalendar from '@/components/BookingCalendar';
import { DeepTechHero } from '@/components/ui/DeepTechHero';

export default function Contacto() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<'message' | 'calendar'>(
        searchParams.get('tab') === 'calendar' ? 'calendar' : 'message'
    );
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        // Pre-fill subject if provided in URL (e.g. from "Request Audit" button)
        asunto: searchParams.get('subject') || '',
        mensaje: '', // Could also pre-fill message if needed
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/support/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.nombre,
                    email: formData.email,
                    subject: formData.asunto || `Contacto de ${formData.empresa || 'Web'}`,
                    message: formData.mensaje,
                    type: 'contact',
                    company: formData.empresa, // NEW: Field for AI SDR
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSuccess(true);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                empresa: '',
                asunto: '',
                mensaje: '',
            });

            setTimeout(() => setSuccess(false), 5000);
        } catch {
            setError('Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Section */}
            <DeepTechHero
                badge={
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950/50 backdrop-blur-md rounded-full border border-emerald-500/20">
                        <Sparkles className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-100">Soporte Premium 24/7</span>
                    </div>
                }
                title={<>Hablemos de <span className="text-emerald-400">Futuro</span></>}
                subtitle="Cuéntanos qué desafío enfrenta tu negocio y diseñaremos la solución automatizada perfecta para ti."
            />

            <section className="-mt-10 pb-20 px-5 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Información de Contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-slate-950 rounded-2xl p-8 shadow-xl border border-slate-800">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Canales Directos
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                        <FaLinkedin className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">LinkedIn</h3>
                                        <a href="https://www.linkedin.com/in/antonio-lloret-sánchez-080166156" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                            Conectar ahora
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                        <Phone className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Teléfono</h3>
                                        <a href="tel:+34687723287" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                            +34 687 723 287
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                        <Mail className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Email</h3>
                                        <a href="mailto:contact@script-9.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                            contact@script-9.com
                                        </a>
                                    </div>
                                </div>


                            </div>
                        </div>


                        {/* Trust Indicators (Imported from Landing) */}
                        <div className="space-y-6 pt-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-800 flex-shrink-0">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Sin costes iniciales</h3>
                                    <p className="text-slate-400 font-light text-sm leading-relaxed">Modelos de pago flexibles o basados en éxito.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-800 flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Garantía de Privacidad</h3>
                                    <p className="text-slate-400 font-light text-sm leading-relaxed">Tus datos y procesos están blindados bajo NDA.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-800 flex-shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Respuesta en 24h</h3>
                                    <p className="text-slate-400 font-light text-sm leading-relaxed">No somos un bot (irónicamente). Te contestará un humano experto.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden border border-emerald-500/20">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">
                                    ¿Empresa Enterprise?
                                </h3>
                                <p className="text-white/90 mb-6 font-medium">
                                    Ofrecemos consultoría estratégica y desarrollo a medida para grandes corporaciones.
                                </p>
                                <button
                                    onClick={() => {
                                        setActiveTab('message');
                                        setFormData(prev => ({
                                            ...prev,
                                            asunto: 'consultoria',
                                            empresa: 'Corporación '
                                        }));
                                        // Small delay to allow tab switch if needed, then scroll
                                        setTimeout(() => {
                                            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className="inline-block px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-sm cursor-pointer"
                                >
                                    Consultar Servicios
                                </button>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                                <Building2 className="w-40 h-40" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        {/* Tabs Switcher */}
                        <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 mb-6 shadow-sm">
                            <button
                                onClick={() => setActiveTab('message')}
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === 'message'
                                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                Enviar Mensaje
                            </button>
                            <button
                                onClick={() => setActiveTab('calendar')}
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === 'calendar'
                                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                Agendar Reunión
                            </button>
                        </div>

                        {activeTab === 'calendar' ? (
                            <div className="h-[700px]">
                                <BookingCalendar />
                            </div>
                        ) : (
                            <div className="bg-slate-950 rounded-2xl p-8 shadow-xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Inicia tu Transformación
                                </h2>

                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                        <p className="text-emerald-200 font-medium">
                                            ¡Mensaje recibido! Un consultor experto te contactará en breve.
                                        </p>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                                    >
                                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                        <p className="text-red-200">{error}</p>
                                    </motion.div>
                                )}

                                <form id="contact-form-section" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-white font-semibold mb-2" htmlFor="nombre">
                                                Nombre completo *
                                            </label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="Tu nombre"
                                                required
                                                className="h-12 bg-slate-950 border-slate-800 text-white focus:bg-slate-900 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-white font-semibold mb-2" htmlFor="email">
                                                Email *
                                            </label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="tu@email.com"
                                                required
                                                className="h-12 bg-slate-950 border-slate-800 text-white focus:bg-slate-900 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-white font-semibold mb-2" htmlFor="empresa">
                                                Empresa (opcional)
                                            </label>
                                            <Input
                                                type="text"
                                                id="empresa"
                                                name="empresa"
                                                value={formData.empresa}
                                                onChange={handleChange}
                                                placeholder="Nombre de tu organización"
                                                className="h-12 bg-slate-950 border-slate-800 text-white focus:bg-slate-900 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-white font-semibold mb-2" htmlFor="asunto">
                                                Tipo de Solución *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-slate-900 transition-all appearance-none cursor-pointer"
                                                    id="asunto"
                                                    name="asunto"
                                                    value={formData.asunto}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" className="bg-slate-900 text-slate-500">Selecciona un área de interés</option>
                                                    <option value="automatizacion" className="bg-slate-900">Automatización de Procesos</option>
                                                    <option value="ia" className="bg-slate-900">Integración de IA / LLMs</option>
                                                    <option value="workflow" className="bg-slate-900">Workflows & CRM</option>
                                                    <option value="script" className="bg-slate-900">Desarrollo de Scripts</option>
                                                    <option value="api" className="bg-slate-900">Integración de APIs</option>
                                                    <option value="consultoria" className="bg-slate-900">Consultoría Estratégica</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2" htmlFor="mensaje">
                                            Detalles del Proyecto *
                                        </label>
                                        <textarea
                                            className="w-full min-h-[150px] p-4 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-slate-900 transition-all resize-y placeholder:text-slate-600"
                                            id="mensaje"
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                            placeholder="Describe tus objetivos, stack tecnológico actual y qué esperas lograr..."
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-14 bg-emerald-600 text-white text-lg font-bold rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />
                                                Enviar Solicitud
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section >
        </div >
    );
}
