'use client';

import React, { useState } from 'react';
import { Bot, Send, UserCheck } from 'lucide-react';

interface ChatMessage {
  remitente: 'usuario' | 'ia';
  texto: string;
}

export default function AcademiaAgroIA() {
  const [mensajes, setMensajes] = useState<ChatMessage[]>([
    {
      remitente: 'ia',
      texto: '¡Hola! Soy tu Asistente Agronómico con IA de AGROPACCIOLI. ¿Tienes dudas sobre plagas en café, nutrición en aguacate Hass, ganado o tilapia?'
    }
  ]);
  const [input, setInput] = useState('');

  const enviar = (texto: string) => {
    if (!texto.trim()) return;
    setMensajes((prev) => [...prev, { remitente: 'usuario', texto }]);
    setInput('');
    setTimeout(() => {
      let resp = 'Para este cultivo recomendamos análisis físico-químico previo y calibración de equipos según guías ICA y AGROSAVIA.';
      const q = texto.toLowerCase();
      if (q.includes('cafe') || q.includes('café') || q.includes('broca')) {
        resp = 'Para el control de broca en cafetales recomendamos recolección sanitaria (Re-Re) y aplicación de hongo entomopatógeno Beauveria bassiana.';
      } else if (q.includes('aguacate')) {
        resp = 'En aguacate Hass en floración aplicar Boro y Zinc foliar, complementado con Calcio edáfico para fortalecer el cuajado.';
      } else if (q.includes('tilapia') || q.includes('pez')) {
        resp = 'Para Tilapia Roja mantener oxígeno entre 4.0 y 6.0 mg/L y temperatura entre 26°C y 30°C.';
      }
      setMensajes((prev) => [...prev, { remitente: 'ia', texto: resp }]);
    }, 500);
  };

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>ACADEMIA & ASISTENTE AGRONÓMICO IA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">Consultorio Agronómico Inteligente</h2>
        </div>

        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden flex flex-col h-[460px]">
          <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-emerald-300" />
              <div>
                <h4 className="font-bold text-sm">AgroIA Paccioli</h4>
                <span className="text-[11px] text-emerald-200">En línea • Asistencia 24/7</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-emerald-50/20">
            {mensajes.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.remitente === 'usuario' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs ${m.remitente === 'usuario' ? 'bg-emerald-600 text-white' : 'bg-white text-zinc-800 border border-emerald-100'}`}>
                  {m.texto}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); enviar(input); }} className="p-3 bg-white border-t border-emerald-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Consulta plagas, fertilizantes o dosis..."
              className="flex-1 bg-emerald-50/40 border border-emerald-200 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
