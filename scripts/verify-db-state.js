const { createClient } = require('@supabase/supabase-js');
const path = require('path');


// Cargar .env.local
const envPath = path.resolve(__dirname, '../.env.local');
require('dotenv').config({ path: envPath });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifySchema() {
    console.log('\n🔍 VERIFICANDO ESQUEMA DE BASE DE DATOS...\n');
    let allGood = true;

    // 1. Verificar Columna is_script9_select en PROPERTIES
    try {
        const { error } = await supabase.from('properties').select('is_script9_select').limit(1);
        if (error) {
            console.log('❌ Tabla PROPERTIES: Columna is_script9_select NO encontrada.');
            console.log('   (Es probable que falte la migración de cambio de nombre)');
            allGood = false;
        } else {
            console.log('✅ Tabla PROPERTIES: Columna is_script9_select encontrada.');
        }
    } catch (e) {
        console.log('❌ Error chequeando properties:', e.message);
    }

    // 2. Verificar Columnas de Monetización en BOOKINGS
    try {
        const { error } = await supabase.from('bookings').select('platform_fee, host_payout').limit(1);
        if (error) {
            console.log('❌ Error detallado:', JSON.stringify(error, null, 2));
            console.log('❌ Tabla BOOKINGS: Columnas platform_fee/host_payout NO encontradas.');
            allGood = false;
        } else {
            console.log('✅ Tabla BOOKINGS: Columnas de monetización encontradas.');
        }
    } catch (e) {
        console.log('❌ Error chequeando bookings:', e.message);
    }

    // 3. Verificar Contenido (Seeding)
    try {
        const { data: properties, error } = await supabase
            .from('properties')
            .select('title, id')
            .eq('title', 'Automatización de Email Marketing (Demo)')
            .limit(1);

        if (error) {
            console.log('❌ Error buscando servicio demo:', error.message);
            allGood = false;
        } else if (properties.length === 0) {
            console.log('❌ Tabla PROPERTIES: Servicio "Automatización de Email Marketing (Demo)" NO encontrado.');
            allGood = false;
        } else {
            console.log('✅ Tabla PROPERTIES: Servicio Demo encontrado con ID:', properties[0].id);
        }
    } catch (e) {
        console.log('❌ Error chequeando contenido:', e.message);
    }

    console.log('\n' + '='.repeat(50));
    if (allGood) {
        console.log('🎉 TODO CORRECTO: La base de datos está actualizada.');
    } else {
        console.log('⚠️  ATENCIÓN: Faltan cambios en la base de datos.');
    }
    console.log('='.repeat(50) + '\n');
}

verifySchema();
