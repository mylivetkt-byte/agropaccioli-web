'use client';
import React, { useState } from 'react';

import { registrarComprador } from '@/app/actions/registro';
import { ShieldCheck, User, Phone, FileText, CheckCircle2, Building, Briefcase } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FormularioCompradorModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isRegistro = searchParams.get('registro_comprador') === 'true';
  const isExito = searchParams.get('registro_exito_comprador') === 'true';
  const isError = searchParams.get('error_registro_comprador') === 'existe';
  const [loading, setLoading] = useState(false);

  if (isExito) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-emerald-200 w-full max-w-sm">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-emerald-950 mb-2 text-center">¡Verificación SARLAFT Iniciada!</h2>
        <p className="text-zinc-600 mb-6 text-center text-sm">
          Tus documentos están siendo analizados en centrales de riesgo. Serás notificado cuando tu perfil B2B sea <strong className="text-emerald-700">Aprobado</strong>.
        </p>
        <Link href={pathname} className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold w-full text-center">
          Entendido
        </Link>
      </div>
    );
  }

  if (!isRegistro && !isError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-800 p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-black text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              Registro de Comprador B2B
            </h2>
            <p className="text-xs text-emerald-200 mt-1 flex items-center gap-1">
              Validación KYC / SARLAFT Obligatoria
            </p>
          </div>
          <Link href={pathname} className="text-emerald-200 hover:text-white font-bold bg-emerald-900/50 px-3 py-1.5 rounded-xl transition-colors">
            X
          </Link>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-zinc-50/50">
          <form 
            action={async (formData) => {
              setLoading(true);
              await registrarComprador(formData);
            }} 
            className="space-y-5"
          >
            <input type="hidden" name="pathname" value={pathname} />

            {isError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-200">
                Ya existe un comprador registrado con esa Cédula o Teléfono.
              </div>
            )}
            
            <p className="text-xs text-zinc-500 mb-4 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
              Para garantizar negocios seguros, necesitamos validar el origen de los fondos de nuestros compradores institucionales.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-700 block mb-1">Nombre Completo del Representante</label>
                <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all shadow-sm">
                  <User className="w-4 h-4 text-emerald-600" />
                  <input name="nombre" required type="text" className="bg-transparent w-full text-xs outline-none" placeholder="Nombre completo" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Cédula Representante</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all shadow-sm">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <input name="cedula" required type="number" className="bg-transparent w-full text-xs outline-none" placeholder="Cédula" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Celular / WhatsApp</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all shadow-sm">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <input name="telefono" required type="tel" className="bg-transparent w-full text-xs outline-none" placeholder="Celular" />
                  </div>
                </div>
              </div>

              <hr className="border-zinc-200" />
              
              <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wider">Datos de la Empresa / Persona Natural</h3>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Tipo Doc.</label>
                  <select name="tipoDocumento" required className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 shadow-sm">
                    <option value="NIT">NIT</option>
                    <option value="CC">CC</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Número de Documento (NIT o CC)</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all shadow-sm">
                    <Building className="w-4 h-4 text-emerald-600" />
                    <input name="numeroDocumento" required type="text" className="bg-transparent w-full text-xs outline-none" placeholder="900.123.456-7" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-700 block mb-1">Subir RUT Actualizado (PDF)</label>
                <input type="file" required accept=".pdf,image/*" className="block w-full text-[10px] text-zinc-500 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-700 block mb-1">Cámara de Comercio (Menor a 30 días)</label>
                <input type="file" required accept=".pdf,image/*" className="block w-full text-[10px] text-zinc-500 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mt-4">
              <p className="text-[11px] font-bold text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Atención:</strong> Agropaccioli es una plataforma verificada. El envío de este formulario NO habilita inmediatamente su cuenta. Nuestro equipo de cumplimiento auditará sus documentos (Cámara de Comercio y RUT) en listas restrictivas antes de darle permisos para operar.
                </span>
              </p>
            </div>

            <div className="flex items-start gap-2 mt-4 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <input type="checkbox" required name="aceptaPoliticas" id="aceptaPoliticasComprador" className="mt-1 w-4 h-4 text-emerald-600 rounded border-zinc-300" />
              <label htmlFor="aceptaPoliticasComprador" className="text-[10px] text-zinc-600 leading-tight">
                Autorizo de manera previa, expresa e informada a TODOSOFT (NIT 16.354.715-5) para recolectar y tratar mis datos personales con fines comerciales y de verificación, según lo establece la <Link href="/politicas-privacidad" target="_blank" className="text-emerald-700 font-bold underline">Política de Tratamiento de Datos Personales (Ley 1581 de 2012)</Link>.
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
              <Link 
                href={pathname}
                className="w-full sm:w-1/3 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold py-4 rounded-xl shadow-sm transition-all flex justify-center items-center text-center text-sm"
              >
                Cancelar
              </Link>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2 text-center text-sm"
              >
                {loading ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
