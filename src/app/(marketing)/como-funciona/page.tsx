'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, HelpCircle, ChevronDown, CheckCircle2, Shield, Lock, FileKey } from 'lucide-react';
import { useState } from 'react';
import { DeepTechHero } from '@/components/ui/DeepTechHero';
import ProcessVisual from '@/components/marketing/ProcessVisual';

export default function ComoFunciona() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Qué es Script9?',
      answer: 'Script9 es una consultora tecnológica especializada en soluciones avanzadas de automatización e inteligencia artificial, orientada a la optimización de procesos y al desarrollo de workflows y scripts personalizados para negocios tanto físicos como digitales. Nuestro objetivo es impulsar su crecimiento, mejorando la eficiencia operativa y facilitando la escalabilidad de sus operaciones.',
    },
    {
      question: '¿Qué tipo de automatizaciones ofrecen?',
      answer: 'Desarrollamos automatizaciones a medida para optimizar procesos clave del negocio, abarcando desde la gestión de comunicaciones y datos hasta integraciones entre sistemas, chatbots con inteligencia artificial, workflows comerciales y estrategias de automatización de marketing, entre otras soluciones avanzadas.',
    },
    {
      question: '¿Cómo funciona el proceso de contratación?',
      answer: 'Nuestro proceso es consultivo y personalizado. Comienza agendando una auditoría gratuita con nuestros expertos para analizar tus necesidades. A continuación, diseñamos una propuesta estratégica a medida. Una vez aprobada, nuestro equipo técnico se encarga de la implementación completa ("Done-For-You") en tu infraestructura, asegurando que todo funcione perfectamente antes de la entrega final.',
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



  return (
    <div className="bg-slate-950 min-h-screen font-sans">
      {/* Hero Section */}
      <DeepTechHero
        badge={
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md rounded-full border border-emerald-500/20">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-100">Transformación Digital Real</span>
          </div>
        }
        title={
          <>
            Automatiza tu <span className="text-emerald-500">negocio</span><br />sin complicaciones
          </>
        }
        subtitle="Servicios de IA, workflows y scripts a medida para negocios digitales que quieren escalar."
      />



      {/* Cómo Trabajamos - 4 pasos */}
      <section className="py-20 bg-slate-950">
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
              { title: 'Agenda una Auditoría', desc: 'Analizamos tus procesos para identificar oportunidades de automatización' },
              { title: 'Propuesta a Medida', desc: 'Diseñamos una solución específica para las necesidades de tu negocio' },
              { title: 'Implementación', desc: 'Un experto configura y despliega la solución en tu entorno' },
              { title: 'Soporte Continuo', desc: 'Te acompañamos para asegurar el éxito del proyecto' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-800 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
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

      {/* Visual Workflow Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[40px] md:text-[48px] font-bold text-white mb-6 leading-tight">
              Ingeniería Visual <span className="text-emerald-500">Limpia</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Sin cajas negras. Diseñamos workflows visuales que puedes entender, auditar y escalar sin depender de nadie.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <ProcessVisual />
          </motion.div>
        </div>
      </section>

      {/* Security & Guarantee Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-500">
                <FileKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Propiedad</h3>
              <p className="text-slate-400 leading-relaxed">
                El código es tuyo. Sin cláusulas de retención ni alquileres. Una vez entregado el proyecto, tienes el control total.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Seguridad Blindada</h3>
              <p className="text-slate-400 leading-relaxed">
                Jamás almacenamos contraseñas en texto plano. Usamos gestores de secretos y cifrado de grado militar para tus credenciales.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Garantía y NDA</h3>
              <p className="text-slate-400 leading-relaxed">
                Firmamos acuerdos de confidencialidad antes de empezar. Además, incluimos 30 días de garantía de soporte post-entrega.
              </p>
            </div>
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
      <section className="py-24 bg-slate-950 border-t border-slate-800">
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
              Transforma tu negocio hoy mismo. Agenda una auditoría gratuita con nuestros expertos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => router.push('/contacto')}
                className="group relative px-10 py-4 bg-emerald-600 text-white rounded-xl transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] font-bold text-[17px] shadow-md hover:shadow-emerald-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Agendar Auditoría
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
