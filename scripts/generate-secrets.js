#!/usr/bin/env node

/**
 * Script para generar secrets seguros para deployment
 * Uso: node scripts/generate-secrets.js
 */

const crypto = require('crypto');

console.log('\n🔐 GENERADOR DE SECRETS PARA SCRIPT9\n');
console.log('═'.repeat(60));

// Generar NEXTAUTH_SECRET
const nextAuthSecret = crypto.randomBytes(32).toString('base64');
console.log('\n✅ NEXTAUTH_SECRET generado:');
console.log('─'.repeat(60));
console.log(nextAuthSecret);
console.log('─'.repeat(60));

// Generar API Key aleatoria (backup)
const apiKey = crypto.randomBytes(32).toString('hex');
console.log('\n🔑 API Key aleatoriabackup):');
console.log('─'.repeat(60));
console.log(apiKey);
console.log('─'.repeat(60));

// Instrucciones
console.log('\n📋 INSTRUCCIONES:\n');
console.log('1. Copiar NEXTAUTH_SECRET arriba');
console.log('2. Ir a Vercel → Settings → Environment Variables');
console.log('3. Agregar nueva variable:');
console.log('   - Key: NEXTAUTH_SECRET');
console.log('   - Value: [pegar el secret]');
console.log('   - Environment: Production, Preview, Development');
console.log('4. Guardar y re-deploy\n');

console.log('⚠️  IMPORTANTE:');
console.log('   - NUNCA compartir estos secrets');
console.log('   - NUNCA commitear al repositorio');
console.log('   - Guardar en lugar seguro (password manager)\n');

console.log('═'.repeat(60));
console.log('🎯 Secrets generados exitosamente\n');

