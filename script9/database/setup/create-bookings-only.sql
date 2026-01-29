-- ============================================================================
-- CREAR SOLO LA TABLA BOOKINGS (PASO 1)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Referencias
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Fechas y horarios
    check_in TIMESTAMPTZ NOT NULL,
    check_out TIMESTAMPTZ NOT NULL,
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    
    -- Información de la reserva
    guests_count INT NOT NULL,
    total_hours NUMERIC(10,2) NOT NULL,
    
    -- Precios
    price_per_hour NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    service_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,
    
    -- Estado de la reserva
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
    
    -- Información de pago
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_intent_id TEXT,
    stripe_charge_id TEXT,
    paid_at TIMESTAMPTZ,
    
    -- Cancelación
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES public.users(id),
    cancellation_reason TEXT,
    
    -- Notas adicionales
    guest_notes TEXT,
    host_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT check_dates CHECK (check_out > check_in),
    CONSTRAINT check_guests CHECK (guests_count > 0),
    CONSTRAINT check_amounts CHECK (total_amount >= 0 AND subtotal >= 0)
);

-- Mensaje
DO $$
BEGIN
    RAISE NOTICE '✅ Tabla bookings creada exitosamente';
END $$;
