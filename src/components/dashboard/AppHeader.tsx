'use client';

import { User } from 'lucide-react';

export function AppHeader({ userName }: { userName: string }) {
    return (
        <div className="bg-[#003D82] text-white py-8">
            <div className="container-script9">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1">
                            {userName && userName !== 'Cliente' ? `Hola, ${userName}` : 'Panel de Control'}
                        </h1>
                        <p className="text-blue-100 font-medium opacity-90 text-sm">
                            Gestiona tus automatizaciones, proyectos y servicios activos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
