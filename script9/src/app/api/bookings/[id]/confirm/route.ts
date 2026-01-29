import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * POST /api/bookings/[id]/confirm
 * Confirmar una reserva (solo puede hacerlo el anfitrión o admin)
 */
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        const bookingId = params.id;
        const userId = session.user.id;
        const userRole = session.user.role;

        // Obtener la reserva actual
        const currentBooking = await BookingService.getBookingById(bookingId);

        // Verificar que el usuario sea el anfitrión de la propiedad o admin
        const propertyData = (currentBooking as any).properties || currentBooking.property;
        const isHost = propertyData?.host_id === userId;
        const isAdmin = userRole === 'admin';

        if (!isHost && !isAdmin) {
            return NextResponse.json(
                { error: 'Solo el anfitrión puede confirmar esta reserva' },
                { status: 403 }
            );
        }

        // Verificar que la reserva esté en estado 'pending'
        const currentStatus = (currentBooking as any).status;
        if (currentStatus !== 'pending') {
            return NextResponse.json(
                {
                    error: `No se puede confirmar una reserva en estado '${currentStatus}'`,
                    currentStatus
                },
                { status: 400 }
            );
        }

        // Confirmar la reserva
        const confirmedBooking = await BookingService.confirmBooking(bookingId);

        return NextResponse.json(
            {
                message: 'Reserva confirmada exitosamente',
                booking: confirmedBooking
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(`Error en POST /api/bookings/${params.id}/confirm:`, error);

        if (error.message?.includes('no encontrada') || error.statusCode === 404) {
            return NextResponse.json(
                { error: 'Reserva no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Error al confirmar la reserva' },
            { status: error.statusCode || 500 }
        );
    }
}







