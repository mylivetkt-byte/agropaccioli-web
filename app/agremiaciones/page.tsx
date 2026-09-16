import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { AGREMIACIONES_DATA } from '@/lib/agro-data';

export default function AgremiacionesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-xl">
          <span className="bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            COOPERATIVISMO RURAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
            Directorio de Agremiaciones y Fundaciones
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1">
            Conecta con los gremios de representación nacional y cooperativas campesinas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {AGREMIACIONES_DATA.map((agr) => (
            <div key={agr.id} className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">{agr.tipo}</span>
                <h3 className="text-xl font-black text-emerald-950 mt-3">{agr.nombre} ({agr.sigla})</h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{agr.descripcion}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                Contacto: <strong>{agr.contacto}</strong>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
