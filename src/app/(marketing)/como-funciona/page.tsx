'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, HelpCircle, ChevronDown, Zap, Code, Settings, Bot, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ComoFunciona() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Qué es Script9?',
      answer: 'Script9 es una plataforma de soluciones avanzadas en automatización e inteligencia artificial, orientada a la optimización de procesos y al desarrollo de workflows y scripts personalizados para negocios tanto físicos como digitales. Nuestro objetivo es impulsar su crecimiento, mejorando la eficiencia operativa y facilitando la escalabilidad de sus operaciones.',
    },
    {
      question: '¿Qué tipo de automatizaciones ofrecen?',
      answer: 'Desarrollamos automatizaciones a medida para optimizar procesos clave del negocio, abarcando desde la gestión de comunicaciones y datos hasta integraciones entre sistemas, chatbots con inteligencia artificial, workflows comerciales y estrategias de automatización de marketing, entre otras soluciones avanzadas.',
    },
    {
      question: '¿Cómo funciona el proceso de contratación?',
      answer: 'Nuestro proceso de contratación es ágil y transparente. Primero, eliges el servicio desde nuestro catálogo. A continuación, completas el pago mediante Stripe, nuestra plataforma de pago seguro. Finalmente, recibirás las instrucciones para la implementación y, en caso de que tengas cualquier duda o necesites asistencia, uno de nuestros expertos se comunicará contigo para ayudarte y garantizar una correcta implementación.',
    },
    {
      question: '¿Cuánto cuesta un proyecto de automatización?',
      answer: 'El coste de los proyectos de automatización se define de forma transparente y se ajusta a las necesidades y al alcance específico de cada caso. El presupuesto se establece previamente, garantizando claridad desde el inicio, sin costes ocultos ni compromisos de suscripción recurrentes.',
    },
    {
      question: '¿Qué herramientas utilizan?',
      answer: 'Trabajamos con tecnologías y plataformas líderes del mercado, como Python, Node.js, APIs REST, Make (Integromat), Zapier, n8n y soluciones de inteligencia artificial como OpenAI, Perplexity, entre otras. Seleccionamos la tecnología más adecuada en función de los requisitos y objetivos de cada proyecto.',
    },
    {
      question: '¿Ofrecen soporte después de la implementación?',
      answer: 'Sí, todos nuestros servicios contemplan un período de garantía y soporte post-implementación, diseñado para garantizar el óptimo funcionamiento de las soluciones implementadas y proporcionar asistencia técnica especializada cuando sea requerida.',
    },
  ];

  const services = [
    {
      icon: Zap,
      title: 'Automatizaciones',
      description: 'Automatiza tareas repetitivas y libera tiempo para lo que importa',
      features: ['Email automation', 'Data processing', 'Reporting automático'],
    },
    {
      icon: Bot,
      title: 'IA y Chatbots',
      description: 'Integra inteligencia artificial en tus procesos de negocio',
      features: ['Chatbots inteligentes', 'Procesamiento de lenguaje', 'Análisis predictivo'],
    },
    {
      icon: Settings,
      title: 'Workflows',
      description: 'Diseña flujos de trabajo eficientes y escalables',
      features: ['Flujos personalizados', 'Integraciones multi-app', 'Automatización de ventas'],
    },
    {
      icon: Code,
      title: 'Scripts a Medida',
      description: 'Desarrollo de scripts personalizados para tus necesidades específicas',
      features: ['Python & Node.js', 'APIs personalizadas', 'Web scraping'],
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          {/* Deep Tech Background Layer */}
          <div className="absolute inset-0 bg-slate-950" />

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Radial Gradient Glows */}
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500/20 opacity-20 blur-[100px]" />
          <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] bg-indigo-500/10 opacity-20 blur-[100px]" />

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-125 brightness-100" />

          {/* Fade to bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        </div>

        <div className="relative z-30 max-w-[980px] mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md rounded-full border border-emerald-500/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-100">Transformación Digital Real</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[56px] md:text-[72px] font-bold leading-[1.05] mb-6 tracking-tight"
          >
            Automatiza tu negocio<br />sin complicaciones
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[19px] md:text-[21px] max-w-2xl mx-auto leading-[1.4] font-light text-slate-400"
          >
            Servicios de IA, workflows y scripts a medida para negocios digitales que quieren escalar.
          </motion.p>
        </div>
      </section>

      {/* Servicios - Grid */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full mb-4 border border-slate-800">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">Nuestros Servicios</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-white leading-[1.1] tracking-tight">
              Todo lo que necesitas para automatizar
            </h2>
          </motion.div>

          {/* Grid de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors duration-300">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-[21px] font-bold text-white mb-3 leading-[1.2]">{service.title}</h3>
                <p className="text-[15px] text-slate-400 leading-[1.4] mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-[14px] text-slate-500 flex items-center gap-2 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos - 4 pasos */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full mb-4 border border-emerald-500/20">
              <Rocket className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">Proceso de Trabajo</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-white leading-[1.1] tracking-tight">
              Cómo trabajamos contigo
            </h2>
          </motion.div>

          {/* Grid horizontal compacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Elige tu Solución', desc: 'Explora nuestro catálogo y selecciona el servicio que necesitas' },
              { title: 'Pago Seguro', desc: 'Realiza el pago de forma segura a través de nuestra plataforma' },
              { title: 'Implementación', desc: 'Un experto configura y despliega la solución en tu entorno' },
              { title: 'Soporte Continuo', desc: 'Te acompañamos para asegurar el éxito del proyecto' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
              >

                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-[18px] mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-slate-800">
                  {index + 1}
                </div>
                <h3 className="text-[19px] font-bold text-white mb-2 leading-[1.2]">{step.title}</h3>
                <p className="text-[14px] text-slate-400 leading-[1.4]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Compacto */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-[900px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full mb-4 border border-slate-800">
              <HelpCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">Preguntas Frecuentes</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-white leading-[1.1] tracking-tight">
              Resolvemos tus dudas
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800 transition-all duration-200"
                >
                  <span className="font-semibold text-white text-[17px]">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${openFAQ === index ? 'rotate-180 text-emerald-500' : ''
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-[15px] text-slate-400 leading-[1.6]">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Compacto */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-[980px] mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[40px] md:text-[48px] font-bold text-white mb-4 leading-[1.1] tracking-tight">
              ¿Listo para automatizar?
            </h2>
            <p className="text-[19px] text-slate-400 mb-10 max-w-2xl mx-auto leading-[1.4]">
              Únete a cientos de empresas que ya optimizan sus procesos con Script9
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => router.push('/catalogo')}
                className="group relative px-10 py-4 bg-emerald-600 text-white rounded-xl transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] font-bold text-[17px] shadow-md hover:shadow-emerald-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explorar Catálogo
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => router.push('/contacto')}
                className="group relative px-10 py-4 bg-slate-900 text-white border-2 border-slate-700 hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all duration-300 active:scale-[0.98] font-bold text-[17px]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contactar Soporte
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
