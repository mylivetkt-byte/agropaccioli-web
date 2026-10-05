'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, PlayCircle, BookOpen, ArrowRight, Mic, MicOff } from 'lucide-react';

export default function CatalogoEscuela({ cursos = [] }: { cursos?: any[] }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [buscandoIA, setBuscandoIA] = useState(false);
  const [recomendacionesIA, setRecomendacionesIA] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta búsqueda por voz.');
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      setBusqueda(event.results[0][0].transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const categorias = ['Todas', 'Agrícola', 'Ganadería', 'Piscícola', 'Avícola'];

  // Helper para quitar tildes
  const normalizeStr = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtrados = cursos.filter(c => {
    // Si tenemos recomendaciones de IA, mostrar solo esas y en ese orden
    if (recomendacionesIA.length > 0) {
      return recomendacionesIA.includes(c.id);
    }
    const matchBusqueda = normalizeStr(c.nombre).includes(normalizeStr(busqueda));
    const matchCategoria = categoriaSel === 'Todas' || (c.sector && c.sector.toLowerCase() === categoriaSel.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
    return matchBusqueda && matchCategoria;
  }).sort((a, b) => {
    if (recomendacionesIA.length > 0) {
      return recomendacionesIA.indexOf(a.id) - recomendacionesIA.indexOf(b.id);
    }
    return 0;
  });

  const buscarConIA = async () => {
    if (!busqueda) {
      setRecomendacionesIA([]);
      return;
    }
    setBuscandoIA(true);
    try {
      const res = await fetch('/api/escuela/recomendaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ busqueda, sector: categoriaSel })
      });
      const data = await res.json();
      if (data.recomendaciones) {
        setRecomendacionesIA(data.recomendaciones);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBuscandoIA(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      
      {/* BANNER PARA ESTUDIANTES REGISTRADOS */}
      <Link href="/escuela/libreta" className="group block mb-6 bg-gradient-to-r from-amber-200 to-amber-100 rounded-3xl p-1 shadow-sm hover:shadow-md transition-all active:scale-95">
        <div className="bg-white/60 backdrop-blur-sm rounded-[1.4rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/50">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-amber-400 text-amber-950 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-amber-950 leading-tight">¿Ya es estudiante de la escuela?</h2>
              <p className="text-amber-800 font-medium text-sm">Entre a su Libreta de Notas y vea sus diplomas.</p>
            </div>
          </div>
          <div className="bg-amber-500 text-amber-950 font-black px-6 py-3 rounded-xl flex items-center gap-2 group-hover:bg-amber-400 transition-colors shadow-sm w-full sm:w-auto justify-center">
            Ingresar <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Header Gigante para Celular */}
      <div className="bg-emerald-800 rounded-[2rem] p-6 sm:p-10 text-white shadow-lg mb-8">
        <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">¿Qué le gustaría aprender hoy?</h1>
        <p className="text-emerald-100 text-lg sm:text-xl font-medium mb-6">
          Audios y videos cortos para escuchar mientras trabaja. ¡No gaste todos sus datos!
        </p>
        
        {/* Buscador de Dedos Gruesos */}
        <div className="relative flex gap-2 mt-4 flex-col sm:flex-row">
          <div className="relative flex-1 flex items-center bg-white rounded-[1.5rem] shadow-inner focus-within:ring-4 focus-within:ring-emerald-400 pr-3 overflow-hidden border border-emerald-100">
            <Search className="w-8 h-8 text-emerald-700 absolute left-4 pointer-events-none" />
            <input 
              type="text" 
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                if(e.target.value === '') setRecomendacionesIA([]);
              }}
              onKeyDown={(e) => e.key === 'Enter' && buscarConIA()}
              placeholder="Ej: Cerdos, Truchas..." 
              className="w-full bg-transparent text-zinc-900 pl-14 pr-4 py-5 text-xl font-black outline-none placeholder:text-zinc-400 placeholder:font-bold"
            />
            <button 
              onClick={toggleListening}
              className={`p-3 rounded-xl transition-all shrink-0 ml-1 ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
              title="Buscar por voz"
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          </div>
          <button 
            onClick={buscarConIA}
            disabled={buscandoIA}
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-[1.5rem] px-6 py-4 sm:py-0 flex items-center justify-center transition-colors shadow-sm disabled:opacity-70"
          >
            {buscandoIA ? 'Buscando...' : 'Buscar con IA ✨'}
          </button>
        </div>
      </div>

      {/* Pestañas de Categorías */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => { setCategoriaSel(cat); setRecomendacionesIA([]); }}
            className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
              categoriaSel === cat 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-emerald-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Cultivos (Botones Gigantes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtrados.map(curso => (
          <Link 
            href={`/escuela/${curso.id}`} 
            key={curso.id}
            className="block bg-white rounded-[2rem] p-6 border-2 border-emerald-100 shadow-sm active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-5">
              <div className={`w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center text-5xl shadow-inner ${curso.colorBg}`}>
                {curso.icono}
              </div>
              <div>
                <h3 className="text-2xl font-black text-zinc-800 leading-tight">{curso.nombre}</h3>
                <p className="text-sm text-zinc-500 mt-2 line-clamp-2 leading-snug font-medium">{curso.descripcion}</p>
              </div>
            </div>
            
            <div className="mt-6 bg-zinc-50 rounded-2xl p-5 flex items-center justify-center gap-3 border border-zinc-100">
              <PlayCircle className={`w-7 h-7 ${curso.colorText}`} />
              <span className={`text-lg font-black uppercase tracking-wide ${curso.colorText}`}>
                Empezar Curso
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {filtrados.length === 0 && (
        <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-zinc-200 mt-6">
          <p className="text-2xl font-black text-zinc-500">No encontramos ese curso.</p>
          <p className="text-zinc-400 mt-2 font-medium">Intente escribirlo diferente o vea toda la lista.</p>
          <button 
            onClick={() => { setBusqueda(''); setRecomendacionesIA([]); setCategoriaSel('Todas'); }} 
            className="mt-6 bg-emerald-600 active:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-md"
          >
            Ver todos los cursos
          </button>
        </div>
      )}
    </div>
  );
}
