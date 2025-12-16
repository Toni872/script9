'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '@/components/checkout/StripeCheckoutForm';
import { useSession } from 'next-auth/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const bookingId = params.bookingId as string;

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated' && bookingId) {
            fetchBookingAndCreatePaymentIntent();
        }
    }, [status, bookingId]);

    const fetchBookingAndCreatePaymentIntent = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener información de la reserva
            const bookingResponse = await fetch(`/api/bookings/${bookingId}`);
            if (!bookingResponse.ok) {
                throw new Error('No se pudo obtener la información de la reserva');
            }
            const bookingData = await bookingResponse.json();
            setBooking(bookingData);

            // Verificar que la reserva esté en estado 'pending'
            if (bookingData.status !== 'pending') {
                setError(`Esta reserva ya ha sido ${bookingData.status === 'confirmed' ? 'confirmada' : 'cancelada'}`);
                return;
            }

            // Crear Payment Intent
            const paymentResponse = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId }),
            });

            if (!paymentResponse.ok) {
                const errorData = await paymentResponse.json();
                throw new Error(errorData.error || 'Error al iniciar el pago');
            }

            const { clientSecret } = await paymentResponse.json();
            setClientSecret(clientSecret);
        } catch (err) {
            console.error('Error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Error al cargar el checkout';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF4444] mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando checkout...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
                    <p className="text-red-700">{error}</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="mt-4 text-red-800 underline"
                    >
                        Volver al dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!clientSecret || !booking) {
        return null;
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#EF4444',
            },
        },
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Completar pago</h1>
                <p className="text-gray-600">Finaliza tu reserva de forma segura</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Resumen de la reserva */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                        <h3 className="font-semibold text-lg mb-4">Resumen de reserva</h3>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-600">Propiedad</p>
                                <p className="font-medium">{booking.properties?.title}</p>
                            </div>

                            <div>
                                <p className="text-gray-600">Ubicación</p>
                                <p className="font-medium">
                                    {booking.properties?.city}, {booking.properties?.region}
                                </p>
                            </div>

                            <div className="border-t pt-3">
                                <p className="text-gray-600">Check-in</p>
                                <p className="font-medium">
                                    {new Date(booking.check_in || booking.start_time).toLocaleDateString('es-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600">Check-out</p>
                                <p className="font-medium">
                                    {new Date(booking.check_out || booking.end_time).toLocaleDateString('es-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600">Total</p>
                                    <p className="text-2xl font-bold text-[#EF4444]">
                                        €{booking.total_price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario de pago */}
                <div className="lg:col-span-2">
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <StripeCheckoutForm
                                clientSecret={clientSecret}
                                bookingId={bookingId}
                                amount={booking.total_price * 100}
                            />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}






