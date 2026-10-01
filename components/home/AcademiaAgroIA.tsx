'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Sprout, Fish, Smartphone, Headphones, PlayCircle, Award, Bot, Send } from 'lucide-react';

interface ChatMessage {
  remitente: 'usuario' | 'ia';
  texto: string;
}

export default function AcademiaAgroIA() {
  const [mensajes, setMensajes] = useState<ChatMessage[]>([
    {
      remitente: 'ia',
      texto: '¡Hola! Soy tu Asesor Agronómico Virtual. ¿Sobre qué cultivo o animal quieres aprender hoy? Ej: "Cómo abonar el café" o "¿Qué comen las tilapias?"'
    }
  ]);
  const [input, setInput] = useState('');

  const enviar = (texto: string) => {
    if (!texto.trim()) return;
    setMensajes((prev) => [...prev, { remitente: 'usuario', texto }]);
    setInput('');
    setTimeout(() => {
      let resp = 'Para este tema te recomiendo escuchar nuestro audiocurso "Fundamentos del Cultivo Seguro". Lo encuentras en la sección de La Escuela Rural.';
      const q = texto.toLowerCase();
      if (q.includes('cafe') || q.includes('café') || q.includes('broca')) {
        resp = 'El café requiere nitrógeno y potasio. Para la broca, recoge siempre los granos caídos (Re-Re). ¡Tenemos un video de 2 minutos que te enseña a hacerlo!';
      } else if (q.includes('aguacate')) {
        resp = 'En aguacate Hass aplica Boro para que no se caigan las flores. Tenemos un módulo en audio gratis sobre el Aguacate Hass, ¿te gustaría escucharlo?';
      } else if (q.includes('tilapia') || q.includes('pez')) {
        resp = 'Las tilapias necesitan agua entre 26°C y 30°C. Si el agua se enfría, no comen. Revisa la "Escuela de Crianza" para ver el video completo.';
      }
      setMensajes((prev) => [...prev, { remitente: 'ia', texto: resp }]);
    }, 600);
  };

  return (
    <section className="py-16 bg-emerald-50/60 border-y border-emerald-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>ACADEMIA AGROPACCIOLI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950">La Escuela Rural</h2>
          <p className="text-sm text-zinc-600 mt-2 max-w-2xl mx-auto">
            Aprenda de agricultura, cría de animales y ventas viendo videos cortos o escuchando audios mientras trabaja. Todo desde su celular.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1 */}
          <Link href="/escuela" className="block bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-emerald-950 mb-2">La Tierra (Agrícola)</h3>
            <p className="text-xs text-zinc-500 mb-4">Abonos, siembra, control de plagas sin venenos y podas.</p>
            <div className="flex items-center justify-center gap-3 text-emerald-700 text-xs font-bold">
              <span className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded"><PlayCircle className="w-3.5 h-3.5"/> Videos</span>
              <span className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded"><Headphones className="w-3.5 h-3.5"/> Audios</span>
            </div>
          </Link>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform">
              <Fish className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-emerald-950 mb-2">La Crianza (Animal)</h3>
            <p className="text-xs text-zinc-500 mb-4">Ganado, peces, gallinas felices y nutrición económica.</p>
            <div className="flex items-center justify-center gap-3 text-orange-700 text-xs font-bold">
              <span className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded"><PlayCircle className="w-3.5 h-3.5"/> Videos</span>
              <span className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded"><Headphones className="w-3.5 h-3.5"/> Audios</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer">
            <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-600 group-hover:scale-110 transition-transform">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-emerald-950 mb-2">Uso de la App</h3>
            <p className="text-xs text-zinc-500 mb-4">Paso a paso para publicar, vender, comprar y chatear seguro.</p>
            <div className="flex items-center justify-center gap-3 text-sky-700 text-xs font-bold">
              <span className="flex items-center gap-1 bg-sky-50 px-2 py-1 rounded"><PlayCircle className="w-3.5 h-3.5"/> Guías Rápidas</span>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-emerald-950 mb-2">Mi Libreta</h3>
            <p className="text-xs text-zinc-500 mb-4">Acumula diplomas y gana el "Sello Verde" para vender más.</p>
            <div className="flex items-center justify-center gap-3 text-amber-700 text-xs font-bold">
              <span className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded"><Award className="w-3.5 h-3.5"/> Ver Progreso</span>
            </div>
          </div>
        </div>

        {/* El Chatbot Asesor IA */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-emerald-200 shadow-lg overflow-hidden flex flex-col h-[400px]">
          <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Pregúntale al Agrónomo Virtual</h4>
                <span className="text-[11px] text-emerald-200">Responde rápido y te recomienda el mejor curso</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-emerald-50/30">
            {mensajes.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.remitente === 'usuario' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-sm ${m.remitente === 'usuario' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-zinc-800 border border-emerald-100 rounded-bl-none font-medium'}`}>
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
              placeholder="Escribe tu duda aquí (ej: 'Mis tomates tienen gusanos')..."
              className="flex-1 bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-colors shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
