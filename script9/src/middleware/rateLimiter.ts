import { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
    windowMs?: number; // Ventana de tiempo en milisegundos (default: 15 minutos)
    max?: number; // Número máximo de requests (default: 100)
    message?: string;
    statusCode?: number;
}

/**
 * Middleware simple de rate limiting en memoria
 * Para producción, se recomienda usar Redis
 */
export function rateLimit(options: RateLimitOptions = {}) {
    const {
        windowMs = 15 * 60 * 1000, // 15 minutos
        max = 100,
        message = 'Demasiadas solicitudes, por favor intenta más tarde',
        statusCode = 429,
    } = options;

    return async (
        req: NextApiRequest,
        res: NextApiResponse,
        handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
    ) => {
        // Obtener identificador único (IP o user ID si está autenticado)
        const identifier = req.headers['x-forwarded-for'] as string ||
            req.socket.remoteAddress ||
            'unknown';

        const now = Date.now();
        const key = `${identifier}:${req.url}`;

        // Limpiar registros expirados periódicamente
        if (Math.random() < 0.1) { // 10% de las veces
            Object.keys(store).forEach(storeKey => {
                if (store[storeKey].resetTime < now) {
                    delete store[storeKey];
                }
            });
        }

        // Inicializar o resetear contador si la ventana expiró
        if (!store[key] || store[key].resetTime < now) {
            store[key] = {
                count: 0,
                resetTime: now + windowMs,
            };
        }

        // Incrementar contador
        store[key].count++;

        // Añadir headers informativos
        res.setHeader('X-RateLimit-Limit', max.toString());
        res.setHeader('X-RateLimit-Remaining', Math.max(0, max - store[key].count).toString());
        res.setHeader('X-RateLimit-Reset', new Date(store[key].resetTime).toISOString());

        // Verificar límite
        if (store[key].count > max) {
            return res.status(statusCode).json({
                error: 'Rate limit exceeded',
                message,
                retryAfter: new Date(store[key].resetTime).toISOString(),
            });
        }

        return handler(req, res);
    };
}

/**
 * Rate limiters predefinidos para diferentes casos de uso
 */
export const rateLimiters = {
    // Para endpoints generales
    general: rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }),

    // Para autenticación (más estricto)
    auth: rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: 'Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.'
    }),

    // Para creación de recursos (moderado)
    create: rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hora
        max: 10
    }),

    // Para búsquedas intensivas
    search: rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minuto
        max: 30
    }),
};

