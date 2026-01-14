'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Terminal, Cpu, Lock, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScriptHeroVisual } from '@/components/services/ScriptHeroVisual';

export default function CustomScriptsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-800 text-blue-400 text-sm font-medium mb-6">
              <Code2 className="w-4 h-4" />
              <span>Desarrollo Full-Stack a Medida</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Software que se adapta <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                a tu Negocio
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Diseñamos herramientas exclusivas que se integran perfectamente a tus procesos. <br />
              Creamos soluciones propias optimizadas para tu máxima eficiencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 transition-all duration-200 bg-blue-500 rounded-lg hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Consultar Desarrollo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/#portfolio" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-slate-600">
                Ver Casos de Éxito
              </Link>
            </div>
          </motion.div>

          {/* ANIMATED COMPONENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <ScriptHeroVisual />
          </motion.div>
        </div>
      </section>

      {/* 2. SCHEMATIC EXPLANATION */}
      <section className="py-24 bg-slate-950 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Arquitectura de Software</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Código limpio, eficiente y escalable diseñado para resolver TU problema.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Requisitos</h3>
              <p className="text-slate-400">
                Analizamos a fondo tu necesidad. No escribimos una línea de código hasta entender tu objetivo.
                <br />
                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Blueprint</span>
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group relative">
              <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1px] bg-slate-700"></div>
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Código</h3>
              <p className="text-slate-400">
                Desarrollo ágil en Python, Next.js o Node. Entregables rápidos y funcionales desde la semana 1.
                <br />
                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Desarrollo</span>
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group relative">
              <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1px] bg-slate-700"></div>
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Terminal className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Despliegue</h3>
              <p className="text-slate-400">
                Te entregamos el Ejecutable (.exe), instalamos en tu servidor o alojamos en la nube. Tú decides.
                <br />
                <span className="text-xs text-slate-500 mt-2 block uppercase tracking-wider">Ejecución</span>
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 4. CTA FINAL */}
      <section className="py-24 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Tienes una idea en mente?</h2>
          <p className="text-xl text-slate-400 mb-10">
            Si puedes explicarlo, podemos programarlo. Convertimos tus problemas en software.
          </p>
          <Link href="/contacto" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-slate-950 transition-all duration-200 bg-white rounded-lg hover:bg-blue-400 hover:scale-105 shadow-xl">
            Solicitar Presupuesto
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
