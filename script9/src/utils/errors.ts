import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Clases de errores personalizadas para el manejo centralizado
 */

export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = 'Recurso') {
        super(`${resource} no encontrado`, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'No autorizado') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Acceso prohibido') {
        super(message, 403);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = 'Solicitud inválida') {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Conflicto con el estado actual del recurso') {
        super(message, 409);
    }
}

export class DatabaseError extends AppError {
    constructor(message: string = 'Error de base de datos') {
        super(message, 500, false);
    }
}

/**
 * Manejador centralizado de errores
 */
export function handleError(error: unknown, res: NextApiResponse) {
    console.error('Error:', error);

    // Error de validación (de Zod)
    if (error && typeof error === 'object' && 'errors' in error && Array.isArray((error as { errors: unknown }).errors)) {
        const validationError = error as { message?: string; errors: unknown[] };
        return res.status(400).json({
            error: 'Validation Error',
            message: validationError.message || 'Datos de entrada inválidos',
            details: validationError.errors,
        });
    }

    // Error personalizado de la aplicación
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.name,
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }

    // Error de Supabase
    if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const supabaseError = error as { code: string; message: string;[key: string]: unknown };

        // Mapear códigos de error de PostgreSQL comunes
        const statusCode = getSupabaseErrorStatusCode(supabaseError.code);

        return res.status(statusCode).json({
            error: 'Database Error',
            message: supabaseError.message,
            code: supabaseError.code,
            ...(process.env.NODE_ENV === 'development' && { details: supabaseError }),
        });
    }

    // Error genérico
    if (error instanceof Error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Ha ocurrido un error inesperado',
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }

    // Error desconocido
    return res.status(500).json({
        error: 'Unknown Error',
        message: 'Ha ocurrido un error inesperado',
    });
}

/**
 * Mapea códigos de error de PostgreSQL a códigos HTTP
 */
function getSupabaseErrorStatusCode(code: string): number {
    const errorMap: { [key: string]: number } = {
        '23505': 409, // unique_violation (conflicto)
        '23503': 400, // foreign_key_violation
        '23502': 400, // not_null_violation
        '23514': 400, // check_violation
        '42501': 403, // insufficient_privilege
        'PGRST116': 404, // not found
        '22P02': 400, // invalid_text_representation
        '22003': 400, // numeric_value_out_of_range
    };

    return errorMap[code] || 500;
}

/**
 * Wrapper para manejo de errores en controladores
 */
export function withErrorHandler(
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res);
        } catch (error) {
            handleError(error, res);
        }
    };
}

