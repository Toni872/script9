'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bot, Zap, Network, Code2 } from 'lucide-react';

export const AboutVisual = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const pillars = [
        { label: "Agentes IA", icon: Bot, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/50" },
        { label: "Automatización", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/50" },
        { label: "Integraciones", icon: Network, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/50" },
        { label: "Scripts a Medida", icon: Code2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/50" }
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-slate-950/50 rounded-3xl border border-slate-800/50">

            {/* Connecting Lines (Static SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                        <stop offset="50%" stopColor="rgba(16, 185, 129, 0.3)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                </defs>
                {/* We'll animate these with CSS if needed, but for now simple lines from center */}
            </svg>

            {/* Central Core */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-20 w-32 h-32 bg-slate-900 border border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.15)]"
            >
                <div className="text-3xl font-bold text-white tracking-widest font-mono">S9</div>

                {/* Ripple Effect */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border border-emerald-500/30 rounded-full"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
                    />
                ))}
            </motion.div>

            {/* Orbit Container */}
            <motion.div
                className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-slate-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {pillars.map((p, i) => {
                    const angle = (i * 90) * (Math.PI / 180); // 0, 90, 180, 270 deg
                    // Position on circle r=160
                    // Actually easier: use CSS rotation transforms
                    return (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 -ml-8 -mt-8"
                            style={{
                                transform: `rotate(${i * 90}deg) translate(160px) rotate(-${i * 90}deg)`
                            }}
                        >
                            {/* Counter-Rotate the Item itself so it stays upright while container spins? 
                                No, the container spins. The item is fixed to the container. 
                                So item rotates with container.
                                To keep item upright: animate rotation -360 deg.
                            */}
                            <motion.div
                                className={`w-16 h-16 rounded-2xl ${p.bg} ${p.border} border flex items-center justify-center backdrop-blur-sm shadow-lg`}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            >
                                <p.icon className={`w-8 h-8 ${p.color}`} />
                            </motion.div>
                        </div>
                    )
                })}
            </motion.div>

            {/* Floating Labels (Static positions, fading in) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute top-10 left-10 p-4 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur">
                    <div className="text-emerald-400 text-xs font-mono mb-1">MISION</div>
                    <div className="text-white text-sm">Eliminar trabajo repetitivo</div>
                </motion.div>

                {/* Bottom Right */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="absolute bottom-10 right-10 p-4 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur">
                    <div className="text-emerald-400 text-xs font-mono mb-1">VISIÓN</div>
                    <div className="text-white text-sm">Escalar sin burocracia</div>
                </motion.div>
            </div>

        </div>
    );
};
