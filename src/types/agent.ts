export interface CRMLead {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    source: 'web' | 'whatsapp' | 'email';
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
    notes?: string;
    last_contact_at: string;
    created_at: string;
    updated_at: string;
    user_id?: string;
}

export interface CRMQuoteItem {
    service: string;
    description?: string;
    price: number;
    unit: string; // 'project', 'hour', etc.
    quantity: number;
}

export interface CRMQuote {
    id: string;
    lead_id: string;
    services: CRMQuoteItem[];
    total_amount: number;
    currency: string;
    status: 'draft' | 'sent' | 'accepted' | 'rejected';
    valid_until?: string;
    pdf_url?: string;
    created_at: string;
    updated_at: string;
}

export interface AgentConversation {
    id: string;
    lead_id?: string;
    user_id?: string;
    channel: 'web_chat' | 'whatsapp' | 'email';
    channel_thread_id?: string;
    status: 'active' | 'closed' | 'handoff_to_human';
    subject?: string;
    summary?: string;
    created_at: string;
    updated_at: string;
}

export interface AgentMessage {
    id: string;
    conversation_id: string;
    role: 'user' | 'assistant' | 'system' | 'function' | 'tool';
    content: string;
    tool_calls?: any[];
    tool_call_id?: string;
    created_at: string;
}

export interface KnowledgeChunk {
    id: string;
    content: string;
    metadata?: Record<string, any>;
    similarity?: number;
}
