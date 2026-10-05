'use client';

import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Sun, 
  CloudRain, 
  Compass,
  Map,
  Bot,
  Bug,
  ShieldHalf
} from 'lucide-react';
import colombiaData from '@/lib/colombia.json';

interface WeatherData {
  municipio: string;
  departamento: string;
  temperatura: number;
  sensacionTermica: number;
  humedad: number;
  probabilidadLluvia: number;
  vientoKmH: number;
  condicion: 'Soleado' | 'Parcialmente Nublado' | 'Lluvia Moderada' | 'Llovizna' | 'Tormenta Eléctrica';
  alertaAgro: {
    tipo: 'normal' | 'alerta' | 'precaucion';
    mensaje: string;
    plagaRiesgo: string;
    recomendacionInsumo: string;
  };
  recomendacionAgronomica: string;
}

// Función para simular clima según el departamento y ciudad en tiempo real para el MVP
const generateWeather = (dept: string, city: string): WeatherData => {
  const hash = city.length + dept.length;
  
  // Temperaturas base promedio por departamento (aproximadas)
  const temperaturas: Record<string, number> = {
    'Antioquia': 22, 'Cundinamarca': 14, 'Valle del Cauca': 28, 'Atlántico': 32,
    'Bolívar': 33, 'Chocó': 27, 'Huila': 24, 'Tolima': 28, 'Meta': 30, 'Boyacá': 13,
    'Caldas': 20, 'Quindío': 21, 'Risaralda': 21, 'Santander': 25, 'Norte de Santander': 26,
    'Cauca': 18, 'Nariño': 15, 'Magdalena': 32, 'Cesar': 33, 'Sucre': 32, 'Córdoba': 33,
    'La Guajira': 34, 'Amazonas': 30, 'Caquetá': 28, 'Putumayo': 26, 'Guaviare': 29,
    'Vaupés': 29, 'Vichada': 31, 'Casanare': 29, 'Arauca': 30, 'Guainía': 30, 'San Andrés': 30
  };
  
  const baseTemp = temperaturas[dept] || 25;
  const tempOffset = (hash % 7) - 3; // -3 to +3
  const tempFinal = baseTemp + tempOffset;

  const condiciones = ['Soleado', 'Parcialmente Nublado', 'Lluvia Moderada', 'Llovizna', 'Tormenta Eléctrica'] as const;
  const condicion = condiciones[hash % condiciones.length];

  let alerta: WeatherData['alertaAgro'] = { 
    tipo: 'normal', 
    mensaje: 'Condiciones óptimas para labores culturales y de campo.',
    plagaRiesgo: 'Bajo riesgo',
    recomendacionInsumo: 'Continuar plan de fertilización estándar.'
  };
  let rec = 'Buen día para aplicaciones foliares, siembra y revisión general de linderos.';

  if (condicion.includes('Lluvia') || condicion.includes('Tormenta')) {
    alerta = { 
      tipo: 'precaucion', 
      mensaje: 'Humedad alta o lluvias. Vigilar aparición de hongos y evitar fumigación.',
      plagaRiesgo: tempFinal > 24 ? 'Alta propagación de Sigatoka o Monilia' : 'Botrytis y pudrición de raíz',
      recomendacionInsumo: 'Aplicar fungicidas preventivos con adherente.'
    };
    rec = 'Aplazar fertilización edáfica y aspersiones. Revisar sistemas de drenaje en lotes bajos.';
  } else if (tempFinal < 15) {
    alerta = { 
      tipo: 'precaucion', 
      mensaje: 'Alerta por riesgo de heladas tempranas en madrugadas sobre los 2.700 msnm.',
      plagaRiesgo: 'Gusano Blanco y quemadura de pastos',
      recomendacionInsumo: 'Bioestimulantes a base de aminoácidos.'
    };
    rec = 'Mantener riegos preventivos ligeros al atardecer para proteger cultivos de papa, hortalizas y flores.';
  } else if (tempFinal > 32) {
    alerta = { 
      tipo: 'alerta', 
      mensaje: 'Altas temperaturas y radiación. Riesgo de estrés hídrico severo.',
      plagaRiesgo: 'Arañita roja y trips en proliferación',
      recomendacionInsumo: 'Insecticidas específicos / riego por goteo activo.'
    };
    rec = 'Garantizar sombra y agua constante al ganado. Evitar aplicaciones químicas a mediodía.';
  }

  return {
    municipio: city,
    departamento: dept,
    temperatura: tempFinal,
    sensacionTermica: tempFinal + ((hash % 3) - 1),
    humedad: 50 + (hash % 40),
    probabilidadLluvia: (hash % 10) * 10,
    vientoKmH: 5 + (hash % 20),
    condicion,
    alertaAgro: alerta,
    recomendacionAgronomica: rec
  };
};

export default function ClimaWidget() {
  const [deptSeleccionado, setDeptSeleccionado] = useState<string>('Cundinamarca');
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string>('Villapinzón');
  const [veredaSeleccionada, setVeredaSeleccionada] = useState<string>('Centro Urbano');
  const [clima, setClima] = useState<WeatherData>(generateWeather('Cundinamarca', 'Villapinzón'));
  
  const [cargando, setCargando] = useState<boolean>(false);
  const [geolocalizado, setGeolocalizado] = useState<boolean>(false);

  // Obtener lista de departamentos
  const departamentos = colombiaData.map(d => d.departamento).sort();
  // Obtener ciudades del departamento actual
  const ciudadesDelDepto = colombiaData.find(d => d.departamento === deptSeleccionado)?.ciudades.sort() || [];
  
  // Generar veredas simuladas para el MVP basadas en el municipio
  const veredasSimuladas = [
    'Centro Urbano',
    `Corregimiento de ${municipioSeleccionado}`,
    'Vereda Alta',
    'Vereda Baja',
    'Vereda El Carmen',
    'Vereda San José'
  ];

  useEffect(() => {
    // Intentar geolocalización por navegador (HTML5 Geolocation)
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeolocalizado(true);
          // Simulación inteligente según latitud aproximada en Colombia
          const lat = pos.coords.latitude;
          if (lat > 7.0) {
            cambiarDepartamento('Córdoba');
            cambiarMunicipio('Montería');
          } else if (lat < 3.0) {
            cambiarDepartamento('Huila');
            cambiarMunicipio('Pitalito');
          } else {
            cambiarDepartamento('Cundinamarca');
            cambiarMunicipio('Villapinzón');
          }
        },
        () => {
          setGeolocalizado(false);
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const cambiarDepartamento = (dept: string) => {
    setCargando(true);
    setDeptSeleccionado(dept);
    const ciudades = colombiaData.find(d => d.departamento === dept)?.ciudades.sort() || [];
    const primeraCiudad = ciudades[0] || '';
    setMunicipioSeleccionado(primeraCiudad);
    setVeredaSeleccionada('Centro Urbano');
    
    setTimeout(() => {
      setClima(generateWeather(dept, primeraCiudad));
      setCargando(false);
    }, 400);
  };

  const cambiarMunicipio = (ciudad: string) => {
    setCargando(true);
    setMunicipioSeleccionado(ciudad);
    setVeredaSeleccionada('Centro Urbano');
    setTimeout(() => {
      setClima(generateWeather(deptSeleccionado, ciudad));
      setCargando(false);
    }, 300);
  };
  
  const cambiarVereda = (vereda: string) => {
    setVeredaSeleccionada(vereda);
  };

  const getWeatherIcon = (cond: string) => {
    switch (cond) {
      case 'Soleado':
        return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
      case 'Lluvia Moderada':
      case 'Llovizna':
      case 'Tormenta Eléctrica':
        return <CloudRain className="w-8 h-8 text-sky-500 animate-bounce" />;
      default:
        return <CloudSun className="w-8 h-8 text-emerald-500 animate-float-slow" />;
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-emerald-500/10 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden transition-all">
      {/* Fondo con brillo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        
        {/* Cabecera & Selector de Zona DINÁMICO */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-600/20">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-1.5">
                <span>Estación Agroclimática Nacional</span>
                {geolocalizado && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> GPS
                  </span>
                )}
              </h3>
            </div>
            
            {/* TRIPLE SELECTOR: DEPARTAMENTO, CIUDAD Y VEREDA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-zinc-600 w-full">
              
              <div className="flex items-center gap-1 bg-white border border-emerald-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 w-full sm:w-auto">
                <div className="px-2 text-emerald-600 bg-emerald-50 h-full flex items-center border-r border-emerald-100">
                  <Map className="w-3.5 h-3.5" />
                </div>
                <select 
                  value={deptSeleccionado}
                  onChange={(e) => cambiarDepartamento(e.target.value)}
                  className="bg-transparent text-emerald-950 font-bold py-1.5 pr-2 outline-none cursor-pointer w-full sm:w-auto"
                >
                  {departamentos.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 bg-white border border-emerald-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 w-full sm:w-auto">
                <div className="px-2 text-emerald-600 bg-emerald-50 h-full flex items-center border-r border-emerald-100">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <select 
                  value={municipioSeleccionado}
                  onChange={(e) => cambiarMunicipio(e.target.value)}
                  className="bg-transparent text-emerald-950 font-bold py-1.5 pr-2 outline-none cursor-pointer w-full sm:w-auto max-w-[150px]"
                  disabled={cargando}
                >
                  {ciudadesDelDepto.map((mun) => (
                    <option key={mun} value={mun}>{mun}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 bg-white border border-emerald-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 w-full sm:w-auto">
                <div className="px-2 text-emerald-600 bg-emerald-50 h-full flex items-center border-r border-emerald-100">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <input 
                  type="text"
                  placeholder="Vereda/Finca (Opcional)"
                  value={veredaSeleccionada}
                  onChange={(e) => cambiarVereda(e.target.value)}
                  className="bg-transparent text-emerald-950 font-bold py-1.5 px-2 outline-none w-full sm:w-auto max-w-[150px] placeholder:text-zinc-400 placeholder:font-normal"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Métricas del Clima */}
        <div className={`flex flex-wrap items-center gap-4 sm:gap-6 bg-white/90 border border-emerald-100 rounded-xl px-4 py-2.5 shadow-sm transition-opacity duration-300 ${cargando ? 'opacity-50' : 'opacity-100'}`}>
          
          <div className="flex items-center gap-3">
            {getWeatherIcon(clima.condicion)}
            <div>
              <span className="text-2xl font-black text-emerald-950 tracking-tight">
                {clima.temperatura}°C
              </span>
              <span className="block text-[11px] font-semibold text-emerald-700">
                {clima.condicion}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-emerald-100 hidden sm:block"></div>

          <div className="flex items-center gap-2 text-xs">
            <Droplets className="w-4 h-4 text-sky-500" />
            <div>
              <span className="text-zinc-500 block text-[10px]">Humedad</span>
              <span className="font-bold text-zinc-800">{clima.humedad}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <CloudRain className="w-4 h-4 text-blue-500" />
            <div>
              <span className="text-zinc-500 block text-[10px]">Prob. Lluvia</span>
              <span className="font-bold text-zinc-800">{clima.probabilidadLluvia}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs hidden md:flex">
            <Wind className="w-4 h-4 text-teal-500" />
            <div>
              <span className="text-zinc-500 block text-[10px]">Viento</span>
              <span className="font-bold text-zinc-800">{clima.vientoKmH} km/h</span>
            </div>
          </div>

        </div>

      </div>

      {/* Alerta y Recomendación Agronómica */}
      <div className={`mt-3 pt-3 border-t border-emerald-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs transition-opacity duration-300 ${cargando ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            {clima.alertaAgro.tipo === 'alerta' || clima.alertaAgro.tipo === 'precaucion' ? (
              <span className={`inline-flex items-center gap-1 ${clima.alertaAgro.tipo === 'alerta' ? 'bg-red-100 text-red-900' : 'bg-amber-100 text-amber-900'} px-2 py-0.5 rounded font-bold text-[11px] whitespace-nowrap`}>
                <AlertTriangle className={`w-3.5 h-3.5 ${clima.alertaAgro.tipo === 'alerta' ? 'text-red-700' : 'text-amber-700'}`} /> {clima.alertaAgro.tipo === 'alerta' ? 'Alerta Crítica' : 'Alerta Agro'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold text-[11px] whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Clima Favorable
              </span>
            )}
            <span className="text-zinc-700 font-medium">
              {clima.alertaAgro.mensaje}
            </span>
          </div>
          
          {/* Alerta Hiperlocal de IA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-black text-[10px] whitespace-nowrap uppercase tracking-wider">
              <Bot className="w-3 h-3 text-indigo-700" /> IA Satelital
            </span>
            <span className="text-zinc-600 font-medium flex items-center gap-1">
              <Bug className="w-3.5 h-3.5 text-zinc-500" /> 
              Riesgo detectado: <strong className="text-zinc-800">{clima.alertaAgro.plagaRiesgo}</strong>
            </span>
            <span className="text-zinc-600 font-medium flex items-center gap-1">
              <ShieldHalf className="w-3.5 h-3.5 text-emerald-600" /> 
              Acción: <strong className="text-emerald-700">{clima.alertaAgro.recomendacionInsumo}</strong>
            </span>
          </div>
        </div>
        
        <div className="text-emerald-800 bg-emerald-100/50 px-3 py-1.5 rounded-lg text-[11px] font-medium italic w-full md:w-64 shrink-0 text-center md:text-left mt-2 md:mt-0">
          💡 Tip agronómico: {clima.recomendacionAgronomica}
        </div>
      </div>

    </div>
  );
}
