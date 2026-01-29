import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Script9 "Deep Tech" Identity v2.0
                // Based on User Identity Document
                script9: {
                    blue: '#003D82',        // Primary Corporate Blue
                    green: '#10B981',       // NEW Accent Corporate Green (Success/Growth)
                    gray: {
                        light: '#F5F5F5',   // Background
                        dark: '#333333',    // Text
                    }
                },
                brand: {
                    primary: {
                        DEFAULT: '#003D82', // Corporate Blue (Confianza)
                        50: '#E6F0FF',
                        100: '#CCE1FF',
                        200: '#99C3FF',
                        300: '#66A5FF',
                        400: '#3387FF',
                        500: '#0069FF',
                        600: '#003D82',     // MAIN BRAND COLOR
                        700: '#002E5C',
                        800: '#001F3F',
                        900: '#000D1A',
                    },
                    accent: {
                        DEFAULT: '#10B981', // Corporate Green (Emerald)
                        50: '#ECFDF5',
                        100: '#D1FAE5',
                        200: '#A7F3D0',
                        300: '#6EE7B7',
                        400: '#34D399',
                        500: '#10B981',     // MAIN ACCENT COLOR
                        600: '#059669',
                        700: '#047857',
                        800: '#065F46',
                        900: '#064E3B',
                    },
                    neutral: {
                        DEFAULT: '#333333', // Dark Gray Text
                        50: '#FAFAFA',
                        100: '#F5F5F5',     // Main Background
                        200: '#EEEEEE',
                        300: '#E0E0E0',
                        400: '#BDBDBD',
                        500: '#9E9E9E',
                        600: '#757575',
                        700: '#616161',
                        800: '#424242',
                        900: '#212121',     // Almost Black
                    },
                },
                // Semantic colors (Document Standard)
                success: {
                    DEFAULT: '#4CAF50',
                    foreground: '#FFFFFF'
                },
                warning: {
                    DEFAULT: '#FF9800',
                    foreground: '#FFFFFF'
                },
                error: {
                    DEFAULT: '#F44336',
                    foreground: '#FFFFFF'
                },
                info: {
                    DEFAULT: '#2196F3',
                    foreground: '#FFFFFF'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            fontFamily: {
                // Script9 Typography
                heading: ['Inter', 'system-ui', 'sans-serif'], // Inter Bold for headings
                body: ['Inter', 'system-ui', 'sans-serif'],    // Inter Regular for body
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            boxShadow: {
                'script9-sm': '0 1px 2px 0 rgba(0, 61, 130, 0.05)',
                'script9-md': '0 4px 6px -1px rgba(0, 61, 130, 0.1), 0 2px 4px -1px rgba(0, 61, 130, 0.06)',
                'script9-lg': '0 10px 15px -3px rgba(0, 61, 130, 0.1), 0 4px 6px -2px rgba(0, 61, 130, 0.05)',
                'script9-xl': '0 20px 25px -5px rgba(0, 61, 130, 0.1), 0 10px 10px -5px rgba(0, 61, 130, 0.04)',
                'script9-glow': '0 0 15px rgba(16, 185, 129, 0.5)', // Green glow
            },
            backgroundImage: {
                'gradient-script9': 'linear-gradient(135deg, #003D82 0%, #0056b3 100%)', // Blue Corporate Gradient
                'gradient-script9-accent': 'linear-gradient(135deg, #10B981 0%, #047857 100%)', // Green Accent Gradient
                'gradient-script9-soft': 'linear-gradient(135deg, #F5F7FA 0%, #E6E9F0 100%)', // Soft Gray Gradient
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
        extensions: {
            typography: {
                DEFAULT: {
                    css: {
                        pre: {
                            color: false,
                            backgroundColor: false,
                        },
                        code: {
                            color: false,
                            backgroundColor: false,
                        }
                    }
                }
            }
        },
    },
    plugins: [require('tailwindcss-animate')],
};

export default config;