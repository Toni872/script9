'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send, X, Loader2, Sparkles, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    timestamp: Date;
}

// Floating launcher button component
function FloatingLauncher({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
        >
            <Bot className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </motion.button>
    );
}

export function AIChatWidget() {
    // Internal state for visibility to make it self-contained
    const [isOpen, setIsOpen] = useState(false);

    // Initial greeting
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            text: '¡Hola! Soy S9-Bot 🤖. Estoy disponible 24/7 para ayudarte con dudas sobre nuestros servicios de automatización, precios o documentación técnica. ¿En qué puedo asistirte hoy?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const getSmartResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('precio') || lowerInput.includes('costo') || lowerInput.includes('cuanto vale')) {
            return "Nuestros servicios tienen precios fijos transparentes. Por ejemplo, una automatización básica comienza en €150, y soluciones más completas como el 'Pack Automatización Pro' están en €499/proyecto. Todo incluye soporte y garantía.";
        }
        if (lowerInput.includes('email') || lowerInput.includes('correo')) {
            return "Para Email Marketing, ofrecemos configuraciones avanzadas con n8n y plataformas como ActiveCampaign o Mailchimp. Podemos automatizar secuencias, segmentación y reportes. ¿Te interesa ver un ejemplo?";
        }
        if (lowerInput.includes('scraping') || lowerInput.includes('datos')) {
            return "El servicio de Web Scraping está diseñado para extraer datos de forma ética y estructurada. Es ideal para monitoreo de precios o generación de leads. El costo base es de €200 por script.";
        }
        if (lowerInput.includes('contacto') || lowerInput.includes('humano') || lowerInput.includes('persona')) {
            return "Si prefieres hablar con un ingeniero humano, puedes usar el botón 'Hablar con Experto' en nuestra página de soporte, o escribirnos a soporte@script9.com. Nuestro horario es de 9:00 a 18:00.";
        }
        if (lowerInput.includes('hola') || lowerInput.includes('buenos dias')) {
            return "¡Hola! ¿Cómo puedo ayudarte a automatizar tu negocio hoy?";
        }

        // Default fallback
        return "Entiendo. Para darte una respuesta precisa sobre ese tema específico, lo mejor sería analizar tu caso en detalle. ¿Te gustaría que te recomiende un servicio de nuestro catálogo o prefieres contactar con un técnico?";
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const responseText = getSmartResponse(userMsg.text);

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <FloatingLauncher onClick={() => setIsOpen(true)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-20 right-6 z-50 w-full max-w-sm shadow-2xl origin-bottom-right"
                    >
                        <Card className="border-[#003D82] border-t-4 h-[500px] flex flex-col bg-white overflow-hidden shadow-2xl rounded-2xl">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 py-3 px-4 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center relative shadow-sm">
                                        <Bot className="w-5 h-5 text-indigo-600" />
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold text-gray-800 flex items-center gap-2">
                                            S9-Bot
                                        </CardTitle>
                                        <p className="text-[10px] text-green-600 font-medium tracking-wide uppercase">Online 24/7</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]" ref={scrollRef}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-[#003D82] text-white shadow-md' : 'bg-indigo-100 text-indigo-600'
                                                }`}>
                                                {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                            </div>
                                            <div
                                                className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                        ? 'bg-[#003D82] text-white rounded-tr-none shadow-md'
                                                        : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start gap-2 max-w-[80%]">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Bot className="w-3 h-3 text-indigo-600" />
                                            </div>
                                            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                                                <div className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="p-3 bg-white border-t border-gray-100">
                                <div className="flex w-full gap-2 items-center bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                                    <Input
                                        placeholder="Escribe tu consulta..."
                                        className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-sm h-9 px-3"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isTyping}
                                    />
                                    <Button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim() || isTyping}
                                        size="icon"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white w-8 h-8 rounded-full shadow-sm flex-shrink-0"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
