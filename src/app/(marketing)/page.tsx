import { Metadata } from 'next';
import LandingClient from '@/components/landing/LandingClient';

export const metadata: Metadata = {
  title: "Script9 | Agencia de Automatización & IA para Negocios",
  description: "Consultora líder en Automatización de Procesos, Chatbots IA y Workflows. Auditoría gratuita para empresas que quieren escalar.",
  alternates: {
    canonical: 'https://script9.com',
  },
  openGraph: {
    title: 'Script9 | Escala tu Negocio con Automatización e IA',
    description: 'Delega el trabajo manual a scripts inteligentes y céntrate en vender. Auditoría de procesos gratuita.',
    url: 'https://script9.com',
    siteName: 'Script9',
    images: [
      {
        url: 'https://script9.com/og-image.png', // Ensure this image exists
        width: 1200,
        height: 630,
        alt: 'Script9 Consultoría de Automatización',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Script9",
        "url": "https://script9.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://script9.com/soluciones?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "name": "Script9",
        "image": "https://script9.com/logo.png",
        "@id": "https://script9.com",
        "url": "https://script9.com",
        "telephone": "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Madrid",
          "addressCountry": "ES"
        },
        "priceRange": "$$$",
        "description": "Agencia especializada en automatización de procesos mediante IA y desarrollo de scripts a medida.",
        "serviceArea": {
          "@type": "Country",
          "name": "España"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingClient />
    </>
  );
}
