'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Lock,
    Camera,
    Save,
    Eye,
    EyeOff,
} from 'lucide-react';
import Image from 'next/image';

export default function PerfilUsuario() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    // Personal Info
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    // Password Change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // States
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/login');
            return;
        }

        // Load user data
        setFullName(session.user?.name || '');
        setEmail(session.user?.email || '');
        setAvatarUrl(session.user?.image || '');

        fetchUserData();
    }, [session, status, router]);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/user/profile');
            const data = await response.json();

            if (data.user) {
                setPhone(data.user.phone || '');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    phone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al actualizar perfil');
            }

            setSuccessMessage('¡Perfil actualizado exitosamente!');

            // Update session
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: fullName,
                },
            });

            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al cambiar contraseña');
            }

            setSuccessMessage('¡Contraseña cambiada exitosamente!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setErrorMessage('Por favor selecciona una imagen válida');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage('La imagen debe ser menor a 5MB');
            return;
        }

        setUploadingImage(true);
        setErrorMessage('');

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch('/api/user/upload-avatar', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al subir imagen');
            }

            setAvatarUrl(data.avatarUrl);
            setSuccessMessage('¡Foto de perfil actualizada!');

            // Update session
            await update({
                ...session,
                user: {
                    ...session?.user,
                    image: data.avatarUrl,
                },
            });

            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Mi Perfil
                    </h1>
                    <p className="mt-2 text-lg text-slate-400">
                        Gestiona tu información personal y configuración de cuenta
                    </p>
                </motion.div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
                    >
                        <p className="text-emerald-400 font-medium">{successMessage}</p>
                    </motion.div>
                )}

                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                    >
                        <p className="text-red-400 font-medium">{errorMessage}</p>
                    </motion.div>
                )}

                {/* Avatar Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 mb-6 backdrop-blur-sm"
                >
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Foto de Perfil
                    </h2>

                    <div className="flex items-center gap-6">
                        {/* Avatar Preview */}
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                                {avatarUrl ? (
                                    <Image
                                        src={avatarUrl}
                                        alt="Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <User className="w-12 h-12 text-emerald-500" />
                                )}
                            </div>

                            {/* Upload Button */}
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors shadow-lg"
                                aria-label="Subir foto de perfil"
                            >
                                <Camera className="w-4 h-4 text-white" />
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploadingImage}
                                    aria-label="Seleccionar imagen de perfil"
                                />
                            </label>
                        </div>

                        <div>
                            <p className="text-sm text-slate-200 font-medium mb-1">
                                {uploadingImage ? 'Subiendo imagen...' : 'Sube tu foto de perfil'}
                            </p>
                            <p className="text-xs text-slate-500">
                                JPG, PNG o GIF. Máximo 5MB.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Personal Info Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 mb-6 backdrop-blur-sm"
                >
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Información Personal
                    </h2>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Nombre Completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder:text-slate-600"
                                    aria-label="Nombre completo"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email (Read Only) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed"
                                    aria-label="Email (no editable)"
                                    disabled
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                El email no se puede cambiar
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Teléfono
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+34 687 723 287"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </motion.div>

                {/* Change Password */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 backdrop-blur-sm"
                >
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Cambiar Contraseña
                    </h2>

                    <form onSubmit={handleChangePassword} className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Contraseña Actual
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder:text-slate-600"
                                    aria-label="Contraseña actual"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    aria-label={showCurrentPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Nueva Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder:text-slate-600"
                                    aria-label="Nueva contraseña"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Confirmar Nueva Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder:text-slate-600"
                                    aria-label="Confirmar nueva contraseña"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-slate-700"
                        >
                            <Lock className="w-5 h-5" />
                            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}


