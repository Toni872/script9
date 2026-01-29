
import { Metadata } from 'next';
import { Scale, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | Script9',
    description: 'Términos y condiciones de uso de la plataforma Script9.',
};

export default function TerminosPage() {
    return (
        <div className="bg-slate-950 min-h-screen pt-32 pb-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-6 ring-1 ring-blue-500/20">
                        <Scale className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Términos y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Condiciones</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-mono bg-slate-900/50 inline-block px-4 py-1.5 rounded-full border border-slate-800 mx-auto">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Última actualización: Enero 2026
                    </div>
                </div>

                {/* Content Container */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-p:text-slate-400 prose-p:leading-relaxed prose-li:text-slate-400 prose-strong:text-blue-400 prose-a:text-blue-400 hover:prose-a:text-blue-300">

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                        <p className="lead text-xl text-slate-300 mb-10 border-b border-slate-800 pb-10">
                            Bienvenido a Script9. Estos términos regulan el uso de nuestra plataforma de automatización y servicios de ingeniería. Al operar en nuestra infraestructura, aceptas este marco legal.
                        </p>

                        <section className="space-y-12">
                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-blue-500">01</span>
                                    Información General
                                </h3>
                                <p>
                                    Script9 ("nosotros", "la plataforma") es una consultora de ingeniería de software especializada en automatización B2B. Proveemos scripts, workflows de n8n, agentes IA y servicios de integración a medida para escalar operaciones digitales.
                                </p>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-blue-500">02</span>
                                    Uso de Servicios y Licencia
                                </h3>
                                <p>Al adquirir nuestros productos digitales o servicios, te otorgamos una licencia:</p>
                                <ul className="space-y-2 mt-4 marker:text-blue-500">
                                    <li><strong>Uso Operativo:</strong> Derecho a desplegar el código en tu propia infraestructura o clientes finales.</li>
                                    <li><strong>No Exclusiva:</strong> Salvo pacto contrario en desarrollo a medida ("Select"), el código base es propiedad intelectual de Script9.</li>
                                    <li><strong>Prohibiciones:</strong> Está estrictamente prohibida la reventa, redistribución masiva o sublicencia del código fuente "crudo" sin autorización Enterprise.</li>
                                </ul>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-blue-500">03</span>
                                    Propiedad Intelectual
                                </h3>
                                <div className="p-6 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                    <p className="m-0 text-sm">
                                        Todo el código fuente de la plataforma, diseño de interfaz, marcas y algoritmos propietarios son activos de Script9. El cliente retiene la propiedad total de SU data y de las configuraciones específicas realizadas en su instancia.
                                    </p>
                                </div>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-blue-500">04</span>
                                    Pagos y Garantía
                                </h3>
                                <ul className="space-y-2 marker:text-blue-500">
                                    <li><strong>Pagos Finales:</strong> Las compras de productos digitales (scripts) son definitivas debido a la naturaleza irrevocable del software descargable.</li>
                                    <li><strong>Servicios:</strong> Los proyectos a medida pueden estar sujetos a hitos de pago.</li>
                                    <li><strong>Garantía Técnica:</strong> Garantizamos que nuestro código cumple con las especificaciones descritas en el momento de la entrega. No nos hacemos responsables de roturas por cambios en APIs de terceros (ej. cambios en API de OpenAI o Google) posteriores a la entrega.</li>
                                </ul>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-blue-500">05</span>
                                    Limitación de Responsabilidad
                                </h3>
                                <p>
                                    Script9 provee herramientas de potencia industrial. No nos responsabilizamos por pérdidas de datos, lucro cesante o interrupciones de servicio derivadas de una mala configuración por parte del usuario o fallos en servicios de terceros (AWS, OpenAI, etc.).
                                </p>
                            </article>

                            <article>
                                <h3 className="flex items-center gap-3 text-2xl mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm border border-slate-700 text-blue-500">06</span>
                                    Jurisdicción
                                </h3>
                                <p>
                                    Este acuerdo se rige por las leyes de España. Cualquier disputa se resolverá en los tribunales de Madrid, renunciando a cualquier otro fuero.
                                </p>
                            </article>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
                            <p className="text-sm text-slate-500 m-0">
                                ¿Necesitas un acuerdo de nivel de servicio (SLA) personalizado? <br />
                                <a href="mailto:contact@script-9.com" className="no-underline text-blue-400 font-medium hover:text-blue-300">Contactar a ventas Enterprise &rarr;</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
