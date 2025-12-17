"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Code2,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Bot
} from "lucide-react";
import SearchBar, { SearchParams } from "@/components/SearchBar";
import Section from "@/components/common/Section";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { useScrollReveal } from "@/hooks/useAnimations";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  const router = useRouter();
  const featuresReveal = useScrollReveal({ threshold: 0.2, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSearch = (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.set("q", params.query);
    router.push(`/catalogo?${searchParams.toString()}`);
  };

  return (
    <div className="bg-[#F5F5F5]">
      {/* HERO SECTION - DEEP TECH */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#003D82]">
        {/* Abstract Tech Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] bg-gradient-to-b from-[#EF4444]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#EF4444] animate-pulse"></span>
              Agencia de Automatización Deep Tech
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Transformamos tu Negocio con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171]">IA y Automatización</span>
            </h1>

            <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              Desarrollamos soluciones tecnológicas a medida: desde scripts de scraping hasta agentes de IA autónomos que escalan tus operaciones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => router.push('/catalogo')}
                className="px-8 py-4 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg font-semibold text-lg transition-all shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] flex items-center justify-center gap-2 group"
              >
                Ver Catálogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push('/contacto')}
                className="px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
              >
                Agendar Consultoría
              </button>
            </div>
          </motion.div>

          {/* Hero Visual/Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Floating Cards Mockup */}
            <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-white/40 font-mono">script9_agent.py</div>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-[#EF4444]">{">>>"}</span>
                  <span className="text-white">Iniciando agente de ventas...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#EF4444]">{">>>"}</span>
                  <span className="text-blue-200">Analizando leads en CRM...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">50 leads calificados encontrados</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#EF4444]">{">>>"}</span>
                  <span className="text-blue-200">Generando scripts de contacto personalizados...</span>
                </div>
                <div className="p-4 bg-black/30 rounded-lg border border-white/5 mt-4">
                  <p className="text-gray-400 mb-2">// Output</p>
                  <p className="text-green-400">Emails enviados: 50</p>
                  <p className="text-green-400">Tasa de apertura: 45%</p>
                  <p className="text-green-400">Reuniones agendadas: 8</p>
                </div>

                <div className="pt-6">
                  <SearchBar onSearch={handleSearch} placeholder="Buscar solución (ej. Chatbot, Scraping)..." />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST / LOGOS */}
      <section className="py-10 bg-[#002E5C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-blue-200/60 text-sm font-medium mb-6 uppercase tracking-widest">Tecnologías que dominamos</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Tech Placeholders - Text for now */}
            <span className="text-white font-bold text-xl">OpenAI</span>
            <span className="text-white font-bold text-xl">Python</span>
            <span className="text-white font-bold text-xl">React</span>
            <span className="text-white font-bold text-xl">Stripe</span>
            <span className="text-white font-bold text-xl">Supabase</span>
            <span className="text-white font-bold text-xl">Docker</span>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">¿Por qué elegir Script9?</h2>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              No somos solo desarrolladores, somos arquitectos de eficiencia.
            </p>
          </div>

          <motion.div
            ref={featuresReveal.ref}
            variants={staggerContainer}
            {...featuresReveal.controls}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Cpu,
                title: "Tecnología de Punta",
                desc: "Utilizamos los últimos modelos de LLMs y frameworks de automatización para resultados superiores."
              },
              {
                icon: Code2,
                title: "Código Limpio y Escalable",
                desc: "Soluciones construidas para crecer con tu negocio, documentadas y mantenibles."
              },
              {
                icon: Zap,
                title: "Implementación Rápida",
                desc: "Despliegue ágil de soluciones. Tu tiempo es dinero, y no lo desperdiciamos."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#003D82]/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#003D82] transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-[#003D82] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{feature.title}</h3>
                <p className="text-[#666666] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#333333] mb-2">Explora nuestras soluciones</h2>
              <p className="text-lg text-[#666666]">Categorías diseñadas para cada necesidad empresarial</p>
            </div>
            <button
              onClick={() => router.push('/catalogo')}
              className="hidden md:flex items-center gap-2 text-[#003D82] font-semibold hover:text-[#EF4444] transition-colors"
            >
              Ver todo el catálogo <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Automatizaciones', icon: Bot, count: '45+', color: 'bg-blue-50 text-blue-600' },
              { name: 'Workflows AI', icon: Zap, count: '32+', color: 'bg-indigo-50 text-indigo-600' },
              { name: 'Scripts Python', icon: Terminal, count: '28+', color: 'bg-green-50 text-green-600' },
              { name: 'Integraciones', icon: Code2, count: '50+', color: 'bg-orange-50 text-orange-600' },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => router.push(`/catalogo?category=${cat.name}`)}
                className="flex flex-col p-6 rounded-2xl bg-[#F5F5F5] hover:bg-white border border-transparent hover:border-[#003D82]/20 hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-1">{cat.name}</h3>
                <p className="text-sm text-[#666666]">{cat.count} soluciones disponibles</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <PricingSection />

      {/* FINAL CTA */}
      <section className="py-24 bg-[#003D82] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#EF4444]/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para escalar tu negocio?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Agenda una consultoría gratuita de 15 minutos y descubre cómo podemos ahorrarte cientos de horas de trabajo manual.
          </p>
          <button
            onClick={() => router.push('/contacto')}
            className="px-10 py-5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all transform hover:-translate-y-1"
          >
            Empezar Ahora
          </button>
        </div>
      </section>
    </div>
  );
}
