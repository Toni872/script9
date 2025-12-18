'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Users, CreditCard, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        id: string;
        title: string;
        price: number;
        price_per_hour?: number; // legacy fallback
        image_urls?: string[];
        images?: string[]; // legacy fallback
    };
}

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const total = service.price || service.price_per_hour || 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ propertyId: service.id }), // Keep propertyId for API compatibility
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al iniciar el pago');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No se recibió la URL de pago');
            }
        } catch (err: any) {
            setError(err.message || 'Error al procesar el pago. Por favor intenta de nuevo.');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-script9-xl">
                {/* Header */}
                <div className="sticky top-0 z-10 glass-script9 border-b border-brand-primary-100 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold font-heading text-brand-neutral-900 mb-1">
                                Contratar Servicio
                            </h2>
                            <p className="text-sm text-brand-neutral-600">{service.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-brand-primary-50 rounded-full transition-colors"
                            aria-label="Cerrar modal"
                            title="Cerrar"
                        >
                            <X className="h-6 w-6 text-brand-neutral-600" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Summary */}
                    <div className="p-4 bg-brand-primary-50 rounded-xl border border-brand-primary-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="h-6 w-6 text-brand-primary-600" />
                            <div>
                                <p className="font-semibold text-brand-neutral-900">Total a Pagar</p>
                                <p className="text-xs text-brand-neutral-500">Pago único seguro vía Stripe</p>
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-brand-primary-700">€{total.toFixed(2)}</span>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-sm flex gap-3">
                            <CreditCard className="h-5 w-5 flex-shrink-0" />
                            <p>
                                Serás redirigido a Stripe para completar el pago de forma segura. Script9 no almacena tus datos financieros.
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-script9 text-white hover:shadow-script9-glow border-0 font-bold text-lg py-6 rounded-xl disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Redirigiendo a Pago...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Pagar €{total.toFixed(2)}
                            </span>
                        )}
                    </Button>

                    <p className="text-xs text-center text-brand-neutral-500">
                        Al continuar, aceptas nuestros términos de servicio.
                    </p>
                </div>
            </Card>
        </div>
    );
}
