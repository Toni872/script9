'use client';

import { useState } from 'react';
import { Loader2, Calendar, Clock, Video } from 'lucide-react';

interface BookingCalendarProps {
    calLink?: string;
}

export default function BookingCalendar({ calLink = "toni-lloret-2pmzbc" }: BookingCalendarProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Reverting to Iframe for reliability.
    // Injecting style params into the URL.
    // Encoded colors: #020617 (Slate 950) -> %23020617
    // #10b981 (Emerald 500) -> %2310b981
    // &embed=true triggers the embed layout (cleaner)
    const calendarUrl = `https://cal.com/${calLink}?theme=dark&bg=%23020617&primaryColor=%2310b981&embed=true`;

    return (
        <div className="w-full h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col relative min-h-[700px] shadow-2xl shadow-black/80">
            {/* Header / Instructions */}
            <div className="p-6 border-b border-slate-800 bg-slate-950">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <Calendar className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Reserva tu Sesión Estratégica</h3>
                            <p className="text-sm text-slate-400 mt-1">Elige el mejor momento para transformar tu negocio</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        45 Minutos
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                        Google Meet
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                    <p className="text-slate-400 font-medium animate-pulse">Conectando con la agenda...</p>
                </div>
            )}

            {/* Iframe Embed */}
            <iframe
                src={calendarUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="flex-1 w-full h-full bg-slate-950"
                onLoad={() => setIsLoading(false)}
                title="Calendario de Reservas"
            ></iframe>
        </div>
    );
}
