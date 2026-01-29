-- Limpiar datos antiguos
DELETE FROM reviews;
DELETE FROM bookings;
DELETE FROM messages;
DELETE FROM property_features;

-- Borrar propiedades antiguas (necesitamos un WHERE seguro)
DELETE FROM properties;

-- Asegurar usuario host
INSERT INTO auth.users (id, email, password_hash, role, email_confirmed_at)
VALUES (
  '00000000-0000-0000-0000-000000000001', 
  'admin_host@script9.com', 
  'placeholder_hash', 
  'authenticated', 
  now()
) ON CONFLICT (email) DO NOTHING;

-- Insertar usuario público si no existe (via trigger usualmente, pero forzamos por si acaso)
INSERT INTO public.users (id, email, name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin_host@script9.com'), 
  'admin_host@script9.com', 
  'Script9 Official', 
  'host'
) ON CONFLICT (id) DO NOTHING;

-- Insertar Servicios Digitales
-- Asumiendo que 'location' es la columna PostGIS, o usamos lat/long si existen.
-- El error previo 'invalid geometry' sugiere que se intentaba insertar en una columna geo.
-- Probaremos insertar usando st_point si la columna es 'location'::geography
-- O simplemente pasando lat/long floats si la tabla los tiene.

-- 1. Bot Telegram
INSERT INTO properties (
    host_id,
    title,
    description,
    price_per_hour,
    city,
    property_type,
    image_urls,
    amenities,
    max_guests,
    min_booking_hours,
    status,
    latitude,
    longitude,
    location -- Intentamos insertar string si es texto, o wkt
) VALUES (
    (SELECT id FROM auth.users WHERE email = 'admin_host@script9.com'),
    'Bot de Telegram con IA (GPT-4)',
    'Desarrollo de un bot conversacional para Telegram integrado con OpenAI (GPT-4). Capaz de responder preguntas frecuentes.',
    450,
    'Cloud',
    'ia_chatbot',
    ARRAY['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80'],
    ARRAY['python', 'openai', 'telegram_api'],
    50,
    24,
    'active',
    0, 0,
    'POINT(0 0)' -- WKT format for Cloud
);

-- 2. Scraper
INSERT INTO properties (
    host_id, title, description, price_per_hour, city, property_type, image_urls, amenities, max_guests, min_booking_hours, status, latitude, longitude, location
) VALUES (
    (SELECT id FROM auth.users WHERE email = 'admin_host@script9.com'),
    'Scraper de Precios Competencia',
    'Script automatizado en Python para monitorear precios de la competencia en tiempo real.',
    200,
    'Cloud',
    'script',
    ARRAY['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80'],
    ARRAY['python', 'web_scraping', 'pandas'],
    10,
    12,
    'active',
    0, 0,
    'POINT(0 0)'
);

-- 3. Workflow Make
INSERT INTO properties (
    host_id, title, description, price_per_hour, city, property_type, image_urls, amenities, max_guests, min_booking_hours, status, latitude, longitude, location
) VALUES (
    (SELECT id FROM auth.users WHERE email = 'admin_host@script9.com'),
    'Workflow Facturación Automática',
    'Automatización completa de tu proceso de facturación usando Make (Integromat).',
    150,
    'Cloud',
    'workflow',
    ARRAY['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'],
    ARRAY['make', 'stripe', 'email_automation'],
    5,
    5,
    'active',
    0, 0,
    'POINT(0 0)'
);

-- 4. Consultoría
INSERT INTO properties (
    host_id, title, description, price_per_hour, city, property_type, image_urls, amenities, max_guests, min_booking_hours, status, latitude, longitude, location
) VALUES (
    (SELECT id FROM auth.users WHERE email = 'admin_host@script9.com'),
    'Consultoría de Implementación AI',
    'Sesión estratégica para analizar cómo integrar Inteligencia Artificial en tus procesos.',
    80,
    'Online',
    'consultoria',
    ARRAY['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80'],
    ARRAY['consulting', 'ai_strategy'],
    1,
    1,
    'active',
    0, 0,
    'POINT(0 0)'
);

-- 5. Dashboard Notion
INSERT INTO properties (
    host_id, title, description, price_per_hour, city, property_type, image_urls, amenities, max_guests, min_booking_hours, status, latitude, longitude, location
) VALUES (
    (SELECT id FROM auth.users WHERE email = 'admin_host@script9.com'),
    'Dashboard de Ventas en Notion',
    'Sistema operativo de ventas completo en Notion. CRM básico y seguimiento de leads.',
    120,
    'Cloud',
    'automatizacion',
    ARRAY['https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80'],
    ARRAY['notion', 'crm', 'automation'],
    20,
    8,
    'active',
    0, 0,
    'POINT(0 0)'
);
