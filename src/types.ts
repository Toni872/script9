export interface User {
    id: string;
    name: string;
    email: string;
    role?: 'host' | 'guest' | 'admin';
    subscription_tier?: 'free' | 'starter' | 'pro' | 'enterprise';
    created_at?: string;
    updated_at: string;
}

// Renamed from Property to match new "Digital Service" model
// This interface represents a Service/Product in the marketplace
export interface Service {
    id: string;
    title: string;
    description: string;
    // Mapped fields from DB 'properties' table
    category: string; // was address/city/region loosely used for categories
    price: number;    // was price_per_hour
    unit: string;     // 'hour', 'project', 'month'
    price_display_text?: string; // Optional override e.g. "Desde 1000€"
    custom_url?: string;         // Optional direct link (override catalog/id)

    // B2B Service Fields
    delivery_time?: string;      // e.g. "2 semanas"
    maintenance_support?: string; // e.g. "Soporte incluido 3 meses"
    tech_stack?: string[];       // e.g. ["Python", "React"]

    // Legacy fields (Deprecated)
    location?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
    price_per_hour?: number;
    is_script9_select?: boolean;
    capacity?: number;
    max_guests?: number; // DEPRECATED: Do not use
    property_type?: string;
    amenities?: string[]; // DEPRECATED: Use features or tech_stack
    images?: string[]; // legacy alias for image_urls

    provider_id: string; // was host_id
    host_id: string;     // kept for DB compatibility

    rating: number;
    review_count: number;
    image_urls: string[];
    features: Array<{
        id: string;
        name: string;
        icon?: string;
    }>;
    created_at: string;
    updated_at: string;
}

// Alias for backward compatibility during refactor
export type Property = Service;

export interface PropertyFeature {
    property_id: string;
    feature: string;
}

export interface PropertyImage {
    id: string;
    property_id: string;
    image_url: string;
    is_primary: boolean;
    created_at: string;
}

export interface Booking {
    id: string;
    service_id: string; // was property_id
    property_id: string; // kept for DB compatibility

    client_id: string;   // was guest_id
    guest_id: string;    // kept for DB compatibility

    provider_id: string; // was host_id
    host_id: string;     // kept for DB compatibility

    start_date: string;  // was check_in
    check_in: string;    // kept for DB compatibility

    completion_date: string; // was check_out
    check_out: string;       // kept for DB compatibility

    booking_date: string;
    total_hours: number;
    price_per_hour: number;
    subtotal: number;
    service_fee: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
    stripe_payment_id?: string;
    payment_intent_id?: string;
    stripe_charge_id?: string;
    paid_at?: string;
    cancelled_at?: string;
    cancelled_by?: string;
    cancellation_reason?: string;
    notes?: string;      // was guest_notes
    guest_notes?: string; // kept for DB compatibility

    created_at: string;
    updated_at: string;

    // Relations
    service?: Service;
    property?: Service; // Alias
    client?: User;
    guest?: User; // Alias
    provider?: User;
    host?: User; // Alias
}

export interface Review {
    id: string;
    booking_id: string;
    service_id: string; // was property_id
    property_id: string; // legacy

    client_id: string; // was guest_id
    guest_id: string;  // legacy

    provider_id: string; // was host_id
    host_id: string;     // legacy

    rating: number;
    review_text: string;
    response?: string;         // was host_response
    host_response?: string;    // legacy

    created_at: string;
    updated_at: string;

    client?: User;
    guest?: User;
    service?: Service;
    property?: Service;
    provider?: User;
    host?: User;
}

// Tipos para el sistema de mensajería (Chat)
export interface Conversation {
    id: string;
    booking_id: string;

    client_id: string; // was guest_id
    guest_id: string;  // legacy

    provider_id: string; // was host_id
    host_id: string;     // legacy

    service_id: string; // was property_id
    property_id: string; // legacy

    last_message_at: string;
    last_message_preview: string;
    client_unread_count: number; // was guest_unread_count
    guest_unread_count: number;  // legacy

    provider_unread_count: number; // was host_unread_count
    host_unread_count: number;     // legacy

    created_at: string;
    updated_at: string;

    booking?: Booking;
    client?: User;
    guest?: User;
    provider?: User;
    host?: User;
    service?: Service;
    property?: Service;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    message_text: string;
    is_read: boolean;
    read_at?: string;
    created_at: string;
    sender?: User;
    conversation?: Conversation;
}

export interface DatabaseProperty {
    id: string;
    title: string;
    description: string;
    price_per_hour: number;
    host_id: string;
    created_at: string;
    updated_at: string;

    // Optional / Nullable fields
    address?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
    average_rating?: number;
    review_count?: number;
    property_type?: string;
    max_guests?: number;
    is_script9_select?: boolean;
    status?: string;
    search_vector?: any;

    // Legacy or simplified fields occasionally used
    images?: string[];

    // Joins
    property_images?: {
        id?: string;
        image_url: string;
        is_primary: boolean;
    }[];

    property_features?: {
        feature: string;
    }[];
}
