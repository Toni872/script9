'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AgentHeroVisual() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />

            {/* Neural Nexus Container */}
            <div className="relative w-[300px] h-[300px]">

                {/* Central Core - Rotating Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-emerald-500/20 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-cyan-500/20 rounded-full border-dashed opacity-50"
                />

                {/* Core Pulse */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,1)]" />
                </motion.div>

                {/* Orbital Nodes (Satellites) */}
                <OrbitalNode angle={0} delay={0} label="INPUT" active={step === 0} />
                <OrbitalNode angle={120} delay={1} label="PROCESS" active={step === 1} />
                <OrbitalNode angle={240} delay={2} label="ACTION" active={step === 2} />

                {/* Data Streams (Lines connecting center to nodes) */}
                <DataStream angle={0} active={step === 0} />
                <DataStream angle={120} active={step === 1} />
                <DataStream angle={240} active={step === 2} />

            </div>

            {/* Code Logs Panel */}
            <div className="absolute bottom-6 left-6 right-6 h-28 bg-slate-950/80 border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-hidden shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="ml-auto text-slate-500">n8n_execution_log</span>
                </div>
                <div className="space-y-1 text-slate-400">
                    <LogLine step={step} target={0} text="> INGESTING_LEAD_DATA..." color="text-cyan-400" />
                    <LogLine step={step} target={1} text="> ANALYZING_INTENT [GEMINI_PRO]..." color="text-yellow-400" />
                    <LogLine step={step} target={2} text="> EXECUTING_WORKFLOW [CRM_SYNC]..." color="text-emerald-400" />
                    <LogLine step={step} target={3} text="> TASK_COMPLETED. WAITING..." color="text-slate-500" />
                </div>
            </div>
        </div>
    );
}

function OrbitalNode({ angle, delay, label, active }: { angle: number, delay: number, label: string, active: boolean }) {
    const radius = 120; // Distance from center
    // Convert angle to radians and calculate position
    const rad = (angle - 90) * (Math.PI / 180);
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
        <motion.div
            className={`absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center transition-all duration-500 ${active ? 'scale-110 opacity-100' : 'scale-100 opacity-40'}`}
            style={{ x, y }}
        >
            <div className={`w-3 h-3 rounded-full mb-2 transition-colors duration-300 ${active ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-slate-600'}`} />
            <div className="text-[10px] font-bold tracking-widest text-white bg-slate-900/80 px-2 py-1 rounded border border-slate-700">
                {label}
            </div>
        </motion.div>
    );
}

function DataStream({ angle, active }: { angle: number, active: boolean }) {
    return (
        <div className="absolute top-1/2 left-1/2 w-[120px] h-[1px] bg-slate-800 origin-left -z-10" style={{ transform: `rotate(${angle - 90}deg)` }}>
            {active && (
                <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 120, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-[2px] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                />
            )}
        </div>
    )
}

function LogLine({ step, target, text, color }: { step: number, target: number, text: string, color: string }) {
    if (step < target) return <div className="opacity-20">{text}</div>;
    if (step === target) return <div className={`${color} animate-pulse`}>{text}<span className="animate-blink">_</span></div>;
    return <div className="text-slate-500 opacity-50">✓ {text.replace('> ', '')}</div>;
}
