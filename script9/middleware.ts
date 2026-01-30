import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rate Limiting Config (In-Memory for Demo / Single Instance)
const WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 100; // 100 peticiones / minuto (ajustado para navegacion normal)
const ipStore = new Map<string, { count: number; start: number }>();

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const path = req.nextUrl.pathname;

    // 0. EXCEPCIÓN CRÍTICA: Rutas públicas permitidas explícitamente (bypass total)
    // Usamos startsWith para evitar problemas con barras finales o query params
    if (path.startsWith('/api/submit-lead') || path.startsWith('/api/test-n8n') || path.startsWith('/api/support/send')) {
        return NextResponse.next();
    }

    // 1. Rate Limiting (Protección Anti-DDoS básica)
    // Se aplica a rutas API y Contacto para evitar spam
    if (path.startsWith('/api') || path === '/contacto') {
        const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        const now = Date.now();
        const record = ipStore.get(ip);

        if (!record) {
            ipStore.set(ip, { count: 1, start: now });
        } else {
            if (now - record.start < WINDOW_MS) {
                record.count += 1;
                if (record.count > MAX_REQUESTS) {
                    return new NextResponse('Too many requests. Please try again later.', { status: 429 });
                }
            } else {
                record.count = 1;
                record.start = now;
            }
            // Update store
            ipStore.set(ip, record);
        }
    }

    // 2. Lógica de Rutas Protegidas (Auth & RBAC)
    const esRutaAdmin = path.startsWith('/admin');
    // const esPanelUsuario = path.startsWith('/usuario'); // Descomentar si se requiere protección global de usuario

    const requiereProteccion = esRutaAdmin; // || esPanelUsuario;

    if (requiereProteccion) {
        // Obtenemos el token de sesión
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        // Si no está logueado -> Redirigir a Login
        if (!token) {
            const url = new URL('/api/auth/signin', req.url);
            url.searchParams.set('callbackUrl', path);
            return NextResponse.redirect(url);
        }

        // Si intenta entrar a Admin pero NO es admin
        if (esRutaAdmin && token.role !== 'admin') {
            // Redirigir a página "No Autorizado" home
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: [
        // Aplicar a todas las rutas EXCEPTO archivos estáticos, api auth, imágenes, favicon
        // EXPLICIT FIXED: Excluded api/submit-lead from auth matcher
        '/((?!api/auth|api/submit-lead|_next/static|_next/image|favicon.ico).*)',
    ],
};
