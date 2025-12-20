'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Conversation } from '@/types';
import ConversationList from '@/components/messaging/ConversationList';
import ChatWindow from '@/components/messaging/ChatWindow';
import { MessageCircle, Loader2 } from 'lucide-react';

export default function MessagesPage() {
    const { data: session, status } = useSession();
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            loadUnreadCount();
        }
    }, [status]);

    const loadUnreadCount = async () => {
        try {
            const response = await fetch('/api/conversations/unread-count');
            if (response.ok) {
                const data = await response.json();
                setUnreadCount(data.count || 0);
            }
        } catch (error) {
            console.error('Error cargando conteo de no leídos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        // Actualizar conteo de no leídos
        if (unreadCount > 0) {
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const handleBack = () => {
        setSelectedConversation(null);
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Inicia sesión para ver tus proyectos
                    </h2>
                    <p className="text-gray-500">
                        Necesitas estar registrado para acceder a las conversaciones
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <MessageCircle className="w-8 h-8 text-[#10B981]" />
                        Mensajes
                        {unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-[#10B981] text-white text-sm font-bold rounded-full">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Contacta directamente con nuestros expertos sobre tus proyectos y automatizaciones
                    </p>
                </div>

                {/* Contenido principal */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex h-[600px] lg:h-[700px]">
                        {/* Lista de conversaciones - oculta en móvil cuando hay conversación seleccionada */}
                        <div className={`
              w-full lg:w-1/3 border-r border-gray-200
              ${selectedConversation ? 'hidden lg:block' : 'block'}
            `}>
                            <ConversationList
                                onSelectConversation={handleSelectConversation}
                                selectedConversationId={selectedConversation?.id}
                            />
                        </div>

                        {/* Ventana de chat */}
                        <div className={`
              w-full lg:w-2/3
              ${selectedConversation ? 'block' : 'hidden lg:block'}
            `}>
                            <ChatWindow
                                conversation={selectedConversation}
                                onBack={handleBack}
                            />
                        </div>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">💬 Soporte Técnico Directo</h3>
                        <p className="text-sm text-gray-600">
                            Habla directamente con los desarrolladores asignados a tus soluciones
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacidad y Seguridad</h3>
                        <p className="text-sm text-gray-600">
                            Tus datos, ideas y estrategias de negocio están totalmente protegidos
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">📱 Gestión Ágil</h3>
                        <p className="text-sm text-gray-600">
                            Supervisa el avance de tus scripts y workflows desde cualquier lugar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
