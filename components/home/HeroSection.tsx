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
  CheckCircle,
  Truck,
  Users
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-200/30 to-green-100/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge Oficial Simplificado */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs md:text-sm font-bold tracking-wide shadow-sm animate-float-slow">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>PLATAFORMA AGTECH AUTOMATIZADA CON IA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-700 font-black">100% SIN INTERMEDIARIOS</span>
          </div>

          {/* Título Principal Orientado al Beneficio */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 tracking-tight leading-[1.15]">
            Vende tu cosecha <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700">directo al comprador</span> con Inteligencia Artificial
          </h1>

          {/* Subtítulo Claro y Conciso */}
          <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Ecosistema agropecuario 100% automatizado con IA. Conecta productores, mayoristas y transportistas al instante con contratos digitales, precios SIPSA en tiempo real y asesoría fitosanitaria inteligente.
          </p>

          {/* 2 Embudos Claros (Acción Principal) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/mapa-cosechas?publicar=true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-lg px-8 py-5 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <PlusCircle className="w-6 h-6" />
              <span>Quiero Vender (Productor)</span>
            </Link>

            <Link
              href="/?registro_comprador=true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 font-black text-lg px-8 py-5 rounded-2xl shadow-lg shadow-zinc-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>Quiero Comprar (Mayorista)</span>
            </Link>
          </div>

          {/* Enlaces Secundarios */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm font-semibold text-emerald-700">
            <Link href="/precios-mercado" className="flex items-center gap-2 hover:text-emerald-900 hover:underline transition-colors">
              <TrendingUp className="w-4 h-4" />
              Ver Precios Oficiales de Hoy
            </Link>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <Link href="/mapa-cosechas" className="flex items-center gap-2 hover:text-emerald-900 hover:underline transition-colors">
              <MapPin className="w-4 h-4" />
              Explorar Mapa de Cosechas
            </Link>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <Link href="/?registro_transportador=true" className="flex items-center gap-2 hover:text-emerald-900 hover:underline transition-colors">
              <Truck className="w-4 h-4" />
              Soy Transportador
            </Link>
          </div>

          {/* Franja de Prueba Social (Traducida a idioma campesino/confianza) */}
          <div className="pt-8 mt-6 border-t border-emerald-100 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-bold text-zinc-700">
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>+1,200 Productores Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Perfiles 100% Verificados</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Negocios Directos y Seguros</span>
            </div>
          </div>
        </div>

        {/* Tarjetas de Acceso Rápido a los 3 Sectores Productivos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 max-w-5xl mx-auto">
          
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
                  🟢 Lotes Disponibles
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
                  🟠 Hatos Disponibles
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
                  🔵 Cultivos Activos
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
