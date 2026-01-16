# Arquitectura Técnica y Estrategia - Script9 Agency (V2.0 - Deep Audit)

Documento vivo de la infraestructura tecnológica de Script9.
**Última actualización:** Enero 2026.

## 1. Mapa de Infraestructura (The Stack)

### 🌍 Frontend (La Web Pública)
*   **Hosting:** [Vercel](https://vercel.com) (Edge Network).
*   **Framework:** Next.js 14 (React) + TypeScript.
*   **Estilos:** TailwindCSS + Framer Motion (Animaciones "Deep Tech").
*   **Mapas:** Google Maps API (`@react-google-maps/api`) + Leaflet (OpenSource).

### 🧠 Backend (El Motor de Inteligencia)
*   **Hosting:** [Hetzner Cloud](https://hetzner.com) (VPS Linux/Ubuntu).
    *   *IP:* `46.224.199.64`
*   **Automatización:** [N8N Self-Hosted](http://46.224.199.64:5678/).
    *   *Función:* Orquestador de flujos, Webhooks de formularios, Agentes Comerciales.
*   **Almacenamiento (Archivos):** Cloudflare R2.
    *   *Nota Técnica:* Se usa a través del SDK de Amazon (`@aws-sdk/client-s3`) por compatibilidad, pero los archivos residen en la red global de Cloudflare (sin costes de egreso).

### 💾 Datos y Autenticación
*   **Base de Datos Principal:** [Supabase](https://supabase.com) (PostgreSQL).
    *   *Tablas:* Usuarios, Roles, Productos, Transacciones.
*   **Autenticación:** NextAuth.js.
    *   *Proveedores:* Google OAuth (`GOOGLE_CLIENT_ID`) y Email/Password.

### 💰 Monetización y Comunicaciones
*   **Pagos:** [Stripe](https://stripe.com).
    *   *Integración:* Webhooks para activar servicios tras el pago.
*   **Emails:** [Resend](https://resend.com).
    *   *Uso:* Emails transaccionales (Bienvenida, Confirmación de Pedido, Alertas de Soporte).

---

## 2. Flujos de Datos Clave

### A. Captación de Lead (Formulario Web)
1.  Usuario rellena formulario en `script-9.com/contacto`.
2.  Next.js envía datos a `/api/support/send`.
3.  **Resend** dispara email de notificación a `contact@script-9.com` y confirmación al usuario.
4.  (Opcional) Webhook a **N8N** para guardar en Google Sheets/CRM.

### B. Venta de Servicio (Carrito)
1.  Usuario selecciona "Pack Automatización" -> Click en "Comprar".
2.  **Stripe** genera Checkout Session.
3.  Al pagar, Stripe envía `webhook.payment_succeeded`.
4.  Servidor valida pago -> **Supabase** registra la compra.
5.  **Resend** envía factura y guía de inicio.

### C. Agente Comercial (Simulado/Real)
1.  **N8N (Hetzner)** tiene flujos activos (`Lead Scoring`, `Email Sequence`).
2.  Conectado a **OpenAI GPT-4** via API Key para analizar respuestas de clientes.

---

## 3. Credenciales y Accesos Críticos

| Servicio | Rol | Acceso |
| :--- | :--- | :--- |
| **Vercel** | Despliegue Web | GitHub (`main` branch) |
| **Hetzner** | Servidor VPS | Usuario `root` (SSH Key) |
| **N8N** | Automatización | `http://46.224.199.64:5678/` |
| **Supabase** | Base de Datos | Dashboard Web |
| **Cloudflare** | Storage R2 | Dashboard Web |

---

## 4. Guía de Mantenimiento Rápido

### Actualizar la Web
```bash
# En tu PC local
git add .
git commit -m "Nueva feature"
git push origin main
# Vercel detecta el cambio y despliega en 2 minutos.
```

### Reiniciar el Servidor de Automatización
Si N8N se cae o va lento:
1.  Entrar por SSH: `ssh root@46.224.199.64`
2.  Reiniciar Docker:
    ```bash
    cd /root/app
    docker compose restart
    ```
