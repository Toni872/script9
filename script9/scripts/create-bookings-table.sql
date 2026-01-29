-- Script para crear/actualizar la tabla bookings con la estructura correcta
-- Ejecutar en Supabase SQL Editor

-- Crear tabla bookings si no existe
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Fechas y horarios
    check_in TIMESTAMPTZ NOT NULL,
    check_out TIMESTAMPTZ NOT NULL,
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    
    -- Detalles de la reserva
    guests_count INTEGER NOT NULL DEFAULT 1,
    total_hours INTEGER NOT NULL DEFAULT 1,
    price_per_hour DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    service_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Estados
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    
    -- Información de pago
    payment_intent_id TEXT,
    stripe_charge_id TEXT,
    paid_at TIMESTAMPTZ,
    
    -- Cancelación
    cancelled_at TIMESTAMPTZ,
    cancelled_by TEXT,
    cancellation_reason TEXT,
    
    -- Notas
    guest_notes TEXT,
    host_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX IF NOT EXISTS idx_bookings_host_id ON bookings(host_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_check_out ON bookings(check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para bookings
-- Los huéspedes pueden ver sus propias reservas
CREATE POLICY "Guests can view their own bookings" ON bookings
    FOR SELECT USING (auth.uid() = guest_id);

-- Los hosts pueden ver las reservas de sus propiedades
CREATE POLICY "Hosts can view their property bookings" ON bookings
    FOR SELECT USING (auth.uid() = host_id);

-- Los huéspedes pueden crear reservas
CREATE POLICY "Guests can create bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = guest_id);

-- Los hosts pueden actualizar el estado de sus reservas
CREATE POLICY "Hosts can update their property bookings" ON bookings
    FOR UPDATE USING (auth.uid() = host_id);

-- Los huéspedes pueden cancelar sus propias reservas
CREATE POLICY "Guests can cancel their own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = guest_id AND status IN ('pending', 'confirmed'));

-- Los administradores pueden hacer todo
CREATE POLICY "Admins can do everything" ON bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Verificar que la tabla se creó correctamente
SELECT 'Tabla bookings creada/actualizada correctamente' as status;


