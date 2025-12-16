import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Obtener datos del perfil
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            console.log('❌ Usuario no autenticado en profile GET');
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        console.log('✅ Usuario autenticado en profile:', session.user.email);

        const supabase = createServerSupabaseClient();

        // Buscar usuario por email en lugar de ID
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, phone, role, created_at')
            .eq('email', session.user.email)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            return NextResponse.json(
                { error: 'Error al obtener datos del usuario' },
                { status: 500 }
            );
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error('Error in profile GET:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar perfil
export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            console.log('❌ Usuario no autenticado en profile PUT');
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        console.log('✅ Usuario autenticado en profile PUT:', session.user.email);

        const { fullName, phone } = await req.json();

        if (!fullName || fullName.trim().length === 0) {
            return NextResponse.json(
                { error: 'El nombre es requerido' },
                { status: 400 }
            );
        }

        const supabase = createServerSupabaseClient();

        const { data: updatedUser, error } = await supabase
            .from('users')
            .update({
                name: fullName.trim(),
                phone: phone?.trim() || null,
            })
            .eq('email', session.user.email)
            .select()
            .single();

        if (error) {
            console.error('Error updating user:', error);
            return NextResponse.json(
                { error: 'Error al actualizar perfil' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Perfil actualizado exitosamente',
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error in profile PUT:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}



