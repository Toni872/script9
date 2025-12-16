import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { PropertyService } from '@/services/propertyService';
import { z } from 'zod';

// Esquema de validación para verificar disponibilidad
const availabilitySchema = z.object({
    propertyId: z.string().uuid('Invalid property ID'),
    startTime: z.string().datetime('Invalid start time format'),
    endTime: z.string().datetime('Invalid end time format'),
    excludeBookingId: z.string().uuid().optional(),
}).refine(data => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
}, {
    message: 'End time must be after start time',
});

/**
 * POST /api/bookings/availability
 * Verificar disponibilidad de una propiedad para fechas específicas
 */
export async function POST(request: NextRequest) {
    try {
        // Parsear y validar datos de entrada
        const body = await request.json();
        const validatedData = availabilitySchema.parse(body);
        const startTime = new Date(validatedData.startTime);
        const endTime = new Date(validatedData.endTime);

        // Verificar que la propiedad existe
        const property = await PropertyService.getPropertyById(validatedData.propertyId);
        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Property not found' },
                { status: 404 }
            );
        }

        // Verificar disponibilidad
        const isAvailable = await BookingService.checkAvailability(
            validatedData.propertyId,
            startTime,
            endTime,
            validatedData.excludeBookingId
        );

        // Calcular precio si está disponible
        let price = null;
        if (isAvailable) {
            try {
                price = await BookingService.calculateBookingPrice(
                    validatedData.propertyId,
                    startTime,
                    endTime
                );
            } catch (error) {
                // Si hay error en el cálculo de precio (ej. duración mínima),
                // la propiedad no está disponible para esas fechas
                return NextResponse.json({
                    success: true,
                    data: {
                        available: false,
                        reason: error instanceof Error ? error.message : 'Invalid booking duration',
                    },
                });
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                available: isAvailable,
                price: price,
                propertyId: validatedData.propertyId,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
            },
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid availability data', details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to check availability' },
            { status: 500 }
        );
    }
}
