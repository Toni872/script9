'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useMessageNotifications() {
    const { data: session, status } = useSession();
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            loadUnreadCount();
            // Actualizar cada 30 segundos
            const interval = setInterval(loadUnreadCount, 30000);
            return () => clearInterval(interval);
        } else {
            setUnreadCount(0);
            setLoading(false);
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

    const refreshCount = () => {
        loadUnreadCount();
    };

    return {
        unreadCount,
        loading,
        refreshCount,
        hasUnread: unreadCount > 0,
    };
}
