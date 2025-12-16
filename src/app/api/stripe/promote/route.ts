import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';

const PROMOTION_PRICE_EUR = 2900; // 29.00€

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const body = await request.json();
        const { propertyId } = body;

        if (!propertyId) {
            return NextResponse.json({ error: 'ID de propiedad requerido' }, { status: 400 });
        }

        // Verificar que la propiedad pertenece al usuario
        const supabase = createServerSupabaseClient();

        // 1. Obtener ID del usuario actual
        const { data: user } = await supabase
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // 2. Obtener propiedad y verificar dueño
        const { data: property } = await supabase
            .from('properties')
            .select('id, title, host_id')
            .eq('id', propertyId)
            .single();

        if (!property) {
            return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
        }

        if (property.host_id !== user.id) {
            return NextResponse.json({ error: 'No tienes permiso para destacar esta propiedad' }, { status: 403 });
        }

        // Crear sesión de Checkout
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Destacar: ${property.title}`,
                            description: 'Aparece primero en los resultados de búsqueda durante 7 días.',
                        },
                        unit_amount: PROMOTION_PRICE_EUR,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/anfitrion/dashboard?promoted=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/anfitrion/dashboard?canceled=true`,
            metadata: {
                propertyId: property.id,
                type: 'promotion_script9_select'
            },
        });

        return NextResponse.json({ url: checkoutSession.url });

    } catch (error: any) {
        console.error('Error creando sesión de promoción:', error);
        return NextResponse.json(
            { error: 'Error interno', details: error.message },
            { status: 500 }
        );
    }
}
