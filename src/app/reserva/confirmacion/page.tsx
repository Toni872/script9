'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, Zap, User, CreditCard, Download, ArrowRight, Sparkles, ShieldCheck, Mail, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface OrderData {
    serviceId: string;
    serviceTitle: string;
    purchaseDate: string;
    total: number;
    customerName: string;
    customerEmail: string;
    image?: string;
}

export default function ConfirmacionPedido() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [orderId, setOrderId] = useState<string>('');

    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        if (sessionId) {
            fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
                .then(res => {
                    if (!res.ok) throw new Error('Session not found');
                    return res.json();
                })
                .then(data => {
                    setOrderData({
                        serviceId: data.property.id,
                        serviceTitle: data.property.title,
                        purchaseDate: new Date().toISOString(),
                        total: data.booking.total,
                        customerName: data.booking.customerName || 'Cliente',
                        customerEmail: data.booking.customerEmail || '',
                        image: data.property.image
                    });
                    setOrderId(sessionId.slice(-8).toUpperCase());
                })
                .catch(err => {
                    console.error(err);
                    // Fallback using random data for demo if API fails/local
                    // In prod this should fail gracefully
                    const savedBooking = localStorage.getItem('lastBooking');
                    if (savedBooking) {
                        try {
                            const data = JSON.parse(savedBooking);
                            setOrderData({
                                serviceId: data.propertyId,
                                serviceTitle: data.propertyTitle,
                                purchaseDate: new Date().toISOString(),
                                total: data.total,
                                customerName: data.customerName,
                                customerEmail: data.customerEmail,
                            });
                            setOrderId(`SCR-${Date.now().toString().slice(-6)}`);
                        } catch (e) { console.error("Error loading local fallback", e); }
                    }
                });
        }
    }, [searchParams]);

    const formatDate = (dateString: string) => {
        return new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleDownloadReceipt = () => {
        alert('Tu factura estará disponible en tu panel de usuario en unos minutos.');
    };

    if (!orderData) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full border border-gray-100">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 border-4 border-[#10B981]/20 rounded-full animate-ping"></div>
                        <div className="relative z-10 w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-bold text-[#333333] mb-2">Verificando pedido...</h3>
                    <p className="text-gray-500 text-sm">Por favor, espera un momento.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-[#003D82] z-0" />
            <div className="absolute top-0 left-0 w-full h-[300px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />

            <div className="relative z-10 container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Success Card Header */}
                    <div className="text-center mb-10 text-white">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-[#4CAF50] shadow-2xl mb-6"
                        >
                            <CheckCircle className="h-10 w-10" strokeWidth={3} />
                        </motion.div>
                        <h1 className="text-4xl font-bold mb-2 tracking-tight">¡Pedido Confirmado!</h1>
                        <p className="text-blue-100 text-lg">Tu orden ha sido procesada exitosamente.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-8 border-b border-gray-100">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">ID de Referencia</p>
                                                <p className="font-mono text-xl font-bold text-[#333333]">#{orderId}</p>
                                            </div>
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 px-4 py-1.5 text-sm font-semibold rounded-full">
                                                Pago Exitoso
                                            </Badge>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                                                {orderData.image ? (
                                                    <img src={orderData.image} alt="Service" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Zap className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-[#333333] mb-2">{orderData.serviceTitle}</h2>
                                                <p className="text-gray-600 mb-2 line-clamp-2">Servicio de automatización profesional.</p>
                                                <Link href={`/catalogo/${orderData.serviceId}`} className="text-[#003D82] hover:text-[#10B981] text-sm font-semibold flex items-center gap-1 transition-colors">
                                                    Ver detalles del servicio <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details Grid */}
                                    <div className="p-8 bg-gray-50/50">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-blue-50 rounded-lg text-[#003D82]">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Fecha</p>
                                                    <p className="text-sm font-semibold text-[#333333]">{formatDate(orderData.purchaseDate)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                                    <Zap className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Entrega</p>
                                                    <p className="text-sm font-semibold text-[#333333]">Digital / Inmediata</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-pink-50 rounded-lg text-[#10B981]">
                                                    <CreditCard className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total</p>
                                                    <p className="text-xl font-bold text-[#333333]">€{orderData.total.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Cliente</p>
                                                    <p className="text-sm font-semibold text-[#333333]">{orderData.customerName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-8 py-6 border-t border-gray-100 bg-blue-50/30">
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-[#003D82] mt-0.5" />
                                            <p className="text-sm text-[#003D82]">
                                                Hemos enviado un correo de confirmación a <strong>{orderData.customerEmail}</strong> con los detalles de tu compra y los siguientes pasos.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-white border-0 shadow-lg rounded-2xl p-6">
                                <h3 className="font-bold text-[#333333] mb-4">Acciones Rápidas</h3>
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => router.push('/dashboard')}
                                        className="w-full bg-[#10B981] hover:bg-[#059669] text-white shadow-md hover:shadow-lg transition-all h-12 text-base font-semibold"
                                    >
                                        Ir a mi Dashboard
                                    </Button>
                                    <Button
                                        onClick={handleDownloadReceipt}
                                        variant="outline"
                                        className="w-full border-gray-200 hover:bg-gray-50 text-[#333333] h-11"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Descargar Factura
                                    </Button>
                                    <Button
                                        onClick={() => router.push('/catalogo')}
                                        variant="ghost"
                                        className="w-full text-[#003D82] hover:text-[#002E5C] hover:bg-blue-50 h-11"
                                    >
                                        Seguir comprando <MoveRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </Card>

                            <Card className="bg-gradient-to-br from-[#003D82] to-[#002E5C] border-0 shadow-lg rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <ShieldCheck className="w-6 h-6 text-[#4CAF50]" />
                                        <h3 className="font-bold text-lg">Garantía Script9</h3>
                                    </div>
                                    <p className="text-blue-100 text-sm mb-4">
                                        Tienes 14 días de soporte premium incluido con tu compra para asegurar una implementación exitosa.
                                    </p>
                                    <Link href="/soporte" className="text-white underline text-sm hover:text-white/80 transition-colors">
                                        Contactar Soporte
                                    </Link>
                                </div>
                                {/* Abstract shape */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
