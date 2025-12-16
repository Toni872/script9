'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#001e40] text-gray-300 overflow-hidden font-sans">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#003D82] via-[#EF4444] to-[#003D82]"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#003D82] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#EF4444] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <div className="h-10 w-10 bg-gradient-to-br from-[#003D82] to-[#EF4444] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    S9
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">Script9</span>
                            </div>
                            <p className="text-sm text-blue-100/70 leading-relaxed max-w-xs">
                                Transformamos negocios digitales mediante IA, automatización y desarrollo de software a medida. Escala sin límites.
                            </p>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#EF4444] hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-[#EF4444] rounded-full"></span>
                                Explorar
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Inicio', href: '/' },
                                    { label: 'Catálogo de Servicios', href: '/catalogo' },
                                    { label: 'Casos de Éxito', href: '/casos' },
                                    { label: 'Blog', href: '/blog' },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-blue-100/70 hover:text-[#EF4444] transition-colors flex items-center group"
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
                                <span className="w-8 h-1 bg-[#003D82] rounded-full"></span>
                                Soporte
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Centro de Ayuda', href: '/faq' },
                                    { label: 'Términos y Condiciones', href: '/legal' },
                                    { label: 'Política de Privacidad', href: '/privacidad' },
                                    { label: 'Contacto', href: '/contacto' },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-blue-100/70 hover:text-[#EF4444] transition-colors"
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
                                <li className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-[#EF4444] mt-1 shrink-0" />
                                    <span className="text-blue-100/70 text-sm">
                                        Calle Tecnología 123, <br />
                                        Distrito Digital, Madrid
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-[#EF4444] shrink-0" />
                                    <span className="text-blue-100/70 text-sm">+34 900 123 456</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-[#EF4444] shrink-0" />
                                    <span className="text-blue-100/70 text-sm">hola@script9.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 py-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-blue-100/50">
                    <p>&copy; {currentYear} Script9. Todos los derechos reservados.</p>
                    <p className="mt-2 md:mt-0 flex items-center">
                        Hecho con <Heart className="w-4 h-4 mx-1 text-[#EF4444] fill-current animate-pulse" /> para el futuro digital
                    </p>
                </div>
            </div>
        </footer>
    );
}
