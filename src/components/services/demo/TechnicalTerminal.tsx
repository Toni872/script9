'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, RefreshCw, CheckCircle2, AlertCircle, Command } from 'lucide-react';

interface TerminalStep {
    cmd?: string;
    output?: string;
    type: 'command' | 'success' | 'info' | 'error' | 'warning';
    delay: number;
}

interface DemoProps {
    service: 'agent' | 'automation' | 'integration' | 'script';
}

export function TechnicalTerminal({ service }: DemoProps) {
    const [lines, setLines] = useState<TerminalStep[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // SCENARIOS
    const scenarios: Record<string, TerminalStep[]> = {
        agent: [
            { cmd: "init_agent_session --context='sales_rep'", type: 'command', delay: 500 },
            { output: "Loaded Knowledge Base: 45MB (PDF/Web)", type: 'info', delay: 1000 },
            { output: "Webhook received: Message from +34 600...", type: 'success', delay: 2000 },
            { output: "Analysing intent... [Score: 0.98 'Purchase']", type: 'info', delay: 3000 },
            { output: "Checking calendar availability...", type: 'warning', delay: 4000 },
            { output: "Function Call: book_slot('2024-02-15', '10:00')", type: 'success', delay: 5000 },
            { output: "Response sent: 'Cita confirmada Tony.'", type: 'success', delay: 6000 },
            { output: "Session closed. Logged to CRM.", type: 'info', delay: 7000 },
        ],
        automation: [
            { cmd: "n8n execute --workflow='onboarding_flow'", type: 'command', delay: 500 },
            { output: "Trigger: Stripe Payment Succeeded ($1200)", type: 'success', delay: 1000 },
            { output: "Creating Invoice in Quaderno...", type: 'info', delay: 2000 },
            { output: "Invoice #INV-2024-001 created.", type: 'success', delay: 3000 },
            { output: "Sending Welcome Email (SendGrid)...", type: 'info', delay: 4000 },
            { output: "Inviting to Private Discord...", type: 'warning', delay: 5000 },
            { output: "Workflow completed in 450ms.", type: 'success', delay: 6000 },
        ],
        integration: [
            { cmd: "sync_pipe --source='Shopify' --dest='Salesforce'", type: 'command', delay: 500 },
            { output: "Extracting last 24h orders...", type: 'info', delay: 1500 },
            { output: "Found 142 new records.", type: 'success', delay: 2500 },
            { output: "Normalizing data schema...", type: 'warning', delay: 3500 },
            { output: "Mapping: 'customer_email' -> 'Contact.Email'", type: 'info', delay: 4500 },
            { output: "Bulk upserting to Salesforce API...", type: 'info', delay: 5500 },
            { output: "Sync completed. 0 Errors.", type: 'success', delay: 6500 },
        ],
        script: [
            { cmd: "python scraper.py --target='competitor_site'", type: 'command', delay: 500 },
            { output: "Initializing headless browser...", type: 'info', delay: 1000 },
            { output: "Bypassing Cloudflare protection... [DONE]", type: 'warning', delay: 2500 },
            { output: "Scanning product catalog (Page 1/5)...", type: 'info', delay: 3500 },
            { output: "Found price change: Product A ($50 -> $45)", type: 'success', delay: 4500 },
            { output: "Alert sent to Slack channel #pricing", type: 'success', delay: 5500 },
            { output: "Execution finished. Memory usage: 45MB", type: 'info', delay: 6500 },
        ]
    };

    const clearAllTimeouts = () => {
        timeouts.current.forEach(t => clearTimeout(t));
        timeouts.current = [];
    };

    const runSimulation = () => {
        clearAllTimeouts();
        setLines([]);
        setIsPlaying(true);
        setProgress(0);

        const scenario = scenarios[service] || scenarios['agent'];
        const totalDuration = scenario[scenario.length - 1].delay + 500;

        scenario.forEach((step, index) => {
            const t = setTimeout(() => {
                setLines(prev => [...prev, step]);
                setProgress(((step.delay) / totalDuration) * 100);

                // Auto scroll to bottom
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }

                if (index === scenario.length - 1) setIsPlaying(false);
            }, step.delay);
            timeouts.current.push(t);
        });
    };

    useEffect(() => {
        runSimulation();
        return () => clearAllTimeouts();
    }, [service]);

    return (
        <div className="w-full max-w-3xl mx-auto my-12 font-mono text-sm shadow-2xl rounded-xl overflow-hidden border border-slate-800 bg-[#0c0c0c] group selection:bg-emerald-500/30">
            {/* Window Bar */}
            <div className="bg-slate-900/50 p-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-slate-500 text-xs flex items-center gap-2 opacity-50">
                    <Terminal className="w-3 h-3" />
                    demo_{service}.exe
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={runSimulation}
                        className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                        title="Replay Simulation"
                    >
                        {isPlaying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="p-6 h-[320px] lg:h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent relative"
            >
                <div className="space-y-3 font-mono">
                    <AnimatePresence mode='popLayout'>
                        {lines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-3 items-start"
                            >
                                {line.type === 'command' && (
                                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{'>'}</span>
                                )}
                                {line.type !== 'command' && (
                                    <span className="w-3 shrink-0" />
                                )}

                                <span className={`
                                    break-words leading-relaxed
                                    ${line.type === 'command' ? 'text-white font-bold' : ''}
                                    ${line.type === 'success' ? 'text-emerald-400' : ''}
                                    ${line.type === 'error' ? 'text-red-400' : ''}
                                    ${line.type === 'warning' ? 'text-amber-400' : ''}
                                    ${line.type === 'info' ? 'text-slate-400' : ''}
                                `}>
                                    {line.cmd || line.output}
                                </span>

                                {line.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                                {line.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isPlaying && (
                        <div className="flex gap-3 items-center mt-2">
                            <span className="text-emerald-500 font-bold shrink-0">{'>'}</span>
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2.5 h-5 bg-emerald-500"
                            />
                        </div>
                    )}
                </div>

                {/* Progress Bar overlay */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800/50">
                    <motion.div
                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
