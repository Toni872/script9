
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

        const success = await EmailService.sendSupportMessage({
            name,
            email,
            subject,
            message,
            type
        });

        // --- NEW: Forward to N8N (AI SDR) ---
        // Fallback to hardcoded URL to ensure reliability
        const n8nUrl = process.env.N8N_WEBHOOK_URL || 'http://46.224.199.64.nip.io:5678/webhook/lead-form-gemini';

        if (n8nUrl) {
            try {
                // Fire and forget (don't wait for N8N to respond to not slow down the UI)
                console.log('Sending to N8N:', n8nUrl);
                fetch(n8nUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }).catch(err => console.error('Error forwarding to N8N:', err));
            } catch (e) {
                console.error('N8N Trigger Failed');
            }
        }

        if (success) {
            return NextResponse.json({ success: true });
        } else {
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
