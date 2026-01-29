import { createServerSupabaseClient } from '@/lib/supabase';
import { DatabaseError, NotFoundError, BadRequestError, ForbiddenError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';

const supabase = createServerSupabaseClient();

export interface Conversation {
    id: string;
    booking_id: string;
    guest_id: string;
    host_id: string;
    property_id: string;
    last_message_at: string;
    last_message_preview: string;
    guest_unread_count: number;
    host_unread_count: number;
    created_at: string;
    updated_at: string;
    // Relaciones
    booking?: any;
    guest?: any;
    host?: any;
    property?: any;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    message_text: string;
    is_read: boolean;
    read_at?: string;
    created_at: string;
    // Relaciones
    sender?: any;
}

export interface CreateConversationData {
    bookingId: string;
    guestId: string;
    hostId: string;
    propertyId: string;
}

export interface SendMessageData {
    conversationId: string;
    senderId: string;
    messageText: string;
}

export class MessageService {
    /**
     * Crear una nueva conversación (o obtener existente)
     */
    static async createOrGetConversation(data: CreateConversationData): Promise<Conversation> {
        // Verificar si ya existe una conversación para esta reserva
        const { data: existingConversation, error: searchError } = await supabase
            .from('conversations')
            .select(`
        *,
        booking:bookings(id, status, check_in, check_out),
        guest:users!conversations_guest_id_fkey(id, name, email),
        host:users!conversations_host_id_fkey(id, name, email),
        property:properties(id, title)
      `)
            .eq('booking_id', data.bookingId)
            .single();

        if (existingConversation) {
            return existingConversation as unknown as Conversation;
        }

        // Verificar que la reserva existe y que los IDs coinciden
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .select('id, guest_id, host_id, property_id, status')
            .eq('id', data.bookingId)
            .single();

        if (bookingError || !booking) {
            throw new NotFoundError('Reserva');
        }

        // Validar que los IDs corresponden a la reserva
        const bookingData = booking as any;
        if (bookingData.guest_id !== data.guestId || bookingData.host_id !== data.hostId) {
            throw new BadRequestError('Los IDs no corresponden a la reserva');
        }

        // Crear nueva conversación
        const { data: conversation, error } = await supabase
            .from('conversations')
            .insert({
                booking_id: data.bookingId,
                guest_id: data.guestId,
                host_id: data.hostId,
                property_id: data.propertyId,
            })
            .select(`
        *,
        booking:bookings(id, status, check_in, check_out),
        guest:users!conversations_guest_id_fkey(id, name, email),
        host:users!conversations_host_id_fkey(id, name, email),
        property:properties(id, title)
      `)
            .single();

        if (error) {
            throw new DatabaseError(`Error al crear conversación: ${error.message}`);
        }

        return conversation as unknown as Conversation;
    }

    /**
     * Enviar un mensaje
     */
    static async sendMessage(data: SendMessageData): Promise<Message> {
        // Verificar que la conversación existe y que el usuario tiene permiso
        const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .select('id, guest_id, host_id')
            .eq('id', data.conversationId)
            .single();

        if (convError || !conversation) {
            throw new NotFoundError('Conversación');
        }

        // Tipo explícito para evitar error TS
        const conv = conversation as any;

        // Verificar permisos
        if (conv.guest_id !== data.senderId && conv.host_id !== data.senderId) {
            throw new ForbiddenError('No tienes permiso para enviar mensajes en esta conversación');
        }

        // Validar mensaje
        if (!data.messageText || data.messageText.trim().length === 0) {
            throw new BadRequestError('El mensaje no puede estar vacío');
        }

        if (data.messageText.length > 2000) {
            throw new BadRequestError('El mensaje no puede exceder 2000 caracteres');
        }

        // Crear mensaje
        const { data: message, error } = await supabase
            .from('messages')
            .insert({
                conversation_id: data.conversationId,
                sender_id: data.senderId,
                message_text: data.messageText.trim(),
            })
            .select(`
        *,
        sender:users(id, name, email)
      `)
            .single();

        if (error) {
            throw new DatabaseError(`Error al enviar mensaje: ${error.message}`);
        }

        // El trigger de la BD se encargará de actualizar la conversación

        return message as unknown as Message;
    }

    /**
     * Obtener conversaciones de un usuario
     */
    static async getUserConversations(
        userId: string,
        filters?: {
            page?: number;
            limit?: number;
        }
    ): Promise<PaginatedResponse<Conversation>> {
        try {
            const { page, limit, offset } = calculatePagination(filters || {});

            const { data: conversations, error, count } = await supabase
                .from('conversations')
                .select(`
        *,
        booking:bookings(id, status, check_in, check_out),
        guest:users!conversations_guest_id_fkey(id, name, email),
        host:users!conversations_host_id_fkey(id, name, email),
        property:properties(id, title)
      `, { count: 'exact' })
                .or(`guest_id.eq.${userId},host_id.eq.${userId}`)
                .order('last_message_at', { ascending: false })
                .range(offset, offset + limit - 1);

            if (error) {
                console.error('Error al obtener conversaciones:', error);
                return createPaginatedResponse([], 0, page, limit);
            }

            return createPaginatedResponse((conversations || []) as unknown as Conversation[], count || 0, page, limit);
        } catch (error) {
            console.error('Error en getUserConversations:', error);
            return createPaginatedResponse([], 0, 1, 20);
        }
    }

    /**
     * Obtener mensajes de una conversación
     */
    static async getConversationMessages(
        conversationId: string,
        userId: string,
        filters?: {
            page?: number;
            limit?: number;
        }
    ): Promise<PaginatedResponse<Message>> {
        // Verificar acceso a la conversación
        const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .select('id, guest_id, host_id')
            .eq('id', conversationId)
            .single();

        if (convError || !conversation) {
            throw new NotFoundError('Conversación');
        }

        const conv = conversation as any;
        if (conv.guest_id !== userId && conv.host_id !== userId) {
            throw new ForbiddenError('No tienes acceso a esta conversación');
        }

        const { page, limit, offset } = calculatePagination(filters || { limit: 50 });

        const { data: messages, error, count } = await supabase
            .from('messages')
            .select(`
        *,
        sender:users(id, name, email)
      `, { count: 'exact' })
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true })
            .range(offset, offset + limit - 1);

        if (error) {
            throw new DatabaseError(`Error al obtener mensajes: ${error.message}`);
        }

        return createPaginatedResponse((messages || []) as unknown as Message[], count || 0, page, limit);
    }

    /**
     * Marcar mensajes como leídos
     */
    static async markMessagesAsRead(conversationId: string, userId: string): Promise<number> {
        // Verificar acceso
        const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .select('id, guest_id, host_id')
            .eq('id', conversationId)
            .single();

        if (convError || !conversation) {
            throw new NotFoundError('Conversación');
        }

        const conv = conversation as any;
        if (conv.guest_id !== userId && conv.host_id !== userId) {
            throw new ForbiddenError('No tienes acceso a esta conversación');
        }

        // Marcar mensajes como leídos (solo los que no son del usuario actual)
        const { data: updatedMessages, error } = await supabase
            .from('messages')
            .update({
                is_read: true,
                read_at: new Date().toISOString(),
            })
            .eq('conversation_id', conversationId)
            .neq('sender_id', userId)
            .eq('is_read', false)
            .select('id');

        if (error) {
            throw new DatabaseError(`Error al marcar mensajes: ${error.message}`);
        }

        // Resetear contador de no leídos usando la función de BD
        await supabase.rpc('reset_unread_count', {
            p_conversation_id: conversationId,
            p_user_id: userId,
        });

        return updatedMessages?.length || 0;
    }

    static async getUnreadCount(userId: string): Promise<number> {
        try {
            const { data: conversations, error } = await supabase
                .from('conversations')
                .select('guest_id, host_id, guest_unread_count, host_unread_count')
                .or(`guest_id.eq.${userId},host_id.eq.${userId}`);

            if (error) {
                console.error('Error al contar mensajes (tabla no existe):', error.message);
                return 0; // Retornar 0 en lugar de fallar
            }

            if (!conversations) return 0;

            // Sumar los contadores según el rol del usuario
            const totalUnread = (conversations || []).reduce((sum, convRaw) => {
                const conv = convRaw as any;
                if (conv.guest_id === userId) {
                    return sum + conv.guest_unread_count;
                } else if (conv.host_id === userId) {
                    return sum + conv.host_unread_count;
                }
                return sum;
            }, 0);

            return totalUnread;
        } catch (error) {
            console.error('Error en getUnreadCount:', error);
            return 0; // Retornar 0 en lugar de fallar
        }
    }

    /**
     * Obtener una conversación por ID
     */
    static async getConversationById(conversationId: string, userId: string): Promise<Conversation> {
        const { data: conversation, error } = await supabase
            .from('conversations')
            .select(`
        *,
        booking:bookings(id, status, check_in, check_out),
        guest:users!conversations_guest_id_fkey(id, name, email),
        host:users!conversations_host_id_fkey(id, name, email),
        property:properties(id, title, address, city)
      `)
            .eq('id', conversationId)
            .single();

        if (error || !conversation) {
            throw new NotFoundError('Conversación');
        }

        // Verificar acceso
        const conv = conversation as any;
        if (conv.guest_id !== userId && conv.host_id !== userId) {
            throw new ForbiddenError('No tienes acceso a esta conversación');
        }

        return conversation as unknown as Conversation;
    }

    /**
     * Obtener conversación por booking ID
     */
    static async getConversationByBookingId(bookingId: string, userId: string): Promise<Conversation | null> {
        const { data: conversation, error } = await supabase
            .from('conversations')
            .select(`
        *,
        booking:bookings(id, status, check_in, check_out),
        guest:users!conversations_guest_id_fkey(id, name, email),
        host:users!conversations_host_id_fkey(id, name, email),
        property:properties(id, title, address, city)
      `)
            .eq('booking_id', bookingId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null; // No existe conversación
            }
            throw new DatabaseError(`Error al obtener conversación: ${error.message}`);
        }

        // Verificar acceso
        const conv = conversation as any;
        if (conv.guest_id !== userId && conv.host_id !== userId) {
            throw new ForbiddenError('No tienes acceso a esta conversación');
        }

        return conversation as unknown as Conversation;
    }

    /**
     * Eliminar una conversación (solo admin)
     */
    static async deleteConversation(conversationId: string): Promise<void> {
        const { error } = await supabase
            .from('conversations')
            .delete()
            .eq('id', conversationId);

        if (error) {
            throw new DatabaseError(`Error al eliminar conversación: ${error.message}`);
        }
    }
}
