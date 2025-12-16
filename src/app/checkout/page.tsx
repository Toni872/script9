'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Property {
    id: string;
    title: string;
    city: string;
    price_per_hour: number;
    images: string[];
    max_guests: number;
}

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const propertyId = searchParams.get('propertyId');

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const [processing, setProcessing] = useState(false);

    // Verificar autenticación
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/session');
                const session = await response.json();
                if (!session?.user) {
                    console.log('❌ Usuario no autenticado, redirigiendo a login...');
                    router.push(`/login?callbackUrl=${encodeURIComponent('/checkout?propertyId=' + propertyId)}`);
                } else {
                    console.log('✅ Usuario autenticado:', session.user.email);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.error('Error verificando autenticación:', err);
                router.push('/login');
            }
        };
        checkAuth();
    }, [propertyId, router]);

    useEffect(() => {
        if (!propertyId) {
            router.push('/catalogo');
            return;
        }

        if (isAuthenticated === null) {
            return; // Esperar a verificar autenticación
        }

        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/properties/${propertyId}`);
                if (!response.ok) throw new Error('Error al cargar la propiedad');
                const data = await response.json();

                // El API retorna directamente el objeto, no anidado
                const transformedProperty: Property = {
                    id: data.id,
                    title: data.title,
                    city: data.city,
                    price_per_hour: data.price_per_hour,
                    images: data.image_urls || data.images || [],
                    max_guests: data.max_guests || data.capacity || 10,
                };

                setProperty(transformedProperty);
            } catch (err) {
                setError('No se pudo cargar la propiedad');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId, router, isAuthenticated]);

    const handleCheckout = async () => {
        if (!property) return;

        setProcessing(true);
        try {
            // Verificar autenticación
            const sessionResponse = await fetch('/api/auth/session');
            const session = await sessionResponse.json();

            if (!session?.user) {
                router.push(`/login?callbackUrl=${encodeURIComponent('/checkout?propertyId=' + propertyId)}`);
                return;
            }

            // Iniciar sesión de Stripe Checkout directamente
            const res = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ propertyId: property.id }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Error al iniciar pago');

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No se recibió URL de pago');
            }

        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || 'Error desconocido');
            alert(err.message || 'Error al procesar el pago');
            setProcessing(false);
        }
    };

    const totalPrice = property ? property.price_per_hour : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#EF4444] animate-spin" />
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">Error</h2>
                    <p className="text-[#86868b] mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/catalogo')}
                        className="px-6 py-3 bg-[#EF4444] text-white rounded-xl font-semibold hover:bg-[#DC2626] transition-colors hero-text-white"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] py-20 pb-32 lg:pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-5">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#1d1d1f] mb-2">
                        Confirmar Pedido
                    </h1>
                    <p className="text-[17px] text-[#86868b]">
                        Estás a un paso de contratar este servicio
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Detalles del Servicio */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                        >
                            <div className="relative h-64 w-full">
                                <Image
                                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80'}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 sm:p-8">
                                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2">{property.title}</h2>
                                <div className="flex items-center gap-2 text-[#86868b] mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span>Servicio Digital Remoto</span>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        Garantía Script9
                                    </h3>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        Tu pago está protegido. El experto solo recibe el dinero cuando el trabajo ha sido entregado y verificado.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Resumen de Pago */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 border border-gray-100"
                        >
                            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Resumen</h3>

                            <div className="space-y-3 py-4 border-t border-b border-gray-100">
                                <div className="flex justify-between text-[15px]">
                                    <span className="text-[#86868b]">Precio del servicio</span>
                                    <span className="text-[#1d1d1f] font-medium">€{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[15px]">
                                    <span className="text-[#86868b]">Plataforma y soporte</span>
                                    <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded-full">Incluido</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline mt-4 mb-8">
                                <span className="text-[17px] font-semibold text-[#1d1d1f]">Total</span>
                                <span className="text-[32px] font-bold text-[#EF4444]">
                                    €{totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={processing}
                                className="w-full px-6 py-4 bg-[#EF4444] text-white text-[17px] font-semibold rounded-xl hover:bg-[#DC2626] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hero-text-white"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Redirigiendo...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Pagar y Contratar
                                    </>
                                )}
                            </button>

                            <p className="text-[13px] text-[#86868b] text-center mt-4">
                                Pago seguro vía Stripe SSL
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#EF4444] animate-spin" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}


