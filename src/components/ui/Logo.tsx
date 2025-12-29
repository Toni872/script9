import Image from 'next/image';

interface LogoProps {
    variant?: 'light' | 'dark';
    className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
    // Colors
    const textColor = variant === 'dark' ? '#0f172a' : '#ffffff';
    const accentColor = '#10B981'; // Emerald-500

    return (
        <div className={`relative flex items-center ${className}`}>
            <svg
                width="140"
                height="40"
                viewBox="0 0 140 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-8 md:h-10"
            >
                <text
                    x="0"
                    y="30"
                    fontSize="32"
                    fontFamily="var(--font-geist-sans), sans-serif"
                    fontWeight="800"
                    fill={textColor}
                    letterSpacing="-1.5"
                >
                    Script<tspan fill={accentColor}>9</tspan>
                </text>
            </svg>
        </div>
    );
}

export const LOGO_TEXT = "Script9";
