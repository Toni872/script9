'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PenTool, Code2, Rocket, FileJson, Server, Database, Globe, Search } from "lucide-react";

const heroSteps = [
    {
        id: 1,
        label: "AUDITORÍA & DIAGNÓSTICO",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* Blueprint Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative z-10 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 p-6 rounded-xl shadow-2xl min-w-[300px]"
                >
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                        <PenTool className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-blue-200 uppercase tracking-widest font-bold">BLUEPRINT_V1.0</span>
                    </div>

                    {/* Flowchart Nodes */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="w-20 h-20 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center gap-2 bg-slate-900">
                            <Database className="w-6 h-6 text-slate-500" />
                            <span className="text-[10px] text-slate-500 font-mono">SILOS</span>
                        </div>

                        <div className="flex-1 h-[2px] bg-slate-700 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full bg-blue-500"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="w-24 h-24 border-2 border-blue-500 bg-blue-500/10 rounded-xl flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <Search className="w-8 h-8 text-blue-400" />
                            <span className="text-[10px] text-blue-300 font-bold font-mono">ANALYSIS</span>
                        </div>

                        <div className="flex-1 h-[2px] bg-slate-700 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full bg-blue-500"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "linear" }}
                            />
                        </div>

                        <div className="w-20 h-20 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center gap-2 bg-slate-900">
                            <FileJson className="w-6 h-6 text-slate-500" />
                            <span className="text-[10px] text-slate-500 font-mono">PLAN</span>
                        </div>
                    </div>

                    {/* Optimization Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-[10px] font-bold text-white rounded-full shadow-lg"
                    >
                        DETECTING INEFFICIENCIES
                    </motion.div>
                </motion.div>
            </div>
        )
    },
    {
        id: 2,
        label: "INGENIERÍA & CÓDIGO",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* Purple Aura */}
                <div className="absolute inset-0 bg-purple-500/5 blur-[60px] rounded-full transform scale-75" />

                <div className="grid grid-cols-2 gap-6 relative z-10 w-full max-w-lg">
                    {/* Code Window */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-[#0f1115] p-4 rounded-lg border border-slate-700 font-mono text-[11px] text-slate-300 shadow-2xl relative overflow-hidden"
                    >
                        {/* Highlight Line */}
                        <div className="absolute left-0 top-6 w-full h-5 bg-slate-800/50 border-l-2 border-purple-500" />

                        <div className="relative z-10">
                            <span className="text-purple-400">async function</span> <span className="text-blue-300">automateFlow</span>() {'{'}<br />
                            &nbsp;&nbsp;<span className="text-slate-500">// Connecting services...</span><br />
                            &nbsp;&nbsp;<span className="text-yellow-300">await</span> n8n.webhook(<span className="text-emerald-300">'/start'</span>);<br />
                            &nbsp;&nbsp;<span className="text-purple-400">const</span> data = ai.process();<br />
                            &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-emerald-300">true</span>;<br />
                            {'}'}
                        </div>
                    </motion.div>

                    {/* Automation Icons Stack */}
                    <div className="flex flex-col gap-3 justify-center">
                        <motion.div
                            initial={{ scale: 0, x: 20 }}
                            animate={{ scale: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg transform rotate-3"
                        >
                            <FileJson className="w-6 h-6 text-black" />
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0, x: 20 }}
                            animate={{ scale: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#ff6d5a] p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg -rotate-3 ml-4"
                        >
                            <Rocket className="w-6 h-6 text-white" />
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0, x: 20 }}
                            animate={{ scale: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-emerald-500 p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg rotate-6"
                        >
                            <Code2 className="w-6 h-6 text-white" />
                        </motion.div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        label: "AUTOMATIZACIÓN & ESCALA",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">

                {/* Server Infrastructure */}
                <div className="relative z-10 flex flex-col gap-2">
                    {[
                        { icon: Database, name: "DB_SHARD_01" },
                        { icon: Server, name: "AI_WORKER_MAIN" },
                        { icon: Globe, name: "CDN_EDGE_NET" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-48 h-10 bg-slate-900/90 border border-emerald-500/30 rounded-lg flex items-center justify-between px-4 shadow-[0_4px_20px_rgba(16,185,129,0.1)] backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-4 h-4 text-emerald-500" />
                                <span className="text-[10px] font-mono text-emerald-100/70">{item.name}</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Success Particles */}
                <div className="absolute inset-0 z-0">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-emerald-400 rounded-full w-1 h-1"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: (Math.random() - 0.5) * 300,
                                y: (Math.random() - 0.5) * 300,
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                            style={{ top: '50%', left: '50%' }}
                        />
                    ))}
                </div>

                {/* Global Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] -z-10" />
            </div>
        )
    }
];

export const HeroProcessAnimation = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % heroSteps.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[600px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden">

            {/* Main Visual Stage */}
            <div className="w-full h-[400px] flex items-center justify-center relative px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* Scale down on mobile if needed */}
                        <div className="scale-75 md:scale-100 origin-center w-full flex items-center justify-center">
                            {heroSteps[activeStep].visual}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Step Indicators (Navigation) */}
            <div className="absolute bottom-4 md:bottom-8 flex items-center gap-2 md:gap-3 z-20 bg-slate-900/50 backdrop-blur-md p-2 rounded-full border border-slate-800 max-w-[90vw] overflow-x-auto no-scrollbar">
                {heroSteps.map((step, index) => {
                    const isActive = activeStep === index;
                    return (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(index)}
                            className={`relative px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 ${isActive
                                    ? 'text-white bg-slate-800 border border-slate-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {/* Color Dot */}
                            <span
                                className={`inline-block w-1.5 h-1.5 rounded-full mr-2 mb-px ${isActive
                                        ? index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-purple-400' : 'bg-emerald-400'
                                        : 'bg-slate-600'
                                    }`}
                            />
                            {step.label}
                        </button>
                    )
                })}
            </div>

        </div>
    );
};
