import { NextApiRequest, NextApiResponse } from 'next';
import { BookingService, BookingFilters } from '@/services/bookingService';
import { validateData, createBookingSchema, updateBookingStatusSchema, searchBookingsSchema } from '@/utils/validation';
import { withErrorHandler } from '@/utils/errors';
import { AuthenticatedRequest, requireAuth } from '@/middleware/auth';
import { rateLimiters } from '@/middleware/rateLimiter';
import { createServerSupabaseClient } from '@/lib/supabase';

const supabase = createServerSupabaseClient();

/**
 * GET /api/bookings - Obtener reservas con filtros
 */
export const getBookings = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.general(req, res, async () => {
            const validatedFilters = validateData(searchBookingsSchema, req.query);

            // Construir filtros con tipos correctos
            const filters: BookingFilters = {
                ...validatedFilters,
                startDate: validatedFilters.startDate ? new Date(validatedFilters.startDate) : undefined,
                endDate: validatedFilters.endDate ? new Date(validatedFilters.endDate) : undefined,
            };

            // Filtrar solo las reservas del usuario actual, a menos que sea admin
            if (authReq.user.role !== 'admin') {
                // Si es guest, ver solo sus propias reservas
                // Si es host, ver las reservas de sus propiedades
                if (authReq.user.role === 'guest') {
                    filters.guestId = authReq.user.id;
                } else if (authReq.user.role === 'host') {
                    filters.hostId = authReq.user.id;
                }
            }

            const result = await BookingService.searchBookings(filters);
            res.status(200).json(result);
        });
    });
});

/**
 * POST /api/bookings - Crear una nueva reserva
 */
export const createBooking = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.create(req, res, async () => {
            const data = validateData(createBookingSchema, req.body);

            // Asegurar que el guestId sea el usuario autenticado
            data.guestId = authReq.user.id;

            // Convertir fechas de string a Date
            const bookingData = {
                ...data,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            };

            const booking = await BookingService.createBooking(bookingData);
            res.status(201).json(booking);
        });
    });
});

/**
 * GET /api/bookings/[id] - Obtener una reserva por ID
 */
export const getBookingById = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.general(req, res, async () => {
            const { id } = req.query;
            const booking = await BookingService.getBookingById(id as string);

            // Verificar que el usuario tiene acceso a esta reserva
            // Necesitamos obtener la información de la propiedad para verificar el host
            const { data: property } = await supabase.from('properties').select('host_id').eq('id', booking.property_id).single();

            if (authReq.user.role !== 'admin' &&
                booking.guest_id !== authReq.user.id &&
                property?.host_id !== authReq.user.id) {
                res.status(403).json({
                    error: 'Forbidden',
                    message: 'No tienes permisos para ver esta reserva'
                });
                return;
            }

            res.status(200).json(booking);
        });
    });
});

/**
 * PATCH /api/bookings/[id]/status - Actualizar estado de una reserva
 */
export const updateBookingStatus = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;
        const { status } = validateData(updateBookingStatusSchema, req.body);

        // Obtener la reserva para verificar permisos
        const booking = await BookingService.getBookingById(id as string);
        const { data: property } = await supabase.from('properties').select('host_id').eq('id', booking.property_id).single();

        // Solo el host o admin pueden confirmar/completar
        // Solo el guest o admin pueden cancelar
        const isHost = property?.host_id === authReq.user.id;
        const isGuest = booking.guest_id === authReq.user.id;
        const isAdmin = authReq.user.role === 'admin';

        if (!isAdmin) {
            if (status === 'confirmed' || status === 'completed') {
                if (!isHost) {
                    res.status(403).json({
                        error: 'Forbidden',
                        message: 'Solo el anfitrión puede confirmar o completar reservas'
                    });
                    return;
                }
            } else if (status === 'cancelled') {
                if (!isGuest && !isHost) {
                    res.status(403).json({
                        error: 'Forbidden',
                        message: 'No tienes permisos para cancelar esta reserva'
                    });
                    return;
                }
            }
        }

        const updatedBooking = await BookingService.updateBookingStatus(id as string, status);
        res.status(200).json(updatedBooking);
    });
});

/**
 * POST /api/bookings/[id]/confirm - Confirmar una reserva (shortcut)
 */
export const confirmBooking = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;

        // Verificar que el usuario es el host
        const booking = await BookingService.getBookingById(id as string);
        const { data: property } = await supabase.from('properties').select('host_id').eq('id', booking.property_id).single();
        if (property?.host_id !== authReq.user.id && authReq.user.role !== 'admin') {
            res.status(403).json({
                error: 'Forbidden',
                message: 'Solo el anfitrión puede confirmar reservas'
            });
            return;
        }

        const confirmedBooking = await BookingService.confirmBooking(id as string);
        res.status(200).json(confirmedBooking);
    });
});

/**
 * POST /api/bookings/[id]/cancel - Cancelar una reserva (shortcut)
 */
export const cancelBooking = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;

        // Verificar que el usuario es el guest o el host
        const booking = await BookingService.getBookingById(id as string);
        const { data: property } = await supabase.from('properties').select('host_id').eq('id', booking.property_id).single();
        const isGuest = booking.guest_id === authReq.user.id;
        const isHost = property?.host_id === authReq.user.id;

        if (!isGuest && !isHost && authReq.user.role !== 'admin') {
            res.status(403).json({
                error: 'Forbidden',
                message: 'No tienes permisos para cancelar esta reserva'
            });
            return;
        }

        const cancelledBooking = await BookingService.cancelBooking(id as string);
        res.status(200).json(cancelledBooking);
    });
});

/**
 * POST /api/bookings/check-availability - Verificar disponibilidad
 */
export const checkAvailability = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await rateLimiters.general(req, res, async () => {
        const { propertyId, startTime, endTime } = req.body;

        if (!propertyId || !startTime || !endTime) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'propertyId, startTime y endTime son requeridos'
            });
            return;
        }

        const isAvailable = await BookingService.checkAvailability(
            propertyId,
            new Date(startTime),
            new Date(endTime)
        );

        res.status(200).json({ available: isAvailable });
    });
});

/**
 * POST /api/bookings/calculate-price - Calcular precio de reserva
 */
export const calculatePrice = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await rateLimiters.general(req, res, async () => {
        const { propertyId, startTime, endTime } = req.body;

        if (!propertyId || !startTime || !endTime) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'propertyId, startTime y endTime son requeridos'
            });
            return;
        }

        const price = await BookingService.calculateBookingPrice(
            propertyId,
            new Date(startTime),
            new Date(endTime)
        );

        res.status(200).json({ price });
    });
});

/**
 * GET /api/bookings/upcoming - Obtener reservas próximas
 */
export const getUpcomingBookings = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async () => {
        await rateLimiters.general(req, res, async () => {
            const hoursAhead = parseInt(req.query.hoursAhead as string) || 24;
            const bookings = await BookingService.getUpcomingBookings(hoursAhead);
            res.status(200).json(bookings);
        });
    });
});

/**
 * GET /api/bookings/stats - Obtener estadísticas de reservas
 */
export const getBookingStats = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.general(req, res, async () => {
            const filters: BookingFilters = {};

            // Si es host, solo sus propiedades
            if (authReq.user.role === 'host') {
                filters.hostId = authReq.user.id;
            }

            // Admin puede filtrar por propertyId o hostId específico
            if (authReq.user.role === 'admin') {
                if (req.query.propertyId) filters.propertyId = req.query.propertyId as string;
                if (req.query.hostId) filters.hostId = req.query.hostId as string;
            }

            if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
            if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);

            const stats = await BookingService.getBookingStats(filters);
            res.status(200).json(stats);
        });
    });
});

