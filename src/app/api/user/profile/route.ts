import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
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
        const { data: userRaw, error } = await supabase
            .from('users')
            .select('id, name, email, phone, role, created_at')
            .eq('email', session.user.email)
            .single();

        const user = userRaw as { id: string; name: string; email: string; phone: string | null; role: string; created_at: string; } | null;

        if (!user && !error) {
            // Lazy creation for users logging in via Social Auth (NextAuth) who are not in Supabase yet
            console.log('⚠️ Usuario no encontrado en profile GET. Intentando crear...');
            const newUserId = crypto.randomUUID();

            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert([
                    {
                        id: newUserId,
                        email: session.user.email,
                        name: session.user.name || 'Usuario Script9',
                        role: 'guest'
                    }
                ])
                .select('id, name, email, phone, role, created_at')
                .single();

            if (createError || !newUser) {
                console.error('❌ Error creating user in profile:', createError);
                return NextResponse.json(
                    { error: 'Error al crear perfil de usuario' },
                    { status: 500 }
                );
            }

            return NextResponse.json({ user: newUser });
        }

        if (error) {
            console.error('Error fetching user:', error);
            // Ignore PRGST116 (0 rows) if handled above, but here error is usually real DB error
            if (error.code === 'PGRST116') {
                // Should have been caught by !user if .single() wasn't throwing, 
                // but supabase .single() throws on 0 rows.
                // So we need to handle creation INSIDE this error block or use .maybeSingle().
            }

            // RETRY LOGIC for .single() error variant:
            if (error.code === 'PGRST116') { // No result found
                console.log('⚠️ Usuario no encontrado (PGRST116). Intentando crear...');
                const newUserId = crypto.randomUUID();
                // 1. Try to create user in Auth (auth.users)
                try {
                    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                        email: session.user.email,
                        email_confirm: true,
                        user_metadata: { name: session.user.name }
                    });

                    if (authData.user) {
                        newUserId = authData.user.id;
                    } else if (authError && (authError.message?.includes('already registered') || authError.status === 422)) {
                        try {
                            const { data: listData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 });
                            const existingUser = listData.users.find(u => u.email === session.user.email);
                            if (existingUser) newUserId = existingUser.id;
                        } catch (e) { /* ignore */ }
                    }
                } catch (e) { console.error('Auth creation error:', e); }

                // 2. Insert into public.users
                const { data: newUser, error: createError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: newUserId,
                            email: session.user.email,
                            name: session.user.name || 'Usuario Script9',
                            role: 'guest'
                        }
                    ])
                    .select('id, name, email, phone, role, created_at')
                    .single();

                if (createError || !newUser) {
                    return NextResponse.json({ error: 'Error creando usuario' }, { status: 500 });
                }
                return NextResponse.json({ user: newUser });
            }

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

        const { data: updatedUserRaw, error } = await supabase
            .from('users')
            .update({
                name: fullName.trim(),
                phone: phone?.trim() || null,
            })
            .eq('email', session.user.email)
            .select()
            .single();

        const updatedUser = updatedUserRaw as { id: string; name: string; email: string; phone: string | null; role: string; created_at: string; } | null;

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



