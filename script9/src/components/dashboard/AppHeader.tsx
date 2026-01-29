'use client';

import { User } from 'lucide-react';

export function AppHeader({ userName }: { userName: string }) {
    return (
        <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 py-6">
                    <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-full">
                        <User className="h-8 w-8 text-slate-200" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1 text-white">
                            {userName && userName !== 'Cliente' ? `Hola, ${userName}` : 'Panel de Control'}
                        </h1>
                        <p className="text-slate-400 font-medium text-sm">
                            Gestiona tus automatizaciones, proyectos y servicios activos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
