'use client';

import { motion } from 'framer-motion';
import { Database, FileSpreadsheet, Mail, Settings, Check, ArrowRight, Bell } from 'lucide-react';

export function AutomationHeroVisual() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full" />

            {/* --- PIPELINE CONTAINER --- */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-4 scale-75 md:scale-100 origin-center">

                {/* 1. INPUTS (Manual Chaos) */}
                <div className="flex flex-col gap-4">
                    {[
                        { icon: Mail, color: "text-blue-400", delay: 0 },
                        { icon: FileSpreadsheet, color: "text-green-400", delay: 1.5 },
                        { icon: Database, color: "text-slate-400", delay: 3 }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-lg flex items-center gap-3 w-40"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: item.delay }}
                        >
                            <div className="bg-slate-800 p-2 rounded-lg">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="h-2 w-16 bg-slate-700 rounded-full animate-pulse" />

                            {/* Particle Moving to Center */}
                            <motion.div
                                className="absolute right-[-20px] top-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: [0, 1, 0], x: 80 }} // Moves towards the gear
                                transition={{ duration: 1.5, repeat: Infinity, delay: item.delay + 0.5 }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* 2. PROCESSING ENGINE (The Gear) */}
                <div className="relative w-32 h-32 flex items-center justify-center mx-4">
                    <motion.div
                        className="absolute inset-0 border border-amber-500/30 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-4 border border-dashed border-amber-500/50 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="bg-slate-900 p-4 rounded-full border border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] z-10">
                        <Settings className="w-10 h-10 text-amber-500 animate-spin-slow" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 px-3 py-1 rounded-full text-[10px] text-amber-400 font-bold border border-slate-700 whitespace-nowrap">
                        PROCESSING DATA...
                    </div>
                </div>

                {/* 3. OUTPUTS (Clean Results) */}
                <div className="flex flex-col gap-4">
                    {[
                        { label: "Report Sent", icon: Check, color: "text-emerald-400", delay: 1 },
                        { label: "Admin Alerts", icon: Bell, color: "text-amber-400", delay: 2.5 },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-slate-900 border border-emerald-500/30 p-4 rounded-xl shadow-lg flex items-center gap-3 w-48 relative overflow-hidden"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: item.delay }}
                        >
                            <div className="absolute inset-0 bg-emerald-500/5" />
                            <div className="bg-slate-800 p-2 rounded-lg relative z-10">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-white font-bold text-sm">{item.label}</div>
                                <div className="text-[10px] text-slate-400">Automated Action</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

        </div>
    );
}
