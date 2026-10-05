'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { CreditCard, Users, Tractor, ArrowRight, ShieldCheck, PieChart, Info, DollarSign, Sprout, Building } from 'lucide-react';
import Link from 'next/link';

export default function AgroFintechPage() {
  const [tab, setTab] = useState<'FINANCIACION' | 'POOL_COMPRAS'>('FINANCIACION');

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-950 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-950 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-700 px-4 py-2 rounded-full text-emerald-200 text-xs font-black uppercase tracking-wider mb-6">
            <DollarSign className="w-4 h-4" /> Billetera y Financiamiento Agro
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 max-w-4xl mx-auto leading-tight">
            El capital que necesita, <br className="hidden md:block" />
            <span className="text-amber-400">sin los trámites del banco.</span>
          </h1>
          <p className="text-lg text-emerald-100/90 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            AgroPaccioli elimina a los "gota a gota" y la burocracia bancaria. Compre sus insumos a crédito o únase con sus vecinos para comprar barato al por mayor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setTab('FINANCIACION')}
              className={`px-8 py-4 rounded-xl font-black text-sm transition-all border-2 ${tab === 'FINANCIACION' ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-xl shadow-amber-400/20' : 'bg-emerald-900/50 text-white border-emerald-700 hover:bg-emerald-800'}`}
            >
              Lleve insumos, pague en Cosecha
            </button>
            <button 
              onClick={() => setTab('POOL_COMPRAS')}
              className={`px-8 py-4 rounded-xl font-black text-sm transition-all border-2 ${tab === 'POOL_COMPRAS' ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-emerald-900/50 text-white border-emerald-700 hover:bg-emerald-800'}`}
            >
              Compras Comunitarias (Pool)
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl -mt-8 relative z-20">
        
        {tab === 'FINANCIACION' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
              <div className="p-8 md:p-12 border-b border-zinc-100 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-zinc-900 mb-4">Crédito Inmediato contra Cosecha</h2>
                  <p className="text-zinc-600 mb-6 leading-relaxed">
                    Si usted ya firmó un "Contrato a Futuro" en nuestra plataforma, <strong>AgroPaccioli le adelanta los insumos hoy mismo</strong>. 
                    Vaya a cualquier Almacén B2B aliado, retire semillas y fertilizantes, y el sistema descontará el valor automáticamente el día que usted le entregue la cosecha al comprador.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" /> Sin codeudores ni hipotecas de la finca.
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" /> Aprobación instantánea con IA.
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" /> 0% de interés si entrega a tiempo.
                    </li>
                  </ul>
                  <button className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-black px-8 py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
                    Simular mi Crédito <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="w-full md:w-80 shrink-0 bg-amber-50 rounded-3xl p-6 border border-amber-100 shadow-sm relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    <DollarSign className="w-4 h-4 text-amber-950 font-black" />
                  </div>
                  <h3 className="font-black text-amber-900 mb-4">Su Cupo Disponible</h3>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 text-center mb-4">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Cupo pre-aprobado (Basado en IA)</p>
                    <p className="text-3xl font-black text-amber-600">$4.500.000</p>
                  </div>
                  <p className="text-xs text-amber-700 text-center font-medium leading-relaxed">
                    Cupo exclusivo para redimir en almacenes aliados de AgroPaccioli (Semillas, fertilizantes, alquiler de maquinaria).
                  </p>
                </div>
              </div>
              
              <div className="p-8 bg-zinc-50 flex items-start gap-4">
                <Info className="w-6 h-6 text-zinc-400 shrink-0 mt-1" />
                <p className="text-sm text-zinc-500 leading-relaxed">
                  <strong>¿Cómo funciona el recaudo?</strong> AgroPaccioli utiliza un sistema de pagos en garantía (Escrow). Cuando el restaurante paga por su cosecha de tomate, la plata entra a la plataforma. El sistema primero le paga al Almacén los insumos que usted sacó a crédito, y el resto del dinero se le transfiere a su cuenta bancaria de inmediato. Todo automático y transparente.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'POOL_COMPRAS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
              <div className="p-8 md:p-12 border-b border-zinc-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div>
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                      <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-zinc-900 mb-2">Pool de Compras (Vaca Comunitaria)</h2>
                    <p className="text-zinc-600 font-medium">Únase a otros campesinos para comprarle directamente a las fábricas.</p>
                  </div>
                  <div className="bg-sky-50 text-sky-800 border border-sky-100 px-4 py-2 rounded-xl text-sm font-bold">
                    Ahorro promedio: <span className="text-sky-600 font-black text-lg">30%</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pool Card 1 */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-emerald-500 hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md animate-pulse">
                      Cierra en 2 Días
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-zinc-500" />
                      </div>
                      <div>
                        <h3 className="font-black text-zinc-900">Urea YaraMila Integrador</h3>
                        <p className="text-xs text-zinc-500 font-bold">Directo de Fábrica (Cartagena)</p>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-50 rounded-xl p-4 mb-4 border border-zinc-100 flex justify-between">
                      <div>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase">Precio Normal</p>
                        <p className="font-black text-zinc-400 line-through text-lg">$180.000 / Bto</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-emerald-600 font-bold uppercase">Precio Pool</p>
                        <p className="font-black text-emerald-600 text-xl">$125.000 / Bto</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-bold text-zinc-600 mb-1">
                        <span>Progreso: 65% Lleno</span>
                        <span>Meta: 34 Toneladas (Mula)</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[65%]"></div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 mb-6 line-clamp-2 leading-relaxed">
                      Lote destinado para entrega en Tunja, Boyacá. Faltan 11.9 toneladas para que despachen la tractomula. Únase y ahorre $55.000 por cada bulto.
                    </p>

                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl shadow-md transition-all">
                      Aportar a esta "Vaca"
                    </button>
                  </div>

                  {/* Pool Card 2 */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                        <Tractor className="w-5 h-5 text-zinc-500" />
                      </div>
                      <div>
                        <h3 className="font-black text-zinc-900">Alquiler de Tractor John Deere</h3>
                        <p className="text-xs text-zinc-500 font-bold">Consorcio Regional</p>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-50 rounded-xl p-4 mb-4 border border-zinc-100 flex justify-between">
                      <div>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase">Hora Individual</p>
                        <p className="font-black text-zinc-400 line-through text-lg">$80.000 / Hr</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-sky-600 font-bold uppercase">Hora Pool (Mensual)</p>
                        <p className="font-black text-sky-600 text-xl">$45.000 / Hr</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-bold text-zinc-600 mb-1">
                        <span>Progreso: 15% Lleno</span>
                        <span>Meta: 100 Horas Reservadas</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 w-[15%]"></div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 mb-6 line-clamp-2 leading-relaxed">
                      Arrendamiento de tractor pesado para arado profundo en el Valle del Cauca (Zona Norte). Asegure sus horas de maquinaria a mitad de precio uniéndose al pool.
                    </p>

                    <button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-black py-3 rounded-xl transition-all">
                      Aportar a esta "Vaca"
                    </button>
                  </div>
                </div>

              </div>
              
              <div className="p-8 bg-zinc-50 text-center">
                <p className="text-sm text-zinc-600 font-medium mb-4">¿Representa a una asociación campesina y quieren crear su propia compra en volumen?</p>
                <button className="bg-white border-2 border-emerald-600 text-emerald-700 font-black px-6 py-3 rounded-xl shadow-sm hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                  <Sprout className="w-5 h-5" /> Abrir Nuevo Pool de Compras
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
