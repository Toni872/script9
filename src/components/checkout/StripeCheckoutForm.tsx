'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
    clientSecret: string;
    bookingId: string;
    amount: number;
}

function CheckoutForm({ bookingId, amount }: { bookingId: string; amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setMessage('');

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/pago-exitoso?booking_id=${bookingId}`,
            },
        });

        if (error) {
            setMessage(error.message || 'Ocurrió un error al procesar el pago');
            console.error('❌ Payment error:', error);
        } else {
            setPaymentSuccess(true);
        }

        setIsLoading(false);
    };

    if (paymentSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    ¡Pago Exitoso!
                </h3>
                <p className="text-gray-600 mb-6">
                    Redirigiendo a la confirmación...
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Element */}
            <div className="bg-gray-50 p-6 rounded-xl">
                <PaymentElement />
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Pago seguro encriptado con SSL</span>
            </div>

            {/* Error Message */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{message}</p>
                </motion.div>
            )}

            {/* Submit Button */}
            <button
                disabled={isLoading || !stripe || !elements}
                className="w-full py-4 bg-[#8B5CF6] text-white text-[17px] font-semibold rounded-xl hover:bg-[#7c3aed] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Procesando...
                    </>
                ) : (
                    <>
                        <CreditCard className="h-5 w-5" />
                        Pagar €{(amount / 100).toFixed(2)}
                    </>
                )}
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
                Al realizar el pago, aceptas los{' '}
                <a href="/terminos" className="text-[#8B5CF6] hover:underline">
                    Términos y Condiciones
                </a>{' '}
                de Script9
            </p>
        </form>
    );
}

export default function StripeCheckoutForm({ clientSecret, bookingId, amount }: CheckoutFormProps) {
    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#8B5CF6',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Información de Pago
                </h2>
                <p className="text-gray-600">
                    Completa tu reserva de forma segura
                </p>
            </div>

            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm bookingId={bookingId} amount={amount} />
            </Elements>
        </div>
    );
}

