"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Bot } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default function CommercialAgentWidget() {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = { role: 'user', content: inputValue };
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
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, tuve un problema de conexión. Inténtalo de nuevo.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="bg-black text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-zinc-800 rounded-full">
                                <Bot className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Script9 Assistant</h3>
                                <span className="text-xs text-zinc-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    En línea
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-zinc-800 p-1 rounded-full transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-black text-white rounded-tr-none'
                                        : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-tl-none shadow-sm'
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Pregunta sobre automatizaciones..."
                                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className="absolute right-2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-[10px] text-center mt-2 text-zinc-400">
                            Tecnología Script9 AI Core
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative flex items-center justify-center p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50"
                >
                    <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-20 group-hover:animate-ping"></div>
                    <MessageSquare className="w-6 h-6" />
                    {messages.length === 1 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">1</span>
                    )}
                </button>
            )}
        </div>
    );
}
