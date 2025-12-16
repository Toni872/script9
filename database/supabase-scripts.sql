CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role VARCHAR(10) CHECK (role IN ('host', 'guest', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT false,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  country TEXT DEFAULT 'ES',
  price_per_hour NUMERIC(10,2) NOT NULL,
  price_per_day NUMERIC(10,2) NOT NULL,
  min_booking_hours INT DEFAULT 4,
  max_guests INT NOT NULL,
  is_script9_select BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_features (
  property_id UUID REFERENCES properties(id),
  feature VARCHAR(50) NOT NULL,
  PRIMARY KEY (property_id, feature)
);