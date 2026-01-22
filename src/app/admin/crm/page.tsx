"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CRMLead } from '@/types/agent';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Users, TrendingUp, FileText, Search, Filter, Sparkles } from 'lucide-react';
import { CRMKanban } from '@/components/crm/CRMKanban';
import { LeadDetailsDrawer } from '@/components/crm/LeadDetailsDrawer';
import { CreateLeadModal } from '@/components/crm/CreateLeadModal';
import { LayoutGrid, List as ListIcon, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminCRMPage() {
    const [leads, setLeads] = useState<CRMLead[]>([]);
    const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        const { data } = await supabase
            .from('crm_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setLeads(data as CRMLead[]);
        setLoading(false);
    };

    const handleStatusChange = async (leadId: string, newStatus: string) => {
        // Optimistic update
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus as CRMLead['status'] } : l));
        if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead({ ...selectedLead, status: newStatus as CRMLead['status'] });
        }

        const { error } = await supabase
            .from('crm_leads')
            .update({ status: newStatus })
            .eq('id', leadId);

        if (error) {
            console.error('Error updating status:', error);
            fetchLeads(); // Revert on error
        }
    };

    const handleDeleteLead = async (leadId: string) => {
        // Optimistic update
        setLeads(prev => prev.filter(l => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead(null);
        }

        const { error } = await supabase
            .from('crm_leads')
            .delete()
            .eq('id', leadId);

        if (error) {
            console.error('Error deleting lead:', error);
            fetchLeads(); // Revert on error
        }
    };

    const columnHelper = createColumnHelper<CRMLead>();

    const columns = [
        columnHelper.accessor('name', {
            header: 'Cliente',
            cell: info => (
                <div className="flex flex-col">
                    <span className="font-medium text-white">{info.getValue() || 'Sin nombre'}</span>
                    <span className="text-xs text-slate-500">{info.row.original.email}</span>
                </div>
            ),
        }),
        columnHelper.accessor('status', {
            header: 'Estado',
            cell: info => {
                const status = info.getValue() as string;
                const config: Record<string, { color: string, label: string, glow: string }> = {
                    new: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', label: 'NUEVO', glow: 'shadow-[0_0_10px_rgba(52,211,153,0.3)]' },
                    contacted: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', label: 'CONTACTADO', glow: 'shadow-[0_0_10px_rgba(96,165,250,0.3)]' },
                    converted: { color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', label: 'GANADO', glow: 'shadow-[0_0_10px_rgba(192,132,252,0.3)]' },
                    lost: { color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', label: 'PERDIDO', glow: '' },
                };

                const style = config[status] || { color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', label: status.toUpperCase(), glow: '' };

                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.color} ${style.glow} transition-all duration-300`}>
                        {style.label}
                    </div>
                );
            },
        }),
        columnHelper.accessor('source', {
            header: 'Origen',
            cell: info => (
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-slate-800 rounded-md text-xs text-slate-300 border border-slate-700 uppercase tracking-wider">
                        {info.getValue() || 'WEB'}
                    </span>
                </div>
            ),
        }),
        columnHelper.accessor('created_at', {
            header: 'Fecha',
            cell: info => (
                <span className="text-slate-400 text-sm font-mono">
                    {new Date(info.getValue()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                </span>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: '',
            cell: () => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Assuming props.onSelect passed or using context, but row click handles it.
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                >
                    Ver detalles
                </button>
            )
        })
    ];

    const filteredLeads = leads.filter(lead => {
        if (filterStatus === 'all') return true;
        return lead.status === filterStatus;
    });

    const table = useReactTable({
        data: filteredLeads,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-950">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden font-sans">
            {/* Deep Tech Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container mx-auto py-10 space-y-8 relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800/50 pb-6 gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                            CRM <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Inteligente</span>
                        </h1>
                        <p className="text-slate-400 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            Gestión de oportunidades potenciada por IA
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                        {/* View Toggles */}
                        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <ListIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('kanban')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Actions Group */}
                        <div className="flex gap-3 flex-1 justify-end">
                            <div className="w-[180px]">
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-slate-300 h-10">
                                        <div className="flex items-center gap-2">
                                            <Filter className="w-4 h-4" />
                                            <SelectValue placeholder="Filtrar por..." />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos los estados</SelectItem>
                                        <SelectItem value="new">Nuevos</SelectItem>
                                        <SelectItem value="contacted">Contactados</SelectItem>
                                        <SelectItem value="converted">Ganados</SelectItem>
                                        <SelectItem value="lost">Perdidos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex items-center gap-2 px-4 h-10 bg-emerald-600 rounded-lg text-white font-medium shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all text-sm whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Nuevo Lead</span>
                                <span className="sm:hidden">Nuevo</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* KPI Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid gap-6 md:grid-cols-3"
                >
                    <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Leads</CardTitle>
                            <Users className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">{leads.length}</div>
                            <p className="text-xs text-slate-500 mt-1">Acumulado histórico</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-slate-400">Nuevos (24h)</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">
                                {leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
                            </div>
                            <p className="text-xs text-blue-400 mt-1">Oportunidades frescas</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-slate-400">Tasa de Conversión</CardTitle>
                            <FileText className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">--%</div>
                            <p className="text-xs text-slate-500 mt-1">Calculando métricas...</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o empresa..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                </div>

                {/* Data Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {viewMode === 'kanban' ? (
                        <CRMKanban
                            leads={filteredLeads}
                            onStatusChange={handleStatusChange}
                            onLeadClick={setSelectedLead}
                        />
                    ) : (
                        <div className="rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-xl">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-950/80 border-b border-slate-800">
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className="h-12 px-6 text-left align-middle font-medium text-slate-400 font-mono text-xs uppercase tracking-wider">
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {table.getRowModel().rows.length === 0 ? (
                                        <tr>
                                            <td colSpan={columns.length} className="h-32 text-center">
                                                <div className="flex flex-col items-center justify-center text-slate-500">
                                                    <Users className="h-8 w-8 mb-2 opacity-50" />
                                                    <p>No hay leads registrados aún.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        table.getRowModel().rows.map(row => (
                                            <tr
                                                key={row.id}
                                                onClick={() => setSelectedLead(row.original)}
                                                className="group transition-colors hover:bg-slate-800/40 cursor-pointer"
                                            >
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id} className="p-4 align-middle group-hover:text-white transition-colors">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </div>

            <LeadDetailsDrawer
                lead={selectedLead}
                onClose={() => setSelectedLead(null)}
                onStatusChange={(status) => selectedLead && handleStatusChange(selectedLead.id, status)}
                onDelete={(id) => handleDeleteLead(id)}
            />

            <CreateLeadModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onLeadCreated={fetchLeads}
            />
        </div>
    );
}
