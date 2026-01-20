// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

export const mockServices: any[] = [
  {
    id: 's1-ai-sdr',
    title: 'AI SDR: Cualificación de Leads 24/7',
    description: 'Convierte tu web en una máquina de ventas. Nuestro sistema captura cada lead, lo analiza en tiempo real con Inteligencia Artificial (Gemini 2.5) y te notifica al instante en Slack con una puntuación de calidad (0-100). Nunca más pierdas una oportunidad por responder tarde.',
    property_type: 'ia_chatbot',
    price: 1500,
    unit: 'setup',
    amenities: ['Auto-Cualificación', 'Alertas Slack', 'Google Sheets', 'Gemini AI'],
    features: [
      { name: 'Análisis BANT con IA' },
      { name: 'Scoring Predictivo' },
      { name: 'Alertas Instantáneas' }
    ],
    tech_stack: ['n8n', 'Google Gemini 2.5', 'Slack', 'Next.js'],
    rating: 5.0,
    review_count: 12,
    image_urls: ['/images/services/n8n-workflow.png'],
    is_script9_select: true,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '48 Horas',
    maintenance_support: 'Monitorización incluida',
    host_id: 'admin'
  },
  {
    id: 's2-automation-pack',
    title: 'Piloto Automático: Facturación & CRM',
    description: 'Olvídate del trabajo manual. Conectamos tu Stripe con tu CRM (HubSpot/Salesforce) y tu sistema de contabilidad. Cada venta genera una factura, actualiza el cliente y envía un email de bienvenida personalizado. Recupera 10h/semana de gestión administrativa.',
    property_type: 'automatizacion',
    price: 950,
    unit: 'project',
    amenities: ['Sincronización Bidireccional', 'Factura PDF Auto', 'Email Marketing', 'Error Handling'],
    features: [
      { name: 'Conexión Stripe <-> CRM' },
      { name: 'Generación PDF' },
      { name: 'Email Welcome Sequence' }
    ],
    tech_stack: ['Make', 'Stripe API', 'HubSpot', 'Gmail'],
    rating: 4.9,
    review_count: 8,
    image_urls: [],
    is_script9_select: false,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '1 Semana',
    maintenance_support: 'Soporte 30 días',
    host_id: 'admin'
  },
  {
    id: 's3-python-scraper',
    title: 'Data Mining: Extractor de Leads Masivo',
    description: 'Obtén bases de datos limpias y actualizadas de tus clientes ideales. Script de Python personalizado que recorre directorios públicos (LinkedIn, Maps, Directorios especializados), extrae emails y teléfonos, y verifica su validez. Datos listos para tu campaña de Outbound.',
    property_type: 'script',
    price: 2500,
    unit: 'project',
    amenities: ['Bypassing Captchas', 'Rotación de IPs', 'Limpieza de Datos', 'Formato CSV/Excel'],
    features: [
      { name: 'Scraping Ético' },
      { name: 'Verificación de Emails' },
      { name: 'Formato Compatible CRM' }
    ],
    tech_stack: ['Python', 'Selenium', 'Pandas', 'BrightData'],
    rating: 4.8,
    review_count: 5,
    image_urls: [],
    is_script9_select: true,
    location: 'Server',
    city: 'Global',
    delivery_time: '2 Semanas',
    maintenance_support: 'Actualizaciones Trimestrales',
    host_id: 'admin'
  },
  {
    id: 's4-custom-api',
    title: 'Integración API: Conector Universal',
    description: '¿Tus herramientas no se hablan? Creamos un puente seguro entre cualquier software que tenga API. Desde conectar tu ERP antiguo con tu eCommerce moderno, hasta sistemas de logística personalizados. Código robusto, seguro y escalable.',
    property_type: 'integracion',
    price: 3200,
    unit: 'project',
    amenities: ['API REST / GraphQL', 'Seguridad OAuth2', 'Logs Detallados', 'Rate Limiting'],
    features: [
      { name: 'Middleware a Medida' },
      { name: 'Webhooks en tiempo real' },
      { name: 'Dashboard de Estado' }
    ],
    tech_stack: ['Node.js', 'Express', 'Redis', 'Docker'],
    rating: 5.0,
    review_count: 3,
    image_urls: [],
    is_script9_select: true,
    location: 'Cloud/On-Premise',
    city: 'Global',
    delivery_time: '3 Semanas',
    maintenance_support: 'SLA Empresarial',
    host_id: 'admin'
  }
];

export const mockProperties = mockServices; // Alias for backward compatibility

// Función para simular búsqueda con filtros
export function searchMockServices(filters: {
  query?: string;
  location?: string;
  capacity_min?: number;
  price_min?: number;
  price_max?: number;
  types?: string;
  features?: string; // replaced amenities
  amenities?: string; // legacy support
  min_rating?: number;
  page?: number;
  limit?: number;
}) {
  let filtered = [...mockServices];

  // Filtrar por búsqueda de texto
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.property_type.toLowerCase().includes(query)
    );
  }

  // Filtrar por tipo de servicio
  if (filters.types) {
    const types = filters.types.split(',').map((t) => t.toLowerCase());
    filtered = filtered.filter((p) =>
      types.some((t) => p.property_type.toLowerCase().includes(t))
    );
  }

  // Filtrar por tecnologías
  const filterFeatures = filters.features || filters.amenities;
  if (filterFeatures) {
    const features = filterFeatures.split(',').map((a) => a.toLowerCase());
    filtered = filtered.filter((p) =>
      features.every((f) =>
        // check both old amenities array and new features objects
        p.amenities.some((pa: string) => pa.toLowerCase().includes(f))
      )
    );
  }

  // Filtrar por precio
  if (filters.price_min) {
    filtered = filtered.filter((p) => p.price >= filters.price_min!);
  }
  if (filters.price_max) {
    filtered = filtered.filter((p) => p.price <= filters.price_max!);
  }

  // Filtrar por rating
  if (filters.min_rating) {
    filtered = filtered.filter((p) => p.rating >= filters.min_rating!);
  }

  // Paginación
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;
  const paginatedResults = filtered.slice(offset, offset + limit);

  return {
    services: paginatedResults,
    properties: paginatedResults, // Alias
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

// Alias
export const searchMockProperties = searchMockServices;

// Función para obtener un servicio por ID
export function getMockServiceById(id: string) {
  return mockServices.find((p) => p.id === id) || null;
}

export const getMockPropertyById = getMockServiceById;
