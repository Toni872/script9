import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Table, Copy, CheckCircle2, Zap, ArrowRight, Database, FileSpreadsheet } from "lucide-react";

export default function AutomationComparison() {
    const [manualCount, setManualCount] = useState(0);
    const [autoCount, setAutoCount] = useState(0);

    // Simulación Manual (Lento)
    useEffect(() => {
        const interval = setInterval(() => {
            setManualCount((prev) => (prev < 100 ? prev + 1 : 0));
        }, 2000); // Muy lento
        return () => clearInterval(interval);
    }, []);

    // Simulación Script9 (Rápido)
    useEffect(() => {
        const interval = setInterval(() => {
            setAutoCount((prev) => (prev < 10000 ? prev + 125 : 0));
        }, 50); // Ultra rápido
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full h-[400px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* LADO IZQUIERDO: MANUAL */}
            <div className="flex-1 bg-slate-100 p-8 relative flex flex-col items-center justify-center border-r border-slate-300">
                <div className="absolute top-4 left-4 bg-slate-300 px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">
                    Modo Manual (Lento)
                </div>

                {/* Spreadsheet Mockup */}
                <div className="w-64 bg-white rounded-lg shadow-sm border border-slate-300 p-4 space-y-3">
                    <div className="flex items-center gap-2 border-b pb-2 mb-2">
                        <FileSpreadsheet className="w-5 h-5 text-green-700" />
                        <div className="w-20 h-2 bg-slate-200 rounded"></div>
                    </div>
                    {/* Filas */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-2">
                            <div className="w-8 h-4 bg-slate-100 rounded"></div>
                            <div className="flex-1 h-4 bg-slate-100 rounded"></div>
                            {i === 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute ml-12 text-blue-500 cursor-pointer"
                                >
                                    <Copy className="w-4 h-4" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-3xl font-mono font-bold text-slate-400">{manualCount}</p>
                    <p className="text-sm text-slate-500 font-medium">Registros Procesados</p>
                </div>
            </div>

            {/* LADO DERECHO: SCRIPT9 */}
            <div className="flex-1 bg-slate-950 p-8 relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] opacity-10"></div>
                <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/50 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-3 h-3" /> Script9 (Instantáneo)
                </div>

                {/* Data Flow Animation */}
                <div className="flex items-center gap-8 relative z-10">
                    {/* Input Node */}
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                        <Database className="w-8 h-8 text-slate-400" />
                    </div>

                    {/* Connecting Beam */}
                    <div className="w-32 h-1 bg-slate-800 relative rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 w-1/2 h-full bg-emerald-500 blur-[2px]"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Output Node */}
                    <div className="w-16 h-16 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                </div>

                <div className="mt-8 text-center relative z-10">
                    <p className="text-5xl font-mono font-bold text-emerald-400 tabular-nums">
                        {autoCount.toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600/80 font-medium mt-1">Registros Procesados</p>
                </div>

                {/* Floating Particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-500 rounded-full"
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            x: Math.random() * 200 - 100,
                            y: Math.random() * -200
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}

            </div>
        </div>
    );
}
