'use client';

import { useState } from 'react';
import { Loader2, Calendar } from 'lucide-react';

interface BookingCalendarProps {
    calLink?: string; // e.g. "steve-jobs/30min"
}

export default function BookingCalendar({ calLink = "antonio/demo" }: BookingCalendarProps) {
    const [isLoading, setIsLoading] = useState(true);

    // In a real scenario, this would be the user's actual Cal.com or Calendly URL.
    // Ensure this URL is valid or use a placeholder that explains configuration.
    const calendarUrl = `https://cal.com/${calLink}`;

    return (
        <div className="w-full h-full bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col relative min-h-[600px]">
            {/* Header / Instructions */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#003D82]/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#003D82]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Reserva tu Sesión Estratégica</h3>
                </div>
                <p className="text-sm text-gray-500">
                    Selecciona un hueco en la agenda para una videollamada de 30 minutos. 100% gratuita y sin compromiso.
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                    <Loader2 className="w-8 h-8 text-[#003D82] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Cargando disponibilidad...</p>
                </div>
            )}

            {/* Iframe Embed */}
            <iframe
                src={calendarUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="flex-1 w-full h-full"
                onLoad={() => setIsLoading(false)}
                title="Calendario de Reservas"
            ></iframe>
        </div>
    );
}
