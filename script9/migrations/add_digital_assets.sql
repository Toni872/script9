-- Migration: Add digital assets support
-- Description: Adds download_url and product_type to properties table

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS download_url TEXT,
ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'service'; -- 'service' or 'digital_product'

COMMENT ON COLUMN properties.download_url IS 'URL de descarga del archivo (si es producto digital)';
COMMENT ON COLUMN properties.product_type IS 'Tipo de producto: service (reserva por horas) o digital_product (compra única)';
