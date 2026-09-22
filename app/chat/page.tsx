'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ChatWindow from '@/components/chat/ChatWindow';
import { CONVERSACIONES_MOCK_DATA, PROPUESTAS_MOCK_DATA } from '@/lib/agro-data';
import { Conversacion, PropuestaFormal, EstadoLote } from '@/types/agro';
import { MessageSquare, Search, ShieldCheck, Filter, PlusCircle, Scale, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>(CONVERSACIONES_MOCK_DATA);
  const [selectedConvId, setSelectedConvId] = useState<string>(CONVERSACIONES_MOCK_DATA[0].id);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  const selectedConv = conversaciones.find(c => c.id === selectedConvId) || conversaciones[0];

  const filtradas = conversaciones.filter(c => {
    const matchText = 
      c.loteTitulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.productor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.productor.finca.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || c.loteEstado === filtroEstado;
    return matchText && matchEstado;
  });

  const handleUpdateConversacion = (updated: Conversacion) => {
    setConversaciones(conversaciones.map(c => c.id === updated.id ? updated : c));
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 py-8 container mx-auto px-4 max-w-7xl">
        {/* Banner Superior */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Centro de Negociación y Chat Directo</span>
            </div>
            <h1 className="text-2xl font-black text-emerald-950">
              Mensajería Oficial & Acuerdos Legales
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Toda propuesta y mensaje queda registrado con validez probatoria según la Ley 527 de 1999.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/mi-escaparate"
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 transition-colors"
            >
              Ir a Mi Escaparate (Productor)
            </Link>
            <Link
              href="/mis-intereses"
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold transition-colors"
            >
              Mis Intereses (Comprador)
            </Link>
          </div>
        </div>

        {/* Layout Grid: Sidebar de Conversaciones + Ventana de Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar de Conversaciones */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 border border-emerald-100 shadow-xl flex flex-col h-[750px]">
            {/* Buscador & Filtro */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar chat por lote o productor..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl pl-9 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
                <button
                  onClick={() => setFiltroEstado('todos')}
                  className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap ${filtroEstado === 'todos' ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                >
                  Todos ({conversaciones.length})
                </button>
                <button
                  onClick={() => setFiltroEstado('en_negociacion')}
                  className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap ${filtroEstado === 'en_negociacion' ? 'bg-amber-400 text-amber-950' : 'bg-amber-50 text-amber-800'}`}
                >
                  🟡 Negociación
                </button>
                <button
                  onClick={() => setFiltroEstado('reservado')}
                  className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap ${filtroEstado === 'reservado' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-800'}`}
                >
                  🟠 Reservados
                </button>
              </div>
            </div>

            {/* Lista de Chats */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filtradas.map((convItem) => {
                const isSelected = convItem.id === selectedConvId;
                return (
                  <button
                    key={convItem.id}
                    onClick={() => setSelectedConvId(convItem.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                        : 'bg-white border-zinc-100 hover:border-emerald-200 hover:bg-zinc-50/60'
                    }`}
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-emerald-100">
                      <img src={convItem.loteImagen} alt={convItem.loteTitulo} className="w-full h-full object-cover" />
                      {convItem.productor.activoHoy && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-emerald-950 truncate">
                          {convItem.loteTitulo}
                        </span>
                        <span className="text-[9px] text-zinc-400 whitespace-nowrap">
                          {convItem.fechaUltimoMensaje}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-0.5">
                        <span className="font-semibold text-zinc-700 truncate">{convItem.productor.nombre}</span>
                        {convItem.loteEstado === 'en_negociacion' && (
                          <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full shrink-0">🟡 Negociando</span>
                        )}
                        {convItem.loteEstado === 'reservado' && (
                          <span className="text-[9px] font-black bg-orange-100 text-orange-800 px-1.5 py-0.2 rounded-full shrink-0">🟠 Reservado</span>
                        )}
                      </div>

                      <p className="text-[11px] text-zinc-600 truncate mt-1">
                        {convItem.ultimoMensaje}
                      </p>
                    </div>

                    {convItem.mensajesNoLeidos > 0 && (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {convItem.mensajesNoLeidos}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ventana de Chat Activa */}
          <div className="lg:col-span-8">
            <ChatWindow
              conversacion={selectedConv}
              propuestas={PROPUESTAS_MOCK_DATA}
              onUpdateConversacion={handleUpdateConversacion}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
