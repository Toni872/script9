import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { currentPassword, newPassword } = await req.json();

        // Validaciones
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Contraseña actual y nueva son requeridas' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'La nueva contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        const supabase = createServerSupabaseClient();

        // Obtener hash actual del usuario
        const { data: userRaw, error: fetchError } = await supabase
            .from('users')
            .select('password_hash')
            .eq('id', session.user.id)
            .single();

        const user = userRaw as { password_hash: string } | null;

        if (fetchError || !user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        // Verificar contraseña actual
        const isValidPassword = await bcrypt.compare(
            currentPassword,
            user.password_hash
        );

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'La contraseña actual es incorrecta' },
                { status: 400 }
            );
        }

        // Hash de la nueva contraseña
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña
        const { error: updateError } = await supabase
            .from('users')
            .update({
                password_hash: newPasswordHash,
                updated_at: new Date().toISOString(),
            })
            .eq('id', session.user.id);

        if (updateError) {
            console.error('Error updating password:', updateError);
            return NextResponse.json(
                { error: 'Error al cambiar contraseña' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Contraseña cambiada exitosamente',
        });

    } catch (error) {
        console.error('Error in change-password:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}





