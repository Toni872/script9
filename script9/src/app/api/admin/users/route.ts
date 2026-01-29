import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const supabase = createServerSupabaseClient();

        const { data: users, error } = await supabase
            .from('users')
            .select('id, name, email, role, email_verified, created_at, phone')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching users:', error);
            return NextResponse.json(
                { error: 'Error al obtener usuarios' },
                { status: 500 }
            );
        }

        return NextResponse.json({ users });

    } catch (error) {
        console.error('Error in admin users API:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}



