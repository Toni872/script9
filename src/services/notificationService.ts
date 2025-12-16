import { createServerSupabaseClient } from '@/lib/supabase';
import { DatabaseError, NotFoundError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';

const supabase = createServerSupabaseClient();

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, any>;
  is_read: boolean;
  created_at: string;
  read_at?: string;
}

export interface CreateNotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
}

export class NotificationService {
  /**
   * Crear una nueva notificación
   */
  static async createNotification(data: CreateNotificationData): Promise<Notification> {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data || {},
      })
      .select()
      .single();

    if (error) {
      throw new DatabaseError(`Error al crear notificación: ${error.message}`);
    }

    return notification;
  }

  /**
   * Obtener notificaciones de un usuario
   */
  static async getUserNotifications(
    userId: string,
    filters?: {
      unreadOnly?: boolean;
      page?: number;
      limit?: number;
    }
  ): Promise<PaginatedResponse<Notification>> {
    const { page, limit, offset } = calculatePagination(filters || {});

    let query = supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    if (filters?.unreadOnly) {
      query = query.eq('is_read', false);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: notifications, error, count } = await query;

    if (error) {
      throw new DatabaseError(`Error al obtener notificaciones: ${error.message}`);
    }

    return createPaginatedResponse(notifications || [], count || 0, page, limit);
  }

  /**
   * Marcar notificación como leída
   */
  static async markAsRead(notificationId: string, userId: string): Promise<Notification> {
    const { data: notification, error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Notificación');
      }
      throw new DatabaseError(`Error al marcar notificación: ${error.message}`);
    }

    return notification;
  }

  /**
   * Marcar todas las notificaciones como leídas
   */
  static async markAllAsRead(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_read', false)
      .select('id');

    if (error) {
      throw new DatabaseError(`Error al marcar notificaciones: ${error.message}`);
    }

    return data?.length || 0;
  }

  /**
   * Eliminar una notificación
   */
  static async deleteNotification(notificationId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      throw new DatabaseError(`Error al eliminar notificación: ${error.message}`);
    }
  }

  /**
   * Obtener conteo de notificaciones no leídas
   */
  static async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      throw new DatabaseError(`Error al contar notificaciones: ${error.message}`);
    }

    return count || 0;
  }

  // Métodos helper para crear notificaciones específicas

  static async notifyNewBooking(hostId: string, bookingData: any): Promise<void> {
    await this.createNotification({
      userId: hostId,
      type: 'booking_created',
      title: 'Nueva reserva',
      message: `Tienes una nueva reserva para ${bookingData.propertyName}`,
      data: { bookingId: bookingData.bookingId },
    });
  }

  static async notifyBookingConfirmed(guestId: string, bookingData: any): Promise<void> {
    await this.createNotification({
      userId: guestId,
      type: 'booking_confirmed',
      title: 'Reserva confirmada',
      message: `Tu reserva en ${bookingData.propertyName} ha sido confirmada`,
      data: { bookingId: bookingData.bookingId },
    });
  }

  static async notifyBookingCancelled(userId: string, bookingData: any, cancelledBy: string): Promise<void> {
    await this.createNotification({
      userId,
      type: 'booking_cancelled',
      title: 'Reserva cancelada',
      message: `La reserva en ${bookingData.propertyName} ha sido cancelada ${cancelledBy === 'guest' ? 'por el huésped' : 'por el anfitrión'}`,
      data: { bookingId: bookingData.bookingId },
    });
  }

  static async notifyNewReview(hostId: string, reviewData: any): Promise<void> {
    await this.createNotification({
      userId: hostId,
      type: 'review_received',
      title: 'Nueva reseña',
      message: `Has recibido una nueva reseña de ${reviewData.rating} estrellas`,
      data: { reviewId: reviewData.reviewId, propertyId: reviewData.propertyId },
    });
  }

  static async notifyReviewResponse(guestId: string, propertyName: string): Promise<void> {
    await this.createNotification({
      userId: guestId,
      type: 'review_response',
      title: 'Respuesta a tu reseña',
      message: `El anfitrión ha respondido a tu reseña de ${propertyName}`,
      data: { propertyName },
    });
  }

  static async notifyPaymentReceived(hostId: string, amount: number): Promise<void> {
    await this.createNotification({
      userId: hostId,
      type: 'payment_received',
      title: 'Pago recibido',
      message: `Has recibido un pago de €${amount.toFixed(2)}`,
      data: { amount },
    });
  }
}

