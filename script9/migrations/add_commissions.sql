-- Migration: Add commission columns to bookings
-- Description: Adds platform_fee and host_payout columns to track 10% commission

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS platform_fee NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS host_payout NUMERIC(10,2) DEFAULT 0;

COMMENT ON COLUMN bookings.platform_fee IS 'Comisión de la plataforma (10%)';
COMMENT ON COLUMN bookings.host_payout IS 'Monto neto a pagar al desarrollador/host';
