'use client';

import { motion } from 'framer-motion';
import {
    BrainCircuit,
    Database,
    CreditCard,
    Mail,
    MessageSquare,
    Terminal,
    Zap,
    CheckCircle2
} from 'lucide-react';
import { useEffect, useState } from 'react';

const OrbitingNode = ({ angle, distance, delay, icon: Icon, color }: any) => {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: 360
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.5, delay },
                rotate: { duration: 60, repeat: Infinity, ease: "linear" }
            }}
            style={{
                width: distance * 2,
                height: distance * 2,
                marginLeft: -distance,
                marginTop: -distance
            }}
        >
            <motion.div
                className={`absolute top-0 left-1/2 -ml-6 -mt-6 w-12 h-12 rounded-2xl ${color} bg-opacity-20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}
                style={{ rotate: -angle }} // Keep icon upright if needed, or let it orbit
            >
                <div className={`p-2 rounded-xl bg-[#001e40] text-white`}>
                    <Icon size={20} />
                </div>
            </motion.div>
        </motion.div>
    );
};

const ConnectionLine = ({ angle, distance, delay }: any) => {
    return (
        <div className="absolute left-1/2 top-1/2 w-0 h-0">
            <svg
                className="absolute overflow-visible"
                style={{
                    left: 0,
                    top: 0
                }}
            >
                <motion.line
                    x1={0}
                    y1={0}
                    x2={distance * Math.cos((angle - 90) * (Math.PI / 180))}
                    y2={distance * Math.sin((angle - 90) * (Math.PI / 180))}
                    stroke="url(#gradient-line)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1, delay }}
                />

                {/* Data Packet */}
                <motion.circle
                    r="3"
                    fill="#10B981"
                    initial={{ offsetDistance: "0%" }}
                    animate={{
                        cx: [
                            distance * Math.cos((angle - 90) * (Math.PI / 180)),
                            0
                        ],
                        cy: [
                            distance * Math.sin((angle - 90) * (Math.PI / 180)),
                            0
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                        ease: "easeInOut",
                        delay: delay + 1
                    }}
                />
            </svg>
            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                </linearGradient>
            </defs>
        </div>
    );
};

export function HeroHubVisual() {
    const [activePulse, setActivePulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePulse(true);
            setTimeout(() => setActivePulse(false), 1000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { icon: Database, color: "bg-blue-500", angle: 0, distance: 160, delay: 0.2 },
        { icon: CreditCard, color: "bg-purple-500", angle: 60, distance: 160, delay: 0.4 },
        { icon: Mail, color: "bg-red-500", angle: 120, distance: 160, delay: 0.6 },
        { icon: MessageSquare, color: "bg-yellow-500", angle: 180, distance: 160, delay: 0.8 },
        { icon: Terminal, color: "bg-green-500", angle: 240, distance: 160, delay: 1.0 },
        { icon: BrainCircuit, color: "bg-indigo-500", angle: 300, distance: 160, delay: 1.2 },
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Central Hub */}
            <div className="relative z-20">
                <motion.div
                    className="w-24 h-24 rounded-full bg-[#003D82] border-4 border-[#10B981]/30 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] relative"
                    animate={{
                        scale: activePulse ? 1.1 : 1,
                        borderColor: activePulse ? "rgba(16,185,129,0.8)" : "rgba(16,185,129,0.3)"
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Core Icon */}
                    <Zap className="w-10 h-10 text-white fill-current" />

                    {/* Ripple Effect */}
                    {activePulse && (
                        <motion.div
                            className="absolute inset-0 rounded-full border border-[#10B981]"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1 }}
                        />
                    )}
                </motion.div>

                {/* Floating status card */}
                <motion.div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2 whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: activePulse ? 1 : 0,
                        y: activePulse ? -10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span className="text-white text-xs font-mono">Tarea Completada</span>
                </motion.div>
            </div>

            {/* Nodes and Connections */}
            {nodes.map((node, i) => (
                <div key={i}>
                    {/* The Line connection (fixed angle for visual simplicity in this version, or dynamic) */}
                    {/* To keep it simple and 'Make-style', let's just position them absolutely using trig */}
                    <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            transform: `translate(-50%, -50%)`,
                        }}
                    >
                        <motion.div
                            className={`absolute flex items-center justify-center w-12 h-12 rounded-xl ${node.color} bg-opacity-20 backdrop-blur-md border border-white/10 text-white shadow-lg z-10`}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: 1,
                                x: node.distance * Math.cos((node.angle - 90) * (Math.PI / 180)),
                                y: node.distance * Math.sin((node.angle - 90) * (Math.PI / 180))
                            }}
                            transition={{
                                scale: { duration: 0.5, delay: node.delay },
                                x: { duration: 0.8, ease: "backOut", delay: node.delay },
                                y: { duration: 0.8, ease: "backOut", delay: node.delay }
                            }}
                        >
                            <node.icon size={20} />
                        </motion.div>

                        {/* Connection Line & Particle */}
                        <svg className="absolute top-0 left-0 overflow-visible" style={{ width: 0, height: 0 }}>
                            <motion.line
                                x1={0}
                                y1={0}
                                x2={node.distance * Math.cos((node.angle - 90) * (Math.PI / 180))}
                                y2={node.distance * Math.sin((node.angle - 90) * (Math.PI / 180))}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: node.delay }}
                            />
                            <motion.circle
                                r="3"
                                fill={activePulse ? "#10B981" : "#3B82F6"}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    cx: [
                                        node.distance * Math.cos((node.angle - 90) * (Math.PI / 180)),
                                        0
                                    ],
                                    cy: [
                                        node.distance * Math.sin((node.angle - 90) * (Math.PI / 180)),
                                        0
                                    ]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: node.delay + Math.random(),
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                            />
                        </svg>
                    </div>
                </div>
            ))}

            {/* Background decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full border border-white/5 animate-spin-slow" />
                <div className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-white/5 animate-spin-reverse-slower" />
            </div>
        </div>
    );
}
