'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { obtenerPanelProductor, cambiarEstadoCosecha, checkUsuarioStatus } from '@/app/actions/cosechas';
import { Layers, MapPin, CheckCircle2, XCircle, Calendar, MessageCircle, AlertCircle, Phone, Lock } from 'lucide-react';
import Link from 'next/link';
import FormularioCosechaIA from '@/components/mapa/FormularioCosechaIA';
import CalculadoraRentabilidad from '@/components/mapa/CalculadoraRentabilidad';

export default function MiEscaparatePage() {
  const [productorId, setProductorId] = useState('');
  const [productorNombre, setProductorNombre] = useState('');
  const [productorTelefono, setProductorTelefono] = useState('');
  const [cedulaInput, setCedulaInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  
  // 'login' | 'loading_auth' | 'otp' | 'dashboard'
  const [authStep, setAuthStep] = useState<'login' | 'loading_auth' | 'otp' | 'dashboard'>('login');
  const [authError, setAuthError] = useState('');

  const [cosechas, setCosechas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showIAForm, setShowIAForm] = useState(false);
  const [showCalcForm, setShowCalcForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedulaInput) return;

    setAuthStep('loading_auth');
    setAuthError('');

    try {
      const res = await checkUsuarioStatus(cedulaInput);
      if (res.status === 'APROBADO' && res.usuario) {
        setProductorId(res.usuario.id);
        setProductorNombre(res.usuario.nombre);
        setProductorTelefono(res.usuario.telefono);
        // En lugar de entrar directo, pasamos al paso del código OTP
        setAuthStep('otp');
      } else if (res.status === 'NO_EXISTE') {
        setAuthError('Cédula no registrada en el sistema.');
        setAuthStep('login');
      } else {
        setAuthError('Tu cuenta está pendiente de revisión.');
        setAuthStep('login');
      }
    } catch (err) {
      setAuthError('Error de conexión.');
      setAuthStep('login');
    }
  };

  const handleVerificarOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos que el código correcto es 1234 para propósitos de prueba
    if (otpInput === '1234') {
      setAuthStep('dashboard');
      fetchCosechas(productorId);
    } else {
      setAuthError('Código incorrecto. Intenta de nuevo.');
    }
  };

  const fetchCosechas = async (id: string) => {
    setLoading(true);
    const res = await obtenerPanelProductor(id);
    if (res.success && res.cosechas) {
      setCosechas(res.cosechas);
    } else {
      setError('No pudimos cargar tus cosechas. Verifica tu conexión.');
    }
    setLoading(false);
  };

  const handleCambiarEstado = async (id: string, estado: string) => {
    if (!confirm(`¿Estás seguro de marcar este producto como ${estado}?`)) return;
    
    setLoading(true);
    const res = await cambiarEstadoCosecha(id, estado);
    if (res.success) {
      setCosechas(prev => prev.map(c => c.id === id ? { ...c, estado } : c));
    } else {
      alert('Hubo un problema actualizando el estado.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        
        {authStep === 'login' || authStep === 'loading_auth' ? (
          <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-emerald-950 mb-2">Mi Escaparate</h1>
            <p className="text-zinc-500 text-sm mb-6">
              Ingresa tu cédula registrada para ver los compradores interesados en tus productos.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Número de Cédula o NIT"
                value={cedulaInput}
                onChange={(e) => setCedulaInput(e.target.value)}
                className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-center font-bold text-lg"
                required
              />
              {authError && <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg font-bold">{authError}</p>}
              
              <button 
                type="submit" 
                disabled={authStep === 'loading_auth' || !cedulaInput}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition-all disabled:opacity-50"
              >
                {authStep === 'loading_auth' ? 'Verificando...' : 'Acceder al Panel'}
              </button>
              
              <div className="pt-2">
                <Link href="/" className="text-xs text-zinc-500 hover:text-emerald-700 font-bold underline transition-colors">
                  ← Volver al Inicio
                </Link>
              </div>
            </form>
          </div>
        ) : authStep === 'otp' ? (
          <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-emerald-950 mb-2">Verificación WhatsApp</h1>
            <p className="text-zinc-500 text-sm mb-6">
              Hemos enviado un código de 4 dígitos a tu WhatsApp terminado en <strong>...{productorTelefono.slice(-4)}</strong>.
            </p>

            <form onSubmit={handleVerificarOTP} className="space-y-4">
              <input
                type="text"
                placeholder="Ej: 1234"
                maxLength={4}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-center font-black text-2xl tracking-widest"
                required
              />
              <p className="text-[10px] text-zinc-400 font-bold uppercase">(Para esta prueba, el código mágico es 1234)</p>
              
              {authError && <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg font-bold">{authError}</p>}
              
              <button 
                type="submit" 
                disabled={otpInput.length < 4}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3 rounded-xl transition-all disabled:opacity-50"
              >
                Confirmar Código
              </button>
              
              <button type="button" onClick={() => setAuthStep('login')} className="text-xs text-zinc-500 underline mt-4 font-bold">
                Volver
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 flex items-center gap-2">
                  <Layers className="text-emerald-600" />
                  Escaparate de {productorNombre}
                </h1>
                <p className="text-emerald-700/80 font-medium text-sm mt-1">
                  Revisa quién quiere comprarte y cierra negocios rápido.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                <button 
                  onClick={() => setShowCalcForm(true)}
                  className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black px-4 py-2 rounded-lg border border-sky-200 shadow-sm flex items-center gap-2 transition-all"
                >
                  🧮 Calculadora AgroIA
                </button>
                <button 
                  onClick={() => setShowIAForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
                >
                  ✨ Nueva Cosecha (IA)
                </button>
                <button 
                  onClick={() => setAuthStep('login')}
                  className="text-xs text-zinc-500 hover:text-zinc-800 font-bold underline"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold flex items-center gap-2 mb-6">
                <AlertCircle /> {error}
              </div>
            )}

            {loading && <p className="text-emerald-600 font-bold animate-pulse text-center my-10">Actualizando tus datos...</p>}

            {!loading && cosechas.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-emerald-100 shadow-sm">
                <Layers className="w-16 h-16 text-emerald-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-emerald-900">Aún no tienes productos publicados</h3>
                <p className="text-zinc-500 mt-2">Publica tu primer producto en el mapa para empezar a recibir ofertas.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <button 
                    onClick={() => setShowIAForm(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                  >
                    ✨ Publicar Rápido con IA
                  </button>
                  <Link href="/mapa-cosechas?publicar=true" className="text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all border border-emerald-100">
                    Publicación Manual
                  </Link>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {cosechas.map((cosecha) => (
                <div key={cosecha.id} className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
                  <div className="bg-emerald-950 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          cosecha.estado === 'disponible' ? 'bg-emerald-500 text-emerald-950' : 
                          cosecha.estado === 'vendido' ? 'bg-amber-400 text-amber-950' : 'bg-red-500 text-white'
                        }`}>
                          {cosecha.estado}
                        </span>
                        <span className="text-[10px] text-emerald-300 font-bold tracking-wider">{cosecha.sector}</span>
                      </div>
                      <h2 className="text-xl font-black">{cosecha.titulo}</h2>
                      <p className="text-emerald-200 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {cosecha.municipio}, {cosecha.departamento}
                      </p>
                    </div>
                    
                    <div className="text-left md:text-right">
                      <p className="text-emerald-100 text-xs">Precio Base</p>
                      <p className="text-2xl font-black text-emerald-400">${cosecha.precio.toLocaleString()} <span className="text-sm">COP/{cosecha.unidad}</span></p>
                      <p className="text-emerald-200 text-xs mt-1">Disp: {cosecha.cantidadDisponible} {cosecha.unidad}</p>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col lg:flex-row gap-6">
                    {/* Consultas Recibidas */}
                    <div className="flex-1">
                      <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-4 border-b border-zinc-100 pb-2">
                        <MessageCircle className="text-emerald-500 w-5 h-5" /> 
                        Grilla de Compradores Interesados ({cosecha.consultas?.length || 0})
                      </h3>
                      
                      {cosecha.consultas?.length === 0 ? (
                        <p className="text-sm text-zinc-400 italic bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                          Todavía no hay interesados en este producto.
                        </p>
                      ) : (
                        <div className="grid gap-3">
                          {cosecha.consultas?.map((consulta: any) => (
                            <div key={consulta.id} className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <p className="font-black text-emerald-950 text-sm">{consulta.compradorNombre}</p>
                                <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 mt-1">
                                  <Calendar className="w-3 h-3" /> Contactó el {new Date(consulta.fechaConsulta).toLocaleDateString()}
                                </span>
                              </div>
                              <a 
                                href={`https://wa.me/${consulta.compradorTelefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${consulta.compradorNombre}, vi que estabas interesado en mi lote de ${cosecha.titulo} en AGROPACCIOLI.`)}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#20bd5a] flex items-center gap-2 shadow-sm whitespace-nowrap justify-center"
                              >
                                <Phone className="w-3.5 h-3.5" /> WhatsApp: {consulta.compradorTelefono}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Acciones Rápidas */}
                    <div className="w-full lg:w-72 shrink-0 bg-zinc-50 p-5 rounded-2xl border border-zinc-200 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-emerald-900 mb-2 text-sm">Cierre de Negocio</h3>
                        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                          Si ya cerraste trato con algún comprador por WhatsApp, retira el producto del mapa para no recibir más contactos.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {cosecha.estado !== 'vendido' && (
                          <button 
                            onClick={() => handleCambiarEstado(cosecha.id, 'vendido')}
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                          >
                            <CheckCircle2 className="w-5 h-5" /> ¡Marcar como Vendido!
                          </button>
                        )}
                        
                        {cosecha.estado !== 'cancelado' && (
                          <button 
                            onClick={() => handleCambiarEstado(cosecha.id, 'cancelado')}
                            disabled={loading}
                            className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <XCircle className="w-4 h-4" /> Cancelar Publicación
                          </button>
                        )}
                        
                        {cosecha.estado !== 'disponible' && (
                          <button 
                            onClick={() => handleCambiarEstado(cosecha.id, 'disponible')}
                            disabled={loading}
                            className="w-full bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-2.5 rounded-xl transition-all text-sm mt-4"
                          >
                            Volver a publicar
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {showIAForm && <FormularioCosechaIA onClose={() => setShowIAForm(false)} />}
        {showCalcForm && <CalculadoraRentabilidad onClose={() => setShowCalcForm(false)} />}
      </main>

      <Footer />
    </div>
  );
}
