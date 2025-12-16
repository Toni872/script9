'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Cargar Stripe con tu clave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Componente del formulario de pago
function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

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
                return_url: `${window.location.origin}/pago-exitoso`,
            },
        });

        if (error) {
            setMessage(error.message || 'Ocurrió un error al procesar el pago');
            console.error('❌ Payment error:', error);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            <button
                disabled={isLoading || !stripe || !elements}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
                {isLoading ? 'Procesando...' : 'Pagar ahora'}
            </button>

            {message && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {message}
                </div>
            )}
        </form>
    );
}

// Componente principal
export default function TestStripePage() {
    const [clientSecret, setClientSecret] = useState<string>('');
    const [amount, setAmount] = useState<number>(50);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const createPaymentIntent = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convertir a céntimos
                    currency: 'eur',
                    propertyTitle: 'Propiedad de Prueba',
                    propertyId: 'test-property-123',
                    customerEmail: 'test@example.com',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setClientSecret(data.clientSecret);
                console.log('✅ Payment Intent created:', data.paymentIntentId);
            } else {
                setError(data.error || 'Error al crear el pago');
            }
        } catch (err) {
            console.error('❌ Error:', err);
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#2563eb',
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🧪 Prueba de Stripe
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Prueba el sistema de pagos con tarjetas de prueba
                    </p>

                    {!clientSecret ? (
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700 mb-2">
                                    Monto a pagar (EUR)
                                </label>
                                <input
                                    id="amount-input"
                                    type="number"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    aria-label="Monto a pagar"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Total: €{amount.toFixed(2)}
                                </p>
                            </div>

                            <button
                                onClick={createPaymentIntent}
                                disabled={loading || amount < 1}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                {loading ? 'Creando...' : 'Iniciar Pago'}
                            </button>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                                    {error}
                                </div>
                            )}

                            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    💳 Tarjetas de prueba:
                                </h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>✅ Exitosa: <code className="bg-white px-2 py-1 rounded">4242 4242 4242 4242</code></li>
                                    <li>❌ Fallida: <code className="bg-white px-2 py-1 rounded">4000 0000 0000 0002</code></li>
                                    <li>🔐 Requiere 3D Secure: <code className="bg-white px-2 py-1 rounded">4000 0025 0000 3155</code></li>
                                </ul>
                                <p className="text-xs text-blue-700 mt-2">
                                    Fecha: Cualquier futura | CVC: Cualquier 3 dígitos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                            <div className="space-y-6">
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-800 font-medium">
                                        ✅ Listo para pagar €{amount.toFixed(2)}
                                    </p>
                                </div>

                                <CheckoutForm />

                                <button
                                    onClick={() => setClientSecret('')}
                                    className="w-full text-gray-600 hover:text-gray-800 font-medium py-2"
                                >
                                    ← Volver
                                </button>
                            </div>
                        </Elements>
                    )}
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>🔒 Modo de prueba - No se procesarán pagos reales</p>
                </div>
            </div>
        </div>
    );
}

