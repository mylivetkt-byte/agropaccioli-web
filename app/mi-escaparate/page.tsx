'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { 
  Store, 
  Package, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  Scale, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  Star,
  MapPin,
  ChevronRight,
  Award
} from 'lucide-react';
import { COSECHAS_DATA, PROPUESTAS_MOCK_DATA } from '@/lib/agro-data';
import { CosechaItem, PropuestaFormal, EstadoLote } from '@/types/agro';
import ModalContraoferta from '@/components/chat/ModalContraoferta';
import ComprobanteLegalViewer from '@/components/chat/ComprobanteLegalViewer';

export default function MiEscaparatePage() {
  const [activeTab, setActiveTab] = useState<EstadoLote>('en_negociacion');
  const [cosechas, setCosechas] = useState<CosechaItem[]>(COSECHAS_DATA);
  const [propuestas, setPropuestas] = useState<PropuestaFormal[]>(PROPUESTAS_MOCK_DATA);

  // Modales
  const [contraofertaTarget, setContraofertaTarget] = useState<PropuestaFormal | null>(null);
  const [comprobanteTarget, setComprobanteTarget] = useState<PropuestaFormal | null>(null);

  // Filtro por tabs
  const disponibles = cosechas.filter(c => (c.estado || 'disponible') === 'disponible');
  const enNegociacion = cosechas.filter(c => c.estado === 'en_negociacion');
  const reservados = cosechas.filter(c => c.estado === 'reservado');
  const vendidos = cosechas.filter(c => c.estado === 'vendido');

  const handleAceptarPropuesta = (propId: string) => {
    setPropuestas(propuestas.map(p => p.id === propId ? { ...p, estado: 'aceptada' } : p));
    setCosechas(cosechas.map(c => c.id === 'cos-001' ? { ...c, estado: 'reservado' } : c));
    alert('¡Propuesta Aceptada! El lote ha pasado a estado 🟠 RESERVADO con validez Ley 527/1999.');
  };

  const handleRechazarPropuesta = (propId: string) => {
    setPropuestas(propuestas.map(p => p.id === propId ? { ...p, estado: 'rechazada' } : p));
    alert('Propuesta rechazada.');
  };

  const handleContraofertaSubmit = (data: any) => {
    if (!contraofertaTarget) return;
    setPropuestas(propuestas.map(p => p.id === contraofertaTarget.id ? {
      ...p,
      estado: 'contraofertada',
      contraoferta: { ...data, fechaContraoferta: 'Hoy' }
    } : p));
    setContraofertaTarget(null);
    alert('¡Contraoferta enviada al comprador!');
  };

  const handleCompletarVenta = (loteId: string) => {
    setCosechas(cosechas.map(c => c.id === loteId ? { ...c, estado: 'vendido' } : c));
    alert('¡Entrega confirmada! El lote se registró como 🔴 VENDIDO en el historial del productor.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 py-10 container mx-auto px-4 max-w-6xl">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase mb-1">
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>Panel de Control del Productor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-950">
              Mi Escaparate Agrario
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Administra tus lotes, responde propuestas formales, contraoferta y descarga comprobantes legales.
            </p>
          </div>

          <Link
            href="/mapa-cosechas?publicar=true"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-3 rounded-2xl text-xs shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Nuevo Lote</span>
          </Link>
        </div>

        {/* Pestañas de Estado (4 Estados del Lote) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveTab('disponible')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeTab === 'disponible'
                ? 'bg-emerald-600 text-white shadow-lg border-emerald-600'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">🟢 Disponibles</span>
              <span className={`text-lg font-black ${activeTab === 'disponible' ? 'text-white' : 'text-emerald-950'}`}>
                {disponibles.length}
              </span>
            </div>
            <p className={`text-[10px] mt-1 ${activeTab === 'disponible' ? 'text-emerald-100' : 'text-zinc-400'}`}>
              Visibles en el mapa y marketplace
            </p>
          </button>

          <button
            onClick={() => setActiveTab('en_negociacion')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeTab === 'en_negociacion'
                ? 'bg-amber-500 text-white shadow-lg border-amber-500'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">🟡 En Negociación</span>
              <span className={`text-lg font-black ${activeTab === 'en_negociacion' ? 'text-white' : 'text-amber-950'}`}>
                {enNegociacion.length}
              </span>
            </div>
            <p className={`text-[10px] mt-1 ${activeTab === 'en_negociacion' ? 'text-amber-100' : 'text-zinc-400'}`}>
              Con propuestas formales activas
            </p>
          </button>

          <button
            onClick={() => setActiveTab('reservado')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeTab === 'reservado'
                ? 'bg-orange-500 text-white shadow-lg border-orange-500'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-orange-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">🟠 Reservados</span>
              <span className={`text-lg font-black ${activeTab === 'reservado' ? 'text-white' : 'text-orange-950'}`}>
                {reservados.length}
              </span>
            </div>
            <p className={`text-[10px] mt-1 ${activeTab === 'reservado' ? 'text-orange-100' : 'text-zinc-400'}`}>
              Acuerdo cerrado, pendiente entrega
            </p>
          </button>

          <button
            onClick={() => setActiveTab('vendido')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeTab === 'vendido'
                ? 'bg-rose-600 text-white shadow-lg border-rose-600'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">🔴 Vendidos</span>
              <span className={`text-lg font-black ${activeTab === 'vendido' ? 'text-white' : 'text-rose-950'}`}>
                {vendidos.length}
              </span>
            </div>
            <p className={`text-[10px] mt-1 ${activeTab === 'vendido' ? 'text-rose-100' : 'text-zinc-400'}`}>
              Historial de transacciones
            </p>
          </button>
        </div>

        {/* Contenido según la pestaña activa */}
        <div className="space-y-6">
          {/* TAB: EN NEGOCIACIÓN */}
          {activeTab === 'en_negociacion' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <span>Propuestas Formales Pendientes de Respuesta</span>
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-black">
                  {propuestas.filter(p => p.estado === 'pendiente' || p.estado === 'contraofertada').length} Activas
                </span>
              </h3>

              {propuestas.map((prop) => (
                <div key={prop.id} className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-md hover:shadow-xl transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          {prop.id}
                        </span>
                        <span className="text-xs text-zinc-400">Recibida: {prop.fechaCreacion}</span>
                      </div>
                      <h4 className="text-base font-bold text-emerald-950 mt-1">
                        {prop.loteTitulo}
                      </h4>
                    </div>

                    <span className={`text-[10px] font-black px-3 py-1 rounded-full self-start ${
                      prop.estado === 'pendiente' ? 'bg-amber-400 text-amber-950' : 'bg-orange-500 text-white'
                    }`}>
                      {prop.estado === 'pendiente' ? '🟡 PENDIENTE DE RESPUESTA' : '🔄 CONTRAOFERTADA'}
                    </span>
                  </div>

                  {/* Datos del Comprador y Términos */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[11px]">Comprador Postulante:</span>
                      <strong className="text-emerald-950 font-bold flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{prop.compradorNombre}</span>
                      </strong>
                    </div>

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
                      <span className="text-zinc-500 block text-[11px]">Fecha & Modalidad:</span>
                      <span className="font-bold text-zinc-800 block mt-0.5">{prop.fechaEntregaDeseada}</span>
                      <span className="text-[11px] text-zinc-500">{prop.lugarEntrega}</span>
                    </div>
                  </div>

                  {prop.comentarios && (
                    <div className="text-xs text-zinc-600 italic bg-amber-50/60 p-3 rounded-xl border border-amber-100 mb-4">
                      "{prop.comentarios}"
                    </div>
                  )}

                  {/* Botones de Respuesta del Productor */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setComprobanteTarget(prop)}
                        className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-emerald-200"
                      >
                        <Scale className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Ver Documento Ley 527</span>
                      </button>

                      <Link
                        href="/chat"
                        className="text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Abrir Chat con Comprador</span>
                      </Link>
                    </div>

                    {prop.estado === 'pendiente' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAceptarPropuesta(prop.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Aceptar Propuesta</span>
                        </button>

                        <button
                          onClick={() => setContraofertaTarget(prop)}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Contraofertar</span>
                        </button>

                        <button
                          onClick={() => handleRechazarPropuesta(prop.id)}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs border border-rose-200"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: DISPONIBLES */}
          {activeTab === 'disponible' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {disponibles.map(item => (
                <div key={item.id} className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-36 rounded-2xl overflow-hidden bg-zinc-100 mb-3">
                      <img src={item.imagenes[0]} alt={item.titulo} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      🟢 DISPONIBLE
                    </span>
                    <h4 className="font-bold text-emerald-950 text-sm mt-2">{item.titulo}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{item.municipio}, {item.departamento}</p>
                    <div className="mt-3 p-2 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-900">
                      {item.cantidadDisponible} {item.unidad} • ${item.precioUnitario.toLocaleString('es-CO')} /{item.unidad}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <Link href="/chat" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                      <span>Ver Consultas</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: RESERVADOS */}
          {activeTab === 'reservado' && (
            <div className="space-y-4">
              {reservados.map(item => (
                <div key={item.id} className="bg-white rounded-3xl border-2 border-orange-200 p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-orange-500 text-white uppercase">
                      🟠 LOTE RESERVADO
                    </span>
                    <h4 className="text-lg font-bold text-emerald-950 mt-2">{item.titulo}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Ubicación: {item.municipio}, {item.departamento}</p>
                    <div className="mt-2 text-xs font-semibold text-emerald-900">
                      Fecha pactada de entrega: <strong>30 de Septiembre, 2026</strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => setComprobanteTarget(PROPUESTAS_MOCK_DATA[1])}
                      className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs border border-emerald-200 flex items-center gap-1.5"
                    >
                      <Scale className="w-4 h-4 text-emerald-600" />
                      <span>Comprobante Ley 527</span>
                    </button>
                    <button
                      onClick={() => handleCompletarVenta(item.id)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Entrega y Cerrar Venta</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: VENDIDOS */}
          {activeTab === 'vendido' && (
            <div className="bg-white rounded-3xl p-8 text-center border border-zinc-200">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-emerald-950">Historial de Transacciones Exitosas</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
                Todos los lotes cerrados cuentan con certificado inmutable y calificación mutua entre productor y comprador.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modales */}
      {contraofertaTarget && (
        <ModalContraoferta
          propuesta={contraofertaTarget}
          onClose={() => setContraofertaTarget(null)}
          onSubmit={handleContraofertaSubmit}
        />
      )}

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
