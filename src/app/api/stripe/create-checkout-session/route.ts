import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Debes iniciar sesión para contratar un servicio' }, { status: 401 });
        }

        const body = await request.json();
        const { propertyId } = body;

        if (!propertyId) {
            return NextResponse.json({ error: 'ID de servicio requerido' }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        // 1. Obtener ID del usuario actual (Comprador)
        const { data: user } = await supabase
            .from('users')
            .select('id, email, name')
            .eq('email', session.user.email)
            .single();

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // 2. Obtener detalles del servicio (precio, título)
        const { data: property } = await supabase
            .from('properties')
            .select('id, title, price_per_hour, host_id')
            .eq('id', propertyId)
            .single();

        if (!property) {
            return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
        }

        // Validate price
        if (!property.price_per_hour || property.price_per_hour <= 0) {
            return NextResponse.json({ error: 'El precio del servicio no es válido' }, { status: 400 });
        }

        // 3. Crear sesión de Checkout
        const priceInCents = Math.round(property.price_per_hour * 100);

        // Platform Fee logic can be added here (e.g., application_fee_amount in payment_intent_data)
        // For now, we charge the full amount and will handle payouts separately, or use metadata to track fees.
        const platformFee = Math.round(priceInCents * 0.10); // 10%

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Servicio: ${property.title}`,
                            description: 'Contratación de servicio digital en Script9.',
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: user.email, // Pre-fill email
            success_url: `${process.env.NEXTAUTH_URL}/reserva/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/catalogo/${propertyId}`,
            metadata: {
                type: 'service_purchase',
                propertyId: property.id,
                buyerId: user.id,
                sellerId: property.host_id,
                platformFee: platformFee.toString()
            },
        });

        return NextResponse.json({ url: checkoutSession.url });

    } catch (error: any) {
        console.error('Error creando sesión de pago:', error);
        return NextResponse.json(
            { error: 'Error interno al procesar el pago', details: error.message },
            { status: 500 }
        );
    }
}
