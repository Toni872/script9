'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Zap, Code, CreditCard, Shield, HelpCircle, Bot, Settings } from 'lucide-react';
import Image from 'next/image';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export default function FAQ() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('todas');

    const categories = [
        { id: 'todas', name: 'Todas', icon: HelpCircle },
        { id: 'general', name: 'General', icon: Zap },
        { id: 'servicios', name: 'Servicios', icon: Bot },
        { id: 'tecnico', name: 'Técnico', icon: Code },
        { id: 'proceso', name: 'Proceso', icon: Settings },
        { id: 'pagos', name: 'Pagos', icon: CreditCard },
    ];

    const faqs: FAQItem[] = [
        // General
        {
            category: 'general',
            question: '¿Qué es Script9?',
            answer: 'Script9 es una plataforma que ofrece servicios de IA, automatizaciones, workflows y scripts a medida para negocios digitales. Ayudamos a empresas a escalar sus operaciones de forma inteligente, automatizando tareas repetitivas y optimizando procesos.'
        },
        {
            category: 'general',
            question: '¿Qué tipo de empresas pueden beneficiarse de Script9?',
            answer: 'Cualquier empresa que quiera optimizar sus procesos: desde startups que necesitan automatizar tareas básicas, hasta grandes corporaciones que buscan integrar IA en sus operaciones. Trabajamos con e-commerce, SaaS, agencias, consultoras y más.'
        },
        {
            category: 'general',
            question: '¿En qué países operan?',
            answer: 'Operamos principalmente en España y Latinoamérica, pero nuestros servicios digitales están disponibles globalmente. Trabajamos de forma remota con clientes de cualquier parte del mundo.'
        },
        // Servicios
        {
            category: 'servicios',
            question: '¿Qué tipo de automatizaciones ofrecen?',
            answer: 'Ofrecemos automatizaciones de todo tipo: gestión de emails, procesamiento de datos, generación de reportes, integraciones entre plataformas, chatbots con IA, workflows de ventas, automatización de marketing, web scraping y mucho más.'
        },
        {
            category: 'servicios',
            question: '¿Qué herramientas de IA utilizan?',
            answer: 'Trabajamos con las últimas tecnologías de IA: OpenAI (GPT-4, DALL-E), Anthropic (Claude), Google AI, modelos open source como Llama, y APIs especializadas según las necesidades del proyecto.'
        },
        {
            category: 'servicios',
            question: '¿Pueden integrar mi software actual con otras herramientas?',
            answer: 'Sí, nos especializamos en integraciones. Conectamos CRMs (HubSpot, Salesforce), herramientas de marketing (Mailchimp, ActiveCampaign), plataformas de e-commerce (Shopify, WooCommerce), ERPs y prácticamente cualquier software que tenga API.'
        },
        {
            category: 'servicios',
            question: '¿Ofrecen desarrollo de chatbots personalizados?',
            answer: 'Sí, desarrollamos chatbots con IA adaptados a tu negocio. Pueden responder preguntas frecuentes, calificar leads, programar citas, procesar pedidos y más. Los integramos con WhatsApp, Telegram, tu web o cualquier plataforma.'
        },
        // Técnico
        {
            category: 'tecnico',
            question: '¿Qué tecnologías utilizan para las automatizaciones?',
            answer: 'Utilizamos Python, Node.js, y plataformas como Make (Integromat), Zapier, n8n, para automatizaciones. Para desarrollo de APIs usamos FastAPI, Express.js. Para IA: LangChain, OpenAI API, y modelos personalizados.'
        },
        {
            category: 'tecnico',
            question: '¿Necesito conocimientos técnicos para usar sus servicios?',
            answer: 'No, nos encargamos de todo el desarrollo técnico. Solo necesitas explicarnos qué quieres lograr y nosotros diseñamos e implementamos la solución. Te entregamos todo configurado y funcionando.'
        },
        {
            category: 'tecnico',
            question: '¿Cómo garantizan la seguridad de mis datos?',
            answer: 'La seguridad es prioridad. Usamos encriptación, credenciales seguras, y seguimos las mejores prácticas del sector. Firmamos acuerdos de confidencialidad (NDA) y cumplimos con RGPD.'
        },
        {
            category: 'tecnico',
            question: '¿Qué pasa si algo deja de funcionar?',
            answer: 'Todos nuestros proyectos incluyen monitoreo y alertas. Si algo falla, lo detectamos rápidamente. Además, ofrecemos soporte técnico continuo para resolver cualquier incidencia.'
        },
        // Proceso
        {
            category: 'proceso',
            question: '¿Cómo es el proceso de trabajo?',
            answer: '1) Nos cuentas tu necesidad en una llamada gratuita, 2) Analizamos tu caso y creamos una propuesta, 3) Si aceptas, desarrollamos la solución, 4) Implementamos y probamos, 5) Te damos soporte continuo.'
        },
        {
            category: 'proceso',
            question: '¿Cuánto tiempo tarda un proyecto típico?',
            answer: 'Depende de la complejidad. Automatizaciones simples pueden estar listas en 1-2 semanas. Proyectos más complejos con IA pueden tomar 4-8 semanas. Te damos un timeline detallado antes de empezar.'
        },
        {
            category: 'proceso',
            question: '¿Ofrecen soporte después de la implementación?',
            answer: 'Sí, todos los proyectos incluyen período de soporte post-implementación (generalmente 30 días). También ofrecemos planes de mantenimiento mensual para soporte continuo y mejoras.'
        },
        {
            category: 'proceso',
            question: '¿Puedo solicitar cambios durante el desarrollo?',
            answer: 'Sí, trabajamos de forma ágil con entregas incrementales. Puedes ver el progreso y solicitar ajustes. Cambios menores están incluidos; cambios mayores se evalúan caso por caso.'
        },
        // Pagos
        {
            category: 'pagos',
            question: '¿Cuánto cuesta un proyecto de automatización?',
            answer: 'El precio depende de la complejidad. Proyectos simples desde 500€, automatizaciones medianas 1.500-5.000€, soluciones empresariales complejas desde 5.000€. Siempre ofrecemos presupuesto sin compromiso.'
        },
        {
            category: 'pagos',
            question: '¿Cómo se estructuran los pagos?',
            answer: 'Generalmente: 50% al iniciar el proyecto, 50% al entregar. Para proyectos grandes, dividimos en hitos con pagos parciales. Aceptamos transferencia bancaria, tarjeta y PayPal.'
        },
        {
            category: 'pagos',
            question: '¿Ofrecen planes de pago mensual?',
            answer: 'Sí, para proyectos grandes ofrecemos financiación. También tenemos planes de mantenimiento mensual que incluyen soporte, actualizaciones y mejoras continuas a tu automatización.'
        },
        {
            category: 'pagos',
            question: '¿Hay costos ocultos?',
            answer: 'No, el presupuesto que te damos incluye todo lo acordado. Si durante el proyecto surgen necesidades adicionales, te consultamos antes de aplicar cualquier cargo extra.'
        },
    ];

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'todas' || faq.category === selectedCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=3840&h=2160&fit=crop&q=90"
                        alt="FAQ Script9 - Preguntas sobre Automatización"
                        fill
                        className="object-cover opacity-10"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-[56px] md:text-[72px] font-bold mb-6 text-gray-900">
                            Preguntas Frecuentes
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Todo lo que necesitas saber sobre nuestros servicios de automatización e IA
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Busca tu pregunta..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all bg-white shadow-lg"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-[#10B981] text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {category.name}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* FAQ List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        {filteredFAQs.length === 0 ? (
                            <div className="text-center py-12">
                                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">
                                    No se encontraron preguntas que coincidan con tu búsqueda
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFAQs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-semibold text-gray-900 text-lg pr-8">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`h-6 w-6 text-[#10B981] flex-shrink-0 transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {openFAQ === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-12 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                ¿No encontraste lo que buscabas?
                            </h2>
                            <p className="text-white/90 text-lg mb-8">
                                Nuestro equipo está aquí para resolver todas tus dudas sobre automatización
                            </p>
                            <a
                                href="/contacto"
                                className="inline-block px-8 py-4 bg-white text-[#10B981] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Contáctanos
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
