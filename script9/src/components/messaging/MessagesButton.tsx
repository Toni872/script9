'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function MessagesButton() {
    const { data: session, status } = useSession();
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            loadUnreadCount();
            // Actualizar cada 30 segundos
            const interval = setInterval(loadUnreadCount, 30000);
            return () => clearInterval(interval);
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

    if (status !== 'authenticated') {
        return null;
    }

    return (
        <Link
            href="/mensajes"
            className="group relative p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-all duration-200"
            title="Mensajes"
            aria-label="Mensajes"
        >
            <MessageCircle className="h-[18px] w-[18px] text-[#1d1d1f] transition-all duration-200 group-hover:text-[#10B981] group-hover:scale-105" strokeWidth={1.5} />

            {/* Badge de notificación */}
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}

            {/* Indicador de carga */}
            {loading && unreadCount === 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            )}
        </Link>
    );
}
