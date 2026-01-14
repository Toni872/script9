
import { NextResponse } from 'next/server';
import { AgentService } from '@/services/ai/agentService';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages, sessionId } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
        }

        // Call the service (which now connects to N8N)
        const responseText = await AgentService.chat(
            messages,
            sessionId || 'web-widget-session' // Fallback session
        );

        return NextResponse.json({
            role: 'assistant',
            content: responseText
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
