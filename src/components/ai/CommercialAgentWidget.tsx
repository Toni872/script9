'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Bot } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

// Basic parser for bold text (**text**) to avoid raw asterisks
const StyledText = ({ text }: { text: string }) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <span className="whitespace-pre-wrap">
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-bold text-white/90">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </span>
    );
};

export default function CommercialAgentWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hola, soy el asistente de Script9. ¿En qué puedo ayudarte a automatizar hoy?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const QUICK_ACTIONS = [
        { label: "🤖 ¿Qué hacen los Agentes?", value: "¿Qué hacen exactamente los Agentes Comerciales IA?" },
        { label: "🚀 Automatizar SDR", value: "Quiero saber más sobre el AI SDR para prospección." },
        { label: "💎 Planes a Medida", value: "Explícame cómo funcionan vuestros planes a medida (sin dar precios exactos)." },
        { label: "📅 Agendar Cita", value: "Me gustaría agendar una cita para ver una demo." },
    ];

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Build history for context (simplified)
            const payload = { messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) };

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Error connecting to agent');

            const data = await res.json();
            let aiText = data.content || '';

            // ✅ DETECT CALENDAR TRIGGER
            if (aiText.includes('<function=open_calendar>')) {
                setShowCalendar(true);
                // Remove the entire function block including content and closing tag
                // Regex explanation: [\s\S] matches ANY character including newlines.
                aiText = aiText.replace(/<function=open_calendar>[\s\S]*?<\/function>/g, '').trim();
                // Fallback: If it was just the opening tag without closing
                aiText = aiText.replace('<function=open_calendar>', '').trim();

                // If text becomes empty after stripping, provide default text
                if (!aiText) aiText = "¡Claro! Te abro el calendario ahora mismo.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, tuve un problema de conexión. Inténtalo de nuevo.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(inputValue);
    };

    // Premium Script9 Theme Application
    return (
        <>
            {/* 🗓️ CALENDAR MODAL OVERLAY */}
            <AnimatePresence>
                {showCalendar && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-4xl h-[85vh] relative"
                        >
                            <button
                                onClick={() => setShowCalendar(false)}
                                className="absolute -top-4 -right-4 bg-slate-800 text-white p-2 rounded-full border border-slate-600 hover:bg-slate-700 z-50 shadow-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <BookingCalendar />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
                {/* Chat Window */}
                {isOpen && (
                    <div className="mb-4 w-[350px] sm:w-[400px] h-[600px] bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 ring-1 ring-white/5">

                        {/* Header */}
                        <div className="bg-slate-900/50 p-4 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-40 rounded-full animate-pulse"></div>
                                    <div className="p-2 bg-slate-800 rounded-full relative z-10 border border-slate-700">
                                        <Bot className="w-5 h-5 text-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-white tracking-wide">Script9 Agent</h3>
                                    <span className="text-xs text-emerald-400/80 flex items-center gap-1.5 font-mono">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                        ONLINE • N8N CORE
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-tr-none border border-emerald-500/20'
                                            : 'bg-slate-800/60 text-slate-200 border border-white/5 rounded-tl-none'
                                            }`}
                                    >
                                        <StyledText text={msg.content} />
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800/60 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2 shadow-lg">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (Chips) */}
                        {!isLoading && messages.length > 0 && (
                            <div className="px-5 py-2 overflow-x-auto flex gap-2 scrollbar-none mask-linear-fade">
                                {QUICK_ACTIONS.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => sendMessage(action.value)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-emerald-400/90 text-xs rounded-full transition-all duration-200 active:scale-95 backdrop-blur-sm"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-slate-900/80 border-t border-white/5 backdrop-blur-md">
                            <div className="relative flex items-center group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu consulta..."
                                    className="w-full bg-slate-950/50 border border-slate-700/50 text-white rounded-xl py-4 pl-5 pr-14 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-500 group-hover:border-slate-600"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-3 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:shadow-none transition-all transform active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-[10px] text-center mt-3 text-slate-500 font-mono">
                                Powered by Script9 AI • v2.0
                            </div>
                        </form>
                    </div>
                )}

                {/* Toggle Button */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group relative flex items-center justify-center p-5 bg-slate-900 border border-slate-700 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    >
                        <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-10 group-hover:animate-ping duration-[2000ms]"></div>
                        <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                        </div>
                        <MessageSquare className="w-6 h-6 text-emerald-400" />
                    </button>
                )}
            </div>
        </>
    );
}

