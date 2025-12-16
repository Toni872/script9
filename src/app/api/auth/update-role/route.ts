import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const updateRoleSchema = z.object({
    role: z.enum(['guest', 'host']),
});

/**
 * POST /api/auth/update-role
 * Actualizar el role del usuario actual
 */
export async function POST(request: NextRequest) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        // Validar datos
        const body = await request.json();
        const validationResult = updateRoleSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Role inválido', details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const { role } = validationResult.data;

        // Actualizar role en Supabase
        const supabase = createServerSupabaseClient();
        const { data: updatedUser, error } = await supabase
            .from('users')
            .update({ role })
            .eq('email', session.user.email)
            .select('id, email, name, role')
            .single();

        if (error) {
            console.error('Error actualizando role:', error);
            return NextResponse.json(
                { error: 'Error al actualizar el role' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error en update-role:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}


