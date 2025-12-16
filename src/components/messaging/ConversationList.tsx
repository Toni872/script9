'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Conversation } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageCircle, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConversationListProps {
    onSelectConversation: (conversation: Conversation) => void;
    selectedConversationId?: string;
}

export default function ConversationList({
    onSelectConversation,
    selectedConversationId,
}: ConversationListProps) {
    const { data: session } = useSession();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/conversations');

            if (!response.ok) {
                throw new Error('Error al cargar conversaciones');
            }

            const data = await response.json();
            setConversations(data.data || []);
        } catch (err: unknown) {
            console.error('Error cargando conversaciones:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const filteredConversations = conversations.filter((conv) => {
        const otherUser = conv.guest_id === session?.user?.id ? conv.host : conv.guest;
        const propertyTitle = conv.property?.title || '';
        const searchLower = searchTerm.toLowerCase();

        return (
            otherUser?.name?.toLowerCase().includes(searchLower) ||
            propertyTitle.toLowerCase().includes(searchLower)
        );
    });

    const getUnreadCount = (conversation: Conversation) => {
        return conversation.guest_id === session?.user?.id
            ? conversation.guest_unread_count
            : conversation.host_unread_count;
    };

    const getOtherUser = (conversation: Conversation) => {
        return conversation.guest_id === session?.user?.id
            ? conversation.host
            : conversation.guest;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageCircle className="w-12 h-12 text-red-400 mb-3" />
                <p className="text-red-400 font-medium">{error}</p>
                <button
                    onClick={loadConversations}
                    className="mt-4 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7c3aed] transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (conversations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No tienes conversaciones
                </h3>
                <p className="text-gray-500 text-sm">
                    Las conversaciones aparecerán aquí cuando tengas reservas activas
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Barra de búsqueda */}
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar conversaciones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                </div>
            </div>

            {/* Lista de conversaciones */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                    {filteredConversations.map((conversation) => {
                        const otherUser = getOtherUser(conversation);
                        const unreadCount = getUnreadCount(conversation);
                        const isSelected = conversation.id === selectedConversationId;

                        return (
                            <motion.div
                                key={conversation.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onClick={() => onSelectConversation(conversation)}
                                className={`
                  p-4 border-b border-gray-200 cursor-pointer transition-all duration-200
                  ${isSelected ? 'bg-[#8B5CF6]/10 border-l-4 border-l-[#8B5CF6]' : 'hover:bg-gray-50'}
                `}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-purple-400 flex items-center justify-center text-white font-semibold text-lg">
                                        {otherUser?.name?.charAt(0).toUpperCase() || '?'}
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold text-gray-900 truncate">
                                                {otherUser?.name || 'Usuario'}
                                            </h4>
                                            {unreadCount > 0 && (
                                                <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-[#8B5CF6] text-white text-xs font-bold rounded-full">
                                                    {unreadCount > 9 ? '9+' : unreadCount}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 mb-1 truncate">
                                            {conversation.property?.title || 'Propiedad'}
                                        </p>

                                        <p className={`text-sm truncate ${unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                                            {conversation.last_message_preview || 'Sin mensajes aún'}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {formatDistanceToNow(new Date(conversation.last_message_at), {
                                                addSuffix: true,
                                                locale: es,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {filteredConversations.length === 0 && searchTerm && (
                    <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                        <Search className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-500">No se encontraron conversaciones</p>
                    </div>
                )}
            </div>
        </div>
    );
}
