import { Resend } from 'resend';

// API Key extraida de .env.local
const resend = new Resend('re_YXvtR9Xu_3B9rLzSCBXCYXNssYsJJVUjA');

console.log('Iniciando prueba de envio de email...');

try {
    const { data, error } = await resend.emails.send({
        from: 'Script9 <contact@script-9.com>',
        to: 'contact@script-9.com',
        subject: '✅ Verificación Técnica Script9 (Resend API)',
        html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10B981;">¡Prueba Exitosa!</h2>
        <p>Hola Antonio,</p>
        <p>Si estás leyendo este correo, significa que:</p>
        <ul>
          <li>La <b>API Key</b> de Resend es correcta.</li>
          <li>El dominio <b>script-9.com</b> está verificado para envíos.</li>
          <li>Tu buzón de <b>Google Workspace</b> recibe correos perfectamente.</li>
        </ul>
        <p>Ya puedes configurar tu nodo de n8n con total confianza.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <small style="color: #64748b;">Enviado automáticamente desde el script de verificación.</small>
      </div>
    `
    });

    if (error) {
        console.error('❌ Error de Resend:', error);
    } else {
        console.log('✅ Email enviado con éxito! ID:', data.id);
    }
} catch (err) {
    console.error('❌ Excepción ejecutando script:', err);
}
