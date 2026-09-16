'use client';

import React from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { ALMACENES_INSUMOS_DATA } from '@/lib/agro-data';

export default function PortalAlmacenesB2B() {
  return (
    <section className="py-14 bg-gradient-to-b from-white via-emerald-50/40 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>RED COMERCIAL EXCLUSIVA B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">Vitrinas Digitales para Almacenes de Insumos</h2>
          <p className="text-zinc-600 text-sm mt-2">Conecta tu almacén agropecuario o distribuidor con miles de productores de tu zona.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ALMACENES_INSUMOS_DATA.map((almacen) => (
            <div key={almacen.id} className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{almacen.municipio}, {almacen.departamento}</span>
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> KYC Verificado</span>
                </div>
                <h3 className="font-bold text-emerald-950 text-base">{almacen.nombreComercial}</h3>
                <p className="text-xs text-zinc-500">NIT: {almacen.nit} • {almacen.razonSocial}</p>

                <div className="mt-4 space-y-2">
                  {almacen.catalogoDestacado.map((prod, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/50 text-xs">
                      <span className="font-semibold text-zinc-800">✓ {prod.nombre}</span>
                      <span className="font-black text-emerald-700">${prod.precio.toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100">
                <a
                  href={`https://wa.me/${almacen.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar Insumos por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
