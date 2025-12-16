import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { PropertyService } from '@/services/propertyService';
import { z } from 'zod';

// Esquema de validación para calcular precio
const calculatePriceSchema = z.object({
    propertyId: z.string().uuid('Invalid property ID'),
    startTime: z.string().datetime('Invalid start time format'),
    endTime: z.string().datetime('Invalid end time format'),
}).refine(data => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
}, {
    message: 'End time must be after start time',
});

/**
 * POST /api/bookings/calculate-price
 * Calcular el precio de una reserva para fechas específicas
 */
export async function POST(request: NextRequest) {
    try {
        // Parsear y validar datos de entrada
        const body = await request.json();
        const validatedData = calculatePriceSchema.parse(body);
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

        // Calcular precio
        const totalPrice = await BookingService.calculateBookingPrice(
            validatedData.propertyId,
            startTime,
            endTime
        );

        // Calcular detalles adicionales
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);
        const durationDays = Math.ceil(durationHours / 24);

        // Determinar si se está usando precio por hora o por día
        const pricingType = durationHours >= 24 ? 'daily' : 'hourly';
        const unitPrice = pricingType === 'daily' ? property.price_per_day :
            property.price_per_hour;
        const units = pricingType === 'daily' ? durationDays : Math.ceil(durationHours);

        return NextResponse.json({
            success: true,
            data: {
                totalPrice,
                pricingDetails: {
                    type: pricingType,
                    unitPrice,
                    units,
                    duration: {
                        hours: durationHours,
                        days: durationDays,
                    },
                },
                propertyId: validatedData.propertyId,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
            },
        });
    } catch (error) {
        console.error('Error calculating price:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid price calculation data', details: error.issues },
                { status: 400 }
            );
        }
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to calculate price' },
            { status: 500 }
        );
    }
}
