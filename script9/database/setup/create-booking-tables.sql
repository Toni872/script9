-- ============================================================================
-- CREAR TABLAS DEL SISTEMA DE RESERVAS (SIN FUNCIONES COMPLEJAS)
-- ============================================================================

-- 1. TABLA DE RESERVAS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    check_in TIMESTAMPTZ NOT NULL,
    check_out TIMESTAMPTZ NOT NULL,
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    guests_count INT NOT NULL,
    total_hours NUMERIC(10,2) NOT NULL,
    price_per_hour NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    service_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_intent_id TEXT,
    stripe_charge_id TEXT,
    paid_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES public.users(id),
    cancellation_reason TEXT,
    guest_notes TEXT,
    host_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_dates CHECK (check_out > check_in),
    CONSTRAINT check_guests CHECK (guests_count > 0),
    CONSTRAINT check_amounts CHECK (total_amount >= 0 AND subtotal >= 0)
);

CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON public.bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_id ON public.bookings(guest_id);
CREATE INDEX IF NOT EXISTS idx_bookings_host_id ON public.bookings(host_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON public.bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON public.bookings(check_in, check_out);

-- 2. TABLA DE NOTIFICACIONES
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL
        CHECK (type IN ('booking_request', 'booking_confirmed', 'booking_cancelled', 
                       'payment_received', 'payment_failed', 'message_received', 
                       'review_received', 'system_alert')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    related_property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    related_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);

-- 3. TABLA DE MENSAJES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_booking_id ON public.messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON public.messages(recipient_id);

-- 4. TABLA DE RESEÑAS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    review_type VARCHAR(10) NOT NULL CHECK (review_type IN ('guest', 'host')),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    cleanliness_rating INT CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    communication_rating INT CHECK (communication_rating >= 1 AND communication_rating <= 5),
    accuracy_rating INT CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
    comment TEXT,
    response TEXT,
    response_date TIMESTAMPTZ,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_property_id ON public.reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON public.reviews(reviewer_id);

-- 5. TABLA DE DISPONIBILIDAD
CREATE TABLE IF NOT EXISTS public.property_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    reason VARCHAR(50) NOT NULL DEFAULT 'booked'
        CHECK (reason IN ('booked', 'blocked', 'maintenance')),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_availability_dates CHECK (end_date > start_date)
);

CREATE INDEX IF NOT EXISTS idx_availability_property_id ON public.property_availability(property_id);

-- RESUMEN
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '✅ TABLAS CREADAS EXITOSAMENTE:';
    RAISE NOTICE '   • bookings';
    RAISE NOTICE '   • notifications';
    RAISE NOTICE '   • messages';
    RAISE NOTICE '   • reviews';
    RAISE NOTICE '   • property_availability';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 Siguiente paso: Ejecutar funciones y triggers';
END $$;
