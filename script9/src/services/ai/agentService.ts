// import { CRMLead, CRMQuote } from '@/types/agent'; // Unused
// import { createServerSupabaseClient } from '@/lib/supabase'; // Unused

interface Message {
    role: string;
    content: string;
}

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK || 'http://46.224.199.64:5678/webhook/sales-chat';

export class AgentService {
    /**
     * Chat with the N8N AI Agent
     * @param history Full message history (we send the last one to N8N as prompt)
     * @param sessionId Optional session ID for context memory in N8N
     */
    static async chat(
        history: Message[],
        sessionId: string = 'default-guest-session'
    ): Promise<string | null> {
        try {
            // Extract latest user message
            const lastMessage = history[history.length - 1];
            const text = (lastMessage.content || "").trim();

            if (!text) return null;

            // 🧠 RAW MODE: Sending raw user text to ensure connectivity matches curl test.
            console.log('Sending to N8N Agent (RAW):', { text, sessionId, url: N8N_WEBHOOK_URL });

            // Call N8N Webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text, // Sending RAW text only
                    sessionId: sessionId,
                    history: history
                }),
            });

            if (!response.ok) {
                console.error(`N8N Error ${response.status}: ${response.statusText}`);
                throw new Error('Error communicating with AI Agent');
            }

            // N8N workflow creates a response JSON.
            const data = await response.json();
            let cleanResponse = "";

            // Handle various possible response formats from N8N/AI Server
            let finalResponse = JSON.stringify(data);

            if (typeof data === 'string') finalResponse = data;
            else if (data.output) finalResponse = data.output;
            else if (data.response) finalResponse = data.response;
            else if (data.text) finalResponse = data.text;
            else if (data.message) finalResponse = data.message;
            else if (data.answer) finalResponse = data.answer;
            else if (Array.isArray(data) && data.length > 0 && data[0].output) finalResponse = data[0].output;

            // ✅ CLEANUP: Remove raw function calls (e.g. <function.check_availability>{} or <function=...>)
            // BUT: Keep <function=open_calendar> as it's a frontend trigger
            if (!finalResponse.includes('<function=open_calendar>')) {
                // Match <function. or <function=
                cleanResponse = finalResponse.replace(/<function[.=](?!open_calendar)[^>]+>.*?<\/function>/g, '').trim();
            } else {
                cleanResponse = finalResponse.replace(/<function[.=](?!open_calendar)[^>]+>.*?<\/function>/g, '').trim();
            }

            return cleanResponse;

        } catch (error) {
            console.error('AgentService Error:', error);
            // Fallback to offline message if N8N is down
            return "Lo siento, mi cerebro en la nube está reconectando. ¿Podrías intentar de nuevo en 10 segundos?";
        }
    }
}
