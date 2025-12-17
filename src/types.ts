export interface User {
    id: string;
    name: string;
    email: string;
    role?: 'host' | 'guest' | 'admin';
    subscription_tier?: 'free' | 'starter' | 'pro' | 'enterprise';
    created_at?: string;
    updated_at: string;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    region: string;
    location: string;
    price_per_hour: number;
    price_per_day: number;
    min_booking_hours: number;
    max_guests: number;
    host_id: string;
    rating: number;
    review_count: number;
    image_urls: string[];
    features: Array<{
        id: string;
        name: string;
        icon?: string;
    }>;
    coordinates?: {
        lat: number;
        lng: number;
    };
    created_at: string;
    updated_at: string;
}

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
    property_id: string;
    guest_id: string;
    host_id: string;
    check_in: string;
    check_out: string;
    booking_date: string;
    total_hours: number;
    price_per_hour: number;
    subtotal: number;
    service_fee: number;
    total_price: number; // Nombre real en BD
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
    stripe_payment_id?: string; // Nombre real en BD
    payment_intent_id?: string;
    stripe_charge_id?: string;
    paid_at?: string;
    cancelled_at?: string;
    cancelled_by?: string;
    cancellation_reason?: string;
    guest_notes?: string;
    host_notes?: string;
    created_at: string;
    updated_at: string;
    // Campos opcionales de relaciones
    property?: Property;
    guest?: User;
    host?: User;
}

export interface Review {
    id: string;
    booking_id: string;
    property_id: string;
    guest_id: string;
    host_id: string;
    rating: number;
    cleanliness_rating?: number;
    communication_rating?: number;
    accuracy_rating?: number;
    location_rating?: number;
    value_rating?: number;
    review_text: string;
    host_response?: string;
    host_response_date?: string;
    created_at: string;
    updated_at: string;
    // Relaciones opcionales
    guest?: User;
    property?: Property;
    host?: User;
}

// Tipos para el sistema de mensajería
export interface Conversation {
    id: string;
    booking_id: string;
    guest_id: string;
    host_id: string;
    property_id: string;
    last_message_at: string;
    last_message_preview: string;
    guest_unread_count: number;
    host_unread_count: number;
    created_at: string;
    updated_at: string;
    // Relaciones opcionales
    booking?: Booking;
    guest?: User;
    host?: User;
    property?: Property;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    message_text: string;
    is_read: boolean;
    read_at?: string;
    created_at: string;
    // Relaciones opcionales
    sender?: User;
    conversation?: Conversation;
}
