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

    if (loading) return <div className="p-8">Cargando CRM...</div>;

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">CRM & Agente IA</h1>
                    <p className="text-zinc-500">Gestión de leads capturados por el asistente comercial.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leads.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversión Hoy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
                        </div>
                        <p className="text-xs text-zinc-500 text-muted-foreground">Leads capturados últimas 24h</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Presupuestos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-zinc-500 text-muted-foreground">Generados automáticamente</p>
                    </CardContent>
                </Card>
            </div>

            {/* Leads Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Ultimos Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-zinc-50/50 dark:bg-zinc-900">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-zinc-500">
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
                            <tbody>
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="h-24 text-center">
                                            No hay leads todavía. ¡Habla con el agente!
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map(row => (
                                        <tr key={row.id} className="border-b transition-colors hover:bg-zinc-50/50 data-[state=selected]:bg-zinc-50">
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className="p-4 align-middle">
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
    );
}
