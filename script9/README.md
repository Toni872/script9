# Script9
> **Automatización Inteligente para Negocios Digitales**

![Script9 Banner](public/script9_banner.png)

**Script9** es una plataforma avanzada de marketplace enfocada en soluciones digitales de **Inteligencia Artificial, Automatización de Workflows y Scripting a medida**. Conectamos empresas con soluciones técnicas de alto impacto como bots de Telegram con GPT-4, sistemas de scraping automatizado y asistentes virtuales.

## 🚀 Características Principales

- **Marketplace de Servicios AI**: Catálogo curado de soluciones de automatización.
- **Pagos Seguros**: Integración completa con Stripe para transacciones protegidas.
- **Gestión de Usuarios y Roles**: Sistema robusto de perfiles para Clientes y Anfitriones (Creadores).
- **Dashboard en Tiempo Real**: Métricas de ventas, gestión de reservas y estado de proyectos.
- **Diseño Moderno "Deep Tech"**: Interfaz limpia y profesional construida con los últimos estándares de UX/UI.

## 🛠️ Stack Tecnológico

Script9 está construido sobre una arquitectura moderna y escalable:

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/).
- **Backend & Base de Datos**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage).
- **Pagos**: [Stripe](https://stripe.com/) Connect & Checkout.
- **Emails**: [Resend](https://resend.com/) para notificaciones transaccionales.
- **Despliegue**: Optimizado para [Vercel](https://vercel.com/).

## 📦 Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Toni872/script9.git
   cd script9
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env.local` basado en el ejemplo y añade tus claves de Supabase, Stripe y Resend.

4. **Ejecutar en Desarrollo**:
   ```bash
   npm run dev
   ```

## 🔐 Variables de Entorno Requeridas

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe |
| `RESEND_API_KEY` | API Key para envío de emails |

## 📄 Licencia

Este proyecto es propiedad de **Script9**. Todos los derechos reservados.
