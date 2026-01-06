import "./globals.css";
import "./styles/animations.css";
import { Space_Grotesk, Inter } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import { Metadata } from "next";

// Tipografía oficial para títulos según Manual de Marca Script9
const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-heading',
  weight: ['500', '600', '700'], // Medium, Semibold, Bold
  display: 'swap',
});

// Tipografía oficial para cuerpo según Manual de Marca Script9
const body = Inter({
  subsets: ["latin"],
  variable: '--font-body',
  weight: ['300', '400', '500'], // Light, Regular, Medium
  display: 'swap',
});

// SEO completo para Script9
export const metadata: Metadata = {
  title: {
    default: "Script9 | Automatizaciones, IA y Scripts para Negocios Digitales",
    template: "%s | Script9"
  },
  description: "Script9 ofrece servicios de automatización, inteligencia artificial, workflows y scripts a medida para negocios digitales. Potencia tu empresa, ahorra tiempo y escala sin límites.",
  keywords: [
    "automatización empresarial",
    "inteligencia artificial empresas",
    "scripts personalizados",
    "workflows automatizados",
    "automatización procesos",
    "IA para negocios",
    "integración API",
    "automatizaciones a medida",
    "transformación digital",
    "Script9",
    "automatización España"
  ],
  authors: [{ name: "Script9", url: "https://script9.com" }],
  creator: "Script9",
  publisher: "Script9",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL((process.env.NEXT_PUBLIC_BASE_URL || "https://script9.com").replace(/['"]/g, '').trim()),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Script9",
    title: "Script9 | Automatizaciones, IA y Scripts para Negocios Digitales",
    description: "Servicios de automatización, inteligencia artificial, workflows y scripts a medida para negocios digitales. Potencia tu empresa y escala sin límites.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Script9 - Automatización Inteligente para Negocios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Script9 | Automatizaciones y IA para Negocios",
    description: "Automatizaciones, workflows y scripts a medida para negocios digitales que quieren escalar.",
    images: ["/og-image.png"],
    creator: "@script9",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect para optimización de rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org JSON-LD para SEO estructurado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Script9",
              "url": "https://script9.com",
              "logo": "https://script9.com/logo.png",
              "description": "Servicios de automatización, IA, workflows y scripts a medida para negocios digitales",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Madrid",
                "addressCountry": "ES"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@script9.es",
                "availableLanguage": ["Spanish", "English"]
              },
              "sameAs": [
                "https://twitter.com/script9",
                "https://linkedin.com/company/script9",
                "https://github.com/script9"
              ],
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "EUR",
                "offerCount": "4",
                "offers": [
                  {
                    "@type": "Offer",
                    "name": "Automatizaciones",
                    "description": "Automatización de procesos empresariales"
                  },
                  {
                    "@type": "Offer",
                    "name": "Workflows con IA",
                    "description": "Flujos de trabajo inteligentes con IA"
                  },
                  {
                    "@type": "Offer",
                    "name": "Scripts a Medida",
                    "description": "Desarrollo de scripts personalizados"
                  },
                  {
                    "@type": "Offer",
                    "name": "Integraciones API",
                    "description": "Integración de sistemas y APIs"
                  }
                ]
              }
            }),
          }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} font-body antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
        <script src="/chat-widget.js" async defer></script>
      </body>
    </html>
  );
}
