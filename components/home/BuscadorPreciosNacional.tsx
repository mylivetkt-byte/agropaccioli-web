'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Search, ArrowUpRight } from 'lucide-react';
import { PRECIOS_MERCADO_DATA } from '@/lib/agro-data';

export default function BuscadorPreciosNacional() {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = PRECIOS_MERCADO_DATA.filter((p) =>
    p.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.mercado.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="py-14 bg-emerald-50/40 border-y border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Inteligencia de Mercado Agropecuario Nacional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">Precios DANE / SIPSA en Vivo</h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">Precios oficiales en tiempo real de Corabastos, Cavasa, Subastas Ganaderas y Lonjas Acuícolas.</p>
          </div>
          <Link href="/precios-mercado" className="inline-flex items-center gap-2 text-xs font-bold bg-white text-emerald-800 border border-emerald-300 px-4 py-2.5 rounded-xl shadow-sm">
            <span>Ver Histórico Completo</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtrados.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{p.fuente}</span>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{p.variacion24h}%</span>
                  </div>
                </div>
                <h3 className="font-bold text-emerald-950 text-sm mt-2">{p.producto}</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">{p.mercado}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-50">
                <div className="text-base font-black text-emerald-950">${p.precioPromedio.toLocaleString('es-CO')} <span className="text-xs font-normal text-zinc-500">/{p.unidad}</span></div>
                <div className="text-[10px] text-zinc-400 mt-1">Act: {p.fechaActualizacion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
