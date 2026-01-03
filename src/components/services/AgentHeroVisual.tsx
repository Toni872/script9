'use client';

import { motion, useTime, useTransform } from 'framer-motion';
import {
    Bot,
    MessageSquare,
    Zap,
    Activity,
    Cpu,
    Network,
    Share2,
    Globe,
    Fingerprint
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Specialized HUD Component (Heads-Up Display)
const HolographicHUD = ({ title, value, icon: Icon, color, x, y, delay }: any) => {
    return (
        <motion.div
            className="absolute p-4 rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-md flex items-center gap-4 shadow-[0_0_20px_rgba(0,0,0,0.6)] min-w-[230px]"
            initial={{ opacity: 0, x, y, scale: 0.8 }}
            animate={{
                opacity: [0.4, 1, 0.4],
                y: [y - 5, y + 5, y - 5],
            }}
            transition={{
                opacity: { duration: 4, repeat: Infinity, delay },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
            }}
        >
            <div className={`p-2.5 rounded-lg bg-slate-800/80 ${color} shadow-inner`}>
                <Icon size={20} />
            </div>
            <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-widest font-mono mb-1">{title}</div>
                <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    {value}
                    <span className={`block w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')} animate-pulse`} />
                </div>
            </div>

            {/* Corner Accents */}
            <div className={`absolute -top-px -left-px w-2 h-2 border-t border-l ${color.replace('text-', 'border-')} opacity-50`} />
            <div className={`absolute -bottom-px -right-px w-2 h-2 border-b border-r ${color.replace('text-', 'border-')} opacity-50`} />
        </motion.div>
    );
};

export function AgentHeroVisual() {
    const time = useTime();

    // Rotations for multiple orbital rings
    const rotate1 = useTransform(time, [0, 20000], [0, 360], { clamp: false });
    const rotate2 = useTransform(time, [0, 25000], [0, -360], { clamp: false });
    const rotate3 = useTransform(time, [0, 30000], [0, 360], { clamp: false });

    // Pulsing core effect (Fixed loop)
    const glowOpacity = useTransform(time, [0, 2000], [0.3, 0.6], { clamp: false });

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-[550px] flex items-center justify-center overflow-visible perspective-[1200px]">

            {/* BACKGROUND FIELD */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[80px]" />
            </div>

            {/* 3D CORE SYSTEM */}
            <motion.div
                className="relative w-[300px] h-[300px] flex items-center justify-center transform-style-3d"
                style={{ transformStyle: "preserve-3d" }}
            >

                {/* 1. CENTRAL NEURAL CORE */}
                <motion.div
                    className="relative z-20 w-32 h-32 flex items-center justify-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-slate-900 rounded-full border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center justify-center overflow-hidden">
                        {/* Clean Background (No GIF) */}

                        <Bot className="w-16 h-16 text-emerald-400 relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    </div>

                    {/* Spinning Energy Ring */}
                    <motion.div
                        className="absolute -inset-2 rounded-full border border-emerald-400/30 border-t-transparent border-l-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute -inset-4 rounded-full border border-cyan-400/20 border-b-transparent border-r-transparent"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* 2. ORBITAL RINGS (Gyroscope) */}

                {/* Large Outer Ring */}
                <motion.div
                    className="absolute w-[450px] h-[450px] border border-slate-700/30 rounded-full"
                    style={{ rotateX: 70, rotateZ: rotate1 }}
                    transition={{ ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-emerald-500/50 rounded-full" />
                </motion.div>

                {/* Vertical Ring */}
                <motion.div
                    className="absolute w-[380px] h-[380px] border border-slate-700/30 rounded-full border-l-emerald-500/30"
                    style={{ rotateY: 70, rotateZ: rotate2 }}
                    transition={{ ease: "linear" }}
                >
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
                </motion.div>

                {/* Tilted Ring */}
                <motion.div
                    className="absolute w-[320px] h-[320px] border border-dashed border-slate-700/40 rounded-full"
                    style={{ rotateX: 45, rotateY: 45, rotateZ: rotate3 }}
                    transition={{ ease: "linear" }}
                />

                {/* 3. FLOATING HOLOGRAPHIC HUDs */}

                {/* Stats Panel Left */}
                <HolographicHUD
                    icon={Cpu}
                    title="Neural Load"
                    value="42% OPTIMAL"
                    color="text-emerald-400"
                    x={-220} y={-80}
                    delay={0}
                />

                {/* Stats Panel Right - Active Chats */}
                <HolographicHUD
                    icon={MessageSquare}
                    title="Active Threads"
                    value="843 SESSIONS"
                    color="text-cyan-400"
                    x={200} y={20}
                    delay={1.5}
                />

                {/* Security Badge Bottom */}
                <HolographicHUD
                    icon={Fingerprint}
                    title="Security Level"
                    value="ENCRYPTED"
                    color="text-purple-400"
                    x={-160} y={150}
                    delay={2.5}
                />

                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-40">
                    <motion.line
                        x1="150" y1="150" x2="-70" y2="70"
                        stroke="#10b981" strokeWidth="1" strokeDasharray="5,5"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.line
                        x1="150" y1="150" x2="350" y2="170"
                        stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2"
                    />
                    <motion.circle cx="150" cy="150" r="180" stroke="#334155" strokeWidth="1" opacity="0.2" fill="none" />
                </svg>

            </motion.div>
        </div>
    );
}
