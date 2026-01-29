import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
    children: ReactNode;
    className?: string;
    subtitle?: string;
}

export const PageTitle: FC<PageTitleProps> = ({ children, className, subtitle }) => {
    return (
        <div className={cn('mb-8', className)}>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2 bg-gradient-to-r from-brand-primary-600 to-purple-600 bg-clip-text text-transparent">
                {children}
            </h1>
            {subtitle && (
                <p className="text-lg text-brand-neutral-600">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default PageTitle;
