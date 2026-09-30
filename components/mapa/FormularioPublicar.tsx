'use client';

import React, { useState } from 'react';
import { publicarCosecha, checkUsuarioStatus } from '@/app/actions/cosechas';
import { registrarProductor } from '@/app/actions/registro';
import { Sprout, MapPin, DollarSign, User, Phone, CheckCircle2, Calendar, Truck, Box, FileText, ArrowRight, ShieldCheck, AlertTriangle, Compass } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import colombiaData from '@/lib/colombia.json';
import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function FormularioPublicarModal() {
  const searchParams = useSearchParams();
  const isPublicar = searchParams.get('publicar') === 'true';
  const isExitoPublicacion = searchParams.get('exito') === 'true';
  const isExitoRegistro = searchParams.get('registro_exito') === 'true';

  const [step, setStep] = useState<'CEDULA' | 'REGISTRO' | 'BLOQUEADO' | 'PUBLICAR'>('CEDULA');
  const [loading, setLoading] = useState(false);
  const [cedula, setCedula] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');

  // Location States
  const [dept, setDept] = useState('Antioquia');
  const [mun, setMun] = useState('Medellín');
  const [vereda, setVereda] = useState('');
  const [lat, setLat] = useState<number>(6.2442);
  const [lng, setLng] = useState<number>(-75.5812);

  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  const departamentos = colombiaData.map(d => d.departamento).sort();
  const ciudadesDelDepto = colombiaData.find(d => d.departamento === dept)?.ciudades.sort() || [];

  // Init mini map when step is PUBLICAR
  useEffect(() => {
    if (step === 'PUBLICAR' && mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', // Satellite
        center: [lng, lat],
        zoom: 12
      });

      const marker = new maplibregl.Marker({ draggable: true, color: '#10b981' })
        .setLngLat([lng, lat])
        .addTo(map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLng(lngLat.lng);
        setLat(lngLat.lat);
      });

      markerRef.current = marker;

      return () => map.remove();
    }
  }, [step]);

  const handleVerificarCedula = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await checkUsuarioStatus(cedula);
    setLoading(false);

    if (res.status === 'NO_EXISTE') {
      setStep('REGISTRO');
    } else if (res.status === 'PENDIENTE') {
      setNombreUsuario(res.nombre || 'Productor');
      setStep('BLOQUEADO');
    } else if (res.status === 'APROBADO' && res.usuario) {
      setNombreUsuario(res.usuario.nombre);
      setStep('PUBLICAR');
    }
  };

  if (isExitoPublicacion) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-emerald-200">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-emerald-950 mb-2">¡Producto Publicado!</h2>
        <p className="text-zinc-600 mb-6 text-center">Tus datos se han guardado exitosamente en la plataforma.</p>
        <Link href="/mapa-cosechas" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold">
          Volver al Mapa
        </Link>
      </div>
    );
  }

  if (isExitoRegistro) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-emerald-200">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-emerald-950 mb-2 text-center">¡Registro Exitoso!</h2>
        <p className="text-zinc-600 mb-6 text-center max-w-sm">
          Tus documentos están en revisión. Te notificaremos cuando tu cuenta esté <strong className="text-emerald-700">Aprobada</strong> para que puedas publicar productos.
        </p>
        <Link href="/mapa-cosechas" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold">
          Entendido
        </Link>
      </div>
    );
  }

  if (!isPublicar) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-auto">
        <div className="bg-gradient-to-r from-emerald-800 to-green-600 p-4 text-white flex justify-between items-center sticky top-0 z-10">
          <h2 className="font-black text-lg flex items-center gap-2">
            <Sprout className="w-5 h-5" />
            {step === 'CEDULA' ? 'Identificación' : step === 'REGISTRO' ? 'Registro de Productor' : 'Publicar Producto'}
          </h2>
          <Link href="/mapa-cosechas" className="text-emerald-100 hover:text-white font-bold bg-emerald-900/40 px-3 py-1 rounded-lg">
            X Cerrar
          </Link>
        </div>
        
        {/* PASO 1: PEDIR CEDULA */}
        {step === 'CEDULA' && (
          <form onSubmit={handleVerificarCedula} className="p-6 space-y-5">
            <div className="text-center mb-6">
              <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-lg font-black text-emerald-950">Seguridad AGROPACCIOLI</h3>
              <p className="text-sm text-zinc-500 mt-2">
                Para publicar un producto debes ser un usuario verificado de la red. Por favor ingresa tu cédula para continuar.
              </p>
            </div>
            
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">Cédula de Ciudadanía</label>
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-3 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                <FileText className="w-5 h-5 text-emerald-600" />
                <input 
                  required 
                  type="number" 
                  value={cedula}
                  onChange={e => setCedula(e.target.value)}
                  className="bg-transparent w-full text-base outline-none" 
                  placeholder="Ej. 1020304050" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || !cedula}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? 'Verificando...' : 'Siguiente'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* PASO 2: SI NO EXISTE, MOSTRAR REGISTRO */}
        {step === 'REGISTRO' && (
          <form action={async (fd) => { setLoading(true); await registrarProductor(fd); }} className="p-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs font-bold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>No encontramos tu cédula en el sistema. Debes registrarte y verificar tu identidad antes de publicar.</span>
            </div>

            <input type="hidden" name="cedula" value={cedula} />

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">Nombre Completo</label>
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <input name="nombre" required type="text" className="bg-transparent w-full text-sm outline-none" placeholder="Juan Pérez" />
                </div>
              </div>
              
              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">Celular / WhatsApp</label>
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <input name="telefono" required type="tel" className="bg-transparent w-full text-sm outline-none" placeholder="3001234567" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">Foto de tu Cédula (Frontal)</label>
                <input type="file" required accept="image/*" className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-black py-3 rounded-xl transition-all">
              {loading ? 'Enviando...' : 'Enviar Registro'}
            </button>
          </form>
        )}

        {/* PASO 3: SI EXISTE PERO ESTA PENDIENTE */}
        {step === 'BLOQUEADO' && (
          <div className="p-8 text-center space-y-4">
            <ShieldCheck className="w-16 h-16 text-amber-500 mx-auto" />
            <h3 className="text-xl font-black text-emerald-950">¡Hola {nombreUsuario}!</h3>
            <p className="text-zinc-600 text-sm">
              Tu cuenta con cédula <strong>{cedula}</strong> se encuentra en estado <strong>PENDIENTE</strong> de verificación. 
              Un administrador de Agropaccioli está revisando tus documentos.
            </p>
            <Link href="/mapa-cosechas" className="mt-4 block bg-zinc-100 text-zinc-700 px-6 py-3 rounded-xl font-bold">
              Volver al inicio
            </Link>
          </div>
        )}

        {/* PASO 4: SI ESTÁ APROBADO -> FORMULARIO REAL DE PUBLICAR */}
        {step === 'PUBLICAR' && (
          <form 
            action={async (formData) => {
              setLoading(true);
              formData.append('cedula', cedula);
              await publicarCosecha(formData);
            }} 
            className="p-6 space-y-5 max-h-[80vh] overflow-y-auto"
          >
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="block font-bold">Hola, {nombreUsuario}</span>
                <span className="text-[10px]">Cuenta Verificada ✓</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>

            {/* SECCIÓN 2: DETALLES DEL PRODUCTO */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase text-emerald-800 border-b border-emerald-100 pb-1">Detalles del Producto</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Sector</label>
                  <select name="sector" className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 w-full text-sm outline-none">
                    <option value="agricola">🟢 Agrícola (Frutas, Verduras)</option>
                    <option value="ganadero">🟠 Ganadero (Bovinos, Cerdos)</option>
                    <option value="acuicola">🔵 Acuícola (Peces, Mariscos)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">¿Qué vendes?</label>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <input name="producto" required type="text" className="bg-transparent w-full text-sm outline-none" placeholder="Ej. Trucha, Novillos, Aguacate" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Cantidad</label>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                    <Box className="w-4 h-4 text-emerald-600" />
                    <input name="cantidad" required type="number" min="1" className="bg-transparent w-full text-sm outline-none" placeholder="500" />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Unidad</label>
                  <select name="unidad" className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 w-full text-sm outline-none">
                    <option value="kg">Kilogramos</option>
                    <option value="ton">Toneladas</option>
                    <option value="arrobas">Arrobas</option>
                    <option value="cabezas">Cabezas (Animales)</option>
                    <option value="litros">Litros</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Precio / Unidad</label>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-2 py-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <input name="precio" required type="number" className="bg-transparent w-full text-sm outline-none" placeholder="4500" />
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: LOGÍSTICA Y UBICACIÓN GPS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase text-emerald-800 border-b border-emerald-100 pb-1">Ubicación de la Finca</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Departamento</label>
                  <select 
                    name="departamento" 
                    value={dept} 
                    onChange={(e) => {
                      setDept(e.target.value);
                      const ciudades = colombiaData.find(d => d.departamento === e.target.value)?.ciudades.sort() || [];
                      setMun(ciudades[0] || '');
                    }}
                    className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 w-full text-sm outline-none"
                  >
                    {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Municipio</label>
                  <select 
                    name="municipio" 
                    value={mun}
                    onChange={(e) => setMun(e.target.value)}
                    className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 w-full text-sm outline-none"
                  >
                    {ciudadesDelDepto.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">Nombre de la Vereda / Finca</label>
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <input name="vereda" value={vereda} onChange={e => setVereda(e.target.value)} type="text" className="bg-transparent w-full text-sm outline-none" placeholder="Ej. Vereda Sabaletas, Finca El Recuerdo" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">📍 Ubica el Pin Exacto (GPS)</label>
                <div className="w-full h-40 rounded-xl border border-emerald-200 overflow-hidden relative">
                  <div ref={mapContainer} className="w-full h-full" />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">Arrastra el pin verde 📍</div>
                </div>
              </div>

              {/* Campos Ocultos para enviar las coordenadas y la "ubicacion" string legacy */}
              <input type="hidden" name="latitud" value={lat} />
              <input type="hidden" name="longitud" value={lng} />
              <input type="hidden" name="ubicacion" value={`${mun}, ${dept}`} />

              <h3 className="text-xs font-black uppercase text-emerald-800 border-b border-emerald-100 pb-1 mt-4">Entrega</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Fecha Disponibilidad</label>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <input name="fechaRecoleccion" required type="date" className="bg-transparent w-full text-sm outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">Tiempo de Transporte</label>
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <select name="tiempoTransporte" className="bg-transparent w-full text-sm outline-none">
                      <option value="Entrega Inmediata">Inmediato</option>
                      <option value="1 a 2 días">1 - 2 días</option>
                      <option value="3 a 5 días">3 - 5 días</option>
                      <option value="El comprador recoge">El comprador recoge</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(5,150,105,0.6)] transition-all disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? 'Guardando en BD...' : 'Publicar Producto Ahora'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
