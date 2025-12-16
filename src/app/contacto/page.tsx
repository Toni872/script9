'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Building2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        asunto: '',
        mensaje: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulación de envío
            await new Promise(resolve => setTimeout(resolve, 1500));

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
        } catch (err) {
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
        <div className="min-h-screen bg-[#F5F5F5]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-[#003D82]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#003D82] to-[#002E5C]" />
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-125 brightness-100" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                            <Sparkles className="h-4 w-4 text-[#EF4444]" />
                            <span className="text-sm font-semibold text-white">Soporte Premium 24/7</span>
                        </div>
                        <h1 className="text-[56px] md:text-[72px] font-bold mb-6 text-white tracking-tight">
                            Hablemos de <span className="text-[#EF4444]">Futuro</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                            Cuéntanos qué desafío enfrenta tu negocio y diseñaremos la solución automatizada perfecta para ti.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="-mt-10 pb-20 px-5 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Información de Contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-[#333333] mb-6">
                                Canales Directos
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#003D82]/5 rounded-xl group-hover:bg-[#003D82]/10 transition-colors">
                                        <Mail className="h-6 w-6 text-[#003D82]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#333333] mb-1">Email</h3>
                                        <a href="mailto:hola@script9.com" className="text-gray-600 hover:text-[#EF4444] transition-colors">
                                            hola@script9.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#003D82]/5 rounded-xl group-hover:bg-[#003D82]/10 transition-colors">
                                        <Phone className="h-6 w-6 text-[#003D82]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#333333] mb-1">Teléfono</h3>
                                        <a href="tel:+34900000000" className="text-gray-600 hover:text-[#EF4444] transition-colors">
                                            +34 900 000 000
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#003D82]/5 rounded-xl group-hover:bg-[#003D82]/10 transition-colors">
                                        <MapPin className="h-6 w-6 text-[#003D82]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#333333] mb-1">Oficinas</h3>
                                        <p className="text-gray-600">
                                            Madrid Tech Hub, España
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">
                                    ¿Empresa Enterprise?
                                </h3>
                                <p className="text-white/90 mb-6 font-medium">
                                    Ofrecemos consultoría estratégica y desarrollo a medida para grandes corporaciones.
                                </p>
                                <a
                                    href="/como-funciona"
                                    className="inline-block px-6 py-3 bg-white text-[#EF4444] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Consultar Servicios
                                </a>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                                <Building2 className="w-40 h-40" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Formulario de Contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-[#333333] mb-6">
                                Inicia tu Transformación
                            </h2>

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <p className="text-green-800 font-medium">
                                        ¡Mensaje recibido! Un consultor experto te contactará en breve.
                                    </p>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                                >
                                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                    <p className="text-red-800">{error}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[#333333] font-semibold mb-2" htmlFor="nombre">
                                            Nombre completo *
                                        </label>
                                        <Input
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Tu nombre"
                                            required
                                            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#333333] font-semibold mb-2" htmlFor="email">
                                            Email Corporativo *
                                        </label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="tu@empresa.com"
                                            required
                                            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[#333333] font-semibold mb-2" htmlFor="empresa">
                                            Empresa (opcional)
                                        </label>
                                        <Input
                                            type="text"
                                            id="empresa"
                                            name="empresa"
                                            value={formData.empresa}
                                            onChange={handleChange}
                                            placeholder="Nombre de tu organización"
                                            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#333333] font-semibold mb-2" htmlFor="asunto">
                                            Tipo de Solución *
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003D82] focus:bg-white transition-all appearance-none cursor-pointer"
                                                id="asunto"
                                                name="asunto"
                                                value={formData.asunto}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Selecciona un área de interés</option>
                                                <option value="automatizacion">Automatización de Procesos</option>
                                                <option value="ia">Integración de IA / LLMs</option>
                                                <option value="workflow">Workflows & CRM</option>
                                                <option value="script">Desarrollo de Scripts</option>
                                                <option value="api">Integración de APIs</option>
                                                <option value="consultoria">Consultoría Estratégica</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[#333333] font-semibold mb-2" htmlFor="mensaje">
                                        Detalles del Proyecto *
                                    </label>
                                    <textarea
                                        className="w-full min-h-[150px] p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003D82] focus:bg-white transition-all resize-y"
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
                                    className="w-full h-14 bg-[#003D82] text-white text-lg font-bold rounded-xl hover:bg-[#002E5C] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
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
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
