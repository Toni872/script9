import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { CatalogService } from '@/services/catalogService';
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
        const property = await CatalogService.getServiceById(validatedData.propertyId);
        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Property not found' },
                { status: 404 }
            );
        }

        // Calcular detalles adicionales
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);
        const durationDays = Math.ceil(durationHours / 24);

        // Fixed Pricing Model: Price is per project, regardless of duration
        const pricingType = 'project';
        const unitPrice = property.price;
        const units = 1;

        // Override BookingService calculation for now to enforce fixed price
        const totalPrice = unitPrice;

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
