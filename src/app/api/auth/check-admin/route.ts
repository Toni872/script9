import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { isAdmin: false, error: 'No autenticado' },
                { status: 401 }
            );
        }

        // Verificar en la base de datos si el usuario es admin
        const supabase = createServerSupabaseClient();
        const { data: user, error } = await supabase
            .from('users')
            .select('role')
            .eq('email', session.user.email)
            .single();

        if (error || !user) {
            return NextResponse.json(
                { isAdmin: false, error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        const isAdmin = user.role === 'admin';

        return NextResponse.json({ isAdmin });
    } catch (error: any) {
        console.error('Error al verificar admin:', error);
        return NextResponse.json(
            { isAdmin: false, error: 'Error del servidor' },
            { status: 500 }
        );
    }
}






