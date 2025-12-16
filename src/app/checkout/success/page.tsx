'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Booking {
    id: string;
    booking_reference: string;
    property: {
        title: string;
    };
    start_time: string;
    end_time: string;
    guests: number;
    total_price: number;
    status: string;
}

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { status } = useSession();
    const bookingId = searchParams.get('bookingId');

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchBooking = useCallback(async () => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`);
            if (response.ok) {
                const data = await response.json();
                setBooking(data);
            }
        } catch (error) {
            console.error('Error fetching booking:', error);
        } finally {
            setLoading(false);
        }
    }, [bookingId]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated' && bookingId) {
            fetchBooking();
        }
    }, [status, bookingId, fetchBooking, router]);

    if (status === 'loading' || loading) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF4444] mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando pago...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <div className="text-center">
                {/* Icono de éxito */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-12 h-12 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    ¡Pago exitoso!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Tu reserva ha sido confirmada. Recibirás un email de confirmación en breve.
                </p>

                {booking && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                        <h2 className="font-semibold text-lg mb-4">Detalles de tu reserva</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">ID de reserva:</span>
                                <span className="font-mono text-xs">{booking.id}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Propiedad:</span>
                                <span className="font-medium">{booking.property?.title}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Check-in:</span>
                                <span className="font-medium">
                                    {new Date(booking.start_time).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Check-out:</span>
                                <span className="font-medium">
                                    {new Date(booking.end_time).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>

                            <div className="flex justify-between border-t pt-3">
                                <span className="text-gray-600">Total pagado:</span>
                                <span className="text-xl font-bold text-[#EF4444]">
                                    €{booking.total_price.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Estado:</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Confirmada
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#EF4444] hover:bg-[#DC2626]"
                    >
                        Ver mis reservas
                    </Link>
                    <Link
                        href="/catalogo"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Explorar más espacios
                    </Link>
                </div>
            </div>
        </div>
    );
}







