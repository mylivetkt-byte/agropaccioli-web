'use client';

import React, { useState } from 'react';
import { Mic, Camera, MapPin, Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';

export default function FormularioCosechaIA({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState<'IDLE' | 'RECORDING' | 'ANALYZING' | 'SUCCESS'>('IDLE');
  const [method, setMethod] = useState<'VOICE' | 'PHOTO' | null>(null);

  const handleSimulateAction = (type: 'VOICE' | 'PHOTO') => {
    setMethod(type);
    if (type === 'VOICE') {
      setStep('RECORDING');
      // Simulamos 3 segundos de grabación y luego analizamos
      setTimeout(() => setStep('ANALYZING'), 3000);
      setTimeout(() => setStep('SUCCESS'), 6000);
    } else {
      setStep('ANALYZING');
      // Simulamos subida y análisis de foto
      setTimeout(() => setStep('SUCCESS'), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative border-4 border-emerald-50">
        
        {/* Header (Botón cerrar) */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center bg-zinc-100 rounded-full text-zinc-500 hover:bg-zinc-200"
          >
            <X className="w-4 h-4 font-bold" />
          </button>
        </div>

        {step === 'IDLE' && (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-emerald-950 mb-2 leading-tight">Publicación<br/>Inteligente</h2>
            <p className="text-zinc-500 text-sm mb-8 px-4">
              No tienes que escribir nada. Cuéntale a <strong>AgroIA</strong> qué tienes o envíale una foto de tu cosecha.
            </p>

            <div className="w-full space-y-4">
              <button 
                onClick={() => handleSimulateAction('VOICE')}
                className="w-full relative overflow-hidden group bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl shadow-lg transition-all flex flex-col items-center gap-2"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-all"></div>
                <Mic className="w-10 h-10" />
                <span className="font-bold text-lg">Nota de Voz</span>
                <span className="text-emerald-100 text-xs">"Tengo 20 bultos de papa..."</span>
              </button>

              <button 
                onClick={() => {
                  // Aquí idealmente abriríamos el input file nativo de la cámara
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.capture = 'environment';
                  input.onchange = () => handleSimulateAction('PHOTO');
                  input.click();
                }}
                className="w-full bg-sky-50 hover:bg-sky-100 text-sky-800 p-5 rounded-2xl border-2 border-sky-200 transition-all flex flex-col items-center gap-2"
              >
                <Camera className="w-8 h-8 text-sky-600" />
                <span className="font-bold">Tomar una Foto</span>
                <span className="text-sky-600/70 text-xs text-center">AgroIA extraerá tu ubicación GPS<br/>y el tipo de cultivo de la imagen.</span>
              </button>
            </div>
          </div>
        )}

        {step === 'RECORDING' && (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-24 h-24 bg-red-500 rounded-full relative z-10 flex items-center justify-center shadow-xl">
                <Mic className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-red-950 mb-2">Escuchando...</h3>
            <p className="text-red-800/80 text-sm">Habla fuerte y claro.</p>
          </div>
        )}

        {step === 'ANALYZING' && (
          <div className="p-10 flex flex-col items-center text-center bg-gradient-to-b from-sky-50 to-white">
            <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mb-6 animate-bounce shadow-inner border border-sky-200">
              <Sparkles className="w-10 h-10 text-sky-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-sky-950 mb-2">AgroIA está pensando...</h3>
            <p className="text-sky-800/70 text-sm max-w-[200px]">
              {method === 'VOICE' 
                ? 'Extrayendo cantidad, producto y precio de tu voz.' 
                : 'Analizando imagen y extrayendo ubicación GPS.'}
            </p>
            
            <div className="w-full h-2 bg-sky-100 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full animate-pulse w-2/3"></div>
            </div>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="p-8 flex flex-col items-center bg-emerald-50 h-full">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <h3 className="text-xl font-black text-emerald-950 mb-6 text-center">¡Cosecha Detectada!</h3>
            
            <div className="bg-white w-full p-4 rounded-2xl shadow-sm border border-emerald-100 mb-6 text-left space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-0.5">Producto detectado</span>
                <p className="font-black text-zinc-800 text-lg leading-none">Papa Pastusa</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-0.5">Cantidad</span>
                  <p className="font-bold text-zinc-700">20 Bultos</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-0.5">Precio Venta</span>
                  <p className="font-bold text-zinc-700">$80,000 / Bulto</p>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-500" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-0.5">Ubicación GPS (Automática)</span>
                  <p className="font-bold text-zinc-700 text-xs">Vereda Centro, Aquitania (Boyacá)</p>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
            >
              Publicar Cosecha <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setStep('IDLE')}
              className="mt-3 text-xs font-bold text-zinc-500 hover:text-zinc-800 underline"
            >
              Me equivoqué, volver a intentar
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
