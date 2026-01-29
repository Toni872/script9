const { createClient } = require('@supabase/supabase-js');
const path = require('path');
// Node 18+ has native fetch

require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey);

async function checkSchema() {
    console.log('🔍 Checking Schema for PROPERTIES table...');

    // Attempt 1: Fetch 1 row and print keys which usually correspond to columns
    const { data, error } = await supabase.from('properties').select('*').limit(1);

    if (error) {
        console.log('Error fetching properties:', error.message);
    } else if (data && data.length > 0) {
        console.log('✅ Found Property Keys:', Object.keys(data[0]));
    } else {
        console.log('⚠️ No properties found, cannot check keys via select.');
    }
}

checkSchema();
