
import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, subject, message, name, type = 'support' } = body;

        if (!email || !subject || !message) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // --- 1. PRIORITY: Forward to N8N (AI SDR) ---
        // Fire and forget immediately, before any other processing
        const n8nUrl = process.env.N8N_WEBHOOK_URL || 'http://46.224.199.64.nip.io:5678/webhook/lead-form-gemini';
        console.log('--- [DEBUG] Contact Form Hit. Forwarding to N8N:', n8nUrl);

        if (n8nUrl) {
            // No await - Fire and forget
            fetch(n8nUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).catch(err => console.error('Error forwarding to N8N:', err));
        }

        // --- 2. Send Internal Notification (Legacy) ---
        console.log('--- [DEBUG] Sending Internal Email via EmailService ---');
        const success = await EmailService.sendSupportMessage({
            name,
            email,
            subject,
            message,
            type
        });

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            console.error('--- [DEBUG] EmailService Failed ---');
            return NextResponse.json(
                { error: 'Error al enviar el email' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Error en /api/support/send:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
