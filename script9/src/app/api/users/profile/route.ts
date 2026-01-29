import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Esquema de validación para actualizar perfil
const updateProfileSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    phone: z.string().optional(),
    // Los usuarios no pueden cambiar su propio rol por seguridad
});

/**
 * GET /api/users/profile
 * Obtener el perfil del usuario actual
 */
export async function GET() {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }
        // Obtener el perfil completo del usuario desde la base de datos
        const user = await UserService.getUserById(session.user.id);
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
        console.error('Error fetching user profile:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/users/profile
 * Actualizar el perfil del usuario actual
 */
export async function PUT(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }
        // Parsear y validar datos de entrada
        const body = await request.json();
        const validatedData = updateProfileSchema.parse(body);
        // Actualizar el perfil del usuario
        const updatedUser = await UserService.updateUser(session.user.id, validatedData);
        return NextResponse.json({
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid profile data', details: error.issues },
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
            { success: false, error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
