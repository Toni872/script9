import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso de la plataforma Script9.',
};

export default function TerminosPage() {
    return (
        <div className="bg-[#0A0A0A] min-h-screen text-slate-300 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Términos y <span className="text-[#10B981]">Condiciones</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Última actualización: Enero 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead">
                        Bienvenido a Script9. Al acceder a nuestro sitio web y utilizar nuestros servicios, aceptas cumplir con estos términos y condiciones. Por favor, léelos cuidadosamente.
                    </p>

                    <h3>1. Información General</h3>
                    <p>
                        Script9 (&quot;nosotros&quot;, &quot;nuestro&quot;) es una consultoría estratégica en TI y automatización SaaS. Nuestra plataforma ofrece servicios de desarrollo de software, automatización de procesos, y venta de scripts y workflows digitales.
                    </p>

                    <h3>2. Uso de los Servicios</h3>
                    <p>
                        Te comprometes a utilizar nuestros servicios únicamente para fines legales y de acuerdo con estos términos. Queda prohibido:
                    </p>
                    <ul>
                        <li>Vulnerar la seguridad de la plataforma o intentar acceder a áreas restringidas.</li>
                        <li>Utilizar los scripts o workflows adquiridos para fines ilícitos o malintencionados.</li>
                        <li>Revender, redistribuir o sublicenciar los productos digitales adquiridos sin nuestra autorización expresa por escrito.</li>
                    </ul>

                    <h3>3. Propiedad Intelectual</h3>
                    <p>
                        Todo el contenido, marcas, logos, código fuente (de la plataforma) y materiales disponibles en Script9 son propiedad exclusiva nuestra o de nuestros licenciantes y están protegidos por las leyes de propiedad intelectual internacionales y de España.
                    </p>
                    <p>
                        Al adquirir un servicio o producto digital (script/workflow), se te otorga una licencia de uso personal y empresarial, no exclusiva e intransferible, pero no la titularidad de los derechos de autor del mismo, salvo acuerdo específico en contratos de desarrollo a medida.
                    </p>

                    <h3>4. Pagos y Reembolsos</h3>
                    <p>
                        Los precios de nuestros servicios y productos se indican claramente en la plataforma. Nos reservamos el derecho de modificar los precios en cualquier momento.
                    </p>
                    <p>
                        Dada la naturaleza digital de nuestros productos (scripts y workflows descargables o accesibles inmediatamente) y servicios de consultoría, <strong>no se admiten devoluciones ni reembolsos</strong> una vez entregado el producto o iniciado el servicio, salvo error técnico imputable a Script9 que impida su funcionamiento.
                    </p>

                    <h3>5. Limitación de Responsabilidad</h3>
                    <p>
                        Script9 no se hace responsable de daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de nuestros servicios. No garantizamos que nuestros scripts o automatizaciones funcionen sin errores en todos los entornos o con futuras actualizaciones de terceros (APIs, plataformas externas, etc.).
                    </p>

                    <h3>6. Modificaciones</h3>
                    <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. El uso continuado de la plataforma tras dichos cambios implica su aceptación.
                    </p>

                    <h3>7. Ley Aplicable y Jurisdicción</h3>
                    <p>
                        Estos términos se rigen por las leyes de España. Cualquier disputa relacionada con estos términos se someterá a la jurisdicción exclusiva de los tribunales de la ciudad de Madrid, España.
                    </p>

                    <h3>8. Contacto</h3>
                    <p>
                        Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos en <a href="mailto:contact@script-9.com" className="text-[#10B981] hover:underline">contact@script-9.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
