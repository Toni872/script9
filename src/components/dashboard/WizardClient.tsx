'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Zap, MessageSquare, Briefcase, Code, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function WizardClient() {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState<{ goal?: string; platform?: string }>({});
    const router = useRouter();

    const totalSteps = 3;

    const handleNext = (key: string, value: string) => {
        setSelection({ ...selection, [key]: value });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <Card className="h-full min-h-[calc(100vh-8rem)] bg-slate-900/50 border-slate-800 shadow-sm flex flex-col backdrop-blur-sm">
            {/* Header Wizard */}
            <div className="border-b border-slate-800 py-6 px-8">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <span className="font-semibold text-white">Nuevo Proyecto</span>
                    </div>
                    <div className="text-sm font-medium text-emerald-400">
                        Paso {step} de {totalSteps}
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="max-w-3xl mx-auto mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-2xl w-full mx-auto pt-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">¿Cuál es tu objetivo principal?</h1>
                                    <p className="text-slate-400">Selecciona la meta más importante para tu negocio ahora mismo.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <OptionCard
                                        icon={Zap}
                                        title="Automatizar Tareas"
                                        desc="Ahorrar tiempo en procesos repetitivos."
                                        onClick={() => handleNext('goal', 'automation')}
                                    />
                                    <OptionCard
                                        icon={MessageSquare}
                                        title="Mejorar Atención"
                                        desc="Chatbots y respuestas automáticas."
                                        onClick={() => handleNext('goal', 'chatbots')}
                                    />
                                    <OptionCard
                                        icon={Briefcase}
                                        title="Escalar Ventas"
                                        desc="CRMs y embudos de conversión."
                                        onClick={() => handleNext('goal', 'sales')}
                                    />
                                    <OptionCard
                                        icon={Code}
                                        title="Desarrollo a Medida"
                                        desc="Scripts y aplicaciones específicas."
                                        onClick={() => handleNext('goal', 'dev')}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">¿Dónde opera tu negocio?</h1>
                                    <p className="text-slate-400">¿En qué plataforma necesitas la integración?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <OptionCard
                                        icon={MessageSquare}
                                        title="WhatsApp / Redes"
                                        desc="Interacción directa con clientes."
                                        onClick={() => handleNext('platform', 'social')}
                                    />
                                    <OptionCard
                                        icon={Briefcase}
                                        title="Web / E-commerce"
                                        desc="Tu tienda o sitio web."
                                        onClick={() => handleNext('platform', 'web')}
                                    />
                                    <OptionCard
                                        icon={Zap}
                                        title="Interno / Oficina"
                                        desc="Excel, Email, CRMs."
                                        onClick={() => handleNext('platform', 'internal')}
                                    />
                                </div>
                                <div className="flex justify-center mt-8">
                                    <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-white hover:bg-slate-800">Volver atrás</Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8"
                            >
                                <div className="w-20 h-20 bg-emerald-900/20 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-10 h-10 text-emerald-500" />
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-4">¡Análisis completado!</h1>
                                    <p className="text-xl text-slate-400 max-w-lg mx-auto">
                                        Hemos identificado una oportunidad clara para mejorar tu <strong className="text-emerald-400">{getGoalLabel(selection.goal)}</strong> en <strong className="text-emerald-400">{getPlatformLabel(selection.platform)}</strong>.
                                    </p>
                                </div>

                                <Card className="max-w-md mx-auto border-2 border-emerald-500/50 shadow-xl shadow-emerald-900/20 overflow-hidden relative bg-slate-900">
                                    <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        SIGUIENTE PASO
                                    </div>
                                    <CardContent className="p-8">
                                        <h3 className="text-2xl font-bold text-white mb-4">Sesión de Validación Técnica</h3>

                                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                            Debido a la naturaleza personalizada de nuestras soluciones "Deep Tech", el siguiente paso es validar la viabilidad técnica de tu idea con un ingeniero senior.
                                        </p>

                                        <ul className="text-left space-y-3 mb-8 text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="text-sm">Análisis de viabilidad gratuito</span></li>
                                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="text-sm">Estimación de tiempos y costes</span></li>
                                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="text-sm">Sin compromiso de contratación</span></li>
                                        </ul>

                                        <div className="space-y-3">
                                            <Button
                                                className="w-full bg-emerald-600 hover:bg-emerald-500 h-12 text-lg text-white shadow-lg shadow-emerald-900/20 group"
                                                onClick={() => router.push('/contacto?tab=calendar')}
                                            >
                                                <Zap className="w-5 h-5 mr-2 group-hover:text-yellow-300 transition-colors" />
                                                Agendar con un Experto
                                            </Button>
                                            <p className="text-xs text-slate-500 mt-2">
                                                Reserva directa en el calendario de nuestros ingenieros.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Card>
    );
}

function OptionCard({ icon: Icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) {
    return (
        <Card
            className="cursor-pointer bg-slate-950 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
            onClick={onClick}
        >
            <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors border border-slate-800 group-hover:border-emerald-500/30">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{desc}</p>
            </CardContent>
        </Card>
    );
}

function getGoalLabel(goal?: string) {
    if (goal === 'automation') return 'Automatización';
    if (goal === 'chatbots') return 'Atención al Cliente';
    if (goal === 'sales') return 'Ventas';
    return 'Desarrollo';
}

function getPlatformLabel(platform?: string) {
    if (platform === 'social') return 'Redes Sociales';
    if (platform === 'web') return 'Web / Ecommerce';
    return 'Entorno Interno';
}
