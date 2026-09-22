'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  FileText, 
  ShieldCheck, 
  CheckCheck, 
  Check, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Star, 
  AlertTriangle,
  Scale,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Conversacion, ChatMessage, PropuestaFormal, EstadoLote } from '@/types/agro';
import ModalPropuestaFormal from './ModalPropuestaFormal';
import ModalContraoferta from './ModalContraoferta';
import ComprobanteLegalViewer from './ComprobanteLegalViewer';

interface Props {
  conversacion: Conversacion;
  propuestas: PropuestaFormal[];
  onUpdateConversacion?: (conv: Conversacion) => void;
}

export default function ChatWindow({ conversacion, propuestas, onUpdateConversacion }: Props) {
  const [conv, setConv] = useState<Conversacion>(conversacion);
  const [inputText, setInputText] = useState('');
  const [userRole, setUserRole] = useState<'comprador' | 'productor'>('comprador');
  const [isKYCVerified, setIsKYCVerified] = useState(true);

  // Modales
  const [showModalPropuesta, setShowModalPropuesta] = useState(false);
  const [showModalContraoferta, setShowModalContraoferta] = useState(false);
  const [selectedPropuestaLegal, setSelectedPropuestaLegal] = useState<PropuestaFormal | null>(null);

  // Propuesta activa si existe
  const [currentPropuesta, setCurrentPropuesta] = useState<PropuestaFormal | null>(
    propuestas.find(p => p.loteId === conv.loteId) || null
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversacionId: conv.id,
      remitente: userRole,
      remitenteNombre: userRole === 'comprador' ? conv.comprador.nombre : conv.productor.nombre,
      texto: inputText,
      timestamp: 'Ahora',
      leido: false,
      tipo: 'texto'
    };

    const updatedConv = {
      ...conv,
      ultimoMensaje: inputText,
      fechaUltimoMensaje: 'Ahora',
      mensajes: [...conv.mensajes, newMsg]
    };

    setConv(updatedConv);
    setInputText('');
    if (onUpdateConversacion) onUpdateConversacion(updatedConv);
  };

  const handleEnviarPropuesta = (nuevaPropuesta: PropuestaFormal) => {
    setCurrentPropuesta(nuevaPropuesta);
    setShowModalPropuesta(false);

    const propMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversacionId: conv.id,
      remitente: 'comprador',
      remitenteNombre: 'Tú (Comprador)',
      texto: `Se ha generado la Propuesta Formal #${nuevaPropuesta.id} por ${nuevaPropuesta.cantidadDeseada} ${nuevaPropuesta.unidad} a \$${nuevaPropuesta.precioOfrecidoUnitario.toLocaleString('es-CO')}/${nuevaPropuesta.unidad}.`,
      timestamp: 'Ahora',
      leido: false,
      tipo: 'propuesta',
      propuestaId: nuevaPropuesta.id,
      propuestaData: nuevaPropuesta
    };

    const updatedConv = {
      ...conv,
      loteEstado: 'en_negociacion' as EstadoLote,
      ultimoMensaje: `Propuesta enviada: ${nuevaPropuesta.id}`,
      fechaUltimoMensaje: 'Ahora',
      propuestaActivaId: nuevaPropuesta.id,
      mensajes: [...conv.mensajes, propMsg]
    };

    setConv(updatedConv);
    if (onUpdateConversacion) onUpdateConversacion(updatedConv);
  };

  const handleAceptarPropuesta = () => {
    if (!currentPropuesta) return;

    const updatedProp: PropuestaFormal = {
      ...currentPropuesta,
      estado: 'aceptada'
    };
    setCurrentPropuesta(updatedProp);

    const acceptMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversacionId: conv.id,
      remitente: userRole,
      remitenteNombre: userRole === 'productor' ? conv.productor.nombre : 'Comprador',
      texto: `✅ Propuesta #${currentPropuesta.id} ACEPTADA. El lote queda en estado RESERVADO bajo la Ley 527/1999.`,
      timestamp: 'Ahora',
      leido: true,
      tipo: 'aceptacion',
      propuestaId: currentPropuesta.id
    };

    const updatedConv = {
      ...conv,
      loteEstado: 'reservado' as EstadoLote,
      ultimoMensaje: '✅ Propuesta aceptada. Lote Reservado.',
      fechaUltimoMensaje: 'Ahora',
      mensajes: [...conv.mensajes, acceptMsg]
    };

    setConv(updatedConv);
    if (onUpdateConversacion) onUpdateConversacion(updatedConv);
  };

  const handleEnviarContraoferta = (data: { cantidad: number; precioUnitario: number; fechaEntrega: string; comentarios?: string }) => {
    if (!currentPropuesta) return;
    setShowModalContraoferta(false);

    const updatedProp: PropuestaFormal = {
      ...currentPropuesta,
      estado: 'contraofertada',
      contraoferta: {
        ...data,
        fechaContraoferta: 'Hoy - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };
    setCurrentPropuesta(updatedProp);

    const contraMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversacionId: conv.id,
      remitente: 'productor',
      remitenteNombre: conv.productor.nombre,
      texto: `🔄 Contraoferta del productor: ${data.cantidad} ${currentPropuesta.unidad} a \$${data.precioUnitario.toLocaleString('es-CO')} para entrega el ${data.fechaEntrega}. ${data.comentarios ? `Nota: ${data.comentarios}` : ''}`,
      timestamp: 'Ahora',
      leido: false,
      tipo: 'contraoferta',
      propuestaId: currentPropuesta.id
    };

    const updatedConv = {
      ...conv,
      loteEstado: 'en_negociacion' as EstadoLote,
      ultimoMensaje: `Contraoferta: \$${data.precioUnitario.toLocaleString('es-CO')}`,
      fechaUltimoMensaje: 'Ahora',
      mensajes: [...conv.mensajes, contraMsg]
    };

    setConv(updatedConv);
    if (onUpdateConversacion) onUpdateConversacion(updatedConv);
  };

  const handleRechazarPropuesta = () => {
    if (!currentPropuesta) return;

    const updatedProp: PropuestaFormal = {
      ...currentPropuesta,
      estado: 'rechazada'
    };
    setCurrentPropuesta(updatedProp);

    const rejectMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversacionId: conv.id,
      remitente: userRole,
      remitenteNombre: userRole === 'productor' ? conv.productor.nombre : 'Comprador',
      texto: `❌ Propuesta #${currentPropuesta.id} rechazada.`,
      timestamp: 'Ahora',
      leido: true,
      tipo: 'rechazo',
      propuestaId: currentPropuesta.id
    };

    const updatedConv = {
      ...conv,
      loteEstado: 'disponible' as EstadoLote,
      ultimoMensaje: '❌ Propuesta rechazada',
      fechaUltimoMensaje: 'Ahora',
      mensajes: [...conv.mensajes, rejectMsg]
    };

    setConv(updatedConv);
    if (onUpdateConversacion) onUpdateConversacion(updatedConv);
  };

  return (
    <div className="flex flex-col h-[750px] bg-white rounded-3xl border border-emerald-200 shadow-2xl overflow-hidden">
      {/* Header del Chat & Ficha del Lote */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-4 border-b border-emerald-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-emerald-950 border-2 border-emerald-400 shrink-0">
              <img src={conv.loteImagen} alt={conv.loteTitulo} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1">{conv.loteTitulo}</h3>
                {conv.loteEstado === 'disponible' && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">🟢 DISPONIBLE</span>}
                {conv.loteEstado === 'en_negociacion' && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">🟡 EN NEGOCIACIÓN</span>}
                {conv.loteEstado === 'reservado' && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-500 text-white">🟠 RESERVADO</span>}
                {conv.loteEstado === 'vendido' && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-600 text-white">🔴 VENDIDO</span>}
              </div>
              <p className="text-xs text-emerald-200 flex items-center gap-1.5 mt-0.5">
                <span>{conv.productor.finca}</span>
                <span>•</span>
                <span className="flex items-center text-amber-300">⭐ {conv.productor.calificacion}</span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">{conv.productor.activoHoy ? '🟢 En línea ahora' : '⏰ Activo hoy'}</span>
              </p>
            </div>
          </div>

          {/* Switch de Rol para Pruebas / Demostración */}
          <div className="flex items-center gap-2 self-end sm:self-center bg-emerald-950/60 p-1 rounded-xl border border-emerald-700/60 text-[11px]">
            <span className="text-zinc-300 px-1 text-[10px]">Ver como:</span>
            <button
              onClick={() => setUserRole('comprador')}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all ${userRole === 'comprador' ? 'bg-emerald-500 text-white' : 'text-zinc-300 hover:text-white'}`}
            >
              Comprador
            </button>
            <button
              onClick={() => setUserRole('productor')}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all ${userRole === 'productor' ? 'bg-orange-500 text-white' : 'text-zinc-300 hover:text-white'}`}
            >
              Productor
            </button>
          </div>
        </div>
      </div>

      {/* Banner de Verificación KYC */}
      {!isKYCVerified && (
        <div className="bg-amber-50 border-b border-amber-200 p-2.5 px-4 text-xs flex items-center justify-between text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Verifica tu cuenta con cédula/RUT para formalizar acuerdos y emitir mensajes de datos probatorios.</span>
          </div>
          <button 
            onClick={() => setIsKYCVerified(true)}
            className="bg-amber-600 text-white px-3 py-1 rounded-lg font-bold text-[10px] hover:bg-amber-700"
          >
            Verificar Ahora
          </button>
        </div>
      )}

      {/* Cuerpo del Hilo de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-zinc-50 to-emerald-50/20">
        <div className="text-center my-2">
          <span className="text-[10px] bg-white border border-emerald-200 px-3 py-1 rounded-full text-zinc-500 font-semibold shadow-sm">
            🔒 Negociación protegida bajo la Ley 527 de 1999 de Comercio Electrónico
          </span>
        </div>

        {conv.mensajes.map((msg) => {
          const isMe = msg.remitente === userRole;

          if (msg.tipo === 'propuesta' || msg.tipo === 'contraoferta' || msg.tipo === 'aceptacion' || msg.tipo === 'rechazo') {
            return (
              <div key={msg.id} className="flex justify-center my-3">
                <div className="bg-white rounded-2xl border-2 border-emerald-300 p-4 shadow-lg max-w-md w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                      {msg.tipo === 'propuesta' && <FileText className="w-4 h-4 text-emerald-600" />}
                      {msg.tipo === 'contraoferta' && <RefreshCw className="w-4 h-4 text-orange-500" />}
                      {msg.tipo === 'aceptacion' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {msg.tipo === 'rechazo' && <XCircle className="w-4 h-4 text-rose-600" />}
                      <span className="uppercase">
                        {msg.tipo === 'propuesta' && 'Propuesta Formal Registrada'}
                        {msg.tipo === 'contraoferta' && 'Contraoferta del Productor'}
                        {msg.tipo === 'aceptacion' && 'Propuesta Aceptada'}
                        {msg.tipo === 'rechazo' && 'Propuesta Rechazada'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs text-zinc-700 leading-relaxed font-medium bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                    {msg.texto}
                  </p>

                  {/* Acciones de la propuesta dentro del chat */}
                  {currentPropuesta && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-wrap gap-2 justify-end">
                      {/* Botón Ver Comprobante Legal */}
                      <button
                        onClick={() => setSelectedPropuestaLegal(currentPropuesta)}
                        className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <Scale className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Comprobante Legal Ley 527</span>
                      </button>

                      {/* Botones para Productor si está pendiente */}
                      {userRole === 'productor' && currentPropuesta.estado === 'pendiente' && (
                        <>
                          <button
                            onClick={handleAceptarPropuesta}
                            className="text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aceptar</span>
                          </button>
                          <button
                            onClick={() => setShowModalContraoferta(true)}
                            className="text-[11px] font-bold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Contraofertar</span>
                          </button>
                          <button
                            onClick={handleRechazarPropuesta}
                            className="text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl border border-rose-200"
                          >
                            Rechazar
                          </button>
                        </>
                      )}

                      {/* Botones para Comprador si fue contraofertada */}
                      {userRole === 'comprador' && currentPropuesta.estado === 'contraofertada' && (
                        <>
                          <button
                            onClick={handleAceptarPropuesta}
                            className="text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aceptar Contraoferta</span>
                          </button>
                          <button
                            onClick={() => setShowModalPropuesta(true)}
                            className="text-[11px] font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-xl"
                          >
                            Nueva Propuesta
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-3xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                isMe 
                  ? 'bg-emerald-600 text-white rounded-br-xs' 
                  : 'bg-white border border-emerald-100 text-zinc-800 rounded-bl-xs'
              }`}>
                <div className="font-bold text-[10px] opacity-80 mb-0.5">
                  {msg.remitenteNombre}
                </div>
                <div>{msg.texto}</div>
                <div className={`flex items-center justify-end gap-1 text-[9px] mt-1.5 ${isMe ? 'text-emerald-200' : 'text-zinc-400'}`}>
                  <span>{msg.timestamp}</span>
                  {isMe && (msg.leido ? <CheckCheck className="w-3 h-3 text-emerald-300" /> : <Check className="w-3 h-3 text-emerald-200" />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Respuestas Rápidas Sugeridas */}
      <div className="bg-white px-4 py-2 border-t border-zinc-100 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-zinc-400 text-[10px] shrink-0">Sugerencias:</span>
        <button
          onClick={() => setInputText('¿El precio base incluye cargue en finca?')}
          className="bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-800 px-2.5 py-1 rounded-full text-zinc-600 shrink-0 transition-colors"
        >
          ¿Incluye cargue en finca?
        </button>
        <button
          onClick={() => setInputText('¿Cuentan con registro ICA y certificación GlobalGAP al día?')}
          className="bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-800 px-2.5 py-1 rounded-full text-zinc-600 shrink-0 transition-colors"
        >
          ¿Registro ICA al día?
        </button>
        <button
          onClick={() => setInputText('Podemos coordinar camión refrigerado para recolección este fin de semana.')}
          className="bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-800 px-2.5 py-1 rounded-full text-zinc-600 shrink-0 transition-colors"
        >
          Coordinar camión
        </button>
      </div>

      {/* Barra de Entrada de Mensaje & Botón de Propuesta Formal */}
      <div className="p-3.5 bg-white border-t border-emerald-100 flex flex-col sm:flex-row items-center gap-2">
        <button
          type="button"
          onClick={() => setShowModalPropuesta(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-3 rounded-2xl shadow-md transition-all shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Enviar Propuesta Formal</span>
        </button>

        <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2 w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu mensaje al productor..."
            className="flex-1 bg-zinc-50 border border-emerald-200 rounded-2xl px-4 py-3 text-xs text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Modales */}
      {showModalPropuesta && (
        <ModalPropuestaFormal
          lote={{
            id: conv.loteId,
            titulo: conv.loteTitulo,
            precioUnitario: 5200,
            unidad: 'Toneladas',
            cantidadDisponible: 28,
            productorNombre: conv.productor.nombre,
            productorFinca: conv.productor.finca
          }}
          onClose={() => setShowModalPropuesta(false)}
          onSubmit={handleEnviarPropuesta}
        />
      )}

      {showModalContraoferta && currentPropuesta && (
        <ModalContraoferta
          propuesta={currentPropuesta}
          onClose={() => setShowModalContraoferta(false)}
          onSubmit={handleEnviarContraoferta}
        />
      )}

      {selectedPropuestaLegal && (
        <ComprobanteLegalViewer
          propuesta={selectedPropuestaLegal}
          onClose={() => setSelectedPropuestaLegal(null)}
        />
      )}
    </div>
  );
}
