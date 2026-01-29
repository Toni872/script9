'use client';

import { motion } from 'framer-motion';
import { Database, Globe, CreditCard, MessageSquare, StickyNote, Workflow } from 'lucide-react';

export function WorkflowHeroVisual() {
    const satellites = [
        { icon: CreditCard, label: "Stripe", color: "text-blue-400", border: "border-blue-500", deg: 0 },
        { icon: MessageSquare, label: "Slack", color: "text-green-400", border: "border-green-500", deg: 72 },
        { icon: StickyNote, label: "Notion", color: "text-white", border: "border-slate-400", deg: 144 },
        { icon: Database, label: "Supabase", color: "text-emerald-400", border: "border-emerald-500", deg: 216 },
        { icon: Globe, label: "Web", color: "text-purple-400", border: "border-purple-500", deg: 288 },
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full" />

            {/* --- CENTRAL HUB --- */}
            <div className="relative w-24 h-24 bg-slate-900 rounded-2xl border border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.4)] flex items-center justify-center z-20">
                <Workflow className="w-12 h-12 text-indigo-400" />

                {/* Ping Effect */}
                <div className="absolute inset-0 border border-indigo-500 rounded-2xl animate-ping opacity-20" />
            </div>

            {/* --- ORBIT SYSTEM --- */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-slate-700/50 flex items-center justify-center animate-spin-slow scale-[0.6] md:scale-100 origin-center" style={{ animationDuration: '60s' }}>

                {satellites.map((sat, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full"
                        style={{ rotate: sat.deg }}
                    >
                        <motion.div
                            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 border ${sat.border} shadow-lg rounded-xl flex flex-col items-center justify-center gap-1 z-10`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            style={{ rotate: -sat.deg }} // Counter-rotate to keep upright if parent spins
                        >
                            <sat.icon className={`w-6 h-6 ${sat.color}`} />
                            <span className="text-[10px] text-slate-300 font-bold">{sat.label}</span>
                        </motion.div>

                        {/* Connection Beam */}
                        <motion.div
                            className="absolute top-0 left-1/2 w-[1px] h-[50%] bg-indigo-500/20 origin-bottom"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: i * 0.2 + 0.5 }}
                        />

                        {/* Data Packet */}
                        <motion.div
                            className={`absolute top-[25%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${sat.color.replace('text', 'bg')}`}
                            animate={{ top: ["50%", "0%", "50%"], opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeInOut" }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Connection Waves */}
            <div className="absolute w-[250px] h-[250px] border border-indigo-500/10 rounded-full animate-pulse" />


        </div>
    );
}
