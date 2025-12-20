'use client';

import { motion, useTime, useTransform } from 'framer-motion';
import {
    Cpu,
    Database,
    Globe,
    Zap,
    Code2,
    Share2,
    ShieldCheck
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Futuristic Card Component
const TechCard = ({ icon: Icon, title, value, color, delay, x, y, z }: any) => {
    return (
        <motion.div
            className={`absolute flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-48`}
            initial={{ opacity: 0, scale: 0.8, x, y, z }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [y - 10, y + 10, y - 10],
            }}
            transition={{
                opacity: { duration: 0.8, delay },
                scale: { duration: 0.8, delay },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }
            }}
            style={{
                transformStyle: "preserve-3d",
                boxShadow: `0 0 30px ${color}20, inset 0 0 20px ${color}10`
            }}
        >
            <div className="flex items-center gap-3 mb-1">
                <div className={`p-2 rounded-lg bg-black/40 ${color} text-white`}>
                    <Icon size={18} />
                </div>
                <span className="text-xs font-mono text-blue-200/60 uppercase tracking-wider">{title}</span>
            </div>
            <div className="h-full flex items-end">
                <span className="text-xl font-bold text-white font-mono">{value}</span>
            </div>

            {/* Animated scanning line */}
            <motion.div
                className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${color.replace('text-', '')}-400 to-transparent`}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay }}
                style={{ opacity: 0.5 }}
            />
        </motion.div>
    );
};

export function HeroAdvancedVisual() {
    const time = useTime();
    const rotateX = useTransform(time, [0, 10000], [0, 360], { clamp: false });
    const rotateY = useTransform(time, [0, 20000], [0, 360], { clamp: false });
    const rotateZ = useTransform(time, [0, 15000], [0, -360], { clamp: false });

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2000px] overflow-visible">

            {/* 3D SCENE CONTAINER */}
            <motion.div
                className="relative w-[300px] h-[300px] transform-style-3d flex items-center justify-center"
                animate={{ rotateX: 15, rotateY: 15 }} // Static tilt for perspective
                style={{ transformStyle: "preserve-3d" }}
            >

                {/* CENTRAL CORE - THE BRAIN */}
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                    <motion.div
                        className="w-32 h-32 rounded-full bg-[#003D82] relative flex items-center justify-center z-20"
                        style={{
                            boxShadow: "0 0 80px #10B981, inset 0 0 40px #10B981",
                        }}
                        animate={{
                            boxShadow: ["0 0 60px #10B981", "0 0 100px #10B981", "0 0 60px #10B981"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {/* Core Grid Texture */}
                        <div className="absolute inset-0 rounded-full opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-spin-slow mix-blend-overlay" />
                        <Zap className="w-14 h-14 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] fill-white relative z-10" />
                    </motion.div>

                    {/* Inner Core Rings */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full border border-[#10B981]/30 border-dashed"
                        style={{ rotate: rotateZ }}
                    />
                    <motion.div
                        className="absolute w-48 h-48 rounded-full border border-blue-400/20"
                        style={{ rotate: rotateX, rotateY: rotateY }}
                    />
                </div>

                {/* ORBITAL RINGS (GYROSCOPE STYLE) */}
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full border-[1px] border-white/5 border-t-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    style={{ rotateX: rotateX, rotateY: rotateY }}
                />

                <motion.div
                    className="absolute w-[420px] h-[420px] rounded-full border-[1px] border-white/5 border-b-blue-500/50"
                    style={{ rotateY: rotateX, rotateZ: rotateY }}
                />

                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-white/5 border-l-purple-500/50 opacity-50"
                    style={{ rotateX: rotateZ, rotateY: rotateX }}
                />

                {/* FLOATING DATA CARDS IN 3D SPACE */}
                {/* Right Top - Analytics */}
                <TechCard
                    icon={Globe}
                    title="ALCANCE GLOBAL"
                    value="ACTIVO 24/7"
                    color="text-blue-500"
                    x={220} y={-100} z={50}
                    delay={0.2}
                />

                {/* Left Bottom - Code */}
                <TechCard
                    icon={Code2}
                    title="AUTO-PILOTO"
                    value="OPTIMIZADO"
                    color="text-[#10B981]"
                    x={-240} y={80} z={80}
                    delay={0.5}
                />

                {/* Right Bottom - Security */}
                <TechCard
                    icon={ShieldCheck}
                    title="NÚCLEO SEGURO"
                    value="ENCRIPTADO"
                    color="text-purple-500"
                    x={200} y={120} z={-20}
                    delay={0.8}
                />

                {/* Top Left - Database */}
                <TechCard
                    icon={Database}
                    title="SINCRONIZACIÓN"
                    value="TIEMPO REAL"
                    color="text-orange-500"
                    x={-200} y={-140} z={20}
                    delay={1.1}
                />

                {/* Connecting Beams (Visual only) */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-30" style={{ transform: 'translateZ(-50px)' }}>
                    <motion.line x1="150" y1="150" x2="370" y2="50" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                    <motion.line x1="150" y1="150" x2="-70" y2="230" stroke="#10B981" strokeWidth="1" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                </svg>

            </motion.div>

            {/* Background Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

        </div>
    );
}
