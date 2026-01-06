'use client';

import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface ChatDemoCardProps {
    isStatic?: boolean;
    onClick?: () => void;
}

export default function ChatDemoCard({ isStatic = false, onClick }: ChatDemoCardProps) {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isStatic) return; // Do not init script if static

        // Initialize Embedded Chat when component mounts
        const initChat = () => {
            if (window.Script9Chat && chatContainerRef.current) {
                // Check if already initialized to prevent duplicates
                if (!chatContainerRef.current.querySelector('.aa-chat-widget')) {
                    new window.Script9Chat({
                        type: 'embedded',
                        container: chatContainerRef.current,
                        demoLimit: 3
                    });
                }
            }
        };

        // If script is already loaded
        if (window.Script9Chat) {
            initChat();
        } else {
            // Wait for script check (polling)
            const interval = setInterval(() => {
                if (window.Script9Chat) {
                    initChat();
                    clearInterval(interval);
                }
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isStatic]);

    if (isStatic) {
        return (
            <article
                onClick={onClick}
                className="bg-slate-900 overflow-hidden flex flex-col h-full relative group cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all rounded-xl border border-slate-800"
            >
                {/* Header / Banner */}
                <div className="bg-emerald-600 p-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        <h3 className="text-white font-bold text-lg">Prueba Interactiva</h3>
                    </div>
                </div>

                {/* Static Chat Visualization */}
                <div className="flex-1 bg-slate-950 p-4 space-y-4 relative">
                    {/* Fake Bubbles */}
                    <div className="flex justify-start animate-in slide-in-from-left-2 fade-in duration-500">
                        <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-md">
                            ¡Hola! Soy el agente IA de Script9.
                        </div>
                    </div>
                    <div className="flex justify-end animate-in slide-in-from-right-2 fade-in duration-500 delay-300 fill-mode-both">
                        <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm max-w-[80%] shadow-md">
                            ¿Puedes automatizar mis ventas?
                        </div>
                    </div>
                    <div className="flex justify-start animate-in slide-in-from-left-2 fade-in duration-500 delay-700 fill-mode-both">
                        <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-md">
                            ¡Por supuesto! Atiendo clientes 24/7 y agendo reuniones.
                        </div>
                    </div>

                    {/* CTA Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-end justify-center pb-6">
                        <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20 transform group-hover:scale-105 transition-transform">
                            Click para probar demo
                        </span>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="bg-slate-900 overflow-hidden flex flex-col h-full relative group">

            {/* Header / Banner */}
            <div className="bg-emerald-600 p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    <h3 className="text-white font-bold text-lg">Prueba Interactiva</h3>
                </div>
            </div>

            {/* Chat Container */}
            <div
                ref={chatContainerRef}
                className="flex-1 relative bg-slate-950 min-h-[400px]"
                id="script9-demo-container"
            >
                {/* The Script9Chat instance will be mounted here */}
            </div>

        </article>
    );
}
