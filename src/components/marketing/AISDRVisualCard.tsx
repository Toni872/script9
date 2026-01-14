import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, Brain, Send } from "lucide-react";

export default function AISDRVisualCard() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 2000); // Faster loop for small card
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20 pointer-events-none" />

            {/* Ambient Glow */}
            <div className={`absolute inset-0 transition-colors duration-1000 opacity-20
        ${step === 0 ? 'bg-blue-500/20' : step === 1 ? 'bg-purple-500/20' : 'bg-emerald-500/20'}`}
            />

            {/* Central Icon Container */}
            <div className="relative z-10 w-20 h-20 flex items-center justify-center">
                {/* Step 1: Search */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: step === 0 ? 1 : 0,
                        scale: step === 0 ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                        <Search className="w-8 h-8 text-blue-400" />
                    </div>
                    {/* Radar Rings */}
                    {step === 0 && (
                        <>
                            <motion.div
                                initial={{ opacity: 0.8, scale: 1 }}
                                animate={{ opacity: 0, scale: 2 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 border border-blue-500/30 rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0.8, scale: 1 }}
                                animate={{ opacity: 0, scale: 2 }}
                                transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                                className="absolute inset-0 border border-blue-500/30 rounded-full"
                            />
                        </>
                    )}
                </motion.div>

                {/* Step 2: Brain */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: step === 1 ? 1 : 0,
                        scale: step === 1 ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Brain className="w-10 h-10 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
                    {step === 1 && (
                        <motion.div
                            className="absolute -top-4 -right-4 bg-purple-600 px-2 py-0.5 rounded text-[10px] text-white font-bold"
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            MATCH
                        </motion.div>
                    )}
                </motion.div>

                {/* Step 3: Send */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: step === 2 ? 1 : 0,
                        scale: step === 2 ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Send className="w-8 h-8 text-emerald-400 -ml-1 mt-1" />
                    </div>
                    {step === 2 && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 200, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute left-full top-1/2 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"
                        />
                    )}
                </motion.div>

            </div>

            {/* Footer Text */}
            <div className="absolute bottom-3 w-full text-center">
                <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-500
            ${step === 0 ? 'text-blue-400' : step === 1 ? 'text-purple-400' : 'text-emerald-400'}
         `}>
                    {step === 0 ? 'SCANNING' : step === 1 ? 'ANALYZING' : 'OUTREACH'}
                </span>
            </div>
        </div>
    );
}
