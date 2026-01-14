'use client';

import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

export function ScriptHeroVisual() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />

            {/* --- IDE WINDOW --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[500px] mx-4 h-[320px] bg-[#1e1e1e] rounded-xl border border-slate-700 shadow-2xl relative overflow-hidden flex flex-col font-mono text-sm"
            >
                {/* Header */}
                <div className="h-10 bg-[#252526] border-b border-[#333] flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-slate-400 text-xs">script9_engine.py</div>
                    <div className="w-4" /> {/* Spacer */}
                </div>

                {/* Code Area */}
                <div className="p-6 text-slate-300 leading-relaxed overflow-hidden relative">
                    {/* Line Numbers */}
                    <div className="absolute left-4 top-6 flex flex-col gap-1 text-slate-600 select-none text-right">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <span key={n}>{n}</span>)}
                    </div>

                    {/* Code Content */}
                    <div className="ml-8 flex flex-col gap-1">
                        <div>
                            <span className="text-purple-400">import</span> <span className="text-blue-300">multiprocessing</span>
                        </div>
                        <div>
                            <span className="text-purple-400">from</span> script9 <span className="text-purple-400">import</span> <span className="text-yellow-300">Agent</span>
                        </div>
                        <br />
                        <div>
                            <span className="text-green-600"># Initializing Neural Core</span>
                        </div>
                        <div>
                            <span className="text-blue-400">def</span> <span className="text-yellow-300">execute_task</span>(data):
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-blue-300">agent</span> = <span className="text-yellow-300">Agent</span>(mode=<span className="text-orange-300">"turbo"</span>)
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-blue-300">result</span> = <span className="text-blue-300">agent</span>.process(data)
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-300">result</span>
                        </div>
                    </div>

                    {/* Cursor Animation */}
                    <motion.div
                        className="absolute w-2 h-4 bg-blue-400 top-[170px] left-[120px]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                </div>

                {/* Status Bar */}
                <div className="mt-auto h-8 bg-[#007acc] text-white flex items-center px-4 text-xs justify-between">
                    <div className="flex gap-4">
                        <span>Python 3.11</span>
                        <span>master*</span>
                    </div>
                    <div>Ln 8, Col 24</div>
                </div>

            </motion.div>

            {/* --- EXECUTION SUCCESS POPUP --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
                className="absolute bottom-10 right-[-20px] bg-slate-800 border-l-4 border-green-500 p-4 rounded shadow-2xl flex gap-3 max-w-[250px]"
            >
                <div className="mt-1">
                    <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                    <div className="font-bold text-white text-sm">Build Successful</div>
                    <div className="text-xs text-slate-400 mt-1">
                        Script executed in 0.04s. No errors found. System ready.
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
