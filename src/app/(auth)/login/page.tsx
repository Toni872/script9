'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, CheckCircle, Star, Users } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Credenciales inválidas');
                setLoading(false);
                return;
            }

            if (result?.ok) {
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError('Error inesperado al iniciar sesión');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Image & Branding */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3840&auto=format&fit=crop"
                        alt="Script9 - Automatiza tu negocio"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-16 flex flex-col justify-between">
                    {/* Spacer for where Logo used to be */}
                    <div className="h-20"></div>

                    {/* Main Content */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[56px] md:text-[64px] font-semibold !text-white mb-8 leading-[1.05] tracking-tight"
                        >
                            Tu automatización ideal<br />te está <span className="!text-[#10B981]">esperando</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-[21px] !text-white/90 mb-12 leading-relaxed max-w-md"
                        >
                            Accede a soluciones de IA y automatización que transformarán tu negocio
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid grid-cols-3 gap-8"
                        >
                            <div>
                                <div className="text-[36px] font-bold !text-white mb-1">500+</div>
                                <div className="text-[15px] !text-white/70">Automatizaciones</div>
                            </div>
                            <div>
                                <div className="text-[36px] font-bold !text-white mb-1">98%</div>
                                <div className="text-[15px] !text-white/70">Satisfacción</div>
                            </div>
                            <div>
                                <div className="text-[36px] font-bold !text-white mb-1">24/7</div>
                                <div className="text-[15px] !text-white/70">Soporte</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-[13px] !text-white/60"
                    >
                        © 2025 Script9. Automatiza tu negocio.
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Column - Login Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-950">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
                        {/* Logo Centered */}
                        <div className="flex justify-center mb-8">
                            <Link href="/" className="inline-block">
                                <Logo />
                            </Link>
                        </div>

                        <h1 className="text-[32px] sm:text-[40px] font-semibold text-white mb-3 tracking-tight">
                            Iniciar Sesión
                        </h1>
                        <p className="text-[16px] sm:text-[17px] text-slate-400 mb-6 sm:mb-8">
                            Bienvenido de vuelta a Script9
                        </p>

                        {error && (
                            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                                <p className="text-red-400 text-[15px] font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-[15px] font-medium text-slate-300 mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="tu@email.com"
                                        className="w-full pl-12 pr-4 py-4 sm:py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-[16px] text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[15px] font-medium text-slate-300 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 sm:py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-[16px] text-white placeholder:text-slate-600"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-emerald-500 border-slate-700 bg-slate-950 rounded focus:ring-emerald-500"
                                    />
                                    <span className="text-[15px] text-slate-300">Recordarme</span>
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[15px] text-emerald-400 hover:text-emerald-300 font-medium"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 sm:py-3.5 bg-emerald-600 text-white text-[16px] font-semibold rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6 sm:my-8">
                            <div className="flex-1 h-px bg-slate-800"></div>
                            <span className="text-[13px] text-slate-500">O continúa con</span>
                            <div className="flex-1 h-px bg-slate-800"></div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={async () => {
                                    console.log('🔵 [MOBILE DEBUG] Botón Google clickeado');
                                    console.log('🔵 [MOBILE DEBUG] User Agent:', navigator.userAgent);
                                    console.log('🔵 [MOBILE DEBUG] Location origin:', window.location.origin);

                                    setLoading(true);
                                    setError(null);

                                    try {
                                        console.log('🔵 [MOBILE DEBUG] Llamando signIn...');
                                        const result = await signIn('google', {
                                            callbackUrl: window.location.origin || '/',
                                            redirect: true,
                                        });
                                        console.log('🔵 [MOBILE DEBUG] Resultado signIn:', result);
                                    } catch (err) {
                                        console.error('🔴 [MOBILE DEBUG] Error en signIn:', err);
                                        setError('Error al conectar con Google');
                                        setLoading(false);
                                    }
                                }}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-3 border border-slate-700 bg-slate-950 rounded-xl hover:bg-slate-900 hover:border-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-[15px] font-medium text-white">
                                    {loading ? 'Conectando...' : 'Google'}
                                </span>
                            </button>
                            <button
                                type="button"
                                disabled
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-700 bg-slate-950 rounded-xl opacity-50 cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <span className="text-[15px] font-medium text-white">Apple</span>
                            </button>
                        </div>

                        {/* Register Link */}
                        <p className="text-center text-[15px] text-slate-500 mt-8">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/registro" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                                Regístrate gratis
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
