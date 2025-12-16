export type Color = {
    DEFAULT: string;
    light?: string;
    dark?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
};

export type ThemeColors = {
    brand: {
        primary: Color;
        secondary: Color;
        neutral: Color;
    };
    success: string;
    warning: string;
    error: string;
    info: string;
};

export type Shadow = {
    'script9-sm': string;
    'script9-md': string;
    'script9-lg': string;
    'script9-xl': string;
    'script9-glow': string;
};

export type Animation = {
    'fade-in': string;
    'slide-up': string;
    'slide-down': string;
    'scale-in': string;
    'glow': string;
    'float': string;
};

export type Gradient = {
    'gradient-script9': string;
    'gradient-script9-soft': string;
    'gradient-radial-script9': string;
};
