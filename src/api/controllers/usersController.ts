import { NextApiRequest, NextApiResponse } from 'next';
import { UserService, UserFilters } from '@/services/userService';
import { validateData, createUserSchema, updateUserSchema } from '@/utils/validation';
import { withErrorHandler } from '@/utils/errors';
import { AuthenticatedRequest, requireAuth, requireRole } from '@/middleware/auth';
import { rateLimiters } from '@/middleware/rateLimiter';

/**
 * GET /api/users - Obtener usuarios con filtros (solo admin)
 */
export const getUsers = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireRole(['admin'], req, res, async () => {
        await rateLimiters.general(req, res, async () => {
            const filters: UserFilters = {};

            if (req.query.role) filters.role = req.query.role as 'admin' | 'host' | 'guest';
            if (req.query.isVerified) filters.isVerified = req.query.isVerified === 'true';
            if (req.query.search) filters.search = req.query.search as string;
            if (req.query.page) filters.page = parseInt(req.query.page as string);
            if (req.query.limit) filters.limit = parseInt(req.query.limit as string);

            const result = await UserService.searchUsers(filters);
            res.status(200).json(result);
        });
    });
});

/**
 * POST /api/users - Crear un nuevo usuario (solo admin)
 */
export const createUser = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireRole(['admin'], req, res, async () => {
        await rateLimiters.create(req, res, async () => {
            const data = validateData(createUserSchema, req.body);

            // Asegurar que el role está definido (requerido por CreateUserData)
            if (!data.role) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: 'El rol es requerido'
                });
                return;
            }

            const user = await UserService.createUser({
                ...data,
                role: data.role as 'admin' | 'host' | 'guest',
            });
            res.status(201).json(user);
        });
    });
});

/**
 * GET /api/users/[id] - Obtener un usuario por ID
 */
export const getUserById = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.general(req, res, async () => {
            const { id } = req.query;

            // Solo puede ver su propio perfil o ser admin
            if (authReq.user.id !== id && authReq.user.role !== 'admin') {
                res.status(403).json({
                    error: 'Forbidden',
                    message: 'No tienes permisos para ver este usuario'
                });
                return;
            }

            const user = await UserService.getUserById(id as string);
            res.status(200).json(user);
        });
    });
});

/**
 * GET /api/users/me - Obtener el perfil del usuario autenticado
 */
export const getCurrentUser = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.general(req, res, async () => {
            const user = await UserService.getUserById(authReq.user.id);
            res.status(200).json(user);
        });
    });
});

/**
 * PUT /api/users/[id] - Actualizar un usuario
 */
export const updateUser = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;
        const data = validateData(updateUserSchema, req.body);

        // Solo puede actualizar su propio perfil o ser admin
        if (authReq.user.id !== id && authReq.user.role !== 'admin') {
            res.status(403).json({
                error: 'Forbidden',
                message: 'No tienes permisos para modificar este usuario'
            });
            return;
        }

        // Solo admin puede cambiar roles
        if (data.role && authReq.user.role !== 'admin') {
            delete data.role;
        }

        const user = await UserService.updateUser(id as string, data);
        res.status(200).json(user);
    });
});

/**
 * PUT /api/users/me - Actualizar el perfil del usuario autenticado
 */
export const updateCurrentUser = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const data = validateData(updateUserSchema, req.body);

        // No permitir cambiar el rol desde este endpoint
        delete data.role;

        const user = await UserService.updateUser(authReq.user.id, data);
        res.status(200).json(user);
    });
});

/**
 * DELETE /api/users/[id] - Eliminar un usuario (solo admin)
 */
export const deleteUser = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireRole(['admin'], req, res, async () => {
        const { id } = req.query;
        await UserService.deleteUser(id as string);
        res.status(204).end();
    });
});

/**
 * POST /api/users/[id]/verify - Verificar un usuario (solo admin)
 */
export const verifyUser = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireRole(['admin'], req, res, async () => {
        const { id } = req.query;
        const user = await UserService.verifyUser(id as string);
        res.status(200).json(user);
    });
});

/**
 * GET /api/users/hosts - Obtener todos los anfitriones
 */
export const getHosts = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await rateLimiters.general(req, res, async () => {
        const hosts = await UserService.getHosts();
        res.status(200).json(hosts);
    });
});

/**
 * GET /api/users/[id]/stats - Obtener estadísticas de un anfitrión
 */
export const getHostStats = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.general(req, res, async () => {
            const { id } = req.query;

            // Solo puede ver sus propias stats o ser admin
            if (authReq.user.id !== id && authReq.user.role !== 'admin') {
                res.status(403).json({
                    error: 'Forbidden',
                    message: 'No tienes permisos para ver estas estadísticas'
                });
                return;
            }

            const stats = await UserService.getHostStats(id as string);
            res.status(200).json(stats);
        });
    });
});

/**
 * GET /api/users/recent - Obtener usuarios recientes (solo admin)
 */
export const getRecentUsers = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireRole(['admin'], req, res, async () => {
        await rateLimiters.general(req, res, async () => {
            const limit = parseInt(req.query.limit as string) || 10;
            const users = await UserService.getRecentUsers(limit);
            res.status(200).json(users);
        });
    });
});

