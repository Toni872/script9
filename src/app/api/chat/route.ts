import { NextResponse } from 'next/server';
import { AgentService } from '@/services/ai/agentService';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        // Call the Agent Service
        // In a real app, we might check for an existing conversationId from cookies/headers
        const responseText = await AgentService.chat(messages);

        return NextResponse.json({
            role: 'assistant',
            content: responseText
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
