'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Building2, ShieldCheck, Upload, FileText, CheckCircle2, ArrowRight, AlertTriangle, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function RegistroB2BPage() {
  const [paso, setPaso] = useState(1);
  const [simulando, setSimulando] = useState(false);
  const [sarlaftStatus, setSarlaftStatus] = useState<'PENDIENTE' | 'APROBADO' | 'RECHAZADO'>('PENDIENTE');

  const simularValidacion = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulando(true);
    
    // Simulamos conexión con API de Registraduría, DIAN y Listas Restrictivas (SARLAFT)
    setTimeout(() => {
      setSimulando(false);
      setSarlaftStatus('APROBADO');
      setPaso(3);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Cuentas Corporativas
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4">Registro B2B & Verificación</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto font-medium">
            En AgroPaccioli protegemos a nuestros campesinos. Todas las empresas y compradores mayoristas deben pasar por un filtro estricto de LA/FT (Lavado de Activos y Financiación del Terrorismo) antes de poder negociar.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden relative">
          
          {/* Progress Bar */}
          <div className="flex bg-zinc-100">
            <div className={`flex-1 py-4 text-center font-bold text-xs uppercase border-r border-white transition-colors ${paso >= 1 ? 'bg-emerald-600 text-white' : 'text-zinc-400'}`}>1. Datos Empresa</div>
            <div className={`flex-1 py-4 text-center font-bold text-xs uppercase border-r border-white transition-colors ${paso >= 2 ? 'bg-emerald-600 text-white' : 'text-zinc-400'}`}>2. Documentos</div>
            <div className={`flex-1 py-4 text-center font-bold text-xs uppercase transition-colors ${paso >= 3 ? 'bg-emerald-600 text-white' : 'text-zinc-400'}`}>3. Verificación IA</div>
          </div>

          <div className="p-8 md:p-12">
            
            {paso === 1 && (
              <form onSubmit={() => setPaso(2)} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-zinc-900">Información Comercial</h2>
                    <p className="text-sm text-zinc-500 font-medium">Datos básicos de la razón social</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">Razón Social</label>
                    <input type="text" placeholder="Ej: AgroExportaciones S.A.S" className="w-full border-2 border-zinc-200 rounded-xl p-3 outline-none focus:border-emerald-500 font-medium" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">NIT</label>
                    <input type="text" placeholder="Ej: 900.123.456-7" className="w-full border-2 border-zinc-200 rounded-xl p-3 outline-none focus:border-emerald-500 font-mono text-zinc-700" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">Nombre Representante Legal</label>
                    <input type="text" className="w-full border-2 border-zinc-200 rounded-xl p-3 outline-none focus:border-emerald-500 font-medium" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">Cédula Representante</label>
                    <input type="number" className="w-full border-2 border-zinc-200 rounded-xl p-3 outline-none focus:border-emerald-500 font-mono text-zinc-700" required />
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-black px-8 py-4 rounded-xl mt-8 flex justify-center items-center gap-2 transition-all">
                  Siguiente: Cargar Documentos <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {paso === 2 && !simulando && sarlaftStatus === 'PENDIENTE' && (
              <form onSubmit={simularValidacion} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-700">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-zinc-900">Soporte Documental LA/FT</h2>
                    <p className="text-sm text-zinc-500 font-medium">Archivos obligatorios para operar en AgroPaccioli</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-6 text-center hover:bg-zinc-50 hover:border-emerald-400 transition-colors cursor-pointer group">
                    <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2 group-hover:text-emerald-500 transition-colors" />
                    <p className="font-bold text-zinc-700">RUT Actualizado (PDF)</p>
                    <p className="text-xs text-zinc-500">Expedición DIAN no mayor a 30 días</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-6 text-center hover:bg-zinc-50 hover:border-emerald-400 transition-colors cursor-pointer group">
                    <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2 group-hover:text-emerald-500 transition-colors" />
                    <p className="font-bold text-zinc-700">Certificado Cámara de Comercio</p>
                    <p className="text-xs text-zinc-500">Documento PDF emitido por CCB o equivalente</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex gap-3 mt-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                  <p className="text-xs font-medium text-amber-800 leading-relaxed">
                    Al hacer clic en "Verificar", usted autoriza a AgroPaccioli S.A.S a consultar a su empresa y representante legal en las listas Clinton, OFAC, ONU, Policía Nacional, Contraloría y Procuraduría de Colombia.
                  </p>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <button type="button" onClick={() => setPaso(1)} className="text-sm font-bold text-zinc-500 hover:text-zinc-800 underline">
                    Atrás
                  </button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all">
                    <Fingerprint className="w-5 h-5" /> Iniciar Verificación KYC
                  </button>
                </div>
              </form>
            )}

            {simulando && (
              <div className="py-20 text-center animate-in zoom-in-95">
                <div className="w-24 h-24 border-8 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-8"></div>
                <h2 className="text-2xl font-black text-zinc-900 mb-2">Motor KYC Operando...</h2>
                <div className="space-y-2 text-sm font-medium text-zinc-500 font-mono">
                  <p className="text-emerald-600 animate-pulse">→ Conectando con API DIAN (Validando RUT)... OK</p>
                  <p className="text-emerald-600 animate-pulse delay-75">→ Extrayendo RUES Cámara de Comercio... OK</p>
                  <p className="text-sky-600 animate-pulse delay-150">→ Consultando Listas Restrictivas (Interpol/OFAC)...</p>
                  <p className="text-zinc-400">→ Analizando Representante Legal...</p>
                </div>
              </div>
            )}

            {paso === 3 && sarlaftStatus === 'APROBADO' && (
              <div className="py-12 text-center animate-in zoom-in-95">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-emerald-950 mb-4">¡Verificación Exitosa!</h2>
                <p className="text-zinc-600 max-w-md mx-auto leading-relaxed mb-8">
                  La empresa y su representante legal han pasado todos los filtros anti-fraude y SARLAFT. Su cuenta ha sido calificada como <strong>"Comprador Seguro"</strong>.
                </p>
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 inline-block text-left mb-8">
                  <h3 className="font-bold text-zinc-800 mb-3 text-sm">Privilegios Desbloqueados:</h3>
                  <ul className="space-y-2 text-sm text-zinc-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Acceso al Mapa de Cosechas en Vivo</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Creación de Requerimientos B2B (Futuros)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Firma de Smart Contracts (Ley 527)</li>
                  </ul>
                </div>
                <div>
                  <Link href="/agricultura-contrato" className="bg-zinc-900 hover:bg-zinc-800 text-white font-black px-10 py-4 rounded-xl shadow-xl transition-all inline-block">
                    Ir a la Bolsa de Contratos
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
