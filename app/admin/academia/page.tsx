'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wand2, Search, CheckCircle2, MonitorPlay, BookOpen, Save } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { crearCursoDesdeGeneradorIA } from '@/app/actions/escuela';

export default function GeneradorCursosIA() {
  const [cultivo, setCultivo] = useState('');
  const [clima, setClima] = useState('TODOS');
  
  const [estado, setEstado] = useState<'IDLE' | 'GENERANDO' | 'LISTO' | 'GUARDADO'>('IDLE');
  const [mensajeLoader, setMensajeLoader] = useState('');

  // Simulamos los datos encontrados por la IA
  const cursoGenerado = {
    etapas: [
      { titulo: 'Preparación de Terreno', videoId: 'Y5kY7rB7p0w', desc: `Preparación ideal para ${cultivo || 'el cultivo'}` },
      { titulo: 'Siembra y Nutrición', videoId: 'qnpNOOkfZz4', desc: `Técnicas de siembra para ${cultivo || 'el cultivo'}` },
      { titulo: 'Control de Plagas', videoId: 'Z5X5lQ6JzJc', desc: `Manejo de plagas comunes en clima ${clima.toLowerCase()}` },
      { titulo: 'Cosecha y Ventas', videoId: 'LXb3EKWsInQ', desc: `Postcosecha y comercialización` }
    ],
    examen: [
      { q: `¿Qué tipo de suelo prefiere el cultivo de ${cultivo}?`, a: "Suelo bien drenado y rico en materia orgánica." },
      { q: `Principal plaga del ${cultivo} en clima ${clima}:`, a: "Depende de la humedad, usar control biológico." },
      { q: `Momento ideal de cosecha:`, a: "Cuando alcanza su madurez fisiológica." }
    ]
  };

  const generarCurso = () => {
    if (!cultivo) return alert('Por favor escriba el nombre de un cultivo');
    
    setEstado('GENERANDO');
    setMensajeLoader('Conectando con motores de búsqueda...');
    
    setTimeout(() => setMensajeLoader(`Buscando los mejores videos para ${cultivo}...`), 1500);
    setTimeout(() => setMensajeLoader('Estructurando plan de estudios (Etapas 1 a 4)...'), 3000);
    setTimeout(() => setMensajeLoader('La IA está creando las preguntas del examen...'), 4500);
    
    setTimeout(() => setEstado('LISTO'), 6000);
  };

  const guardarEnBD = async () => {
    setEstado('GENERANDO'); // Reusar loader
    setMensajeLoader('Guardando curso oficialmente en la base de datos...');
    
    const resultado = await crearCursoDesdeGeneradorIA(cultivo);
    
    if (resultado.success) {
      setEstado('GUARDADO');
      setTimeout(() => {
        setCultivo('');
        setEstado('IDLE');
      }, 4000);
    } else {
      alert("Error al guardar: " + resultado.error);
      setEstado('LISTO');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800">
            <ArrowLeft className="w-5 h-5" /> Volver al Panel Admin
          </Link>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
            <Wand2 className="w-4 h-4" /> Inteligencia Artificial Activada
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-emerald-950 mb-3">Generador Mágico de Cursos</h1>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            No pierdas tiempo buscando videos uno por uno. Escribe el nombre de cualquier fruta o cultivo y nuestra IA buscará el mejor contenido, lo estructurará y creará el examen automáticamente.
          </p>
        </div>

        {/* Creador Form */}
        {estado === 'IDLE' && (
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl border-4 border-emerald-100 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-emerald-900 mb-2 uppercase">¿Qué cultivo deseas enseñar hoy?</label>
                <input 
                  type="text" 
                  value={cultivo}
                  onChange={(e) => setCultivo(e.target.value)}
                  placeholder="Ej: Lulo, Yuca, Mango, Aguacate Hass..." 
                  className="w-full bg-zinc-50 border-2 border-emerald-200 rounded-2xl px-5 py-4 text-xl font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-emerald-900 mb-2 uppercase">Adaptación Climática</label>
                <select 
                  value={clima}
                  onChange={(e) => setClima(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-emerald-200 rounded-2xl px-5 py-4 text-lg font-bold outline-none focus:border-emerald-500"
                >
                  <option value="TODOS">General (Aplica para todos)</option>
                  <option value="CÁLIDO">Clima Cálido</option>
                  <option value="TEMPLADO">Clima Templado</option>
                  <option value="FRÍO">Clima Frío</option>
                </select>
              </div>

              <button 
                onClick={generarCurso}
                className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-black text-xl py-5 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 mt-4"
              >
                <Search className="w-6 h-6" />
                Buscar y Generar Curso Ahora
              </button>
            </div>
          </div>
        )}

        {/* Loader */}
        {estado === 'GENERANDO' && (
          <div className="bg-white rounded-[2rem] p-12 shadow-xl border-4 border-purple-100 max-w-xl mx-auto text-center flex flex-col items-center justify-center min-h-[400px]">
            <Wand2 className="w-16 h-16 text-purple-500 animate-spin-slow mb-6" />
            <h2 className="text-2xl font-black text-zinc-800 mb-2">Trabajando por ti...</h2>
            <p className="text-purple-600 font-bold text-lg animate-pulse">{mensajeLoader}</p>
          </div>
        )}

        {/* Review Pantalla */}
        {estado === 'LISTO' && (
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border-4 border-emerald-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-6 py-2 rounded-bl-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Curso Generado
            </div>
            
            <h2 className="text-3xl font-black text-emerald-900 mb-2">Curso de {cultivo} ({clima})</h2>
            <p className="text-zinc-500 mb-8 font-medium">Revisa el contenido encontrado antes de publicarlo en la academia.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Videos */}
              <div className="space-y-4">
                <h3 className="font-black text-xl text-zinc-800 flex items-center gap-2 border-b-2 pb-2"><MonitorPlay className="text-red-500" /> Videos Encontrados</h3>
                {cursoGenerado.etapas.map((etapa, i) => (
                  <div key={i} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex gap-4 items-center">
                    <div className="bg-emerald-100 text-emerald-700 font-black w-8 h-8 rounded-lg flex items-center justify-center shrink-0">{i+1}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-zinc-900">{etapa.titulo}</h4>
                      <p className="text-xs text-zinc-500">{etapa.desc}</p>
                    </div>
                    <div className="text-xs font-mono bg-zinc-200 px-2 py-1 rounded text-zinc-600">ID: {etapa.videoId}</div>
                  </div>
                ))}
              </div>

              {/* Examen */}
              <div className="space-y-4">
                <h3 className="font-black text-xl text-zinc-800 flex items-center gap-2 border-b-2 pb-2"><BookOpen className="text-blue-500" /> Examen Generado</h3>
                {cursoGenerado.examen.map((q, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <h4 className="font-bold text-blue-900 text-sm mb-1">{q.q}</h4>
                    <p className="text-xs text-blue-700 bg-white p-2 rounded border border-blue-50">Respuesta: {q.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-zinc-200 mb-6" />
            
            <div className="flex gap-4">
              <button onClick={() => setEstado('IDLE')} className="flex-1 py-4 font-bold text-zinc-600 bg-zinc-100 rounded-2xl hover:bg-zinc-200">
                Descartar y buscar otro
              </button>
              <button onClick={guardarEnBD} className="flex-[2] py-4 font-black text-white bg-emerald-600 rounded-2xl shadow-lg hover:bg-emerald-500 active:scale-95 flex items-center justify-center gap-2">
                <Save className="w-5 h-5" /> Aprobar y Guardar en Base de Datos
              </button>
            </div>
          </div>
        )}

        {estado === 'GUARDADO' && (
          <div className="bg-emerald-50 rounded-[2rem] p-12 text-center border-4 border-emerald-200 max-w-xl mx-auto">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-emerald-900 mb-2">¡Curso Publicado!</h2>
            <p className="text-emerald-700 font-bold">Miles de campesinos ahora pueden estudiar {cultivo}.</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
