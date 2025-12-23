const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Cargar variables de entorno
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
if (!serviceKey) throw new Error('Missing SERVICE KEY');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey
);

const services = [
    {
        title: 'Automatización de Email Marketing (Demo)',
        description: 'Servicio de prueba para demostración. Automatización completa de campañas de email marketing incluyendo segmentación de audiencias, secuencias automatizadas, A/B testing y reporting en tiempo real.',
        price_per_hour: 750,
        price_per_day: 6000,
        location: 'POINT(-3.7038 40.4168)',
        latitude: 40.4168,
        longitude: -3.7038,
        city: 'Remoto',
        region: 'Global',
        address: 'Online',
        property_type: 'automatizacion',
        image_urls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'],
        amenities: ['python', 'api_rest', 'make', 'n8n'],
        max_guests: 15,
        min_booking_hours: 24,
        status: 'active'
    },
    {
        title: 'Bot de Telegram con IA (GPT-4)',
        description: 'Desarrollo de un bot conversacional para Telegram integrado con OpenAI (GPT-4). Capaz de responder preguntas frecuentes, gestionar citas y procesar pagos automáticamente. Incluye panel de administración básico.',
        price_per_hour: 450,
        price_per_day: 3600,
        location: 'POINT(0 0)',
        latitude: 40.4168,
        longitude: -3.7038,
        city: 'Online',
        region: 'Global',
        address: 'Online',
        property_type: 'ia_chatbot',
        image_urls: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80'],
        amenities: ['python', 'openai', 'telegram_api', 'deployment'],
        max_guests: 50,
        min_booking_hours: 24,
        status: 'active'
    },
    {
        title: 'Scraper de Precios Competencia',
        description: 'Script automatizado en Python para monitorear precios de la competencia en tiempo real. Exportación diaria a Google Sheets o Excel. Sistema anti-bloqueo y rotación de proxies incluido.',
        price_per_hour: 200,
        price_per_day: 1600,
        location: 'POINT(0 0)',
        latitude: 41.3851,
        longitude: 2.1734,
        city: 'Online',
        region: 'Global',
        address: 'Online',
        property_type: 'script',
        image_urls: ['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80'],
        amenities: ['python', 'web_scraping', 'pandas', 'google_sheets'],
        max_guests: 10,
        min_booking_hours: 12,
        status: 'active'
    },
    {
        title: 'Workflow Facturación Automática (Make)',
        description: 'Automatización completa de tu proceso de facturación usando Make (Integromat). Conecta Stripe/PayPal con tu software contable (QuickBooks/Xero) y envía la factura por email al cliente automáticamente.',
        price_per_hour: 150,
        price_per_day: 1200,
        location: 'POINT(0 0)',
        latitude: 39.4699,
        longitude: -0.3763,
        city: 'Online',
        region: 'Global',
        address: 'Online',
        property_type: 'workflow',
        image_urls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'],
        amenities: ['make', 'stripe', 'email_automation', 'pdf_generation'],
        max_guests: 5,
        min_booking_hours: 5,
        status: 'active'
    },
    {
        title: 'Consultoría de Implementación AI',
        description: 'Sesión estratégica para analizar cómo integrar Inteligencia Artificial en tus procesos de negocio actuales. Entregable: Roadmap de implementación y análisis de ROI.',
        price_per_hour: 80,
        price_per_day: 640,
        location: 'POINT(0 0)',
        latitude: 37.3891,
        longitude: -5.9845,
        city: 'Online',
        region: 'Global',
        address: 'Online',
        property_type: 'consultoria',
        image_urls: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80'],
        amenities: ['consulting', 'ai_strategy', 'process_mining', 'zoom/meet'],
        max_guests: 1,
        min_booking_hours: 1,
        status: 'active'
    },
    {
        title: 'Dashboard de Ventas en Notion',
        description: 'Sistema operativo de ventas completo en Notion. CRM básico, seguimiento de leads, cálculo de comisiones y vista de pipeline. Totalmente personalizable y sin costes mensuales de suscripción.',
        price_per_hour: 120,
        price_per_day: 960,
        location: 'POINT(0 0)',
        latitude: 43.2630,
        longitude: -2.9350,
        city: 'Online',
        region: 'Global',
        address: 'Online',
        property_type: 'automatizacion',
        image_urls: ['https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80'],
        amenities: ['notion', 'crm', 'automation', 'productivity'],
        max_guests: 20,
        min_booking_hours: 8,
        status: 'active'
    },
    {
        title: 'API Integración WhatsApp Business',
        description: 'Configuración y desarrollo de API para envío masivo de notificaciones transaccionales por WhatsApp. Ideal para e-commerce (confirmación de pedido, envío). Cumple con normas de Meta.',
        price_per_hour: 300,
        price_per_day: 2400,
        location: 'POINT(0 0)',
        latitude: 36.7213,
        longitude: -4.4214,
        city: 'Online',
        region: 'Global',
        address: 'Online',
        property_type: 'integracion',
        image_urls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80'],
        amenities: ['nodejs', 'whatsapp_api', 'webhook', 'backend'],
        max_guests: 100,
        min_booking_hours: 20,
        status: 'active'
    }
];

async function seedServices() {
    console.log('🧹 Limpiando catálogo antiguo (Villas, Lofts...)...');

    // 0. Clean dependencies (Bookings, Reviews, Messages, etc)
    const TABLES_TO_CLEAN = ['reviews', 'bookings', 'messages', 'conversations', 'property_features'];

    for (const table of TABLES_TO_CLEAN) {
        const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error && error.code !== 'PGRST204') console.log(`Nota sobre ${table}:`, error.message);
        else console.log(`✓ Tabla ${table} limpiada.`);
    }

    // 1. Delete all properties
    const { error: deleteError } = await supabase
        .from('properties')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
        console.error('Error borrando propiedades:', deleteError.message);
        return;
    }
    console.log('✅ Catálogo limpiado.');

    // 2. Get a host user to assign
    const { data: hosts } = await supabase.from('users').select('id').eq('role', 'host').limit(1);
    let hostId;

    if (!hosts || hosts.length === 0) {
        console.log('⚠️ No hay hosts. Creando uno...');
        const { data: newHost, error: createError } = await supabase.auth.admin.createUser({
            email: 'admin_host@script9.com',
            password: 'password123',
            email_confirm: true,
            user_metadata: { name: 'Script9 Official', role: 'host' }
        });
        if (createError) throw createError;
        await new Promise(r => setTimeout(r, 2000));
        const { data: user } = await supabase.from('users').select('id').eq('email', 'admin_host@script9.com').single();
        hostId = user.id;
    } else {
        hostId = hosts[0].id;
    }

    console.log(`👤 Asignando servicios al Host ID: ${hostId}`);

    // 3. Insert new services
    console.log('🚀 Insertando Servicios Digitales...');

    for (const service of services) {
        const { error } = await supabase.from('properties').insert({
            ...service,
            host_id: hostId
        });

        if (error) console.error(`❌ Error insertando ${service.title}:`, error.message);
        else console.log(`✅ Insertado: ${service.title}`);
    }

    console.log('✨ Proceso finalizado. El catálogo ahora es 100% digital.');
}

seedServices().catch(console.error);
