'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Clock,
  MapPin,
  TrendingDown,
  Sparkles,
  MessageCircle,
  Truck,
  UserCheck,
  Package,
  ArrowRight,
  Search,
  Bell,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { FavoritoSeguimientoItem, CosechaItem } from '@/types/agro';
import { FAVORITOS_SEGUIMIENTO_DATA, COSECHAS_DATA } from '@/lib/agro-data';

export default function FavoritosViewer() {
  const [items, setItems] = useState<FavoritoSeguimientoItem[]>(FAVORITOS_SEGUIMIENTO_DATA);
  const [pestanaActiva, setPestanaActiva] = useState<'todos' | 'lotes' | 'productores' | 'transportistas'>('todos');
  const [loteParaSimilares, setLoteParaSimilares] = useState<FavoritoSeguimientoItem | null>(null);
  const [recordatorioActivoId, setRecordatorioActivoId] = useState<string | null>(null);

  const itemsFiltrados = items.filter(item => {
    if (pestanaActiva === 'lotes') return item.tipo === 'lote';
    if (pestanaActiva === 'productores') return item.tipo === 'productor';
    if (pestanaActiva === 'transportistas') return item.tipo === 'transportista';
    return true;
  });

  const handleEliminarFavorito = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleActivarRecordatorio = (id: string) => {
    setRecordatorioActivoId(id);
    setTimeout(() => setRecordatorioActivoId(null), 3000);
  };

  // Cosechas sugeridas para el modal "Buscar Similares"
  const cosechasSimilares = COSECHAS_DATA.slice(0, 3);

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Seguimiento Proactivo y Oportunidades Guardadas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            ⭐ Mis Favoritos y Lista de Seguimiento
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
            Monitorea el estado de lotes, novedades de productores de confianza y disponibilidad de transportistas en tiempo real.
          </p>
        </div>

        <Link
          href="/alertas"
          className="shrink-0 bg-white hover:bg-emerald-50 text-emerald-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition-all inline-flex items-center gap-2"
        >
          <Bell className="w-4 h-4 text-emerald-600" />
          <span>Configurar Alertas Proactivas</span>
        </Link>
      </div>

      {/* Banner de Recordatorio Inteligente */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-200/80 rounded-xl text-amber-900 shrink-0 mt-0.5 sm:mt-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-amber-950">
              💡 Recordatorio del Sistema AGROPACCIOLI
            </h3>
            <p className="text-xs text-amber-900 mt-0.5">
              Tienes 1 lote que vence en 48 horas (Aguacate Hass Sonsón) y 1 productor seguido con nueva cosecha publicada hoy.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleActivarRecordatorio('global')}
          className="text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 px-3.5 py-1.5 rounded-xl transition-colors shrink-0"
        >
          {recordatorioActivoId === 'global' ? '✅ Alertas Activas en WhatsApp' : '🔔 Activar Alertas WhatsApp'}
        </button>
      </div>

      {/* Pestañas de Filtro */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setPestanaActiva('todos')}
          className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all ${
            pestanaActiva === 'todos'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          Todos ({items.length})
        </button>

        <button
          onClick={() => setPestanaActiva('lotes')}
          className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all ${
            pestanaActiva === 'lotes'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          📦 Lotes que sigo ({items.filter(i => i.tipo === 'lote').length})
        </button>

        <button
          onClick={() => setPestanaActiva('productores')}
          className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all ${
            pestanaActiva === 'productores'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          👤 Productores que sigo ({items.filter(i => i.tipo === 'productor').length})
        </button>

        <button
          onClick={() => setPestanaActiva('transportistas')}
          className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all ${
            pestanaActiva === 'transportistas'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          🚚 Transportistas ({items.filter(i => i.tipo === 'transportista').length})
        </button>
      </div>

      {/* Grid de Items Favoritos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsFiltrados.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Imagen y Badges */}
              <div className="relative h-44 w-full bg-zinc-100">
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-xs">
                    {item.tipo === 'lote' ? '📦 Lote' : item.tipo === 'productor' ? '👤 Productor' : '🚚 Transporte'}
                  </span>

                  {item.estadoVenta === 'vence_pronto' && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-rose-600 text-white animate-pulse">
                      ⏰ Vence en {item.diasParaVencer} días
                    </span>
                  )}
                  {item.estadoVenta === 'en_negociacion' && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500 text-white">
                      🤝 En Negociación
                    </span>
                  )}
                  {item.estadoVenta === 'vendido' && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-zinc-700 text-white">
                      🔴 Lote Vendido
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleEliminarFavorito(item.id)}
                  title="Quitar de favoritos"
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-amber-500 hover:text-rose-600 hover:bg-white transition-colors shadow-sm"
                >
                  <Star className="w-4 h-4 fill-amber-400" />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <h3 className="font-bold text-emerald-950 text-sm line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-xs text-zinc-600 mt-0.5 line-clamp-1">
                  {item.subtitulo}
                </p>

                <div className="flex items-center gap-1 text-xs text-zinc-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.ubicacion}</span>
                </div>

                {/* Badge de Actividad Viva */}
                {item.actividadRecienteBadge && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-[11px] font-semibold text-emerald-900 leading-tight">
                    {item.actividadRecienteBadge}
                  </div>
                )}
              </div>
            </div>

            {/* Footer y Acciones */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                {item.estadoVenta === 'vendido' ? (
                  <button
                    onClick={() => setLoteParaSimilares(item)}
                    className="w-full text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 py-2.5 px-3 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Buscar Cosechas Similares</span>
                  </button>
                ) : item.tipo === 'lote' ? (
                  <>
                    <Link
                      href={`/chat?lote=${item.referenciaId}`}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
                    >
                      <span>Negociar en Chat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${item.telefonoWhatsapp}?text=Hola,%20tengo%20guardado%20su%20lote%20en%20mis%20favoritos%20de%20AGROPACCIOLI:%20${encodeURIComponent(item.titulo)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
                      title="Contactar al Productor"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] text-zinc-500 font-bold">
                      {item.tipo === 'productor' ? 'Productor Verificado' : 'Transporte Disponible'}
                    </span>

                    <a
                      href={`https://wa.me/${item.telefonoWhatsapp}?text=Hola,%20sigo%20su%20perfil%20en%20AGROPACCIOLI%20y%20deseo%20consultar%20disponibilidad.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors inline-flex items-center gap-1 text-xs font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contactar</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Buscar Cosechas Similares */}
      {loteParaSimilares && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-emerald-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-emerald-950">
                  Cosechas Similares Disponibles
                </h3>
              </div>
              <button
                onClick={() => setLoteParaSimilares(null)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 mt-3">
              Como el lote <strong className="text-zinc-900">{loteParaSimilares.titulo}</strong> ya fue vendido, encontramos estas alternativas con características similares:
            </p>

            <div className="mt-4 space-y-3">
              {cosechasSimilares.map((c) => (
                <div key={c.id} className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-emerald-950">{c.titulo}</h4>
                    <div className="text-[11px] text-zinc-600 mt-0.5">
                      {c.municipio}, {c.departamento} · {c.cantidadDisponible} {c.unidad}
                    </div>
                    <div className="text-xs font-black text-emerald-900 mt-1">
                      ${c.precioUnitario.toLocaleString('es-CO')} / {c.unidad}
                    </div>
                  </div>

                  <Link
                    href={`/chat?lote=${c.id}`}
                    onClick={() => setLoteParaSimilares(null)}
                    className="shrink-0 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
                  >
                    <span>Ver Lote</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/mapa-cosechas"
                onClick={() => setLoteParaSimilares(null)}
                className="text-xs font-bold text-emerald-800 hover:underline"
              >
                Ver todas las cosechas en el Mapa Nacional →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
