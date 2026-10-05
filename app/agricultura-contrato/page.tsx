'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { CalendarClock, ShieldCheck, MapPin, Handshake, TrendingUp, Search, Briefcase, FileSignature, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

// Datos simulados de requerimientos a futuro
const REQUERIMIENTOS = [
  {
    id: 'FUT-8821',
    comprador: 'Corabastos (Bodega 45 - AgroSabana)',
    compradorTipo: 'Mayorista',
    producto: 'Papa Pastusa Calidad Primera',
    cantidadNecesaria: 50,
    unidad: 'Toneladas',
    precioOfrecido: 120000,
    unidadPrecio: 'Bulto (50kg)',
    fechaEntrega: '15 de Diciembre de 2026',
    estado: 'ABIERTO',
    ubicacion: 'Bogotá, D.C.',
    garantia: 'Fondo Nacional de Garantías'
  },
  {
    id: 'FUT-9012',
    comprador: 'Restaurantes Wok & Crepes',
    compradorTipo: 'Cadena de Restaurantes',
    producto: 'Tomate Chonto (Larga Vida)',
    cantidadNecesaria: 2,
    unidad: 'Toneladas',
    precioOfrecido: 3500,
    unidadPrecio: 'Kilo',
    fechaEntrega: 'Mensual (Inicia Enero 2027)',
    estado: 'ABIERTO',
    ubicacion: 'Medellín, Antioquia',
    garantia: 'Contrato Escrow AgroPaccioli'
  },
  {
    id: 'FUT-9055',
    comprador: 'Exportadores del Eje',
    compradorTipo: 'Agroexportador',
    producto: 'Aguacate Hass (Calibre 14-22)',
    cantidadNecesaria: 12,
    unidad: 'Toneladas',
    precioOfrecido: 4800,
    unidadPrecio: 'Kilo',
    fechaEntrega: 'Octubre 2026',
    estado: 'CASI_LLENO',
    ubicacion: 'Pereira, Risaralda',
    garantia: 'Carta de Crédito Bancolombia'
  }
];

export default function AgriculturaContratoPage() {
  const [contratoTomado, setContratoTomado] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-950 text-white pt-20 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-950 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-700 px-4 py-2 rounded-full text-emerald-200 text-xs font-black uppercase tracking-wider mb-6">
              <CalendarClock className="w-4 h-4" /> Bolsa de Cosechas a Futuro
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Asegure sus ventas <span className="text-amber-400">antes de sembrar la semilla.</span>
            </h1>
            <p className="text-lg text-emerald-100/90 font-medium mb-8 leading-relaxed">
              En la <strong>Agricultura por Contrato</strong> usted ya no siembra a ciegas. Revise lo que las grandes empresas y restaurantes necesitarán en los próximos meses, tome un contrato y siembre con la tranquilidad de que su cosecha ya está vendida a un precio fijo y justo.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-emerald-900/50 rounded-xl p-3 border border-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-50">Precios Garantizados</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/50 rounded-xl p-3 border border-emerald-800">
                <Handshake className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-50">Contratos Smart B2B</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/50 rounded-xl p-3 border border-emerald-800">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-50">Cero Intermediarios</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl -mt-8 relative z-20">
        
        {/* Barra de Búsqueda */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 mb-10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar cultivo (Ej: Tomate, Papa, Cebolla)..." 
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 font-medium"
            />
          </div>
          <div className="w-full md:w-64">
            <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-emerald-500 font-bold text-zinc-700">
              <option>Todas las regiones</option>
              <option>Cundinamarca / Boyacá</option>
              <option>Antioquia / Eje Cafetero</option>
              <option>Valle del Cauca</option>
            </select>
          </div>
        </div>

        {/* Modal de Éxito de Contrato */}
        {contratoTomado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[2rem] p-8 text-center shadow-2xl border-4 border-emerald-50 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSignature className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-emerald-950 mb-2">¡Pre-Contrato Firmado!</h2>
              <p className="text-zinc-600 text-sm mb-8">
                Ha separado una cuota de producción para el requerimiento <strong>{contratoTomado}</strong>. Hemos generado un Smart Contract agrícola que garantiza su pago una vez entregue la cosecha.
              </p>
              
              <Link href="/contratos" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
                Ver mi Smart Contract <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={() => setContratoTomado(null)} className="mt-4 text-xs font-bold text-zinc-500 hover:text-zinc-800 underline">
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-emerald-950">Bolsa de Requerimientos B2B</h2>
            <p className="text-sm text-zinc-500 mt-1 font-medium">Empresas buscando campesinos para sembrar.</p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-200">
            {REQUERIMIENTOS.length} Ofertas Abiertas
          </span>
        </div>

        <div className="grid gap-6">
          {REQUERIMIENTOS.map((req) => (
            <div key={req.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100 hover:shadow-lg hover:border-emerald-300 transition-all group relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-in-out pointer-events-none"></div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
                {/* Info Principal */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider">
                      {req.id}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider ${req.estado === 'ABIERTO' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'}`}>
                      {req.estado === 'ABIERTO' ? '✅ Cupos Abiertos' : '⏳ Pocos Cupos'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-zinc-900 mb-1">{req.producto}</h3>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-sm font-bold mb-6">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>{req.comprador}</span>
                    <span className="bg-zinc-100 text-zinc-600 text-[10px] px-1.5 py-0.5 rounded ml-1">{req.compradorTipo}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Necesitan</span>
                      <p className="font-black text-emerald-950 text-lg">{req.cantidadNecesaria} <span className="text-sm font-bold text-zinc-600">{req.unidad}</span></p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase block mb-1">Pagan a</span>
                      <p className="font-black text-emerald-700 text-lg">${req.precioOfrecido.toLocaleString()}</p>
                      <p className="text-[10px] text-emerald-600 font-bold">x {req.unidadPrecio}</p>
                    </div>
                    <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Para entregar en</span>
                      <p className="font-black text-zinc-800 text-sm flex items-center gap-1"><CalendarClock className="w-4 h-4 text-sky-500"/> {req.fechaEntrega}</p>
                    </div>
                    <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Lugar de entrega</span>
                      <p className="font-black text-zinc-800 text-sm flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-500"/> {req.ubicacion}</p>
                    </div>
                  </div>
                </div>

                {/* Acción y Garantía */}
                <div className="w-full md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-6">
                  <div className="bg-sky-50 rounded-xl p-3 border border-sky-100 mb-4 flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
                    <div>
                      <p className="text-[10px] text-sky-900 font-bold uppercase">Respaldo</p>
                      <p className="text-xs text-sky-800 font-medium">{req.garantia}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setContratoTomado(req.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 group/btn"
                  >
                    Tomar Contrato <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-zinc-400 mt-2 font-medium">Se firmará un Smart Contract vinculante.</p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA Compradores */}
        <div className="mt-16 bg-zinc-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <Briefcase className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">¿Es usted un Comprador B2B?</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
            Deje de sufrir por la inestabilidad de precios. Publique su requerimiento de cosecha a futuro, fije un precio hoy y nosotros conectaremos su demanda con nuestra red de +5,000 campesinos verificados.
          </p>
          <Link href="/almacenes-b2b" className="inline-block bg-white text-zinc-900 font-black px-8 py-4 rounded-xl shadow-xl hover:bg-emerald-50 transition-colors">
            Publicar un Requerimiento
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
