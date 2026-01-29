'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

// CONCEPT 1: NEURAL STREAM
// Represents: Flow, AI, Connection. Organic but structured.
const LogoNeural = ({ className = "w-16 h-16" }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="neural-grad" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0.2" stopColor="#10B981" />
                <stop offset="1" stopColor="#34D399" />
            </linearGradient>
            <filter id="glow-neural" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        {/* S-shape formed by connected nodes */}
        <path d="M10 28C10 21, 20 28, 20 20C20 12, 30 14, 32 10"
            stroke="url(#neural-grad)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="28" r="3" fill="#10B981" />
        <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
        <circle cx="32" cy="10" r="3" fill="#34D399" style={{ filter: 'url(#glow-neural)' }} />
    </svg>
);

// CONCEPT 2: GEOMETRIC NEXUS (S9 Monogram)
// Represents: Structure, Code, Solidity.
const LogoGeometric = ({ className = "w-16 h-16" }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="geo-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="1" stopColor="#10B981" />
            </linearGradient>
        </defs>
        {/* Abstract S and 9 interlocking */}
        <path d="M12 10H24C27.3137 10 30 12.6863 30 16V18M30 18V24C30 27.3137 27.3137 30 24 30H12M12 30V24C12 20.6863 14.6863 18 18 18H30"
            stroke="url(#geo-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="30" r="2" fill="#FFFFFF" />
    </svg>
);

// CONCEPT 3: ABSTRACT PRISM (The Core)
// Represents: The "Engine" of automation. Minimalist.
const LogoPrism = ({ className = "w-16 h-16" }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(45 20 20)">
            <rect x="12" y="12" width="16" height="16" rx="4" stroke="#10B981" strokeWidth="2" strokeOpacity="0.5" />
            <rect x="15" y="15" width="10" height="10" rx="2" fill="#10B981" />
            <path d="M20 8V12 M32 20H28 M20 32V28 M8 20H12" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        </g>
    </svg>
);

export default function BrandPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Propuestas de Logotipo</h1>
            <p className="text-slate-400 mb-12">Script9 - Deep Tech Identity</p>

            {/* LIVE IMPLEMENTATION */}
            <div className="mb-16 p-10 bg-slate-900/50 border border-emerald-500/20 rounded-2xl flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                <span className="text-emerald-400 text-sm font-mono tracking-widest uppercase">Implementación Actual (Tech Capsule)</span>
                <div className="transform scale-150">
                    <Logo variant="dark" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">

                {/* OPTION 1 */}
                <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
                        <LogoNeural className="w-24 h-24" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-white mb-2">1. Neural Stream</h2>
                        <p className="text-sm text-slate-400">Evolución orgánica. Representa la IA fluyendo entre puntos de datos. Dinámico y moderno.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LogoNeural className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">Script<span className="text-emerald-500">9</span></span>
                    </div>
                </div>

                {/* OPTION 2 */}
                <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
                        <LogoGeometric className="w-24 h-24" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-white mb-2">2. S9 Nexus</h2>
                        <p className="text-sm text-slate-400">Geometría sólida. Un monograma "S9" abstracto construido como un circuito. Profesional y corporativo.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LogoGeometric className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">Script<span className="text-emerald-500">9</span></span>
                    </div>
                </div>

                {/* OPTION 3 */}
                <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
                        <LogoPrism className="w-24 h-24" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-white mb-2">3. The Core</h2>
                        <p className="text-sm text-slate-400">Minimalismo técnico. Un "chip" o núcleo central girado. Simboliza el motor de la automatización.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LogoPrism className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">Script<span className="text-emerald-500">9</span></span>
                    </div>
                </div>

            </div>

            <div className="mt-16 text-center">
                <Link href="/" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
