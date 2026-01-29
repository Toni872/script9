
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { CRMLead } from '@/types/agent';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MoreHorizontal } from 'lucide-react';

interface CRMKanbanProps {
    leads: CRMLead[];
    onStatusChange: (leadId: string, newStatus: string) => void;
    onLeadClick: (lead: CRMLead) => void;
}

const COLUMNS = [
    { id: 'new', title: 'Nuevos', color: 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400' },
    { id: 'contacted', title: 'Contactados', color: 'border-blue-500/50 bg-blue-500/5 text-blue-400' },
    { id: 'converted', title: 'Ganados', color: 'border-purple-500/50 bg-purple-500/5 text-purple-400' },
    { id: 'lost', title: 'Perdidos', color: 'border-slate-500/50 bg-slate-500/5 text-slate-400' },
];

export function CRMKanban({ leads, onStatusChange, onLeadClick }: CRMKanbanProps) {

    // Group leads by status
    const columns = COLUMNS.reduce((acc, col) => {
        acc[col.id] = leads.filter(l => l.status === col.id);
        return acc;
    }, {} as Record<string, CRMLead[]>);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        onStatusChange(draggableId, destination.droppableId);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-[calc(100vh-250px)] gap-4 overflow-x-auto pb-4">
                {COLUMNS.map(col => (
                    <div key={col.id} className="flex-shrink-0 w-80 flex flex-col">
                        {/* Column Header */}
                        <div className={`p-3 rounded-t-xl border-t border-x border-slate-800 ${col.color} backdrop-blur-sm mb-2 flex justify-between items-center`}>
                            <h3 className="font-bold text-sm uppercase tracking-wider">{col.title}</h3>
                            <Badge variant="outline" className="bg-slate-900/50 border-slate-700 text-slate-300">
                                {columns[col.id]?.length || 0}
                            </Badge>
                        </div>

                        {/* Droppable Area */}
                        <Droppable droppableId={col.id}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`flex-1 rounded-xl bg-slate-900/20 border border-slate-800/50 p-2 space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-slate-800/30 ring-2 ring-emerald-500/20' : ''
                                        }`}
                                >
                                    {columns[col.id]?.map((lead, index) => (
                                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => onLeadClick(lead)}
                                                    style={{ ...provided.draggableProps.style }}
                                                    className={`
                                                        group relative bg-slate-800/80 hover:bg-slate-800 border-l-4 rounded-r-lg p-3 cursor-grab active:cursor-grabbing shadow-sm transition-all
                                                        ${col.id === 'new' ? 'border-l-emerald-500' :
                                                            col.id === 'contacted' ? 'border-l-blue-500' :
                                                                col.id === 'converted' ? 'border-l-purple-500' : 'border-l-slate-500'}
                                                        ${snapshot.isDragging ? 'shadow-2xl scale-105 z-50 ring-2 ring-emerald-500/50' : ''}
                                                    `}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="font-medium text-slate-200 text-sm line-clamp-1">
                                                            {lead.name || 'Sin Nombre'}
                                                        </span>
                                                        <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                                                        {lead.message || 'Sin mensaje previo...'}
                                                    </p>

                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(lead.created_at).toLocaleDateString()}
                                                        </span>
                                                        <span className="bg-slate-950 px-1.5 py-0.5 rounded text-[10px] uppercase">
                                                            {lead.source}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
}
