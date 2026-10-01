'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, PlayCircle, BookOpen, ArrowRight } from 'lucide-react';

export default function CatalogoEscuela({ cursos = [] }: { cursos?: any[] }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = cursos.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));

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
        <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">¿Qué le gustaría aprender a cultivar hoy?</h1>
        <p className="text-emerald-100 text-lg sm:text-xl font-medium mb-6">
          Audios y videos cortos para escuchar mientras trabaja. ¡No gaste todos sus datos!
        </p>
        
        {/* Buscador de Dedos Gruesos */}
        <div className="relative">
          <Search className="w-8 h-8 text-emerald-700 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej: Café, Aguacate..." 
            className="w-full bg-white text-zinc-900 rounded-[1.5rem] pl-6 pr-16 py-5 text-xl font-black shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 placeholder:text-zinc-400 placeholder:font-bold"
          />
        </div>
      </div>

      {/* Grid de Cultivos (Botones Gigantes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtrados.map(cultivo => (
          <Link 
            href={`/escuela/${cultivo.id}`} 
            key={cultivo.id}
            className="block bg-white rounded-[2rem] p-6 border-2 border-emerald-100 shadow-sm active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-5">
              <div className={`w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center text-5xl shadow-inner ${cultivo.colorBg}`}>
                {cultivo.icono}
              </div>
              <div>
                <h3 className="text-2xl font-black text-zinc-800 leading-tight">{cultivo.nombre}</h3>
                <p className="text-sm text-zinc-500 mt-2 line-clamp-2 leading-snug font-medium">{cultivo.descripcion}</p>
              </div>
            </div>
            
            <div className="mt-6 bg-zinc-50 rounded-2xl p-5 flex items-center justify-center gap-3 border border-zinc-100">
              <PlayCircle className={`w-7 h-7 ${cultivo.colorText}`} />
              <span className={`text-lg font-black uppercase tracking-wide ${cultivo.colorText}`}>
                Empezar Curso
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {filtrados.length === 0 && (
        <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-zinc-200 mt-6">
          <p className="text-2xl font-black text-zinc-500">No encontramos ese cultivo.</p>
          <p className="text-zinc-400 mt-2 font-medium">Intente escribirlo diferente o vea toda la lista.</p>
          <button 
            onClick={() => setBusqueda('')} 
            className="mt-6 bg-emerald-600 active:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-md"
          >
            Ver todos los cultivos
          </button>
        </div>
      )}
    </div>
  );
}
