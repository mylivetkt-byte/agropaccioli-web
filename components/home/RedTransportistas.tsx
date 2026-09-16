'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, MapPin, MessageCircle, Calculator } from 'lucide-react';
import { TRANSPORTISTAS_DATA } from '@/lib/agro-data';

export default function RedTransportistas() {
  const [km, setKm] = useState(120);
  const tarifaKm = 4500;
  const flete = km * tarifaKm;

  return (
    <section className="py-14 bg-gradient-to-b from-white via-emerald-50/30 to-white border-b border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>FLETES Y LOGÍSTICA RURAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">Red Nacional de Transportistas</h2>
        </div>

        <div className="bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 text-white mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <span className="text-xs text-emerald-300 font-bold uppercase flex items-center gap-1"><Calculator className="w-4 h-4" /> Simulador de Flete</span>
              <h3 className="text-xl font-bold">Calcula el costo aproximado de viaje</h3>
              <input type="range" min="20" max="600" value={km} onChange={(e) => setKm(Number(e.target.value))} className="w-full accent-emerald-400" />
              <span className="text-xs text-emerald-200 block">{km} Kilómetros</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl text-center border border-white/15">
              <span className="text-xs text-emerald-200">Flete Estimado:</span>
              <span className="text-2xl font-black text-white block mt-1">${flete.toLocaleString('es-CO')} COP</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TRANSPORTISTAS_DATA.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{t.tipoVehiculo}</span>
                  <span className="text-xs text-emerald-700 font-bold">⭐ {t.calificacion}</span>
                </div>
                <h3 className="font-bold text-emerald-950 text-base">{t.nombre}</h3>
                <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Base: {t.municipioBase} ({t.departamentoBase})</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100">
                <a
                  href={`https://wa.me/${t.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contactar Flete por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
