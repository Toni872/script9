import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const createPropertySchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().min(0),
    product_type: z.enum(['service', 'digital_product']).default('service'),
    download_url: z.string().optional()
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const body = await request.json();

        // Convert to number if string
        if (typeof body.price === 'string') {
            body.price = parseFloat(body.price);
        }

        const validation = createPropertySchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: 'Datos inválidos', details: validation.error }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        // Obtener ID del usuario actual
        const { data: user } = await supabase
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const { data, error } = await supabase
            .from('properties')
            .insert({
                title: validation.data.title,
                description: validation.data.description,
                price_per_day: validation.data.price, // Usamos price_per_day como campo de precio genérico
                max_guests: 1, // Default para scripts
                host_id: user.id,
                product_type: validation.data.product_type,
                download_url: validation.data.download_url
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Error creando propiedad:', error);
        return NextResponse.json(
            { error: 'Error interno', details: error.message },
            { status: 500 }
        );
    }
}
