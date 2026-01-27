// Mock data para desarrollo del MVP - Script9 Servicios de Automatización

export const mockServices: any[] = [
  {
    id: 's1-ai-sdr',
    title: 'Implementación de Agente IA Comercial',
    video_url: 'https://cdn.coverr.co/videos/coverr-typing-codes-on-a-computer-4458/1080p.mp4',
    description: `Este no es otro chatbot básico. Es un Agente de Desarrollo de Ventas (SDR) completamente autónomo diseñado para la era de la IA.
    
    A diferencia de las herramientas de automatización tradicionales que solo siguen reglas simples, nuestro Agente AI utiliza Modelos de Lenguaje Avanzados (Google Gemini 2.5) para razonar, investigar y personalizar cada interacción como lo haría tu mejor vendedor humano.
    
    El sistema opera en 4 capas de profundidad:
    1. Ingesta de Datos: Monitoriza tus fuentes de leads (formularios web, bases de datos, LinkedIn) en tiempo real.
    2. Análisis e Investigación: Antes de contactar, el agente visita la web del prospecto, lee sus últimas publicaciones y entiende su modelo de negocio.
    3. Generación de Estrategia: Decide cuál es el mejor ángulo de entrada, el tono adecuado y el "pain point" a atacar.
    4. Ejecución Multicanal: Redacta y envía correos o mensajes ultra-personalizados y mantiene la conversación bidireccional hasta agendar la reunión en tu calendario.
    
    El resultado es una máquina de generación de pipeline que trabaja 24/7, nunca olvida un follow-up y escala infinitamente sin aumentar costes de personal.`,
    property_type: 'ia_agent',
    price: 3500, // Kept for backend filtering
    unit: 'setup',
    price_display_text: 'Consultar Presupuesto', // Hidden price
    amenities: ['Scoring Lead en Tiempo Real', 'Conexión CRM Bidireccional', 'Alertas Instantáneas Slack', 'Emailing Automático'],
    features: [
      { name: 'Motor de Decisión n8n' },
      { name: 'Cualificación BANT con IA' },
      { name: 'Infraestructura Serverless' }
    ],
    tech_stack: ['n8n', 'Google Gemini 2.5', 'Supabase', 'React Email'],
    target_audience: 'Agencias de Marketing, Consultores B2B y SaaS que quieren escalar ventas sin contratar más comerciales.',
    use_cases: [
      'Cualificación inmediata de leads entrantes (Web/Ads)',
      'Reactivación de base de datos antigua',
      'Agendado automático de reuniones en Calendly'
    ],
    expected_result: 'Agendar de 10 a 30 reuniones cualificadas extra al mes, reduciendo un 90% el tiempo de prospección manual.',
    rating: 5.0,
    review_count: 12,
    image_urls: ['/images/services/ai-sdr-dashboard.png'],
    is_script9_select: true,
    location: 'Cloud',
    city: 'España',
    delivery_time: '4 Semanas',
    maintenance_support: 'Soporte y Optimización 24/7',
    host_id: 'admin',
    content_blocks: [
      {
        title: 'El Problema: La Prospección Tradicional está Rota',
        content: 'Tus SDRs humanos pierden el 70% de su día en tareas de bajo valor: buscar emails, copiar datos al CRM y redactar mensajes genéricos que nadie lee. El "quemado" es alto y la conversión baja.',
        type: 'list',
        items: [
          { title: 'Baja Respuesta', description: 'Los "templates" masivos ya no funcionan. Tasa de respuesta < 1%.' },
          { title: 'Error Humano', description: 'Olvidos de follow-up, datos incorrectos en CRM y leads perdidos.' },
          { title: 'Coste Elevado', description: 'Un SDR cualificado cuesta >30k€/año + comisiones + herramientas.' }
        ]
      },
      {
        title: 'Nuestra Solución: Ingeniería de Ventas Autónoma',
        content: 'No es un simple chatbot. Es una arquitectura compleja de agentes que imita el comportamiento de tu mejor vendedor, pero a una velocidad y escala sobrehumanas.',
        type: 'steps',
        items: [
          { title: '1. Señal', description: 'Detectamos la intención (Lead Inbound, Cambio de trabajo, Ronda de inversión, Visita web).' },
          { title: '2. Enriquecimiento Deep', description: 'Cruzamos datos de LinkedIn, Web corporativa y noticias para crear un perfil 360 del prospecto.' },
          { title: '3. Hiper-Personalización', description: 'Gemini 2.5 redacta un mensaje único basado en contexto real. "Vi que lanzasteis X feature...".' },
          { title: '4. Ejecución', description: 'Envío multicanal (Email/LinkedIn) y actualización instantánea en tu CRM.' }
        ]
      },
      {
        title: '¿Por qué funciona?',
        content: 'La clave no es "spamear" más, sino ser relevante. Nuestro sistema lee y entiende a quién escribe. Si tu cliente potencial acaba de publicar sobre un problema, el agente lo usará como gancho.',
        type: 'text'
      }
    ]
  },
  {
    id: 's2-enrichment-engine',
    title: 'Motor de Enriquecimiento & Outreach',
    video_url: 'https://cdn.coverr.co/videos/coverr-software-developer-working-on-code-4654/1080p.mp4',
    description: `Deja de quemar tu dominio enviando emails a "info@" que nadie lee.
    
    La mayoría de empresas compran bases de datos estáticas (ZoomInfo, Apollo) que tienen una tasa de rebote del 30% y contactos que cambiaron de trabajo hace meses.
    
    Nuestro Motor de Enriquecimiento no es una base de datos. Es un sistema de minería en tiempo real que:
    1. Escanea Google Maps y LinkedIn en el momento exacto que lo activas.
    2. Entra en la web de cada empresa y "lee" su página de equipo.
    3. Encuentra el email verificado del tomador de decisiones real (Dueño, CEO, Marketing Manager).
    4. Redacta un correo único para esa persona, citando sus propios servicios o noticias recientes.
    
    Es la diferencia entre "Spam Masivo" y "Ingeniería de Ventas Quirúrgica".`,
    price: 2500,
    unit: 'setup',
    price_display_text: 'Consultar Presupuesto',
    property_type: 'data_mining',
    amenities: ['Google Maps Real-Time', 'Verificación SMTP', 'Redacción GPT-4o', 'Exportación CRM'],
    tech_stack: ['n8n', 'Google Maps API', 'OpenAI', 'Apollo/Hunter', 'Supabase'],
    image_urls: ['/images/services/enrichment-dashboard.png'],
    location: 'Cloud',
    city: 'Global',
    delivery_time: '2 Semanas',
    features: [
      { name: 'Scraping Google Maps Live' },
      { name: 'Navegación Web Autónoma' },
      { name: 'Validación de Emails SMTP' },
      { name: 'Redacción 1-to-1 con IA' }
    ],
    target_audience: 'Agencias, SaaS y Distribuidores que necesitan leads frescos en nichos locales o específicos.',
    use_cases: [
      'Encontrar "Clínicas Dentales" en Madrid que no tienen web moderna.',
      'Detectar Ecommerces de moda que usan Shopify pero no Klaviyo.',
      'Contactar con CEOs de startups recién fundadas.'
    ],
    expected_result: 'Generar una base de datos de 500-1000 leads ultra-cualificados al mes, con una tasa de apertura >60%.',
    content_blocks: [
      {
        type: 'text',
        title: 'El Problema: Bases de Datos "Zombis"',
        content: 'El mercado de datos B2B está roto. Las listas que compras suelen tener una tasa de rebote >30% y datos de hace 6 meses. Cuando compras 1.000 leads, 300 rebotan (dañando tu reputación de envío) y 500 son correos genéricos saturados.'
      },
      {
        type: 'list',
        title: 'Nuestra Solución: "Live Data Mining"',
        items: [
          { title: 'Frescura Absoluta', description: 'Si la empresa abrió ayer y se puso en Google Maps, nuestro sistema la encuentra hoy. Nadie más tiene ese dato.' },
          { title: 'Verificación Triple', description: 'No adivinamos correos. Verificamos DNS, MX records y hacemos "ping" SMTP sin enviar correo para asegurar que existe.' },
          { title: 'Contexto Profundo', description: 'El agente lee la sección "Sobre Nosotros" para entender si son una buena fit antes de gastar recursos en contactarlos.' }
        ]
      },
      {
        type: 'steps',
        title: 'Cómo Funciona el Workflow (n8n)',
        items: [
          { title: '1. Radar (Maps & Search)', description: 'Defines coordenadas y palabras clave (ej. "Inmobiliarias en Valencia"). La API de Places extrae todos los negocios activos.' },
          { title: '2. Filtro de Calidad', description: 'Descartamos automáticamente los que tienen <3 estrellas, sin web, o que son franquicias grandes que no nos interesan.' },
          { title: '3. Agente Investigador', description: 'Un navegador headless (browser) entra en su web, busca el Sitemap y extrae la página de contacto y equipo.' },
          { title: '4. Generación de Copy', description: 'GPT-4o analiza lo que hacen y escribe: "Hola [Nombre], vi que os especializáis en [Servicio]..." No parece un robot.' }
        ]
      },
      {
        type: 'text',
        title: 'Infraestructura, no Alquiler',
        content: 'Lo mejor: Te entregamos el código. El motor corre en tu propio servidor n8n. Eres dueño de tu máquina de leads y no pagas fees mensuales por "créditos" de exportación.'
      }
    ]
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
  features?: string;
  amenities?: string;
  min_rating?: number;
  page?: number;
  limit?: number;
}) {
  let filtered = [...mockServices];

  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.property_type.toLowerCase().includes(query)
    );
  }

  if (filters.types) {
    const types = filters.types.split(',').map((t) => t.toLowerCase());
    filtered = filtered.filter((p) =>
      types.some((t) => p.property_type.toLowerCase().includes(t))
    );
  }

  const filterFeatures = filters.features || filters.amenities;
  if (filterFeatures) {
    const features = filterFeatures.split(',').map((a) => a.toLowerCase());
    filtered = filtered.filter((p) =>
      features.every((f) =>
        p.amenities.some((pa: string) => pa.toLowerCase().includes(f))
      )
    );
  }

  if (filters.price_min) {
    filtered = filtered.filter((p) => p.price >= filters.price_min!);
  }
  if (filters.price_max) {
    filtered = filtered.filter((p) => p.price <= filters.price_max!);
  }

  if (filters.min_rating) {
    filtered = filtered.filter((p) => p.rating >= filters.min_rating!);
  }

  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;
  const paginatedResults = filtered.slice(offset, offset + limit);

  return {
    services: paginatedResults,
    properties: paginatedResults,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

export const searchMockProperties = searchMockServices;

export function getMockServiceById(id: string) {
  return mockServices.find((p) => p.id === id) || null;
}

export const getMockPropertyById = getMockServiceById;
