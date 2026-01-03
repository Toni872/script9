'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PagoExitosoContent() {
    const searchParams = useSearchParams();
    const [paymentIntentId, setPaymentIntentId] = useState<string>('');

    useEffect(() => {
        if (searchParams) {
            const payment_intent = searchParams.get('payment_intent');
            if (payment_intent) {
                setPaymentIntentId(payment_intent);
            }
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Icono de éxito */}
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
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

                {/* Título */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    ¡Pago Exitoso! 🎉
                </h1>

                <p className="text-gray-600 mb-6">
                    Tu pago ha sido procesado correctamente
                </p>

                {/* ID del pago */}
                {paymentIntentId && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <p className="text-xs text-gray-500 mb-1">ID de transacción:</p>
                        <p className="text-sm font-mono text-gray-800 break-all">
                            {paymentIntentId}
                        </p>
                    </div>
                )}

                {/* Información adicional */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        ✅ ¿Qué sigue?
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Recibirás un email de confirmación</li>
                        <li>• Tu reserva ha sido registrada</li>
                        <li>• Revisa el webhook en la consola</li>
                    </ul>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                        Volver al inicio
                    </Link>
                </div>

                {/* Nota */}
                <p className="mt-6 text-xs text-gray-500">
                    Gracias por confiar en Script9.
                </p>
            </div>
        </div>
    );
}

export default function PagoExitosoPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <PagoExitosoContent />
        </Suspense>
    );
}

