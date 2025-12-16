import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

/**
 * GET /api/properties/[id]
 * Obtener una propiedad por su ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const propertyId = params.id;

        console.log('🔍 Buscando propiedad con ID:', propertyId);

        if (!propertyId) {
            return NextResponse.json(
                { error: 'ID de propiedad no proporcionado' },
                { status: 400 }
            );
        }

        const supabase = createServerSupabaseClient();

        // Obtener la propiedad (sin relación con host por ahora para evitar errores)
        const { data: property, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', propertyId)
            .eq('status', 'active')
            .single();

        if (error) {
            console.error('❌ Error Supabase al obtener propiedad:', error);
            if (error.code === 'PGRST116') {
                return NextResponse.json(
                    { error: 'Propiedad no encontrada' },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { error: 'Error al obtener la propiedad', details: error.message },
                { status: 500 }
            );
        }

        if (!property) {
            console.log('⚠️ Propiedad no encontrada en BD:', propertyId);
            return NextResponse.json(
                { error: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        console.log('✅ Propiedad encontrada:', property.title);

        // Calcular rating promedio y contar reseñas (si existe la tabla reviews)
        let average_rating = null;
        let review_count = 0;

        try {
            const { data: reviewsData, error: reviewsError } = await supabase
                .from('reviews')
                .select('rating')
                .eq('property_id', propertyId);

            if (!reviewsError && reviewsData && reviewsData.length > 0) {
                review_count = reviewsData.length;
                const totalRating = reviewsData.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0);
                average_rating = totalRating / review_count;
            }
        } catch {
            // Si la tabla reviews no existe, simplemente ignoramos el error
            console.log('ℹ️ No se pudo obtener reviews (tabla podría no existir)');
        }

        // Retornar propiedad con datos calculados
        return NextResponse.json({
            ...property,
            average_rating,
            review_count,
        });
    } catch (error) {
        console.error('Error en GET /api/properties/[id]:', error);
        return NextResponse.json(
            {
                error: 'Error interno del servidor',
                details: error instanceof Error ? error.message : 'Error desconocido',
            },
            { status: 500 }
        );
    }
}
