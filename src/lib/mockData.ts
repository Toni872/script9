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
    review_count: 1,
    image_urls: ['/images/services/n8n-workflow.png'],
    is_script9_select: true,
    location: 'Cloud',
    city: 'Global',
    delivery_time: '48 Horas',
    maintenance_support: 'Monitorización incluida',
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
