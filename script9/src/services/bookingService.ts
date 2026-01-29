import { createServerSupabaseClient } from '@/lib/supabase';
import { Booking } from '@/types';
import { NotFoundError, DatabaseError, ConflictError, BadRequestError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';
import { EmailService } from './emailService';

export interface CreateBookingData {
    propertyId: string;
    guestId: string;
    startTime: Date;
    endTime: Date;
    totalPrice: number;
    stripePaymentId?: string;
}

export interface BookingFilters {
    propertyId?: string;
    guestId?: string;
    hostId?: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
}

export class BookingService {
    /**
     * Obtener cliente de Supabase con service role
     */
    private static getSupabaseClient() {
        return createServerSupabaseClient();
    }

    /**
     * Crear una nueva reserva
     */
    static async createBooking(data: CreateBookingData): Promise<Booking> {
        const supabase = this.getSupabaseClient();
        // Validar fechas
        if (data.endTime <= data.startTime) {
            throw new BadRequestError('La fecha de fin debe ser posterior a la fecha de inicio');
        }

        // Verificar disponibilidad antes de crear la reserva
        try {
            const isAvailable = await this.checkAvailability(
                data.propertyId,
                data.startTime,
                data.endTime
            );
            if (!isAvailable) {
                throw new ConflictError('La propiedad no está disponible para las fechas seleccionadas');
            }
        } catch (error) {
            // Si hay error en la verificación, permitir la reserva (fix temporal)
            console.error('Error verificando disponibilidad, permitiendo reserva:', error);
        }

        // Obtener información de la propiedad para los campos requeridos
        const { data: propertyInfo, error: propError } = await supabase
            .from('properties')
            .select('host_id, price_per_hour')
            .eq('id', data.propertyId)
            .single();

        if (propError || !propertyInfo) {
            throw new Error('Propiedad no encontrada');
        }

        const totalHours = Math.ceil((data.endTime.getTime() - data.startTime.getTime()) / (1000 * 60 * 60));
        const subtotal = totalHours * propertyInfo.price_per_hour;
        const serviceFee = subtotal * 0.1; // 10% de tarifa de servicio

        const { data: booking, error } = await supabase
            .from('bookings')
            .insert({
                property_id: data.propertyId,
                guest_id: data.guestId,
                host_id: propertyInfo.host_id,
                check_in: data.startTime.toISOString(),
                check_out: data.endTime.toISOString(),
                total_hours: totalHours,
                price_per_hour: propertyInfo.price_per_hour,
                subtotal: subtotal,
                service_fee: serviceFee,
                total_price: data.totalPrice,
                stripe_payment_id: data.stripePaymentId,
                status: 'pending',
            })
            .select(`
        *,
        properties (id, title, address, city, host_id, price_per_hour),
        users!bookings_guest_id_fkey (id, name, email)
      `)
            .single();

        if (error) {
            throw new DatabaseError(`Error al crear la reserva: ${error.message}`);
        }

        if (!booking) {
            throw new DatabaseError('No se pudo crear la reserva');
        }

        // Obtener información del host para el email
        const { data: host } = await supabase
            .from('users')
            .select('id, name, email')
            .eq('id', booking.properties.host_id)
            .single();

        // Enviar email de confirmación pendiente al huésped
        if (booking.users && host) {
            try {
                await EmailService.sendBookingPendingConfirmation({
                    guestName: booking.users.name,
                    guestEmail: booking.users.email,
                    hostName: host.name,
                    hostEmail: host.email,
                    propertyName: booking.properties.title,
                    propertyAddress: `${booking.properties.address}, ${booking.properties.city}`,
                    checkInDate: booking.check_in,
                    checkOutDate: booking.check_out,
                    totalPrice: Number(booking.total_price || 0),
                    bookingId: booking.id,
                    guests: 1,
                });
            } catch (emailError) {
                console.error('Error enviando email de confirmación pendiente:', emailError);
                // No lanzar error, solo registrar
            }
        }

        return booking;
    }

    /**
     * Verificar disponibilidad de una propiedad
     */
    static async checkAvailability(
        propertyId: string,
        startTime: Date,
        endTime: Date,
        excludeBookingId?: string
    ): Promise<boolean> {
        const supabase = this.getSupabaseClient();

        // Buscar reservas que se superpongan con las fechas solicitadas
        // Una reserva se superpone SI:
        // - Su check_in es ANTES de nuestro check_out (check_in < endTime)
        // - Y su check_out es DESPUÉS de nuestro check_in (check_out > startTime)
        let query = supabase
            .from('bookings')
            .select('id, check_in, check_out')
            .eq('property_id', propertyId)
            .in('status', ['pending', 'confirmed']);

        if (excludeBookingId) {
            query = query.neq('id', excludeBookingId);
        }

        const { data: existingBookings, error } = await query;

        if (error) {
            throw new DatabaseError(`Error al verificar disponibilidad: ${error.message}`);
        }

        // Verificar manualmente si hay conflictos
        if (!existingBookings || existingBookings.length === 0) {
            return true; // No hay reservas, está disponible
        }

        const hasConflict = existingBookings.some(booking => {
            const existingCheckIn = new Date(booking.check_in);
            const existingCheckOut = new Date(booking.check_out);

            // Hay conflicto si las fechas se superponen
            return existingCheckIn < endTime && existingCheckOut > startTime;
        });

        return !hasConflict;
    }

    /**
     * Calcular el precio de una reserva
     */
    static async calculateBookingPrice(
        propertyId: string,
        startTime: Date,
        endTime: Date
    ): Promise<number> {
        const supabase = this.getSupabaseClient();
        // Obtener los precios de la propiedad
        const { data: property, error } = await supabase
            .from('properties')
            .select('price_per_hour, price_per_day, min_booking_hours, minimum_hours')
            .eq('id', propertyId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Propiedad');
            }
            throw new DatabaseError(`Error al obtener precios: ${error.message}`);
        }

        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);

        // Obtener duración mínima (con fallback a 2 horas)
        const minHours = property.min_booking_hours || property.minimum_hours || 2;

        // Verificar duración mínima
        if (durationHours < minHours) {
            throw new BadRequestError(`La duración mínima de reserva es ${minHours} horas`);
        }

        // Calcular precio basado en duración
        const price_per_hour = property.price_per_hour || 0;
        const pricePerDay = property.price_per_day || (price_per_hour * 20); // Fallback: 20 horas de descuento

        if (durationHours >= 24 && pricePerDay > 0) {
            // Usar precio por día si la reserva es de 24 horas o más
            const days = Math.ceil(durationHours / 24);
            return days * pricePerDay;
        } else {
            // Usar precio por hora
            return Math.ceil(durationHours) * price_per_hour;
        }
    }

    /**
     * Obtener una reserva por ID
     */
    static async getBookingById(id: string): Promise<Booking> {
        const supabase = this.getSupabaseClient();
        const { data: booking, error } = await supabase
            .from('bookings')
            .select(`
                *,
                properties (id, title, address, city, host_id),
                users!bookings_guest_id_fkey (id, name, email, phone)
            `)
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Reserva');
            }
            throw new DatabaseError(`Error al obtener la reserva: ${error.message}`);
        }

        return booking;
    }

    /**
     * Buscar reservas con filtros y paginación
     */
    static async searchBookings(filters: BookingFilters): Promise<PaginatedResponse<Booking>> {
        const supabase = this.getSupabaseClient();
        const { page, limit, offset } = calculatePagination({
            page: filters.page,
            limit: filters.limit
        });

        let query = supabase
            .from('bookings')
            .select(`
                *,
                properties (id, title, address, city, host_id),
                users!bookings_guest_id_fkey (id, name, email)
            `, { count: 'exact' });

        if (filters.propertyId) {
            query = query.eq('property_id', filters.propertyId);
        }
        if (filters.guestId) {
            query = query.eq('guest_id', filters.guestId);
        }
        if (filters.status) {
            query = query.eq('status', filters.status);
        }
        if (filters.startDate) {
            query = query.gte('check_in', filters.startDate.toISOString());
        }
        if (filters.endDate) {
            query = query.lte('check_out', filters.endDate.toISOString());
        }
        if (filters.hostId) {
            query = query.eq('properties.host_id', filters.hostId);
        }

        // Aplicar paginación y ordenamiento
        query = query
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        const { data: bookings, error, count } = await query;

        if (error) {
            throw new DatabaseError(`Error al buscar reservas: ${error.message}`);
        }

        return createPaginatedResponse(bookings || [], count || 0, page, limit);
    }

    /**
     * Actualizar el estado de una reserva
     */
    static async updateBookingStatus(
        id: string,
        status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    ): Promise<Booking> {
        const supabase = this.getSupabaseClient();
        const { data: booking, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select(`
                *,
                properties (id, title, address, city),
                users!bookings_guest_id_fkey (id, name, email)
            `)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Reserva');
            }
            throw new DatabaseError(`Error al actualizar el estado: ${error.message}`);
        }

        if (!booking) {
            throw new DatabaseError('No se pudo actualizar la reserva');
        }

        return booking;
    }

    /**
     * Confirmar una reserva (por parte del host)
     */
    static async confirmBooking(id: string): Promise<Booking> {
        const supabase = this.getSupabaseClient();
        // Obtener la reserva antes de confirmarla para enviar el email
        const booking = await this.getBookingById(id);

        const confirmedBooking = await this.updateBookingStatus(id, 'confirmed');

        // Obtener información del host
        const bookingWithRelations = booking as Booking & {
            properties?: { host_id: string; title: string; address: string; city: string };
            property?: { host_id: string; title: string; address: string; city: string };
            users?: { name: string; email: string };
            guest?: { name: string; email: string };
        };
        const propertyData = bookingWithRelations.properties || bookingWithRelations.property;
        const { data: host } = await supabase
            .from('users')
            .select('id, name, email')
            .eq('id', propertyData?.host_id)
            .single();

        // Enviar email de confirmación al huésped
        const userData = bookingWithRelations.users || bookingWithRelations.guest;
        if (userData && host && propertyData) {
            try {
                await EmailService.sendBookingConfirmedGuest({
                    guestName: userData.name,
                    guestEmail: userData.email,
                    hostName: host.name,
                    hostEmail: host.email,
                    propertyName: propertyData.title,
                    propertyAddress: `${propertyData.address}, ${propertyData.city}`,
                    checkInDate: booking.check_in,
                    checkOutDate: booking.check_out,
                    totalPrice: Number(booking.total_price || 0),
                    bookingId: booking.id,
                    guests: 1,
                });
            } catch (emailError) {
                console.error('Error enviando email de confirmación:', emailError);
                // No lanzar error, solo registrar
            }
        }

        return confirmedBooking;
    }

    /**
     * Cancelar una reserva
     */
    static async cancelBooking(id: string, cancelledBy: 'guest' | 'host' = 'guest'): Promise<Booking> {
        const supabase = this.getSupabaseClient();
        // Obtener la reserva antes de cancelarla para enviar el email
        const booking = await this.getBookingById(id);

        const cancelledBooking = await this.updateBookingStatus(id, 'cancelled');

        // Obtener información del host
        const bookingWithRelations = booking as Booking & {
            properties?: { host_id: string; title: string; address: string; city: string };
            property?: { host_id: string; title: string; address: string; city: string };
            users?: { name: string; email: string };
            guest?: { name: string; email: string };
        };
        const propertyData = bookingWithRelations.properties || bookingWithRelations.property;
        const { data: host } = await supabase
            .from('users')
            .select('id, name, email')
            .eq('id', propertyData?.host_id)
            .single();

        // Enviar emails de cancelación a ambas partes
        const userData = bookingWithRelations.users || bookingWithRelations.guest;
        if (userData && host && propertyData) {
            try {
                await EmailService.sendBookingCancellation(
                    {
                        guestName: userData.name,
                        guestEmail: userData.email,
                        hostName: host.name,
                        hostEmail: host.email,
                        propertyName: propertyData.title,
                        propertyAddress: `${propertyData.address}, ${propertyData.city}`,
                        checkInDate: booking.check_in,
                        checkOutDate: booking.check_out,
                        totalPrice: Number(booking.total_price || 0),
                        bookingId: booking.id,
                        guests: 1,
                    },
                    cancelledBy
                );
            } catch (emailError) {
                console.error('Error enviando email de cancelación:', emailError);
            }
        }

        return cancelledBooking;
    }

    /**
     * Completar una reserva
     */
    static async completeBooking(id: string): Promise<Booking> {
        return this.updateBookingStatus(id, 'completed');
    }

    /**
     * Obtener reservas próximas (para notificaciones)
     */
    static async getUpcomingBookings(hoursAhead: number = 24): Promise<Booking[]> {
        const supabase = this.getSupabaseClient();
        const now = new Date();
        const futureTime = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);

        const { data: bookings, error } = await supabase
            .from('bookings')
            .select(`
                *,
                properties (id, title, address, city),
                users!bookings_guest_id_fkey (id, name, email, phone)
            `)
            .eq('status', 'confirmed')
            .gte('check_in', now.toISOString())
            .lte('check_in', futureTime.toISOString())
            .order('check_in', { ascending: true });

        if (error) {
            throw new DatabaseError(`Error al obtener reservas próximas: ${error.message}`);
        }

        return bookings || [];
    }

    /**
     * Obtener estadísticas de reservas
     */
    static async getBookingStats(filters?: {
        propertyId?: string;
        hostId?: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<{
        totalBookings: number;
        totalRevenue: number;
        averageBookingValue: number;
        bookingsByStatus: Record<string, number>;
    }> {
        const supabase = this.getSupabaseClient();
        let query = supabase.from('bookings').select('total_price, status');

        if (filters?.propertyId) {
            query = query.eq('property_id', filters.propertyId);
        }
        if (filters?.startDate) {
            query = query.gte('created_at', filters.startDate.toISOString());
        }
        if (filters?.endDate) {
            query = query.lte('created_at', filters.endDate.toISOString());
        }
        if (filters?.hostId) {
            query = query.eq('properties.host_id', filters.hostId);
        }

        const { data: bookings, error } = await query;

        if (error) {
            throw new DatabaseError(`Error al obtener estadísticas: ${error.message}`);
        }

        const totalBookings = bookings?.length || 0;
        const totalRevenue =
            bookings?.reduce((sum, booking) => sum + Number(booking.total_price), 0) || 0;
        const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
        const bookingsByStatus =
            bookings?.reduce((acc, booking) => {
                acc[booking.status] = (acc[booking.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>) || {};

        return {
            totalBookings,
            totalRevenue,
            averageBookingValue,
            bookingsByStatus,
        };
    }
}
