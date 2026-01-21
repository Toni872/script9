'use client';

import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface VisualProps {
    className?: string;
    contentClassName?: string;
}

export function ScriptVisual({ className = "", contentClassName = "max-w-[280px] scale-90" }: VisualProps) {
    const [typedLines, setTypedLines] = useState<string[]>([]);
    const lines = [
        "> init_script9_module.py",
        "> loading dependencies...",
        "> connect_api(stripe, slack)",
        "> optimizing_db_query...",
        "> status: 200 OK",
        "> automated_task_complete()"
    ];

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < lines.length) {
                setTypedLines(prev => [...prev, lines[currentIndex]]);
                currentIndex++;
            } else {
                // Reset loop
                setTimeout(() => {
                    setTypedLines([]);
                    currentIndex = 0;
                }, 2000);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden rounded-xl border border-slate-800 ${className}`}>
            {/* Background Matrix Rain Effect (Simplified) */}
            <div className="absolute inset-0 opacity-10 font-mono text-[10px] text-emerald-500 overflow-hidden select-none pointer-events-none">
                {Array.from({ length: 20 }).map((_, col) => (
                    <motion.div
                        key={col}
                        className="absolute top-0 text-center"
                        style={{ left: `${col * 5}%` }}
                        animate={{ y: [0, 300] }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    >
                        {Array.from({ length: 15 }).map((_, row) => (
                            <div key={row}>{Math.random() > 0.5 ? '1' : '0'}</div>
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Main Terminal Window */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`relative z-10 w-full bg-[#0c121e] border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono text-[11px] transform origin-center ${contentClassName}`}
            >
                {/* Terminal Header */}
                <div className="bg-slate-800/50 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                    <Terminal className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400 text-[10px]">terminal@script9:~/bot</span>
                    <div className="flex gap-1.5 ml-auto">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 h-40 overflow-hidden flex flex-col justify-end">
                    {typedLines.map((line, i) => line ? (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${line.includes('error') ? 'text-red-400' : line.includes('OK') || line.includes('complete') ? 'text-emerald-400' : 'text-slate-300'}`}
                        >
                            {line}
                        </motion.div>
                    ) : null)}
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-4 bg-emerald-500/50 inline-block mt-1"
                    />
                </div>
            </motion.div>

            {/* Glowing Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[40px] rounded-full pointer-events-none" />
        </div>
    );
}
