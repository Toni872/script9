import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // 1. Cabeceras de Seguridad (Security Headers)
    const headers = res.headers;
    headers.set('X-XSS-Protection', '1; mode=block'); // Previene ataques XSS básicos
    headers.set('X-Frame-Options', 'SAMEORIGIN'); // Evita Clickjacking
    headers.set('X-Content-Type-Options', 'nosniff'); // Evita MIME sniffing
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin'); // Privacidad
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); // Bloquea APIs sensibles no usadas

    // Configuración CSP (Opcional, puede ser estricta)
    // headers.set('Content-Security-Policy', "default-src 'self' ... ");

    // 2. Lógica de Rutas Protegidas
    const path = req.nextUrl.pathname;

    // Definir rutas sensibles
    const esRutaAdmin = path.startsWith('/admin');
    // const esPanelUsuario = path.startsWith('/usuario'); // Descomentar para proteger panel usuario globalmente

    // NOTA: El panel de usuario ya suele tener protección por componente, 
    // pero aquí añadimos una capa extra de seguridad a nivel de servidor.
    const requiereProteccion = esRutaAdmin; // || esPanelUsuario;

    if (requiereProteccion) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        // Si no está logueado -> Redirigir a Login
        if (!token) {
            // Usamos la ruta de login configurada o la default de NextAuth
            const url = new URL('/api/auth/signin', req.url);
            url.searchParams.set('callbackUrl', path);
            return NextResponse.redirect(url);
        }

        // Si intenta entrar a Admin pero NO es admin
        if (esRutaAdmin && token.role !== 'admin') {
            // Redirigir a página "No Autorizado"
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: [
        // Aplicar a todas las rutas EXCEPTO archivos estáticos, api auth, imágenes, favicon
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
};
