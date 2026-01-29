import { z, ZodIssue } from 'zod';

/**
 * Schemas de validación con Zod para todos los endpoints
 */

// ==================== USUARIOS ====================
export const createUserSchema = z.object({
    email: z.string().email('Email inválido'),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    phone: z.string().optional(),
    role: z.enum(['host', 'guest', 'admin']).optional(),
});

export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    role: z.enum(['host', 'guest', 'admin']).optional(),
});

// ==================== PROPIEDADES ====================
export const createPropertySchema = z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
    description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
    city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
    region: z.string().min(2, 'La región debe tener al menos 2 caracteres'),
    latitude: z.number().min(-90).max(90, 'Latitud inválida'),
    longitude: z.number().min(-180).max(180, 'Longitud inválida'),
    price_per_hour: z.number().positive('El precio por hora debe ser positivo'),
    price_per_day: z.number().positive('El precio por día debe ser positivo'),
    min_booking_hours: z.number().int().min(1, 'Las horas mínimas deben ser al menos 1'),
    max_guests: z.number().int().positive('El número máximo de huéspedes debe ser positivo'),
    features: z.array(z.string()).optional().default([]),
    host_id: z.string().uuid('ID de anfitrión inválido'),
});

export const updatePropertySchema = createPropertySchema.partial().omit({ host_id: true });

export const searchPropertiesSchema = z.object({
    city: z.string().optional(),
    region: z.string().optional(),
    maxPricePerHour: z.number().positive().optional(),
    minGuests: z.number().int().positive().optional(),
    features: z.array(z.string()).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    radiusKm: z.number().positive().max(100).optional(),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(100).optional().default(20),
});

// ==================== RESERVAS ====================
export const createBookingSchema = z.object({
    propertyId: z.string().uuid('ID de propiedad inválido'),
    guestId: z.string().uuid('ID de huésped inválido'),
    startTime: z.string().datetime('Fecha de inicio inválida'),
    endTime: z.string().datetime('Fecha de fin inválida'),
    totalPrice: z.number().positive('El precio total debe ser positivo'),
    stripePaymentId: z.string().optional(),
}).refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),
    {
        message: 'La fecha de fin debe ser posterior a la fecha de inicio',
        path: ['endTime'],
    }
);

export const updateBookingStatusSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
});

export const searchBookingsSchema = z.object({
    propertyId: z.string().uuid().optional(),
    guestId: z.string().uuid().optional(),
    hostId: z.string().uuid().optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(100).optional().default(20),
});

// ==================== IMÁGENES ====================
export const uploadImageSchema = z.object({
    fileName: z.string().min(1, 'El nombre del archivo es requerido'),
    fileType: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/, 'Tipo de archivo no permitido'),
    propertyId: z.string().uuid('ID de propiedad inválido').optional(),
});

// ==================== PAGOS ====================
export const createPaymentIntentSchema = z.object({
    bookingId: z.string().uuid('ID de reserva inválido'),
    amount: z.number().positive('El monto debe ser positivo'),
    currency: z.string().length(3, 'Código de moneda inválido').default('eur'),
});

// ==================== GEOESPACIAL ====================
export const geospatialSearchSchema = z.object({
    lat: z.number().min(-90).max(90, 'Latitud inválida'),
    lon: z.number().min(-180).max(180, 'Longitud inválida'),
    radius: z.number().positive().max(100000, 'El radio máximo es 100km'),
    limit: z.number().int().positive().max(100).optional().default(20),
});

// ==================== HELPERS ====================

/**
 * Valida datos contra un schema de Zod
 * @param schema Schema de Zod
 * @param data Datos a validar
 * @returns Datos validados o lanza un error
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((err: ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message,
        }));

        throw new ValidationError('Datos de entrada inválidos', errors);
    }

    return result.data;
}

/**
 * Clase de error personalizada para validación
 */
export class ValidationError extends Error {
    public errors: Array<{ field: string; message: string }>;
    public statusCode: number;

    constructor(message: string, errors: Array<{ field: string; message: string }>) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
        this.statusCode = 400;
    }
}

