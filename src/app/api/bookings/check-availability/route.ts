import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';

/**
 * GET /api/bookings/check-availability
 * Verificar disponibilidad de una propiedad
 * Query params: propertyId, startTime, endTime
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const propertyId = searchParams.get('propertyId');
        const startTime = searchParams.get('startTime');
        const endTime = searchParams.get('endTime');

        // Validar parámetros
        if (!propertyId || !startTime || !endTime) {
            return NextResponse.json(
                {
                    available: false,
                    error: 'Faltan parámetros requeridos: propertyId, startTime, endTime'
                },
                { status: 400 }
            );
        }

        // Validar formato UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(propertyId)) {
            return NextResponse.json(
                {
                    available: false,
                    error: 'ID de propiedad inválido'
                },
                { status: 400 }
            );
        }

        // Convertir a fechas
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Validar fechas
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return NextResponse.json(
                {
                    available: false,
                    error: 'Formato de fecha inválido'
                },
                { status: 400 }
            );
        }

        if (end <= start) {
            return NextResponse.json(
                {
                    available: false,
                    message: 'La fecha de fin debe ser posterior a la fecha de inicio'
                },
                { status: 400 }
            );
        }

        // Verificar disponibilidad usando el servicio
        const isAvailable = await BookingService.checkAvailability(
            propertyId,
            start,
            end
        );

        // Calcular precio si está disponible
        let price = null;
        let hours = null;

        if (isAvailable) {
            try {
                price = await BookingService.calculateBookingPrice(propertyId, start, end);
                const durationMs = end.getTime() - start.getTime();
                hours = Math.ceil(durationMs / (1000 * 60 * 60));
            } catch (priceError) {
                console.error('Error calculando precio:', priceError);
                return NextResponse.json({
                    available: false,
                    message: priceError instanceof Error ? priceError.message : 'Error al calcular precio',
                });
            }
        }

        return NextResponse.json({
            available: isAvailable,
            message: isAvailable
                ? 'El espacio está disponible'
                : 'El espacio no está disponible para estas fechas',
            price,
            hours,
        });

    } catch (error) {
        console.error('Error verificando disponibilidad:', error);
        return NextResponse.json(
            {
                available: false,
                error: error instanceof Error ? error.message : 'Error al verificar disponibilidad'
            },
            { status: 500 }
        );
    }
}


