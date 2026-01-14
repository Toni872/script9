
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
