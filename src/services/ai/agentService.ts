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

            // 🧠 CONTEXT INJECTION (Fixing Hallucinations & Verbosity)
            // We inject the system instructions transparently into the message sent to N8N
            const systemContext = `
[ROL]
Eres un Ingeniero de Soluciones de Script9 (no un asistente genérico). Tu tono es técnico, directo y profesional.
ODIAS la paja. Tus respuestas son breves (máximo 2-3 frases).
Nunca inventas servicios. Solo vendes lo que hay en el catálogo de Script9.

[CATÁLOGO DE SERVICIOS - SCRIPT9]
1. "Implementación de Agente IA Comercial (AI SDR)"
   - Qué es: Agente autónomo que busca leads, investiga y contacta por email/LinkedIn.
   - Stack: n8n + Gemini 2.5 + Supabase.
   - Valor: 10-30 reuniones/mes automáticas. Sustituye SDRs humanos.
   - Precio: Consultar Presupuesto.

2. "Motor de Enriquecimiento & Outreach"
   - Qué es: Sistema de minería de datos en tiempo real (Google Maps + LinkedIn).
   - Diferencia clave: No es una base de datos estática; busca data fresca al momento.
   - Valor: Leads verificados con baja tasa de rebote.
   - Precio: Consultar Presupuesto.

[INSTRUCCIONES CLAVE]
- Si preguntan precio: "En Script9 hacemos trajes a medida. El precio depende de la complejidad, pero empieza en rangos profesionales. ¿Te interesa ver una demo?"
- Si preguntan por otros servicios: "Actualmente nos especializamos solo en AI SDR y Motores de Enriquecimiento."
- Objetivo: Llevar al usuario a agendar una demo o pedir presupuesto.
- IMPORTANTE: Responde SIEMPRE en Español de España. Sé conciso.

[PREGUNTA DEL USUARIO]
${text}
            `.trim();

            console.log('Sending to N8N Agent:', { text: '[HIDDEN_CONTEXT] + ' + text, sessionId, url: N8N_WEBHOOK_URL });

            // Call N8N Webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: systemContext, // We send the augmented prompt
                    sessionId: sessionId,
                    history: history // Keep history for threading check from N8N side
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

            // ✅ CLEANUP: Remove raw function calls (e.g. <function=check_availability>{})
            // BUT: Keep <function=open_calendar> as it's a frontend trigger
            if (!finalResponse.includes('<function=open_calendar>')) {
                cleanResponse = finalResponse.replace(/<function=(?!open_calendar)[^>]+>.*?<\/function>/g, '').trim();
            } else {
                cleanResponse = finalResponse.replace(/<function=(?!open_calendar)[^>]+>.*?<\/function>/g, '').trim();
            }

            return cleanResponse;

        } catch (error) {
            console.error('AgentService Error:', error);
            // Fallback to offline message if N8N is down
            return "Lo siento, mi cerebro en la nube está reconectando. ¿Podrías intentar de nuevo en 10 segundos?";
        }
    }
}
