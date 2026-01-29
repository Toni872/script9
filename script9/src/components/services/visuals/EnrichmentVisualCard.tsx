import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Database, Mail } from "lucide-react";

export default function EnrichmentVisualCard() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20 pointer-events-none" />

            {/* Ambient Glow */}
            <div className={`absolute inset-0 transition-colors duration-1000 opacity-20
        ${step === 0 ? 'bg-blue-500/20' : step === 1 ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}
            />

            {/* Central Icon Container */}
            <div className="relative z-10 w-20 h-20 flex items-center justify-center">

                {/* Step 1: Maps Scan */}
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
                        <MapPin className="w-8 h-8 text-blue-400" />
                    </div>
                    {/* Radar Pulse */}
                    {step === 0 && (
                        <motion.div
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 border border-blue-500/30 rounded-full"
                        />
                    )}
                </motion.div>

                {/* Step 2: Data Extraction */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: step === 1 ? 1 : 0,
                        scale: step === 1 ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Database className="w-10 h-10 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                    {step === 1 && (
                        <motion.div
                            className="absolute -top-4 -right-4 bg-amber-600 px-2 py-0.5 rounded text-[10px] text-white font-bold"
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            FOUND
                        </motion.div>
                    )}
                </motion.div>

                {/* Step 3: Email Ready */}
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
                        <Mail className="w-8 h-8 text-emerald-400 -ml-1 mt-1" />
                    </div>
                </motion.div>

            </div>

            {/* Footer Text */}
            <div className="absolute bottom-3 w-full text-center">
                <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-500
            ${step === 0 ? 'text-blue-400' : step === 1 ? 'text-amber-400' : 'text-emerald-400'}
         `}>
                    {step === 0 ? 'MAPPING' : step === 1 ? 'SCRAPING' : 'READY'}
                </span>
            </div>
        </div>
    );
}
