import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    phone: z.string().optional(),
    role: z.enum(['guest', 'host']).default('guest'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validationResult = registerSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Datos inválidos',
                    details: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        const { name, email, password, phone, role } = validationResult.data;

        const supabase = createServerSupabaseClient();

        // Verificar si el usuario ya existe
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return NextResponse.json(
                { error: 'El email ya está registrado' },
                { status: 409 }
            );
        }

        // Crear usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role,
                },
            },
        });

        if (authError) {
            console.error('Error en Supabase Auth:', authError);
            return NextResponse.json(
                { error: authError.message || 'Error al crear la cuenta' },
                { status: 500 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: 'Error al crear el usuario' },
                { status: 500 }
            );
        }

        // Crear usuario en la tabla users
        const { data: newUser, error: dbError } = await supabase
            .from('users')
            .insert({
                id: authData.user.id,
                name,
                email,
                phone: phone || null,
                role,
            })
            .select()
            .single();

        if (dbError) {
            console.error('Error al crear usuario en BD:', dbError);
            // Intentar eliminar el usuario de Auth si falla la BD
            await supabase.auth.admin.deleteUser(authData.user.id);

            return NextResponse.json(
                { error: 'Error al crear el perfil de usuario' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: 'Usuario registrado exitosamente',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en registro:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}



