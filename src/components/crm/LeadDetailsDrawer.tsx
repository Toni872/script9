
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Trash2, Phone, Calendar, Globe, Building, User, Clock, Zap } from 'lucide-react';
import { CRMLead } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LeadDetailsDrawerProps {
    lead: CRMLead | null;
    onClose: () => void;
    onStatusChange: (status: string) => void;
    onDelete: (id: string) => void;
}

export function LeadDetailsDrawer({ lead, onClose, onStatusChange, onDelete }: LeadDetailsDrawerProps) {
    if (!lead) return null;

    return (
        <AnimatePresence>
            {lead && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="relative p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-20">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {lead.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white leading-tight">{lead.name || 'Usuario Desconocido'}</h2>
                                    <p className="text-slate-400 text-sm">{lead.email}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 items-center">
                                <div className="relative group">
                                    <select
                                        value={lead.status}
                                        onChange={(e) => onStatusChange(e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    >
                                        <option value="new">NUEVO</option>
                                        <option value="contacted">CONTACTADO</option>
                                        <option value="converted">GANADO</option>
                                        <option value="lost">PERDIDO</option>
                                    </select>
                                    <Badge className={`
                    ${lead.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                    ${lead.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                    ${lead.status === 'converted' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
                    ${lead.status === 'lost' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : ''}
                    border px-3 py-1 uppercase tracking-wider text-xs font-semibold group-hover:border-white/40 transition-colors
                 `}>
                                        {lead.status === 'new' ? 'NUEVO' :
                                            lead.status === 'contacted' ? 'CONTACTADO' :
                                                lead.status === 'converted' ? 'GANADO' : lead.status}
                                    </Badge>
                                    <span className="text-xs text-slate-500 flex items-center bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 grid grid-cols-2 gap-3">
                            <Button
                                onClick={() => window.open(`mailto:${lead.email}`)}
                                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 justify-center"
                            >
                                <Mail className="w-4 h-4" /> Enviar Email
                            </Button>
                            <Button
                                onClick={() => {
                                    // Mock WhatsApp URL - assuming phone if available or just generic
                                    window.open(`https://wa.me/?text=Hola ${lead.name}, te contacto desde Script9...`)
                                }}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 flex items-center gap-2 justify-center shadow-lg shadow-emerald-500/20"
                            >
                                <MessageSquare className="w-4 h-4" /> WhatsApp
                            </Button>
                        </div>

                        {/* AI Summary Section */}
                        <div className="px-6 pb-6">
                            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
                                <h3 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4" /> Análisis de IA
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    El cliente parece interesado en **automatización de procesos**.
                                    {lead.message
                                        ? ` Menciona específicamente: "${lead.message.substring(0, 100)}..."`
                                        : ' No ha dejado mensaje detallado.'}
                                    <br /><br />
                                    <span className="text-slate-500 text-xs uppercase font-bold">Acción Sugerida:</span><br />
                                    Contactar para ofrecer una auditoría inicial gratuita.
                                </p>
                            </div>
                        </div>

                        {/* Detailed Info */}
                        <div className="px-6 space-y-6">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Información de Contacto</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-lg">
                                        <Mail className="w-5 h-5 text-slate-400" />
                                        <span className="text-slate-200 text-sm select-all">{lead.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-lg">
                                        <Globe className="w-5 h-5 text-slate-400" />
                                        <span className="text-slate-200 text-sm">{lead.source?.toUpperCase() || 'WEB DIRECTA'}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Mensaje Original</h4>
                                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 min-h-[100px] text-slate-300 text-sm whitespace-pre-wrap">
                                    {lead.message || 'Sin mensaje adjunto.'}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-800">
                                <Button
                                    variant="destructive"
                                    className="w-full opacity-80 hover:opacity-100"
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de que quieres eliminar este lead?')) {
                                            onDelete(lead.id);
                                            onClose();
                                        }
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar Lead
                                </Button>
                            </div>
                        </div>

                        <div className="h-20" /> {/* Bottom spacer */}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
