import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getMockPropertyById } from '@/lib/mockData';

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

        // 1. Intentar buscar en Supabase (Base de Datos Real)
        const { data: property, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', propertyId)
            .eq('status', 'active')
            .single();

        // 2. Manejo de Errores DB y Fallback a Mock Data
        if (error) {
            console.error('❌ Error Supabase al obtener propiedad:', error);

            // Si falla la BD (ej: ID no es UUID válido), intentamos Mock Data
            const mockProperty = getMockPropertyById(propertyId);
            if (mockProperty) {
                console.log('✅ Propiedad encontrada en Mock Data (Fallback tras error DB):', mockProperty.title);
                return NextResponse.json({
                    ...mockProperty,
                    average_rating: mockProperty.average_rating || 0,
                    review_count: mockProperty.review_count || 0,
                });
            }

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

        // 3. Si no hay error pero no hay propiedad (caso raro con .single())
        if (!property) {
            // Intentar Mock Data
            const mockProperty = getMockPropertyById(propertyId);
            if (mockProperty) {
                console.log('✅ Propiedad encontrada en Mock Data (Fallback por null):', mockProperty.title);
                return NextResponse.json({
                    ...mockProperty,
                    average_rating: mockProperty.average_rating || 0,
                    review_count: mockProperty.review_count || 0,
                });
            }

            return NextResponse.json(
                { error: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        console.log('✅ Propiedad encontrada en BD:', property.title);

        // 4. Calcular reviews para propiedad de BD
        let average_rating = 0;
        let review_count = 0;

        try {
            const { data: reviewsData, error: reviewsError } = await supabase
                .from('reviews')
                .select('rating')
                .eq('property_id', propertyId);

            if (!reviewsError && reviewsData && reviewsData.length > 0) {
                review_count = reviewsData.length;
                const totalRating = reviewsData.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0);
                average_rating = Number((totalRating / review_count).toFixed(1));
            }
        } catch {
            console.log('ℹ️ No se pudo obtener reviews (tabla podría no existir)');
        }

        // 5. Retornar Respuesta Final
        return NextResponse.json({
            ...property,
            average_rating,
            review_count,
        });

    } catch (error) {
        console.error('Error en GET /api/properties/[id]:', error);

        // FALLBACK DE SEGURIDAD:
        // Si falla cualquier cosa (DB, claves, conexión), intentamos servir el Mock
        // Esto arregla el error cuando se usan IDs no-UUID (ej: "1") y la DB lanza excepción
        const mockProperty = getMockPropertyById(params.id);
        if (mockProperty) {
            console.log('✅ Propiedad encontrada en Mock Data (Rescue Fallback):', mockProperty.title);
            return NextResponse.json({
                ...mockProperty,
                average_rating: mockProperty.average_rating || 0,
                review_count: mockProperty.review_count || 0,
            });
        }

        return NextResponse.json(
            {
                error: 'Error interno del servidor',
                details: error instanceof Error ? error.message : 'Error desconocido',
            },
            { status: 500 }
        );
    }
}
