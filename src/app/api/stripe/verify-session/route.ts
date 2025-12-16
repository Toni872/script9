
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    try {
        // 1. Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const { propertyId, buyerId } = session.metadata || {};

        if (!propertyId) {
            return NextResponse.json({ error: 'No property ID in session metadata' }, { status: 400 });
        }

        // 2. Fetch Property Details from Supabase
        const supabase = createServerSupabaseClient();
        const { data: property, error } = await supabase
            .from('properties')
            .select('id, title, price_per_hour, city, image_urls')
            .eq('id', propertyId)
            .single();

        if (error || !property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        // 3. Return combined data
        return NextResponse.json({
            property: {
                id: property.id,
                title: property.title,
                city: property.city,
                image: property.image_urls?.[0]
            },
            booking: {
                total: (session.amount_total || 0) / 100,
                customerEmail: session.customer_details?.email,
                customerName: session.customer_details?.name,
                status: session.payment_status
            }
        });

    } catch (error: any) {
        console.error('Error verifying session:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
