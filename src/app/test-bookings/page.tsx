'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function TestBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // IDs de ejemplo (reemplazar con IDs reales de tu base de datos)
    const [propertyId, setPropertyId] = useState('');
    const [bookingId, setBookingId] = useState('');

    // Protección de ruta - solo administradores
    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        // Verificar si el usuario es admin
        if (session?.user?.email) {
            fetch('/api/auth/check-admin')
                .then(res => res.json())
                .then(data => {
                    if (!data.isAdmin) {
                        alert('⛔ Acceso denegado. Solo administradores pueden acceder a esta página.');
                        router.push('/');
                    }
                })
                .catch(() => {
                    router.push('/');
                });
        }
    }, [session, status, router]);

    const handleRequest = async (
        method: string,
        endpoint: string,
        body?: any
    ) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const options: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const res = await fetch(endpoint, options);
            const data = await res.json();

            setResponse({
                status: res.status,
                statusText: res.statusText,
                data,
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Mostrar pantalla de carga mientras se verifica el acceso
    if (status === 'loading') {
        return (
            <div className="container mx-auto p-8 max-w-7xl flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-script9-magenta mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando acceso...</p>
                </div>
            </div>
        );
    }

    // No mostrar nada si no está autenticado (se redirigirá)
    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                <p className="font-bold">⚠️ Página de Pruebas - Solo Administradores</p>
                <p className="text-sm">Esta página no está disponible en producción.</p>
            </div>

            <h1 className="text-4xl font-bold mb-8 text-script9-magenta">
                🧪 Pruebas de API de Reservas
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Configuración */}
                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">⚙️ Configuración</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Property ID (UUID)
                            </label>
                            <Input
                                type="text"
                                value={propertyId}
                                onChange={(e) => setPropertyId(e.target.value)}
                                placeholder="123e4567-e89b-12d3-a456-426614174000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Booking ID (UUID)
                            </label>
                            <Input
                                type="text"
                                value={bookingId}
                                onChange={(e) => setBookingId(e.target.value)}
                                placeholder="abc-def-ghi-jkl-mno"
                            />
                        </div>
                    </div>
                </Card>

                {/* Estado de Sesión */}
                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">👤 Estado de Sesión</h2>
                    <div className="space-y-3">
                        <div className={`p-3 rounded-lg ${status === 'authenticated' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <p className="font-bold">
                                {status === 'authenticated' ? '✅ Autenticado' : '❌ No autenticado'}
                            </p>
                            {session?.user && (
                                <p className="text-sm mt-1">
                                    Usuario: {session.user.email || session.user.name || 'N/A'}
                                </p>
                            )}
                        </div>
                        <Button
                            onClick={() => {
                                setResponse({
                                    status: 200,
                                    statusText: 'OK',
                                    data: {
                                        status,
                                        session: session || null
                                    }
                                });
                            }}
                            className="w-full"
                            variant="outline"
                        >
                            Ver Detalles de Sesión
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Pruebas de Endpoints */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* 1. Listar Reservas */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">📋 Listar Reservas</h3>
                    <p className="text-sm text-gray-600 mb-3">GET /api/bookings</p>
                    <Button
                        onClick={() => handleRequest('GET', '/api/bookings')}
                        disabled={loading}
                        className="w-full"
                        variant="outline"
                    >
                        Listar Todas
                    </Button>
                    <Button
                        onClick={() =>
                            handleRequest('GET', '/api/bookings?status=confirmed')
                        }
                        disabled={loading}
                        className="w-full mt-2"
                        variant="outline"
                    >
                        Solo Confirmadas
                    </Button>
                </Card>

                {/* 2. Crear Reserva */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">➕ Crear Reserva</h3>
                    <p className="text-sm text-gray-600 mb-3">POST /api/bookings</p>
                    <Button
                        onClick={() => {
                            const cleanPropertyId = propertyId.trim();
                            if (!cleanPropertyId) {
                                alert('Por favor ingresa un Property ID');
                                return;
                            }
                            // Usar una fecha aleatoria en el futuro para evitar conflictos
                            const daysAhead = Math.floor(Math.random() * 90) + 30; // Entre 30 y 120 días
                            const futureDate = new Date();
                            futureDate.setDate(futureDate.getDate() + daysAhead);
                            const startHour = Math.floor(Math.random() * 8) + 9; // Entre 9 y 17
                            const startTime = new Date(futureDate);
                            startTime.setHours(startHour, Math.floor(Math.random() * 60), 0, 0);
                            const endTime = new Date(futureDate);
                            endTime.setHours(startHour + 4, Math.floor(Math.random() * 60), 0, 0);

                            handleRequest('POST', '/api/bookings', {
                                propertyId: cleanPropertyId,
                                startTime: startTime.toISOString(),
                                endTime: endTime.toISOString(),
                                totalPrice: 120.0,
                            });
                        }}
                        disabled={loading || !propertyId}
                        className="w-full"
                    >
                        Crear Reserva de Prueba
                    </Button>
                </Card>

                {/* 3. Obtener por ID */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">🔍 Obtener por ID</h3>
                    <p className="text-sm text-gray-600 mb-3">GET /api/bookings/[id]</p>
                    <Button
                        onClick={() => {
                            if (!bookingId) {
                                alert('Por favor ingresa un Booking ID');
                                return;
                            }
                            handleRequest('GET', `/api/bookings/${bookingId}`);
                        }}
                        disabled={loading || !bookingId}
                        className="w-full"
                        variant="outline"
                    >
                        Obtener Detalles
                    </Button>
                </Card>

                {/* 4. Actualizar Estado */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">✏️ Actualizar Estado</h3>
                    <p className="text-sm text-gray-600 mb-3">PUT /api/bookings/[id]</p>
                    <Button
                        onClick={() => {
                            if (!bookingId) {
                                alert('Por favor ingresa un Booking ID');
                                return;
                            }
                            handleRequest('PUT', `/api/bookings/${bookingId}`, {
                                status: 'confirmed',
                            });
                        }}
                        disabled={loading || !bookingId}
                        className="w-full"
                        variant="outline"
                    >
                        Cambiar a Confirmada
                    </Button>
                </Card>

                {/* 5. Confirmar Reserva */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">✅ Confirmar Reserva</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        POST /api/bookings/[id]/confirm
                    </p>
                    <Button
                        onClick={() => {
                            if (!bookingId) {
                                alert('Por favor ingresa un Booking ID');
                                return;
                            }
                            handleRequest('POST', `/api/bookings/${bookingId}/confirm`);
                        }}
                        disabled={loading || !bookingId}
                        className="w-full bg-green-600 hover:bg-green-700"
                    >
                        Confirmar (Host)
                    </Button>
                </Card>

                {/* 6. Cancelar con Lógica */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">❌ Cancelar Reserva</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        POST /api/bookings/[id]/cancel
                    </p>
                    <Button
                        onClick={() => {
                            if (!bookingId) {
                                alert('Por favor ingresa un Booking ID');
                                return;
                            }
                            handleRequest('POST', `/api/bookings/${bookingId}/cancel`, {
                                reason: 'Prueba de cancelación desde panel de testing',
                                refundRequested: true,
                            });
                        }}
                        disabled={loading || !bookingId}
                        className="w-full bg-red-600 hover:bg-red-700"
                    >
                        Cancelar con Reembolso
                    </Button>
                </Card>

                {/* 7. Próximas Reservas */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">⏰ Próximas Reservas</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        GET /api/bookings/upcoming
                    </p>
                    <Button
                        onClick={() => handleRequest('GET', '/api/bookings/upcoming')}
                        disabled={loading}
                        className="w-full"
                        variant="outline"
                    >
                        Próximas 24h
                    </Button>
                    <Button
                        onClick={() =>
                            handleRequest('GET', '/api/bookings/upcoming?hoursAhead=168')
                        }
                        disabled={loading}
                        className="w-full mt-2"
                        variant="outline"
                    >
                        Próximos 7 días
                    </Button>
                </Card>

                {/* 8. Verificar Disponibilidad */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">📅 Disponibilidad</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        POST /api/bookings/availability
                    </p>
                    <Button
                        onClick={() => {
                            if (!propertyId) {
                                alert('Por favor ingresa un Property ID');
                                return;
                            }
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            const startTime = new Date(tomorrow);
                            startTime.setHours(14, 0, 0, 0);
                            const endTime = new Date(tomorrow);
                            endTime.setHours(18, 0, 0, 0);

                            handleRequest('POST', '/api/bookings/availability', {
                                propertyId,
                                startTime: startTime.toISOString(),
                                endTime: endTime.toISOString(),
                            });
                        }}
                        disabled={loading || !propertyId}
                        className="w-full"
                        variant="outline"
                    >
                        Verificar Disponibilidad
                    </Button>
                </Card>

                {/* 9. Calcular Precio */}
                <Card className="p-4">
                    <h3 className="font-bold mb-2">💰 Calcular Precio</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        POST /api/bookings/calculate-price
                    </p>
                    <Button
                        onClick={() => {
                            if (!propertyId) {
                                alert('Por favor ingresa un Property ID');
                                return;
                            }
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            const startTime = new Date(tomorrow);
                            startTime.setHours(14, 0, 0, 0);
                            const endTime = new Date(tomorrow);
                            endTime.setHours(18, 0, 0, 0);

                            handleRequest('POST', '/api/bookings/calculate-price', {
                                propertyId,
                                startTime: startTime.toISOString(),
                                endTime: endTime.toISOString(),
                            });
                        }}
                        disabled={loading || !propertyId}
                        className="w-full"
                        variant="outline"
                    >
                        Calcular Precio
                    </Button>
                </Card>
            </div>

            {/* Respuesta */}
            <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">📡 Respuesta del Servidor</h2>

                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-script9-magenta"></div>
                        <p className="mt-2 text-gray-600">Cargando...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 font-bold">❌ Error:</p>
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {response && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-bold ${response.status >= 200 && response.status < 300
                                    ? 'bg-green-100 text-green-800'
                                    : response.status >= 400
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {response.status} {response.statusText}
                            </span>
                        </div>

                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                            {JSON.stringify(response.data, null, 2)}
                        </pre>
                    </div>
                )}

                {!loading && !error && !response && (
                    <div className="text-center py-8 text-gray-500">
                        <p>Selecciona una prueba para ver la respuesta aquí</p>
                    </div>
                )}
            </Card>

            {/* Instrucciones */}
            <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold text-lg mb-2">📖 Instrucciones</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>
                        <strong>Verifica tu sesión:</strong> Haz clic en "Verificar Sesión
                        Actual" para asegurarte de que estás autenticado.
                    </li>
                    <li>
                        <strong>Obtén IDs reales:</strong> Necesitas IDs reales de
                        propiedades y reservas de tu base de datos Supabase.
                    </li>
                    <li>
                        <strong>Ingresa los IDs:</strong> Copia y pega los UUIDs en los
                        campos de configuración arriba.
                    </li>
                    <li>
                        <strong>Prueba los endpoints:</strong> Haz clic en los botones para
                        probar cada funcionalidad.
                    </li>
                    <li>
                        <strong>Revisa las respuestas:</strong> Los resultados aparecerán
                        en la sección "Respuesta del Servidor".
                    </li>
                </ol>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm">
                        <strong>⚠️ Nota:</strong> Esta página es solo para desarrollo.
                        Elimínala antes de ir a producción o protégela con autenticación de
                        admin.
                    </p>
                </div>
            </Card>
        </div>
    );
}



