"use client";

import { motion } from "framer-motion";
import {
    Webhook,
    FileJson,
    Brain,
    Split,
    Slack,
    TableProperties,
    Zap,
    Save,
    MousePointer2,
    Mail,
    Code,
    Check,
    Globe
} from "lucide-react";
import { useEffect, useState } from "react";

// ==========================================
// EXACT LAYOUT FROM REFERENCE IMAGE
// ==========================================
// Canvas: 1200 x 500 viewBox
const CANVAS_W = 1200;
const CANVAS_H = 500;

// Node size (compact square-ish like n8n)
const NODE_W = 130;
const NODE_H = 55;

// Y Positions (3 rows)
const Y_ROW_1 = 80;    // Top row (Manual, Mock, Email, Slack)
const Y_ROW_2 = 220;   // Middle row (Webhook, Normalize, Gemini, Parse, Switch)
const Y_ROW_3 = 360;   // Bottom row (Sheets)

// X Positions (columns from left to right)
const X_COL_1 = 30;    // Triggers
const X_COL_2 = 180;   // Mock
const X_COL_3 = 370;   // Normalize
const X_COL_4 = 520;   // Gemini
const X_COL_5 = 670;   // Parse
const X_COL_6 = 820;   // Switch
const X_COL_7 = 970;   // Send email / Sheets
const X_COL_8 = 1070;  // Slack

// ==========================================
// NODES - Exact match to reference image
// ==========================================
const nodes = [
    // Row 1 - Top (Input Branch 1)
    { id: "manual", x: X_COL_1, y: Y_ROW_1, label: "When clicking", sub: "'Execute Workflow'", icon: MousePointer2, color: "text-white", bg: "bg-slate-700" },
    { id: "mock", x: X_COL_2, y: Y_ROW_1, label: "Mock Lead Data", sub: "(Test)", icon: Code, color: "text-orange-400", bg: "bg-orange-500/20" },

    // Row 2 - Middle (Main processing chain)
    { id: "webhook", x: X_COL_1, y: Y_ROW_2, label: "Webhook", sub: "Receive Lead Form", icon: Webhook, color: "text-white", bg: "bg-slate-700" },
    { id: "normalize", x: X_COL_3, y: Y_ROW_2, label: "Normalize Lead", sub: "Data", icon: FileJson, color: "text-blue-400", bg: "bg-blue-500/20" },
    { id: "gemini", x: X_COL_4, y: Y_ROW_2, label: "Gemini 2.5 Flash", sub: "(HTTP)", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/20" },
    { id: "parse", x: X_COL_5, y: Y_ROW_2, label: "Parse JSON", sub: "Response", icon: Code, color: "text-orange-400", bg: "bg-orange-500/20" },
    { id: "switch", x: X_COL_6, y: Y_ROW_2, label: "Is Hot Lead?", sub: "", icon: Split, color: "text-green-400", bg: "bg-green-500/20" },

    // Row 1 continuation - Top right (Output Branch 1)
    { id: "email", x: X_COL_7, y: Y_ROW_1, label: "Send email", sub: "Send", icon: Mail, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { id: "slack", x: X_COL_8, y: Y_ROW_1, label: "Slack Alert", sub: "post: message", icon: Slack, color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/20" },

    // Row 3 - Bottom right (Output Branch 2)
    { id: "sheets", x: X_COL_7, y: Y_ROW_3, label: "Save to Google", sub: "Sheets", icon: TableProperties, color: "text-green-400", bg: "bg-green-500/20" },
];

// ==========================================
// EDGES - Curved connections exactly as shown
// ==========================================
const edges = [
    // Input branch 1: Manual -> Mock -> Normalize (curve down)
    { from: "manual", to: "mock" },
    { from: "mock", to: "normalize" },

    // Input branch 2: Webhook -> Normalize (curve up slightly)
    { from: "webhook", to: "normalize" },

    // Main processing chain (straight horizontal)
    { from: "normalize", to: "gemini" },
    { from: "gemini", to: "parse" },
    { from: "parse", to: "switch" },

    // Output branch 1: Switch -> Email -> Slack (curve up)
    { from: "switch", to: "email" },
    { from: "email", to: "slack" },

    // Output branch 2: Switch -> Sheets (curve down)
    { from: "switch", to: "sheets" },
];

// ==========================================
// EXECUTION SEQUENCE
// ==========================================
const steps = [
    ["manual", "webhook"],
    "mock",
    "normalize",
    "gemini",
    "parse",
    "switch",
    ["email", "sheets"],
    "slack",
];

// ==========================================
// COMPONENT
// ==========================================
export function N8nWorkflowVisual() {
    const [activeNodes, setActiveNodes] = useState<string[]>([]);

    useEffect(() => {
        let step = 0;
        const interval = setInterval(() => {
            if (step >= steps.length + 3) {
                setActiveNodes([]);
                step = 0;
            } else if (step < steps.length) {
                const current = steps[step];
                setActiveNodes(prev => Array.isArray(current) ? [...prev, ...current] : [...prev, current]);
            }
            step++;
        }, 900);
        return () => clearInterval(interval);
    }, []);

    // Get coordinates for path drawing
    const getPos = (id: string, side: 'left' | 'right') => {
        const n = nodes.find(node => node.id === id);
        if (!n) return { x: 0, y: 0 };
        return {
            x: side === 'left' ? n.x : n.x + NODE_W,
            y: n.y + NODE_H / 2
        };
    };

    return (
        <div className="w-full h-full bg-[#0d0d0d] relative overflow-hidden font-sans select-none flex flex-col">
            {/* Toolbar */}
            <div className="h-9 border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-between px-4 z-20 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-[#FF6D5A] flex items-center justify-center text-white">
                        <Zap className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-xs font-medium text-slate-300">Lead Scoring Gemini 2.5 (FINAL AUTO-TEST)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-[#FF6D5A] text-white text-[10px] px-2.5 py-1 rounded font-bold">
                        Save
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 relative bg-[#0d0d0d]">
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.08]"
                    style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                />

                {/* Workflow Container */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div
                        className="relative w-full h-full"
                        style={{ maxWidth: `${CANVAS_W}px`, maxHeight: `${CANVAS_H}px` }}
                    >
                        {/* SVG Connections */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {edges.map((edge, i) => {
                                const start = getPos(edge.from, 'right');
                                const end = getPos(edge.to, 'left');

                                const dx = end.x - start.x;
                                const dy = end.y - start.y;

                                // Bezier curve control points
                                const cpOffset = Math.min(Math.abs(dx) * 0.5, 80);
                                const path = `M ${start.x} ${start.y} C ${start.x + cpOffset} ${start.y}, ${end.x - cpOffset} ${end.y}, ${end.x} ${end.y}`;

                                const isActive = activeNodes.includes(edge.from);

                                return (
                                    <g key={i}>
                                        {/* Base path */}
                                        <path d={path} stroke="#333" strokeWidth="2" fill="none" />

                                        {/* Active green path */}
                                        {isActive && (
                                            <motion.path
                                                d={path}
                                                fill="none"
                                                stroke="#22c55e"
                                                strokeWidth="2.5"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            />
                                        )}

                                        {/* Animated dot */}
                                        {isActive && (
                                            <circle r="4" fill="#22c55e" filter="url(#glow)">
                                                <animateMotion dur="0.5s" path={path} fill="freeze" />
                                            </circle>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Nodes */}
                        {nodes.map((node) => {
                            const isActive = activeNodes.includes(node.id);
                            const leftPct = (node.x / CANVAS_W) * 100;
                            const topPct = (node.y / CANVAS_H) * 100;
                            const widthPct = (NODE_W / CANVAS_W) * 100;
                            const heightPct = (NODE_H / CANVAS_H) * 100;

                            return (
                                <div
                                    key={node.id}
                                    className="absolute rounded-lg border flex items-center gap-2 px-2 transition-all duration-300"
                                    style={{
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        width: `${widthPct}%`,
                                        height: `${heightPct}%`,
                                        backgroundColor: '#1a1a1a',
                                        borderColor: isActive ? '#22c55e' : '#333',
                                        boxShadow: isActive ? '0 0 12px rgba(34, 197, 94, 0.25)' : 'none'
                                    }}
                                >
                                    {/* Success check */}
                                    <div className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0d0d0d] z-10 transition-all duration-300 ${isActive ? 'bg-green-500 scale-100' : 'scale-0'}`}>
                                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                    </div>

                                    {/* Item count badge (like in n8n) */}
                                    {isActive && (
                                        <div className="absolute -top-2 right-6 bg-emerald-500 text-[8px] text-white px-1.5 py-0.5 rounded font-bold">
                                            1 item
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${node.bg} ${isActive ? 'ring-1 ring-green-500/50' : ''}`}>
                                        <node.icon className={`w-3.5 h-3.5 ${node.color}`} />
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col min-w-0 overflow-hidden">
                                        <span className="text-[9px] font-bold text-white truncate leading-tight">{node.label}</span>
                                        <span className="text-[7px] text-slate-500 truncate leading-tight">{node.sub}</span>
                                    </div>

                                    {/* Ports */}
                                    <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#0d0d0d] ${isActive ? 'bg-green-500' : 'bg-slate-600'}`} />
                                    <div className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#0d0d0d] ${isActive ? 'bg-green-500' : 'bg-slate-600'}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
