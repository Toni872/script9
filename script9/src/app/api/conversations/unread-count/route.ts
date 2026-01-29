import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MessageService } from '@/services/messageService';

// GET /api/conversations/unread-count - Obtener conteo de mensajes no leídos
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const unreadCount = await MessageService.getUnreadCount(session.user.id);

        return NextResponse.json({ count: unreadCount });
    } catch (error: any) {
        console.error('Error en GET /api/conversations/unread-count:', error);

        if (error.name === 'DatabaseError') {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
