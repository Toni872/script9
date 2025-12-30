
import { CRMLead, CRMQuote } from '@/types/agent';
import { createServerSupabaseClient } from '@/lib/supabase';

// Mock Agent Service for Demo purposes (No OpenAI costs)
export class AgentService {
    /**
     * Main chat function using simple keyword matching (Rule-Based)
     * To avoid costs for the demo.
     */
    static async chat(
        history: any[], // Allow flexible message types
    ): Promise<string | null> {
        // Extract latest user message
        const lastMessage = history[history.length - 1];
        const text = (lastMessage.content || "").toLowerCase();

        // 1. Simulate Network Delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 2. Rule-Based Logic (Mock Brain)

        // GREETINGS
        if (text.includes('hola') || text.includes('buenos') || text.includes('empezar')) {
            return "¡Hola! Soy el Agente Virtual de Script9. ¿En qué puedo ayudarte? Puedo darte un presupuesto aproximado o explicarte cómo funciona nuestra tecnología.";
        }

        // SERVICES & EXPLANATIONS
        if (text.includes('funciona') || text.includes('que haces') || text.includes('servicios')) {
            return "Utilizo modelos de IA avanzados conectados a tu base de datos. Puedo atender clientes por WhatsApp, generar facturas PDF automáticamente y guardar los leads en tu CRM sin intervención humana. ¿Te gustaría ver un ejemplo de precios?";
        }

        if (text.includes('chatbot') || text.includes('whatsapp')) {
            return "Nuestros Chatbots IA para WhatsApp no son simples flujos de botones. Entienden lenguaje natural, pueden consultar tu stock y agendar citas. La implementación suele tardar menos de 2 semanas.";
        }

        if (text.includes('crm') || text.includes('lead')) {
            return "Puedo cualificar leads automáticamente. Cuando un cliente muestra interés real, guardo su contacto en tu CRM (HubSpot, Salesforce, o nuestro propio CRM Script9) y te aviso para que cierres la venta.";
        }

        // PRICING / QUOTES
        if (text.includes('precio') || text.includes('coste') || text.includes('cuanto') || text.includes('presupuesto')) {
            return "Nuestros proyectos suelen oscilar entre 1.500€ y 5.000€ dependiendo de la complejidad. \n\nPor ejemplo:\n- **Chatbot Comercial**: ~1.500€\n- **Sistema Completo (Web+WhatsApp+CRM)**: ~3.500€\n\n¿Qué tipo de automatización tienes en mente?";
        }

        if (text.includes('caro') || text.includes('barato')) {
            return "Piensa en el ROI. Un empleado de soporte cuesta ~20.000€/año. Yo trabajo 24/7 por una fracción de ese coste y no cometo errores humanos.";
        }

        // CLOSING / CONTACT
        if (text.includes('contactar') || text.includes('hablar') || text.includes('reunion') || text.includes('cita')) {
            return "¡Genial! La mejor forma de avanzar es agendar una breve sesión técnica de 15 minutos. Puedes hacerlo directamente aquí: [Agendar Reunión](/contacto).";
        }

        if (text.includes('gracias') || text.includes('adios')) {
            return "¡Gracias a ti! Espero haberte ayudado. Si tienes más dudas sobre cómo automatizar tu negocio, aquí estaré.";
        }

        // FALLBACK (Default response)
        return "Entiendo. Para darte una respuesta precisa sobre eso, lo ideal sería que un consultor humano analice tu caso. ¿Te gustaría agendar una breve llamada técnica?";
    }
}
