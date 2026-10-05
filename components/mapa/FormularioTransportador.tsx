'use client';

import React, { useState } from 'react';
import { registrarTransportador } from '@/app/actions/registro';
import { Truck, User, Phone, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FormularioTransportadorModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isRegistro = searchParams.get('registro_transportador') === 'true';
  const isExito = searchParams.get('registro_exito') === 'true';
  const isError = searchParams.get('error_registro') === 'existe';
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState('VEREDAL'); // Por defecto Veredal para campesinos


  if (isExito) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-sky-200 w-full max-w-sm">
        <CheckCircle2 className="w-16 h-16 text-sky-500 mb-4" />
        <h2 className="text-2xl font-black text-sky-950 mb-2 text-center">¡Solicitud Recibida!</h2>
        <p className="text-zinc-600 mb-6 text-center text-sm">
          Tus documentos logísticos (RNDC, SOAT, Licencia) están en revisión. Serás <strong className="text-sky-700">Aprobado</strong> pronto para transportar carga.
        </p>
        <Link href={pathname} className="bg-sky-600 text-white px-6 py-2 rounded-xl font-bold w-full text-center">
          Entendido
        </Link>
      </div>
    );
  }

  if (!isRegistro && !isError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-sky-950 to-sky-800 p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-black text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-300" />
              Registro de Transportador
            </h2>
            <p className="text-xs text-sky-200 mt-1 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Exigencia RNDC y Ministerio de Transporte
            </p>
          </div>
          <Link href={pathname} className="text-sky-200 hover:text-white font-bold bg-sky-900/50 px-3 py-1.5 rounded-xl transition-colors">
            X
          </Link>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-zinc-50/50">
          <form 
            action={async (formData) => {
              setLoading(true);
              await registrarTransportador(formData);
            }} 
            className="space-y-5"
          >
            <input type="hidden" name="pathname" value={pathname} />

            {isError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-200">
                Ya existe un conductor registrado con esa Cédula o Teléfono.
              </div>
            )}
            
            <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl">
              <label className="text-[10px] font-bold text-sky-900 block mb-2 uppercase tracking-wider">¿Qué tipo de rutas realizarás?</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setCategoria('VEREDAL')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${categoria === 'VEREDAL' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'}`}>Local / Veredal (Sin papeleo)</button>
                <button type="button" onClick={() => setCategoria('NACIONAL')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${categoria === 'NACIONAL' ? 'bg-sky-600 text-white border-sky-600 shadow-md' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'}`}>Nacional (Con Seguros y RNDC)</button>
              </div>
              <input type="hidden" name="categoriaTransporte" value={categoria} />
              {categoria === 'VEREDAL' && (
                <p className="text-[10px] text-emerald-800 mt-2 font-medium">✅ Solo podrás llevar cargas en trayectos cortos. Tu reputación dependerá 100% de las recomendaciones de los campesinos locales.</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-sky-900 uppercase tracking-wider border-b border-sky-100 pb-1">1. Datos del Conductor</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Nombre Completo</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-sky-500 transition-all shadow-sm">
                    <User className="w-4 h-4 text-sky-600" />
                    <input name="nombre" required type="text" className="bg-transparent w-full text-xs outline-none" placeholder="Pedro López" />
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Cédula</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-sky-500 transition-all shadow-sm">
                    <FileText className="w-4 h-4 text-sky-600" />
                    <input name="cedula" required type="number" className="bg-transparent w-full text-xs outline-none" placeholder="10203040" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Celular / WhatsApp</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-sky-500 transition-all shadow-sm">
                    <Phone className="w-4 h-4 text-sky-600" />
                    <input name="telefono" required type="tel" className="bg-transparent w-full text-xs outline-none" placeholder="3000000000" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">No. Licencia Conducción {categoria === 'VEREDAL' && '(Opcional)'}</label>
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-sky-500 transition-all shadow-sm">
                    <input name="licenciaConduccion" required={categoria === 'NACIONAL'} type="text" className="bg-transparent w-full text-xs outline-none" placeholder="000111222" />
                  </div>
                </div>
                
                {categoria === 'NACIONAL' && (
                  <div>
                    <label className="text-[10px] font-bold text-zinc-700 block mb-1">Foto Licencia (Frente y Reverso)</label>
                    <input name="fotoLicencia" type="file" required accept="image/*" className="block w-full text-[10px] text-zinc-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-bold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-sky-900 uppercase tracking-wider border-b border-sky-100 pb-1">2. Datos del Vehículo</h3>
                
                {categoria === 'VEREDAL' && (
                  <div>
                    <label className="text-[10px] font-bold text-zinc-700 block mb-1">Vereda o Zona donde opera</label>
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition-all shadow-sm">
                      <input name="zonaOperacion" required type="text" className="bg-transparent w-full text-xs font-bold outline-none text-emerald-900" placeholder="Ej: Vereda La Puerta, Aquitania" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Tipo de Vehículo</label>
                  <select name="tipoVehiculo" required className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-sky-500 shadow-sm">
                    <option value="">Selecciona el tipo...</option>
                    {categoria === 'VEREDAL' ? (
                      <>
                        <option value="Jeep Willys">Jeep Willys / Campero</option>
                        <option value="Chiva">Chiva / Mixto</option>
                        <option value="Tractor con Zorra">Tractor con Zorra</option>
                        <option value="Camioneta Estacas">Camioneta Pequeña (Estacas)</option>
                      </>
                    ) : (
                      <>
                        <option value="Furgón">Furgón</option>
                        <option value="Estacas">Estacas Grandes</option>
                        <option value="Refrigerado">Refrigerado</option>
                        <option value="Tractomula">Tractocamión</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-700 block mb-1">Placa del Vehículo {categoria === 'VEREDAL' && '(Opcional si no tiene)'}</label>
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 focus-within:border-sky-500 transition-all shadow-sm">
                    <input name="placaVehiculo" required={categoria === 'NACIONAL'} type="text" className="bg-transparent w-full text-xs font-black uppercase outline-none text-amber-900" placeholder="AAA-123" />
                  </div>
                </div>

                {categoria === 'VEREDAL' ? (
                  <div>
                    <label className="text-[10px] font-bold text-zinc-700 block mb-1">Foto de frente del vehículo (Para que lo reconozcan)</label>
                    <input name="fotoVehiculoFrontal" type="file" required accept="image/*" className="block w-full text-[10px] text-zinc-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-700 block mb-1">Resolución Min. Transporte</label>
                      <input name="resolucionMinTransporte" required type="text" className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-sky-500 shadow-sm" placeholder="Res. 0000 de 2024" />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-700 block mb-1">Póliza de Seguro de Carga</label>
                      <input name="polizaSeguroCarga" required type="text" className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-sky-500 shadow-sm" placeholder="SURA - Pol. 12345" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-700 block mb-1">Subir SOAT</label>
                        <input name="fotoSoat" type="file" required accept="image/*,.pdf" className="block w-full text-[9px] text-zinc-500 file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:font-bold file:bg-sky-50 file:text-sky-700" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-zinc-700 block mb-1">Subir Tecno.</label>
                        <input name="fotoTecnomecanica" type="file" required accept="image/*,.pdf" className="block w-full text-[9px] text-zinc-500 file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:font-bold file:bg-sky-50 file:text-sky-700" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mt-4">
              <p className="text-[11px] font-bold text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Importante:</strong> Para evitar fraudes logísticos, su perfil y vehículo quedarán en estado <strong>Pendiente de Auditoría</strong>. Nuestro equipo verificará sus pólizas, SOAT y Tecnomecánica con el Ministerio de Transporte antes de que pueda recibir contratos de carga en la plataforma.
                </span>
              </p>
            </div>

            <div className="flex items-start gap-2 mt-4 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <input type="checkbox" required name="aceptaPoliticas" id="aceptaPoliticasTransportador" className="mt-1 w-4 h-4 text-emerald-600 rounded border-zinc-300" />
              <label htmlFor="aceptaPoliticasTransportador" className="text-[10px] text-zinc-600 leading-tight">
                Autorizo de manera previa, expresa e informada a TODOSOFT (NIT 16.354.715-5) para recolectar y tratar mis datos personales con fines logísticos, comerciales y de verificación (RNDC), según lo establece la <Link href="/politicas-privacidad" target="_blank" className="text-sky-700 font-bold underline">Política de Tratamiento de Datos Personales (Ley 1581 de 2012)</Link>.
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
