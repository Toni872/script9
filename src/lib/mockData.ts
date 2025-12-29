// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

export const mockServices = [
  {
    id: '1',
    title: 'Automatización de Email Marketing (Demo)',
    description: 'Servicio de prueba para demostración. Automatización completa de campañas de email marketing incluyendo segmentación de audiencias, secuencias automatizadas, A/B testing y reporting en tiempo real.',
    price: 750, // was price_per_hour
    unit: 'project',
    price_display_text: 'Consultar Presupuesto',
    price_per_hour: 750, // legacy

    category: 'Marketing Automation', // was address
    location: 'Servicio Online',
    address: 'Servicio Online', // legacy

    city: 'Remoto',
    region: 'Global',

    capacity: 10,
    max_guests: 15,

    image_urls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', // Dashboard/Analytics
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', // Charts/Growth
    ],
    features: [
      { id: 'f1', name: 'python' },
      { id: 'f2', name: 'api_rest' },
      { id: 'f3', name: 'make' },
      { id: 'f4', name: 'n8n' }
    ], // transformed from string array to object array
    amenities: ['python', 'api_rest', 'make', 'n8n'], // legacy

    property_type: 'automatizacion', // legacy
    rating: 5.0, // was average_rating
    average_rating: 5.0, // legacy

    review_count: 1,
    is_script9_select: true,
    available: true,

    provider_id: 'host1',
    host_id: 'host1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'plan-moves-agent',
    title: 'Agente Comercial IA (Omnicanal)',
    description: 'Transforma tu atención al cliente con un asistente inteligente capaz de resolver dudas en tiempo real, generar presupuestos conectados a tu ERP y gestionar leads automáticamente. Integración omnicanal (WhatsApp, Web, Email). Casos de éxito: Sector Energía (Plan Moves).',
    price: 2500,
    unit: 'project',
    price_display_text: 'Consultar', // Custom pricing for high-ticket
    price_per_hour: 2500,

    category: 'AI Agents',
    location: 'Servicio Online',
    address: 'Servicio Online',

    city: 'Remoto',
    region: 'Global',

    capacity: 100,
    // max_guests: 100, // REMOVED
    delivery_time: '2-3 semanas',
    maintenance_support: 'Soporte prioritario post-lanzamiento',
    tech_stack: ['OpenAI GPT-4o', 'Vector DB', 'Next.js', 'Supabase'],

    image_urls: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800', // Robot interaction
      'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800', // Payment/Business
    ],
    features: [
      { id: 'f_rag', name: 'RAG Knowledge' },
      { id: 'f_erp', name: 'Conexión ERP' },
      { id: 'f_crm', name: 'Gestión CRM' },
      { id: 'f_omni', name: 'WhatsApp & Email' }
    ],
    amenities: [], // Empty legacy list

    property_type: 'ia_chatbot',
    rating: 5.0,
    average_rating: 5.0,

    review_count: 5,
    is_script9_select: true,
    available: true,

    provider_id: 'script9_official',
    host_id: 'script9_official',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
        p.amenities.some((pa) => pa.toLowerCase().includes(f))
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
