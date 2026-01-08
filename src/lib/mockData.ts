// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

export const mockServices: any[] = [
  {
    id: 's1-ai-sdr',
    title: 'Sistema de Prospección Automática (AI SDR)',
    description: 'Delega la prospección en frío. Nuestro sistema busca, cualifica y contacta con tus clientes ideales en piloto automático, agendando reuniones directamente en tu calendario. Incluye scraping ético, enriquecimiento de datos y secuencias de email personalizadas con IA.',
    property_type: 'ia_chatbot', // Changed from automatizacion to ia_chatbot
    price: 1500,
    unit: 'project',
    // price_display_text removed to trigger 'Solución a medida'
    amenities: ['Scraping', 'OpenAI', 'Apollo', 'Email Marketing'], // Tech stack compatible legacy
    features: [
      { name: 'Scraping LinkedIn' },
      { name: 'Redacción con IA' },
      { name: 'Agenda Automática' }
    ],
    tech_stack: ['Python', 'n8n', 'OpenAI GPT-4', 'Apollo.io'],
    rating: 4.9,
    review_count: 12,
    image_urls: ['/images/services/ai-sdr-dashboard.png'],
    is_script9_select: true,
    location: 'Remoto',
    city: 'Global',
    delivery_time: '2 - 3 semanas',
    maintenance_support: '30 días incluidos',
    host_id: 'admin'
  },
  {
    id: 's2-financial-dashboard',
    title: 'Consolidación Financiera Automática',
    description: 'Olvídate de cerrar el mes a ciegas. Unificamos tus cuentas de Stripe, PayPal, Bancos y gastos en un único Dashboard en tiempo real. Recibe reportes diarios de Cashflow por WhatsApp o Slack y toma decisiones con datos actualizados al minuto, no al mes vencido.',
    property_type: 'integracion', // Changed from automatizacion to integracion
    price: 900,
    unit: 'project',
    // price_display_text removed
    amenities: ['Stripe', 'Google Sheets', 'Slack', 'Banca'],
    features: [
      { name: 'Reportes Diarios' },
      { name: 'Conciliación Auto' },
      { name: 'Alertas Cashflow' }
    ],
    tech_stack: ['n8n', 'Stripe API', 'Airtable/Sheets', 'Slack API'],
    rating: 5.0,
    review_count: 8,
    image_urls: ['/images/services/finance-dashboard.png'],
    is_script9_select: false,
    location: 'Remoto',
    city: 'Online',
    delivery_time: '1 semana',
    maintenance_support: 'Soporte vitalicio de conexión',
    host_id: 'admin'
  },
  {
    id: 's3-customer-support',
    title: 'Agente de Soporte IA 24/7',
    description: 'Tus clientes no esperan. Implementamos un Chatbot entrenado con TU conocimiento de empresa que resuelve el 80% de las dudas al instante. Si no sabe la respuesta, escala el ticket a un humano. Reduce drásticamente el tiempo de respuesta y mejora la satisfacción del cliente.',
    property_type: 'ia_chatbot',
    price: 1200,
    unit: 'project',
    // price_display_text removed
    amenities: ['Chatbot', 'RAG', 'Soporte 24/7', 'CRM'],
    features: [
      { name: 'Respuestas Instantáneas' },
      { name: 'Base de Conocimiento' },
      { name: 'Escalado a Humano' }
    ],
    tech_stack: ['OpenAI Assistants', 'Vector DB', 'WhatsApp/Web', 'HubSopt'],
    rating: 4.8,
    review_count: 24,
    image_urls: ['/images/services/ai-support-agent.png'],
    is_script9_select: true,
    location: 'Remoto',
    city: 'Cloud',
    delivery_time: '2 semanas',
    maintenance_support: 'Monitoreo de conversaciones',
    host_id: 'admin'
  },
  {
    id: 's4-competitor-monitor',
    title: 'Monitorización de Competencia & Precios',
    description: 'Vigila a tu mercado sin perder tiempo. Nuestros scrapers revisan diariamente las webs de tus competidores para detectar cambios de precios, ofertas o nuevos productos. Recibe una alerta inmediata cuando ocurra un cambio relevante y ajuste tu estrategia al momento.',
    property_type: 'script',
    price: 750,
    unit: 'project',
    // price_display_text removed
    amenities: ['Web Scraping', 'Alertas Email', 'Precios', 'Data'],
    features: [
      { name: 'Scraping Diario' },
      { name: 'Alertas Email' },
      { name: 'Histórico de Precios' }
    ],
    tech_stack: ['Python', 'Selenium/Playwright', 'BeautifulSoup', 'SMTP'],
    rating: 4.7,
    review_count: 5,
    image_urls: ['/images/services/competitor-monitor.png'],
    is_script9_select: false,
    location: 'Remoto',
    city: 'Data',
    delivery_time: '5 días',
    maintenance_support: 'Mantenimiento contra bloqueos',
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
