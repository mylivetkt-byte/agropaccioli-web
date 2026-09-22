'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  DollarSign,
  CloudRain,
  Flame,
  BarChart3,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  TENDENCIAS_MERCADO_HOY_DATA,
  MAS_BUSCADOS_HOY_DATA,
  HISTORICOS_PRECIOS_DETALLE
} from '@/lib/agro-data';

export default function InteligenciaMercadoViewer() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>('aguacate-hass');
  const [rangoMeses, setRangoMeses] = useState<'3m' | '6m' | '12m'>('6m');

  const historico = HISTORICOS_PRECIOS_DETALLE[productoSeleccionado] || HISTORICOS_PRECIOS_DETALLE['aguacate-hass'];

  const puntosGrafica = rangoMeses === '3m'
    ? historico.puntos3Meses
    : rangoMeses === '6m'
    ? historico.puntos6Meses
    : historico.puntos12Meses;

  // Calculamos máximos y mínimos para la escala SVG
  const precios = puntosGrafica.map(p => p.precioPromedio);
  const minPrecio = Math.min(...precios) * 0.95;
  const maxPrecio = Math.max(...precios) * 1.05;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header & TRM Ticker */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Inteligencia Predictiva y Tendencias del Agro Colombiano</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              📈 Centro de Inteligencia de Mercado
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
              Datos cruzados de SIPSA/DANE, FEDEGAN, FNC y transacciones verificadas en AGROPACCIOLI para tomar decisiones de siembra, cosecha y venta con certeza.
            </p>
          </div>

          {/* TRM & Clima Cards */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="flex items-center justify-between gap-1 text-[11px] text-emerald-200 font-semibold">
                <span>Dólar / TRM Hoy</span>
                <DollarSign className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="text-lg sm:text-xl font-black text-white mt-1">$4.185,50</div>
              <div className="text-[10px] text-emerald-300 font-bold mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+0.35% (Favorable Exportación)</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="flex items-center justify-between gap-1 text-[11px] text-emerald-200 font-semibold">
                <span>Pronóstico IDEAM</span>
                <CloudRain className="w-3.5 h-3.5 text-sky-300" />
              </div>
              <div className="text-base sm:text-lg font-black text-white mt-1">Lluvias en Huila</div>
              <div className="text-[10px] text-sky-200 font-semibold mt-0.5">
                Ajustar secado de café
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Tendencias de Hoy + Ranking Más Buscados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Tarjetas de Tendencias y Recomendaciones */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>Mercado de Hoy: Tendencias y Recomendaciones</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">Actualizado: 06:00 AM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TENDENCIAS_MERCADO_HOY_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icono}</span>
                      <div>
                        <h3 className="font-bold text-sm text-emerald-950">{item.producto}</h3>
                        <span className="text-[11px] text-zinc-500 font-medium">{item.unidad}</span>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                      item.tipoTendencia === 'alza'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.tipoTendencia === 'baja'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-zinc-100 text-zinc-800'
                    }`}>
                      {item.tipoTendencia === 'alza' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> : item.tipoTendencia === 'baja' ? <TrendingDown className="w-3.5 h-3.5 text-rose-600" /> : <Minus className="w-3.5 h-3.5 text-zinc-600" />}
                      <span>{item.variacionPorcentaje > 0 ? `+${item.variacionPorcentaje}%` : `${item.variacionPorcentaje}%`}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-xl font-black text-emerald-950 font-mono">
                    {item.precioActual}
                  </div>

                  <p className="text-xs text-zinc-600 mt-2 line-clamp-2">
                    {item.resumen}
                  </p>

                  <div className="mt-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs">
                    <div className="font-black text-amber-950 flex items-center gap-1.5 mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Recomendación AGROPACCIOLI:</span>
                    </div>
                    <p className="text-amber-900 text-[11px] leading-relaxed">
                      {item.recomendacion}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    item.accionRecomendada === 'vender'
                      ? 'bg-emerald-600 text-white'
                      : item.accionRecomendada === 'esperar'
                      ? 'bg-amber-500 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}>
                    ACCIÓN: {item.accionRecomendada.toUpperCase()}
                  </span>

                  <Link
                    href="/precios-mercado"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>Ver histórico</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Ranking Más Buscados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Más Buscados Hoy</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-700">En toda Colombia</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm divide-y divide-zinc-100 space-y-3">
            {MAS_BUSCADOS_HOY_DATA.map((item) => (
              <div key={item.puesto} className="pt-3 first:pt-0 flex items-center gap-3">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                  item.puesto === 1
                    ? 'bg-amber-400 text-amber-950 shadow-xs'
                    : item.puesto === 2
                    ? 'bg-zinc-200 text-zinc-800'
                    : item.puesto === 3
                    ? 'bg-amber-700 text-white'
                    : 'bg-zinc-100 text-zinc-600'
                }`}>
                  #{item.puesto}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span>{item.icono}</span>
                    <h4 className="text-xs font-bold text-emerald-950 truncate">{item.nombre}</h4>
                  </div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{item.regiones}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                  {item.busquedas24h}
                </span>
              </div>
            ))}

            <div className="pt-4 text-center">
              <Link
                href="/mapa-cosechas"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 py-2.5 rounded-2xl transition-all"
              >
                <span>Explorar Cosechas en Mapa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Interactivo de Precios Históricos */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-black text-emerald-950">
                Evolución Histórica y Comparativa Regional
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Visualiza el comportamiento de precios en los últimos 3, 6 y 12 meses con proyección de zafras.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Selector de Producto */}
            <select
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
              className="text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-emerald-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="aguacate-hass">🥑 Aguacate Hass Extra</option>
              <option value="cafe-especial">☕ Café Especial Pergamino</option>
            </select>

            {/* Selector de Rango */}
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setRangoMeses('3m')}
                className={`px-3 py-1 rounded-lg transition-all ${rangoMeses === '3m' ? 'bg-white text-emerald-950 shadow-xs' : 'text-zinc-600'}`}
              >
                3 Meses
              </button>
              <button
                onClick={() => setRangoMeses('6m')}
                className={`px-3 py-1 rounded-lg transition-all ${rangoMeses === '6m' ? 'bg-white text-emerald-950 shadow-xs' : 'text-zinc-600'}`}
              >
                6 Meses
              </button>
              <button
                onClick={() => setRangoMeses('12m')}
                className={`px-3 py-1 rounded-lg transition-all ${rangoMeses === '12m' ? 'bg-white text-emerald-950 shadow-xs' : 'text-zinc-600'}`}
              >
                12 Meses
              </button>
            </div>
          </div>
        </div>

        {/* Canvas / Gráfico SVG */}
        <div className="p-4 bg-zinc-50/70 rounded-2xl border border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-emerald-950">
              {historico.producto} ({historico.unidad})
            </span>
            <span className="text-xs text-zinc-500 font-mono font-bold">
              Pico más alto: ${Math.max(...precios).toLocaleString('es-CO')}
            </span>
          </div>

          <div className="h-48 w-full flex items-end justify-between gap-2 pt-6">
            {puntosGrafica.map((punto, idx) => {
              const alturaPorcentaje = Math.round(((punto.precioPromedio - minPrecio) / (maxPrecio - minPrecio)) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-bold text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                    ${punto.precioPromedio.toLocaleString('es-CO')}
                  </span>
                  <div
                    style={{ height: `${Math.max(15, alturaPorcentaje)}%` }}
                    className="w-full max-w-[48px] bg-gradient-to-t from-emerald-700 to-green-500 rounded-t-lg group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all shadow-xs"
                  />
                  <span className="text-[10px] text-zinc-600 font-semibold text-center mt-1 truncate w-full">
                    {punto.mes}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparativa por Regiones y Estacionalidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Tabla Comparativa Regional */}
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <h3 className="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5 mb-3">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Comparativa de Precios entre Regiones</span>
            </h3>

            <div className="space-y-2">
              {historico.comparativaRegiones.map((reg, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-emerald-100 text-xs">
                  <span className="font-bold text-zinc-800">{reg.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-950 font-mono">
                      ${reg.precioActual.toLocaleString('es-CO')}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      reg.variacionVsNacional.startsWith('+')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      {reg.variacionVsNacional}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caja de Estacionalidad y Ventana de Oportunidad */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase mb-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Patrón Estacional & Épocas de Mayor Precio</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {historico.estacionalidadPicos}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-[11px] text-amber-800 font-semibold">
                ¿Tienes este producto?
              </span>
              <Link
                href="/mapa-cosechas"
                className="text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs transition-all"
              >
                Publicar Lote Ahora →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
