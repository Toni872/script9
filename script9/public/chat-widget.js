(function () {
    // Definición de la Clase Widget para permitir múltiples instancias
    class Script9Chat {
        constructor(config = {}) {
            this.config = Object.assign({
                type: 'floating', // 'floating' or 'embedded'
                container: document.body,
                demoLimit: null, // number or null
            }, config);

            this.idSuffix = Math.random().toString(36).substr(2, 9);
            this.messageCount = 0;
            this.isMinimized = false;

            this.injectStyles();
            this.render();
            this.bindEvents();
        }

        injectStyles() {
            if (document.getElementById('script9-chat-styles')) return;
            const style = document.createElement('style');
            style.id = 'script9-chat-styles';
            style.innerHTML = `
                .aa-chat-widget {
                    background: #1e293b;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid #334155;
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                    transition: all 0.3s ease;
                }
                .aa-chat-widget.floating {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 350px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                }
                .aa-chat-widget.embedded {
                    position: absolute; /* Relative to container */
                    top: 0; left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    box-shadow: none;
                    border: none;
                    z-index: 10;
                }
                .aa-chat-header {
                    background: #10b981;
                    padding: 15px;
                    font-weight: bold;
                    color: #020617;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    border-bottom: 1px solid #059669;
                }
                .aa-chat-widget.embedded .aa-toggle-btn { display: none; }
                .aa-chat-body {
                    flex: 1;
                    padding: 15px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    background: #020617; 
                }
                .aa-message {
                    padding: 10px;
                    border-radius: 8px;
                    max-width: 80%;
                    font-size: 0.9rem;
                    color: white;
                }
                .aa-bot { background: #1e293b; align-self: flex-start; border: 1px solid #334155; }
                .aa-user { background: #10b981; color: #020617; align-self: flex-end; font-weight: 500; }
                .aa-chat-input {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #334155;
                    background: #1e293b;
                    position: relative;
                }
                .aa-chat-input input {
                    flex: 1;
                    padding: 10px;
                    border-radius: 6px;
                    border: 1px solid #334155;
                    background: #0f172a;
                    color: white;
                    outline: none;
                }
                .aa-chat-input input:focus { border-color: #10b981; }
                .aa-chat-input input:disabled { opacity: 0.5; cursor: not-allowed; }
                .aa-chat-input button {
                    margin-left: 10px;
                    background: #10b981;
                    border: none;
                    color: #020617;
                    padding: 10px 15px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .aa-chat-input button:hover { background: #34d399; }
                .aa-chat-widget.minimized { height: 50px; width: 200px; }
                .aa-chat-widget.minimized .aa-chat-body,
                .aa-chat-widget.minimized .aa-chat-input { display: none; }
                .aa-demo-overlay {
                    position: absolute;
                    bottom: 0; left: 0; right: 0; top: 60px;
                    background: rgba(2, 6, 23, 0.95);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 20px;
                    z-index: 20;
                    opacity: 0;
                    animation: fadeIn 0.5s forwards;
                }
                @keyframes fadeIn { to { opacity: 1; } }
            `;
            document.head.appendChild(style);
        }

        render() {
            this.widget = document.createElement('div');
            this.widget.className = `aa-chat-widget ${this.config.type}`;
            this.widget.innerHTML = `
                <div class="aa-chat-header">
                    <div><span style="height:10px;width:10px;background:#4ade80;border-radius:50%;display:inline-block;margin-right:5px;"></span>Asistente IA ${this.config.type === 'embedded' ? '(Demo)' : ''}</div>
                    <span class="aa-toggle-btn">−</span>
                </div>
                <div class="aa-chat-body">
                    <div class="aa-message aa-bot">¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy? 🤖</div>
                </div>
                <div class="aa-chat-input">
                    <input type="text" placeholder="Escribe tu mensaje...">
                    <button>➤</button>
                </div>
            `;
            this.config.container.appendChild(this.widget);

            // References
            this.header = this.widget.querySelector('.aa-chat-header');
            this.body = this.widget.querySelector('.aa-chat-body');
            this.input = this.widget.querySelector('input');
            this.sendBtn = this.widget.querySelector('button');
            this.toggleBtn = this.widget.querySelector('.aa-toggle-btn');
        }

        bindEvents() {
            if (this.config.type === 'floating') {
                this.header.addEventListener('click', () => this.toggleMinimize());
            } else {
                this.header.style.cursor = 'default';
            }

            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }

        toggleMinimize() {
            this.isMinimized = !this.isMinimized;
            this.widget.classList.toggle('minimized');
            this.toggleBtn.textContent = this.isMinimized ? '+' : '−';
        }

        showDemoLimit() {
            const overlay = document.createElement('div');
            overlay.className = 'aa-demo-overlay';
            overlay.innerHTML = `
                <div style="color: #10b981; margin-bottom: 10px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <h3 style="color: white; font-size: 1.2rem; margin-bottom: 5px; font-weight: bold;">Demo Finalizada</h3>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px;">Has alcanzado el límite de mensajes de prueba.</p>
                <a href="/contacto" style="background: #10b981; color: #020617; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                    Agendar Demo Completa
                </a>
            `;
            this.widget.appendChild(overlay);
            this.input.disabled = true;
        }

        async sendMessage() {
            const text = this.input.value;
            if (!text) return;

            // Check Demo Limit
            if (this.config.demoLimit && this.messageCount >= this.config.demoLimit) {
                this.showDemoLimit();
                return;
            }

            // User Message
            this.body.innerHTML += `<div class="aa-message aa-user">${text}</div>`;
            this.input.value = '';
            this.body.scrollTop = this.body.scrollHeight;
            this.messageCount++;

            // Loading
            const loadingId = 'loading-' + Math.random().toString(36).substr(2, 9);
            this.body.innerHTML += `<div class="aa-message aa-bot" id="${loadingId}">Escribiendo...</div>`;
            this.body.scrollTop = this.body.scrollHeight;

            try {
                const response = await fetch('http://46.224.199.64:5678/webhook/sales-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text })
                });

                const rawText = await response.text();
                let data = JSON.parse(rawText || "{}");
                const finalText = data.reply || data.response || data.message || "No entendí eso.";

                const loader = document.getElementById(loadingId);
                if (loader) loader.remove();

                this.body.innerHTML += `<div class="aa-message aa-bot">${finalText}</div>`;
                this.body.scrollTop = this.body.scrollHeight;

                // Check limit after reply
                if (this.config.demoLimit && this.messageCount >= this.config.demoLimit) {
                    setTimeout(() => this.showDemoLimit(), 1500);
                }

            } catch (error) {
                const loader = document.getElementById(loadingId);
                if (loader) loader.remove();
                this.body.innerHTML += `<div class="aa-message aa-bot" style="color:#ef4444">Error de conexión.</div>`;
            }
        }
    }

    // Expose Global Class
    window.Script9Chat = Script9Chat;

    // No auto-init for floating widget. Only manual instantiation or via ChatDemoCard.
})();
