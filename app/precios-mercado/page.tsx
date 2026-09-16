'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { TrendingUp, DollarSign } from 'lucide-react';
import { PRECIOS_MERCADO_DATA, TRM_DATA } from '@/lib/agro-data';

export default function PreciosMercadoPage() {
  const [filtro, setFiltro] = useState('');

  const filtrados = PRECIOS_MERCADO_DATA.filter((p) =>
    p.producto.toLowerCase().includes(filtro.toLowerCase()) ||
    p.mercado.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              PRECIOS OFICIALES DANE / SIPSA
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Inteligencia de Mercado Agropecuario
            </h1>
            <p className="text-xs text-emerald-100 mt-1">Precios en centrales de abastos y subastas ganaderas.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
            <span className="text-xs text-emerald-200">TRM Dólar</span>
            <div className="text-2xl font-black text-white">${TRM_DATA.dolarCOP.toLocaleString('es-CO')} COP</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-800 text-white text-xs uppercase">
                <th className="p-3.5">Producto</th>
                <th className="p-3.5">Mercado</th>
                <th className="p-3.5">Precio Promedio</th>
                <th className="p-3.5">Fuente</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-emerald-100 text-zinc-700">
              {filtrados.map((p) => (
                <tr key={p.id} className="hover:bg-emerald-50/50">
                  <td className="p-3.5 font-bold text-emerald-950">{p.producto}</td>
                  <td className="p-3.5 text-zinc-600">{p.mercado}</td>
                  <td className="p-3.5 font-black text-emerald-700 text-sm">
                    ${p.precioPromedio.toLocaleString('es-CO')} /{p.unidad}
                  </td>
                  <td className="p-3.5 font-semibold text-zinc-500">{p.fuente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
