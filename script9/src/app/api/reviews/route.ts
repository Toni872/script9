import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

// GET - Obtener reseñas de una propiedad
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const propertyId = searchParams.get('propertyId');
        const userId = searchParams.get('userId');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');

        const supabase = createServerSupabaseClient();

        // Primero intentamos con la relación, si falla devolvemos array vacío
        let query = supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (propertyId) {
            query = query.eq('property_id', propertyId);
        }

        if (userId) {
            query = query.eq('guest_id', userId);
        }

        const { data: reviews, error } = await query;

        if (error) {
            console.error('Error fetching reviews:', error);
            // Devolver array vacío en lugar de error 500
            return NextResponse.json({ reviews: [] });
        }

        return NextResponse.json({ reviews: reviews || [] });

    } catch (error) {
        console.error('Error in reviews API:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

// POST - Crear nueva reseña
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const {
            bookingId,
            rating,
            cleanlinessRating,
            communicationRating,
            accuracyRating,
            locationRating,
            valueRating,
            reviewText,
        } = await req.json();

        // Validaciones
        if (!bookingId || !rating || !reviewText) {
            return NextResponse.json(
                { error: 'Booking ID, rating y texto son requeridos' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'El rating debe estar entre 1 y 5' },
                { status: 400 }
            );
        }

        if (reviewText.length < 10) {
            return NextResponse.json(
                { error: 'La reseña debe tener al menos 10 caracteres' },
                { status: 400 }
            );
        }

        const supabase = createServerSupabaseClient();

        // Verificar que la reserva existe y está completada
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .select('id, property_id, user_id, host_id, status, end_time')
            .eq('id', bookingId)
            .single();

        if (bookingError || !booking) {
            return NextResponse.json(
                { error: 'Reserva no encontrada' },
                { status: 404 }
            );
        }

        // Verificar que el usuario es el que hizo la reserva
        if (booking.user_id !== session.user.id) {
            return NextResponse.json(
                { error: 'No tienes permiso para reseñar esta reserva' },
                { status: 403 }
            );
        }

        // Verificar que la reserva está completada
        if (booking.status !== 'completed') {
            return NextResponse.json(
                { error: 'Solo puedes reseñar reservas completadas' },
                { status: 400 }
            );
        }

        // Verificar que la reserva ya terminó
        if (new Date(booking.end_time) > new Date()) {
            return NextResponse.json(
                { error: 'La reserva aún no ha terminado' },
                { status: 400 }
            );
        }

        // Verificar que no existe una reseña para esta reserva
        const { data: existingReview } = await supabase
            .from('reviews')
            .select('id')
            .eq('booking_id', bookingId)
            .single();

        if (existingReview) {
            return NextResponse.json(
                { error: 'Ya has reseñado esta reserva' },
                { status: 400 }
            );
        }

        // Crear la reseña
        const { data: review, error: insertError } = await supabase
            .from('reviews')
            .insert({
                booking_id: bookingId,
                property_id: booking.property_id,
                guest_id: booking.user_id,
                host_id: booking.host_id,
                rating,
                cleanliness_rating: cleanlinessRating,
                communication_rating: communicationRating,
                accuracy_rating: accuracyRating,
                location_rating: locationRating,
                value_rating: valueRating,
                review_text: reviewText,
            })
            .select()
            .single();

        if (insertError) {
            console.error('Error creating review:', insertError);
            return NextResponse.json(
                { error: 'Error al crear la reseña' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Reseña creada exitosamente', review },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error in reviews POST:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}



