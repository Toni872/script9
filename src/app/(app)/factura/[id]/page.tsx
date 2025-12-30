'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Loader2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface InvoiceData {
    id: string;
    created_at: string;
    total_price: number;
    guest: {
        name: string;
        email: string;
    };
    properties: {
        title: string;
    };
}

export default function InvoicePage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<InvoiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchInvoice() {
            setLoading(true);
            const { data } = await supabase
                .from('bookings')
                .select(`
                    id,
                    created_at,
                    total_price,
                    guest:guest_id (name, email),
                    properties (title)
                `)
                .eq('id', params.id)
                .single();

            if (data) {
                setInvoice(data as unknown as InvoiceData);
            }
            setLoading(false);
        }
        fetchInvoice();
    }, [params.id, supabase]);

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;

    if (!invoice) return <div className="p-8 text-center">Factura no encontrada</div>;

    return (
        <div className="min-h-screen bg-white text-black p-8 max-w-4xl mx-auto font-sans">
            {/* Print Hider & Print Styles */}
            <style jsx global>{`
                @media print {
                    @page { size: auto; margin: 20mm; }
                    body { background: white; -webkit-print-color-adjust: exact; }
                }
            `}</style>

            <div className="print:hidden mb-8 flex justify-between items-center">
                <Link href="/dashboard">
                    <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard</Button>
                </Link>
                <div className="flex gap-4">
                    <Button
                        onClick={() => {
                            document.title = `Factura-${invoice.id.slice(0, 8)}`; // Nombre del archivo al guardar
                            window.print();
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all"
                    >
                        <Download className="mr-2 h-4 w-4" /> Descargar PDF
                    </Button>
                </div>
            </div>

            {/* Invoice Header */}
            <div className="border-b-2 border-gray-100 pb-8 mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">FACTURA</h1>
                    <p className="text-slate-500">#{invoice.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold mb-1">Script9 Deep Tech</div>
                    <p className="text-gray-500 text-sm">Servicios de Automatización</p>
                    <p className="text-gray-500 text-sm">Madrid, España</p>
                    <p className="text-gray-500 text-sm">facturacion@script9.com</p>
                </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">Facturar a:</h3>
                    <p className="font-bold text-lg">{invoice.guest?.name || 'Cliente'}</p>
                    <p className="text-gray-600">{invoice.guest?.email}</p>
                </div>
                <div className="text-right">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">Detalles:</h3>
                    <p className="flex justify-between md:justify-end gap-4">
                        <span className="text-gray-600">Fecha:</span>
                        <span className="font-bold">{new Date(invoice.created_at).toLocaleDateString()}</span>
                    </p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
                <thead className="bg-[#F8FAFC]">
                    <tr>
                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 uppercase">Descripción</th>
                        <th className="text-right py-3 px-4 text-sm font-bold text-gray-600 uppercase">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-100">
                        <td className="py-4 px-4">
                            <p className="font-bold text-[#333333]">{invoice.properties?.title}</p>
                            <p className="text-sm text-gray-500">Servicio profesional de automatización</p>
                        </td>
                        <td className="py-4 px-4 text-right font-bold">
                            €{invoice.total_price?.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-12">
                <div className="w-64 space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>€{(invoice.total_price / 1.21).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>IVA (21%)</span>
                        <span>€{(invoice.total_price - (invoice.total_price / 1.21)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-gray-200">
                        <span>Total</span>
                        <span>€{invoice.total_price?.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-100">
                <p>Gracias por confiar en Script9.</p>
                <p>Esta factura ha sido generada electrónicamente.</p>
            </div>
        </div>
    );
}
