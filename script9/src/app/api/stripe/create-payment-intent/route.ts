import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const createPaymentIntentSchema = z.object({
    bookingId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        // Validar body
        const body = await request.json();
        const validationResult = createPaymentIntentSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Datos inválidos',
                    details: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        const { bookingId } = validationResult.data;

        // Obtener la reserva de la base de datos
        const supabase = createServerSupabaseClient();
        const { data: bookingRaw, error: bookingError } = await supabase
            .from('bookings')
            .select(`
                id,
                total_price,
                status,
                guest_id,
                property_id,
                check_in,
                check_out,
                properties (
                    id,
                    title,
                    host_id
                )
            `)
            .eq('id', bookingId)
            .single();

        // Define interface explicitly to avoid Supabase inference errors
        interface BookingWithProperty {
            id: string;
            total_price: number;
            status: string;
            guest_id: string;
            property_id: string;
            check_in: string;
            check_out: string;
            properties: {
                id: string;
                title: string;
                host_id: string;
            } | null;
        }

        const booking = bookingRaw as unknown as BookingWithProperty | null;

        if (bookingError || !booking) {
            return NextResponse.json(
                { error: 'Reserva no encontrada' },
                { status: 404 }
            );
        }

        // Verificar que el usuario sea el dueño de la reserva
        const { data: userRaw } = await supabase
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();

        const user = userRaw as { id: string } | null;

        if (!user || booking.guest_id !== user.id) {
            return NextResponse.json(
                { error: 'No tienes permiso para pagar esta reserva' },
                { status: 403 }
            );
        }

        // Verificar que la reserva esté en estado 'pending'
        if (booking.status !== 'pending') {
            return NextResponse.json(
                { error: `No se puede pagar una reserva con estado: ${booking.status}` },
                { status: 400 }
            );
        }

        // Calcular comisión (10%)
        const amount = Math.round(booking.total_price * 100); // Total en centavos
        const platformFee = Math.round(amount * 0.10); // 10% comisión
        const hostPayout = amount - platformFee; // Lo que recibe el experto

        const propertyTitle = booking.properties?.title || 'propiedad';
        const hostId = booking.properties?.host_id || '';

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: STRIPE_CONFIG.currency,
            payment_method_types: STRIPE_CONFIG.paymentMethodTypes,
            metadata: {
                bookingId: booking.id,
                propertyId: booking.property_id,
                guestId: booking.guest_id,
                hostId: hostId,
                propertyTitle: propertyTitle,
                startTime: booking.check_in,
                endTime: booking.check_out,
                platformFee: platformFee.toString(), // Guardar en metadata de Stripe
                hostPayout: hostPayout.toString()
            },
            description: `Reserva de ${propertyTitle} (Comisión 10% incl.)`,
        });

        // Actualizar la reserva con el payment intent ID y los datos de comisión
        await supabase
            .from('bookings')
            .update({
                stripe_payment_id: paymentIntent.id,
                updated_at: new Date().toISOString(),
                // Campos agregados explicitamente con casteo si no estan en type definition aun
                platform_fee: platformFee / 100,
                host_payout: hostPayout / 100
            } as any)
            .eq('id', bookingId);

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });

    } catch (error: any) {
        console.error('Error al crear Payment Intent:', error);
        return NextResponse.json(
            { error: 'Error al procesar el pago', details: error.message },
            { status: 500 }
        );
    }
}







