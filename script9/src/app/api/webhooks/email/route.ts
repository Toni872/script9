import { NextResponse } from 'next/server';
import { AgentService } from '@/services/ai/agentService';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Email Webhook received:', body);

        // Extract content
        const subject = body.subject || 'No Subject';
        const text = body.text || body.html || '';
        const from = body.from;

        if (!text) {
            return NextResponse.json({ status: 'ignored' });
        }

        // Call Agent
        const responseText = await AgentService.chat([
            { role: 'system', content: `Context: responding to email from ${from} with subject: ${subject}` },
            { role: 'user', content: text }
        ]);

        console.log(`Would send email back to ${from}: ${responseText}`);

        return NextResponse.json({ status: 'success', reply: responseText });
    } catch (error: any) {
        console.error('Email Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
