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
        const { data: booking, error: bookingError } = await supabase
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

        if (bookingError || !booking) {
            return NextResponse.json(
                { error: 'Reserva no encontrada' },
                { status: 404 }
            );
        }

        // Verificar que el usuario sea el dueño de la reserva
        const { data: user } = await supabase
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();

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

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: STRIPE_CONFIG.currency,
            payment_method_types: STRIPE_CONFIG.paymentMethodTypes,
            metadata: {
                bookingId: booking.id,
                propertyId: booking.property_id,
                guestId: booking.guest_id,
                hostId: (booking.properties as any)?.host_id || '',
                propertyTitle: (booking.properties as any)?.title || '',
                startTime: booking.check_in,
                endTime: booking.check_out,
                platformFee: platformFee.toString(), // Guardar en metadata de Stripe
                hostPayout: hostPayout.toString()
            },
            description: `Reserva de ${(booking.properties as any)?.title || 'propiedad'} (Comisión 10% incl.)`,
        });

        // Actualizar la reserva con el payment intent ID y los datos de comisión
        await supabase
            .from('bookings')
            .update({
                stripe_payment_id: paymentIntent.id,
                updated_at: new Date().toISOString(),
                // @ts-ignore: Las columnas existen en BD tras migración
                platform_fee: platformFee / 100, // Guardar en euros
                host_payout: hostPayout / 100
            })
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







