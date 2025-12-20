'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export default function Registro() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState<'user' | 'host'>('user');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (!formData.acceptTerms) {
            setError('Debes aceptar los términos y condiciones');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    role: userType === 'host' ? 'host' : 'guest',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Error al registrarse');
                setLoading(false);
                return;
            }

            router.push('/login?registered=true');
        } catch (err: any) {
            setError('Error inesperado al registrarse');
            console.error(err);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
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
                        src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=3840&auto=format&fit=crop"
                        alt="Script9 - Servicios de IA"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-16 flex flex-col justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003D82] to-[#10B981] flex items-center justify-center text-white font-bold text-xl shadow-xl">
                                S9
                            </div>
                            <span className="text-white text-[32px] font-bold tracking-tight">Script9</span>
                        </Link>
                    </motion.div>

                    {/* Main Content - Dynamic */}
                    <div>
                        <motion.h2
                            key={userType}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[56px] md:text-[64px] font-semibold !text-white mb-8 leading-[1.05] tracking-tight"
                        >
                            {userType === 'host'
                                ? <>Convierte tus skills<br />en <span className="!text-[#10B981]">ingresos</span></>
                                : <>Automatiza tu<br /><span className="!text-[#10B981]">negocio</span></>
                            }
                        </motion.h2>

                        <motion.p
                            key={`desc-${userType}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-[21px] !text-white/90 mb-12 leading-relaxed max-w-md"
                        >
                            {userType === 'host'
                                ? 'Únete a la comunidad de expertos y monetiza tus conocimientos de forma sencilla y segura'
                                : 'Accede a automatizaciones, workflows y scripts inteligentes para escalar tu negocio'
                            }
                        </motion.p>

                        {/* Stats - Dynamic */}
                        <motion.div
                            key={`stats-${userType}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid grid-cols-3 gap-8"
                        >
                            {userType === 'host' ? (
                                <>
                                    <div>
                                        <div className="text-[36px] font-bold !text-white mb-1">€2.5K</div>
                                        <div className="text-[15px] !text-white/70">Media mensual</div>
                                    </div>
                                    <div>
                                        <div className="text-[36px] font-bold !text-white mb-1">200+</div>
                                        <div className="text-[15px] !text-white/70">Expertos</div>
                                    </div>
                                    <div>
                                        <div className="text-[36px] font-bold !text-white mb-1">85%</div>
                                        <div className="text-[15px] !text-white/70">Tasa ocupación</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div className="text-[36px] font-bold !text-white mb-1">500+</div>
                                        <div className="text-[15px] !text-white/70">Servicios</div>
                                    </div>
                                    <div>
                                        <div className="text-[36px] font-bold !text-white mb-1">98%</div>
                                        <div className="text-[15px] !text-white/70">Satisfacción</div>
                                    </div>
                                    <div>
                                        <div className="text-[36px] font-bold !text-white mb-1">24/7</div>
                                        <div className="text-[15px] !text-white/70">Soporte</div>
                                    </div>
                                </>
                            )}
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

            {/* Right Column - Register Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#f5f5f7]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8 sm:mb-12">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#003D82] to-[#10B981] flex items-center justify-center text-white font-bold text-lg shadow-md">
                                S9
                            </div>
                            <span className="text-[#1d1d1f] text-[28px] sm:text-[32px] font-bold">Script9</span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm max-h-[85vh] overflow-y-auto">
                        <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#1d1d1f] mb-3 tracking-tight">
                            Crear Cuenta
                        </h1>
                        <p className="text-[16px] sm:text-[17px] text-[#86868b] mb-6 sm:mb-8">
                            Únete a la comunidad Script9
                        </p>

                        {/* User Type Toggle */}
                        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 p-1 bg-[#f5f5f7] rounded-xl">
                            <button
                                type="button"
                                onClick={() => setUserType('user')}
                                className={`flex-1 py-2.5 text-[15px] font-semibold rounded-lg transition-all ${userType === 'user'
                                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                                    }`}
                            >
                                Soy Usuario
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType('host')}
                                className={`flex-1 py-2.5 text-[15px] font-semibold rounded-lg transition-all ${userType === 'host'
                                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                                    }`}
                            >
                                Soy Colaborador
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                <p className="text-emerald-800 text-[15px] font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                                    Nombre Completo
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Antonio García"
                                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[17px]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="tu@email.com"
                                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[17px]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                                    Teléfono
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+34 600 000 000"
                                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[17px]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[17px]"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868b]" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[17px]"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="mt-1 w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                                />
                                <span className="text-[15px] text-[#86868b]">
                                    Acepto los{' '}
                                    <Link href="/terminos" className="text-[#10B981] hover:text-[#059669]">
                                        términos y condiciones
                                    </Link>{' '}
                                    y la{' '}
                                    <Link href="/privacidad" className="text-[#10B981] hover:text-[#059669]">
                                        política de privacidad
                                    </Link>
                                </span>
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#10B981] text-white text-[17px] font-semibold rounded-xl hover:bg-[#059669] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 hero-text-white"
                            >
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-[13px] text-[#86868b]">O regístrate con</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log('Click en botón Google, userType:', userType);
                                    try {
                                        // Guardar el tipo de usuario en localStorage antes de redirigir
                                        const roleToSave = userType === 'host' ? 'host' : 'guest';
                                        localStorage.setItem('script9_pending_role', roleToSave);
                                        console.log('Role guardado en localStorage:', roleToSave);

                                        // Redirigir a Google OAuth
                                        signIn('google', { callbackUrl: '/' });
                                    } catch (error) {
                                        console.error('Error en onClick de Google:', error);
                                    }
                                }}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-[15px] font-medium">Google</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed"
                                disabled
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <span className="text-[15px] font-medium">Apple</span>
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-[15px] text-[#86868b] mt-8">
                            ¿Ya tienes cuenta?{' '}
                            <Link href="/login" className="text-[#10B981] hover:text-[#059669] font-semibold">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

