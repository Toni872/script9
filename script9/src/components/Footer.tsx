'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Logo } from '@/components/ui/Logo';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-950 text-slate-300 overflow-hidden font-sans border-t border-slate-800">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <Logo className="scale-125 origin-left" />
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                                Transformamos negocios digitales mediante IA, automatización y desarrollo de software a medida. Escala sin límites.
                            </p>

                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                                Explorar
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Inicio', href: '/' },
                                    { label: 'Soluciones', href: '/soluciones' },
                                    { label: 'Casos de Éxito', href: '/casos' },
                                    { label: 'Blog', href: '/blog' },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center group"
                                        >
                                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal / Support */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                                Soporte
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Centro de Ayuda', href: '/faq' },
                                    { label: 'Términos y Condiciones', href: '/terminos' },
                                    { label: 'Política de Privacidad', href: '/privacidad' },
                                    { label: 'Contacto', href: '/contacto' },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-zinc-400 hover:text-emerald-400 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6">Contáctanos</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <a href="mailto:contact@script-9.com" className="text-zinc-400 text-sm hover:text-emerald-400 transition-colors">
                                        contact@script-9.com
                                    </a>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span className="text-zinc-400 text-sm">+34 687 723 287</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaLinkedin className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <a href="https://www.linkedin.com/in/tony-lloret-080166156" target="_blank" rel="noopener noreferrer" className="text-zinc-400 text-sm hover:text-emerald-400 transition-colors">
                                        Tony Lloret (Founder)
                                    </a>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaLinkedin className="w-5 h-5 text-blue-500 shrink-0" />
                                    <a href="https://www.linkedin.com/in/christian-hernández" target="_blank" rel="noopener noreferrer" className="text-zinc-400 text-sm hover:text-blue-400 transition-colors">
                                        Christian Hernández (Co-Founder)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 py-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {currentYear} Script9. Todos los derechos reservados.</p>

                </div>
            </div>
        </footer>
    );
}
