const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey);

async function debugInsert() {
    console.log('🐞 Debugging Insert...');
    // Get a host
    const { data: users } = await supabase.from('users').select('id').limit(1);
    const hostId = users && users.length > 0 ? users[0].id : null;
    console.log('Using Host ID:', hostId);

    const service = {
        title: 'DEBUG Service',
        description: 'Debug',
        price_per_hour: 100,
        host_id: hostId,
        location: 'POINT(0 0)',
        city: 'DebugCity',
        address: 'DebugAddress',
        region: 'DebugRegion',
        property_type: 'debug',
        image_urls: [],
        amenities: [],
        status: 'active',
        // Minimal set to trigger error
    };

    const { error } = await supabase.from('properties').insert(service);

    if (error) {
        console.error('FULL ERROR JSON:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ Insert Success (Unexpected)');
    }
}

debugInsert();
