

interface LogoProps {
    variant?: 'light' | 'dark';
    className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
    const textColor = variant === 'light' ? 'text-white' : 'text-[#003D82]';

    return (
        <div className={`font-bold text-2xl tracking-tighter ${textColor} ${className}`}>
            Script9
        </div>
    );
}

export const LOGO_TEXT = "Script9";
