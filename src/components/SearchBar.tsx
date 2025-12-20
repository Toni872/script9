'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Zap, Code, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SearchParams {
    query: string;
    location: string;
    date?: Date;
    guests?: number;
    useCurrentLocation?: boolean;
}

interface SearchBarProps {
    onSearch: (params: SearchParams) => void;
    initialParams?: Partial<SearchParams>;
    variant?: 'default' | 'compact';
    placeholder?: string;
}

export default function SearchBar({ onSearch, initialParams, variant = 'default', placeholder }: SearchBarProps) {
    const [query, setQuery] = useState(initialParams?.query || '');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            query,
            location: '',
            date: undefined,
            guests: undefined,
            useCurrentLocation: false,
        });
    };

    // Sugerencias rápidas de búsqueda
    const quickSuggestions = [
        { icon: Zap, label: 'Automatización', query: 'automatización' },
        { icon: Sparkles, label: 'IA', query: 'inteligencia artificial' },
        { icon: Code, label: 'Scripts', query: 'scripts' },
        { icon: Settings, label: 'API', query: 'integración API' },
    ];

    if (variant === 'compact') {
        return (
            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.005 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="flex items-center gap-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
                    >
                        {/* Búsqueda */}
                        <div className="flex-1 w-full">
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5">
                                    <Search className="h-4 w-4 text-white/70 group-focus-within:text-white transition-colors duration-200" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={placeholder || "¿Qué servicio necesitas?"}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 text-[16px] text-white placeholder:text-white/60 border-0 rounded-2xl focus:outline-none bg-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 bg-white/20"></div>

                        {/* Botón de Búsqueda */}
                        <div className="flex items-center">
                            <button
                                type="submit"
                                className="w-auto px-6 py-4 text-white text-[16px] font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669]"
                            >
                                <Search className="h-4 w-4" />
                                <span>Buscar</span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                {/* Barra de búsqueda principal */}
                <motion.div
                    whileHover={{ scale: 1.003 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border transition-all duration-300 shadow-2xl p-2 ${isFocused ? 'border-[#10B981]/50 bg-white/15' : 'border-white/20'
                        }`}
                >
                    {/* Input de búsqueda */}
                    <div className="flex-1">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5">
                                <Search className="h-5 w-5 text-white/70 group-focus-within:text-white transition-colors duration-200" />
                            </div>
                            <Input
                                placeholder={placeholder || "¿Qué servicio de automatización necesitas?"}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="pl-12 h-14 text-[17px] border-0 rounded-xl bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus:outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Botón de búsqueda */}
                    <button
                        type="submit"
                        className="h-12 px-8 text-[16px] font-semibold rounded-xl text-white transition-all duration-300 bg-[#10B981] hover:bg-[#059669] hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <Search className="h-5 w-5" />
                        <span className="hidden sm:inline">Buscar</span>
                    </button>
                </motion.div>

                {/* Sugerencias rápidas */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-4 flex flex-wrap justify-center gap-2"
                >
                    {quickSuggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                setQuery(suggestion.query);
                                onSearch({
                                    query: suggestion.query,
                                    location: '',
                                    date: undefined,
                                    guests: undefined,
                                    useCurrentLocation: false,
                                });
                            }}
                            className="group flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white/80 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
                        >
                            <suggestion.icon className="h-3.5 w-3.5 text-[#10B981] group-hover:scale-110 transition-transform" />
                            {suggestion.label}
                        </button>
                    ))}
                </motion.div>
            </motion.div>
        </form>
    );
}
