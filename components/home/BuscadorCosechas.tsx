'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ShieldCheck, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { COSECHAS_DATA } from '@/lib/agro-data';
import { CosechaItem, SectorType } from '@/types/agro';

export default function BuscadorCosechas() {
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState('todos');

  const filtrados = COSECHAS_DATA.filter((item) => {
    const matchText = item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                      item.municipio.toLowerCase().includes(busqueda.toLowerCase()) ||
                      item.departamento.toLowerCase().includes(busqueda.toLowerCase());
    const matchSector = sectorFiltro === 'todos' || item.sector === sectorFiltro;
    return matchText && matchSector;
  });

  return (
    <section className="py-12 bg-white border-y border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Directorio Verificado de Cosechas & Lotes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">Buscador Multimodal Nacional</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Contacta agricultores, ganaderos y piscicultores colombianos verificados.</p>
          </div>
          <Link href="/mapa-cosechas" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
            <MapPin className="w-4 h-4" />
            <span>Ver Mapa Satelital</span>
          </Link>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por producto (ej: Aguacate, Café, Novillos, Tilapia) o municipio..."
                className="w-full bg-white border border-emerald-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <select
                value={sectorFiltro}
                onChange={(e) => setSectorFiltro(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-700 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">🌾 Todos los Sectores</option>
                <option value="agricola">🟢 Agrícola (Frutas, Granos)</option>
                <option value="ganadero">🟠 Ganadero (Bovinos, Ceba)</option>
                <option value="acuicola">🔵 Acuícola (Tilapia, Trucha)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtrados.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden">
              <div className="relative h-44 w-full bg-zinc-100">
                <img src={item.imagenes[0]} alt={item.titulo} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.sector === 'agricola' ? '🟢 Agrícola' : item.sector === 'ganadero' ? '🟠 Ganadero' : '🔵 Acuícola'}
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                  {item.departamento}, {item.municipio}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-emerald-950 text-sm leading-snug line-clamp-2">{item.titulo}</h3>
                  <div className="text-xs text-zinc-500 mt-1">{item.productor.finca} • {item.productor.nombre}</div>
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Disponible:</span>
                      <span className="font-bold text-emerald-950">{item.cantidadDisponible} {item.unidad}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1 pt-1 border-t border-emerald-200/50">
                      <span className="text-zinc-500">Precio base:</span>
                      <span className="font-black text-emerald-700">${item.precioUnitario.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${item.productor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a href={`tel:${item.productor.telefono}`} className="p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
