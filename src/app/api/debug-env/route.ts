import { NextResponse } from 'next/server';

export async function GET() {
    const envCheck = {
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Definido' : '❌ No definido',
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Definido' : '❌ No definido',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Definido' : '❌ No definido',
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Definido' : '❌ No definido',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Definido' : '❌ No definido',
        timestamp: new Date().toISOString(),
        vercel: process.env.VERCEL ? 'Sí' : 'No',
        vercelUrl: process.env.VERCEL_URL,
    };

    return NextResponse.json(envCheck, { status: 200 });
}


