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
  Compass 
} from 'lucide-react';

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
  };
  recomendacionAgronomica: string;
}

const REGIONES_DEFAULT: Record<string, WeatherData> = {
  'Sonsón': {
    municipio: 'Sonsón',
    departamento: 'Antioquia',
    temperatura: 19,
    sensacionTermica: 19,
    humedad: 78,
    probabilidadLluvia: 35,
    vientoKmH: 12,
    condicion: 'Parcialmente Nublado',
    alertaAgro: {
      tipo: 'normal',
      mensaje: 'Condiciones óptimas para recolección de aguacate Hass y fertilización foliar.'
    },
    recomendacionAgronomica: 'Aprovechar la mañana para aplicaciones de micronutrientes antes de posibles lloviznas vespertinas.'
  },
  'Pitalito': {
    municipio: 'Pitalito',
    departamento: 'Huila',
    temperatura: 22,
    sensacionTermica: 23,
    humedad: 70,
    probabilidadLluvia: 20,
    vientoKmH: 8,
    condicion: 'Soleado',
    alertaAgro: {
      tipo: 'normal',
      mensaje: 'Clima ideal para secado de café en marquesinas y desyerba mecánica.'
    },
    recomendacionAgronomica: 'Monitorear niveles de humedad en grano para optimizar curvas de tostión y almacenamiento.'
  },
  'Montería': {
    municipio: 'Montería',
    departamento: 'Córdoba',
    temperatura: 32,
    sensacionTermica: 36,
    humedad: 82,
    probabilidadLluvia: 60,
    vientoKmH: 16,
    condicion: 'Lluvia Moderada',
    alertaAgro: {
      tipo: 'precaucion',
      mensaje: 'Humedad alta en potreros. Vigilar estrés térmico en ganado lechero y hongos foliares en pastos.'
    },
    recomendacionAgronomica: 'Suministrar sales mineralizadas bajo techo y verificar drenajes en potreros bajos.'
  },
  'Villavicencio': {
    municipio: 'Villavicencio',
    departamento: 'Meta',
    temperatura: 29,
    sensacionTermica: 31,
    humedad: 75,
    probabilidadLluvia: 40,
    vientoKmH: 10,
    condicion: 'Parcialmente Nublado',
    alertaAgro: {
      tipo: 'normal',
      mensaje: 'Buena oxigenación natural en estanques de tilapia por vientos de piedemonte.'
    },
    recomendacionAgronomica: 'Ajustar ración alimentaria en horas de mayor temperatura superficial.'
  },
  'Villapinzón': {
    municipio: 'Villapinzón',
    departamento: 'Cundinamarca',
    temperatura: 14,
    sensacionTermica: 13,
    humedad: 85,
    probabilidadLluvia: 15,
    vientoKmH: 14,
    condicion: 'Parcialmente Nublado',
    alertaAgro: {
      tipo: 'precaucion',
      mensaje: 'Alerta por riesgo de heladas tempranas en madrugadas sobre los 2.700 msnm.'
    },
    recomendacionAgronomica: 'Mantener riegos preventivos ligeros al atardecer para proteger cultivos de papa y hortalizas.'
  }
};

export default function ClimaWidget() {
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string>('Sonsón');
  const [clima, setClima] = useState<WeatherData>(REGIONES_DEFAULT['Sonsón']);
  const [cargando, setCargando] = useState<boolean>(false);
  const [geolocalizado, setGeolocalizado] = useState<boolean>(false);

  useEffect(() => {
    // Intentar geolocalización por navegador (HTML5 Geolocation)
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeolocalizado(true);
          // Simulación inteligente según latitud aproximada en Colombia
          const lat = pos.coords.latitude;
          if (lat > 7.0) {
            cambiarMunicipio('Montería');
          } else if (lat < 3.0) {
            cambiarMunicipio('Pitalito');
          } else {
            cambiarMunicipio('Villapinzón');
          }
        },
        () => {
          // Si el usuario deniega permisos, mantenemos Sonsón como default
          setGeolocalizado(false);
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const cambiarMunicipio = (nombre: string) => {
    setCargando(true);
    setTimeout(() => {
      setMunicipioSeleccionado(nombre);
      setClima(REGIONES_DEFAULT[nombre] || REGIONES_DEFAULT['Sonsón']);
      setCargando(false);
    }, 300);
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
    <div className="w-full bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-emerald-500/10 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
      {/* Fondo con brillo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        
        {/* Cabecera & Selector de Zona */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-600/20">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-1.5">
                <span>Estación Agroclimática en Vivo</span>
                {geolocalizado && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> GPS Detectado
                  </span>
                )}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zona activa:</span>
              <select 
                value={municipioSeleccionado}
                onChange={(e) => cambiarMunicipio(e.target.value)}
                className="bg-white border border-emerald-300 text-emerald-900 font-semibold rounded-lg px-2 py-0.5 text-xs focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              >
                {Object.keys(REGIONES_DEFAULT).map((mun) => (
                  <option key={mun} value={mun}>
                    {mun} ({REGIONES_DEFAULT[mun].departamento})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Métricas del Clima */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-white/90 border border-emerald-100 rounded-xl px-4 py-2.5 shadow-sm">
          
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
      <div className="mt-3 pt-3 border-t border-emerald-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {clima.alertaAgro.tipo === 'precaucion' ? (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> Alerta Agro
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Clima Favorable
            </span>
          )}
          <span className="text-zinc-700 font-medium">
            {clima.alertaAgro.mensaje}
          </span>
        </div>
        
        <div className="text-emerald-800 bg-emerald-100/50 px-3 py-1 rounded-lg text-[11px] font-medium italic">
          💡 Tip agronómico: {clima.recomendacionAgronomica}
        </div>
      </div>

    </div>
  );
}
