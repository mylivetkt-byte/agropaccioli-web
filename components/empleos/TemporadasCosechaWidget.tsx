'use client';

import React from 'react';
import { Sparkles, Calendar, Users, ArrowUpRight, Flame, Bell } from 'lucide-react';
import { TEMPORADAS_COSECHA_DATA } from '@/lib/agro-data';
import { CosechaEspecifica } from '@/types/agro';

interface Props {
  onSelectCosecha?: (cosecha: CosechaEspecifica) => void;
  selectedCosecha?: string;
}

export default function TemporadasCosechaWidget({ onSelectCosecha, selectedCosecha }: Props) {
  const handleAlertaClick = (nombre: string) => {
    alert(`¡Te has suscrito a las alertas de ${nombre}! Te notificaremos por WhatsApp y correo cuando se abran nuevas vacantes.`);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-700/60 relative overflow-hidden mb-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Grandes Temporadas de Cosecha en Colombia — 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Picos de Recolección & Cuadrillas Activas
          </h2>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Encuentra trabajo por temporada en las principales regiones productoras o publica tus cuadrillas de recolección.
          </p>
        </div>

        <button
          onClick={() => alert('Suscripción activa. Recibirás alertas personalizadas cuando inicie la cosecha de tu departamento.')}
          className="self-start sm:self-center inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white text-xs font-bold px-4 py-2.5 rounded-2xl border border-emerald-600/50 shadow-md transition-all"
        >
          <Bell className="w-4 h-4 text-amber-300" />
          <span>Recibir Alertas de Cosecha</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {TEMPORADAS_COSECHA_DATA.map((temp) => {
          const isSelected = selectedCosecha === temp.cosechaSlug;
          return (
            <div
              key={temp.id}
              onClick={() => onSelectCosecha && onSelectCosecha(temp.cosechaSlug)}
              className={`group bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'border-amber-400 bg-amber-500/20 shadow-lg scale-102' 
                  : 'border-emerald-700/40 hover:border-emerald-400'
              }`}
            >
              <div>
                <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-emerald-950">
                  <img src={temp.imagen} alt={temp.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-[10px] font-black text-white px-2 py-0.5 rounded">
                    {temp.region}
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {temp.nombre}
                </h3>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{temp.meses}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-300 font-medium">{temp.ofertasActivas} ofertas activas</div>
                  <div className="text-xs font-black text-amber-300">👥 {temp.vacantesTotales} vacantes</div>
                </div>

                <div className="w-7 h-7 rounded-xl bg-emerald-700/60 group-hover:bg-amber-400 group-hover:text-emerald-950 text-white flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
