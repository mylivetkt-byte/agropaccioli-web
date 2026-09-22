'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sprout, 
  MapPin, 
  TrendingUp, 
  Store, 
  Bot, 
  Truck, 
  ShieldCheck, 
  PlusCircle, 
  Menu, 
  X, 
  DollarSign, 
  Briefcase,
  MessageSquare,
  ShoppingBag,
  Bell,
  LineChart,
  Sliders,
  ChevronRight,
  Users2,
  Sparkles,
  Search
} from 'lucide-react';
import { TRM_DATA, ALERTAS_NOTIFICACIONES_DATA } from '@/lib/agro-data';
import NotificacionesDropdown from '@/components/alertas/NotificacionesDropdown';
import ConfiguradorAlertasModal from '@/components/alertas/ConfiguradorAlertasModal';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificacionesOpen, setNotificacionesOpen] = useState(false);
  const [configuradorOpen, setConfiguradorOpen] = useState(false);

  const noLeidas = ALERTAS_NOTIFICACIONES_DATA.filter(n => !n.leido).length;

  // Todos los módulos visibles para que ningún usuario se los pierda
  const visibleModules = [
    { href: '/', label: 'Inicio', icon: Sprout },
    { href: '/mapa-cosechas', label: 'Mapa de Cosechas', icon: MapPin, badge: 'En Vivo' },
    { href: '/inteligencia-mercado', label: 'Inteligencia IA', icon: LineChart, badge: 'Nuevo' },
    { href: '/empleos', label: 'Bolsa de Empleo', icon: Briefcase, badge: '47 Ofertas' },
    { href: '/precios-mercado', label: 'Precios SIPSA/DANE', icon: TrendingUp },
    { href: '/mi-escaparate', label: 'Mi Escaparate', icon: Store, badge: 'Productor' },
    { href: '/mis-intereses', label: 'Mis Favoritos', icon: ShoppingBag },
    { href: '/almacenes-b2b', label: 'Almacenes B2B', icon: Store },
    { href: '/transportistas', label: 'Transportistas', icon: Truck },
    { href: '/academia-ia', label: 'Academia IA', icon: Bot },
    { href: '/agremiaciones', label: 'Gremios & ONGs', icon: Users2 },
    { href: '/admin', label: 'Admin', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 w-full font-sans shadow-md">
      {/* 1. BARRA SUPERIOR DE TRM Y ESTADO */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-900 text-emerald-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-emerald-800/60">
        <div className="flex items-center justify-between container mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white tracking-wide">RED AGROPACCIOLI COLOMBIA</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-200">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>TRM Dólar: <strong className="text-white">$${TRM_DATA.dolarCOP.toLocaleString('es-CO')} COP</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-emerald-200">
            {/* Botón Centro de Notificaciones en Barra Superior */}
            <div className="relative">
              <button
                onClick={() => setNotificacionesOpen(!notificacionesOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-800/90 hover:bg-emerald-700 px-3 py-0.5 rounded-full border border-emerald-600/50 transition-all cursor-pointer shadow-xs"
              >
                <Bell className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                <span>🔔 (${noLeidas}) Alertas</span>
              </button>

              <NotificacionesDropdown
                isOpen={notificacionesOpen}
                onClose={() => setNotificacionesOpen(false)}
                onOpenConfigurador={() => setConfiguradorOpen(true)}
              />
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-emerald-200 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ley 527/1999 Verificada</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILA PRINCIPAL: LOGO GRANDE DESPEJADO + ACCIONES CLAVE */}
      <div className="bg-white border-b border-emerald-100 py-3 px-4 sm:px-6">
        <div className="container mx-auto flex items-center justify-between gap-4">
          
          {/* LOGOTIPO Y NOMBRE GRANDE — NUNCA SE TAPA */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-none flex items-center gap-1">
                <span>AGRO</span>
                <span className="text-emerald-600">PACCIOLI</span>
              </div>
              <p className="text-[10px] font-bold text-emerald-700 mt-0.5 tracking-wide">
                Directorio & Ecosistema Agropecuario de Colombia
              </p>
            </div>
          </Link>

          {/* ACCIONES DE USUARIO EN LA PARTE DERECHA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mensajes / Chat */}
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Mensajes</span>
              <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">3</span>
            </Link>

            {/* Mis Favoritos */}
            <Link
              href="/mis-intereses"
              className="hidden lg:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-200 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mis Favoritos</span>
            </Link>

            {/* Configurar Alertas */}
            <button
              onClick={() => setConfiguradorOpen(true)}
              className="hidden sm:inline-flex p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-200 transition-colors"
              title="Configurar Alertas"
            >
              <Sliders className="w-4 h-4 text-emerald-700" />
            </button>

            {/* BOTÓN DESTACADO: PUBLICAR COSECHA */}
            <Link
              href="/mapa-cosechas?publicar=true"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Publicar Cosecha Gratis</span>
              <span className="sm:hidden">Publicar</span>
            </Link>

            {/* Botón menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              aria-label="Abrir Menú Móvil"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. FILA SECUNDARIA: TODOS LOS MÓDULOS 100% VISIBLES EN PANTALLA */}
      <div className="bg-gradient-to-r from-white via-emerald-50/40 to-white border-b border-emerald-200/80 py-1.5 px-4 overflow-x-auto scrollbar-none">
        <div className="container mx-auto flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          {visibleModules.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-700'
                    : 'text-zinc-700 hover:text-emerald-900 hover:bg-emerald-100/70 border border-transparent hover:border-emerald-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-black uppercase ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : item.badge.includes('Ofertas')
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-emerald-200 text-emerald-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Menú Desplegable para Móviles si abren hamburguesa */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-emerald-100 p-4 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2">
          <div className="text-[11px] font-black uppercase text-zinc-400 px-3 py-1">
            Módulos del Sistema:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {visibleModules.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? 'bg-emerald-800 text-white' : 'text-zinc-700 hover:bg-emerald-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setConfiguradorOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 py-2.5 rounded-xl border border-emerald-200"
            >
              <Sliders className="w-4 h-4 text-emerald-700" />
              <span>Configurar Mis Alertas Inteligentes</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal de Configuración de Alertas */}
      <ConfiguradorAlertasModal
        isOpen={configuradorOpen}
        onClose={() => setConfiguradorOpen(false)}
      />
    </header>
  );
}
