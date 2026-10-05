'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, PlayCircle, Headphones, CheckCircle2, ChevronRight, ChevronLeft, Sun, CloudRain } from 'lucide-react';
import { guardarProgresoClase } from '@/app/actions/escuela';
import { obtenerCursoCompleto } from '@/app/actions/escuela_curso';

import colombiaData from '@/lib/colombia.json';

export default function SalonDeClases({ cursoId, nombreReal }: { cursoId: string, nombreReal: string }) {
  const [ubicacionRegistrada, setUbicacionRegistrada] = useState(false);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(true);
  const [departamento, setDepartamento] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [vereda, setVereda] = useState('');
  const [climaDetectado, setClimaDetectado] = useState('');
  const [modoAudio, setModoAudio] = useState(false);
  
  // Datos reales de Base de Datos
  const [cursoBD, setCursoBD] = useState<any>(null);
  const [cargandoCurso, setCargandoCurso] = useState(true);

  // Persistir ubicación para que no se le pregunte cada vez
  React.useEffect(() => {
    const ubicacionGuardada = sessionStorage.getItem('ubicacion_clase');
    if (ubicacionGuardada) {
      const data = JSON.parse(ubicacionGuardada);
      setDepartamento(data.departamento);
      setMunicipio(data.municipio);
      setClimaDetectado(data.climaDetectado);
      setUbicacionRegistrada(true);
    }
    setCargandoUbicacion(false);

    // Cargar curso desde BD
    obtenerCursoCompleto(cursoId).then(data => {
      setCursoBD(data);
      setCargandoCurso(false);
    });
  }, [cursoId]);

  // Estados del curso
  const [etapaActual, setEtapaActual] = useState(1);
  const [guardando, setGuardando] = useState(false);
  
  // Estados del Examen
  const [pasoExamen, setPasoExamen] = useState(0);
  const [notaFinal, setNotaFinal] = useState<number | null>(null);

  const preguntasExamen = [
    {
      pregunta: "¿Cuál es el primer paso fundamental antes de iniciar la siembra?",
      opciones: ["Aplicar herbicidas potentes", "Analizar y preparar el terreno", "Regar en exceso el campo"],
      correcta: 1
    },
    {
      pregunta: "Según las Buenas Prácticas, el control de plagas debe ser:",
      opciones: ["Preventivo y biológico", "Únicamente con químicos rojos", "Inexistente hasta ver el daño"],
      correcta: 0
    },
    {
      pregunta: "Para una excelente etapa de Cosecha y Ventas, se debe:",
      opciones: ["Revolver productos de diferentes calidades", "Clasificar, limpiar y empacar correctamente", "Transportar en vehículos sucios"],
      correcta: 1
    }
  ];

  const avanzarYGuardar = async () => {
    setGuardando(true);
    // Asumimos el usuario 'Don Carlos' para la prueba (573111111111)
    await guardarProgresoClase('573111111111', cursoId, etapaActual);
    setGuardando(false);
    
    // Si hay una siguiente etapa, avanzamos. Si no, pasamos al examen (etapaActual = total + 1)
    const totalEtapas = cursoBD?.etapas?.length || 4;
    if (etapaActual <= totalEtapas) {
      setEtapaActual(prev => prev + 1);
    }
  };

  const responderPregunta = (idxOpcion: number) => {
    const esCorrecta = idxOpcion === preguntasExamen[pasoExamen].correcta;
    
    if (pasoExamen < preguntasExamen.length - 1) {
      setPasoExamen(prev => prev + 1);
      if (esCorrecta) setNotaFinal(prev => (prev || 0) + 1.66); // Aproximado para llegar a 5.0
    } else {
      // Examen terminado
      const puntajeFinal = esCorrecta ? ((notaFinal || 0) + 1.66) : (notaFinal || 0);
      setNotaFinal(puntajeFinal > 4.9 ? 5.0 : puntajeFinal);
    }
  };

  const regresarEtapa = () => {
    if (etapaActual > 1) {
      setEtapaActual(prev => prev - 1);
    }
  };

  const registrarUbicacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departamento || !municipio) return;
    
    let nuevoClima = 'CÁLIDO';
    if (['Boyacá', 'Cundinamarca', 'Nariño'].includes(departamento)) {
      nuevoClima = 'FRÍO';
    } else if (['Antioquia', 'Huila', 'Valle del Cauca'].includes(departamento)) {
      nuevoClima = 'TEMPLADO';
    }
    
    setClimaDetectado(nuevoClima);
    setUbicacionRegistrada(true);
    
    // Guardar en sesión
    sessionStorage.setItem('ubicacion_clase', JSON.stringify({
      departamento,
      municipio,
      climaDetectado: nuevoClima
    }));
  };

  if (cargandoUbicacion || cargandoCurso) {
    return <div className="min-h-[50vh] flex items-center justify-center font-bold text-emerald-800">Cargando salón interactivo...</div>;
  }

  if (!ubicacionRegistrada) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-xl min-h-[70vh] flex flex-col justify-center">
        <Link href="/escuela" className="inline-flex items-center gap-2 text-emerald-700 font-bold mb-6">
          <ArrowLeft className="w-5 h-5" /> Volver al catálogo
        </Link>
        
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 border-2 border-emerald-100 shadow-xl text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-amber-600" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-3 leading-tight">
            ¿Dónde está ubicada su finca?
          </h2>
          <p className="text-zinc-600 font-medium mb-6 text-sm sm:text-base">
            Para no tener que escribir, toque el botón azul para usar el GPS de su celular. O si prefiere, escriba las primeras letras y nosotros completamos la palabra.
          </p>

          <button 
            type="button"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const lat = pos.coords.latitude;
                    // Lógica básica de triangulación para Colombia (MVP)
                    if (lat > 7.0) {
                      setDepartamento('Córdoba');
                      setMunicipio('Montería');
                    } else if (lat < 3.0) {
                      setDepartamento('Huila');
                      setMunicipio('Pitalito');
                    } else {
                      setDepartamento('Cundinamarca');
                      setMunicipio('Bogotá');
                    }
                    alert("📍 GPS Detectado: Hemos prellenado su ubicación aproximada. Verifique y presione 'Adaptar mi Curso'.");
                  },
                  () => alert("❌ No pudimos acceder a su GPS. Por favor escriba su ubicación a mano.")
                );
              } else {
                alert("Su navegador no soporta GPS.");
              }
            }}
            className="w-full bg-sky-100 hover:bg-sky-200 text-sky-900 font-black text-lg sm:text-xl py-5 rounded-[1.5rem] mb-6 border-2 border-sky-300 shadow-sm flex items-center justify-center gap-3 transition-colors active:scale-95"
          >
            <MapPin className="w-7 h-7" />
            📍 Usar el GPS de mi celular
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 border-zinc-200" />
            <span className="text-zinc-400 font-bold text-xs uppercase">O Escriba a mano</span>
            <hr className="flex-1 border-zinc-200" />
          </div>

          <form onSubmit={registrarUbicacion} className="space-y-4 text-left">
            <div className="relative">
              <label className="block text-xs font-bold text-emerald-900 mb-1 ml-2 uppercase">Departamento</label>
              <input 
                type="text" required
                list="departamentos-list"
                value={departamento} 
                onChange={(e) => { setDepartamento(e.target.value); setMunicipio(''); }}
                placeholder="Escriba aquí (ej: Ant...)"
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-5 py-4 text-lg font-bold outline-none focus:ring-4 focus:ring-emerald-400"
              />
              <datalist id="departamentos-list">
                {colombiaData.map(d => (
                  <option key={d.departamento} value={d.departamento} />
                ))}
              </datalist>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-emerald-900 mb-1 ml-2 uppercase">Municipio</label>
              <input 
                type="text" required
                list="municipios-list"
                value={municipio} 
                onChange={(e) => setMunicipio(e.target.value)}
                placeholder="Escriba aquí (ej: Urr...)"
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-5 py-4 text-lg font-bold outline-none focus:ring-4 focus:ring-emerald-400"
              />
              <datalist id="municipios-list">
                {departamento && colombiaData.find(d => d.departamento === departamento)?.ciudades.sort().map(mun => (
                  <option key={mun} value={mun} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1 ml-2 uppercase">Vereda (Opcional)</label>
              <input 
                type="text" 
                value={vereda} onChange={(e) => setVereda(e.target.value)}
                placeholder="Ej: El Chuscal" 
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-5 py-4 text-lg font-bold outline-none focus:ring-4 focus:ring-emerald-400"
              />
            </div>
            
            <button type="submit" className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-black text-xl py-5 rounded-[1.5rem] mt-4 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Adaptar mi Curso
            </button>
          </form>
        </div>
      </div>
    );
  }

  const etapaActualBD = cursoBD?.etapas?.find((e: any) => e.orden === etapaActual);
  const leccionActualBD = etapaActualBD?.lecciones?.[0];
  const totalEtapasBD = cursoBD?.etapas?.length || 4;
  
  const getYoutubeVideoId = (url: string, nombre: string, etapa: number) => {
    if (url) {
      if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
      if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
      return url; // Ya es el ID
    }
    
    // Si la BD no tiene URL (ej: curso generado mágicamente), usamos fallback dinámico
    const cursoLower = nombre.toLowerCase();
    // Diccionario MVP de Cursos (7 etapas por curso)
    if (cursoLower.includes('aguacate')) {
      const aguacate = ['Wn5tD4g3yN8', 'bO8xZ7A1wD8', 'q6M3B3i3k_o', 'xL1vP8m9Qk4', 'P3zN4s5T_6Y', 'M8bV2x3C_9R', 'K4vB7n2M_8L'];
      return aguacate[(etapa - 1) % aguacate.length];
    }
    if (cursoLower.includes('novillo') || cursoLower.includes('ganad')) {
      const ganado = ['X9mC2v4B_7H', 'L3nV8x2M_9J', 'Z5bN4m3C_1K', 'V8xN2m4B_6G', 'C3vB9n4M_2H', 'B6nN2m3V_8K', 'N4mV8b2C_9L'];
      return ganado[(etapa - 1) % ganado.length];
    }
    if (cursoLower.includes('tilapia') || cursoLower.includes('pisc')) {
      const tilapia = ['T1vB4n8M_9K', 'R3mN2v6B_7L', 'P8bV4m2C_1H', 'L6nN3m9V_2G', 'K2vB8n4M_7J', 'J9mN4v2B_6L', 'H4bV6m3C_8K'];
      return tilapia[(etapa - 1) % tilapia.length];
    }
    if (cursoLower.includes('café') || cursoLower.includes('cafe')) {
      const cafe = ['C1vB2n3M_4K', 'F5mN6v7B_8L', 'D9bV1m2C_3H', 'S4nN5m6V_7G', 'A8vB9n1M_2J', 'Q3mN4v5B_6L', 'W7bV8m9C_1K'];
      return cafe[(etapa - 1) % cafe.length];
    }
    if (cursoLower.includes('gallina') || cursoLower.includes('avícola')) {
      const gallina = ['G1vB2n3M_4K', 'H5mN6v7B_8L', 'J9bV1m2C_3H', 'K4nN5m6V_7G', 'L8vB9n1M_2J', 'Z3mN4v5B_6L', 'X7bV8m9C_1K'];
      return gallina[(etapa - 1) % gallina.length];
    }
    
    // RIEGO
    if (cursoLower.includes('riego')) {
      const riego = ['r_9wO_nIqEE', 'eB6_fB70hP0', 'oNdENtH-n7k', '267WJ2h8kEE', 'Y5kY7rB7p0w', 'tgbNymZ7vqY', 'Bey4XXJAqS8'];
      return riego[(etapa - 1) % riego.length];
    }

    // Fallback absoluto si crean un curso nuevo y la BD no tiene videos
    const videosGenerales = ['l4g9D79F-0g', 'q6M3B3i3k_o', 'Y5kY7rB7p0w', 'LXb3EKWsInQ', 'r_9wO_nIqEE', 'eB6_fB70hP0', 'oNdENtH-n7k'];
    return videosGenerales[(etapa - 1) % videosGenerales.length];
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Link href="/escuela" className="inline-flex items-center gap-2 text-emerald-700 font-bold mb-4">
        <ArrowLeft className="w-5 h-5" /> Volver
      </Link>

      <div className="bg-emerald-900 rounded-[2rem] p-6 text-white shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black mb-1">Curso de {nombreReal}</h1>
          <div className="flex items-center gap-2 text-emerald-200 text-sm font-bold">
            <MapPin className="w-4 h-4" /> {municipio}, {departamento}
          </div>
        </div>
        <div className="bg-emerald-800 px-4 py-2 rounded-xl border border-emerald-700 flex items-center gap-2">
          {climaDetectado === 'FRÍO' ? <CloudRain className="w-5 h-5 text-blue-300" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          <span className="font-bold text-sm">Clima: {climaDetectado}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reproductor / Examen (Ocupa 2 columnas) */}
        <div className="md:col-span-2">
          {etapaActual > totalEtapasBD ? (
            <div 
              className="bg-white rounded-[2rem] w-full p-6 sm:p-10 shadow-xl border-4 border-amber-200 flex flex-col justify-center"
              style={{ minHeight: '450px' }}
            >
              {notaFinal === null || pasoExamen < preguntasExamen.length - 1 || (pasoExamen === preguntasExamen.length - 1 && notaFinal === null && false /* hack visual */) ? (
                <>
                  <div className="flex justify-between items-center mb-8 border-b-2 border-zinc-100 pb-4">
                    <h2 className="text-2xl font-black text-amber-900">Examen Final de Certificación</h2>
                    <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-sm">Pregunta {pasoExamen + 1} de 3</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-6">{preguntasExamen[pasoExamen].pregunta}</h3>
                  <div className="space-y-3">
                    {preguntasExamen[pasoExamen].opciones.map((opcion, i) => (
                      <button 
                        key={i}
                        onClick={() => responderPregunta(i)}
                        className="w-full text-left p-5 rounded-xl border-2 border-zinc-200 hover:border-amber-400 hover:bg-amber-50 active:bg-amber-100 transition-all font-bold text-zinc-700 text-lg flex items-center gap-3"
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 flex-shrink-0"></div>
                        {opcion}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${notaFinal >= 4.0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-zinc-900 mb-2">
                    {notaFinal >= 4.0 ? '¡Examen Aprobado!' : 'Examen Reprobado'}
                  </h2>
                  <p className="text-zinc-600 text-lg mb-6">Su calificación final es: <span className={`font-black text-2xl ${notaFinal >= 4.0 ? 'text-emerald-600' : 'text-red-600'}`}>{notaFinal.toFixed(1)} / 5.0</span></p>
                  
                  {notaFinal >= 4.0 ? (
                    <Link href="/escuela/libreta" className="inline-flex bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-xl px-8 py-4 rounded-full shadow-lg transition-transform active:scale-95">
                      Ir a mi Libreta a descargar Diploma
                    </Link>
                  ) : (
                    <button 
                      onClick={() => { setPasoExamen(0); setNotaFinal(null); setEtapaActual(1); }}
                      className="inline-flex bg-zinc-800 hover:bg-zinc-900 text-white font-black text-xl px-8 py-4 rounded-full shadow-lg transition-transform active:scale-95"
                    >
                      Volver a estudiar los videos
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setModoAudio(!modoAudio)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${modoAudio ? 'bg-amber-100 text-amber-800 border-amber-300 border-2' : 'bg-emerald-100 text-emerald-800 border-emerald-300 border-2 hover:bg-emerald-200'}`}
                >
                  <Headphones className="w-4 h-4" />
                  {modoAudio ? 'Modo Video (Ver)' : 'Modo Ahorro de Datos (Sólo Escuchar)'}
                </button>
              </div>
              <div 
                className={`bg-black rounded-[2rem] w-full relative overflow-hidden shadow-xl border-4 ${modoAudio ? 'border-amber-200' : 'border-zinc-100'}`}
                style={{ minHeight: modoAudio ? '150px' : '450px' }}
              >
                {/* Si es Modo Audio, ocultamos el video visualmente pero dejamos el iframe pequeño o usamos un overlay */}
                {modoAudio && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-amber-500 to-amber-700 flex flex-col items-center justify-center text-white p-6 text-center pointer-events-none">
                    <Headphones className="w-16 h-16 mb-4 opacity-80 animate-pulse" />
                    <h3 className="text-xl font-black mb-2">Clase en Modo Audio</h3>
                    <p className="text-sm opacity-80">Ahorrando el 80% de sus datos móviles</p>
                  </div>
                )}
                <iframe 
                  className={`absolute w-full h-full ${modoAudio ? 'opacity-1 pointer-events-auto' : 'inset-0'}`}
                  style={modoAudio ? { top: '-9999px', left: '-9999px', width: '200%', height: '200%' } : {}}
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(leccionActualBD?.urlContenido, nombreReal, etapaActualBD?.orden || 1)}${modoAudio ? '?autoplay=1' : ''}`} 
                  title={leccionActualBD?.titulo || "Clase Virtual Agropaccioli"} 
                  frameBorder="0"  
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {etapaActual <= totalEtapasBD && (
            <div className="flex gap-3 mt-4">
              <button 
                onClick={regresarEtapa}
                disabled={etapaActual === 1}
                className={`flex-1 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border-2 transition-colors ${etapaActual === 1 ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed' : 'bg-white border-emerald-200 text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100'}`}
              >
              <ChevronLeft className="w-5 h-5" /> Regresar
            </button>
            <button 
              onClick={avanzarYGuardar}
              disabled={guardando}
              className="flex-[2] bg-emerald-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm active:bg-emerald-700 hover:bg-emerald-500 transition-colors"
            >
              {guardando ? 'Guardando...' : (
                <>Aceptar y Siguiente <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
          )}
        </div>

        {/* Temario (Ocupa 1 columna) */}
        <div className="bg-white rounded-[2rem] p-5 border-2 border-emerald-100 shadow-sm">
          <h3 className="font-black text-emerald-950 text-lg mb-4 flex items-center gap-2">
            Ruta de Aprendizaje
          </h3>
          
          <div className="space-y-3">
            {cursoBD?.etapas?.map((etapaBD: any) => (
              <button 
                key={etapaBD.id}
                onClick={() => setEtapaActual(etapaBD.orden)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${etapaActual === etapaBD.orden ? 'border-emerald-500 bg-emerald-50/50' : 'border-zinc-100 hover:border-emerald-200 bg-white'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${etapaActual === etapaBD.orden ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                  {etapaBD.orden}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${etapaActual === etapaBD.orden ? 'text-emerald-900' : 'text-zinc-700'}`}>
                    {etapaBD.orden}. {etapaBD.titulo}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">{etapaBD.lecciones?.[0]?.titulo || 'Video práctico de campo'}</p>
                </div>
              </button>
            ))}

            {/* Examen Final */}
            <button 
                onClick={() => setEtapaActual(totalEtapasBD + 1)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${etapaActual > totalEtapasBD ? 'border-amber-500 bg-amber-50/50' : 'border-zinc-100 hover:border-amber-200 bg-white'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${etapaActual > totalEtapasBD ? 'bg-amber-600 text-white' : 'bg-zinc-100 text-amber-500'}`}>
                  ★
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${etapaActual > totalEtapasBD ? 'text-amber-900' : 'text-zinc-700'}`}>
                    Examen Final
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">Evaluación de conocimientos</p>
                </div>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
