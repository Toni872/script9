import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina y merge clases de Tailwind de manera segura
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formatea un precio con símbolo de moneda y separadores de miles
 */
export function formatCurrency(amount: number, currency: string = 'EUR', locale: string = 'es-ES') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Formatea una fecha en formato local
 */
export function formatDate(date: Date | string, locale: string = 'es-ES') {
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

/**
 * Valida un color hexadecimal
 */
export function isValidHexColor(color: string) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Aplica una variante de color al texto basado en el estado
 */
export function getStatusColor(status: 'success' | 'warning' | 'error' | 'info' | 'default') {
    const colors = {
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
        default: 'text-brand-neutral-600',
    };

    return colors[status] || colors.default;
}

/**
 * Genera clases de padding responsivas
 */
export function getResponsivePadding(size: 'sm' | 'md' | 'lg' | 'xl') {
    const sizes = {
        sm: 'px-4 py-2 md:px-6 md:py-3',
        md: 'px-6 py-3 md:px-8 md:py-4',
        lg: 'px-8 py-4 md:px-10 md:py-5',
        xl: 'px-10 py-5 md:px-12 md:py-6',
    };

    return sizes[size] || sizes.md;
}

/**
 * Genera clases de tamaño de texto responsivas
 */
export function getResponsiveText(size: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl') {
    const sizes = {
        sm: 'text-sm md:text-base',
        base: 'text-base md:text-lg',
        lg: 'text-lg md:text-xl',
        xl: 'text-xl md:text-2xl',
        '2xl': 'text-2xl md:text-3xl',
        '3xl': 'text-3xl md:text-4xl',
    };

    return sizes[size] || sizes.base;
}

/**
 * Genera clases de grid responsivas
 */
export function getResponsiveGrid(columns: number) {
    const grids = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return grids[columns as keyof typeof grids] || grids[1];
}
