'use client';

import { motion } from 'framer-motion';
import { Bot, User, CheckCircle2, MessageSquare } from 'lucide-react';

export function AgentHeroVisual() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full" />

            {/* Main Chat Interface Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[400px] mx-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-900 rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-white text-sm">Agente Comercial AI</div>
                        <div className="text-xs text-emerald-400">En línea ahora</div>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="p-6 space-y-6 min-h-[320px] bg-slate-950/50 relative">

                    {/* Message 1: User */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
                            Hola, ¿cuánto cuesta desarrollar una automatización personalizada?
                        </div>
                    </motion.div>

                    {/* Message 2: AI (Typing -> Response) */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.5 }}
                        className="flex flex-col gap-1 items-end"
                    >
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <Bot className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-sm">
                                <p>Hola! Depende del alcance 🚀</p>
                                <p className="mt-2">Para darte un presupuesto exacto, necesito hacerte 2 preguntas rápidas. ¿Te parece bien?</p>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 pr-12">Leído justo ahora</span>
                    </motion.div>

                    {/* Message 3: User */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 4.5 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
                            Claro, adelante.
                        </div>
                    </motion.div>

                    {/* Message 4: AI Qualification */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 6 }} // Long delay to simulate reading
                        className="flex gap-3 flex-row-reverse w-full"
                    >
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl w-[85%] mr-11">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                                <MessageSquare className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-bold text-slate-300">MODO CUALIFICACIÓN</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-500">✓</div>
                                    Interés Confirmado
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-500">✓</div>
                                    Presupuesto: Analizando...
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </motion.div>

            {/* Floating Elements */}
            <motion.div
                className="absolute -right-10 top-20 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-xl flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 7 }}
            >
                <div className="bg-green-500/20 p-2 rounded-md">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                    <div className="text-xs text-slate-400 uppercase font-bold">Lead Cualificado</div>
                    <div className="text-sm font-bold text-white">+1 Venta Potencial</div>
                </div>
            </motion.div>

        </div>
    );
}
