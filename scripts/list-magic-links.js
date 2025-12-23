const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const fs = require('fs');

async function listLinks() {
    console.log('\n🔗 GENERANDO ENLACES MÁGICOS DE VENTA 🔗\n');

    // Get base URL from env or default to production/local
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const { data: services, error } = await supabase
        .from('properties')
        .select('id, title, price_per_hour')
        .order('title');

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    let content = `# 🔗 Enlaces Mágicos de Venta (Direct Checkout)\n\n`;
    content += `Usar estos enlaces para cerrar ventas después de las auditorías.\n`;
    content += `**Base URL:** ${baseUrl}\n\n`;
    content += `| Servicio | Precio | Enlace Mágico (Click para copiar) |\n`;
    content += `|---|---|---|\n`;

    services.forEach(service => {
        const link = `${baseUrl}/checkout?propertyId=${service.id}`;
        content += `| **${service.title}** | ${service.price_per_hour}€ | \`${link}\` |\n`;
    });

    const artifactPath = String.raw`C:\Users\Antonio\.gemini\antigravity\brain\75d68ffd-fd8c-4119-9346-91c56f9b6a9b\magic_links.md`;
    fs.writeFileSync(artifactPath, content);
    console.log(`✅ Artifact written to: ${artifactPath}`);
}

listLinks();
