-- Índices para optimizar búsquedas

-- Índice GiST para búsquedas geoespaciales
CREATE INDEX IF NOT EXISTS idx_properties_location_gist ON properties USING GIST(location);

-- Índices para filtros comunes
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price_per_hour, price_per_day);
CREATE INDEX IF NOT EXISTS idx_properties_city_region ON properties(city, region);
CREATE INDEX IF NOT EXISTS idx_properties_rating ON properties(average_rating DESC) WHERE average_rating > 0;
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_properties_max_guests ON properties(max_guests);

-- Full-Text Search
ALTER TABLE properties ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Crear índice GIN para full-text search
CREATE INDEX IF NOT EXISTS idx_properties_search_vector ON properties USING GIN(search_vector);

-- Función para actualizar search_vector
CREATE OR REPLACE FUNCTION update_properties_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('spanish',
    COALESCE(NEW.title, '') || ' ' ||
    COALESCE(NEW.description, '') || ' ' ||
    COALESCE(NEW.city, '') || ' ' ||
    COALESCE(NEW.region, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar search_vector automáticamente
DROP TRIGGER IF EXISTS trigger_update_search_vector ON properties;
CREATE TRIGGER trigger_update_search_vector
BEFORE INSERT OR UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_properties_search_vector();

-- Actualizar search_vector para propiedades existentes
UPDATE properties SET search_vector = to_tsvector('spanish',
  COALESCE(title, '') || ' ' ||
  COALESCE(description, '') || ' ' ||
  COALESCE(city, '') || ' ' ||
  COALESCE(region, '')
);

-- Vista materializada para búsquedas populares (opcional)
CREATE MATERIALIZED VIEW IF NOT EXISTS popular_properties AS
SELECT
  p.*,
  COUNT(b.id) as booking_count,
  COALESCE(AVG(r.rating), 0) as avg_review_rating
FROM properties p
LEFT JOIN bookings b ON p.id = b.property_id AND b.status = 'completed'
LEFT JOIN reviews r ON p.id = r.property_id
WHERE p.status = 'active'
GROUP BY p.id
ORDER BY booking_count DESC, avg_review_rating DESC
LIMIT 100;

-- Índice en la vista materializada
CREATE INDEX IF NOT EXISTS idx_popular_properties_booking_count ON popular_properties(booking_count DESC);

-- Función para refrescar vista materializada (ejecutar periódicamente)
CREATE OR REPLACE FUNCTION refresh_popular_properties()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY popular_properties;
END;
$$ LANGUAGE plpgsql;

-- Tabla para búsquedas populares/analytics
CREATE TABLE IF NOT EXISTS search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query TEXT,
  filters JSONB,
  results_count INTEGER,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_logs_query ON search_logs(search_query);
CREATE INDEX IF NOT EXISTS idx_search_logs_created_at ON search_logs(created_at DESC);
