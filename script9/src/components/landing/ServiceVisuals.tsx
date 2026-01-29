'use client';

import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, User, Mail, Database, FileText, CreditCard, Terminal } from 'lucide-react';

// Common container for consistent styling
const VisualContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 relative overflow-hidden">
        {children}
    </div>
);

// 1. AGENTES IA (Sales Chat Simulation)
export const AgentVisual = () => (
    <VisualContainer>
        <div className="flex flex-col gap-2 w-32 relative z-10">
            {/* User Message */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
                className="bg-slate-800 p-2 rounded-lg rounded-tl-none self-start max-w-[80%]"
            >
                <div className="h-1.5 w-12 bg-slate-600 rounded-full" />
            </motion.div>

            {/* Agent Reply (Thinking -> Typing -> Sent) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg rounded-tr-none self-end max-w-[90%] flex items-center gap-2"
            >
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <div className="h-1.5 w-16 bg-emerald-500/40 rounded-full" />
            </motion.div>
        </div>

        {/* Background Pulse */}
        <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-full" />
    </VisualContainer>
);

// 2. AUTOMATIZACIONES (Flow: Mail -> DB)
export const AutomationVisual = () => (
    <VisualContainer>
        <div className="flex items-center gap-2 relative z-10">
            {/* Step 1: Trigger */}
            <div className="w-8 h-8 rounded bg-slate-800 border border-amber-500/30 flex items-center justify-center">
                <Mail className="w-4 h-4 text-amber-500" />
            </div>

            {/* Particle Flow */}
            <div className="w-12 h-[1px] bg-slate-700 relative">
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_5px_#f59e0b]"
                    initial={{ left: 0, opacity: 0 }}
                    animate={{ left: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Step 2: Action */}
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/50 flex items-center justify-center">
                <Database className="w-4 h-4 text-amber-500" />
            </div>
        </div>
    </VisualContainer>
);

// 3. INTEGRACIONES (Hub & Spoke)
export const IntegrationVisual = () => (
    <VisualContainer>
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Center Hub */}
            <div className="absolute z-20 w-10 h-10 bg-purple-500/20 border border-purple-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <div className="w-4 h-4 bg-purple-500 rounded-sm animate-spin-slow" />
            </div>

            {/* Orbiting Apps */}
            {[0, 120, 240].map((deg, i) => (
                <motion.div
                    key={i}
                    className="absolute w-full h-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ rotate: deg }}
                >
                    <motion.div
                        className="absolute top-0 w-6 h-6 bg-slate-900 border border-slate-700 rounded-md flex items-center justify-center"
                        style={{ rotate: -deg }} // Keep icon upright (counter-rotate) - simplify by just spinning shape for now
                    >
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-green-400' : 'bg-pink-400'}`} />
                    </motion.div>
                </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <circle cx="64" cy="64" r="32" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            </svg>
        </div>
    </VisualContainer>
);

// 4. SCRIPTS (Code Typing)
export const ScriptVisual = () => (
    <VisualContainer>
        <div className="w-full max-w-[140px] bg-slate-950 border border-blue-500/30 rounded-lg overflow-hidden shadow-lg">
            {/* Terminal Header */}
            <div className="h-4 bg-slate-900 border-b border-slate-800 flex items-center px-2 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            {/* Code Body */}
            <div className="p-2 font-mono text-[8px] leading-relaxed text-slate-400">
                <div className="flex gap-1">
                    <span className="text-blue-400">$</span>
                    <span>run script.py</span>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.1 }}
                >
                    <span className="text-green-500">Processing...</span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.1 }}
                >
                    <span className="text-blue-400">Done (0.4s)</span>
                </motion.div>
                <motion.div
                    className="w-1.5 h-2 bg-slate-500 mt-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            </div>
        </div>
    </VisualContainer>
);
