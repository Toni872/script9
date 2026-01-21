'use client';

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, PieChart, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface VisualProps {
    className?: string;
    contentClassName?: string;
}

export function FinanceVisual({ className = "", contentClassName = "max-w-[280px] scale-75" }: VisualProps) {
    // Simulated random data for dynamic effect
    const [price, setPrice] = useState(12450);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrice(prev => prev + Math.floor(Math.random() * 100) - 30);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const bars = [40, 65, 45, 80, 55, 90, 70];

    return (
        <div className={`relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden rounded-xl border border-slate-800 ${className}`}>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 blur-[60px]" />

            <div className={`relative z-10 w-full flex flex-col gap-4 transform origin-center ${contentClassName}`}>

                {/* Floating Card: Revenue */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/90 border border-slate-700/50 p-4 rounded-xl shadow-xl backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <span className="text-xs text-slate-400 font-medium">Monthly Recurring Info</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +12%
                        </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">${price.toLocaleString()}</span>
                        <span className="text-xs text-slate-500">USD</span>
                    </div>
                </motion.div>

                {/* Floating Card: Chart */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900/90 border border-slate-700/50 p-4 rounded-xl shadow-xl backdrop-blur-md flex items-end justify-between h-32 gap-2"
                >
                    {bars.map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end h-full gap-1 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "backOut" }}
                                className={`w-full rounded-t-sm relative overflow-hidden ${i === bars.length - 1 ? 'bg-emerald-500' : 'bg-slate-700 group-hover:bg-slate-600'}`}
                            >
                                {i === bars.length - 1 && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        animate={{ y: ['100%', '-100%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* Floating Particles/Coins */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100,
                            x: (Math.random() - 0.5) * 50
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeOut"
                        }}
                        style={{ bottom: '20%', left: `${20 + Math.random() * 60}%` }}
                    />
                ))}

            </div>
        </div>
    );
}
