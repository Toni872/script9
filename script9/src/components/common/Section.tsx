import { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
    className?: string;
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    centered?: boolean;
}

export const Section: FC<SectionProps> = ({
    className,
    children,
    title,
    subtitle,
    centered = false,
}) => {
    return (
        <section className={cn('py-20', className)}>
            <div className="container-script9">
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className={cn('mb-16', centered && 'text-center')}
                    >
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-brand-neutral-900 mb-4 tracking-tight">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className={cn(
                                'text-lg md:text-xl text-brand-neutral-600 leading-relaxed',
                                centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'
                            )}>
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
