'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Heart, User, Sparkles, Settings, LogOut, Zap, LayoutDashboard, FileText } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SidebarProps {
    subscriptionTier?: 'free' | 'starter' | 'pro' | 'enterprise';
}

export function AppSidebar({ subscriptionTier = 'free' }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/dashboard', label: 'Resumen', icon: LayoutDashboard },
        { href: '/dashboard/pedidos', label: 'Mis Proyectos', icon: Sparkles },
        { href: '/perfil', label: 'Mi Cuenta', icon: User },
    ];

    return (
        <aside className="w-full">
            <Card className="border-slate-800 shadow-sm bg-slate-900/50 backdrop-blur-md h-full min-h-[calc(100vh-8rem)]">
                <CardContent className="p-4">
                    {/* Plan Badge */}
                    <div className="mb-6 px-4 pt-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Tu Plan</p>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${subscriptionTier === 'enterprise' ? 'bg-purple-900/20 text-purple-400 border-purple-500/30' :
                            subscriptionTier === 'pro' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30' :
                                subscriptionTier === 'starter' ? 'bg-blue-900/20 text-blue-400 border-blue-500/30' :
                                    'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                            {subscriptionTier === 'enterprise' && <Sparkles className="w-3 h-3 mr-1" />}
                            {subscriptionTier === 'pro' && <Zap className="w-3 h-3 mr-1 text-yellow-400" />}
                            {subscriptionTier?.toUpperCase()}
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                        ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-500/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        <hr className="my-4 border-slate-800" />

                        <Link
                            href="/nuevo-proyecto"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${pathname === '/nuevo-proyecto' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Sparkles className="h-5 w-5 text-emerald-500" />
                            <span>Nuevo Proyecto</span>
                        </Link>

                        <Link
                            href="/soporte"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-medium"
                        >
                            <Settings className="h-5 w-5" />
                            <span>Soporte</span>
                        </Link>

                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all mt-4"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Cerrar Sesión</span>
                        </Button>
                    </nav>
                </CardContent>
            </Card>
        </aside>
    );
}
