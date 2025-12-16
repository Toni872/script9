const { createClient } = require('@supabase/supabase-js');
const path = require('path');
// Node 18+ has native fetch, no need to polyfill for Supabase usually, 
// unless supabase-js specifically demands it. 
// If we are on Node < 18 we might need it, but let's assume Node 18+ as per README.


require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedUsers() {
    console.log('🌱 Sembrando usuarios de prueba...\n');

    // Crear usuarios de prueba si no existen
    const users = [
        { email: 'test_guest@script9.com', name: 'Test Guest', role: 'guest' },
        { email: 'test_host@script9.com', name: 'Test Host', role: 'host' }
    ];

    for (const user of users) {
        // Verificar si ya existe en la tabla users
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();

        if (!existingUser) {
            console.log(`Creating user: ${user.email}`);
            // Simulamos la creación insertando en 'users' (en producción esto va via Auth)
            // Para test es suficiente con tener registro en public.users si las FK lo permiten
            const { error } = await supabase.from('users').insert({
                email: user.email,
                name: user.name,
                role: user.role
                // image: ... (removed as column might vary, e.g. avatar_url or none)
            });
            if (error) console.error('Error creating user:', error);
            else console.log('✅ User created');
        } else {
            console.log(`ℹ️ User already exists: ${user.email}`);
        }
    }

    // Verificar propiedad
    const { data: property } = await supabase.from('properties').select('id').limit(1).single();
    if (!property) {
        console.log('Creating test property...');
        const { data: host } = await supabase.from('users').select('id').eq('email', 'test_host@script9.com').single();
        if (host) {
            await supabase.from('properties').insert({
                title: 'Test Automation Script',
                description: 'A test script for automation',
                price: 100,
                host_id: host.id,
                location: 'Cloud',
                type: 'script',
                images: ['https://placehold.co/600x400']
            });
            console.log('✅ Test property created');
        }
    } else {
        console.log('ℹ️ Test property already exists');
    }
}

seedUsers();
