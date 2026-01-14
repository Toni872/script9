
import { CRMLead, CRMQuote } from '@/types/agent';
import { createServerSupabaseClient } from '@/lib/supabase';

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

            console.log('Sending to N8N Agent:', { text, sessionId, url: N8N_WEBHOOK_URL });

            // Call N8N Webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    sessionId: sessionId,
                    history: history // Optional: Send full history if N8N supports it, otherwise it relies on sessionId
                }),
            });

            if (!response.ok) {
                console.error(`N8N Error ${response.status}: ${response.statusText}`);
                throw new Error('Error communicating with AI Agent');
            }

            // N8N workflow creates a response JSON.
            // Based on n8n_sales_chat.json, it returns "={{ $json }}", which usually means the full output of the last node (AI Server).
            // We assume the AI Server returns { response: "text" } or just text.
            // Let's parse JSON and fallback to text.
            const data = await response.json();

            // Handle various possible response formats from N8N/AI Server
            if (typeof data === 'string') return data;
            if (data.output) return data.output; // Common N8N pattern
            if (data.response) return data.response; // Common pattern
            if (data.message) return data.message;
            if (data.answer) return data.answer;
            if (Array.isArray(data) && data.length > 0 && data[0].output) return data[0].output;

            // Fallback: Dump JSON
            return JSON.stringify(data);

        } catch (error) {
            console.error('AgentService Error:', error);
            // Fallback to offline message if N8N is down
            return "Lo siento, mi cerebro en la nube está reconectando. ¿Podrías intentar de nuevo en 10 segundos?";
        }
    }
}
