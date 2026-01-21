'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Avatar } from '@/components/ui/avatar';
import { Search, User, LogOut, Grid3x3, X, MessageCircle, Menu, Home, BookOpen, ChevronRight, BarChart3, Shield, ChevronDown, Zap, Bot, Globe, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessagesButton from '@/components/messaging/MessagesButton';
import { Logo } from '@/components/ui/Logo';

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isHost = session?.user?.role === 'host';
    const isAdmin = session?.user?.role === 'admin';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/soluciones?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-300 ease-in-out
                    ${scrolled
                        ? 'bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-800/50'
                        : 'bg-transparent border-b border-white/5'
                    }
                `}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo - Script9 Deep Tech */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                    >
                        <Logo variant="light" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink href="/">Inicio</NavLink>
                        <NavLink href="/soluciones">Soluciones</NavLink>

                        {/* Services Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setServicesMenuOpen(true)}
                            onMouseLeave={() => setServicesMenuOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-[15px] font-medium text-slate-400 hover:text-white transition-colors py-2 group-hover:text-white">
                                Servicios
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {servicesMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64"
                                    >
                                        <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden ring-1 ring-white/5 p-1">
                                            <DropdownLink href="/servicios/agente-comercial" icon={Bot} title="Agentes IA" desc="Ventas & Atención 24/7" color="emerald" />
                                            <DropdownLink href="/servicios/automatizaciones" icon={Zap} title="Automatizaciones" desc="Email, Datos & Reporting" color="amber" />
                                            <DropdownLink href="/servicios/integraciones" icon={Globe} title="Integraciones" desc="Integraciones End-to-End" color="purple" />
                                            <DropdownLink href="/servicios/scripts-a-medida" icon={Code2} title="Ingeniería de Software" desc="Desarrollo SaaS & APIs" color="blue" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink href="/como-funciona">Cómo Funciona</NavLink>
                        <NavLink href="/sobre-nosotros">Quiénes Somos</NavLink>
                        <NavLink href="/contacto">Contacto</NavLink>
                        {(isHost || isAdmin) && (
                            <NavLink href="/host/properties">Mis Servicios</NavLink>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-all"
                            aria-label="Buscar"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-slate-300 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Desktop Auth Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {session ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                                    >
                                        <Avatar
                                            src={session.user?.image || undefined}
                                            fallback={session.user?.name?.[0] || 'U'}
                                            className="h-8 w-8 border-2 border-emerald-500/50"
                                        />
                                        <div className="text-left hidden lg:block pr-2">
                                            <p className="text-sm font-medium text-slate-200 leading-none">{session.user?.name?.split(' ')[0]}</p>
                                        </div>
                                    </button>

                                    {/* Dropdown User Menu */}
                                    {userMenuOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                            <div className="absolute right-0 mt-3 w-60 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 ring-1 ring-white/5">
                                                <div className="px-4 py-3 border-b border-slate-800/50">
                                                    <p className="text-sm font-semibold text-white">{session.user?.name}</p>
                                                    <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                                                </div>
                                                <div className="py-1">
                                                    <MenuLink href="/dashboard" icon={BarChart3}>Panel de Control</MenuLink>
                                                    <MenuLink href="/perfil" icon={User}>Mi Perfil</MenuLink>
                                                    {(isHost || isAdmin) && (
                                                        <MenuLink href="/host/properties" icon={Grid3x3}>Panel Vendedor</MenuLink>
                                                    )}
                                                    {isAdmin && (
                                                        <MenuLink href="/admin" icon={Shield}>Panel Admin</MenuLink>
                                                    )}
                                                </div>
                                                <div className="border-t border-slate-800/50 mt-1 pt-1">
                                                    <button
                                                        onClick={() => signOut({ callbackUrl: '/' })}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        Cerrar Sesión
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-5 py-2 rounded-full hover:bg-white/5">
                                        Acceso Clientes
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header >

            {/* SEARCH OVERLAY */}
            <AnimatePresence>
                {
                    searchOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-start justify-center pt-32 px-4"
                            onClick={() => setSearchOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: -20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: -20 }}
                                className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 ring-1 ring-white/10"
                                onClick={e => e.stopPropagation()}
                            >
                                <form onSubmit={handleSearch} className="relative border-b border-slate-800">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="¿Qué quieres automatizar hoy?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="w-full pl-16 pr-12 py-6 text-xl text-white placeholder:text-slate-600 border-none outline-none focus:ring-0 bg-transparent font-light"
                                    />
                                    <button
                                        onClick={() => setSearchOpen(false)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </form>
                                <div className="p-6 bg-slate-950/50">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Sugerencias Populares</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Agentes IA', 'SDR Automático', 'Auditoría de Procesos', 'Dashboard Financiero', 'Ingeniería SaaS', 'Consultoría'].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => {
                                                    setSearchQuery(term);
                                                    // Could trigger search here or just fill input
                                                }}
                                                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

            {/* MOBILE MENU */}
            <AnimatePresence>
                {
                    mobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[200] bg-slate-950 border-l border-slate-800 md:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Logo variant="light" />
                                </div>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                <nav className="flex flex-col space-y-1">
                                    <MobileLink href="/" onClick={() => setMobileMenuOpen(false)}>Inicio</MobileLink>
                                    <MobileLink href="/soluciones" onClick={() => setMobileMenuOpen(false)}>Soluciones</MobileLink>

                                    <div className="py-2 border-b border-slate-800/50">
                                        <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Servicios</p>
                                        <MobileLink href="/servicios/agente-comercial" onClick={() => setMobileMenuOpen(false)} isSubItem>Agentes IA</MobileLink>
                                        <MobileLink href="/servicios/automatizaciones" onClick={() => setMobileMenuOpen(false)} isSubItem>Automatizaciones</MobileLink>
                                        <MobileLink href="/servicios/integraciones" onClick={() => setMobileMenuOpen(false)} isSubItem>Integraciones</MobileLink>
                                        <MobileLink href="/servicios/scripts-a-medida" onClick={() => setMobileMenuOpen(false)} isSubItem>Scripts a Medida</MobileLink>
                                    </div>

                                    <MobileLink href="/como-funciona" onClick={() => setMobileMenuOpen(false)}>Cómo Funciona</MobileLink>
                                    <MobileLink href="/sobre-nosotros" onClick={() => setMobileMenuOpen(false)}>Quiénes Somos</MobileLink>
                                    <MobileLink href="/contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</MobileLink>
                                </nav>

                                <div className="border-t border-slate-800 pt-8">
                                    {session ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 mb-6 bg-slate-900 p-4 rounded-xl border border-slate-800">
                                                <Avatar src={session.user?.image || undefined} className="h-12 w-12 border-2 border-emerald-500/30" />
                                                <div>
                                                    <p className="font-semibold text-white text-lg">{session.user?.name}</p>
                                                    <p className="text-sm text-slate-400">{session.user?.email}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex flex-col items-center justify-center py-4 px-2 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 hover:bg-slate-800 transition-colors"
                                                >
                                                    <BarChart3 className="w-6 h-6 mb-2" />
                                                    <span className="text-sm font-medium">Dashboard</span>
                                                </Link>
                                            </div>

                                            {isAdmin && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block w-full py-3 px-4 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl font-medium text-center mt-2"
                                                >
                                                    Panel de Administrador
                                                </Link>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    signOut({ callbackUrl: '/' });
                                                }}
                                                className="w-full py-3 px-4 bg-red-500/5 text-red-400 border border-red-500/10 rounded-xl font-medium mt-4 hover:bg-red-500/10 transition-colors"
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            <Link
                                                href="/login"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex justify-center py-4 px-4 border border-slate-700 rounded-xl font-semibold text-white hover:bg-slate-800 bg-slate-900 transition-all"
                                            >
                                                Acceso Clientes
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-[15px] font-medium text-slate-400 hover:text-white transition-colors relative group py-2"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </Link>
    );
}

function DropdownLink({ href, icon: Icon, title, desc, color = 'emerald' }: { href: string; icon: any; title: string, desc: string, color?: string }) {
    const colorClasses: Record<string, { textHover: string, borderHover: string, iconTextHover: string }> = {
        emerald: { textHover: 'group-hover:text-emerald-400', borderHover: 'group-hover:border-emerald-500/30', iconTextHover: 'group-hover:text-emerald-400' },
        amber: { textHover: 'group-hover:text-amber-400', borderHover: 'group-hover:border-amber-500/30', iconTextHover: 'group-hover:text-amber-400' },
        indigo: { textHover: 'group-hover:text-indigo-400', borderHover: 'group-hover:border-indigo-500/30', iconTextHover: 'group-hover:text-indigo-400' },
        blue: { textHover: 'group-hover:text-blue-400', borderHover: 'group-hover:border-blue-500/30', iconTextHover: 'group-hover:text-blue-400' },
    };

    const theme = colorClasses[color] || colorClasses.emerald;

    return (
        <Link
            href={href}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800 transition-all group"
        >
            <div className={`w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 ${theme.iconTextHover} ${theme.borderHover} transition-colors`}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{title}</p>
                <p className="text-xs text-slate-500 group-hover:text-slate-400">{desc}</p>
            </div>
        </Link>
    );
}

function MenuLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
        >
            <Icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            {children}
        </Link>
    );
}

function MobileLink({ href, children, onClick, isSubItem }: { href: string; children: React.ReactNode; onClick: () => void, isSubItem?: boolean }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center justify-between py-3 px-2 text-slate-300 hover:text-emerald-400 transition-all ${isSubItem ? 'pl-6 text-base' : 'text-lg font-light border-b border-slate-800/50'}`}
        >
            {children}
            {!isSubItem && <ChevronRight className="w-5 h-5 text-slate-600" />}
        </Link>
    );
}
