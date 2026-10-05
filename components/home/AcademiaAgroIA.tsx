'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Sprout, Fish, Smartphone, Headphones, PlayCircle, Award, Bot, Send } from 'lucide-react';

import { useChat } from '@ai-sdk/react';

export default function AcademiaAgroIA() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu Asesor Agronómico Virtual con Inteligencia Artificial. ¿Sobre qué cultivo o animal quieres aprender hoy? Ej: "Cómo abonar el café" o "¿Qué plaga afecta el aguacate?"'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.text }]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-zinc-800 border border-emerald-100 rounded-bl-none font-medium'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="max-w-[85%] rounded-2xl p-3.5 text-xs shadow-sm bg-white text-zinc-500 border border-emerald-100 rounded-bl-none italic">
                  Escribiendo respuesta...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={enviarMensaje} className="p-3 bg-white border-t border-emerald-100 flex gap-2">
            <input
              name="prompt"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu duda técnica aquí..."
              className="flex-1 bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {error && (
            <div className="bg-red-100 text-red-700 text-xs p-3 text-center font-bold">
              Hubo un error de conexión con la IA. Asegúrate de que tu OPENAI_API_KEY sea correcta. ({error})
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
