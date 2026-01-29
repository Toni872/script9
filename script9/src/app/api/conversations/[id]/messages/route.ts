import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MessageService } from '@/services/messageService';
import { z } from 'zod';

interface RouteParams {
    params: {
        id: string;
    };
}

// Esquema de validación para enviar mensaje
const sendMessageSchema = z.object({
    messageText: z.string()
        .min(1, 'El mensaje no puede estar vacío')
        .max(2000, 'El mensaje no puede exceder 2000 caracteres'),
});

// GET /api/conversations/[id]/messages - Obtener mensajes de una conversación
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { id } = params;
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const messages = await MessageService.getConversationMessages(id, session.user.id, {
            page,
            limit,
        });

        return NextResponse.json(messages);
    } catch (error: any) {
        console.error('Error en GET /api/conversations/[id]/messages:', error);

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

// POST /api/conversations/[id]/messages - Enviar mensaje
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();
        const validationResult = sendMessageSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({
                error: 'Datos inválidos',
                details: validationResult.error.issues,
            }, { status: 400 });
        }

        const { messageText } = validationResult.data;

        const message = await MessageService.sendMessage({
            conversationId: id,
            senderId: session.user.id,
            messageText,
        });

        return NextResponse.json(message, { status: 201 });
    } catch (error: any) {
        console.error('Error en POST /api/conversations/[id]/messages:', error);

        if (error.name === 'NotFoundError') {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }

        if (error.name === 'ForbiddenError') {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }

        if (error.name === 'BadRequestError') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (error.name === 'DatabaseError') {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}