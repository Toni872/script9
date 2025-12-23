'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Avatar } from '@/components/ui/avatar';
import { Search, User, LogOut, Grid3x3, X, MessageCircle, Menu, Home, BookOpen, ChevronRight, BarChart3, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessagesButton from '@/components/messaging/MessagesButton';
import { Logo } from '@/components/ui/Logo';

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
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
            router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
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
                        ? 'bg-[#003D82]/95 backdrop-blur-md shadow-md border-b border-[#002E5C]'
                        : 'bg-[#003D82]'
                    }
                `}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo - Script9 Deep Tech */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                    >
                        <Logo variant="light" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="/">Inicio</NavLink>
                        <NavLink href="/catalogo">Catálogo</NavLink>
                        <NavLink href="/como-funciona">Cómo Funciona</NavLink>
                        {(isHost || isAdmin) && (
                            <NavLink href="/host/properties">Mis Servicios</NavLink>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            aria-label="Buscar"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-blue-100 hover:text-white"
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
                                        className="flex items-center gap-3 p-1 rounded-full hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
                                    >
                                        <Avatar
                                            src={session.user?.image || undefined}
                                            fallback={session.user?.name?.[0] || 'U'}
                                            className="h-8 w-8 border-2 border-[#10B981]"
                                        />
                                        <div className="text-left hidden lg:block pr-2">
                                            <p className="text-sm font-medium text-white leading-none">{session.user?.name?.split(' ')[0]}</p>
                                        </div>
                                    </button>

                                    {/* Dropdown User Menu */}
                                    {userMenuOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                                <div className="px-4 py-3 border-b border-gray-50">
                                                    <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                                </div>
                                                <MenuLink href="/dashboard" icon={BarChart3}>Panel de Control</MenuLink>
                                                <MenuLink href="/perfil" icon={User}>Mi Perfil</MenuLink>
                                                <MenuLink href="/mensajes" icon={MessageCircle}>Mensajes</MenuLink>
                                                {(isHost || isAdmin) && (
                                                    <MenuLink href="/host/properties" icon={Grid3x3}>Panel Vendedor</MenuLink>
                                                )}
                                                {isAdmin && (
                                                    <MenuLink href="/admin" icon={Shield}>Panel Admin</MenuLink>
                                                )}
                                                <div className="border-t border-gray-50 mt-1">
                                                    <button
                                                        onClick={() => signOut({ callbackUrl: '/' })}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors bg-white hover:bg-gray-50"
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
                                    <Link href="/login" className="text-sm font-medium text-blue-100 hover:text-white transition-colors border border-blue-400/30 px-4 py-1.5 rounded-full hover:bg-white/10">
                                        Acceso Clientes
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* SPACER for Fixed Header */}
            <div className="h-16" />

            {/* SEARCH OVERLAY */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#001F3F]/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: -20 }}
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <form onSubmit={handleSearch} className="relative border-b border-gray-100">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="¿Qué quieres automatizar hoy?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-16 pr-12 py-5 text-lg text-gray-900 placeholder:text-gray-400 border-none outline-none focus:ring-0 bg-transparent"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </form>
                            <div className="p-4 bg-gray-50">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sugerencias</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Automatización', 'Chatbots', 'Scraping', 'CRM', 'Python'].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => {
                                                setSearchQuery(term);
                                                // Trigger search logic
                                            }}
                                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:border-[#003D82] hover:text-[#003D82] transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-white md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Logo variant="dark" />
                                </div>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            <nav className="flex flex-col space-y-2">
                                <MobileLink href="/" onClick={() => setMobileMenuOpen(false)}>Inicio</MobileLink>
                                <MobileLink href="/catalogo" onClick={() => setMobileMenuOpen(false)}>Catálogo</MobileLink>
                                <MobileLink href="/como-funciona" onClick={() => setMobileMenuOpen(false)}>Cómo Funciona</MobileLink>
                            </nav>

                            <div className="border-t border-gray-100 pt-6">
                                {session ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar src={session.user?.image || undefined} className="h-10 w-10 bg-gray-100" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{session.user?.name}</p>
                                                <p className="text-xs text-gray-500">{session.user?.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full py-2.5 px-4 bg-blue-50 text-[#003D82] rounded-lg font-medium mb-2"
                                        >
                                            Panel de Control
                                        </Link>
                                        {isAdmin && (
                                            <Link
                                                href="/admin"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block w-full py-2.5 px-4 bg-purple-50 text-purple-700 rounded-lg font-medium mb-2"
                                            >
                                                Panel Admin
                                            </Link>
                                        )}
                                        <Link
                                            href="/perfil"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full py-2.5 px-4 bg-gray-50 rounded-lg text-gray-700 font-medium"
                                        >
                                            Mi Perfil
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                signOut({ callbackUrl: '/' });
                                            }}
                                            className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-600 rounded-lg font-medium text-left"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex justify-center py-3 px-4 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 bg-gray-50"
                                        >
                                            Acceso Clientes
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-blue-100 hover:text-white transition-colors relative group py-2"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

function MenuLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003D82] transition-colors"
        >
            <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#003D82]" />
            {children}
        </Link>
    );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center justify-between py-3 px-2 text-lg font-medium text-gray-700 border-b border-gray-50 hover:text-[#003D82]"
        >
            {children}
            <ChevronRight className="w-5 h-5 text-gray-300" />
        </Link>
    );
}


