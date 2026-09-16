'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AcademiaAgroIA from '@/components/home/AcademiaAgroIA';
import { BookOpen } from 'lucide-react';

export default function AcademiaIAPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-xl">
          <span className="bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            ASISTENCIA TÉCNICA
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
            Academia Agrícola & Pecuaria con IA
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mt-1">
            Capacítate en Buenas Prácticas Agrícolas (BPA), bioseguridad y nutrición de precisión con IA.
          </p>
        </div>

        <AcademiaAgroIA />

        <div className="mt-12 mb-16">
          <h2 className="text-xl font-black text-emerald-950 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Guías Técnicas Oficiales</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <span className="text-xl mb-1 block">🥑</span>
              <h3 className="font-bold text-emerald-950 text-sm">Manejo en Aguacate Hass</h3>
              <p className="text-xs text-zinc-600 mt-1">Protocolos de exportación ICA y sanidad.</p>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
              <span className="text-xl mb-1 block">🐂</span>
              <h3 className="font-bold text-emerald-950 text-sm">Ganadería Silvopastoril</h3>
              <p className="text-xs text-zinc-600 mt-1">Sistemas intensivos con botón de oro.</p>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200">
              <span className="text-xl mb-1 block">🐟</span>
              <h3 className="font-bold text-emerald-950 text-sm">Calidad de Agua en Tilapia</h3>
              <p className="text-xs text-zinc-600 mt-1">Control de amonio y oxigenación.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
