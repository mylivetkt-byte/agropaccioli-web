import React from 'react';
import prisma from '@/lib/prisma';
import DiplomaClient from './DiplomaClient';

export default async function DiplomaPage({ params }: { params: Promise<{ diplomaId: string }> }) {
  const resolvedParams = await params;
  const diploma = await prisma.academiaDiploma.findUnique({
    where: { id: resolvedParams.diplomaId },
    include: {
      usuario: true,
      cultivo: true
    }
  });

  if (!diploma) {
    return <div className="p-10 text-center text-red-600 font-bold text-2xl">Diploma no encontrado o inválido.</div>;
  }

  // Simular fecha de inicio (30 días antes de la emisión)
  const fechaTermino = new Date(diploma.fechaEmision);
  const fechaInicio = new Date(fechaTermino.getTime() - 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-zinc-200 flex flex-col items-center justify-center p-4 print:p-0 print:bg-white">
      <DiplomaClient diplomaNombre={`Diploma_${diploma.usuario.nombre.replace(/\s+/g, '_')}`} />

      {/* Contenedor del Diploma */}
      <div 
        id="diploma-pdf-container"
        className="w-[1056px] h-[816px] bg-white shadow-2xl relative flex flex-col origin-top overflow-hidden"
        style={{ transform: 'scale(min(1, calc(100vw / 1100)))' }}
      >
        {/* Fondo sutil tipo pergamino/papel de seguridad */}
        <div className="absolute inset-0 bg-[#Fdfbf7] opacity-80 z-0"></div>
        
        {/* Borde Elegante Tradicional */}
        <div className="absolute inset-8 border-[4px] border-[#134E4A] z-10 pointer-events-none">
          <div className="absolute inset-1 border-[1px] border-[#134E4A]"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-20 flex flex-col px-24 py-16 h-full justify-between items-center text-center">
          
          {/* Header */}
          <div className="flex w-full justify-between items-center border-b-[3px] border-emerald-900/30 pb-6 mb-6">
            <div className="flex items-center gap-4 text-left">
              <img src="/logo-agropaccioli.png" alt="Agropaccioli Logo" className="h-24 object-contain" />
              <div>
                <h1 className="text-3xl font-black text-emerald-900 tracking-wider m-0">AGROPACCIOLI</h1>
                <p className="text-emerald-800 font-bold tracking-widest uppercase text-sm m-0">Plataforma Educativa Rural</p>
                <p className="text-zinc-600 text-xs font-serif italic m-0 mt-1">Curso virtual avalado por agropaccioli.com</p>
              </div>
            </div>
            
            <div className="text-right">
              <h2 className="text-5xl font-serif text-amber-700 font-bold tracking-widest uppercase m-0">Diploma</h2>
              <p className="text-zinc-500 text-sm tracking-widest uppercase font-bold m-0 mt-1">Certificado de Excelencia</p>
            </div>
          </div>

          {/* Cuerpo Central - Todo 100% centrado */}
          <div className="flex flex-col items-center justify-center space-y-6 w-full flex-1">
            <p className="text-zinc-700 text-2xl font-serif italic w-full text-center m-0">
              La dirección académica hace constar que el señor(a):
            </p>
            
            <h1 className="text-6xl font-black text-zinc-900 uppercase tracking-wide py-2 font-serif border-b-2 border-zinc-300 w-[80%] text-center m-0">
              {diploma.usuario.nombre}
            </h1>
            
            <p className="text-zinc-700 text-xl max-w-4xl leading-relaxed text-center m-0 mt-4">
              Cursó, aprobó y demostró plena competencia técnica y práctica en el programa de formación rural enfocado en:
            </p>

            <h2 className="text-5xl font-black text-emerald-900 uppercase tracking-widest text-center m-0 my-4">
              {diploma.cultivo.nombre}
            </h2>

            {/* Fechas */}
            <div className="flex justify-center gap-24 mt-4 w-full">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="block text-zinc-500 font-bold text-sm uppercase tracking-wider mb-2">Inició el curso el</span>
                <span className="text-zinc-900 font-bold text-xl border-t border-zinc-300 pt-2 w-32 text-center">{fechaInicio.toLocaleDateString('es-CO')}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="block text-zinc-500 font-bold text-sm uppercase tracking-wider mb-2">Finalizó con éxito el</span>
                <span className="text-zinc-900 font-bold text-xl border-t border-zinc-300 pt-2 w-32 text-center">{fechaTermino.toLocaleDateString('es-CO')}</span>
              </div>
            </div>
          </div>

          {/* Firmas y Sellos */}
          <div className="flex w-full justify-between items-end mt-4 pt-6">
            
            <div className="flex flex-col items-center text-center">
              <p className="font-serif text-4xl text-emerald-900 mb-2 italic m-0">A. Paccioli</p>
              <div className="w-64 h-px bg-zinc-500 mb-2"></div>
              <p className="font-bold text-zinc-800 uppercase text-xs tracking-wider m-0">Dirección Académica</p>
            </div>

            {/* Sello de Autenticidad */}
            <div className="flex items-center justify-center mb-2">
              <div className="w-28 h-28 rounded-full border-[6px] border-double border-amber-600/40 flex items-center justify-center bg-white shadow-sm">
                <div className="w-20 h-20 rounded-full border border-amber-600/30 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center shadow-inner">
                  <span className="text-[9px] font-black text-amber-800 uppercase text-center leading-tight tracking-widest">Sello<br/>Institucional<br/>Agropaccioli</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 m-0">Cód. Verificación Ley 527/1999</p>
              <p className="text-xl font-black text-zinc-800 tracking-widest bg-zinc-100 px-4 py-2 rounded border border-zinc-200 m-0">{diploma.codigoVerificacion}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
