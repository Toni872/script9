import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/bookingService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';
import { BadRequestError, UnauthorizedError } from '@/utils/errors';

// Schema de validación para crear reserva
const createBookingSchema = z.object({
    propertyId: z.string().uuid('ID de propiedad inválido'),
    startTime: z.string().datetime('Fecha de inicio inválida'),
    endTime: z.string().datetime('Fecha de fin inválida'),
    totalPrice: z.number().positive('El precio debe ser positivo'),
    stripePaymentId: z.string().optional(),
});

// Schema de validación para filtros de búsqueda
const searchFiltersSchema = z.object({
    propertyId: z.string().uuid().optional(),
    guestId: z.string().uuid().optional(),
    hostId: z.string().uuid().optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().max(100).optional(),
});

/**
 * GET /api/bookings
 * Listar reservas del usuario autenticado
 * Query params: status, page, limit
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

        // Obtener parámetros de búsqueda
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status') as 'pending' | 'confirmed' | 'cancelled' | 'completed' | null;
        const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

        // Construir filtros según el rol del usuario
        const filters: any = {
            page,
            limit,
        };

        if (status) {
            filters.status = status;
        }

        // Si es huésped, solo ver sus propias reservas
        // Si es anfitrión, ver reservas de sus propiedades
        if (userRole === 'guest') {
            filters.guestId = userId;
        } else if (userRole === 'host') {
            filters.host_id = userId;
        } else if (userRole === 'admin') {
            // Admin puede ver todas las reservas
            // No añadir filtros adicionales
        }

        const result = await BookingService.searchBookings(filters);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error en GET /api/bookings:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener reservas';
        const statusCode = (error as any).statusCode || 500;
        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode }
        );
    }
}

/**
 * POST /api/bookings
 * Crear una nueva reserva
 * Body: { propertyId, startTime, endTime, totalPrice, stripePaymentId? }
 */
export async function POST(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            console.log('❌ Usuario no autenticado');
            return NextResponse.json(
                { error: 'No autenticado. Por favor inicia sesión.' },
                { status: 401 }
            );
        }

        console.log('✅ Usuario autenticado:', session.user.email);

        // Obtener el UUID del usuario desde la base de datos usando su email
        const supabase = createServerSupabaseClient();
        const { data: userRaw, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();

        const user = userRaw as { id: string } | null;

        if (userError || !user) {
            console.log('❌ Usuario no encontrado en BD:', userError);
            return NextResponse.json(
                { error: 'Usuario no encontrado en la base de datos' },
                { status: 404 }
            );
        }

        const userId = user.id;
        console.log('✅ Usuario encontrado en BD:', userId);

        // Parsear y validar el body
        const body = await request.json();
        console.log('📝 Body recibido:', JSON.stringify(body, null, 2));
        const validationResult = createBookingSchema.safeParse(body);

        if (!validationResult.success) {
            console.log('❌ Error de validación:', validationResult.error.issues);
            return NextResponse.json(
                {
                    error: 'Datos de reserva inválidos',
                    details: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        const { propertyId, startTime, endTime, totalPrice, stripePaymentId } = validationResult.data;

        // Crear la reserva
        const booking = await BookingService.createBooking({
            propertyId,
            guestId: userId,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            totalPrice,
            stripePaymentId,
        });

        return NextResponse.json(
            {
                message: 'Reserva creada exitosamente',
                booking
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en POST /api/bookings:', error);

        const errorMessage = error instanceof Error ? error.message : 'Error al crear la reserva';
        const statusCode = (error as any).statusCode || 500;

        // Manejar errores específicos
        if (errorMessage.includes('no está disponible')) {
            return NextResponse.json(
                { error: errorMessage },
                { status: 409 } // Conflict
            );
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode }
        );
    }
}





