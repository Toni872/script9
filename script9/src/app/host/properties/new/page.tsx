'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NuevaPropiedadPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        product_type: 'service', // service | digital_product
        download_url: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Error al guardar');
            }

            alert('✅ Producto publicado correctamente');
            router.push('/anfitrion/dashboard');
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-neutral-50 py-8">
            <div className="container-script9 max-w-2xl">
                <Link href="/anfitrion/dashboard" className="flex items-center text-brand-neutral-600 hover:text-brand-primary-600 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al Dashboard
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-brand-neutral-900">
                            Publicar Nuevo Script/Servicio
                        </h1>
                        <p className="text-brand-neutral-600">Añade un nuevo producto a tu catálogo</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card className="border-brand-primary-100 shadow-script9-md">
                        <CardHeader>
                            <CardTitle>Detalles del Producto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Título */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-neutral-700">Título del Script/Servicio</label>
                                <Input
                                    required
                                    placeholder="Ej: Chatbot IA para Inmobiliarias"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-neutral-700">Descripción Corta</label>
                                <Input
                                    required
                                    placeholder="Describe qué hace tu solución..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            {/* Precio */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-neutral-700">Precio (€)</label>
                                <Input
                                    required
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="99.99"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            {/* Tipo de Producto */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-neutral-700">Tipo de Entrega</label>
                                <select
                                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                                    value={formData.product_type}
                                    onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                                >
                                    <option value="service">🛠️ Servicio / Horas (Requiere Reserva)</option>
                                    <option value="digital_product">📦 Producto Digital (Descarga Directa)</option>
                                </select>
                                <p className="text-xs text-brand-neutral-500">
                                    Elige "Producto Digital" si vendes un archivo zip/código listo para usar.
                                </p>
                            </div>

                            {/* URL de Descarga (Condicional) */}
                            {formData.product_type === 'digital_product' && (
                                <div className="p-4 bg-brand-primary-50 rounded-lg border border-brand-primary-100 space-y-3 animation-fade-in">
                                    <div className="flex items-center gap-2 text-brand-primary-700 font-medium">
                                        <Upload className="h-4 w-4" />
                                        Configuración de Descarga
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-brand-neutral-700">URL del Archivo (.zip, .py, .js)</label>
                                        <Input
                                            required={formData.product_type === 'digital_product'}
                                            placeholder="https://r2.script-9.com/mis-archivos/bot-v1.zip"
                                            value={formData.download_url}
                                            onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                                        />
                                        <p className="text-xs text-brand-neutral-500">
                                            Pega aquí el enlace directo a tu archivo (Dropbox, Drive, S3, R2). El cliente lo recibirá por email tras pagar.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-script9 text-white hover:shadow-script9-glow"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Publicar Producto'}
                                {!loading && <Save className="h-4 w-4 ml-2" />}
                            </Button>

                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}
