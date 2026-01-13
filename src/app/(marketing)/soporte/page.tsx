'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, MessageSquare, Phone, Send, Loader2, Bot, Headphones } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { DeepTechHero } from '@/components/ui/DeepTechHero';

export default function SoportePage() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const router = useRouter();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSending(false);
        setSent(true);
    };

    if (sent) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-sm text-center p-8">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h2>
                    <p className="text-slate-400 mb-6">
                        Hemos recibido tu consulta. Nuestro equipo de soporte te responderá en menos de 24 horas.
                    </p>
                    <Button onClick={() => setSent(false)} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        Enviar otro mensaje
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            <DeepTechHero
                title="Centro de Soporte"
                subtitle="¿Cómo podemos ayudarte hoy?"
                size="sm"
            />

            <div className="container-script9 max-w-4xl mx-auto px-4 relative z-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-900/50 border-b border-slate-800 pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg text-white">
                                    <MessageSquare className="w-5 h-5 text-emerald-400" /> Asistencia Técnica
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-800">
                                    {/* Human Agent Option */}
                                    <div className="p-4 hover:bg-slate-800/50 transition-colors group cursor-pointer" onClick={() => window.open('https://wa.me/34687723287', '_blank')}>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                                                <Headphones className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-white">Ingeniero de Automatización</h3>
                                                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                                                        09:00 - 18:00
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-3">
                                                    Validación técnica detallada y consultoría para proyectos a medida.
                                                </p>
                                                <Button size="sm" className="w-full bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 border border-transparent">
                                                    Hablar por WhatsApp
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Mail className="w-5 h-5 text-emerald-400" /> Email
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400 mb-4">Para consultas generales o documentos.</p>
                                <a href="mailto:contact@script-9.com" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">contact@script-9.com</a>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Envíanos un mensaje</CardTitle>
                            <CardDescription className="text-slate-400">Te responderemos por correo electrónico.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Asunto</label>
                                    <Input placeholder="Ej: Problema con mi pedido..." required className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Mensaje</label>
                                    <Textarea placeholder="Cuéntanos más detalles..." rows={5} required className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20" />
                                </div>
                                <Button type="submit" className="w-full bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20" disabled={sending}>
                                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar Mensaje'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
