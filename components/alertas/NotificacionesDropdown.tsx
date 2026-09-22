'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCheck,
  TrendingUp,
  CloudRain,
  FileCheck,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { AlertaNotificacionItem } from '@/types/agro';
import { ALERTAS_NOTIFICACIONES_DATA } from '@/lib/agro-data';

interface NotificacionesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConfigurador: () => void;
}

export default function NotificacionesDropdown({
  isOpen,
  onClose,
  onOpenConfigurador
}: NotificacionesDropdownProps) {
  const [notificaciones, setNotificaciones] = useState<AlertaNotificacionItem[]>(ALERTAS_NOTIFICACIONES_DATA);
  const [filtro, setFiltro] = useState<'todas' | 'no_leidas' | 'urgentes'>('todas');

  if (!isOpen) return null;

  const noLeidasCount = notificaciones.filter(n => !n.leido).length;

  const handleMarcarTodasLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leido: true })));
  };

  const handleMarcarLeida = (id: string) => {
    setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leido: true } : n));
  };

  const notificacionesFiltradas = notificaciones.filter(n => {
    if (filtro === 'no_leidas') return !n.leido;
    if (filtro === 'urgentes') return n.prioridad === 'alta';
    return true;
  });

  const getIcon = (tipo: AlertaNotificacionItem['tipo']) => {
    switch (tipo) {
      case 'lote_nuevo':
        return <span className="text-base">🥑</span>;
      case 'cambio_precio':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'clima_alerta':
        return <CloudRain className="w-4 h-4 text-sky-600" />;
      case 'propuesta_recibida':
        return <FileCheck className="w-4 h-4 text-indigo-600" />;
      case 'recordatorio_favorito':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-2xs sm:bg-transparent"
        onClick={onClose}
      />

      {/* Popover Card */}
      <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-900 to-green-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10">
              <Bell className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-black">Centro de Alertas</h3>
              <p className="text-[10px] text-emerald-200">
                {noLeidasCount} {noLeidasCount === 1 ? 'notificación nueva' : 'notificaciones nuevas'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {noLeidasCount > 0 && (
              <button
                onClick={handleMarcarTodasLeidas}
                title="Marcar todas como leídas"
                className="p-1.5 rounded-lg hover:bg-white/15 text-xs text-emerald-100 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="text-[10px]">Leer todo</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/15 text-emerald-200 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-1.5 p-2.5 bg-zinc-50 border-b border-zinc-100 text-xs">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-all ${
              filtro === 'todas' ? 'bg-emerald-700 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            Todas ({notificaciones.length})
          </button>
          <button
            onClick={() => setFiltro('no_leidas')}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-all ${
              filtro === 'no_leidas' ? 'bg-emerald-700 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            No leídas ({noLeidasCount})
          </button>
          <button
            onClick={() => setFiltro('urgentes')}
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] transition-all ${
              filtro === 'urgentes' ? 'bg-rose-600 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            Urgentes 🔥
          </button>
        </div>

        {/* Lista de Notificaciones */}
        <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100">
          {notificacionesFiltradas.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-50" />
              <p className="font-bold text-zinc-700">No hay notificaciones en este filtro</p>
              <p className="text-[11px] mt-0.5">Te avisaremos tan pronto haya cosechas o cambios de precio.</p>
            </div>
          ) : (
            notificacionesFiltradas.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMarcarLeida(item.id)}
                className={`p-3.5 transition-colors relative hover:bg-emerald-50/40 ${
                  !item.leido ? 'bg-emerald-50/20' : 'bg-white'
                }`}
              >
                {!item.leido && (
                  <span className="absolute left-1.5 top-4 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-300" />
                )}

                <div className="flex items-start gap-2.5 pl-1.5">
                  <div className="p-2 rounded-xl bg-zinc-100 shrink-0">
                    {getIcon(item.tipo)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-zinc-900 text-xs truncate">{item.titulo}</h4>
                      <span className="text-[10px] text-zinc-400 shrink-0">{item.timestamp}</span>
                    </div>

                    <p className="text-[11px] text-zinc-600 mt-1 line-clamp-2 leading-tight">
                      {item.descripcion}
                    </p>

                    {item.precioRef && (
                      <span className="inline-block mt-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-md">
                        {item.precioRef}
                      </span>
                    )}

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <Link
                        href={item.enlace}
                        onClick={onClose}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 group"
                      >
                        <span>{item.enlaceTexto}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      {item.prioridad === 'alta' && (
                        <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                          ALTA PRIORIDAD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenConfigurador();
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>Configurar "Avísame cuando..."</span>
          </button>

          <Link
            href="/alertas"
            onClick={onClose}
            className="text-[11px] font-bold text-zinc-500 hover:text-zinc-800"
          >
            Ver todas →
          </Link>
        </div>
      </div>
    </>
  );
}
