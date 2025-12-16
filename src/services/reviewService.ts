import { createServerSupabaseClient } from '@/lib/supabase';
import { Review } from '@/types';
import { NotFoundError, DatabaseError, BadRequestError, ForbiddenError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';

const supabase = createServerSupabaseClient();

export interface CreateReviewData {
  bookingId: string;
  guestId: string;
  rating: number;
  cleanlinessRating?: number;
  communicationRating?: number;
  accuracyRating?: number;
  locationRating?: number;
  valueRating?: number;
  reviewText: string;
}

export interface ReviewFilters {
  propertyId?: string;
  guestId?: string;
  hostId?: string;
  minRating?: number;
  page?: number;
  limit?: number;
}

export class ReviewService {
  /**
   * Crear una nueva review (solo si booking completed)
   */
  static async createReview(data: CreateReviewData): Promise<Review> {
    // Verificar que la reserva existe y está completada
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, status, property_id, guest_id, host_id')
      .eq('id', data.bookingId)
      .single();

    if (bookingError || !booking) {
      throw new NotFoundError('Reserva');
    }

    if (booking.status !== 'completed') {
      throw new BadRequestError('Solo se pueden dejar reviews para reservas completadas');
    }

    if (booking.guest_id !== data.guestId) {
      throw new ForbiddenError('No tienes permiso para dejar una review para esta reserva');
    }

    // Verificar que no existe ya una review para esta reserva
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('booking_id', data.bookingId)
      .single();

    if (existingReview) {
      throw new BadRequestError('Ya existe una review para esta reserva');
    }

    // Validar ratings
    if (data.rating < 1 || data.rating > 5) {
      throw new BadRequestError('El rating debe estar entre 1 y 5');
    }

    // Crear review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        booking_id: data.bookingId,
        property_id: booking.property_id,
        guest_id: data.guestId,
        host_id: booking.host_id,
        rating: data.rating,
        cleanliness_rating: data.cleanlinessRating,
        communication_rating: data.communicationRating,
        accuracy_rating: data.accuracyRating,
        location_rating: data.locationRating,
        value_rating: data.valueRating,
        review_text: data.reviewText,
      })
      .select(`
        *,
        guest:users!reviews_guest_id_fkey(id, name, email),
        property:properties(id, title)
      `)
      .single();

    if (error) {
      throw new DatabaseError(`Error al crear review: ${error.message}`);
    }

    return review as Review;
  }

  /**
   * Obtener reviews de una propiedad
   */
  static async getPropertyReviews(
    propertyId: string,
    filters?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Review>> {
    const { page, limit, offset } = calculatePagination(filters || {});

    const { data: reviews, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        guest:users!reviews_guest_id_fkey(id, name),
        property:properties(id, title)
      `, { count: 'exact' })
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new DatabaseError(`Error al obtener reviews: ${error.message}`);
    }

    return createPaginatedResponse(reviews || [], count || 0, page, limit);
  }

  /**
   * Obtener reviews de un usuario
   */
  static async getUserReviews(
    userId: string,
    filters?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Review>> {
    const { page, limit, offset } = calculatePagination(filters || {});

    const { data: reviews, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        guest:users!reviews_guest_id_fkey(id, name),
        property:properties(id, title)
      `, { count: 'exact' })
      .eq('guest_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new DatabaseError(`Error al obtener reviews: ${error.message}`);
    }

    return createPaginatedResponse(reviews || [], count || 0, page, limit);
  }

  /**
   * Actualizar una review (solo dentro de 24h de creación)
   */
  static async updateReview(
    reviewId: string,
    userId: string,
    data: { rating?: number; reviewText?: string }
  ): Promise<Review> {
    // Obtener review existente
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', reviewId)
      .single();

    if (fetchError || !existingReview) {
      throw new NotFoundError('Review');
    }

    // Verificar permisos
    if (existingReview.guest_id !== userId) {
      throw new ForbiddenError('No tienes permiso para editar esta review');
    }

    // Verificar que no han pasado más de 24h
    const createdAt = new Date(existingReview.created_at);
    const now = new Date();
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceCreation > 24) {
      throw new BadRequestError('Solo se pueden editar reviews dentro de las primeras 24 horas');
    }

    // Actualizar review
    const updateData: any = { updated_at: new Date().toISOString() };
    if (data.rating) updateData.rating = data.rating;
    if (data.reviewText) updateData.review_text = data.reviewText;

    const { data: review, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', reviewId)
      .select(`
        *,
        guest:users!reviews_guest_id_fkey(id, name),
        property:properties(id, title)
      `)
      .single();

    if (error) {
      throw new DatabaseError(`Error al actualizar review: ${error.message}`);
    }

    return review as Review;
  }

  /**
   * Responder a una review (solo host)
   */
  static async respondToReview(
    reviewId: string,
    hostId: string,
    response: string
  ): Promise<Review> {
    // Verificar que el usuario es el host de la propiedad
    const { data: review, error: fetchError } = await supabase
      .from('reviews')
      .select('*, property:properties(host_id)')
      .eq('id', reviewId)
      .single();

    if (fetchError || !review) {
      throw new NotFoundError('Review');
    }

    if ((review as any).property.host_id !== hostId) {
      throw new ForbiddenError('No tienes permiso para responder a esta review');
    }

    // Actualizar con respuesta
    const { data: updatedReview, error } = await supabase
      .from('reviews')
      .update({
        host_response: response,
        host_response_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', reviewId)
      .select(`
        *,
        guest:users!reviews_guest_id_fkey(id, name),
        property:properties(id, title)
      `)
      .single();

    if (error) {
      throw new DatabaseError(`Error al responder review: ${error.message}`);
    }

    return updatedReview as Review;
  }

  /**
   * Eliminar una review (solo admin)
   */
  static async deleteReview(reviewId: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      throw new DatabaseError(`Error al eliminar review: ${error.message}`);
    }
  }

  /**
   * Calcular rating promedio de una propiedad
   */
  static async calculateAverageRating(propertyId: string): Promise<{
    averageRating: number;
    totalReviews: number;
    categoryAverages: {
      cleanliness: number;
      communication: number;
      accuracy: number;
      location: number;
      value: number;
    };
  }> {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('rating, cleanliness_rating, communication_rating, accuracy_rating, location_rating, value_rating')
      .eq('property_id', propertyId);

    if (error) {
      throw new DatabaseError(`Error al calcular rating: ${error.message}`);
    }

    if (!reviews || reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        categoryAverages: {
          cleanliness: 0,
          communication: 0,
          accuracy: 0,
          location: 0,
          value: 0,
        },
      };
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    const categoryAverages = {
      cleanliness: reviews.filter(r => r.cleanliness_rating).reduce((sum, r) => sum + (r.cleanliness_rating || 0), 0) / reviews.filter(r => r.cleanliness_rating).length || 0,
      communication: reviews.filter(r => r.communication_rating).reduce((sum, r) => sum + (r.communication_rating || 0), 0) / reviews.filter(r => r.communication_rating).length || 0,
      accuracy: reviews.filter(r => r.accuracy_rating).reduce((sum, r) => sum + (r.accuracy_rating || 0), 0) / reviews.filter(r => r.accuracy_rating).length || 0,
      location: reviews.filter(r => r.location_rating).reduce((sum, r) => sum + (r.location_rating || 0), 0) / reviews.filter(r => r.location_rating).length || 0,
      value: reviews.filter(r => r.value_rating).reduce((sum, r) => sum + (r.value_rating || 0), 0) / reviews.filter(r => r.value_rating).length || 0,
    };

    return {
      averageRating: Math.round(averageRating * 100) / 100,
      totalReviews,
      categoryAverages,
    };
  }
}

