import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export type AuthenticatedRequest = NextApiRequest & {
    user: {
        id: string;
        email: string;
        name: string;
        role?: string;
    };
};

/**
 * Middleware para proteger rutas que requieren autenticación
 */
export async function requireAuth(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        return res.status(401).json({
            error: 'No autorizado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    // Añadir información del usuario a la request
    (req as AuthenticatedRequest).user = {
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name as string,
        role: (session.user as { role?: string }).role,
    };

    return handler(req as AuthenticatedRequest, res);
}

/**
 * Middleware para verificar roles específicos
 */
export async function requireRole(
    roles: string[],
    req: NextApiRequest,
    res: NextApiResponse,
    handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        return res.status(401).json({
            error: 'No autorizado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    const userRole = (session.user as { role?: string }).role;

    if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({
            error: 'Acceso prohibido',
            message: 'No tienes permisos suficientes para acceder a este recurso'
        });
    }

    // Añadir información del usuario a la request
    (req as AuthenticatedRequest).user = {
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name as string,
        role: userRole,
    };

    return handler(req as AuthenticatedRequest, res);
}

/**
 * Middleware para verificar que el usuario es el propietario del recurso
 */
export async function requireOwnership(
    getUserIdFromResource: (req: NextApiRequest) => Promise<string>,
    req: NextApiRequest,
    res: NextApiResponse,
    handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        return res.status(401).json({
            error: 'No autorizado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    const userId = session.user.id as string;
    const resourceOwnerId = await getUserIdFromResource(req);

    if (userId !== resourceOwnerId && (session.user as { role?: string }).role !== 'admin') {
        return res.status(403).json({
            error: 'Acceso prohibido',
            message: 'No tienes permisos para modificar este recurso'
        });
    }

    // Añadir información del usuario a la request
    (req as AuthenticatedRequest).user = {
        id: userId,
        email: session.user.email as string,
        name: session.user.name as string,
        role: (session.user as { role?: string }).role,
    };

    return handler(req as AuthenticatedRequest, res);
}

