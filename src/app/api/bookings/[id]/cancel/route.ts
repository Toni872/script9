import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Schema de validación para cancelación
const cancelBookingSchema = z.object({
    reason: z.string().min(10, 'La razón debe tener al menos 10 caracteres').optional(),
    refundRequested: z.boolean().optional().default(false),
});

/**
 * POST /api/bookings/[id]/cancel
 * Cancelar una reserva con lógica de negocio adicional
 * Body: { reason?, refundRequested? }
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

        // Parsear y validar el body (opcional)
        let reason: string | undefined;
        let refundRequested = false;

        try {
            const body = await request.json();
            const validationResult = cancelBookingSchema.safeParse(body);

            if (validationResult.success) {
                reason = validationResult.data.reason;
                refundRequested = validationResult.data.refundRequested || false;
            }
        } catch (e) {
            // Body opcional, continuar sin él
        }

        // Obtener la reserva actual
        const currentBooking = await BookingService.getBookingById(bookingId);

        // Verificar autorización
        const propertyData = (currentBooking as any).properties || currentBooking.property;
        const isGuest = (currentBooking as any).guest_id === userId;
        const isHost = propertyData?.host_id === userId;
        const isAdmin = userRole === 'admin';

        if (!isGuest && !isHost && !isAdmin) {
            return NextResponse.json(
                { error: 'No tienes permiso para cancelar esta reserva' },
                { status: 403 }
            );
        }

        // Verificar que la reserva no esté ya cancelada o completada
        const currentStatus = (currentBooking as any).status;
        if (currentStatus === 'cancelled') {
            return NextResponse.json(
                { error: 'La reserva ya está cancelada' },
                { status: 400 }
            );
        }
        if (currentStatus === 'completed') {
            return NextResponse.json(
                { error: 'No se puede cancelar una reserva completada' },
                { status: 400 }
            );
        }

        // Calcular si aplica reembolso según política de cancelación
        // Política: reembolso completo si se cancela con más de 24 horas de anticipación
        const startTime = new Date((currentBooking as any).start_time);
        const now = new Date();
        const hoursUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

        let refundEligible = false;
        let refundPercentage = 0;

        if (hoursUntilStart > 24) {
            refundEligible = true;
            refundPercentage = 100; // Reembolso completo
        } else if (hoursUntilStart > 12) {
            refundEligible = true;
            refundPercentage = 50; // Reembolso del 50%
        } else {
            refundEligible = false;
            refundPercentage = 0; // Sin reembolso
        }

        // Determinar quién cancela
        const cancelledBy = isGuest ? 'guest' : 'host';

        // Si el anfitrión cancela, siempre hay reembolso completo
        if (cancelledBy === 'host') {
            refundEligible = true;
            refundPercentage = 100;
        }

        // Cancelar la reserva
        const cancelledBooking = await BookingService.cancelBooking(bookingId, cancelledBy);

        // TODO: Integrar con Stripe para procesar el reembolso si aplica
        // if (refundEligible && refundRequested && currentBooking.stripe_payment_id) {
        //   await StripeService.createRefund(
        //     currentBooking.stripe_payment_id,
        //     refundPercentage
        //   );
        // }

        return NextResponse.json(
            {
                message: 'Reserva cancelada exitosamente',
                booking: cancelledBooking,
                cancellation: {
                    cancelledBy,
                    reason,
                    refundEligible,
                    refundPercentage,
                    hoursUntilStart: Math.round(hoursUntilStart),
                    refundNote: refundEligible
                        ? `Reembolso del ${refundPercentage}% será procesado en 5-10 días hábiles`
                        : 'No aplica reembolso según la política de cancelación'
                }
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(`Error en POST /api/bookings/${params.id}/cancel:`, error);

        if (error.message?.includes('no encontrada') || error.statusCode === 404) {
            return NextResponse.json(
                { error: 'Reserva no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Error al cancelar la reserva' },
            { status: error.statusCode || 500 }
        );
    }
}







