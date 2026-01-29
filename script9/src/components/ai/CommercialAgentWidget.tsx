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

    // Premium Script9 Theme Application (Tech & Sleek)
    return (
        <>
            {/* 🗓️ CALENDAR MODAL OVERLAY */}
            <AnimatePresence>
                {showCalendar && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-5xl h-[90vh] relative bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setShowCalendar(false)}
                                className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-lg border border-slate-700 hover:bg-slate-800 z-50 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <BookingCalendar />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
                {/* Chat Window */}
                {isOpen && (
                    <div className="mb-6 w-[360px] sm:w-[420px] h-[650px] max-h-[80vh] bg-[#020617]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-300 ring-1 ring-white/5">

                        {/* Header with Tech Glow */}
                        <div className="relative bg-slate-950/80 p-5 flex justify-between items-center border-b border-white/5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
                                    <div className="p-2.5 bg-[#0a0f1e] rounded-full relative ring-1 ring-white/10">
                                        <Bot className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    {/* Connection Dot */}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#020617] rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white tracking-wide">Script9 Core</h3>
                                    <span className="text-[10px] text-emerald-400/80 flex items-center gap-1.5 font-mono uppercase tracking-widest">
                                        <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                        System Online
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all relative z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area - Grid Background */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent bg-[url('/images/grid.svg')] bg-opacity-5">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm break-words ${msg.role === 'user'
                                            ? 'bg-emerald-600/20 text-emerald-50 rounded-2xl rounded-tr-sm border border-emerald-500/30'
                                            : 'bg-slate-900/80 text-slate-200 rounded-2xl rounded-tl-sm border border-slate-700/50'
                                            }`}
                                    >
                                        <StyledText text={msg.content} />
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-sm border border-slate-700/50 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (Tech Chips) */}
                        {!isLoading && messages.length > 0 && (
                            <div className="px-5 py-3 overflow-x-auto flex gap-2 scrollbar-none mask-linear-fade border-t border-white/5 bg-slate-950/50">
                                {QUICK_ACTIONS.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => sendMessage(action.value)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-[#0f172a] border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-400 text-[11px] font-medium rounded-md transition-all duration-200 active:scale-95"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-slate-950/80 border-t border-white/5 backdrop-blur-md relative">
                            <div className="relative flex items-center group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Iniciar protocolo..."
                                    className="w-full bg-[#020617] border border-slate-800 text-slate-200 rounded-xl py-4 pl-5 pr-14 text-sm focus:ring-1 focus:ring-emerald-500/40 focus:border-emerald-500/40 outline-none transition-all placeholder:text-slate-600 shadow-inner"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-2 p-2.5 bg-emerald-600/10 text-emerald-500 rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] disabled:opacity-30 disabled:hover:shadow-none transition-all transform active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Toggle Button (Floating Core) */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group relative flex items-center justify-center p-4 bg-[#020617] border border-slate-800 text-white rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 z-50 hover:border-emerald-500/40"
                    >
                        <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                        <div className="absolute -top-1.5 -right-1.5">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                        </div>
                        <Bot className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    </button>
                )}
            </div>
        </>
    );
}

