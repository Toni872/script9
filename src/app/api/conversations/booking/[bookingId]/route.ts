import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MessageService } from '@/services/messageService';

// GET /api/conversations/booking/[bookingId] - Obtener conversación por booking ID
export async function GET(
    request: NextRequest,
    { params }: { params: { bookingId: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        const conversation = await MessageService.getConversationByBookingId(
            params.bookingId,
            session.user.id
        );

        if (!conversation) {
            return NextResponse.json(
                { error: 'No existe conversación para esta reserva' },
                { status: 404 }
            );
        }

        return NextResponse.json(conversation);
    } catch (error: any) {
        console.error('Error al obtener conversación:', error);
        return NextResponse.json(
            { error: error.message || 'Error al obtener conversación' },
            { status: error.statusCode || 500 }
        );
    }
}


