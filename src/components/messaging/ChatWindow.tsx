'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Conversation, Message } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Send, Loader2, ArrowLeft, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWindowProps {
    conversation: Conversation | null;
    onBack: () => void;
}

export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadMessages = useCallback(async () => {
        if (!conversation) return;

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/conversations/${conversation.id}/messages`);

            if (!response.ok) {
                throw new Error('Error al cargar mensajes');
            }

            const data = await response.json();
            setMessages(data.data || []);
        } catch (err: unknown) {
            console.error('Error cargando mensajes:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }, [conversation]);

    const markAsRead = useCallback(async () => {
        if (!conversation) return;

        try {
            await fetch(`/api/conversations/${conversation.id}/read`, {
                method: 'POST',
            });
        } catch (err) {
            console.error('Error marcando como leído:', err);
        }
    }, [conversation]);

    useEffect(() => {
        if (conversation) {
            loadMessages();
            markAsRead();
        }
    }, [conversation, loadMessages, markAsRead]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!conversation || !newMessage.trim() || sending) return;

        try {
            setSending(true);
            setError(null);

            const response = await fetch(`/api/conversations/${conversation.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messageText: newMessage.trim(),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al enviar mensaje');
            }

            const data = await response.json();
            setMessages(prev => [...prev, data]);
            setNewMessage('');
        } catch (err: unknown) {
            console.error('Error enviando mensaje:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const getOtherUser = () => {
        if (!conversation) return null;
        return conversation.guest_id === session?.user?.id
            ? conversation.host
            : conversation.guest;
    };

    const isMyMessage = (message: Message) => {
        return message.sender_id === session?.user?.id;
    };

    if (!conversation) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Selecciona una conversación
                </h3>
                <p className="text-gray-500 text-sm">
                    Elige una conversación para comenzar a chatear
                </p>
            </div>
        );
    }

    const otherUser = getOtherUser();

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                    aria-label="Volver a la lista de conversaciones"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-semibold">
                    {otherUser?.name?.charAt(0).toUpperCase() || '?'}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">
                        {otherUser?.name || 'Usuario'}
                    </h3>
                    <p className="text-sm text-slate-400 truncate">
                        {conversation.property?.title || 'Propiedad'}
                    </p>
                </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <p className="text-emerald-500 font-medium">{error}</p>
                        <button
                            onClick={loadMessages}
                            className="mt-2 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <MessageCircle className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-500">No hay mensajes aún</p>
                        <p className="text-gray-400 text-sm">Envía el primer mensaje</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isMyMessage(message) ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`
                    max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                    ${isMyMessage(message)
                                            ? 'bg-[#10B981] text-white'
                                            : 'bg-slate-800 text-slate-200'
                                        }
                  `}
                                >
                                    <p className="text-sm">{message.message_text}</p>
                                    <p className={`text-xs mt-1 ${isMyMessage(message) ? 'text-white/70' : 'text-gray-500'
                                        }`}>
                                        {formatDistanceToNow(new Date(message.created_at), {
                                            addSuffix: true,
                                            locale: es,
                                        })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex gap-2">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 resize-none border border-slate-700 bg-slate-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#10B981] focus:border-transparent placeholder:text-slate-500"
                        rows={1}
                        disabled={sending}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || sending}
                        className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {sending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
