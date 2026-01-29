const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function promoteToAdmin(email) {
    if (!email) {
        console.error('Error: Debes proporcionar un email.');
        console.log('Uso: node scripts/promote-admin.js usuarios@email.com');
        process.exit(1);
    }

    console.log(`🔍 Buscando usuario: ${email}...`);

    const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle(); // Usar maybeSingle para no lanzar error si no existe

    if (fetchError) {
        console.error('❌ Error de conexión:', fetchError);
        process.exit(1);
    }

    if (!user) {
        console.log(`⚠️ Usuario ${email} no existe. Creándolo como ADMIN...`);
        const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert({
                email: email,
                name: email.split('@')[0], // Nombre temporal basado en email
                role: 'admin',
                is_verified: true
            })
            .select()
            .single();

        if (createError) {
            console.error('❌ Error al crear usuario:', createError);
            process.exit(1);
        }
        console.log('🎉 ¡ÉXITO! Usuario creado y promovido a ADMIN automáticamente.');
        console.log('👉 Ve a http://localhost:3000/admin para acceder.');
        return;
    }

    console.log(`✅ Usuario encontrado: ${user.name} (${user.role})`);
    console.log('🔄 Actualizando rol a ADMIN...');

    const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('id', user.id);

    if (updateError) {
        console.error('❌ Error actualizando rol:', updateError);
        process.exit(1);
    }

    console.log('🎉 ¡ÉXITO! El usuario ahora es ADMIN.');
    console.log('👉 Ve a http://localhost:3000/admin para acceder.');
}

const emailArg = process.argv[2];
promoteToAdmin(emailArg);
