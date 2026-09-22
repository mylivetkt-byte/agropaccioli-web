'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  RefreshCw, 
  XCircle, 
  Scale, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  ArrowUpRight,
  Star
} from 'lucide-react';
import { PROPUESTAS_MOCK_DATA, CONVERSACIONES_MOCK_DATA } from '@/lib/agro-data';
import { PropuestaFormal } from '@/types/agro';
import ComprobanteLegalViewer from '@/components/chat/ComprobanteLegalViewer';

export default function MisInteresesPage() {
  const [activeTab, setActiveTab] = useState<'propuestas' | 'conversaciones' | 'historial'>('propuestas');
  const [propuestas, setPropuestas] = useState<PropuestaFormal[]>(PROPUESTAS_MOCK_DATA);
  const [comprobanteTarget, setComprobanteTarget] = useState<PropuestaFormal | null>(null);

  const pendientes = propuestas.filter(p => p.estado === 'pendiente' || p.estado === 'contraofertada');
  const aceptadas = propuestas.filter(p => p.estado === 'aceptada');
  const rechazadas = propuestas.filter(p => p.estado === 'rechazada');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 py-10 container mx-auto px-4 max-w-6xl">
        {/* Header Comprador */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase mb-1">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Panel de Compras & Cotizaciones</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-950">
              Mis Intereses & Negociaciones
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Rastrea el estado de tus ofertas formales de compra, chats con productores y certificados de acuerdo.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-3 rounded-2xl text-xs shadow-lg transition-all"
          >
            <span>Explorar Nuevas Cosechas</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Selector de Pestañas */}
        <div className="flex items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-emerald-100 shadow-sm overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('propuestas')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'propuestas' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Propuestas Formales ({propuestas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conversaciones')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'conversaciones' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversaciones Activas ({CONVERSACIONES_MOCK_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('historial')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'historial' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Historial Legal & Compras</span>
          </button>
        </div>

        {/* Tab 1: Propuestas Formales */}
        {activeTab === 'propuestas' && (
          <div className="space-y-4">
            {propuestas.map(prop => (
              <div key={prop.id} className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        {prop.id}
                      </span>
                      <span className="text-xs text-zinc-400">Enviada: {prop.fechaCreacion}</span>
                    </div>
                    <h4 className="text-base font-bold text-emerald-950 mt-1">
                      {prop.loteTitulo}
                    </h4>
                    <p className="text-xs text-zinc-500">{prop.productorFinca}</p>
                  </div>

                  <span className={`text-[10px] font-black px-3 py-1 rounded-full self-start ${
                    prop.estado === 'pendiente' ? 'bg-amber-100 text-amber-900' :
                    prop.estado === 'contraofertada' ? 'bg-orange-500 text-white' :
                    prop.estado === 'aceptada' ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {prop.estado === 'pendiente' && '🟡 PENDIENTE DE RESPUESTA'}
                    {prop.estado === 'contraofertada' && '🔄 CONTRAOFERTA RECIBIDA'}
                    {prop.estado === 'aceptada' && '✅ ACEPTADA (LOTE RESERVADO)'}
                    {prop.estado === 'rechazada' && '❌ RECHAZADA'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Cantidad & Precio Ofrecido:</span>
                    <strong className="text-emerald-950 font-black text-sm block mt-0.5">
                      {prop.cantidadDeseada} {prop.unidad} × ${prop.precioOfrecidoUnitario.toLocaleString('es-CO')}
                    </strong>
                    <span className="text-[11px] text-zinc-500">
                      Total: ${prop.precioTotalEstimado.toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[11px]">Fecha Estimada de Entrega:</span>
                    <strong className="text-zinc-800 font-bold block mt-0.5">{prop.fechaEntregaDeseada}</strong>
                    <span className="text-[11px] text-zinc-500">{prop.lugarEntrega}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[11px]">Respaldo Legal:</span>
                    <span className="text-xs text-emerald-800 font-semibold block mt-0.5">Ley 527/1999 Verificada</span>
                    <span className="text-[10px] font-mono text-zinc-400">Hash: {prop.hashIntegridadLegal.substring(0, 16)}...</span>
                  </div>
                </div>

                {prop.contraoferta && (
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 mb-4 text-xs">
                    <div className="font-bold text-orange-950 flex items-center gap-1.5 mb-1">
                      <RefreshCw className="w-4 h-4 text-orange-600" />
                      <span>Contraoferta del Productor ({prop.contraoferta.fechaContraoferta})</span>
                    </div>
                    <p className="text-orange-900 font-semibold">
                      El productor ajustó el precio a <strong>${prop.contraoferta.precioUnitario.toLocaleString('es-CO')} /{prop.unidad}</strong> por {prop.contraoferta.cantidad} {prop.unidad} con entrega el {prop.contraoferta.fechaEntrega}.
                    </p>
                    {prop.contraoferta.comentarios && (
                      <p className="mt-1 text-zinc-600 italic">"{prop.contraoferta.comentarios}"</p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                  <button
                    onClick={() => setComprobanteTarget(prop)}
                    className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-emerald-200"
                  >
                    <Scale className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Descargar Comprobante Legal</span>
                  </button>

                  <Link
                    href="/chat"
                    className="text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Abrir Chat con Productor</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Conversaciones Activas */}
        {activeTab === 'conversaciones' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONVERSACIONES_MOCK_DATA.map(c => (
              <div key={c.id} className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-emerald-100">
                  <img src={c.loteImagen} alt={c.loteTitulo} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-emerald-950 text-sm truncate">{c.loteTitulo}</h4>
                  <p className="text-xs text-zinc-500">{c.productor.nombre} • {c.productor.finca}</p>
                  <p className="text-xs text-zinc-700 mt-2 bg-zinc-50 p-2 rounded-xl truncate">"{c.ultimoMensaje}"</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400">{c.fechaUltimoMensaje}</span>
                    <Link href="/chat" className="text-xs font-bold text-emerald-700 hover:underline">
                      Continuar Chat →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Historial Legal */}
        {activeTab === 'historial' && (
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Scale className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">Registro Notarial y Mensajes de Datos</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 mb-6">
              Todos tus acuerdos y comprobantes cuentan con firma electrónica e integridad SHA-256 válida para trámites bancarios, seguros agrícolas y declaraciones tributarias (DIAN).
            </p>
            <button
              onClick={() => setComprobanteTarget(propuestas[0])}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md"
            >
              Ver Último Comprobante Emitido
            </button>
          </div>
        )}
      </main>

      {comprobanteTarget && (
        <ComprobanteLegalViewer
          propuesta={comprobanteTarget}
          onClose={() => setComprobanteTarget(null)}
        />
      )}

      <Footer />
    </div>
  );
}
