import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, User, Mail, Brain, CheckCircle2, ArrowRight, Database, Send } from "lucide-react";

// Steps for the specific "AI SDR" workflow animation
const steps = [
    {
        id: 1,
        title: "1. Búsqueda de Leads",
        icon: Search,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        description: "Escaneando LinkedIn & Bases de Datos...",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50 animate-pulse" />
                <div className="grid grid-cols-3 gap-4 w-3/4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ delay: i * 0.2, duration: 0.3 }}
                            className="bg-slate-800 border border-slate-700 p-3 rounded-lg flex flex-col items-center gap-2"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                <User className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="w-full h-2 bg-slate-700 rounded-full" />
                            <div className="w-2/3 h-2 bg-slate-700 rounded-full" />
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    className="absolute inset-0 border-2 border-blue-500/30 rounded-xl"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        )
    },
    {
        id: 2,
        title: "2. Análisis & Enriquecimiento",
        icon: Brain,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        description: "Evaluando 'Fit' y personalizando mensaje...",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="flex items-center gap-8">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-48"
                    >
                        <User className="w-12 h-12 bg-slate-700 rounded-full p-2 text-slate-300 mb-3" />
                        <div className="h-2 bg-slate-700 w-full mb-2 rounded" />
                        <div className="h-2 bg-slate-700 w-3/4 rounded" />
                    </motion.div>

                    {/* AI Brain */}
                    <div className="relative">
                        <Brain className="w-16 h-16 text-purple-500 animate-pulse" />
                        <motion.div
                            className="absolute -top-2 -right-2 bg-purple-600 text-[10px] px-2 py-0.5 rounded-full text-white font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            98% MATCH
                        </motion.div>
                    </div>

                    {/* Data Points */}
                    <div className="flex flex-col gap-2">
                        {["CEO", "Tech Startup", "Funded"].map((tag, i) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + i * 0.2 }}
                                className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded border border-purple-500/30"
                            >
                                {tag}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "3. Outreach Automático",
        icon: Send,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        description: "Enviando email hiper-personalizado...",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-[350px] shadow-2xl"
                >
                    <div className="flex items-center gap-3 border-b border-slate-700 pb-3 mb-3">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-xs text-slate-400">Hace instantes</div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-700 w-1/3 rounded animate-pulse" />
                        <div className="h-2 bg-slate-700 w-full rounded animate-pulse" />
                        <div className="h-2 bg-slate-700 w-full rounded animate-pulse" />
                        <div className="h-2 bg-slate-700 w-2/3 rounded animate-pulse" />
                    </div>
                    <motion.div
                        className="mt-4 flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" /> Enviado
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        )
    }
];

export default function AISDRVisual() {
    const [activeStep, setActiveStep] = useState(0);

    // Auto-advance loop
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-slate-950 flex flex-col md:flex-row relative group">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('/images/grid.svg')] pointer-events-none" />

            {/* Left: Controls/Progress */}
            <div className="w-full md:w-1/3 bg-slate-900/50 backdrop-blur border-r border-slate-800 p-6 flex flex-col justify-center gap-4 z-10">
                <h3 className="text-xl font-bold text-white mb-4">Pipeline de Ventas IA</h3>
                {steps.map((step, index) => {
                    const isActive = activeStep === index;
                    return (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(index)}
                            className={`text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group/item ${isActive ? `${step.bg} ${step.border} border` : 'hover:bg-slate-800 border border-transparent'}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className={`absolute left-0 top-0 h-full w-1 ${step.color.replace('text', 'bg').replace('-400', '-500')}`}
                                />
                            )}
                            <div className="flex items-center gap-3 mb-1">
                                <step.icon className={`w-5 h-5 ${isActive ? step.color : 'text-slate-500'}`} />
                                <span className={`font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.title}</span>
                            </div>
                            {isActive && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-xs text-slate-400 pl-8"
                                >
                                    {step.description}
                                </motion.p>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Right: Visualization Stage */}
            <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-8 z-10 overflow-hidden">

                {/* Progress Bar (Top) */}
                <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
                    <motion.div
                        className="h-full bg-emerald-500"
                        key={activeStep}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                    >
                        {steps[activeStep].visual}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
