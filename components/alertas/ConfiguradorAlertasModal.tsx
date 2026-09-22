'use client';

import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Sliders,
  Mail,
  Smartphone,
  Sparkles,
  TrendingUp,
  MapPin,
  Clock,
  Briefcase,
  ShieldCheck,
  Send,
  X,
  Flame,
  ArrowRight,
  Info
} from 'lucide-react';
import { PreferenciaAlertas, RolAlerta } from '@/types/agro';
import { PREFERENCIAS_ALERTAS_DEFAULT } from '@/lib/agro-data';

interface ConfiguradorAlertasProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export default function ConfiguradorAlertasModal({
  isOpen = true,
  onClose,
  isStandalonePage = false
}: ConfiguradorAlertasProps) {
  const [preferencias, setPreferencias] = useState<PreferenciaAlertas>(PREFERENCIAS_ALERTAS_DEFAULT);
  const [rolActivo, setRolActivo] = useState<RolAlerta>(preferencias.rolPrincipal);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [alertaSimuladaEnviada, setAlertaSimuladaEnviada] = useState(false);

  if (!isOpen && !isStandalonePage) return null;

  const handleToggleCanal = (canal: 'inApp' | 'email' | 'whatsapp') => {
    setPreferencias(prev => ({
      ...prev,
      canales: {
        ...prev.canales,
        [canal]: !prev.canales[canal]
      }
    }));
  };

  const handleToggleComprador = (key: keyof PreferenciaAlertas['compradorFiltros']) => {
    if (key === 'regionesInteres') return;
    setPreferencias(prev => ({
      ...prev,
      compradorFiltros: {
        ...prev.compradorFiltros,
        [key]: !prev.compradorFiltros[key]
      }
    }));
  };

  const handleToggleProductor = (key: keyof PreferenciaAlertas['productorFiltros']) => {
    setPreferencias(prev => ({
      ...prev,
      productorFiltros: {
        ...prev.productorFiltros,
        [key]: !prev.productorFiltros[key]
      }
    }));
  };

  const handleToggleEmpleo = (key: keyof PreferenciaAlertas['empleoFiltros']) => {
    if (key === 'departamentosInteres') return;
    setPreferencias(prev => ({
      ...prev,
      empleoFiltros: {
        ...prev.empleoFiltros,
        [key]: !prev.empleoFiltros[key]
      }
    }));
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardadoExitoso(true);
    setTimeout(() => {
      setGuardadoExitoso(false);
      if (onClose) onClose();
    }, 1800);
  };

  const handleEnviarAlertaSimulada = () => {
    setAlertaSimuladaEnviada(true);
    setTimeout(() => setAlertaSimuladaEnviada(false), 4000);
  };

  const bodyContent = (
    <div className="space-y-6">
      {/* Selector de Rol */}
      <div>
        <label className="block text-xs font-black uppercase text-zinc-500 mb-2">
          1. Selecciona tu Perfil de Interés
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => { setRolActivo('comprador'); setPreferencias(p => ({ ...p, rolPrincipal: 'comprador' })); }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              rolActivo === 'comprador'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400/30'
                : 'bg-white hover:bg-emerald-50 text-zinc-700 border-zinc-200'
            }`}
          >
            <div className="text-sm font-black">🛒 Comprador</div>
            <div className={`text-[11px] mt-0.5 ${rolActivo === 'comprador' ? 'text-emerald-100' : 'text-zinc-500'}`}>
              Cosechas & Lotes
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setRolActivo('productor'); setPreferencias(p => ({ ...p, rolPrincipal: 'productor' })); }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              rolActivo === 'productor'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400/30'
                : 'bg-white hover:bg-emerald-50 text-zinc-700 border-zinc-200'
            }`}
          >
            <div className="text-sm font-black">🌾 Productor</div>
            <div className={`text-[11px] mt-0.5 ${rolActivo === 'productor' ? 'text-emerald-100' : 'text-zinc-500'}`}>
              Precios, TRM & Clima
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setRolActivo('buscador_empleo'); setPreferencias(p => ({ ...p, rolPrincipal: 'buscador_empleo' })); }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              rolActivo === 'buscador_empleo'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400/30'
                : 'bg-white hover:bg-emerald-50 text-zinc-700 border-zinc-200'
            }`}
          >
            <div className="text-sm font-black">👷 Buscador Empleo</div>
            <div className={`text-[11px] mt-0.5 ${rolActivo === 'buscador_empleo' ? 'text-emerald-100' : 'text-zinc-500'}`}>
              Cosechas & Fincas
            </div>
          </button>
        </div>
      </div>

      {/* Canales de Notificación */}
      <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
        <label className="block text-xs font-black uppercase text-emerald-950 mb-2">
          2. ¿Por cuáles canales deseas que te avisemos?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => handleToggleCanal('inApp')}
            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
              preferencias.canales.inApp ? 'bg-white border-emerald-500 shadow-xs' : 'bg-zinc-50 border-zinc-200 opacity-60'
            }`}
          >
            <div className={`p-2 rounded-lg ${preferencias.canales.inApp ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">🔔 En Plataforma</div>
              <div className="text-[10px] text-zinc-500">Inmediato en tiempo real</div>
            </div>
          </div>

          <div
            onClick={() => handleToggleCanal('email')}
            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
              preferencias.canales.email ? 'bg-white border-emerald-500 shadow-xs' : 'bg-zinc-50 border-zinc-200 opacity-60'
            }`}
          >
            <div className={`p-2 rounded-lg ${preferencias.canales.email ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">📧 Correo Diario</div>
              <div className="text-[10px] text-zinc-500">Resumen de tendencias</div>
            </div>
          </div>

          <div
            onClick={() => handleToggleCanal('whatsapp')}
            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
              preferencias.canales.whatsapp ? 'bg-white border-emerald-500 shadow-xs' : 'bg-zinc-50 border-zinc-200 opacity-60'
            }`}
          >
            <div className={`p-2 rounded-lg ${preferencias.canales.whatsapp ? 'bg-green-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">📱 WhatsApp Prioritario</div>
              <div className="text-[10px] text-zinc-500">Alertas urgentes y precios</div>
            </div>
          </div>
        </div>

        {/* Inputs de contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-emerald-200/60">
          <div>
            <label className="text-[10px] font-bold text-zinc-600">Número de WhatsApp para Alertas:</label>
            <input
              type="text"
              value={preferencias.canales.telefonoWhatsapp || ''}
              onChange={(e) => setPreferencias(p => ({ ...p, canales: { ...p.canales, telefonoWhatsapp: e.target.value } }))}
              placeholder="+57 312 456 7890"
              className="mt-1 w-full text-xs font-mono px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-600">Correo Electrónico:</label>
            <input
              type="email"
              value={preferencias.canales.emailDestino || ''}
              onChange={(e) => setPreferencias(p => ({ ...p, canales: { ...p.canales, emailDestino: e.target.value } }))}
              placeholder="tuemail@finca.com"
              className="mt-1 w-full text-xs px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Reglas Específicas según Rol */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>3. Define tus Reglas "Avísame cuando..."</span>
          </h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
            {rolActivo === 'comprador' ? 'Modo Comprador' : rolActivo === 'productor' ? 'Modo Productor' : 'Modo Laboral'}
          </span>
        </div>

        {rolActivo === 'comprador' && (
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.compradorFiltros.aguacateHass}
                onChange={() => handleToggleComprador('aguacateHass')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🥑 Aguacate Hass de Exportación</span>
                <p className="text-[11px] text-zinc-500">Antioquia / Caldas / Tolima — calibres 14 al 22</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.compradorFiltros.cafeEspecial}
                onChange={() => handleToggleComprador('cafeEspecial')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">☕ Café Especial & Micro-lotes</span>
                <p className="text-[11px] text-zinc-500">Huila / Eje Cafetero / Cauca — taza {'>'} 85 SCA</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.compradorFiltros.papaParamo}
                onChange={() => handleToggleComprador('papaParamo')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🥔 Papa Criolla & Pastusa de Páramo</span>
                <p className="text-[11px] text-zinc-500">Boyacá / Cundinamarca — lavada de primera</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.compradorFiltros.cacaoFino}
                onChange={() => handleToggleComprador('cacaoFino')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🍫 Cacao Fino y de Aroma</span>
                <p className="text-[11px] text-zinc-500">Santander / Arauca / Huila</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.compradorFiltros.trmVariacion2Porciento}
                onChange={() => handleToggleComprador('trmVariacion2Porciento')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">💰 Variación de la TRM cambie ±2% en 24h</span>
                <p className="text-[11px] text-zinc-500">Alerta cambiaria para compras internacionales y fijación de futuros</p>
              </div>
            </label>
          </div>
        )}

        {rolActivo === 'productor' && (
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.productorFiltros.cafeVariacion3Porciento}
                onChange={() => handleToggleProductor('cafeVariacion3Porciento')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">📈 Precio del Café suba o baje más del 3%</span>
                <p className="text-[11px] text-zinc-500">Aviso oportuno para fijar precio con cooperativa o exportador</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.productorFiltros.precioDaneSipsaCambie}
                onChange={() => handleToggleProductor('precioDaneSipsaCambie')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">📊 Boletín Oficial SIPSA / DANE de mis cosechas</span>
                <p className="text-[11px] text-zinc-500">Actualización diaria a las 06:00 AM desde centrales mayoristas</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.productorFiltros.notificarCompradoresBuscandoMiCosecha}
                onChange={() => handleToggleProductor('notificarCompradoresBuscandoMiCosecha')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🎯 Se publiquen Compradores buscando mi producto</span>
                <p className="text-[11px] text-zinc-500">Emparejamiento automático por municipio y volumen requerido</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.productorFiltros.nuevaOfertaTransporteEnRegion}
                onChange={() => handleToggleProductor('nuevaOfertaTransporteEnRegion')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🚚 Nuevo Camión o Furgón disponible cerca a mi finca</span>
                <p className="text-[11px] text-zinc-500">Notificación inmediata de transportistas con cupo de retorno económico</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.productorFiltros.alertaClimaFinca}
                onChange={() => handleToggleProductor('alertaClimaFinca')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🌦️ Alerta Agroclimática de Heladas o Lluvias Fuertes</span>
                <p className="text-[11px] text-zinc-500">Pronóstico IDEAM con 72 horas de anticipación</p>
              </div>
            </label>
          </div>
        )}

        {rolActivo === 'buscador_empleo' && (
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.empleoFiltros.recoleccionValle}
                onChange={() => handleToggleEmpleo('recoleccionValle')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🌿 Recolección de Cosechas en Valle y Eje Cafetero</span>
                <p className="text-[11px] text-zinc-500">Jornales y contratos por temporada</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.empleoFiltros.aguacateCaldas}
                onChange={() => handleToggleEmpleo('aguacateCaldas')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🥑 Cuadrillas de Corte de Aguacate Hass</span>
                <p className="text-[11px] text-zinc-500">Antioquia, Caldas y Tolima con transporte veredal</p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer border border-zinc-100 transition-colors">
              <input
                type="checkbox"
                checked={preferencias.empleoFiltros.conAlojamiento}
                onChange={() => handleToggleEmpleo('conAlojamiento')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold text-zinc-900">🏡 Solo vacantes con Vivienda / Alojamiento en Finca</span>
                <p className="text-[11px] text-zinc-500">Filtra automáticamente ofertas que ofrecen cuartel o casa mayordomo</p>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Simulador de Alerta Interactiva WhatsApp */}
      <div className="bg-zinc-900 text-white p-4 rounded-2xl shadow-xl relative overflow-hidden border border-zinc-700">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-xs font-black text-green-400 uppercase tracking-wide">
              Vista Previa Alerta WhatsApp en Tiempo Real
            </span>
          </div>
          <button
            type="button"
            onClick={handleEnviarAlertaSimulada}
            className="text-[11px] font-bold bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
          >
            <Send className="w-3 h-3" />
            <span>Simular Envío</span>
          </button>
        </div>

        <div className="bg-zinc-800/90 rounded-xl p-3 text-xs font-sans border border-zinc-700 text-zinc-200">
          <div className="text-green-400 font-bold">🥑 NUEVO LOTE DISPONIBLE EN ANTIOQUIA</div>
          <p className="mt-1 font-semibold text-white">Aguacate Hass — Sonsón, Antioquia</p>
          <p className="text-zinc-300 text-[11px]">📦 28 Toneladas · $5.200/Kg · Calibre 14-22</p>
          <p className="text-zinc-400 text-[10px] mt-0.5">⏰ Publicado hoy a las 09:15 AM · Quedan 3 días para negociar</p>
          <div className="mt-2 text-emerald-400 text-[11px] font-mono underline">
            👉 https://agropaccioli.com/mapa-cosechas?lote=cos-001
          </div>
        </div>

        {alertaSimuladaEnviada && (
          <div className="mt-2 text-center text-xs font-bold text-green-300 bg-green-950/80 border border-green-700 py-1.5 rounded-lg animate-pulse">
            ✅ Notificación simulada enviada a tu canal prioritario (+57 312 456 7890)
          </div>
        )}
      </div>

      {/* Botón Guardar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <p className="text-[11px] text-zinc-500">
          🔒 Puedes pausar o ajustar tus alertas en cualquier momento desde tu panel.
        </p>

        <button
          type="button"
          onClick={handleGuardar}
          disabled={guardadoExitoso}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-6 py-3 rounded-2xl text-xs shadow-lg transition-all inline-flex items-center gap-2 shrink-0 disabled:bg-emerald-900"
        >
          {guardadoExitoso ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
              <span>¡Preferencias Guardadas!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Guardar Preferencias de Alerta</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  if (isStandalonePage) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="p-3 rounded-2xl bg-emerald-700 text-white shadow-md">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-emerald-950">Centro de Inteligencia & Alertas Personalizadas</h1>
            <p className="text-xs text-zinc-600">Configura avisos en tiempo real para no perder oportunidades en el agro colombiano.</p>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-200 relative my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-100">
          <div className="p-2.5 rounded-2xl bg-emerald-700 text-white shadow-md">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-emerald-950">🔔 Configurar Mis Alertas Inteligentes</h2>
            <p className="text-xs text-zinc-500">Avísame antes de que otros negocien o cuando los precios cambien.</p>
          </div>
        </div>

        {bodyContent}
      </div>
    </div>
  );
}
