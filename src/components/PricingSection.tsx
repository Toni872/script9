'use client';

import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PricingSection() {
    return (
        <section className="py-24 bg-gray-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-30 relative overflow-hidden" id="precios">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003D82]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EF4444]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container-script9 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center rounded-full border border-[#003D82]/10 bg-[#003D82]/5 px-3 py-1 text-sm font-medium text-[#003D82] mb-4">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Planes Flexibles
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#333333] mb-4">
                        Inversión inteligente para tu negocio
                    </h2>
                    <p className="text-lg text-gray-600">
                        Elige el nivel de automatización que necesitas. Sin costes ocultos.
                        Resultados entregados en menos de 48h.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Starter Plan */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 relative group">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#333333]">Audit & Script</h3>
                            <p className="text-sm text-gray-500 mt-2">Para empezar a optimizar tareas puntuales.</p>
                            <div className="mt-6 flex items-baseline">
                                <span className="text-3xl font-bold text-[#333333]">€99</span>
                                <span className="text-gray-500 ml-2">/proyecto</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                Auditoría de procesos actuales
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                1 Script de Automatización (Python/JS)
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                Documentación de uso básica
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                Entrega en 48 horas
                            </li>
                        </ul>
                        <Link href="/catalogo?plan=starter">
                            <Button variant="outline" className="w-full border-[#003D82] text-[#003D82] hover:bg-blue-50 font-semibold h-12">
                                Seleccionar Starter
                            </Button>
                        </Link>
                    </div>

                    {/* Pro Plan (Highlighted) */}
                    <div className="bg-[#003D82] rounded-2xl shadow-2xl p-8 transform md:-translate-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#EF4444] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            MÁS POPULAR
                        </div>
                        <div className="mb-8 relative z-10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" />
                                Workflow Pro
                            </h3>
                            <p className="text-blue-100 text-sm mt-2">Automatización completa de un área de negocio.</p>
                            <div className="mt-6 flex items-baseline text-white">
                                <span className="text-4xl font-bold">€299</span>
                                <span className="text-blue-200 ml-2">/flujo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 relative z-10">
                            <li className="flex items-center text-gray-100">
                                <div className="p-1 bg-white/20 rounded-full mr-3">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                <strong>Análisis exhaustivo de flujos</strong>
                            </li>
                            <li className="flex items-center text-gray-100">
                                <div className="p-1 bg-white/20 rounded-full mr-3">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                Integración Multi-Plataforma (API)
                            </li>
                            <li className="flex items-center text-gray-100">
                                <div className="p-1 bg-white/20 rounded-full mr-3">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                Dashboard de Control a Medida
                            </li>
                            <li className="flex items-center text-gray-100">
                                <div className="p-1 bg-white/20 rounded-full mr-3">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                Soporte Prioritario 14 días
                            </li>
                        </ul>
                        <Link href="/catalogo?plan=pro">
                            <Button className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold h-12 shadow-lg">
                                Empezar Transformación
                            </Button>
                        </Link>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 skew-x-12 animate-shimmer pointer-events-none"></div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#333333]">Enterprise Partner</h3>
                            <p className="text-sm text-gray-500 mt-2">Para empresas que buscan escalar con IA.</p>
                            <div className="mt-6 flex items-baseline">
                                <span className="text-3xl font-bold text-[#333333]">Personalizado</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                Consultoría Estratégica Mensual
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                Desarrollo de Agentes IA Propios
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                Mantenimiento Evolutivo
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Check className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                SLA Garantizado
                            </li>
                        </ul>
                        <Link href="/contacto">
                            <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold h-12">
                                Contactar Ventas
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
