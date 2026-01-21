// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

export const mockServices: any[] = [
  {
    id: 's1-ai-sdr',
    title: 'Sistema de Prospección Automática (AI SDR)',
    description: 'Mi equipo comercial pierde horas buscando emails y cualificando leads. Soluciónalo con un sistema que hace scraping de LinkedIn/Apollo, enriquece datos y envía emails personalizados. Genera 10-20 reuniones cualificadas al mes sin intervención manual.',
    property_type: 'ia_agent',
    price: 1500,
    unit: 'setup',
    amenities: ['Scraping LinkedIn', 'Enriquecimiento Datos', 'Email Personalizado', 'Agendamiento Calendly'],
    features: [
      { name: 'Multicanal (Email + LinkedIn)' },
      { name: 'Personalización con IA' },
      { name: 'Sincronización CRM' }
    ],
    tech_stack: ['n8n', 'OpenAI GPT-4', 'Apollo API', 'Smartlead'],
    rating: 5.0,
    review_count: 12,
    image_urls: ['/images/services/ai-sdr-dashboard.png'],
    is_script9_select: true,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '5 Días',
    maintenance_support: 'Monitorización incluida',
    host_id: 'admin'
  },
  {
    id: 's2-finance-auto',
    title: 'Consolidación Financiera Automática',
    description: 'Tengo facturas en Stripe, gastos en Excel y el banco por otro lado. Unificamos todo automáticamente. Conexión Bancos/Stripe -> n8n -> Dashboard Financiero. Tu estado de caja actualizado en tiempo real, cada mañana en tu móvil.',
    property_type: 'automatizacion',
    price: 900,
    unit: 'project',
    amenities: ['Conciliación Bancaria', 'Reportes Automáticos', 'Control de Gastos', 'Alertas Cashflow'],
    features: [
      { name: 'Dashboard en Tiempo Real' },
      { name: 'Notificaciones Slack/WhatsApp' },
      { name: 'Cierre de Mes en Minutos' }
    ],
    tech_stack: ['n8n', 'Stripe', 'Google Sheets', 'Slack'],
    rating: 4.9,
    review_count: 8,
    image_urls: ['/images/services/finance-dashboard.png'],
    is_script9_select: false,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '1 Semana',
    maintenance_support: 'Soporte 30 días',
    host_id: 'admin'
  },
  {
    id: 's3-market-intel',
    title: 'Monitorización de Competencia & Precios',
    description: 'No sé cuándo mi competencia baja precios o lanza ofertas. Entérate antes que nadie. Sistema de vigilancia 24/7 que monitoriza webs de competidores, detecta cambios y te avisa. Estrategia de precios dinámica basada en datos reales.',
    property_type: 'data_intelligence',
    price: 750,
    unit: 'project',
    amenities: ['Seguimiento de Precios', 'Detección de Ofertas', 'Alertas Inmediatas', 'Histórico de Cambios'],
    features: [
      { name: 'Vigilancia 24/7' },
      { name: 'Análisis de Tendencias' },
      { name: 'Informes Competitivos' }
    ],
    tech_stack: ['Python', 'Scrapy', 'Data Analysis', 'Telegram Bot'],
    rating: 4.8,
    review_count: 5,
    image_urls: ['/images/services/market-intel.png'],
    is_script9_select: true,
    location: 'Server',
    city: 'Global',
    delivery_time: '2 Semanas',
    maintenance_support: 'Actualizaciones Trimestrales',
    host_id: 'admin'
  },
  {
    id: 's4-customer-support-ai',
    title: 'Agente de Soporte IA Entrenado',
    description: 'Clientes preguntando lo mismo a las 10 de la noche. Implementa un Chatbot IA entrenado con TUS datos y manuales. Responde al 80% de consultas instantáneamente, cualifica tickets y solo escala lo urgente a humanos. Atención 24/7 real.',
    property_type: 'ia_agent',
    price: 1200,
    unit: 'setup',
    amenities: ['Respuestas 24/7', 'Entrenado con tu Data', 'Escalado Inteligente', 'Multidioma'],
    features: [
      { name: 'RAG (Retrieval Augmented Generation)' },
      { name: 'Integración WhatsApp/Web' },
      { name: 'Historial de Conversaciones' }
    ],
    tech_stack: ['OpenAI Assistants API', 'Vector Database', 'React', 'Node.js'],
    rating: 5.0,
    review_count: 15,
    image_urls: ['/images/services/support-agent.png'],
    is_script9_select: true,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '1 Semana',
    maintenance_support: 'Re-entrenamiento mensual',
    host_id: 'admin'
  },
  {
    id: 's5-saas-development',
    title: 'Ingeniería de Software a Medida (SaaS)',
    description: 'Necesito una plataforma única que no existe en el mercado. Diseñamos y construimos tu propio activo digital. Desde el diseño UX/UI premium hasta el desarrollo escalable en la nube. Tu idea convertida en un negocio sólido, propiedad 100% tuya.',
    property_type: 'desarrollo_medida',
    price: 3500,
    unit: 'project',
    amenities: ['Diseño UX/UI Premium', 'Panel de Administración', 'Pagos Integrados', 'Escalabilidad Cloud'],
    features: [
      { name: 'Arquitectura Hexagonal' },
      { name: 'Seguridad Empresarial' },
      { name: 'Código Propiedad del Cliente' }
    ],
    tech_stack: ['Next.js', 'Supabase', 'TypeScript', 'AWS'],
    rating: 5.0,
    review_count: 3,
    image_urls: ['/images/services/saas-dev.png'],
    is_script9_select: true,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '4-8 Semanas',
    maintenance_support: 'Garantía 6 meses',
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
