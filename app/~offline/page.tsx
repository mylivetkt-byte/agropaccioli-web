'use client';

import React from 'react';
import { WifiOff, Sprout, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-800">
        <WifiOff className="w-12 h-12 text-amber-400 animate-pulse" />
      </div>
      
      <h1 className="text-3xl font-black text-white mb-4">
        Estás Sin Conexión a Internet
      </h1>
      
      <p className="text-emerald-200/80 mb-8 max-w-md mx-auto leading-relaxed">
        Parece que perdiste la señal, pero no te preocupes. 
        Gracias al <strong>Modo Finca (Offline)</strong>, AgroPaccioli guardó la información importante en tu celular. 
        Tus borradores de cosecha se sincronizarán en cuanto recuperes la señal.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-xl shadow-lg transition-all"
        >
          Reintentar Conexión
        </button>
        <Link 
          href="/"
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 border border-zinc-700"
        >
          Ir al Inicio Guardado
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-2 text-emerald-700 font-black tracking-widest text-sm">
        <Sprout className="w-4 h-4" /> AGROPACCIOLI
      </div>
    </div>
  );
}
