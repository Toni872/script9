-- ============================================================================
-- TABLA DE LOGS PARA WEBHOOKS DE STRIPE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Información del evento
    event_id TEXT NOT NULL UNIQUE, -- Stripe Event ID
    event_type TEXT NOT NULL, -- payment_intent.succeeded, etc.
    
    -- Estado del procesamiento
    status TEXT NOT NULL CHECK (status IN ('success', 'failed')),
    
    -- Detalles adicionales (JSON)
    details JSONB DEFAULT '{}',
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices para búsquedas
    CONSTRAINT unique_event UNIQUE (event_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_webhook_logs_event_type 
    ON public.webhook_logs(event_type);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_status 
    ON public.webhook_logs(status);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at 
    ON public.webhook_logs(created_at DESC);

-- Comentarios
COMMENT ON TABLE public.webhook_logs IS 'Registro de eventos de webhooks de Stripe';
COMMENT ON COLUMN public.webhook_logs.event_id IS 'ID del evento de Stripe';
COMMENT ON COLUMN public.webhook_logs.event_type IS 'Tipo de evento de Stripe';
COMMENT ON COLUMN public.webhook_logs.status IS 'Estado del procesamiento del webhook';
COMMENT ON COLUMN public.webhook_logs.details IS 'Detalles adicionales en formato JSON';

-- Mensaje
DO $$
BEGIN
    RAISE NOTICE '✅ Tabla webhook_logs creada exitosamente';
END $$;
