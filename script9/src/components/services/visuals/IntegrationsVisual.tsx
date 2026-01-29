'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, Database, CreditCard, Mail, MessageSquare, ShoppingCart } from "lucide-react";

interface VisualProps {
    className?: string;
    contentClassName?: string;
}

export function IntegrationsVisual({ className = "", contentClassName = "max-w-[300px] scale-75" }: VisualProps) {
    // Nodes representing connected apps
    const nodes = [
        { id: 1, icon: Globe, x: 50, y: 50, color: "text-purple-400", label: "WEB" },
        { id: 2, icon: Database, x: 20, y: 30, color: "text-blue-400", label: "CRM" },
        { id: 3, icon: CreditCard, x: 80, y: 30, color: "text-emerald-400", label: "STRIPE" },
        { id: 4, icon: Mail, x: 20, y: 70, color: "text-amber-400", label: "EMAIL" },
        { id: 5, icon: MessageSquare, x: 80, y: 70, color: "text-indigo-400", label: "SLACK" },
        { id: 6, icon: ShoppingCart, x: 50, y: 85, color: "text-pink-400", label: "STORE" },
    ];

    return (
        <div className={`relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden rounded-xl border border-slate-800 ${className}`}>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 blur-[50px] rounded-full" />

            <div className={`relative w-full aspect-square transform origin-center ${contentClassName}`}>
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Define gradients */}
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
                            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.5)" />
                            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                        </linearGradient>
                    </defs>

                    {/* Draw lines from Center (Web) to others */}
                    {nodes.slice(1).map((node, i) => (
                        <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={`${node.x}%`}
                            y2={`${node.y}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                        />
                    ))}

                    {/* Traveling Data Packets */}
                    {nodes.slice(1).map((node, i) => ( // Use index to stagger packets
                        <motion.circle
                            key={`packet-${i}`}
                            r="2"
                            fill="#d8b4fe"
                        >
                            <animateMotion
                                dur={`${2 + i * 0.5}s`}
                                repeatCount="indefinite"
                                path={`M${150 + (node.x - 50) * 3} ${150 + (node.y - 50) * 3} L150 150`} // Approximate path logic, simplify for now or use Framer Motion 'animate' with variants
                            />
                            {/* Note: Standard SVG animateMotion is hard to align with Framer. 
                                 Let's use a simpler Framer approach for packets if SVG is tricky.
                                 Replacing with Framer Motion Elements below.
                             */}
                        </motion.circle>
                    ))}
                </svg>

                {/* Framer Motion Data Packets (Simulated) */}
                {nodes.slice(1).map((node, i) => (
                    <motion.div
                        key={`packet-${i}`}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                        initial={{ left: '50%', top: '50%', opacity: 0 }}
                        animate={{
                            left: [`50%`, `${node.x}%`, `50%`],
                            top: [`50%`, `${node.y}%`, `50%`],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5
                        }}
                    />
                ))}

                {/* Render Nodes */}
                {nodes.map((node, i) => (
                    <motion.div
                        key={node.id}
                        className={`absolute flex flex-col items-center justify-center`}
                        style={{ left: `${node.x}%`, top: `${node.y}%`, x: '-50%', y: '-50%' }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                            className={`
                                relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 
                                flex items-center justify-center shadow-lg hover:border-purple-500/50 
                                transition-colors group z-10
                                ${node.id === 1 ? 'w-14 h-14 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : ''}
                            `}
                        >
                            <node.icon className={`w-5 h-5 ${node.color} ${node.id === 1 ? 'w-7 h-7' : ''}`} />

                            {/* Pulse Effect for Center Node */}
                            {node.id === 1 && (
                                <div className="absolute inset-0 rounded-xl border border-purple-500 animate-ping opacity-20" />
                            )}
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className="mt-2 text-[8px] font-mono text-slate-500 tracking-wider bg-slate-900/80 px-1 rounded"
                        >
                            {node.label}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
