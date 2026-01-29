import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, PenTool, Code2, Rocket, FileJson, Server, Database, Globe } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "1. Auditoría & Blueprint",
        icon: Search,
        color: "text-blue-400",
        description: "Mapeamos tus procesos y diseñamos la arquitectura técnica ideal.",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* Blueprint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 bg-slate-900 border border-blue-500/30 p-4 rounded-lg shadow-2xl"
                >
                    <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                        <PenTool className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-blue-200 uppercase tracking-widest">ARCHITECTURE_V1</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-20 h-20 border-2 border-dashed border-slate-600 rounded flex items-center justify-center text-slate-600 text-[10px]">CRM</div>
                        <div className="flex items-center text-slate-600">→</div>
                        <div className="w-20 h-20 border-2 border-blue-500/50 bg-blue-500/10 rounded flex items-center justify-center text-blue-400 text-[10px] font-bold">SCRIPT9</div>
                        <div className="flex items-center text-slate-600">→</div>
                        <div className="w-20 h-20 border-2 border-dashed border-slate-600 rounded flex items-center justify-center text-slate-600 text-[10px]">ERP</div>
                    </div>
                    {/* Measurement lines */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute -bottom-4 left-0 h-4 border-l border-r border-blue-500/30 flex items-center justify-center"
                    >
                        <div className="h-[1px] w-full bg-blue-500/30" />
                        <span className="absolute top-4 text-[9px] text-blue-400">OPTIMIZED FLOW</span>
                    </motion.div>
                </motion.div>
            </div>
        )
    },
    {
        id: 2,
        title: "2. Ingeniería & Código",
        icon: Code2,
        color: "text-purple-400",
        description: "Nuestros ingenieros desarrollan los scripts y workflows en entorno seguro.",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center p-8 bg-slate-950/50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full" />

                <div className="grid grid-cols-2 gap-4 relative z-10">
                    {/* Code Block */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-[#1e1e1e] p-3 rounded-md border border-slate-700 font-mono text-[10px] text-slate-300 w-48 shadow-lg"
                    >
                        <div className="text-purple-400">import</div> script9_core <div className="text-purple-400">as</div> s9<br />
                        <br />
                        <div className="text-yellow-300">def</div> <span className="text-blue-300">optimize_process</span>():<br />
                        &nbsp;&nbsp;data = s9.fetch(source)<br />
                        &nbsp;&nbsp;s9.transform(data)<br />
                        &nbsp;&nbsp;<div className="text-purple-400">return</div> True
                    </motion.div>

                    {/* N8N Nodes */}
                    <div className="flex flex-col gap-2 justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-2 rounded w-10 h-10 flex items-center justify-center shadow"
                        >
                            <FileJson className="w-5 h-5 text-black" />
                        </motion.div>
                        <div className="w-0.5 h-4 bg-slate-600 mx-auto" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#ff6d5a] p-2 rounded w-10 h-10 flex items-center justify-center shadow"
                        >
                            <Rocket className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "3. Despliegue & Escala",
        icon: Server,
        color: "text-emerald-400",
        description: "Lanzamos la solución en producción. Sin errores. Alta disponibilidad.",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Server Stack */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="w-32 h-8 bg-slate-800 border border-emerald-500/30 rounded flex items-center justify-between px-3 mb-1"
                    >
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        </div>
                        <Database className="w-3 h-3 text-emerald-500" />
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-32 h-8 bg-slate-800 border border-emerald-500/30 rounded flex items-center justify-between px-3 mb-1"
                    >
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <Server className="w-3 h-3 text-emerald-500" />
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-32 h-8 bg-slate-800 border border-emerald-500/30 rounded flex items-center justify-between px-3"
                    >
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        </div>
                        <Globe className="w-3 h-3 text-emerald-500" />
                    </motion.div>
                </div>

                {/* Success Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-emerald-500 rounded-full w-1 h-1"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            opacity: 0
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
                    />
                ))}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[50px] -z-10" />
            </div>
        )
    }
];

export default function ProcessVisual() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-[500px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row relative group">
            {/* Left: Interactive List */}
            <div className="w-full md:w-5/12 bg-slate-900/50 backdrop-blur border-r border-slate-800 p-8 flex flex-col justify-center gap-2 z-10">
                <h3 className="text-xl font-bold text-white mb-6">Metodología Script9</h3>
                {steps.map((step, index) => {
                    const isActive = activeStep === index;
                    return (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(index)}
                            className={`text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group/item ${isActive ? 'bg-slate-800 border border-slate-700' : 'hover:bg-slate-800/50 border border-transparent'}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="processGlow"
                                    className={`absolute left-0 top-0 h-full w-1 ${step.color.replace('text', 'bg').replace('-400', '-500')}`}
                                />
                            )}
                            <div className="flex items-center gap-3 mb-2">
                                <step.icon className={`w-5 h-5 ${isActive ? step.color : 'text-slate-500'}`} />
                                <span className={`font-semibold text-lg ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.title}</span>
                            </div>
                            <AnimatePresence>
                                {isActive && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-sm text-slate-400 pl-8 leading-relaxed"
                                    >
                                        {step.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </button>
                    );
                })}
            </div>

            {/* Right: Visualization Stage */}
            <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-8 z-10 overflow-hidden">
                {/* Progress Bar Top */}
                <div className="absolute top-0 left-0 h-0.5 bg-slate-800 w-full">
                    <motion.div
                        className="h-full bg-emerald-500"
                        key={activeStep}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        {steps[activeStep].visual}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
