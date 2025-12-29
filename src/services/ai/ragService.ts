import { createServerSupabaseClient } from '@/lib/supabase';
import OpenAI from 'openai';

// Initialize OpenAI (ensure OPENAI_API_KEY is in .env)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export class RagService {
    /**
     * Generates embedding for a text string
     */
    private static async generateEmbedding(text: string): Promise<number[]> {
        const response = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: text.replace(/\n/g, ' '),
        });
        return response.data[0].embedding;
    }

    /**
     * Adds a document to the knowledge base
     */
    static async addDocument(content: string, metadata: Record<string, any> = {}) {
        const supabase = createServerSupabaseClient();
        const embedding = await this.generateEmbedding(content);

        const { error } = await supabase.from('knowledge_base').insert({
            content,
            metadata,
            embedding,
        });

        if (error) {
            throw new Error(`Failed to add document: ${error.message}`);
        }
    }

    /**
     * Searches for similar documents
     */
    static async search(query: string, threshold = 0.5, limit = 5) {
        const supabase = createServerSupabaseClient();
        const embedding = await this.generateEmbedding(query);

        const { data: documents, error } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: limit,
        });

        if (error) {
            throw new Error(`Failed to search knowledge base: ${error.message}`);
        }

        return documents;
    }
}
