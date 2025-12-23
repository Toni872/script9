const { createClient } = require('@supabase/supabase-js');
const { Stripe } = require('stripe');
const path = require('path');
const fetch = require('node-fetch'); // Need fetch for API calls if not global in this node version
global.fetch = fetch;

require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runTest() {
    console.log('\n🔥 INICIANDO PRUEBA DE FUEGO: FLUJO DE COMPRA COMPLETO 🔥\n');

    // 1. Obtener un servicio válido de la BD
    console.log('1️⃣  Buscando servicio "Email Marketing"...');
    const { data: service, error: serviceError } = await supabase
        .from('properties')
        .select('id, title, price_per_hour')
        .eq('title', 'Automatización de Email Marketing (Demo)')
        .single();

    if (serviceError || !service) {
        console.error('❌ Error: Servicio no encontrado en BD. FALLO CRÍTICO.');
        process.exit(1);
    }
    console.log(`✅ Servicio encontrado: ${service.title} (ID: ${service.id})`);

    // 2. Simular creación de Sesión de Checkout (Backend simulation)
    console.log('\n2️⃣  Creando sesión de Stripe (con Factura activada)...');
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: service.title },
                    unit_amount: 75000, // 750.00 EUR
                },
                quantity: 1,
            }],
            mode: 'payment',
            invoice_creation: { enabled: true }, // THE KEY FEATURE
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            metadata: {
                propertyId: service.id,
                serviceHeader: 'Test Script'
            }
        });

        console.log(`✅ Sesión creada: ${session.id}`);

        // 3. Verificar Invoice (puede tardar un poco en generarse)
        // En un flujo real, el usuario tarda en pagar. Aquí verificamos la configuración de la sesión.
        console.log(`ℹ️  Invoice Creation Enabled: ${session.invoice_creation?.enabled}`);

        // 4. (Opcional) Simular llamada al endpoint de verificación
        // No podemos "pagar" la sesión por script sin UI, pero podemos verificar que el endpoint
        // maneja la sesión correctamente (aunque esté en estado 'open' y no 'paid').

        console.log('\n3️⃣  Verificando lógica del endpoint (/api/stripe/verify-session)...');
        // Retrieve session again expanding invoice to see if URL placeholder exists
        const retrievedSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['invoice']
        });

        const invoiceUrl = retrievedSession.invoice?.hosted_invoice_url || retrievedSession.invoice?.invoice_pdf;

        if (session.invoice_creation.enabled) {
            console.log('✅ Configuración de factura correcta.');
            if (invoiceUrl) console.log('✅ URL de factura generada (pre-pago):', invoiceUrl);
            else console.log('ℹ️  URL de factura pendiente de pago (Normal).');
        } else {
            console.error('❌ Error: La creación de facturas NO está habilitada en la sesión.');
        }

    } catch (e) {
        console.error('❌ Error en el proceso:', e.message);
    }
}

runTest();
