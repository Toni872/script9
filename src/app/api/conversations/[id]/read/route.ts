import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MessageService } from '@/services/messageService';

interface RouteParams {
    params: {
        id: string;
    };
}

// POST /api/conversations/[id]/read - Marcar mensajes como leídos
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { id } = params;
        const markedCount = await MessageService.markMessagesAsRead(id, session.user.id);

        return NextResponse.json({
            success: true,
            markedCount,
            message: `${markedCount} mensajes marcados como leídos`
        });
    } catch (error: any) {
        console.error('Error en POST /api/conversations/[id]/read:', error);

        if (error.name === 'NotFoundError') {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }

        if (error.name === 'ForbiddenError') {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }

        if (error.name === 'DatabaseError') {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}