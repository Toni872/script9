import { NextApiRequest, NextApiResponse } from 'next';
import { PropertyService } from '@/services/propertyService';
import { validateData, createPropertySchema, updatePropertySchema, searchPropertiesSchema } from '@/utils/validation';
import { withErrorHandler } from '@/utils/errors';
import { AuthenticatedRequest, requireAuth } from '@/middleware/auth';
import { rateLimiters } from '@/middleware/rateLimiter';

/**
 * GET /api/properties - Obtener propiedades con filtros
 */
export const getProperties = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await rateLimiters.search(req, res, async () => {
        const filters = validateData(searchPropertiesSchema, req.query);
        const result = await PropertyService.searchProperties(filters);
        return res.status(200).json(result);
    });
});

/**
 * POST /api/properties - Crear una nueva propiedad (requiere autenticación)
 */
export const createProperty = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        await rateLimiters.create(req, res, async () => {
            const data = validateData(createPropertySchema, req.body);

            // Asegurar que el host_id sea el usuario autenticado
            data.host_id = authReq.user.id;

            const property = await PropertyService.createProperty(data);
            return res.status(201).json(property);
        });
    });
});

/**
 * GET /api/properties/[id] - Obtener una propiedad por ID
 */
export const getPropertyById = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await rateLimiters.general(req, res, async () => {
        const { id } = req.query;
        const property = await PropertyService.getPropertyById(id as string);
        return res.status(200).json(property);
    });
});

/**
 * PUT /api/properties/[id] - Actualizar una propiedad (requiere ser el propietario)
 */
export const updateProperty = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;
        const data = validateData(updatePropertySchema, req.body);

        // Verificar que el usuario es el propietario
        const existingProperty = await PropertyService.getPropertyById(id as string);
        if (existingProperty.host_id !== authReq.user.id && authReq.user.role !== 'admin') {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'No tienes permisos para modificar esta propiedad'
            });
        }

        const property = await PropertyService.updateProperty(id as string, data);
        return res.status(200).json(property);
    });
});

/**
 * DELETE /api/properties/[id] - Eliminar una propiedad (requiere ser el propietario o admin)
 */
export const deleteProperty = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;

        // Verificar que el usuario es el propietario o admin
        const existingProperty = await PropertyService.getPropertyById(id as string);
        if (existingProperty.host_id !== authReq.user.id && authReq.user.role !== 'admin') {
            res.status(403).json({
                error: 'Forbidden',
                message: 'No tienes permisos para eliminar esta propiedad'
            });
            return;
        }

        await PropertyService.deleteProperty(id as string);
        res.status(204).end();
    });
});

/**
 * POST /api/properties/[id]/images - Añadir imagen a propiedad
 */
export const addPropertyImage = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async (authReq: AuthenticatedRequest) => {
        const { id } = req.query;
        const { imageKey, isPrimary } = req.body;

        // Verificar que el usuario es el propietario
        const existingProperty = await PropertyService.getPropertyById(id as string);
        if (existingProperty.host_id !== authReq.user.id && authReq.user.role !== 'admin') {
            res.status(403).json({
                error: 'Forbidden',
                message: 'No tienes permisos para modificar esta propiedad'
            });
            return;
        }

        const image = await PropertyService.addPropertyImage(id as string, imageKey, isPrimary || false);
        res.status(201).json(image);
    });
});

/**
 * DELETE /api/properties/images/[imageId] - Eliminar imagen de propiedad
 */
export const deletePropertyImage = withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    await requireAuth(req, res, async () => {
        const { imageId } = req.query;
        await PropertyService.removePropertyImage(imageId as string);
        res.status(204).end();
    });
});

