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
            <Card className="border-gray-200 shadow-sm bg-white h-full min-h-[calc(100vh-8rem)]">
                <CardContent className="p-4">
                    {/* Plan Badge */}
                    <div className="mb-6 px-4 pt-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Tu Plan</p>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${subscriptionTier === 'enterprise' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                            subscriptionTier === 'pro' ? 'bg-[#003D82] text-white border-[#003D82]' :
                                subscriptionTier === 'starter' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    'bg-gray-100 text-gray-600 border-gray-200'
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
                                        ? 'bg-[#003D82] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        <hr className="my-4 border-gray-100" />

                        <Link
                            href="/nuevo-proyecto"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${pathname === '/nuevo-proyecto' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Sparkles className="h-5 w-5 text-[#EF4444]" />
                            <span>Nuevo Proyecto</span>
                        </Link>

                        <Link
                            href="/soporte"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium"
                        >
                            <Settings className="h-5 w-5" />
                            <span>Soporte</span>
                        </Link>

                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all mt-4"
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
