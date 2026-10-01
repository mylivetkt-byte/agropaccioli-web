'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, MessageCircle, ArrowRight, Search, ShoppingBag } from 'lucide-react';
import { ALMACENES_INSUMOS_DATA } from '@/lib/agro-data';

export default function PortalAlmacenesB2B() {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = ALMACENES_INSUMOS_DATA.filter((almacen) => {
    const term = busqueda.toLowerCase();
    const matchName = almacen.nombreComercial.toLowerCase().includes(term) || almacen.municipio.toLowerCase().includes(term);
    const matchProduct = almacen.catalogoDestacado.some(p => p.nombre.toLowerCase().includes(term));
    return matchName || matchProduct;
  });

  return (
    <section className="py-14 bg-gradient-to-b from-white via-emerald-50/40 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>DIRECTORIO DE ALMACENES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">Almacenes y Agropecuarias de Confianza</h2>
          <p className="text-zinc-600 text-sm mt-2">Encuentra los mejores precios de insumos, fertilizantes y semillas en tu zona.</p>
        </div>

        {/* Buscador de Insumos */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-3 mb-10 max-w-2xl mx-auto shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="¿Qué insumo necesitas? (ej: Urea, Matamalezas, Concentrado...)"
              className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl pl-5 pr-12 py-3.5 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtrados.map((almacen) => (
            <div key={almacen.id} className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{almacen.municipio}, {almacen.departamento}</span>
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> KYC Verificado</span>
                </div>
                <h3 className="font-bold text-emerald-950 text-base">{almacen.nombreComercial}</h3>
                <p className="text-xs text-zinc-500">NIT: {almacen.nit} • {almacen.razonSocial}</p>

                <div className="mt-4 space-y-2">
                  {almacen.catalogoDestacado.map((prod, idx) => {
                    const isMatch = busqueda && prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
                    return (
                      <div key={idx} className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${isMatch ? 'bg-amber-100/50 border border-amber-200' : 'bg-emerald-50/50 border border-transparent'}`}>
                        <span className={`font-semibold ${isMatch ? 'text-amber-900' : 'text-zinc-800'}`}>✓ {prod.nombre}</span>
                        <span className={`font-black ${isMatch ? 'text-amber-700' : 'text-emerald-700'}`}>${prod.precio.toLocaleString('es-CO')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-100">
                <a
                  href={`https://wa.me/${almacen.whatsapp}?text=${encodeURIComponent(`Hola ${almacen.nombreComercial}, los encontré en AGROPACCIOLI. Quiero hacer un pedido/cotización.${busqueda ? ` Me interesa: ${busqueda}.` : ''} Por favor confírmenme disponibilidad y medio de pago.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Realizar Pedido por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
