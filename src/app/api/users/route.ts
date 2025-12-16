import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { User } from '@/types';
import { PaginatedResponse, createPaginatedResponse } from '@/utils/pagination';

// Esquema de validación para crear usuarios
const createUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    role: z.enum(['host', 'guest']),
    phone: z.string().optional(),
});

// Esquema de validación para filtros de búsqueda
const userSearchSchema = z.object({
    query: z.string().optional(),
    role: z.enum(['host', 'guest']).optional(),
    limit: z.number().int().positive().max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
});

/**
 * GET /api/users
 * Obtener lista de usuarios (solo para administradores)
 */
export async function GET(request: NextRequest) {
    try {
        // Verificar autenticación y autorización
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        const url = new URL(request.url);
        const params = {
            query: url.searchParams.get('query') || undefined,
            role: url.searchParams.get('role') as 'host' | 'guest' | undefined,
            limit: parseInt(url.searchParams.get('limit') || '20'),
            offset: parseInt(url.searchParams.get('offset') || '0'),
        };
        const validatedParams = userSearchSchema.parse(params);

        let result: PaginatedResponse<User>;
        if (validatedParams.query || validatedParams.role) {
            result = await UserService.searchUsers({
                search: validatedParams.query,
                role: validatedParams.role,
                page: Math.floor(validatedParams.offset / validatedParams.limit) + 1,
                limit: validatedParams.limit
            });
        } else {
            const users = await UserService.getRecentUsers(validatedParams.limit);
            result = createPaginatedResponse(users, users.length, 1, validatedParams.limit);
        }

        return NextResponse.json({
            success: true,
            data: result.data,
            meta: result.meta,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid search parameters', details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/users
 * Crear un nuevo usuario (generalmente usado por NextAuth.js o administradores)
 */
export async function POST(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Solo administradores pueden crear usuarios manualmente
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        // Parsear y validar datos de entrada
        const body = await request.json();
        const validatedData = createUserSchema.parse(body);

        // Verificar que el email no esté ya en uso
        const existingUser = await UserService.getUserByEmail(validatedData.email);
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Email already in use' },
                { status: 409 }
            );
        }

        // Crear el usuario
        const user = await UserService.createUser(validatedData);
        return NextResponse.json(
            {
                success: true,
                data: user,
                message: 'User created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid user data', details: error.issues },
                { status: 400 }
            );
        }
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
