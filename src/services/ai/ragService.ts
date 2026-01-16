import { createServerSupabaseClient } from '@/lib/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini (ensure GEMINI_API_KEY is in .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class RagService {
    /**
     * Generates embedding for a text string using Google Gemini
     * Model: embedding-001 (Optimized for retrieval)
     */
    private static async generateEmbedding(text: string): Promise<number[]> {
        if (!process.env.GEMINI_API_KEY) {
            console.error("Missing GEMINI_API_KEY");
            return [];
        }

        try {
            const model = genAI.getGenerativeModel({ model: "embedding-001" });
            const result = await model.embedContent(text);
            const embedding = result.embedding;
            return embedding.values;
        } catch (error) {
            console.error("Gemini Embedding Error:", error);
            // Return empty array or throw, depending on resilience needed
            return [];
        }
    }

    /**
     * Adds a document to the knowledge base
     */
    static async addDocument(content: string, metadata: Record<string, any> = {}) {
        const supabase = createServerSupabaseClient();
        const embedding = await this.generateEmbedding(content);

        if (embedding.length === 0) {
            throw new Error("Failed to generate embedding");
        }

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

        if (embedding.length === 0) return [];

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
