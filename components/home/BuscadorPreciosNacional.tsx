'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Search, ArrowUpRight } from 'lucide-react';
import { getPreciosMercadoList } from '@/app/actions/precios';

export default function BuscadorPreciosNacional() {
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState('todos');
  const [limite, setLimite] = useState(8);
  const [precios, setPrecios] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const raw = await getPreciosMercadoList();
        if (raw && raw.length > 0) {
          const mapped = raw.map((p: any) => ({
            id: p.id,
            producto: p.producto,
            sector: (p.categoria || 'agricola').toLowerCase(),
            mercado: p.centralAbastos,
            precioMin: p.precioMinimo,
            precioMax: p.precioMaximo,
            precioPromedio: p.precioPromedio,
            unidad: p.unidad,
            tendencia: p.tendencia,
            variacionPorcentual: p.variacionSemanal || 0
          }));
          setPrecios(mapped);
        }
      } catch (err) {
        console.error('Error fetching dynamic precios:', err);
      }
    }
    load();
  }, []);

  const filtrados = precios.filter((p) => {
    const matchText = (p.producto || '').toLowerCase().includes(busqueda.toLowerCase()) || (p.mercado || '').toLowerCase().includes(busqueda.toLowerCase());
    const matchSector = sectorFiltro === 'todos' || p.sector === sectorFiltro;
    return matchText && matchSector;
  });
  
  const filtradosMostrar = filtrados.slice(0, limite);

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

        {/* Buscador Rápido de Precios */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-4 md:p-5 mb-8 space-y-4 max-w-3xl">
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por producto o mercado (ej: Café, Aguacate, Corabastos...)"
              className="w-full bg-zinc-50 border border-emerald-300 rounded-2xl pl-5 pr-12 py-3 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-shadow"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-xs font-bold text-emerald-800 mr-2 hidden sm:block">Filtro rápido:</span>
            <button onClick={() => setSectorFiltro('todos')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'todos' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-zinc-100 text-zinc-600 hover:bg-emerald-100'}`}><span>🌾</span> Todos</button>
            <button onClick={() => setSectorFiltro('agricola')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'agricola' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-zinc-100 text-zinc-600 hover:bg-emerald-100'}`}><span>🥑</span> Agrícola</button>
            <button onClick={() => setSectorFiltro('ganadero')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'ganadero' ? 'bg-orange-600 text-white shadow-md scale-105' : 'bg-zinc-100 text-zinc-600 hover:bg-orange-100'}`}><span>🐂</span> Ganadero</button>
            <button onClick={() => setSectorFiltro('acuicola')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'acuicola' ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-zinc-100 text-zinc-600 hover:bg-sky-100'}`}><span>🐟</span> Peces</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtradosMostrar.map((p) => (
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

        {filtrados.length > limite && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setLimite(limite + 8)}
              className="px-6 py-2.5 bg-white border border-emerald-300 text-emerald-700 font-bold text-sm rounded-xl shadow-sm hover:bg-emerald-50 transition-colors"
            >
              Cargar más precios ({filtrados.length - limite} ocultos)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
