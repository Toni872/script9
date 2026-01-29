# 📘 Manual de Mantenimiento Script9

Guía rápida para gestionar tu Chatbot y Web.

## 1. 🧠 Cómo Cambiar los Precios o Respuestas (N8N)
El cerebro del chatbot vive en N8N.
- **URL:** [http://46.224.199.64:5678](http://46.224.199.64:5678)
- **Usuario/Pass:** (Tus credenciales)

### Pasos para editar:
1.  Abre el flujo **"Sales Chat (AI Agent)"**.
2.  Haz doble clic en el nodo **"AI Server Request"**.
3.  Busca el campo **"JSON Body"**.
4.  Edita el texto dentro de `"system_message"`.
    *   *Ejemplo:* Cambia "299€/mes" por "350€/mes".
5.  **⚠️ IMPORTANTE (Para que funcione):**
    *   Pulsa **Ctrl + S** para guardar.
    *   Arriba a la derecha, apaga y enciende el interruptor **Active** (Verde).

## 2. 🚀 Cómo Actualizar la Web (Frontend)
Si haces cambios en el código (React, textos de la web, colores):
1.  Abre tu terminal en la carpeta del proyecto.
2.  Escribe el comando mágico:
    ```powershell
    .\deploy_frontend.ps1
    ```
3.  Espera 2-3 minutos. El script subirá los cambios y reconstruirá la web automáticamente.

## 3. 📅 Dónde ver las Citas
Las citas se sincronizan con tu **Google Calendar** (el que conectamos al sistema).
*   Recibirás un email de confirmación cada vez que alguien reserve.

## 4. 📊 Dónde ver los Leads (SDR)
Los leads captados por el AI SDR van a tu **Google Sheet**.
*   Ruta: `(Tu archivo de Google Sheets conectado en la Fase 8)`
