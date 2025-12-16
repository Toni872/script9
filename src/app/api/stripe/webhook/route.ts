import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase';
import { EmailService } from '@/services/emailService';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'No signature provided' },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        );
    }

    // Manejar el evento
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object);
                break;

            case 'payment_intent.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;

            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(event.data.object);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}

async function handlePaymentSuccess(paymentIntent: any) {
    const bookingId = paymentIntent.metadata.bookingId;
    const supabase = createServerSupabaseClient();

    console.log('✅ Payment succeeded for booking:', bookingId);

    // Actualizar el estado de la reserva a 'confirmed'
    const { data: booking, error } = await supabase
        .from('bookings')
        .update({
            status: 'confirmed',
            updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId)
        .select(`
            *,
            properties (id, title, address, city, host_id),
            users!bookings_guest_id_fkey (id, name, email)
        `)
        .single();

    if (error) {
        console.error('Error updating booking:', error);
        throw error;
    }

    if (!booking) {
        console.error('Booking not found:', bookingId);
        return;
    }

    // Obtener información del host
    const { data: host } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('id', booking.properties.host_id)
        .single();

    // Enviar emails de confirmación
    if (booking.users && host) {
        try {
            // Email al huésped
            await EmailService.sendBookingConfirmation({
                guestName: booking.users.name,
                guestEmail: booking.users.email,
                hostName: host.name,
                hostEmail: host.email,
                propertyName: booking.properties.title,
                propertyAddress: `${booking.properties.address}, ${booking.properties.city}`,
                checkInDate: booking.start_time,
                checkOutDate: booking.end_time,
                totalPrice: booking.total_price,
                bookingId: booking.id,
            });

            // Email al host
            await EmailService.sendNewBookingNotification({
                hostName: host.name,
                hostEmail: host.email,
                guestName: booking.users.name,
                propertyName: booking.properties.title,
                checkInDate: booking.start_time,
                checkOutDate: booking.end_time,
                totalPrice: booking.total_price,
                bookingId: booking.id,
            });

            console.log('✅ Confirmation emails sent');
        } catch (emailError) {
            console.error('Error sending confirmation emails:', emailError);
        }
    }
}

async function handlePaymentFailed(paymentIntent: any) {
    const bookingId = paymentIntent.metadata.bookingId;
    const supabase = createServerSupabaseClient();

    console.log('❌ Payment failed for booking:', bookingId);

    // Opcional: Actualizar el estado de la reserva o registrar el fallo
    const { data: booking } = await supabase
        .from('bookings')
        .select(`
            *,
            users!bookings_guest_id_fkey (id, name, email)
        `)
        .eq('id', bookingId)
        .single();

    if (booking && booking.users) {
        try {
            // Enviar email de notificación de fallo
            await EmailService.sendPaymentFailedNotification({
                guestName: booking.users.name,
                guestEmail: booking.users.email,
                bookingId: booking.id,
                reason: paymentIntent.last_payment_error?.message || 'Pago rechazado',
            });

            console.log('✅ Payment failed notification sent');
        } catch (emailError) {
            console.error('Error sending payment failed email:', emailError);
        }
    }
}

async function handleCheckoutSessionCompleted(session: any) {
    const { propertyId, type, buyerId, platformFee } = session.metadata || {};

    const supabase = createServerSupabaseClient();

    // 1. Manejar Promociones
    if (type === 'promotion_script9_select') {
        if (!propertyId) return;
        console.log(`🚀 Processing promotion for Property ${propertyId}`);
        const { error } = await supabase
            .from('properties')
            .update({ is_script9_select: true })
            .eq('id', propertyId);

        if (error) console.error('Error upgrading property:', error);
        else console.log(`✅ Property ${propertyId} upgraded to Script9 Select!`);
        return;
    }

    // 2. Manejar Compra de Servicios (NUEVO)
    if (type === 'service_purchase') {
        if (!propertyId || !buyerId) {
            console.error('Missing metadata for service purchase');
            return;
        }

        console.log(`🛒 Processing service purchase for Property ${propertyId} by User ${buyerId}`);

        const amountTotal = session.amount_total || 0;
        const fee = parseFloat(platformFee || '0');

        // Insertar la "Reserva" (Orden)
        const { data: booking, error } = await supabase
            .from('bookings')
            .insert({
                property_id: propertyId,
                guest_id: buyerId, // Guest is the Buyer/Client
                status: 'confirmed', // Paid immediately
                total_price: amountTotal / 100,
                stripe_payment_id: session.payment_intent || session.id,
                platform_fee: fee / 100,
                host_payout: (amountTotal - fee) / 100,
                start_time: new Date().toISOString(), // Default to now
                end_time: new Date().toISOString()    // Default to now
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating service order:', error);
            // TODO: Refund or handle error
            return;
        }

        console.log(`✅ Service Order created: ${booking.id}`);

        // Opcional: Enviar emails (Podemos reusar EmailService si es necesario)
        // await sendConfirmationEmails(booking.id); (Implement later if needed)
        return;
    }

    console.log('Skipping checkout session (unknown type or missing ID)');
}







