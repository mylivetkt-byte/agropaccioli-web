'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Sprout, Truck, Users, TrendingUp, AlertTriangle, ArrowRight, X, Sparkles } from 'lucide-react';

export default function CalculadoraRentabilidad({ onClose }: { onClose?: () => void }) {
  const [paso, setPaso] = useState(1);
  const [cargando, setCargando] = useState(false);
  
  const [datos, setDatos] = useState({
    producto: '',
    cantidad: '',
    unidad: 'Bultos',
    costoSemillas: '',
    costoInsumos: '',
    costoJornales: '',
    costoTransporte: ''
  });

  const [resultado, setResultado] = useState<{
    costoTotal: number;
    costoUnidad: number;
    mensajeIA: string;
    esRentable: boolean;
  } | null>(null);

  const handleCalcular = () => {
    setCargando(true);
    
    // Simular el tiempo de respuesta de la IA
    setTimeout(() => {
      const cantidad = parseFloat(datos.cantidad) || 1;
      const tSemillas = parseFloat(datos.costoSemillas) || 0;
      const tInsumos = parseFloat(datos.costoInsumos) || 0;
      const tJornales = parseFloat(datos.costoJornales) || 0;
      const tTransporte = parseFloat(datos.costoTransporte) || 0;

      const costoTotal = tSemillas + tInsumos + tJornales + tTransporte;
      const costoUnidad = costoTotal / cantidad;

      setResultado({
        costoTotal,
        costoUnidad,
        esRentable: true,
        mensajeIA: `Su costo real para producir 1 ${datos.unidad} de ${datos.producto || 'su cosecha'} es de $${costoUnidad.toLocaleString()} COP. Nunca acepte una oferta por debajo de este valor o perderá dinero. ¡Conocer sus números es el primer paso para progresar!`
      });
      setCargando(false);
      setPaso(3);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden relative border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-800 p-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Calculator className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h2 className="font-black text-lg leading-tight">Calculadora AgroIA</h2>
              <p className="text-xs text-emerald-200">No venda a pérdidas</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-emerald-900/50 rounded-full text-emerald-200 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-6 overflow-y-auto">
          {paso === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <p className="text-sm text-zinc-600 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                Paso 1: ¿Qué produjo y cuánto sacó?
              </p>
              
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Nombre del cultivo</label>
                <input 
                  type="text" 
                  value={datos.producto}
                  onChange={e => setDatos({...datos, producto: e.target.value})}
                  className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold" 
                  placeholder="Ej: Papa Pastusa" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Cantidad sacada</label>
                  <input 
                    type="number" 
                    value={datos.cantidad}
                    onChange={e => setDatos({...datos, cantidad: e.target.value})}
                    className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-lg" 
                    placeholder="20" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Unidad</label>
                  <select 
                    value={datos.unidad}
                    onChange={e => setDatos({...datos, unidad: e.target.value})}
                    className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold"
                  >
                    <option>Bultos</option>
                    <option>Kilos</option>
                    <option>Arrobas</option>
                    <option>Toneladas</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => setPaso(2)}
                disabled={!datos.producto || !datos.cantidad}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
              >
                Siguiente Paso <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <p className="text-sm text-zinc-600 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                Paso 2: ¿Cuánto se gastó en total? (Aprox)
              </p>
              
              <div>
                <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 mb-1">
                  <Sprout className="w-4 h-4 text-emerald-600" /> Semillas / Plantulas ($)
                </label>
                <input 
                  type="number" 
                  value={datos.costoSemillas}
                  onChange={e => setDatos({...datos, costoSemillas: e.target.value})}
                  className="w-full border-2 border-zinc-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 font-bold text-lg" 
                  placeholder="0" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Abonos y Venenos ($)
                </label>
                <input 
                  type="number" 
                  value={datos.costoInsumos}
                  onChange={e => setDatos({...datos, costoInsumos: e.target.value})}
                  className="w-full border-2 border-zinc-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 font-bold text-lg" 
                  placeholder="0" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-sky-500" /> Jornales / Trabajadores ($)
                </label>
                <input 
                  type="number" 
                  value={datos.costoJornales}
                  onChange={e => setDatos({...datos, costoJornales: e.target.value})}
                  className="w-full border-2 border-zinc-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 font-bold text-lg" 
                  placeholder="0" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-zinc-500" /> Transporte / Fletes ($)
                </label>
                <input 
                  type="number" 
                  value={datos.costoTransporte}
                  onChange={e => setDatos({...datos, costoTransporte: e.target.value})}
                  className="w-full border-2 border-zinc-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 font-bold text-lg" 
                  placeholder="0" 
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setPaso(1)}
                  className="px-6 py-4 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-bold text-zinc-600 transition-all"
                >
                  Volver
                </button>
                <button 
                  onClick={handleCalcular}
                  disabled={cargando}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
                >
                  {cargando ? 'AgroIA Calculando...' : 'Calcular Rentabilidad'}
                </button>
              </div>
            </div>
          )}

          {paso === 3 && resultado && (
            <div className="space-y-6 animate-in fade-in zoom-in-95">
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-emerald-600">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <p className="text-sm text-emerald-800 font-bold uppercase tracking-wider mb-1">Su costo de producción por {datos.unidad.toLowerCase()} es</p>
                <h3 className="text-4xl font-black text-emerald-950">
                  <span className="text-lg text-emerald-600 align-top mr-1">$</span>
                  {resultado.costoUnidad.toLocaleString()}
                </h3>
                <p className="text-xs text-emerald-700 mt-2">Costo Total: ${resultado.costoTotal.toLocaleString()}</p>
              </div>

              <div className="bg-zinc-800 text-white p-5 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="flex gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-emerald-100">Consejo de AgroIA:</h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {resultado.mensajeIA}
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose || (() => setPaso(1))}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
              >
                ¡Entendido, gracias!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
