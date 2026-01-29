
import { Metadata } from 'next';
import { Shield, Lock, FileText, Scale } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Script9',
    description: 'Política de privacidad y protección de datos de Script9.',
};

export default function PrivacidadPage() {
    return (
        <div className="bg-slate-950 min-h-screen pt-32 pb-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-6 ring-1 ring-emerald-500/20">
                        <Lock className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Privacidad</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-mono bg-slate-900/50 inline-block px-4 py-1.5 rounded-full border border-slate-800 mx-auto">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Última actualización: Enero 2026
                    </div>
                </div>

                {/* Content Container */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-p:text-slate-400 prose-p:leading-relaxed prose-li:text-slate-400 prose-strong:text-emerald-400 prose-a:text-emerald-400 hover:prose-a:text-emerald-300">

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                        <p className="lead text-xl text-slate-300 mb-10 border-b border-slate-800 pb-10">
                            En Script9, nos tomamos muy en serio tu privacidad. Esta política describe con transparencia cómo recopilamos, usamos y protegemos tu infraestructura digital y datos personales.
                        </p>

                        <section className="space-y-12">
                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-emerald-500">01</span>
                                    Responsable del Tratamiento
                                </h3>
                                <p>
                                    Script9 opera como el responsable del tratamiento de los datos. Para cualquier asunto relacionado con seguridad o privacidad, nuestro canal directo de ingeniería está abierto en <a href="mailto:contact@script-9.com" className="no-underline border-b border-emerald-500/30 hover:border-emerald-500 transition-colors">contact@script-9.com</a>.
                                </p>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-emerald-500">02</span>
                                    Datos que Recopilamos
                                </h3>
                                <p>Limitamos la recolección a lo estrictamente necesario para la operación técnica:</p>
                                <ul className="space-y-2 mt-4 marker:text-emerald-500">
                                    <li><strong>Datos de Identificación:</strong> Credenciales de acceso, email corporativo y teléfono de contacto técnico.</li>
                                    <li><strong>Datos Transaccionales:</strong> Historial de servicios contratados (procesados vía Stripe, sin almacenar datos bancarios sensibles).</li>
                                    <li><strong>Telemetría Técnica:</strong> Logs de uso de la plataforma, direcciones IP y métricas de rendimiento para optimización del sistema.</li>
                                </ul>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-emerald-500">03</span>
                                    Finalidad del Tratamiento
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                        <h4 className="text-white text-base font-semibold mb-2 mt-0">Operativa</h4>
                                        <p className="text-sm m-0">Despliegue de servicios, gestión de accesos y facturación automatizada.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                        <h4 className="text-white text-base font-semibold mb-2 mt-0">Seguridad</h4>
                                        <p className="text-sm m-0">Detección de intrusiones, auditoría de logs y prevención de fraude.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                        <h4 className="text-white text-base font-semibold mb-2 mt-0">Comunicación</h4>
                                        <p className="text-sm m-0">Alertas de sistema, actualizaciones de APIs y soporte técnico.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                        <h4 className="text-white text-base font-semibold mb-2 mt-0">Mejora</h4>
                                        <p className="text-sm m-0">Análisis de patrones de uso para optimizar nuestros algoritmos.</p>
                                    </div>
                                </div>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-emerald-500">04</span>
                                    Infraestructura y Terceros
                                </h3>
                                <p>
                                    No comercializamos datos. Nuestra arquitectura se integra con proveedores líderes bajo estrictos acuerdos de procesamiento de datos (DPA):
                                </p>
                                <ul className="space-y-1 mt-4 marker:text-emerald-500">
                                    <li><strong>Pagos:</strong> Stripe (PCI Service Provider Level 1).</li>
                                    <li><strong>Base de Datos:</strong> Supabase (PostgreSQL seguro en AWS).</li>
                                    <li><strong>Hosting:</strong> Vercel (Infraestructura Edge global).</li>
                                </ul>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-emerald-500">05</span>
                                    Tus Derechos (RGPD)
                                </h3>
                                <p className="mb-4">
                                    Mantenemos control total sobre tus datos. Puedes ejercer tus derechos en cualquier momento:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Acceso', 'Rectificación', 'Supresión', 'Portabilidad', 'Oposición'].map((right) => (
                                        <span key={right} className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                                            {right}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
                            <p className="text-sm text-slate-500 m-0">
                                ¿Dudas sobre nuestra arquitectura de seguridad? <br />
                                <a href="mailto:contact@script-9.com" className="no-underline text-emerald-400 font-medium hover:text-emerald-300">Contactar al equipo de seguridad &rarr;</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
