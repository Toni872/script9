// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

export const mockProperties = [
  {
    id: '1',
    title: 'Automatización de Email Marketing',
    description: 'Automatización completa de campañas de email marketing incluyendo segmentación de audiencias, secuencias automatizadas, A/B testing y reporting en tiempo real. Integración con Mailchimp, SendGrid o ActiveCampaign.',
    price_per_hour: 750,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 10,
    max_guests: 15,
    image_urls: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    ],
    amenities: ['python', 'api_rest', 'make', 'n8n'],
    property_type: 'automatizacion',
    average_rating: 4.9,
    review_count: 34,
    is_script9_select: true,
    available: true,
  },
  {
    id: '2',
    title: 'Chatbot IA para Atención al Cliente',
    description: 'Desarrollo de chatbot inteligente con GPT-4 para atención al cliente 24/7. Incluye entrenamiento personalizado, integración con WhatsApp/Telegram/Web, y panel de analytics. Reduce costes de soporte hasta un 70%.',
    price_per_hour: 1500,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 20,
    max_guests: 30,
    image_urls: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800',
    ],
    amenities: ['openai', 'nodejs', 'api_rest', 'python'],
    property_type: 'ia_chatbot',
    average_rating: 4.8,
    review_count: 28,
    is_script9_select: true,
    available: true,
  },
  {
    id: '3',
    title: 'Workflow de Gestión de Leads',
    description: 'Automatización del proceso completo de gestión de leads: captura desde múltiples fuentes, scoring automático, nurturing personalizado y notificaciones a ventas. Compatible con HubSpot, Salesforce y CRMs custom.',
    price_per_hour: 950,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 15,
    max_guests: 25,
    image_urls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
    amenities: ['make', 'zapier', 'api_rest', 'n8n'],
    property_type: 'workflow',
    average_rating: 4.7,
    review_count: 22,
    is_script9_select: false,
    available: true,
  },
  {
    id: '4',
    title: 'Script de Web Scraping Avanzado',
    description: 'Desarrollo de scripts de extracción de datos web personalizados. Bypass de protecciones anti-bot, gestión de proxies rotativos, y exportación a bases de datos o APIs. Ideal para monitorización de precios y competencia.',
    price_per_hour: 650,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 5,
    max_guests: 10,
    image_urls: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    ],
    amenities: ['python', 'web_scraping', 'api_rest'],
    property_type: 'script',
    average_rating: 4.9,
    review_count: 41,
    is_script9_select: true,
    available: true,
  },
  {
    id: '5',
    title: 'Integración Multi-Plataforma API',
    description: 'Conexión e integración de múltiples plataformas vía API: ERPs, CRMs, e-commerce, contabilidad, RRHH. Sincronización bidireccional de datos en tiempo real con gestión de errores y reintentos automáticos.',
    price_per_hour: 1200,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 30,
    max_guests: 50,
    image_urls: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    ],
    amenities: ['nodejs', 'python', 'api_rest', 'n8n'],
    property_type: 'integracion',
    average_rating: 4.6,
    review_count: 19,
    is_script9_select: false,
    available: true,
  },
  {
    id: '6',
    title: 'Automatización de Reportes Financieros',
    description: 'Generación automática de reportes financieros desde múltiples fuentes de datos. Dashboards interactivos, alertas configurables y exportación programada a stakeholders. Compatible con Excel, Google Sheets y BI tools.',
    price_per_hour: 850,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 20,
    max_guests: 30,
    image_urls: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ],
    amenities: ['python', 'api_rest', 'make'],
    property_type: 'automatizacion',
    average_rating: 4.8,
    review_count: 25,
    is_script9_select: false,
    available: true,
  },
  {
    id: '7',
    title: 'Consultoría de Automatización Empresarial',
    description: 'Análisis completo de procesos de negocio para identificar oportunidades de automatización. Roadmap personalizado, estimación de ROI y priorización de proyectos. Incluye 3 sesiones de consultoría + documentación.',
    price_per_hour: 500,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 5,
    max_guests: 8,
    image_urls: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    ],
    amenities: ['python', 'make', 'zapier', 'n8n'],
    property_type: 'consultoria',
    average_rating: 5.0,
    review_count: 52,
    is_script9_select: true,
    available: true,
  },
  {
    id: '8',
    title: 'Asistente Virtual IA Personalizado',
    description: 'Desarrollo de asistente virtual con IA entrenado con tus datos y conocimiento empresarial. Responde preguntas, genera contenido, realiza análisis y se integra con tus herramientas internas. Basado en GPT-4/Claude.',
    price_per_hour: 2000,
    address: 'Servicio Online',
    city: 'España',
    region: 'Remoto',
    capacity: 50,
    max_guests: 100,
    image_urls: [
      'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    ],
    amenities: ['openai', 'python', 'api_rest', 'nodejs'],
    property_type: 'ia_chatbot',
    average_rating: 4.9,
    review_count: 38,
    is_script9_select: true,
    available: true,
  },
];

// Función para simular búsqueda con filtros
export function searchMockProperties(filters: {
  query?: string;
  location?: string;
  capacity_min?: number;
  price_min?: number;
  price_max?: number;
  types?: string;
  amenities?: string;
  min_rating?: number;
  page?: number;
  limit?: number;
}) {
  let filtered = [...mockProperties];

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

  // Filtrar por tecnologías/amenities
  if (filters.amenities) {
    const amenities = filters.amenities.split(',').map((a) => a.toLowerCase());
    filtered = filtered.filter((p) =>
      amenities.every((a) =>
        p.amenities.some((pa) => pa.toLowerCase().includes(a))
      )
    );
  }

  // Filtrar por precio
  if (filters.price_min) {
    filtered = filtered.filter((p) => p.price_per_hour >= filters.price_min!);
  }
  if (filters.price_max) {
    filtered = filtered.filter((p) => p.price_per_hour <= filters.price_max!);
  }

  // Filtrar por nivel/capacidad
  if (filters.capacity_min) {
    filtered = filtered.filter((p) => p.capacity >= filters.capacity_min!);
  }

  // Filtrar por rating
  if (filters.min_rating) {
    filtered = filtered.filter((p) => p.average_rating >= filters.min_rating!);
  }

  // Paginación
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;
  const paginatedResults = filtered.slice(offset, offset + limit);

  return {
    properties: paginatedResults,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

// Función para obtener un servicio por ID
export function getMockPropertyById(id: string) {
  return mockProperties.find((p) => p.id === id) || null;
}
