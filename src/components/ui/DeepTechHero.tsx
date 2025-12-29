'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DeepTechHeroProps {
    title: ReactNode;
    subtitle?: ReactNode;
    badge?: ReactNode;
    children?: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function DeepTechHero({ title, subtitle, badge, children, className, size = 'md' }: DeepTechHeroProps) {
    const padding = {
        sm: 'pt-24 pb-12',
        md: 'pt-32 pb-20',
        lg: 'pt-40 pb-28',
    }[size];

    return (
        <section className={cn(
            `relative ${padding} overflow-hidden bg-slate-950`,
            className
        )}>
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Contacto Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
                {/* Contacto Grid Pattern (4rem / #ffffff05) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    {badge && (
                        <div className="flex justify-center mb-6">
                            {badge}
                        </div>
                    )}

                    <h1 className="text-[56px] md:text-[72px] font-bold mb-6 text-white tracking-tight leading-tight">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {subtitle}
                        </p>
                    )}

                    {children && (
                        <div className="mt-8 max-w-3xl mx-auto">
                            {children}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
