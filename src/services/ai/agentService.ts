import OpenAI from 'openai';
import { RagService } from './ragService';
import { createServerSupabaseClient } from '@/lib/supabase';
import { CRMLead, CRMQuote } from '@/types/agent';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// SYSTEM PROMPT
const SYSTEM_PROMPT = `
You are the Script9 Commercial Assistant. Your goal is to help potential clients understand our services (AI & Automation), generate quotes, and capture their contact information.

BEHAVIOR:
1. Be professional, concise, and helpful.
2. Use the "search_knowledge" tool to answer questions about Script9 services.
3. If a user seems interested in a specific service, encourage them to get a quote.
4. To generate a quote, you MUST collect: Service Type (e.g., Chatbot, Automation), Estimated Hours (or Complexity), and Client Name.
5. If the user provides valid contact info, use "save_lead" to record it.

SERVICES:
- AI Chatbots
- Process Automation (n8n, Make)
- Custom Scripts (Python, Node.js)
- Workflow Optimization

TONE:
Modern, tech-savvy, efficient. "Plan Moves" style expert helper.
`;

export class AgentService {
    /**
     * Main chat function with tool handling loop
     */
    static async chat(
        history: any[], // Allow flexible message types
    ): Promise<string | null> {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history
        ];

        const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
            {
                type: 'function',
                function: {
                    name: 'search_knowledge',
                    description: 'Search the knowledge base for info about Script9 services or technical details.',
                    parameters: {
                        type: 'object',
                        properties: {
                            query: { type: 'string', description: 'The search query' },
                        },
                        required: ['query'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'calculate_quote',
                    description: 'Generate a preliminary quote based on service and complexity.',
                    parameters: {
                        type: 'object',
                        properties: {
                            serviceType: { type: 'string', enum: ['Chatbot', 'Automation', 'Script', 'Consulting'] },
                            complexity: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                            clientName: { type: 'string' },
                        },
                        required: ['serviceType', 'complexity'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'save_lead',
                    description: 'Save prospect contact information to the CRM when they show intent.',
                    parameters: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            email: { type: 'string' },
                            phone: { type: 'string' },
                            notes: { type: 'string' },
                        },
                        required: ['email'],
                    },
                },
            },
        ];

        console.log('Starting Agent Chat Loop...');
        let iterations = 0;
        while (iterations < 5) {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: messages as any,
                tools,
                tool_choice: 'auto',
            });

            const message = response.choices[0].message;
            messages.push(message as any); // Add assistant message to history

            // If no tool calls, we are done
            if (!message.tool_calls || message.tool_calls.length === 0) {
                return message.content;
            }

            // Handle tool calls
            for (const toolCall of message.tool_calls) {
                if (toolCall.type !== 'function') continue;

                console.log(`Executing tool: ${toolCall.function.name}`);
                const args = JSON.parse(toolCall.function.arguments);
                let result = '';

                try {
                    switch (toolCall.function.name) {
                        case 'search_knowledge':
                            const docs = await RagService.search(args.query);
                            result = JSON.stringify(docs.map((d: { content: string }) => d.content)); // Simplify context
                            break;

                        case 'calculate_quote':
                            // Simple mock pricing logic
                            const basePrice = args.serviceType === 'Chatbot' ? 1500 : 800;
                            const multiplier = args.complexity === 'High' ? 2.5 : args.complexity === 'Medium' ? 1.5 : 1;
                            const total = basePrice * multiplier;
                            result = JSON.stringify({
                                quote_summary: `Presupuesto estimado para ${args.serviceType}`,
                                details: `Complejidad: ${args.complexity}. Precio base: ${basePrice}€. Factor: ${multiplier}.`,
                                amount: total,
                                currency: 'EUR',
                                valid_for: '7 days',
                                status: 'ESTIMATE'
                            });
                            break;

                        case 'save_lead':
                            const supabase = createServerSupabaseClient();
                            const { error } = await supabase.from('crm_leads').insert({
                                name: args.name,
                                email: args.email,
                                phone: args.phone,
                                notes: args.notes,
                                source: 'agent',
                                status: 'new'
                            });
                            if (error) throw new Error(error.message);
                            result = JSON.stringify({ success: true, message: "Lead saved successfully." });
                            break;

                        default:
                            result = JSON.stringify({ error: 'Unknown tool' });
                    }
                } catch (err: any) {
                    console.error(`Tool error: ${err.message}`);
                    result = JSON.stringify({ error: err.message });
                }

                // Add tool result to messages
                messages.push({
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: result,
                } as any);
            }

            iterations++;
        }

        return "Lo siento, he tenido un problema técnico procesando tu solicitud.";
    }
}
