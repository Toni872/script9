import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MessageService } from '@/services/messageService';
import { z } from 'zod';

// Esquema de validación para crear conversación
const createConversationSchema = z.object({
    bookingId: z.string().uuid('ID de reserva inválido'),
    guestId: z.string().uuid('ID de huésped inválido'),
    hostId: z.string().uuid('ID de anfitrión inválido'),
    propertyId: z.string().uuid('ID de propiedad inválido'),
});

// GET /api/conversations - Obtener conversaciones del usuario
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const conversations = await MessageService.getUserConversations(session.user.id, {
            page,
            limit,
        });

        return NextResponse.json(conversations);
    } catch (error: unknown) {
        console.error('Error en GET /api/conversations:', error);

        if (error instanceof Error && error.name === 'DatabaseError') {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

// POST /api/conversations - Crear nueva conversación
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const body = await request.json();
        const validationResult = createConversationSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({
                error: 'Datos inválidos',
                details: validationResult.error.issues,
            }, { status: 400 });
        }

        const { bookingId, guestId, hostId, propertyId } = validationResult.data;

        // Verificar que el usuario es parte de la conversación
        if (session.user.id !== guestId && session.user.id !== hostId) {
            return NextResponse.json({ error: 'No tienes permiso para crear esta conversación' }, { status: 403 });
        }

        const conversation = await MessageService.createOrGetConversation({
            bookingId,
            guestId,
            hostId,
            propertyId,
        });

        return NextResponse.json(conversation, { status: 201 });
    } catch (error: unknown) {
        console.error('Error en POST /api/conversations:', error);

        if (error instanceof Error) {
            if (error.name === 'NotFoundError') {
                return NextResponse.json({ error: error.message }, { status: 404 });
            }

            if (error.name === 'BadRequestError') {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            if (error.name === 'DatabaseError') {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
