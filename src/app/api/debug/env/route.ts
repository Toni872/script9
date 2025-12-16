import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Safety checks
    const checks = {
        hasUrl: !!sbUrl,
        hasAnonKey: !!anonKey,
        hasServiceKey: !!serviceKey,
        serviceKeyStartsValid: serviceKey?.startsWith('ey'),
        anonKeyStartsValid: anonKey?.startsWith('ey'),
        keysAreDifferent: anonKey !== serviceKey,
        nodeEnv: process.env.NODE_ENV,
    };

    let adminCheck = 'Not attempted';

    if (checks.hasServiceKey && checks.keysAreDifferent) {
        try {
            const supabase = createServerSupabaseClient();
            // Try a lightweight admin operation
            const { error } = await supabase.auth.admin.listUsers({ perPage: 1 });
            if (error) {
                adminCheck = `Failed: ${error.message}`;
            } else {
                adminCheck = 'Success (Admin privileges verified)';
            }
        } catch (e: any) {
            adminCheck = `Exception: ${e.message}`;
        }
    } else {
        adminCheck = 'Skipped (Service key missing or identical to anon key)';
    }

    return NextResponse.json({
        diagnostics: checks,
        adminConnection: adminCheck
    });
}
