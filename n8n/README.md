# Backups de N8N (Flujos de Trabajo)

Tus flujos de trabajo (Workflows) están vivos en el servidor de producción:
👉 **[http://46.224.199.64:5678/](http://46.224.199.64:5678/)**

Esta carpeta local (`script9/n8n`) está pensada para guardar **copias de seguridad** de tus archivos JSON.

### Cómo hacer una copia de seguridad:
1.  Entra en N8N (link arriba).
2.  Abre un Workflow.
3.  Click derecho en el lienzo -> "Download" o Menú -> "Export from Editor".
4.  Guarda el archivo `.json` en esta carpeta.
5.  Haz un commit (`git add .`, `git commit ...`) para que se guarde en GitHub.

### Workflows Activos (Resumen):
*   **Lead Scoring & AI SDR:** Captura formularios y los pasa por GPT-4.
*   **Email Automation:** Envía correos con Resend.
