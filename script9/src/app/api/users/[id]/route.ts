import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Esquema de validación para actualizar usuarios (solo administradores)
const updateUserSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    phone: z.string().optional(),
    role: z.enum(['host', 'guest']).optional(), // Removed 'admin' to match the expected type
    isVerified: z.boolean().optional(),
});

/**
 * GET /api/users/[id]
 * Obtener un usuario específico por ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }
        // Los usuarios pueden ver su propio perfil, los administradores pueden ver cualquiera
        if (session.user.id !== params.id && session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Access denied' },
                { status: 403 }
            );
        }
        const user = await UserService.getUserById(params.id);
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/users/[id]
 * Actualizar un usuario específico (solo administradores)
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
        // Verificar que el usuario existe
        const existingUser = await UserService.getUserById(params.id);
        if (!existingUser) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }
        // Parsear y validar datos de entrada
        const body = await request.json();
        const validatedData = updateUserSchema.parse(body);
        // Actualizar el usuario
        const updatedUser = await UserService.updateUser(params.id, validatedData);
        return NextResponse.json({
            success: true,
            data: updatedUser,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.error('Error updating user:', error);
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
            { success: false, error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/users/[id]
 * Eliminar un usuario específico (solo administradores)
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
        // Verificar que el usuario existe
        const existingUser = await UserService.getUserById(params.id);
        if (!existingUser) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }
        // Prevenir que los administradores se eliminen a sí mismos
        if (session.user.id === params.id) {
            return NextResponse.json(
                { success: false, error: 'Cannot delete your own account' },
                { status: 400 }
            );
        }
        // TODO: Verificar que no haya propiedades o reservas activas antes de eliminar
        // Esto se implementaría consultando PropertyService y BookingService
        // Eliminar el usuario
        await UserService.deleteUser(params.id);
        return NextResponse.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}