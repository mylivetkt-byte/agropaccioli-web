'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-200/30 to-green-100/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Badge Oficial */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold tracking-wide shadow-sm animate-float-slow">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>EL ECOSISTEMA AGROPECUARIO MÁS GRANDE DE COLOMBIA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-700 font-semibold">100% CERO INTERMEDIARIOS</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 tracking-tight leading-[1.15]">
            Conectamos el <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700">Campo Colombiano</span> con Compradores e Insumos en Tiempo Real
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Plataforma verificada para Productores Agrícolas, Ganaderos y Acuícolas. Consulta precios oficiales del DANE/SIPSA, publica cosechas con geolocalización satelital y contacta almacenes de insumos de tu región.
          </p>

          {/* Botones de Acción Primaria */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/mapa-cosechas?publicar=true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Publica Tu Cosecha Gratis</span>
            </Link>

            <Link
              href="/mapa-cosechas"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50/80 text-emerald-900 border-2 border-emerald-300 hover:border-emerald-400 font-bold text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow transition-all duration-200"
            >
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Explorar Mapa Nacional de Cosechas</span>
            </Link>

            <Link
              href="/precios-mercado"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100/70 text-emerald-800 font-semibold text-sm px-5 py-3.5 rounded-2xl border border-emerald-200 transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Precios de Hoy</span>
            </Link>
          </div>

          {/* Sellos de Confianza y Garantías */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-zinc-600">
            <div className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verificación KYC Productores</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Contratos Ley 527 de 1999</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Protección Ley 1581 / 2012</span>
            </div>
          </div>

        </div>

        {/* Tarjetas de Acceso Rápido a los 3 Sectores Productivos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto">
          
          {/* Card Agrícola */}
          <Link 
            href="/mapa-cosechas?sector=agricola"
            className="group p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🥑</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-emerald-950">Sector Agrícola</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  🟢 140+ Lotes
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Aguacate Hass, Café Especial, Plátano Hartón, Papa de Páramo, Frutas Exóticas y Cacao.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
              <span>Consultar cosechas agrícolas</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card Ganadero */}
          <Link 
            href="/mapa-cosechas?sector=ganadero"
            className="group p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🐂</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-emerald-950">Sector Ganadero</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                  🟠 85+ Hatos
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Novillos de Ceba Brahman, Hembras de Levante F1, Ganado Doble Propósito y Lechería.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-orange-50 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
              <span>Consultar lotes ganaderos</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card Acuícola */}
          <Link 
            href="/mapa-cosechas?sector=acuicola"
            className="group p-6 rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🐟</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-emerald-950">Sector Acuícola</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  🔵 42+ Piscícolas
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Tilapia Roja, Trucha Arcoíris de Páramo, Cachama, Bocachico y Camarón de Cultivo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-50 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
              <span>Consultar producción acuícola</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
