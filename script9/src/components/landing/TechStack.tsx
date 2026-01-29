'use client';

import { motion } from 'framer-motion';
import {
    SiAnthropic,
    SiGooglecloud,
    SiN8N,
    SiMake,
    SiGoogle,
    SiPython,
    SiReact,
    SiStripe,
    SiSupabase,
    SiDocker,
    SiGooglegemini,
    SiPerplexity
} from 'react-icons/si';

export function TechStack() {
    interface Technology {
        name: string;
        icon: React.ElementType;
        color: string;
    }

    const technologies: Technology[] = [
        {
            name: "Antigravity",
            icon: SiGooglegemini,
            color: "text-blue-400"
        },
        {
            name: "Claude",
            icon: SiAnthropic,
            color: "text-orange-200"
        },
        {
            name: "Perplexity",
            icon: SiPerplexity,
            color: "text-cyan-200"
        },
        {
            name: "Google Cloud",
            icon: SiGooglecloud,
            color: "text-blue-500"
        },
        {
            name: "n8n",
            icon: SiN8N,
            color: "text-pink-500"
        },
        {
            name: "Make",
            icon: SiMake,
            color: "text-purple-500"
        },
        {
            name: "Google Gemini",
            icon: SiGoogle,
            color: "text-green-400"
        },
        {
            name: "Python",
            icon: SiPython,
            color: "text-yellow-400"
        },
        {
            name: "React",
            icon: SiReact,
            color: "text-cyan-400"
        },
        {
            name: "Stripe",
            icon: SiStripe,
            color: "text-indigo-400"
        },
        {
            name: "Supabase",
            icon: SiSupabase,
            color: "text-emerald-400"
        },
        {
            name: "Docker",
            icon: SiDocker,
            color: "text-blue-400"
        }
    ];

    // Duplicate for loop
    const doubledTechnologies = [...technologies, ...technologies];

    return (
        <section className="py-10 bg-slate-950 border-y border-slate-900 overflow-hidden relative">
            {/* Fade Gradients for smooth entrance/exit */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 mb-8">
                <p className="text-center text-sm font-medium text-blue-200/60 uppercase tracking-widest">
                    Tecnologías que dominamos
                </p>
            </div>

            <div className="flex relative">
                <motion.div
                    className="flex gap-16 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear"
                    }}
                >
                    {doubledTechnologies.map((tech, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center min-w-[100px] group"
                        >
                            <div className="relative h-12 w-12 flex items-center justify-center transition-transform hover:scale-110 duration-300">
                                <tech.icon className={`h-10 w-10 ${tech.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                            </div>
                            <span className="text-xs text-blue-200/40 mt-3 font-medium tracking-wide group-hover:text-blue-200/80 transition-colors">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
