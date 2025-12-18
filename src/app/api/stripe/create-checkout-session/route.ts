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
        const { serviceId, propertyId } = body;
        const id = serviceId || propertyId;

        if (!id) {
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

            let newUserId = crypto.randomUUID() as string;

            // 1. Try to create user in Auth (auth.users) to satisfy FK, if possible
            try {
                const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                    email: session.user.email,
                    email_confirm: true,
                    user_metadata: { name: session.user.name }
                });

                if (authData.user) {
                    console.log('✅ Usuario creado en Auth.users con ID:', authData.user.id);
                    newUserId = authData.user.id;
                } else if (authError) {
                    console.warn('⚠️ Nota sobre Auth.users:', authError.message);
                    // If user already exists in Auth, we MUST use their existing ID
                    if (authError.message?.includes('already registered') || authError.status === 422) {
                        try {
                            // Try to find the user in the first 100 users (optimistic search)
                            const { data: listData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 });
                            const existingUser = listData.users.find(u => u.email === session.user.email);
                            if (existingUser) {
                                console.log('✅ Usuario encontrado en Auth.users:', existingUser.id);
                                newUserId = existingUser.id;
                            }
                        } catch (listErr) {
                            console.error('Error buscando usuario en Auth:', listErr);
                        }
                    }
                }

            } catch (e) {
                console.error('Error gestionando Auth.users (continuando con ID aleatorio):', e);
            }

            // 2. Insert into public.users
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
                return NextResponse.json({
                    error: 'Usuario no encontrado y no se pudo crear.',
                    details: createError
                }, { status: 404 });
            }

            console.log('✅ Usuario creado dinámicamente en public.users:', newUser.email);
            user = newUser;
        }

        // 2. Obtener detalles del servicio (precio, título)
        const { data: serviceData, error: serviceError } = await supabase
            .from('properties')
            .select('id, title, price_per_hour, host_id')
            .eq('id', id)
            .single();

        const service = serviceData as any;

        if (serviceError || !service) {
            return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
        }

        // Validate price
        if (!service.price_per_hour || service.price_per_hour <= 0) {
            return NextResponse.json({ error: 'El precio del servicio no es válido' }, { status: 400 });
        }

        // 3. Crear sesión de Checkout
        // Treat price_per_hour as FIXED PRICE for the project
        const priceInCents = Math.round(service.price_per_hour * 100);

        // Platform Fee logic can be added here (e.g., application_fee_amount in payment_intent_data)
        // For now, we charge the full amount and will handle payouts separately, or use metadata to track fees.
        const platformFee = Math.round(priceInCents * 0.10); // 10%

        // Check host_id, fallback to platform if null
        const sellerId = service.host_id || 'platform';

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Servicio: ${service.title}`,
                            description: 'Contratación de servicio digital en Script9 (Pago Único).',
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: user.email, // Pre-fill email
            success_url: `${process.env.NEXTAUTH_URL}/reserva/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/catalogo/${id}`,
            metadata: {
                type: 'service_purchase',
                serviceId: service.id,
                propertyId: service.id, // Legacy compat
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
