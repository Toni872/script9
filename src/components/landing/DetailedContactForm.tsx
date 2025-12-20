'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, MessageSquare, Clock, Calendar, Send, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function DetailedContactForm() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        services: [] as string[]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const services = [
        'Chatbots con IA',
        'Automatización de Datos',
        'Generación de Documentos',
        'Gestión de CRM'
    ];

    const handleServiceChange = (service: string, checked: boolean) => {
        if (checked) {
            setFormState(prev => ({ ...prev, services: [...prev.services, service] }));
        } else {
            setFormState(prev => ({ ...prev, services: prev.services.filter(s => s !== service) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <section className="py-24 bg-[#003D82] relative" id="contacto">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Premium Value Prop */}
                    <div className="space-y-8 text-white">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Empieza a Automatizar Hoy</h2>
                            <p className="text-xl text-blue-100 leading-relaxed font-light">
                                Completa el formulario y te responderemos en menos de 24 horas. Sin compromiso.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Search, text: "Análisis gratuito de tu situación actual" },
                                { icon: CheckCircle2, text: "Propuesta personalizada sin compromiso" },
                                { icon: Clock, text: "Respuesta en menos de 24 horas" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-[#10B981] transition-colors duration-300">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-blue-50 text-lg group-hover:translate-x-2 transition-transform duration-300">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#002E5C]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                            <h3 className="text-xl font-bold mb-2">¿Prefieres hablar directamente?</h3>
                            <p className="text-blue-200/80 mb-6">Agenda una videollamada de 15 min con un experto.</p>
                            <Button
                                variant="secondary"
                                className="w-full bg-white text-[#003D82] hover:bg-blue-50 font-bold h-12 shadow-lg hover:shadow-xl transition-all"
                                onClick={() => window.open('https://calendly.com', '_blank')}
                            >
                                <Calendar className="w-5 h-5 mr-2" /> Agendar Videollamada
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Reformatted Form */}
                    <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-[#10B981] to-[#34D399] w-full" />
                        <CardContent className="p-8 md:p-10">
                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Recibido!</h3>
                                    <p className="text-gray-600 mb-8">
                                        Gracias por contactarnos, {formState.name}. Un especialista revisará tu proyecto y te contactará pronto.
                                    </p>
                                    <Button onClick={() => setIsSuccess(false)} variant="outline">Enviar otro mensaje</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Reserva directamente</h3>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nombre <span className="text-emerald-500">*</span></Label>
                                            <Input
                                                id="name"
                                                placeholder="Tu nombre"
                                                required
                                                value={formState.name}
                                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                                                className="bg-gray-50 border-gray-200 h-12 focus:bg-white focus:ring-2 focus:ring-[#003D82]/20 transition-all"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email <span className="text-emerald-500">*</span></Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="tu@email.com"
                                                    required
                                                    value={formState.email}
                                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                                    className="bg-gray-50 border-gray-200 h-12 focus:bg-white focus:ring-2 focus:ring-[#003D82]/20 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Teléfono</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+34 600 000 000"
                                                    value={formState.phone}
                                                    onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                                    className="bg-gray-50 border-gray-200 h-12 focus:bg-white focus:ring-2 focus:ring-[#003D82]/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company">Empresa</Label>
                                            <Input
                                                id="company"
                                                placeholder="Tu empresa"
                                                value={formState.company}
                                                onChange={e => setFormState({ ...formState, company: e.target.value })}
                                                className="bg-gray-50 border-gray-200 h-12 focus:bg-white focus:ring-2 focus:ring-[#003D82]/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Servicios de interés</Label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {services.map((service) => (
                                                    <div key={service} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#003D82] hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                                        <Checkbox
                                                            id={service}
                                                            onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                                                            className="data-[state=checked]:bg-[#003D82] data-[state=checked]:border-[#003D82]"
                                                        />
                                                        <label
                                                            htmlFor={service}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-600 group-hover:text-[#003D82]"
                                                        >
                                                            {service}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Mensaje</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Cuéntanos sobre tu proyecto o necesidades..."
                                                rows={4}
                                                value={formState.message}
                                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                                className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#003D82]/20 resize-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#10B981] hover:bg-[#059669] text-white h-14 text-lg font-bold shadow-lg hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'} <Send className="w-5 h-5 ml-2" />
                                    </Button>

                                    <p className="text-xs text-gray-500 text-center">
                                        Al enviar, aceptas nuestra política de privacidad.
                                    </p>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
