'use client';

import React, { useState } from 'react';
import { Search, GraduationCap, Award, BookOpen, Star, PlayCircle, FileText, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';

export default function MiLibretaDashboard({ studentData }: { studentData: any }) {
  const [busqueda, setBusqueda] = useState('');
  const [descargandoId, setDescargandoId] = useState<string | null>(null);
  
  if (!studentData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-emerald-900">Cargando Libreta...</h2>
      </div>
    );
  }

  const { estudiante, cursosActivos, diplomas } = studentData;

  // Autocompletado dinámico basado en la BD
  const sugerencias = [
    ...cursosActivos.map((c: any) => `Clase: ${c.nombre}`),
    ...diplomas.map((d: any) => `Diploma: ${d.cultivo.nombre}`)
  ].filter(s => s.toLowerCase().includes(busqueda.toLowerCase()) && busqueda.length > 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
      
      {/* CABECERA DINÁMICA DE BASE DE DATOS */}
      <div className="bg-emerald-700 rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-emerald-400 shrink-0">
            <span className="text-4xl sm:text-6xl">🧑‍🌾</span>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">¡Hola, {estudiante.nombre.split(' ')[0]}!</h1>
            <p className="text-emerald-100 text-lg sm:text-xl font-medium mb-4">
              Bienvenido a su Libreta de Notas. Aquí puede ver qué tanto ha aprendido y descargar sus diplomas ganados.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 px-4 py-2 rounded-full font-bold shadow-sm">
              <Star className="w-5 h-5 fill-amber-950" />
              Campesino Nivel {estudiante.nivel} - ({estudiante.puntos} Pts)
            </div>
          </div>
        </div>
      </div>

      {/* BUSCADOR AUTOCOMPLETABLE */}
      <div className="mb-12 relative">
        <label className="block text-emerald-950 font-black text-xl mb-3 text-center sm:text-left">
          ¿Qué está buscando hoy? Escriba y nosotros le ayudamos:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
            <Search className="h-8 w-8 text-emerald-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-6 pr-16 py-6 text-xl sm:text-2xl font-bold bg-white border-4 border-emerald-200 rounded-3xl shadow-sm focus:ring-0 focus:border-emerald-500 outline-none transition-colors text-emerald-900 placeholder:text-emerald-300 placeholder:font-medium"
            placeholder="Ej: Cacao, Notas, Diploma..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        
        {sugerencias.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white border-[3px] border-emerald-400 rounded-2xl shadow-2xl overflow-hidden">
            {sugerencias.map((sug, i) => (
              <button 
                key={i}
                className="w-full text-left px-6 py-4 text-xl font-bold text-emerald-800 hover:bg-emerald-50 border-b border-emerald-100 last:border-0 flex items-center gap-3 transition-colors"
                onClick={() => setBusqueda(sug)}
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                {sug}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUMNA 1: Notas y Progreso Dinámicas */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-sky-600" />
            <h2 className="text-2xl font-black text-emerald-950">Mis Clases Actuales</h2>
          </div>

          {cursosActivos.length === 0 ? (
            <p className="text-zinc-500 font-bold bg-white p-6 rounded-3xl border-2 border-dashed">Aún no ha iniciado ninguna clase.</p>
          ) : (
            cursosActivos.map((curso: any) => (
              <div key={curso.id} className="bg-white border-2 border-zinc-200 rounded-3xl p-6 shadow-sm hover:border-sky-300 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
                  <span>{curso.icono}</span> {curso.nombre}
                </h3>
                <p className="text-zinc-600 mb-4 font-medium">Nota actual: <span className="text-emerald-600 font-black text-xl">{curso.notaActual.toFixed(1)} / 5.0</span></p>
                
                <div className="w-full bg-zinc-100 rounded-full h-6 mb-2 overflow-hidden border border-zinc-200">
                  <div className={`h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${curso.porcentaje > 50 ? 'bg-sky-500' : 'bg-amber-400'}`} style={{ width: `${curso.porcentaje}%` }}>
                    {curso.porcentaje}% Completado
                  </div>
                </div>
                
                <Link href={`/escuela/${curso.id}`} className="mt-4 w-full bg-sky-50 text-sky-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 border border-sky-200 hover:bg-sky-100 transition-colors">
                  <PlayCircle className="w-6 h-6" /> Continuar Escuchando Clase
                </Link>
              </div>
            ))
          )}

        </div>

        {/* COLUMNA 2: Diplomas Dinámicos */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl font-black text-emerald-950">Mis Diplomas Ganados</h2>
          </div>

          {diplomas.length === 0 ? (
            <div className="bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <GraduationCap className="w-16 h-16 text-zinc-300 mb-4" />
              <h3 className="text-lg font-bold text-zinc-600 mb-2">Aún no tiene diplomas</h3>
              <p className="text-zinc-500 font-medium text-sm">Termine sus clases actuales para ganar sus primeros reconocimientos.</p>
            </div>
          ) : (
            diplomas.map((diploma: any) => (
              <div key={diploma.id} className="bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-md relative overflow-hidden mb-6">
                <div className="absolute -right-6 -top-6 text-amber-200/50">
                  <Award className="w-40 h-40" />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-block bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-lg mb-3 uppercase tracking-wider">
                    Graduado con {diploma.notaFinal.toFixed(1)}
                  </div>
                  <h3 className="text-2xl font-black text-amber-950 mb-2 leading-tight">{diploma.cultivo.nombre}</h3>
                  <p className="text-amber-800 font-medium mb-4">Aprobado oficialmente el {new Date(diploma.fechaEmision).toLocaleDateString()}.</p>
                  <p className="text-amber-900/60 text-[10px] font-bold uppercase tracking-widest mb-6">Cod: {diploma.codigoVerificacion}</p>
                  
                  <button 
                    onClick={async () => {
                      try {
                        setDescargandoId(diploma.id);
                        const element = document.getElementById(`diploma-oculto-${diploma.id}`);
                        if (!element) return;
                        
                        const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1056, 816] });
                        pdf.addImage(imgData, 'PNG', 0, 0, 1056, 816);
                        pdf.save(`Diploma_${diploma.cultivo.nombre.replace(/\s+/g, '_')}.pdf`);
                      } catch (err: any) {
                        console.error("Error PDF:", err);
                        alert("Error generando el PDF: " + (err.message || "Error desconocido"));
                      } finally {
                        setDescargandoId(null);
                      }
                    }}
                    disabled={descargandoId === diploma.id}
                    className={`w-full text-amber-700 font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm border border-amber-200 transition-all ${descargandoId === diploma.id ? 'bg-amber-100 cursor-not-allowed' : 'bg-white hover:shadow-md hover:bg-amber-50'}`}
                  >
                    {descargandoId === diploma.id ? (
                      <>GENERANDO PDF...</>
                    ) : (
                      <>
                        <Download className="w-6 h-6" />
                        DESCARGAR DIPLOMA (PDF)
                      </>
                    )}
                  </button>
                </div>

                {/* --- PLANTILLA OCULTA PERFECTA PARA EL PDF --- */}
                <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                  <div id={`diploma-oculto-${diploma.id}`} className="w-[1056px] h-[816px] bg-[#Fdfbf7] relative flex flex-col px-24 py-16 justify-between items-center text-center overflow-hidden">
                    {/* Borde Elegante */}
                    <div className="absolute inset-8 border-[4px] border-[#134E4A] z-10 pointer-events-none">
                      <div className="absolute inset-1 border-[1px] border-[#134E4A]"></div>
                    </div>
                    
                    {/* Header Centrado */}
                    <div className="flex flex-col w-full items-center justify-center border-b-[3px] border-emerald-900/30 pb-6 mb-8 relative z-20 text-center">
                      {/* Logo con altura estrictamente fijada en estilo en línea para que html2canvas no lo estire */}
                      <img 
                        src="/logo-agropaccioli.png" 
                        alt="Agropaccioli Logo" 
                        style={{ height: '140px', width: 'auto', objectFit: 'contain' }} 
                        className="mb-4" 
                      />
                      <h1 className="text-4xl font-black text-emerald-900 tracking-wider m-0">AGROPACCIOLI</h1>
                      <p className="text-emerald-800 font-bold tracking-widest uppercase text-md m-0">Plataforma Educativa Rural</p>
                      <h2 className="text-6xl font-serif text-amber-700 font-bold tracking-widest uppercase m-0 mt-6">DIPLOMA DE EXCELENCIA</h2>
                    </div>

                    {/* Cuerpo */}
                    <div className="flex flex-col items-center justify-center space-y-4 w-full flex-1 relative z-20">
                      <p className="text-zinc-700 text-2xl font-serif italic m-0">La dirección académica hace constar que el señor(a):</p>
                      <h1 className="text-6xl font-black text-zinc-900 uppercase tracking-wide py-2 font-serif border-b-2 border-zinc-300 w-[80%] text-center m-0">
                        {estudiante.nombre}
                      </h1>
                      <p className="text-zinc-700 text-xl max-w-4xl leading-relaxed text-center m-0 mt-4">
                        Cursó, aprobó y demostró plena competencia técnica y práctica en el programa de formación rural enfocado en:
                      </p>
                      <h2 className="text-5xl font-black text-emerald-900 uppercase tracking-widest text-center m-0 my-4">
                        {diploma.cultivo.nombre}
                      </h2>
                    </div>

                    {/* Fechas */}
                    <div className="flex justify-center gap-24 mt-4 w-full relative z-20">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="block text-zinc-500 font-bold text-sm uppercase tracking-wider mb-2">Finalizó con éxito el</span>
                        <span className="text-zinc-900 font-bold text-xl border-t border-zinc-300 pt-2 w-32 text-center">{new Date(diploma.fechaEmision).toLocaleDateString('es-CO')}</span>
                      </div>
                    </div>

                    {/* Sellos */}
                    <div className="grid grid-cols-3 w-full items-end mt-4 pt-6 relative z-20">
                      
                      {/* Izquierda: Firma */}
                      <div className="flex flex-col items-center justify-end text-center">
                        <p className="font-serif text-4xl text-emerald-900 mb-2 italic m-0">A. Paccioli</p>
                        <div className="w-56 h-px bg-zinc-500 mb-2"></div>
                        <p className="font-bold text-zinc-800 uppercase text-xs tracking-wider m-0">Dirección Académica</p>
                      </div>

                      {/* Centro: QR Code Matemáticamente Centrado */}
                      <div className="flex flex-col items-center justify-center mb-2">
                        <div className="bg-white p-2 rounded shadow-sm border border-zinc-200">
                          <QRCodeSVG 
                            value="https://www.agropaccioli.com" 
                            size={100} 
                            level="H" 
                            fgColor="#064e3b" 
                            includeMargin={false} 
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-2">Valide este certificado en línea</p>
                      </div>

                      {/* Derecha: Código de Verificación */}
                      <div className="flex flex-col items-center justify-end text-center">
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 m-0">Cód. Verificación</p>
                        <p className="text-lg font-black text-zinc-800 tracking-widest bg-zinc-100 px-4 py-2 rounded border border-zinc-200 m-0">{diploma.codigoVerificacion}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
                {/* --- FIN PLANTILLA --- */}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}
