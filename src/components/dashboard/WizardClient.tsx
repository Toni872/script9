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
        <Card className="h-full min-h-[calc(100vh-8rem)] bg-white border-gray-200 shadow-sm flex flex-col">
            {/* Header Wizard */}
            <div className="border-b border-gray-100 py-6 px-8">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <span className="font-semibold text-gray-700">Nuevo Proyecto</span>
                    </div>
                    <div className="text-sm font-medium text-[#003D82]">
                        Paso {step} de {totalSteps}
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="max-w-3xl mx-auto mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#003D82] transition-all duration-500 ease-out"
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
                                    <h1 className="text-3xl font-bold text-[#333333] mb-2">¿Cuál es tu objetivo principal?</h1>
                                    <p className="text-gray-500">Selecciona la meta más importante para tu negocio ahora mismo.</p>
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
                                    <h1 className="text-3xl font-bold text-[#333333] mb-2">¿Dónde opera tu negocio?</h1>
                                    <p className="text-gray-500">¿En qué plataforma necesitas la integración?</p>
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
                                    <Button variant="ghost" onClick={handleBack}>Volver atrás</Button>
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
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-10 h-10 text-green-600 animate-pulse" />
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold text-[#333333] mb-4">¡Tenemos una recomendación!</h1>
                                    <p className="text-xl text-gray-600 max-w-lg mx-auto">
                                        Basado en tus objetivos de <strong>{getGoalLabel(selection.goal)}</strong> en <strong>{getPlatformLabel(selection.platform)}</strong>, te sugerimos:
                                    </p>
                                </div>

                                <Card className="max-w-md mx-auto border-2 border-[#003D82] shadow-xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 bg-[#003D82] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        RECOMENDADO
                                    </div>
                                    <CardContent className="p-8">
                                        <h3 className="text-2xl font-bold text-[#333333] mb-2">Pack Automatización Pro</h3>
                                        <div className="flex justify-center items-baseline gap-1 my-4">
                                            <span className="text-4xl font-bold text-[#003D82]">€499</span>
                                            <span className="text-gray-500">/proyecto</span>
                                        </div>
                                        <ul className="text-left space-y-3 mb-8 text-gray-600">
                                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Auditoría inicial incluida</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Desarrollo a medida</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Soporte prioritario</li>
                                        </ul>
                                        <div className="space-y-3">
                                            <Button className="w-full bg-[#003D82] hover:bg-[#002E5C] h-12 text-lg" onClick={() => router.push('/catalogo')}>
                                                Ver Detalles y Contratar
                                            </Button>
                                            <Button variant="outline" className="w-full" onClick={() => router.push('/soporte')}>
                                                Prefiero hablar con un experto
                                            </Button>
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
            className="cursor-pointer hover:border-[#003D82] hover:shadow-md transition-all group"
            onClick={onClick}
        >
            <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#003D82] transition-colors">
                    <Icon className="w-6 h-6 text-[#003D82] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
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
