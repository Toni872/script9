'use client';

import { motion } from 'framer-motion';
import { AlertCircle, BrainCircuit, Cog, TrendingUp, CheckCircle2, ArrowDown } from 'lucide-react';

export function HeroSystemVisual() {
    const steps = [
        {
            label: "Evaluación Inicial",
            icon: AlertCircle,
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20"
        },
        {
            label: "Análisis Inteligente",
            icon: BrainCircuit,
            color: "text-blue-300",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            label: "Automatización",
            icon: Cog,
            color: "text-blue-300",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            label: "Optimización",
            icon: TrendingUp,
            color: "text-blue-300",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            label: "Valor Generado",
            icon: CheckCircle2,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            isOutcome: true
        }
    ];

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Container Card */}
            <div className="bg-[#002E5C]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">

                {/* Header Badge */}
                <div className="flex justify-center mb-6 relative z-10">
                    <span className="bg-white text-[#003D82] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        NUESTRO SISTEMA
                    </span>
                </div>

                {/* Steps Flow */}
                <div className="space-y-3 relative z-10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {i < steps.length - 1 && (
                                <div className="absolute left-6 top-10 bottom-[-16px] w-[2px] bg-white/5 z-0 flex flex-col items-center overflow-hidden">
                                    <motion.div
                                        className="w-full h-full bg-white/20"
                                        initial={{ y: '-100%' }}
                                        animate={{ y: '100%' }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.5 }}
                                    />
                                </div>
                            )}

                            <div className={`relative z-10 flex items-center gap-4 p-4 rounded-xl border ${step.border} ${step.bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${step.isOutcome ? 'shadow-[0_0_20px_rgba(34,197,94,0.1)]' : ''}`}>
                                <div className={`p-2 rounded-lg bg-black/20 ${step.color}`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <span className={`font-bold text-sm ${step.isOutcome ? 'text-white text-lg' : 'text-blue-100'}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <ArrowDown className="w-4 h-4 text-white/10" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            </div>
        </div>
    );
}
