'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Home, ArrowUpRight, PlusCircle, ShieldCheck, MessageCircle, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { EMPLEOS_DATA, TEMPORADAS_COSECHA_DATA } from '@/lib/agro-data';

export default function BolsaEmpleosPreview() {
  const destacadas = EMPLEOS_DATA.slice(0, 3);
  const totalActivas = EMPLEOS_DATA.filter(e => e.estado === 'activa' || !e.estado).length;

  return (
    <section className="py-14 bg-gradient-to-b from-white via-emerald-50/30 to-white border-b border-emerald-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Oportunidades Laborales del Campo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
              Bolsa de Empleo Agropecuario & Rural
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
              Fincas y empresas verificadas buscan mayordomos, administradores, cuadrillas de cosecha y técnicos en toda Colombia.
            </p>

            {/* Micro Live Indicators */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>🟢 {totalActivas} Ofertas Activas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                <Flame className="w-3 h-3 text-amber-600" />
                <span>Temporadas: Café · Aguacate · Cacao</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/empleos"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-300 px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <span>Ver Todas las Vacantes ({EMPLEOS_DATA.length})</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </div>
        </div>

        {/* Season Badges */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-black text-zinc-500 uppercase shrink-0 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Temporadas:
          </span>
          {TEMPORADAS_COSECHA_DATA.map((temp) => (
            <Link
              key={temp.id}
              href={`/empleos?cosecha=${temp.cosechaSlug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-full text-xs text-zinc-700 font-semibold shadow-xs shrink-0 transition-all hover:border-emerald-400"
            >
              <span>{temp.cosechaSlug === 'cafe' ? '☕' : temp.cosechaSlug === 'aguacate' ? '🥑' : temp.cosechaSlug === 'cacao' ? '🍫' : '🍌'}</span>
              <span>{temp.nombre}</span>
              <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {temp.vacantesTotales} vacantes
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {destacadas.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {item.sector === 'agricola' ? '🟢 Agrícola' : item.sector === 'ganadero' ? '🟠 Ganadero' : item.sector === 'acuicola' ? '🔵 Acuícola' : '🟣 Profesional'}
                  </span>
                  {item.urgente && (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                      URGENTE
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-emerald-950 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {item.titulo}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-600 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.empresaOFinca}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.municipio}, {item.departamento}</span>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[10px] text-zinc-500">Compensación:</div>
                  <div className="text-xs font-black text-emerald-900 mt-0.5">{item.salarioTexto}</div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {item.incluyeVivienda && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                      <Home className="w-3 h-3 text-amber-600" />
                      <span>Vivienda 🏡</span>
                    </span>
                  )}
                  {item.incluyeAlimentacion && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Alimentación 🍲
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <Link
                  href="/empleos"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  <span>Ver y Postularme</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${item.contactoWhatsapp}?text=Hola%20${encodeURIComponent(item.contactoNombre)},%20te%20contacto%20desde%20la%20Bolsa%20de%20Empleo%20de%20AGROPACCIOLI%20por%20la%20vacante:%20${encodeURIComponent(item.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors"
                  title="Contactar por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA para Productores */}
        <div className="mt-8 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-200 uppercase tracking-wide mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Publicación Gratuita Verificada</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold">¿Tienes una finca y necesitas cuadrillas o administradores?</h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Publica en 5 sencillos pasos y recibe postulaciones verificadas de trabajadores rurales en tu región.
            </p>
          </div>
          <Link
            href="/empleos"
            className="shrink-0 bg-white hover:bg-emerald-50 text-emerald-950 font-black px-5 py-2.5 rounded-2xl text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Publicar Oferta en 5 Pasos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
