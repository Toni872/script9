-- Script para insertar propiedades de ejemplo en Script9
-- Ejecutar en Supabase SQL Editor

-- Primero, asegúrate de tener un usuario host
-- Si no tienes, crea uno o usa un ID de usuario existente

-- IMPORTANTE: Reemplaza 'TU_USER_ID_AQUI' con un ID de usuario real de tu base de datos
-- Puedes obtener un ID ejecutando: SELECT id FROM users WHERE role = 'host' LIMIT 1;

-- Villa de Lujo en Marbella
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Villa Premium con Vistas al Mar en Marbella',
  'Espectacular villa de lujo con piscina infinita y vistas panorámicas al Mediterráneo. Perfecta para eventos exclusivos, celebraciones y retiros corporativos. Diseño moderno con acabados de primera calidad, jardines tropicales y terrazas amplias. Capacidad para 50 personas con zona de DJ, bar exterior y cocina profesional.',
  'villa',
  'Calle Sierra Blanca 45',
  'Marbella',
  'Andalucía',
  '29602',
  36.5108,
  -4.8836,
  50,
  8,
  6,
  350,
  4,
  24,
  ARRAY['Piscina infinita', 'WiFi alta velocidad', 'Aire acondicionado', 'Calefacción', 'Cocina equipada', 'Bar exterior', 'Zona DJ', 'Jardín tropical', 'Parking privado', 'Vistas al mar', 'Terraza amplia', 'Barbacoa', 'Sistema de sonido premium'],
  ARRAY['No fumar en interiores', 'No mascotas', 'Respetar horarios de la comunidad', 'Máximo de ruido a las 23:00h', 'Dejar el espacio limpio'],
  ARRAY[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Finca Rústica en Toledo
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Finca Rústica con Encanto en Toledo',
  'Auténtica finca toledana restaurada con 200 años de historia. Ideal para bodas, celebraciones familiares y eventos corporativos. Amplios jardines con olivos centenarios, salón de eventos con capacidad para 80 personas, catering disponible. Ambiente único que combina tradición y comodidad moderna.',
  'finca',
  'Camino de la Vega 12',
  'Toledo',
  'Castilla-La Mancha',
  '45001',
  39.8628,
  -4.0273,
  80,
  6,
  4,
  280,
  6,
  48,
  ARRAY['Jardín con olivos', 'Salón de eventos', 'Cocina profesional', 'Catering disponible', 'Parking para 30 coches', 'WiFi', 'Aire acondicionado', 'Chimenea', 'Zona infantil', 'Carpas opcionales', 'Iluminación exterior', 'Mobiliario incluido'],
  ARRAY['Respetar el entorno natural', 'No fumar en interiores', 'Música ambiente hasta 23:00h', 'Capacidad máxima 80 personas', 'Dejar limpio'],
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Espacio para Eventos en Barcelona
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Loft Premium para Eventos Privados en Barcelona',
  'Espacio exclusivo de 400m² en el corazón de Barcelona, diseñado específicamente para eventos privados, fiestas, presentaciones y shooting. Equipamiento profesional de sonido e iluminación, barra americana, zona lounge y terraza privada con vistas a la ciudad. Ideal para celebraciones de hasta 120 personas.',
  'loft',
  'Passeig de Gràcia 88',
  'Barcelona',
  'Cataluña',
  '08008',
  41.3948,
  2.1620,
  120,
  2,
  3,
  450,
  4,
  24,
  ARRAY['Sistema de sonido profesional', 'Iluminación LED', 'Barra americana', 'DJ booth', 'Zona lounge', 'Terraza privada', 'WiFi fibra óptica', 'Aire acondicionado', 'Proyector 4K', 'Cocina catering', 'Guardarropa', 'Seguridad 24/7', 'Ascensor privado'],
  ARRAY['No fumar en interiores', 'Respetar capacidad máxima', 'Música hasta 02:00h (permiso especial)', 'Limpieza obligatoria post-evento', 'Deposito reembolsable'],
  ARRAY[
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Villa Contemporánea en Ibiza
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Villa Contemporánea con Sunset Views en Ibiza',
  'Icónica villa de diseño contemporáneo en la costa oeste de Ibiza. Espacio ideal para fiestas privadas, sesiones fotográficas y eventos VIP. Piscina infinita de 25m, jacuzzi exterior, zona chill-out con vistas al atardecer. Diseño minimalista de lujo con certificación sostenible.',
  'villa',
  'Cala Conta s/n',
  'Sant Josep de sa Talaia',
  'Islas Baleares',
  '07830',
  38.9629,
  1.2216,
  40,
  6,
  5,
  500,
  6,
  24,
  ARRAY['Piscina infinita 25m', 'Jacuzzi exterior', 'Zona chill-out', 'WiFi fibra', 'Sistema Sonos', 'Cocina gourmet', 'Bodega climatizada', 'Gimnasio', 'Sauna', 'Vistas al mar', 'Acceso directo a playa', 'Helipuerto cercano', 'Servicio de chef (opcional)'],
  ARRAY['Check-in flexible', 'No eventos masivos', 'Respeto absoluto al entorno', 'Música ambiente permitida', 'Limpieza profesional incluida'],
  ARRAY[
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Masía Catalana en Girona
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Masía Catalana Restaurada en Girona',
  'Masía del siglo XVIII completamente restaurada, manteniendo su encanto original. Perfecta para bodas íntimas, reuniones familiares y retiros empresariales. 5 hectáreas de terreno privado con viñedos, huerto ecológico y bosque mediterráneo. Capacidad para 60 personas con salón de banquetes, cocina de leña y capilla privada.',
  'finca',
  'Mas Roig de Dalt',
  'Girona',
  'Cataluña',
  '17001',
  41.9794,
  2.8214,
  60,
  8,
  5,
  300,
  8,
  72,
  ARRAY['Viñedos propios', 'Huerto ecológico', 'Salón de banquetes', 'Cocina de leña', 'Capilla privada', 'Parking amplio', 'WiFi', 'Chimenea de piedra', 'Terraza panorámica', 'Zona de juegos', 'Paseos a caballo (extra)', 'Catas de vino'],
  ARRAY['No fumar en interiores', 'Respetar la naturaleza', 'Capacidad máxima 60 personas', 'Eventos hasta 01:00h', 'Limpieza incluida'],
  ARRAY[
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Chalet de Montaña en Sierra de Guadarrama
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Chalet de Montaña con Spa Privado - Sierra de Guadarrama',
  'Refugio de montaña de lujo con vistas espectaculares a la Sierra de Guadarrama. Spa privado con jacuzzi, sauna finlandesa y sala de masajes. Ideal para retiros wellness, team building y celebraciones íntimas. Chimenea de piedra, biblioteca con vinilos y zona de yoga exterior. Ambiente único de relax y exclusividad.',
  'chalet',
  'Camino de la Pedriza 23',
  'Manzanares el Real',
  'Comunidad de Madrid',
  '28410',
  40.7294,
  -3.8578,
  30,
  5,
  4,
  250,
  4,
  48,
  ARRAY['Spa privado', 'Jacuzzi', 'Sauna finlandesa', 'Sala de masajes', 'Chimenea de piedra', 'Biblioteca', 'Zona de yoga', 'Vistas a la montaña', 'Cocina gourmet', 'Bodega de vinos', 'WiFi', 'Parking cubierto', 'Senderismo guiado (extra)'],
  ARRAY['Ambiente de relax y respeto', 'No fiestas ruidosas', 'No fumar', 'Respeto a la naturaleza', 'Check-out con limpieza básica'],
  ARRAY[
    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Ático Moderno en Madrid Centro
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Ático Exclusivo con Terraza Panorámica en Madrid',
  'Espectacular ático de 300m² en pleno centro de Madrid con terraza de 150m² y vistas 360° a la ciudad. Perfecto para fiestas privadas, eventos corporativos, shooting y celebraciones VIP. Diseño contemporáneo con coctelera profesional, zona chill-out y sistema de climatización premium.',
  'atico',
  'Gran Vía 45, 15º',
  'Madrid',
  'Comunidad de Madrid',
  '28013',
  40.4200,
  -3.7078,
  70,
  4,
  3,
  400,
  4,
  24,
  ARRAY['Terraza 150m²', 'Vistas 360°', 'Coctelera profesional', 'Sistema de sonido Bose', 'Iluminación LED programable', 'Zona chill-out', 'Cocina americana', 'WiFi 1GB', 'Ascensor privado', 'Parking valet (extra)', 'Servicio bartender (extra)', 'Catering disponible'],
  ARRAY['Capacidad máxima 70 personas', 'Música hasta 02:00h', 'No fumar en interiores', 'Uso responsable de las instalaciones', 'Deposito de seguridad'],
  ARRAY[
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Villa con Piscina en Valencia
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Villa Mediterránea con Piscina y Jardín en Valencia',
  'Villa mediterránea de 500m² rodeada de naranjos y jardines. Piscina climatizada de 12x6m, zona BBQ profesional, pérgola con comedor exterior para 40 personas. Perfecta para cumpleaños, comuniones, despedidas y eventos familiares. A solo 15 minutos de la playa de la Malvarrosa.',
  'villa',
  'Camino de Vera 78',
  'Valencia',
  'Comunidad Valenciana',
  '46011',
  39.4840,
  -0.3464,
  45,
  6,
  4,
  220,
  6,
  48,
  ARRAY['Piscina climatizada 12x6m', 'BBQ profesional', 'Pérgola con comedor', 'Jardín con naranjos', 'Cocina exterior', 'Mesa para 40 personas', 'Zona infantil', 'WiFi', 'Aire acondicionado', 'Parking 10 coches', 'Ducha exterior', 'Hamacas y sombrillas'],
  ARRAY['No fumar en interiores', 'Música ambiente hasta 23:00h', 'Supervisión de menores en piscina', 'Dejar limpio', 'Respetar vecinos'],
  ARRAY[
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Cortijo Andaluz en Sevilla
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Cortijo Andaluz con Patio Sevillano',
  'Auténtico cortijo andaluz del siglo XIX con patio sevillano de 200m² lleno de azulejos originales, fuente central y naranjos. Perfecto para bodas flamencas, eventos temáticos y celebraciones con sabor andaluz. Salón con techos de 5m de altura, cocina tradicional y zona de baile exterior.',
  'cortijo',
  'Hacienda Los Naranjos',
  'Sevilla',
  'Andalucía',
  '41010',
  37.3891,
  -5.9845,
  70,
  7,
  5,
  280,
  8,
  72,
  ARRAY['Patio sevillano auténtico', 'Fuente central', 'Azulejos originales', 'Salón de techos altos', 'Cocina tradicional', 'Zona de baile', 'Tablao flamenco (extra)', 'Catering andaluz', 'Parking amplio', 'Jardines', 'WiFi', 'Aire acondicionado'],
  ARRAY['Respetar el patrimonio histórico', 'Música flamenca bienvenida', 'No fumar en salones', 'Eventos hasta 02:00h', 'Limpieza obligatoria'],
  ARRAY[
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Pazo Gallego en Pontevedra
INSERT INTO properties (
  title,
  description,
  property_type,
  address,
  city,
  region,
  postal_code,
  latitude,
  longitude,
  capacity,
  bedrooms,
  bathrooms,
  price_per_hour,
  min_hours,
  max_hours,
  amenities,
  house_rules,
  images,
  status,
  host_id
) VALUES (
  'Pazo Gallego con Viñedos en Rías Baixas',
  'Majestuoso pazo gallego rodeado de viñedos de Albariño con vistas a las Rías Baixas. Arquitectura tradicional gallega del siglo XVII con 3 hectáreas de jardines. Ideal para bodas, eventos corporativos y catas de vino. Bodega propia, hórreo histórico y capilla románica en el terreno.',
  'pazo',
  'Pazo de Ribadulla',
  'Pontevedra',
  'Galicia',
  '36001',
  42.4296,
  -8.6446,
  90,
  10,
  6,
  320,
  8,
  96,
  ARRAY['Viñedos de Albariño', 'Bodega propia', 'Hórreo histórico', 'Capilla románica', 'Jardines 3 hectáreas', 'Salón de banquetes', 'Cocina gallega', 'Catas de vino incluidas', 'Parking 50 coches', 'WiFi', 'Calefacción central', 'Vistas a las rías'],
  ARRAY['Respetar el patrimonio', 'No fumar en interiores', 'Eventos hasta 02:00h', 'Capacidad máxima 90 personas', 'Limpieza profesional incluida'],
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop&q=90'
  ],
  'active',
  (SELECT id FROM users WHERE role = 'host' LIMIT 1)
);

-- Verificar que se insertaron correctamente
SELECT 
  id,
  title,
  city,
  price_per_hour,
  capacity,
  status,
  created_at
FROM properties
ORDER BY created_at DESC
LIMIT 10;




