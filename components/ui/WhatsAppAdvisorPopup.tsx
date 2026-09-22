'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, Sparkles, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function WhatsAppAdvisorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [mensajePersonalizado, setMensajePersonalizado] = useState('');

  const WHATSAPP_NUMERO = '573043965204';
  const ASESOR_FOTO = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'; // Foto profesional de asesora

  const opcionesRapidas = [
    '🌾 Deseo publicar mi cosecha',
    '🛒 Busco comprar lotes verificados',
    '🚚 Necesito cotizar transporte de carga',
    '👷 Ayuda con bolsa de empleo o soporte'
  ];

  const handleEnviarWhatsApp = (texto?: string) => {
    const msg = texto || mensajePersonalizado || 'Hola AGROPACCIOLI, necesito asesoría personalizada sobre la plataforma.';
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto font-sans">
      {/* Pop-up / Tarjeta Expandida de Atención */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-850 via-emerald-800 to-green-700 text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/80 shadow-md shrink-0">
                <Image
                  src={ASESOR_FOTO}
                  alt="Asesora AGROPACCIOLI"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-200 tracking-wide bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>En línea ahora</span>
                </div>
                <h3 className="font-bold text-sm text-white mt-0.5">Asesoría AGROPACCIOLI</h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-300" />
                  <span>Responde en menos de 2 min</span>
                </p>
              </div>
            </div>
          </div>

          {/* Cuerpo del Chat / Preguntas */}
          <div className="p-4 bg-[#f8faf9] space-y-3">
            {/* Mensaje de Bienvenida */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-emerald-100 text-xs text-zinc-700 leading-relaxed">
              👋 <strong>¡Hola! ¿Necesitas ayuda en la plataforma?</strong>
              <p className="mt-1 text-zinc-600">
                Estoy lista para orientarte en la publicación de cosechas, búsqueda de compradores mayoristas, transporte o bolsa de empleo.
              </p>
            </div>

            {/* Opciones Rápidas */}
            <div>
              <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-1.5">
                Selecciona una consulta rápida:
              </span>
              <div className="space-y-1.5">
                {opcionesRapidas.map((opcion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEnviarWhatsApp(opcion)}
                    className="w-full text-left text-xs font-semibold text-emerald-950 bg-white hover:bg-emerald-50 hover:border-emerald-300 p-2.5 rounded-xl border border-zinc-200/80 shadow-2xs transition-all flex items-center justify-between group"
                  >
                    <span>{opcion}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input para Escribir Mensaje Directo */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-emerald-200 shadow-xs focus-within:ring-2 focus-within:ring-emerald-500">
                <input
                  type="text"
                  value={mensajePersonalizado}
                  onChange={(e) => setMensajePersonalizado(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEnviarWhatsApp()}
                  placeholder="Escribe tu duda aquí..."
                  className="flex-1 text-xs px-2.5 py-1.5 bg-transparent border-none outline-hidden text-zinc-800 placeholder-zinc-400"
                />
                <button
                  onClick={() => handleEnviarWhatsApp()}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
                  title="Enviar por WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Botón Principal WhatsApp */}
          <div className="p-3 bg-white border-t border-zinc-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Línea Oficial Verificada</span>
            </div>

            <button
              onClick={() => handleEnviarWhatsApp()}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chatear (+57 304 396 5204)</span>
            </button>
          </div>
        </div>
      )}

      {/* Globo de Diálogo Flotante (Bubble) */}
      {!isOpen && showBubble && (
        <div className="mb-2.5 bg-white text-zinc-800 px-4 py-2.5 rounded-2xl rounded-br-xs shadow-xl border border-emerald-200 text-xs font-bold flex items-center gap-3 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Contáctame, <strong>¿necesitas ayuda?</strong> 💬</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            className="text-zinc-400 hover:text-zinc-600 p-0.5"
            title="Ocultar globo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Botón Flotante Redondo / Trigger */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-600 hover:from-emerald-800 hover:to-green-700 text-white p-2 sm:pl-3 sm:pr-4 rounded-full shadow-2xl shadow-emerald-700/40 border-2 border-white hover:scale-105 transition-all duration-300 cursor-pointer"
        aria-label="Contactar Asesor WhatsApp"
      >
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
          <Image
            src={ASESOR_FOTO}
            alt="Asesor AGROPACCIOLI"
            fill
            className="object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse" />
        </div>

        <div className="hidden sm:block text-left">
          <div className="text-[10px] font-black uppercase text-emerald-100 flex items-center gap-1 leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            <span>Asesor en Línea</span>
          </div>
          <div className="text-xs font-extrabold text-white mt-0.5">
            ¿Necesitas ayuda?
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xs group-hover:rotate-12 transition-transform">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
      </button>
    </div>
  );
}
