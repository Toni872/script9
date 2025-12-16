import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * GET /api/bookings/[id]
 * Obtener una reserva por ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const booking = await BookingService.getBookingById(params.id);
        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error getting booking:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error al obtener la reserva' },
            { status: 404 }
        );
    }
}


