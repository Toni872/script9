import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad',
    description: 'Política de privacidad y protección de datos de Script9.',
};

export default function PrivacidadPage() {
    return (
        <div className="bg-[#0A0A0A] min-h-screen text-slate-300 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Política de <span className="text-[#10B981]">Privacidad</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Última actualización: Enero 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead">
                        En Script9, nos tomamos muy en serio tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestra plataforma y servicios.
                    </p>

                    <h3>1. Responsable del Tratamiento</h3>
                    <p>
                        El responsable del tratamiento de los datos recabados a través de este sitio web es Script9. Puedes contactarnos para cualquier cuestión relacionada con la privacidad en <a href="mailto:contact@script-9.com" className="text-[#10B981] hover:underline">contact@script-9.com</a>.
                    </p>

                    <h3>2. Datos que Recopilamos</h3>
                    <p>
                        Podemos recopilar y procesar los siguientes datos:
                    </p>
                    <ul>
                        <li><strong>Datos de Identificación:</strong> Nombre, dirección de correo electrónico, número de teléfono (cuando te registras o nos contactas).</li>
                        <li><strong>Datos Transaccionales:</strong> Información sobre los servicios o productos que adquieres (el procesamiento de pagos se realiza a través de Stripe, no almacenamos datos completos de tarjetas de crédito).</li>
                        <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo y datos de uso de la plataforma (cookies).</li>
                    </ul>

                    <h3>3. Finalidad del Tratamiento</h3>
                    <p>
                        Usamos tus datos para:
                    </p>
                    <ul>
                        <li>Proporcionar y gestionar los servicios contratados y el acceso a la plataforma.</li>
                        <li>Procesar pagos y facturación.</li>
                        <li>Enviarte notificaciones importantes sobre tu cuenta, cambios en el servicio o actualizaciones de seguridad.</li>
                        <li>Mejorar nuestro sitio web y analizar tendencias de uso.</li>
                        <li>Responder a tus consultas y proporcionar soporte técnico.</li>
                    </ul>

                    <h3>4. Legitimación</h3>
                    <p>
                        La base legal para el tratamiento de tus datos es la ejecución del contrato de prestación de servicios (cuando compras o te registras) y nuestro interés legítimo en mejorar nuestros servicios y garantizar la seguridad de la plataforma.
                    </p>

                    <h3>5. Compartición de Datos</h3>
                    <p>
                        No vendemos tus datos a terceros. Solo compartimos información con proveedores de servicios de confianza necesarios para operar nuestro negocio, tales como:
                    </p>
                    <ul>
                        <li>Proveedores de pago (Stripe).</li>
                        <li>Servicios de alojamiento y base de datos (Vercel, Supabase).</li>
                        <li>Herramientas de análisis y soporte.</li>
                    </ul>
                    <p>
                        Todos estos proveedores están obligados a cumplir con la normativa de protección de datos.
                    </p>

                    <h3>6. Tus Derechos</h3>
                    <p>
                        Según la normativa vigente (RGPD), tienes derecho a:
                    </p>
                    <ul>
                        <li>Acceder a tus datos personales.</li>
                        <li>Solicitar la rectificación de datos inexactos.</li>
                        <li>Solicitar la supresión de tus datos.</li>
                        <li>Oponerte al tratamiento de tus datos.</li>
                        <li>Solicitar la portabilidad de tus datos.</li>
                    </ul>
                    <p>
                        Para ejercer estos derechos, envíanos un correo a <a href="mailto:contact@script-9.com" className="text-[#10B981] hover:underline">contact@script-9.com</a>.
                    </p>

                    <h3>7. Seguridad</h3>
                    <p>
                        Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger tus datos contra el acceso no autorizado, la alteración, divulgación o destrucción.
                    </p>

                    <h3>8. Cookies</h3>
                    <p>
                        Utilizamos cookies técnicas necesarias para el funcionamiento de la web (sesión, autenticación) y analíticas para entender cómo se usa nuestro sitio. Puedes configurar tu navegador para rechazar las cookies, aunque esto podría afectar a la funcionalidad de la plataforma.
                    </p>
                </div>
            </div>
        </div>
    );
}
