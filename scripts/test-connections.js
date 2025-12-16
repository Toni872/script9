const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
global.fetch = fetch;

// Cargar .env.local manualmente para el script
const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = require('dotenv').config({ path: envPath });

if (envConfig.error) {
    console.error('❌ Error cargando .env.local:', envConfig.error);
    process.exit(1);
}

console.log('\n🔍 VERIFICACIÓN DE VARIABLES DE ENTORNO SCRIPT9\n');

async function testSupabase() {
    console.log('Testing Supabase Connection...');
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        console.log('❌ Supabase vars missing');
        return false;
    }

    try {
        const supabase = createClient(url, key);
        // Intentar una query simple
        const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

        if (error) throw error;
        console.log('✅ Supabase Connection: OK');
        return true;
    } catch (e) {
        console.log('❌ Supabase Connection Failed:', e.message);
        return false;
    }
}

async function testStripe() {
    console.log('\nTesting Stripe Connection...');
    const key = process.env.STRIPE_SECRET_KEY;

    if (!key) {
        console.log('❌ STRIPE_SECRET_KEY missing');
        return false;
    }

    try {
        const stripe = new Stripe(key);
        // Intentar listar balance (llamada ligera)
        await stripe.balance.retrieve();
        console.log('✅ Stripe Connection: OK');
        return true;
    } catch (e) {
        console.log('❌ Stripe Connection Failed:', e.message);
        return false;
    }
}

function checkNextAuth() {
    console.log('\nChecking NextAuth...');
    const required = ['NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
    let allOk = true;

    required.forEach(v => {
        if (!process.env[v]) {
            console.log(`❌ ${v} is missing`);
            allOk = false;
        } else {
            console.log(`✅ ${v} is set`);
        }
    });
    return allOk;
}

async function main() {
    const supabaseOk = await testSupabase();
    const stripeOk = await testStripe();
    const authOk = checkNextAuth();

    console.log('\n' + '='.repeat(40));
    if (supabaseOk && stripeOk && authOk) {
        console.log('🚀 SYSTEM STATUS: ALL SYSTEMS OPERATIONAL');
        console.log('Las variables están funcionando correctamente.');
    } else {
        console.log('⚠️  SYSTEM STATUS: ISSUES DETECTED');
        console.log('Revisa los errores arriba.');
    }
    console.log('='.repeat(40) + '\n');
}

main();
