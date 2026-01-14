'use client';

import { motion } from 'framer-motion';
import {
    Clock,
    FileSpreadsheet,
    Mail,
    AlertCircle,
    User,
    ArrowRight,
    Zap,
    TrendingUp,
    CheckCircle2,
    Database,
    CreditCard
} from 'lucide-react';

export const WorkflowHero = () => {
    // 1. Chaos Items (Left Side) - Slow, drifting, disorganized
    const chaosItems = [
        { icon: Clock, color: 'text-slate-400', x: -160, y: -80, delay: 0 },
        { icon: FileSpreadsheet, color: 'text-slate-500', x: -200, y: 40, delay: 1 },
        { icon: Mail, color: 'text-slate-300', x: -140, y: 120, delay: 2 },
        { icon: AlertCircle, color: 'text-red-400', x: -220, y: -40, delay: 3 },
    ];

    // 2. Processed Items (Right Side) - Fast, aligned, successful
    const successItems = [
        { icon: Zap, color: 'text-amber-400', x: 160, y: -60, label: "Automated" },
        { icon: TrendingUp, color: 'text-emerald-400', x: 200, y: 0, label: "+40% Rev" },
        { icon: CheckCircle2, color: 'text-blue-400', x: 160, y: 60, label: "Done" },
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">

            {/* Background Architecture Grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[300px] bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:30px_30px] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
            </div>

            {/* --- CENTRAL ENGINE (SCRIPT9 CORE) --- */}
            <motion.div
                className="relative z-20 w-32 h-32 flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                {/* Glow */}
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl" />

                {/* Core Interface */}
                <div className="relative z-10 w-24 h-24 bg-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />

                    {/* Scanning Line */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-emerald-400/50 shadow-[0_0_10px_#34d399]"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <span className="font-mono text-xs text-emerald-500 font-bold mb-1">SCRIPT9</span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest">ENGINE</span>
                </div>

                {/* Connecting Nodes */}
                <div className="absolute -left-4 w-3 h-3 bg-slate-800 border border-slate-600 rounded-full" />
                <div className="absolute -right-4 w-3 h-3 bg-slate-800 border border-emerald-500/50 rounded-full" />
            </motion.div>


            {/* --- LEFT SIDE: MANUAL CHAOS (Input) --- */}
            {chaosItems.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute z-10 bg-slate-900/80 p-3 rounded-lg border border-slate-700 backdrop-blur-sm"
                    initial={{ x: item.x, y: item.y, opacity: 0.5 }}
                    animate={{
                        x: [item.x, item.x + 10, item.x],
                        y: [item.y, item.y - 10, item.y],
                    }}
                    transition={{
                        duration: 4,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <item.icon className={`w-5 h-5 ${item.color}`} />

                    {/* Particles flowing towards center */}
                    <motion.div
                        className="absolute right-0 top-1/2 w-1 h-1 bg-slate-600 rounded-full"
                        animate={{
                            x: [0, 80], // Move towards center roughly
                            opacity: [1, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: item.delay * 0.5 }}
                    />
                </motion.div>
            ))}


            {/* --- RIGHT SIDE: AUTOMATED ORDER (Output) --- */}
            {successItems.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute z-10 flex items-center gap-3"
                    initial={{ x: item.x, y: item.y, opacity: 0 }}
                    animate={{ x: item.x, y: item.y, opacity: 1 }}
                    transition={{ delay: 1 + (i * 0.5), duration: 0.5 }}
                >
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-3 shadow-lg shadow-emerald-900/20 backdrop-blur-md min-w-[140px]">
                        <div className={`p-2 rounded-lg bg-slate-800 ${item.color.replace('text', 'bg').replace('400', '500')}/10`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Status</div>
                            <div className="text-sm font-bold text-white">{item.label}</div>
                        </div>
                    </div>

                    {/* Connecting Line to Center */}
                    <motion.div
                        className="absolute right-full top-1/2 w-[40px] h-[1px] bg-gradient-to-r from-emerald-500/50 to-transparent origin-right"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1 + (i * 0.5) }}
                    />
                </motion.div>
            ))}

            {/* --- PROCESSING PIPELINE (Particles) --- */}
            {/* Simulates data moving from Left to Right through the engine */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                        initial={{ x: -200, y: (Math.random() - 0.5) * 100, opacity: 0, scale: 0.5 }}
                        animate={{
                            x: [-200, 0, 200], // Path: Left -> Center -> Right
                            y: [(Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 50], // Converge then diverge
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

        </div>
    );
};
