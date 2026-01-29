'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Heart, User, Sparkles, Settings, LogOut, Zap, LayoutDashboard, FileText, ChevronRight, HelpCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

interface SidebarProps {
    subscriptionTier?: 'free' | 'starter' | 'pro' | 'enterprise';
}

export function AppSidebar({ subscriptionTier = 'free' }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/dashboard', label: 'Monitor Central', icon: LayoutDashboard },
        { href: '/dashboard/pedidos', label: 'Mis Proyectos', icon: Sparkles },
        { href: '/perfil', label: 'Configuración de Cuenta', icon: User },
    ];

    return (
        <aside className="w-full h-full min-h-[calc(100vh-8rem)] relative">
            {/* Glass Container */}
            <div className="h-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6 flex flex-col relative overflow-hidden group/sidebar">

                {/* Decoration: Subtle Glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Plan Status Badge */}
                <div className="mb-8 relative z-10">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3 pl-2">Nivel de Acceso</p>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`relative overflow-hidden rounded-xl border p-4 group cursor-default transition-colors ${subscriptionTier === 'enterprise' ? 'bg-purple-900/10 border-purple-500/30' :
                                subscriptionTier === 'pro' ? 'bg-emerald-900/10 border-emerald-500/30' :
                                    'bg-slate-800/40 border-slate-700/50'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold tracking-tight uppercase ${subscriptionTier === 'enterprise' ? 'text-purple-400' :
                                    subscriptionTier === 'pro' ? 'text-emerald-400' :
                                        'text-slate-300'
                                }`}>
                                {subscriptionTier} Plan
                            </span>
                            {subscriptionTier === 'pro' && <Zap className="w-4 h-4 text-emerald-400" />}
                        </div>
                        {/* Scan line effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 flex-1 relative z-10">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3 pl-2">Navegación</p>

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="block relative group">
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <div className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}>
                                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                    {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />}
                                </div>
                            </Link>
                        );
                    })}

                    <div className="my-6 h-px bg-slate-800/50" />

                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3 pl-2">Acciones</p>

                    <Link href="/nuevo-proyecto" className="block group">
                        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all duration-300 group-hover:shadow-lg">
                            <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                            <span className="font-medium text-sm">Nuevo Proyecto</span>
                        </div>
                    </Link>

                    <Link href="/soporte" className="block group mt-2">
                        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                            <HelpCircle className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                            <span className="font-medium text-sm">Soporte Técnico</span>
                        </div>
                    </Link>
                </nav>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-slate-800/50 mt-auto relative z-10">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm">Desconectar</span>
                    </button>

                    <div className="mt-4 text-center">
                        <span className="text-[10px] text-slate-600 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                </div>

            </div>
        </aside>
    );
}

