import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
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
        const { data: fetchedUser } = await supabase
            .from('users')
            .select('id, email, name')
            .eq('email', session.user.email)
            .single();

        // Cast explicitly to avoid "SelectQueryError" inference issues
        let user = fetchedUser as { id: string; email: string; name: string } | null;

        if (!user) {
            console.warn(`⚠️ Usuario ${session.user.email} no encontrado en 'users'. Intentando crear...`);

            // Intento de auto-creación del usuario (Lazy Creation)
            const newUserId = crypto.randomUUID();
            const { data: newUserResult, error: createError } = await supabase
                .from('users')
                .insert([
                    {
                        id: newUserId,
                        email: session.user.email,
                        name: session.user.name || 'Usuario Script9',
                        role: 'guest'
                    }
                ])
                .select('id, email, name')
                .single();

            const newUser = newUserResult as { id: string; email: string; name: string } | null;

            if (createError || !newUser) {
                console.error('❌ Error CRÍTICO creando usuario en checkout:', JSON.stringify(createError, null, 2));
                // Add more details to the response for debugging (temporarily)
                return NextResponse.json({
                    error: 'Usuario no encontrado y no se pudo crear.',
                    details: createError
                }, { status: 404 });
            }

            console.log('✅ Usuario creado dinámicamente:', newUser.email);
            user = newUser;
        }

        // 2. Obtener detalles del servicio (precio, título)
        const { data: propertyData, error: propertyError } = await supabase
            .from('properties')
            .select('id, title, price_per_hour, host_id')
            .eq('id', propertyId)
            .single();

        const property = propertyData as any;

        if (propertyError || !property) {
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

        // Check host_id, fallback to platform if null
        const sellerId = property.host_id || 'platform';

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
                sellerId: sellerId,
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
