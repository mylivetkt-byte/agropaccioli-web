'use client';

import React, { useState } from 'react';
import { registrarProductor } from '@/app/actions/registro';
import { ShieldCheck, User, Phone, FileText, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function FormularioRegistroModal() {
  const searchParams = useSearchParams();
  const isRegistro = searchParams.get('registro') === 'true';
  const isExito = searchParams.get('registro_exito') === 'true';
  const isError = searchParams.get('error_registro') === 'existe';
  const [loading, setLoading] = useState(false);

  if (isExito) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-emerald-200">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-emerald-950 mb-2 text-center">¡Registro Recibido!</h2>
        <p className="text-zinc-600 mb-6 text-center max-w-sm">Tus documentos están siendo verificados por nuestro equipo. Te notificaremos cuando tu cuenta sea <strong className="text-emerald-700">Aprobada</strong> para que puedas publicar productos.</p>
        <Link href="/mapa-cosechas" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold">
          Entendido
        </Link>
      </div>
    );
  }

  if (!isRegistro && !isError) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-auto">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 p-4 text-white flex justify-between items-center sticky top-0 z-10">
          <h2 className="font-black text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Registro de Productor
          </h2>
          <Link href="/mapa-cosechas" className="text-emerald-100 hover:text-white font-bold bg-emerald-900/40 px-3 py-1 rounded-lg">
            X Cerrar
          </Link>
        </div>
        
        <form 
          action={async (formData) => {
            setLoading(true);
            await registrarProductor(formData);
          }} 
          className="p-6 space-y-4"
        >
          {isError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-200 mb-4">
              Ya existe un usuario registrado con esa Cédula o Teléfono.
            </div>
          )}
          
          <p className="text-xs text-zinc-500 mb-4">
            Para garantizar la seguridad de nuestra red, necesitamos validar tu identidad antes de permitirte vender productos.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">Nombre Completo (Como en la Cédula)</label>
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all">
                <User className="w-4 h-4 text-emerald-600" />
                <input name="nombre" required type="text" className="bg-transparent w-full text-sm outline-none" placeholder="Juan Pérez" />
              </div>
            </div>
            
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">Cédula de Ciudadanía</label>
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all">
                <FileText className="w-4 h-4 text-emerald-600" />
                <input name="cedula" required type="number" className="bg-transparent w-full text-sm outline-none" placeholder="1020304050" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">Celular / WhatsApp (Para enviarte el código)</label>
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all">
                <Phone className="w-4 h-4 text-emerald-600" />
                <input name="telefono" required type="tel" className="bg-transparent w-full text-sm outline-none" placeholder="3001234567" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">Foto de tu Cédula (Frontal)</label>
              <input type="file" required accept="image/*" className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
            </div>
          </div>

          <div className="flex items-start gap-2 mt-6 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
            <input type="checkbox" required name="aceptaPoliticas" id="aceptaPoliticasProductor" className="mt-1 w-4 h-4 text-emerald-600 rounded border-zinc-300" />
            <label htmlFor="aceptaPoliticasProductor" className="text-[10px] text-zinc-600 leading-tight">
              Autorizo de manera previa, expresa e informada a TODOSOFT (NIT 16.354.715-5) para recolectar y tratar mis datos personales con fines comerciales y de verificación, según lo establece la <Link href="/politicas-privacidad" target="_blank" className="text-emerald-700 font-bold underline">Política de Tratamiento de Datos Personales (Ley 1581 de 2012)</Link>.
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-emerald-800 hover:bg-emerald-900 text-white font-black py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? 'Enviando documentos...' : 'Enviar para Verificación'}
          </button>
        </form>
      </div>
    </div>
  );
}
