'use client';

import { motion, useTime, useTransform } from 'framer-motion';
import {
    Workflow,
    Link2,
    Database,
    Globe,
    Activity,
    Server
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
            <div className={`absolute -top-px -left-px w-2 h-2 border-t border-l ${color.replace('text-', 'border-')} opacity-50`} />
            <div className={`absolute -bottom-px -right-px w-2 h-2 border-b border-r ${color.replace('text-', 'border-')} opacity-50`} />
        </motion.div>
    );
};

export function WorkflowHeroVisual() {
    const time = useTime();

    // Smooth connected rotations
    const rotate1 = useTransform(time, [0, 25000], [0, 360], { clamp: false });
    const rotate2 = useTransform(time, [0, 30000], [0, -360], { clamp: false });
    const rotate3 = useTransform(time, [0, 35000], [0, 360], { clamp: false });

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-[550px] flex items-center justify-center overflow-visible perspective-[1200px]">

            {/* AMBIENT GLOW - Purple/Indigo for Workflows (Integration) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[80px]" />
            </div>

            {/* 3D CORE SYSTEM */}
            <motion.div
                className="relative w-[300px] h-[300px] flex items-center justify-center transform-style-3d"
                style={{ transformStyle: "preserve-3d" }}
            >

                {/* 1. CENTRAL CONNECTED CORE */}
                <motion.div
                    className="relative z-20 w-32 h-32 flex items-center justify-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-slate-900 rounded-full border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center justify-center overflow-hidden">

                        <Workflow className="w-16 h-16 text-indigo-400 relative z-10 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    </div>

                    {/* Spinning Node Ring */}
                    <motion.div
                        className="absolute -inset-2 rounded-full border border-indigo-400/30 border-dashed"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* 2. ORBITAL RINGS */}

                <motion.div
                    className="absolute w-[450px] h-[450px] border border-slate-700/30 rounded-full border-t-indigo-500/50"
                    style={{ rotateX: 70, rotateZ: rotate1 }}
                >
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
                </motion.div>

                <motion.div
                    className="absolute w-[380px] h-[380px] border border-slate-700/30 rounded-full border-l-purple-500/30"
                    style={{ rotateY: 70, rotateZ: rotate2 }}
                />

                <motion.div
                    className="absolute w-[320px] h-[320px] border border-dashed border-slate-700/40 rounded-full"
                    style={{ rotateX: 45, rotateY: 45, rotateZ: rotate3 }}
                />

                {/* 3. FLOATING METRICS (Workflow Specific) */}

                {/* Integrations */}
                <HolographicHUD
                    icon={Link2}
                    title="Active Connections"
                    value="12 APPS LINKED"
                    color="text-indigo-400"
                    x={-220} y={-80}
                    delay={0}
                />

                {/* API Status */}
                <HolographicHUD
                    icon={Server}
                    title="API Status"
                    value="OPERATIONAL"
                    color="text-emerald-400"
                    x={200} y={20}
                    delay={1.5}
                />

                {/* Data Flow */}
                <HolographicHUD
                    icon={Activity}
                    title="Data Sync"
                    value="REAL-TIME"
                    color="text-purple-400"
                    x={-160} y={150}
                    delay={2.5}
                />

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-40">
                    <motion.line
                        x1="150" y1="150" x2="-70" y2="70"
                        stroke="#6366f1" strokeWidth="1" strokeDasharray="5,5"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.line
                        x1="150" y1="150" x2="350" y2="170"
                        stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2"
                    />
                </svg>

            </motion.div>
        </div>
    );
}
