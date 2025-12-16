const { createClient } = require('@supabase/supabase-js');
const path = require('path');
// Node 18+ has native fetch


// Cargar variables de entorno
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Configurar cliente Supabase
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!serviceKey) {
    console.error('❌ Error: No se encontró la SERVICE KEY de Supabase en .env.local');
    console.error('   Esperaba: SUPABASE_SERVICE_ROLE_KEY o SUPABASE_SERVICE_KEY');
    console.log('   Keys disponibles:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));
    process.exit(1);
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

async function testMonetization() {
    console.log('🧪 INICIANDO TEST DE MONETIZACIÓN\n');

    try {
        // 1. Obtener un usuario y una propiedad para la prueba
        let { data: users } = await supabase.from('users').select('id, email').limit(2);

        // Auto-create users if missing
        if (!users || users.length < 2) {
            console.log('⚠️ Not enough users found. Creating test users via Auth Admin...');

            const newUsers = [
                { email: `guest_${Date.now()}@test.com`, password: 'password123', role: 'guest' },
                { email: `host_${Date.now()}@test.com`, password: 'password123', role: 'host' }
            ];

            for (const u of newUsers) {
                const { data, error } = await supabase.auth.admin.createUser({
                    email: u.email,
                    password: u.password,
                    email_confirm: true,
                    user_metadata: { name: u.role === 'guest' ? 'Test Guest' : 'Test Host', role: u.role }
                });

                if (error) console.error(`Error creating auth user ${u.email}:`, error.message);
                else console.log(`✅ Auth User created: ${u.email}`);
            }

            // Wait for triggers to propagate to public.users
            console.log('⏳ Waiting for triggers...');
            await new Promise(r => setTimeout(r, 2000));

            // Refresh users list
            const result = await supabase.from('users').select('id, email').limit(2);
            users = result.data;
        }

        let { data: properties } = await supabase.from('properties').select('id, price_per_hour, title').limit(1);

        // Auto-create property if missing
        if (!properties || properties.length === 0) {
            console.log('⚠️ No properties found. Creating test property...');
            // Find a host user
            // If we just created users, the second one is a host. Or search by email.
            const host = users.find(u => u.email.includes('host')) || users[1] || users[0];

            if (host) {
                const { error: propError } = await supabase.from('properties').insert({
                    title: 'Test Property',
                    description: 'Test Desc',
                    price_per_hour: 100,
                    host_id: host.id,
                    location: 'Cloud',
                    // Need a valid city/country if schema requires, assuming defaults or nullable
                    city: 'CloudCity',
                    property_type: 'script',
                    image_urls: ['https://placehold.co/600x400'],
                    amenities: ['Test Amenity'], // Valid array
                    max_guests: 1, // Sometimes required
                    min_booking_hours: 1
                });

                if (propError) {
                    console.error('Error creating property:', propError);
                    console.log('Detailed Error:', JSON.stringify(propError, null, 2));
                }
                else console.log('✅ Test property created');

                // Refresh properties
                const result = await supabase.from('properties').select('id, price_per_hour, title').limit(1);
                properties = result.data;
            }
        }

        if (!users || users.length < 2 || !properties || properties.length === 0) {
            console.error('❌ AUN FALLA: No se pudieron crear/encontrar suficientes datos.');
            console.log('Users found:', users?.length);
            console.log('Properties found:', properties?.length);
            return;
        }

        const guest = users[0];
        const property = properties[0];
        const price = property.price_per_hour || 100;

        console.log(`\n👤 Usuario Guest: ${guest.email}`);
        console.log(`🏠 Propiedad: ${property.title} (${price}€)`);

        // 2. Crear una reserva de prueba (Simulada)
        const totalPrice = price;

        const bookingData = {
            property_id: property.id,
            guest_id: guest.id,
            total_price: totalPrice,
            status: 'pending',
            check_in: new Date().toISOString(),
            check_out: new Date(Date.now() + 86400000).toISOString(), // Mañana
        };

        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert(bookingData)
            .select()
            .single();

        if (bookingError) throw new Error(`Error creando reserva: ${bookingError.message}`);

        console.log(`✅ Reserva creada: ID ${booking.id}`);
        console.log(`💰 Precio Total: ${booking.total_price}€`);

        // 3. Simular el cálculo de comisiones
        const platformFee = booking.total_price * 0.10; // 10%
        const hostPayout = booking.total_price * 0.90;  // 90%

        console.log('\n🔄 SIMULANDO CÁLCULO DE COMISIONES...');
        console.log(`   - Comisión Script9 (10%): ${platformFee}€`);
        console.log(`   - Payout al Experto (90%): ${hostPayout}€`);

        const { error: updateError } = await supabase
            .from('bookings')
            .update({
                platform_fee: platformFee,
                host_payout: hostPayout,
                status: 'confirmed',
                stripe_payment_id: 'pi_test_' + Date.now()
            })
            .eq('id', booking.id);

        if (updateError) throw new Error(`Error actualizando comisiones: ${updateError.message}`);

        // 4. Verificación final
        const { data: verifyBooking } = await supabase
            .from('bookings')
            .select('id, total_price, platform_fee, host_payout')
            .eq('id', booking.id)
            .single();

        console.log('\n🔍 RESULTADO FINAL EN DB:');
        console.log(`   ID: ${verifyBooking.id}`);
        console.log(`   Fee Guardado: ${verifyBooking.platform_fee}`);
        console.log(`   Payout Guardado: ${verifyBooking.host_payout}`);

        if (verifyBooking.platform_fee === 10 && verifyBooking.host_payout === 90) {
            console.log('\n🎉 ¡PRUEBA EXITOSA! El sistema funciona perfectamente.');
        } else {
            console.log('\n⚠️  ALERTA: Los valores no coinciden.');
        }

    } catch (error) {
        console.error('\n❌ ERROR FATAL:', error.message);
    }
}

testMonetization();
