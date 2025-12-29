"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CRMLead } from '@/types/agent';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

export default function AdminCRMPage() {
    const [leads, setLeads] = useState<CRMLead[]>([]);
    const [loading, setLoading] = useState(true);
    // const supabase = createBrowserSupabaseClient(); // Removed

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        const { data } = await supabase
            .from('crm_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setLeads(data as any);
        setLoading(false);
    };

    const columnHelper = createColumnHelper<CRMLead>();

    const columns = [
        columnHelper.accessor('name', {
            header: 'Nombre',
            cell: info => info.getValue() || <span className="text-zinc-400">Sin nombre</span>,
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue() || <span className="text-zinc-400">-</span>,
        }),
        columnHelper.accessor('status', {
            header: 'Estado',
            cell: info => {
                const colors: Record<string, string> = {
                    new: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100',
                    contacted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
                    converted: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
                    lost: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100',
                };
                const labels: Record<string, string> = {
                    new: 'NUEVO',
                    contacted: 'CONTACTADO',
                    qualified: 'CUALIFICADO',
                    converted: 'CONVERTIDO',
                    lost: 'PERDIDO'
                };
                return (
                    <Badge className={colors[info.getValue()] || 'bg-zinc-100 text-zinc-800'}>
                        {labels[info.getValue()] || info.getValue().toUpperCase()}
                    </Badge>
                );
            },
        }),
        columnHelper.accessor('source', {
            header: 'Origen',
            cell: info => <span className="capitalize">{info.getValue()}</span>,
        }),
        columnHelper.accessor('created_at', {
            header: 'Fecha',
            cell: info => new Date(info.getValue()).toLocaleDateString(),
        }),
    ];

    const table = useReactTable({
        data: leads,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-950">
            <div className="text-emerald-500">Cargando CRM...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto py-10 space-y-8 relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">CRM & Agente IA</h1>
                        <p className="text-slate-400 mt-2">Gestión de leads capturados por el asistente comercial.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Leads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{leads.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-400">Conversión Hoy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-500">
                                {leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Leads capturados últimas 24h</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-400">Presupuestos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-500">-</div>
                            <p className="text-xs text-slate-500 mt-1">Generados automáticamente</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Leads Table */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="border-b border-slate-800/50">
                        <CardTitle className="text-white">Últimos Leads</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-0">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-950/50 border-b border-slate-800">
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className="h-12 px-6 text-left align-middle font-medium text-slate-400 uppercase tracking-wider text-xs">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {table.getRowModel().rows.length === 0 ? (
                                        <tr>
                                            <td colSpan={columns.length} className="h-32 text-center text-slate-500">
                                                No hay leads todavía. ¡Habla con el agente!
                                            </td>
                                        </tr>
                                    ) : (
                                        table.getRowModel().rows.map(row => (
                                            <tr key={row.id} className="transition-colors hover:bg-slate-800/50">
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id} className="p-6 align-middle text-slate-300">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
