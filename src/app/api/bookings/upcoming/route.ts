import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * GET /api/bookings/upcoming
 * Obtener próximas reservas (confirmadas) del usuario
 * Query params: hoursAhead (default: 24)
 */
export async function GET(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const userRole = session.user.role;

        // Obtener parámetro de horas
        const searchParams = request.nextUrl.searchParams;
        const hoursAhead = searchParams.get('hoursAhead')
            ? parseInt(searchParams.get('hoursAhead')!)
            : 24;

        // Validar hoursAhead
        if (isNaN(hoursAhead) || hoursAhead < 1 || hoursAhead > 720) { // máximo 30 días
            return NextResponse.json(
                { error: 'El parámetro hoursAhead debe estar entre 1 y 720 horas' },
                { status: 400 }
            );
        }

        // Obtener todas las próximas reservas
        const allUpcomingBookings = await BookingService.getUpcomingBookings(hoursAhead);

        // Filtrar según el rol del usuario
        let userBookings: any[] = [];

        if (userRole === 'guest') {
            // Huéspedes solo ven sus propias reservas
            userBookings = allUpcomingBookings.filter(
                (booking: any) => booking.guest_id === userId
            );
        } else if (userRole === 'host') {
            // Anfitriones ven reservas de sus propiedades
            userBookings = allUpcomingBookings.filter(
                (booking: any) => {
                    const propertyData = booking.properties || booking.property;
                    return propertyData?.host_id === userId;
                }
            );
        } else if (userRole === 'admin') {
            // Admin ve todas las reservas
            userBookings = allUpcomingBookings;
        } else {
            userBookings = [];
        }

        // Calcular tiempo hasta cada reserva
        const now = new Date();
        const bookingsWithTimeInfo = userBookings.map((booking: any) => {
            const startTime = new Date(booking.check_in || booking.start_time);
            const hoursUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
            const minutesUntilStart = Math.round(hoursUntilStart * 60);

            return {
                ...booking,
                timeUntilStart: {
                    hours: Math.floor(hoursUntilStart),
                    minutes: minutesUntilStart % 60,
                    totalMinutes: minutesUntilStart,
                    humanReadable: formatTimeUntil(hoursUntilStart)
                }
            };
        });

        return NextResponse.json(
            {
                bookings: bookingsWithTimeInfo,
                count: bookingsWithTimeInfo.length,
                hoursAhead,
                timestamp: now.toISOString()
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error en GET /api/bookings/upcoming:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener próximas reservas';
        const statusCode = (error as any).statusCode || 500;
        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode }
        );
    }
}

/**
 * Formatear tiempo hasta la reserva en formato legible
 */
function formatTimeUntil(hours: number): string {
    if (hours < 1) {
        const minutes = Math.round(hours * 60);
        return `En ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (hours < 24) {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);
        if (minutes > 0) {
            return `En ${wholeHours} hora${wholeHours !== 1 ? 's' : ''} y ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
        }
        return `En ${wholeHours} hora${wholeHours !== 1 ? 's' : ''}`;
    } else {
        const days = Math.floor(hours / 24);
        const remainingHours = Math.floor(hours % 24);
        if (remainingHours > 0) {
            return `En ${days} día${days !== 1 ? 's' : ''} y ${remainingHours} hora${remainingHours !== 1 ? 's' : ''}`;
        }
        return `En ${days} día${days !== 1 ? 's' : ''}`;
    }
}








