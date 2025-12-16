import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getMockPropertyById } from '@/lib/mockData';

/**
 * GET /api/properties/[id]
 * Obtener una propiedad por su ID
 */
export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    // 1. Manejo Seguro de Params
    // (A veces params puede ser undefined en tests o builds extraños)
    const propertyId = context?.params?.id;

    console.log('🔍 Buscando propiedad con ID:', propertyId);

    if (!propertyId) {
        return NextResponse.json(
            { error: 'ID de propiedad no proporcionado' },
            { status: 400 }
        );
    }

    try {
        const supabase = createServerSupabaseClient();

        // 2. Intentar buscar en Supabase (Base de Datos Real)
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', propertyId)
            .eq('status', 'active')
            .single();

        // Cast a 'any' para evitar errores de tipado estricto de Supabase
        // cuando la definición de tablas no coincide perfectamente
        const property = data as any;

        // 3. Manejo de Errores DB con Fallback a Mock Data
        if (error) {
            console.error('❌ Error Supabase al obtener propiedad:', error);

            // Si falla la BD (ej: ID no es UUID válido), intentamos Mock Data
            const mockProperty = getMockPropertyById(propertyId);
            if (mockProperty) {
                console.log('✅ Fallback: Propiedad encontrada en Mock Data:', mockProperty.title);
                return NextResponse.json({
                    ...mockProperty,
                    average_rating: mockProperty.average_rating || 0,
                    review_count: mockProperty.review_count || 0,
                });
            }

            // Si es error de "No results" (PGRST116), retornamos 404 limpio
            if (error.code === 'PGRST116') {
                return NextResponse.json(
                    { error: 'Propiedad no encontrada' },
                    { status: 404 }
                );
            }

            // Otros errores (500)
            return NextResponse.json(
                { error: 'Error al obtener la propiedad', details: error.message },
                { status: 500 }
            );
        }

        // 4. Si Supabase devuelve datos
        if (property) {
            console.log('✅ Propiedad encontrada en BD:', property.title);

            // Calcular reviews
            let average_rating = 0;
            let review_count = 0;

            try {
                // @ts-ignore
                const { data: reviewsRaw } = await supabase
                    .from('reviews')
                    .select('rating')
                    .eq('property_id', propertyId);

                const reviewsData = reviewsRaw as any[];

                if (reviewsData && reviewsData.length > 0) {
                    review_count = reviewsData.length;
                    const totalRating = reviewsData.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0);
                    average_rating = Number((totalRating / review_count).toFixed(1));
                }
            } catch (reviewErr) {
                console.warn('ℹ️ No se pudieron cargar reseñas (tabla opcional):', reviewErr);
            }

            return NextResponse.json({
                ...property,
                average_rating,
                review_count,
            });
        }

        // (Este bloque 'else' a property es improbable con .single() pero por seguridad)
        return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });

    } catch (globalError) {
        console.error('🔥 Error CRÍTICO en GET /api/properties/[id]:', globalError);

        // 5. FALLBACK FINAL DE EMERGENCIA
        // Si todo falla (ej: error de conexión, variables de entorno faltantes),
        // intentamos servir el Mock Data como último recurso para que la web no caiga.
        const mockProperty = getMockPropertyById(propertyId);
        if (mockProperty) {
            console.log('✅ Rescue Fallback: Sirviendo Mock Data tras error crítico:', mockProperty.title);
            return NextResponse.json({
                ...mockProperty,
                average_rating: mockProperty.average_rating || 0,
                review_count: mockProperty.review_count || 0,
            });
        }

        return NextResponse.json(
            {
                error: 'Error interno del servidor',
                details: globalError instanceof Error ? globalError.message : 'Error desconocido',
            },
            { status: 500 }
        );
    }
}
