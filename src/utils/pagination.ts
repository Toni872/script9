/**
 * Utilidades para paginación de resultados
 */

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

/**
 * Calcula offset para consultas con paginación
 */
export function calculatePagination(params: PaginationParams) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20));
    const offset = (page - 1) * limit;

    return { page, limit, offset };
}

/**
 * Crea objeto de metadata de paginación
 */
export function createPaginationMeta(
    totalItems: number,
    page: number,
    limit: number
): PaginationMeta {
    const totalPages = Math.ceil(totalItems / limit);

    return {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}

/**
 * Crea una respuesta paginada completa
 */
export function createPaginatedResponse<T>(
    data: T[],
    totalItems: number,
    page: number,
    limit: number
): PaginatedResponse<T> {
    return {
        data,
        meta: createPaginationMeta(totalItems, page, limit),
    };
}

/**
 * Valida y sanitiza parámetros de paginación de la query
 */
export function parsePaginationParams(query: Record<string, unknown>): PaginationParams {
    const page = parseInt(String(query.page || '1')) || 1;
    const limit = parseInt(String(query.limit || '20')) || 20;

    return {
        page: Math.max(1, page),
        limit: Math.min(100, Math.max(1, limit)),
    };
}

