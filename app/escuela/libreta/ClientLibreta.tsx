'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import MiLibretaDashboard from './MiLibretaDashboard';
import { obtenerLibretaEstudiante } from '@/app/actions/escuela';

export default function ClientLibreta() {
  const [telefono, setTelefono] = useState('');
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState<'CARGANDO_SESION' | 'PEDIR_NUMERO' | 'PEDIR_CODIGO' | 'AUTENTICADO'>('CARGANDO_SESION');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState<any>(null);

  React.useEffect(() => {
    // Restaurar sesión si existe
    const sesionGuardada = sessionStorage.getItem('agropaccioli_session');
    if (sesionGuardada) {
      obtenerLibretaEstudiante(sesionGuardada).then(response => {
        if (response.success) {
          setStudentData(response);
          setEstado('AUTENTICADO');
        } else {
          setEstado('PEDIR_NUMERO');
        }
      });
    } else {
      setEstado('PEDIR_NUMERO');
    }
  }, []);

  const solicitarCodigo = () => {
    if (telefono.length < 10) {
      setError('Por favor, escriba un número de celular válido.');
      return;
    }
    setError('');
    setCargando(true);
    // Simular el envío de WhatsApp
    setTimeout(() => {
      setCargando(false);
      setEstado('PEDIR_CODIGO');
    }, 1500);
  };

  const verificarCodigo = async () => {
    if (codigo !== '1234' && codigo !== '0000') { // Para pruebas aceptamos estos
      setError('Código incorrecto. Intente con 1234 para esta prueba.');
      return;
    }
    
    setError('');
    setCargando(true);
    
    // Aquí usamos el número 573111111111 por defecto si prueban con otro para no dejar la UI vacía
    const telReal = telefono.includes('3111111111') ? '573111111111' : '573111111111';
    
    const response = await obtenerLibretaEstudiante(telReal);
    
    if (response.success) {
      sessionStorage.setItem('agropaccioli_session', telReal);
      setStudentData(response);
      setEstado('AUTENTICADO');
    } else {
      setError(response.error || 'Error al ingresar.');
    }
    setCargando(false);
  };

  if (estado === 'CARGANDO_SESION') {
    return <div className="min-h-[70vh] flex items-center justify-center text-emerald-800 font-bold animate-pulse">Restaurando su sesión segura...</div>;
  }

  if (estado === 'AUTENTICADO' && studentData) {
    return (
      <div>
        <div className="bg-white/80 p-2 text-right">
          <button 
            onClick={() => {
              sessionStorage.removeItem('agropaccioli_session');
              setEstado('PEDIR_NUMERO');
              setTelefono('');
              setCodigo('');
            }} 
            className="text-xs font-bold text-red-600 hover:text-red-800 underline px-4"
          >
            Cerrar Sesión (Salir de Libreta)
          </button>
        </div>
        <MiLibretaDashboard studentData={studentData} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-[2rem] p-8 shadow-2xl border-2 border-emerald-100 w-full text-center relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-inner">
          <ShieldCheck className="w-10 h-10" />
        </div>
        
        <h2 className="text-2xl font-black text-emerald-950 mb-2 relative z-10">Seguridad de la Libreta</h2>
        <p className="text-emerald-800/80 font-medium text-sm mb-8 relative z-10">
          Sus notas y diplomas son privados. Nadie más puede ver su progreso.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 font-bold p-3 rounded-xl text-sm mb-6 border border-red-200">
            {error}
          </div>
        )}

        {estado === 'PEDIR_NUMERO' && (
          <div className="space-y-4 relative z-10 text-left mt-4">
            <label className="block font-bold text-emerald-900 ml-2">¿Cuál es su número de celular?</label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <input
                type="tel"
                placeholder="Ej: 3101234567"
                className="w-full bg-zinc-50 border-2 border-emerald-200 rounded-2xl py-4 pl-12 pr-4 text-xl font-bold text-emerald-900 outline-none focus:ring-4 focus:ring-emerald-400/50 transition-all"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={solicitarCodigo}
                disabled={cargando}
                className={`w-full text-white font-black text-lg py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 ${cargando ? 'bg-zinc-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'}`}
              >
                {cargando ? (
                  <div className="flex flex-col items-center w-full px-4">
                    <span>Enviando código...</span>
                    <div className="w-full bg-zinc-200 rounded-full h-2 mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full animate-pulse w-full"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Enviar código por WhatsApp
                  </>
                )}
              </button>

              <button 
                onClick={() => window.location.href = '/escuela'}
                className="w-full bg-white border-2 border-zinc-200 text-zinc-600 font-bold text-lg py-4 rounded-2xl shadow-sm hover:bg-zinc-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Cancelar y Volver al Catálogo
              </button>
            </div>
          </div>
        )}

        {estado === 'PEDIR_CODIGO' && (
          <div className="space-y-4 relative z-10 text-left animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 mb-6 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-sm font-medium">
                <p>Acabamos de enviarle un código secreto a su WhatsApp <strong>{telefono}</strong>.</p>
                <p className="mt-2 text-xs bg-amber-100 text-amber-800 p-2 rounded border border-amber-200">
                  ⚠️ <strong>Nota (Simulador):</strong> Como el sistema aún no está conectado a la API de Meta/WhatsApp, por favor use el código de prueba <strong>1234</strong> para continuar.
                </p>
              </div>
            </div>
            
            <label className="block font-bold text-emerald-900 ml-2">Escriba el código secreto aquí:</label>
            <input
              type="text"
              placeholder="Ej: 1234"
              maxLength={4}
              className="w-full bg-zinc-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 text-3xl tracking-[1em] text-center font-black text-emerald-900 outline-none focus:ring-4 focus:ring-emerald-400/50 transition-all"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
            />
            
            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={verificarCodigo}
                disabled={cargando || codigo.length < 4}
                className={`w-full text-white font-black text-lg py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 ${cargando || codigo.length < 4 ? 'bg-zinc-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'}`}
              >
                {cargando ? (
                   <div className="flex flex-col items-center w-full px-4">
                     <span>Verificando...</span>
                     <div className="w-full bg-zinc-200 rounded-full h-2 mt-2 overflow-hidden">
                       <div className="bg-emerald-500 h-2 rounded-full animate-pulse w-full"></div>
                     </div>
                   </div>
                ) : (
                  <>
                    Entrar a mi Libreta <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button 
                onClick={() => setEstado('PEDIR_NUMERO')}
                className="w-full bg-white border-2 border-zinc-200 text-zinc-600 font-bold text-lg py-4 rounded-2xl shadow-sm hover:bg-zinc-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a escribir mi número
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
