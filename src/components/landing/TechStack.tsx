'use client';

import { motion } from 'framer-motion';

export function TechStack() {
    interface Technology {
        name: string;
        logo: string;
        className?: string;
        darkBg?: boolean;
    }

    const technologies: Technology[] = [
        {
            name: "Antigravity",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", // Using Gemini logo for Antigravity
            className: "invert brightness-0"
        },
        {
            name: "Claude",
            logo: "https://cdn.simpleicons.org/anthropic/white",
        },
        {
            name: "Perplexity",
            logo: "https://cdn.simpleicons.org/perplexity/white",
        },
        {
            name: "Google Cloud",
            logo: "https://cdn.simpleicons.org/googlecloud/white",
        },
        {
            name: "n8n",
            logo: "https://cdn.simpleicons.org/n8n",
        },
        {
            name: "Make",
            logo: "https://cdn.simpleicons.org/make/white", // Force white for visibility on dark blue
        },
        {
            name: "OpenAI",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
            className: "invert brightness-0" // Invert black to white for visibility
        },
        {
            name: "Python",
            logo: "https://cdn.simpleicons.org/python",
        },
        {
            name: "React",
            logo: "https://cdn.simpleicons.org/react",
        },
        {
            name: "Stripe",
            logo: "https://cdn.simpleicons.org/stripe/white",
        },
        {
            name: "Supabase",
            logo: "https://cdn.simpleicons.org/supabase",
        },
        {
            name: "Docker",
            logo: "https://cdn.simpleicons.org/docker/2496ED", // Official Docker Blue
        }
    ];

    // Duplicate for loop
    const doubledrTechnologies = [...technologies, ...technologies];

    return (
        <section className="py-10 bg-[#002E5C] border-y border-white/5 overflow-hidden relative">
            {/* Fade Gradients for smooth entrance/exit */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#002E5C] to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#002E5C] to-transparent z-10" />

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
                    {doubledrTechnologies.map((tech, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center min-w-[100px] group"
                        >
                            <div className="relative h-12 w-32 flex items-center justify-center transition-transform hover:scale-110 duration-300">
                                {/* Using standard img tag to bypass Next.js strict remote patterns for external SVGs */}
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className={`h-full w-full object-contain ${tech.className || ''}`}
                                />
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
