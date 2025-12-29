'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, MessageSquare, Phone, Send, Loader2, Bot, Headphones } from 'lucide-react';
import { AIChatWidget } from '@/components/support/AIChatWidget';

export default function SoportePage() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const [isChatOpen, setIsChatOpen] = useState(false);

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
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-gray-200 shadow-sm text-center p-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#333333] mb-2">¡Mensaje Enviado!</h2>
                    <p className="text-gray-500 mb-6">
                        Hemos recibido tu consulta. Nuestro equipo de soporte te responderá en menos de 24 horas.
                    </p>
                    <Button onClick={() => setSent(false)} variant="outline">Enviar otro mensaje</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12">
            <div className="container-script9 max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Centro de Soporte</h1>
                    <p className="text-slate-400 text-lg">¿Cómo podemos ayudarte hoy?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-slate-800 bg-slate-900 shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-900 border-b border-slate-800 pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg text-white">
                                    <MessageSquare className="w-5 h-5 text-emerald-400" /> Asistencia Inmediata
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-800">
                                    {/* AI Agent Option */}
                                    <div className="p-4 hover:bg-slate-800/50 transition-colors group cursor-pointer" onClick={() => setIsChatOpen(true)}>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-white">S9-Bot (IA)</h3>
                                                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                        Online 24/7
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-3">
                                                    Respuestas instantáneas sobre documentación, precios y capacidades técnicas.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsChatOpen(true);
                                                    }}
                                                >
                                                    Chat con IA
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Human Agent Option */}
                                    <div className="p-4 hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                                                <Headphones className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-white">Ingeniero de Automatización</h3>
                                                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                                                        09:00 - 18:00
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-3">
                                                    Validación técnica detallada y consultoría para proyectos a medida.
                                                </p>
                                                <Button size="sm" className="w-full bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">
                                                    Hablar con Experto
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-800 bg-slate-900 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Mail className="w-5 h-5 text-emerald-400" /> Email
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400 mb-4">Para consultas generales o documentos.</p>
                                <a href="mailto:soporte@script9.com" className="text-emerald-400 font-medium hover:underline">soporte@script9.com</a>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="border-slate-800 bg-slate-900 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Envíanos un mensaje</CardTitle>
                            <CardDescription className="text-slate-400">Te responderemos por correo electrónico.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Asunto</label>
                                    <Input placeholder="Ej: Problema con mi pedido..." required className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Mensaje</label>
                                    <Textarea placeholder="Cuéntanos más detalles..." rows={5} required className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" />
                                </div>
                                <Button type="submit" className="w-full bg-emerald-600 text-white hover:bg-emerald-500" disabled={sending}>
                                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar Mensaje'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* The Global AI Chat Widget is now mounted in layout.tsx */}
        </div>
    );
}
