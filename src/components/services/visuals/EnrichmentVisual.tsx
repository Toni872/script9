import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, MapPin, Database, Mail, CheckCircle2, Building2, Globe } from "lucide-react";

// Steps for the Enrichment workflow animation
const steps = [
    {
        id: 1,
        title: "1. Radar de Mercado",
        icon: MapPin,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        description: "Google Maps Scraping en tiempo real...",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Map Pins Grid */}
                <div className="grid grid-cols-3 gap-6 w-3/4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-slate-800 border border-slate-700 p-2 rounded-full flex items-center justify-center w-12 h-12 relative"
                        >
                            <Building2 className="w-5 h-5 text-slate-400" />
                            {i === 4 && (
                                <motion.div
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-slate-900"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
                {/* Radar Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(59,130,246,0.1)_70%)] animate-pulse pointer-events-none" />
                <motion.div
                    className="absolute inset-0 border border-blue-500/30 rounded-full scale-125 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    style={{ borderStyle: 'dashed' }}
                />
            </div>
        )
    },
    {
        id: 2,
        title: "2. Minería Profunda",
        icon: Database,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        description: "Extrayendo emails y validando...",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="flex gap-4 items-center">
                    {/* Website Card */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-40 h-32 flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                            <Globe className="w-4 h-4 text-slate-500" />
                            <div className="h-1.5 bg-slate-600 w-12 rounded-full" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-1.5 bg-slate-700 w-full rounded-full" />
                            <div className="h-1.5 bg-slate-700 w-3/4 rounded-full" />
                            <div className="h-1.5 bg-slate-700 w-1/2 rounded-full" />
                        </div>
                    </motion.div>

                    {/* Extraction Arrow */}
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <Search className="w-6 h-6 text-amber-500" />
                    </motion.div>

                    {/* Data Card */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 w-44 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </div>
                        <div className="space-y-2 font-mono text-[10px] text-slate-300">
                            <div className="flex justify-between">
                                <span>Role:</span> <span className="text-white">CEO</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email:</span> <span className="text-white">jdoe@corp.com</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "3. Draft Personalizado",
        icon: Mail,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        description: "GPT-4o escribe un email único...",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white text-slate-900 rounded-xl p-6 w-[350px] shadow-2xl relative"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-t-xl" />
                    <div className="text-xs text-slate-500 mb-4 font-mono">Draft Generator v2.0</div>

                    <div className="space-y-2 text-sm text-slate-700 font-medium leading-relaxed">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Hola <span className="bg-emerald-100 text-emerald-800 px-1 rounded">Juan</span>,
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Vi que en <span className="bg-blue-100 text-blue-800 px-1 rounded">Agencia X</span> acabáis de ganar el premio de diseño...
                        </motion.p>
                        <motion.div
                            className="h-2 w-4 bg-slate-900 animate-pulse inline-block"
                            animate={{ opacity: 0 }}
                            transition={{ delay: 2.5 }}
                        />
                    </div>

                    <motion.div
                        className="mt-6 flex justify-end"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.6 }}
                    >
                        <div className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-lg">
                            Ready to Send
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        )
    }
];

interface VisualProps {
    className?: string;
    contentClassName?: string;
}

export function EnrichmentVisual({ className = "", contentClassName = "" }: VisualProps) {
    const [activeStep, setActiveStep] = useState(0);

    // Auto-advance loop
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`w-full h-full bg-slate-950 flex flex-col md:flex-row relative group ${className}`}>
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('/images/grid.svg')] pointer-events-none" />

            {/* Left: Controls/Progress */}
            <div className="w-full md:w-1/3 bg-slate-900/50 backdrop-blur border-r border-slate-800 p-6 flex flex-col justify-center gap-4 z-10">
                <h3 className="text-xl font-bold text-white mb-4">Motor de Enriquecimiento</h3>
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
                                    layoutId="activeGlowEnrichment"
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
                        className="h-full bg-blue-500" // Default color, can be dynamic
                        key={activeStep}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%", backgroundColor: activeStep === 0 ? '#3b82f6' : activeStep === 1 ? '#f59e0b' : '#10b981' }}
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
                        className={`w-full h-full ${contentClassName}`}
                    >
                        {steps[activeStep].visual}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
