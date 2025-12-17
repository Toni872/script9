import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ FIX CRÍTICO PARA VERCEL: Detectar URL dinámica
// En Vercel, cada deployment tiene su propia URL, así que necesitamos usar VERCEL_URL si existe
const getBaseUrl = () => {
    // Función auxiliar para limpiar comillas
    const cleanUrl = (url: string | undefined) => {
        if (!url) return undefined;
        return url.replace(/['"]/g, '').trim();
    };

    const nextAuthUrl = cleanUrl(process.env.NEXTAUTH_URL);
    const vercelUrl = cleanUrl(process.env.VERCEL_URL);

    // Prioridad 1: NEXTAUTH_URL si está definida (la que configuramos en Vercel)
    if (nextAuthUrl) {
        return nextAuthUrl;
    }
    // Prioridad 2: VERCEL_URL en producción
    if (vercelUrl) {
        return `https://${vercelUrl}`;
    }
    // Prioridad 3: Fallback a localhost o NEXT_PUBLIC_BASE_URL
    return cleanUrl(process.env.NEXT_PUBLIC_BASE_URL) || 'http://localhost:3000';
};

// ✅ DIAGNÓSTICO DE VARIABLES DE ENTORNO
console.log('🔍 [AUTH SETUP] Verificando variables de entorno...');
console.log('🔍 [AUTH SETUP] NODE_ENV:', process.env.NODE_ENV);
console.log('🔍 [AUTH SETUP] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('🔍 [AUTH SETUP] VERCEL_URL:', process.env.VERCEL_URL);
console.log('🔍 [AUTH SETUP] URL DETECTADA:', getBaseUrl());
console.log('🔍 [AUTH SETUP] NEXTAUTH_SECRET existe:', !!process.env.NEXTAUTH_SECRET);
console.log('🔍 [AUTH SETUP] GOOGLE_CLIENT_ID existe:', !!process.env.GOOGLE_CLIENT_ID);
console.log('🔍 [AUTH SETUP] GOOGLE_CLIENT_SECRET existe:', !!process.env.GOOGLE_CLIENT_SECRET);
console.log('🔍 [AUTH SETUP] NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
console.log('🔍 [AUTH SETUP] SUPABASE_SERVICE_ROLE_KEY existe:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

if (!process.env.NEXTAUTH_URL && !process.env.VERCEL_URL) {
    console.error('❌ [AUTH SETUP] ERROR: NEXTAUTH_URL y VERCEL_URL no están definidas');
}
if (!process.env.NEXTAUTH_SECRET) {
    console.error('❌ [AUTH SETUP] WARNING: NEXTAUTH_SECRET no está definida, usando secreto por defecto');
}
if (!process.env.GOOGLE_CLIENT_ID) {
    console.error('❌ [AUTH SETUP] ERROR: GOOGLE_CLIENT_ID no está definida');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.error('❌ [AUTH SETUP] ERROR: GOOGLE_CLIENT_SECRET no está definida');
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || "script9-development-secret-2025-change-in-production",
    debug: true, // ✅ ACTIVAR SIEMPRE para ver errores en Vercel
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                }
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // 1. Inicializar cliente Supabase (ANON KEY es suficiente para signInWithPassword)
                    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
                    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

                    if (!supabaseUrl || !supabaseKey) {
                        console.error('❌ [AUTH] Faltan variables de entorno de Supabase');
                        return null;
                    }

                    const { createClient } = await import('@supabase/supabase-js');
                    const supabase = createClient(supabaseUrl, supabaseKey, {
                        auth: { persistSession: false }
                    });

                    // 2. Verificar credenciales con Supabase Auth
                    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (authError || !authData.user) {
                        console.error('❌ [AUTH] Error en autenticación:', authError?.message);
                        return null;
                    }

                    // 3. Obtener datos adicionales del usuario (rol, nombre) desde la tabla 'users'
                    // Usamos el cliente con SERVICE ROLE para asegurar acceso a la tabla users si RLS es estricto
                    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
                    if (serviceKey) {
                        const adminSupabase = createClient(supabaseUrl, serviceKey, {
                            auth: { persistSession: false }
                        });

                        const { data: userProfile } = await adminSupabase
                            .from('users')
                            .select('name, role')
                            .eq('id', authData.user.id)
                            .single();

                        if (userProfile) {
                            return {
                                id: authData.user.id,
                                email: authData.user.email,
                                name: userProfile.name || authData.user.user_metadata?.name,
                                role: userProfile.role || 'guest',
                                image: authData.user.user_metadata?.avatar_url,
                            };
                        }
                    }

                    // Fallback si no podemos leer la tabla users (usar metadatos)
                    return {
                        id: authData.user.id,
                        email: authData.user.email,
                        name: authData.user.user_metadata?.name,
                        role: authData.user.user_metadata?.role || 'guest',
                        image: authData.user.user_metadata?.avatar_url,
                    };

                } catch (error) {
                    console.error('❌ [AUTH] Error inesperado en authorize:', error);
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            console.log('🟢 [MOBILE AUTH] ===== REDIRECT CALLBACK =====');
            console.log('🟢 [MOBILE AUTH] URL recibida:', url);
            console.log('🟢 [MOBILE AUTH] Base URL:', baseUrl);
            console.log('🟢 [MOBILE AUTH] NODE_ENV:', process.env.NODE_ENV);
            console.log('🟢 [MOBILE AUTH] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

            // Si la URL es relativa, usar baseUrl
            if (url.startsWith('/')) {
                console.log('🟢 [MOBILE AUTH] URL relativa detectada, usando baseUrl');
                return `${baseUrl}${url}`;
            }

            // Si la URL pertenece al mismo sitio, permitirla
            try {
                const urlOrigin = new URL(url).origin;
                console.log('🟢 [MOBILE AUTH] Origin de URL:', urlOrigin);
                if (urlOrigin === baseUrl) {
                    console.log('🟢 [MOBILE AUTH] ✅ URL del mismo origen, permitida');
                    return url;
                }
            } catch (e) {
                console.error('🔴 [MOBILE AUTH] Error parsing URL:', e);
            }

            // Por defecto, ir a la home
            console.log('🟢 [MOBILE AUTH] Redirigiendo a baseUrl por defecto');
            return baseUrl;
        },
        async signIn({ user, account }) {
            console.log('🟡 [AUTH] ===== SIGNIN CALLBACK =====');
            console.log('🟡 [AUTH] Provider:', account?.provider);
            console.log('🟡 [AUTH] User email:', user.email);
            console.log('🟡 [AUTH] User name:', user.name);
            console.log('🟡 [AUTH] Account type:', account?.type);
            console.log('🟡 [AUTH] Profile picture:', user.image);
            console.log('🟡 [AUTH] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
            console.log('🟡 [AUTH] NODE_ENV:', process.env.NODE_ENV);

            // SIEMPRE permitir el login - NO bloquear por errores de DB
            console.log('🟢 [MOBILE AUTH] ✅ Login permitido - Retornando TRUE (sin bloquear por errores de DB)');
            return true;
        },
        async session({ session, token }) {
            console.log('🟣 [MOBILE AUTH] ===== SESSION CALLBACK =====');
            console.log('🟣 [MOBILE AUTH] Token sub:', token.sub);
            console.log('🟣 [MOBILE AUTH] Token email:', token.email);
            console.log('🟣 [MOBILE AUTH] Token role:', token.role);

            if (token && session.user) {
                session.user.id = token.sub || "";
                session.user.role = (token.role as string) || "guest";
                session.user.email = token.email as string;
                session.user.name = token.name as string;

                console.log('🟢 [MOBILE AUTH] ✅ Sesión construida:', {
                    id: session.user.id,
                    email: session.user.email,
                    role: session.user.role
                });
            }
            return session;
        },
        async jwt({ token, user, account, trigger }) {
            console.log('🔵 [MOBILE AUTH] ===== JWT CALLBACK =====');
            console.log('🔵 [MOBILE AUTH] Trigger:', trigger);
            console.log('🔵 [MOBILE AUTH] Provider:', account?.provider);

            // Si es el primer login, guardar datos de usuario en el token
            if (user) {
                token.sub = user.id || token.sub;
                token.email = user.email || token.email;
                token.name = user.name || token.name;
                token.role = "guest"; // Rol por defecto
            }

            console.log('🟢 [MOBILE AUTH] ✅ Token JWT final:', {
                sub: token.sub,
                email: token.email,
                role: token.role
            });
            return token;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 días - Duración del token
    },
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production', // true en producción (HTTPS), false en desarrollo
            },
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
};

