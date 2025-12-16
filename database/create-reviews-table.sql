-- Tabla de reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) UNIQUE NOT NULL,
  property_id UUID REFERENCES properties(id) NOT NULL,
  guest_id UUID REFERENCES users(id) NOT NULL,
  host_id UUID REFERENCES users(id) NOT NULL,

  -- Ratings (1-5)
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),

  -- Review text
  review_text TEXT NOT NULL,
  host_response TEXT,
  host_response_date TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT reviews_booking_completed CHECK (
    (SELECT status FROM bookings WHERE id = booking_id) = 'completed'
  )
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_reviews_property ON reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_guest ON reviews(guest_id);
CREATE INDEX IF NOT EXISTS idx_reviews_host ON reviews(host_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Agregar campos de rating a propiedades
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0;

-- Función para actualizar rating promedio de propiedad
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE properties
  SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE property_id = NEW.property_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE property_id = NEW.property_id
    ),
    updated_at = NOW()
  WHERE id = NEW.property_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar rating al insertar review
CREATE TRIGGER trigger_update_property_rating_insert
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_rating();

-- Trigger para actualizar rating al actualizar review
CREATE TRIGGER trigger_update_property_rating_update
AFTER UPDATE ON reviews
FOR EACH ROW
WHEN (OLD.rating IS DISTINCT FROM NEW.rating)
EXECUTE FUNCTION update_property_rating();

-- Trigger para actualizar rating al eliminar review
CREATE TRIGGER trigger_update_property_rating_delete
AFTER DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_rating();

-- Tabla de email logs
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  type VARCHAR(50) NOT NULL,
  recipient VARCHAR(255) NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_email_logs_booking ON email_logs(booking_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(type);
