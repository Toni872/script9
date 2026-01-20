# Manual de Despliegue: Buscador de Prácticas FP (S9-Hunter)

Este documento detalla cómo configurar el entorno de **N8N** para que el workflow `PRACTICASFP` funcione correctamente tras la importación.

## 1. Variables de Entorno (Environment Variables)
El workflow utiliza variables de entorno para no exponer datos sensibles. Debes configurar estas variables en tu instancia de N8N (archivo `.env` de Docker o Configuración en Cloud).

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `GOOGLE_MAPS_API_KEY` | Clave de API de Google Maps (Places API activado). | `AIzaSyB...` |
| `ADMIN_EMAIL` | Dirección de email donde llegarán las notificaciones de nuevos leads. | `secretaria@centrofp.com` |
| `DRIVE_PARENT_FOLDER_ID` | ID de la carpeta raíz de Google Drive donde se crearán las carpetas de profesores. | `1LbrMq6t...` |

### ¿Cómo configurarlas?
1. **Self-Hosted (Docker):** Añade estas líneas a tu archivo `.env` y reinicia el contenedor.
2. **N8N Cloud:** Ve a "Variables" (si está disponible) o sustitúyelas manualmente en los nodos si no tienes acceso a env vars.

---

## 2. Credenciales (Re-conexión)
Al importar el JSON, las credenciales aparecerán como "Missing" o "Invalid" porque **las claves de seguridad no se transfieren** por seguridad. Debes reconectarlas.

### Google Drive & Sheets
1. Abre el nodo **"Crear Carpeta Profesor"**.
2. En *Credential*, selecciona "Create New".
3. Usa **Google OAuth2 API**.
4. Conecta con la cuenta corporativa de Google del centro (`@centrofp.com`).
5. Repite/Selecciona esta misma credencial para todos los nodos de Drive y Sheets.

### Google Maps
1. El nodo **"GeoLocalizar Centro"** usa la variable `GOOGLE_MAPS_API_KEY`.
2. Asegúrate de que la API Key tenga permisos habilitados para **Places API (New)**.

### Gmail (Envío de Correo)
1. Abre el nodo **"Send a message"**.
2. Crea una credencial **Gmail OAuth2**.
3. Autentica con la cuenta desde la que se enviarán los avisos.

---

## 3. Verificación Final
1. Pulsa **"Execute Workflow"** (Test).
2. Rellena el formulario de prueba que aparecerá.
3. Verifica que:
   - [ ] Se crea la carpeta en Drive.
   - [ ] Recibes el email en `ADMIN_EMAIL`.
   - [ ] El Excel se genera correctamente.

---
**Soporte Técnico:** contact@script-9.com
