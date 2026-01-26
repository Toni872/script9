"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface CinematicWorkflowProps {
    imageSrc: string; // Path to the image
}

export function CinematicWorkflow({ imageSrc }: CinematicWorkflowProps) {
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            } else {
                audioRef.current.pause();
            }
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-950 group">
            {/* Audio Element */}
            {/* Using a placeholder tech ambient sound or white noise if no specific URL provided */}
            <audio ref={audioRef} loop src="https://admin.script9.com/assets/tech-ambient.mp3" />

            {/* Cinematic Pan Animation */}
            <motion.div
                className="w-full h-full"
                initial={{ scale: 1.3, x: "0%" }}
                animate={{
                    scale: [1.3, 1.45, 1.3],
                    x: ["0%", "-2%", "0%"],
                    y: ["0%", "-1%", "0%"]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "mirror"
                }}
            >
                <Image
                    src={imageSrc}
                    alt="Workflow Architecture 4K"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
            </motion.div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                <div className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE WORKFLOW
                </div>

                <button
                    onClick={toggleAudio}
                    className="p-2 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500 transition-all"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
            </div>

            {/* Tech Badges / Overlays to make it look like a video interface */}
            <div className="absolute bottom-6 left-6 z-20">
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>RES: 4K_NATIVE</span>
                    <span>FPS: 60</span>
                    <span className="text-emerald-500">RENDER: ACTIVE</span>
                </div>
            </div>
        </div>
    );
}
