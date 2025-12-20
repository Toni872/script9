
import Image from 'next/image';

interface LogoProps {
    variant?: 'light' | 'dark';
    className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
    // Determine blend mode based on variant to handle background accordingly
    // Screen mode works best to remove black background on dark surfaces
    const blendMode = 'mix-blend-screen';

    return (
        <div className={`relative h-16 w-52 ${blendMode} ${className}`}>
            <Image
                src="/logo.png"
                alt="Script9"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}

export const LOGO_TEXT = "Script9";
