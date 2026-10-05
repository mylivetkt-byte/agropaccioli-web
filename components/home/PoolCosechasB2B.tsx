'use client';

import React from 'react';
import { Users, Truck, Sparkles, Box, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';

export default function PoolCosechasB2B() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 to-emerald-900 border-y border-emerald-800 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          <div className="flex-1 space-y-5 text-white">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-700 px-3 py-1.5 rounded-full text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" /> Cooperativismo Digital B2B
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              ¿No tiene volumen para venderle a <span className="text-amber-400">grandes empresas?</span>
            </h2>
            
            <p className="text-emerald-100/90 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
              Nuestra IA agrupa su cosecha con la de otros campesinos de su vereda para armar tractomulas enteras de 20 toneladas. <strong className="text-white">Juntos sí pueden venderle a Nutresa, Éxito y Corabastos a precio mayorista.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-amber-400 hover:bg-amber-500 text-amber-950 px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2">
                Unirme a un Lote Compartido <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-emerald-200 mt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Contratos Seguros</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Logística Compartida</span>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            {/* Tarjeta de simulación del Pool */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-emerald-700/30 transform rotate-1 hover:rotate-0 transition-transform">
              <div className="flex justify-between items-start border-b border-zinc-100 pb-4 mb-4">
                <div>
                  <h3 className="font-black text-xl text-zinc-900">Pool Activo: Aguacate Hass</h3>
                  <p className="text-sm text-zinc-500 font-medium mt-1">Destino: Planta Empacadora Pereira</p>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                  <PieChart className="w-4 h-4" /> 80% Lleno
                </div>
              </div>
              
              <div className="space-y-4 relative">
                {/* Llenado visual */}
                <div className="h-6 w-full bg-zinc-100 rounded-full overflow-hidden flex relative">
                  <div className="h-full bg-emerald-500 w-[40%] flex items-center px-2 text-[10px] font-black text-white" title="Don José (4 Ton)">Don José</div>
                  <div className="h-full bg-emerald-400 w-[25%] border-l border-white/20 flex items-center px-2 text-[10px] font-black text-white" title="Finca La Esperanza (2.5 Ton)">La Esperanza</div>
                  <div className="h-full bg-amber-400 w-[15%] border-l border-white/20 flex items-center px-2 text-[10px] font-black text-amber-950" title="Su Aporte (1.5 Ton)">¡Tu Aporte!</div>
                </div>
                
                <div className="flex justify-between text-xs font-bold text-zinc-600 px-1">
                  <span>0 Ton</span>
                  <span>Meta: 10 Toneladas (Camión Sencillo)</span>
                </div>
                
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 font-bold mb-1">Precio Comprador B2B</p>
                    <p className="text-2xl font-black text-emerald-700">$4.500 <span className="text-sm text-zinc-400">/Kg</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 font-bold mb-1">Falta para cerrar</p>
                    <p className="text-lg font-black text-amber-600">2 Toneladas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
