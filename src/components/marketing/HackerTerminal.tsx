import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Terminal, Circle, Play, X } from "lucide-react";

const scriptCode = [
    "import script9 as s9",
    "import sys",
    "",
    "# Iniciando Protocolo de Extracción",
    "target = 'competencia.com'",
    "print(f'Target: {target}')",
    "",
    "s9.bypass_captcha()",
    "data = s9.scrape_leads(limit=10000)",
    "s9.enrich_data(data, source='linkedin')",
    "s9.export_csv('leads_cualificados.csv')",
    "sys.exit(0)"
];

const logs = [
    "Initializing headless browser...",
    "Bypassing Cloudflare protection... [SUCCESS]",
    "Injecting stealth headers... [DONE]",
    "Scanning target: competencia.com",
    "[INFO] Found 142 employee profiles",
    "[INFO] Extracting email patterns...",
    "[SUCCESS] Extracted: cfo@competencia.com",
    "[SUCCESS] Extracted: ceo@competencia.com",
    "[SUCCESS] Extracted: sales@competencia.com",
    "Enriching data with LinkedIn API...",
    "Verifying SMTP availability...",
    "Exporting 10,420 records to database...",
    "Process finished with exit code 0"
];

export default function HackerTerminal() {
    const [typedLines, setTypedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [showLogs, setShowLogs] = useState(false);
    const [logIndex, setLogIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Typing Effect for Script Code
    useEffect(() => {
        if (currentLine < scriptCode.length) {
            const timeout = setTimeout(() => {
                setTypedLines(prev => [...prev, scriptCode[currentLine]]);
                setCurrentLine(prev => prev + 1);
            }, Math.random() * 300 + 100); // Random typing speed
            return () => clearTimeout(timeout);
        } else {
            setTimeout(() => setShowLogs(true), 500);
        }
    }, [currentLine]);

    // Log Scrolling Effect
    useEffect(() => {
        if (showLogs && logIndex < logs.length) {
            const timeout = setTimeout(() => {
                setLogIndex(prev => prev + 1);
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 150); // Fast scroll
            return () => clearTimeout(timeout);
        }
    }, [showLogs, logIndex]);

    return (
        <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] border border-slate-700 font-mono text-sm relative group">
            {/* Window Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                    <Circle className="w-3 h-3 fill-red-500 text-red-500" />
                    <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                </div>
                <div className="ml-4 text-xs text-slate-400 flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    root@script9-vps:~/scripts/lead-scraper.py
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[400px] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Play className="w-24 h-24 text-emerald-500" />
                </div>

                {/* Code Section */}
                <div className="mb-4 text-slate-300">
                    {typedLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4"
                        >
                            <span className="text-slate-600 select-none text-right w-6">{i + 1}</span>
                            <span className={line.startsWith("#") ? "text-slate-500 italic" : line.startsWith("import") ? "text-purple-400" : line.includes("print") ? "text-yellow-300" : "text-emerald-300"}>
                                {line}
                            </span>
                        </motion.div>
                    ))}
                    {!showLogs && (
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="ml-10 inline-block w-2 H-4 bg-emerald-500"
                        >_</motion.span>
                    )}
                </div>

                {/* Execution Output (Overlay) */}
                {showLogs && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-0 w-full bg-[#0d1117]/95 backdrop-blur border-t border-slate-700 p-4 h-1/2 overflow-y-auto"
                        ref={scrollRef}
                    >
                        <div className="text-emerald-500 mb-2 font-bold flex items-center gap-2">
                            <Play className="w-3 h-3" /> EXECUTING SCRIPT...
                        </div>
                        {logs.slice(0, logIndex).map((log, i) => (
                            <div key={i} className="text-xs text-slate-400 font-mono mb-1">
                                <span className="text-slate-600 select-none mr-2">[{new Date().toLocaleTimeString()}]</span>
                                {log.includes("[SUCCESS]") ? <span className="text-emerald-400">{log}</span> : log}
                            </div>
                        ))}
                        {logIndex === logs.length && (
                            <div className="text-emerald-400 font-bold mt-2 animate-pulse">
                                _ CURSOR: WAITING FOR INPUT
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
