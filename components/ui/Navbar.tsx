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
  ExternalLink,
  Users2,
  Sparkles
} from 'lucide-react';
import { TRM_DATA, ALERTAS_NOTIFICACIONES_DATA } from '@/lib/agro-data';
import NotificacionesDropdown from '@/components/alertas/NotificacionesDropdown';
import ConfiguradorAlertasModal from '@/components/alertas/ConfiguradorAlertasModal';

export default function Navbar() {
  const pathname = usePathname();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [notificacionesOpen, setNotificacionesOpen] = useState(false);
  const [configuradorOpen, setConfiguradorOpen] = useState(false);

  const noLeidas = ALERTAS_NOTIFICACIONES_DATA.filter(n => !n.leido).length;

  const menuSections = [
    {
      title: '🌾 Mercado & Negocios',
      items: [
        { href: '/', label: 'Inicio', desc: 'Portada y directorio comercial', icon: Sprout },
        { href: '/mapa-cosechas', label: 'Mapa Nacional de Cosechas', desc: 'Geolocalización satelital en tiempo real', icon: MapPin, badge: 'Interactivo' },
        { href: '/inteligencia-mercado', label: 'Inteligencia de Mercado (IA)', desc: 'Tendencias, histórico de precios y análisis', icon: LineChart, badge: 'Nuevo' },
        { href: '/precios-mercado', label: 'Precios Oficiales SIPSA / DANE', desc: 'Boletín diario mayorista y subastas', icon: TrendingUp },
        { href: '/mi-escaparate', label: 'Mi Escaparate de Productor', desc: 'Gestión de cosechas, ventas y lotes', icon: Store, badge: 'Productor' },
        { href: '/mis-intereses', label: 'Mis Favoritos & Seguimiento', desc: 'Lotes guardados y productores de interés', icon: ShoppingBag }
      ]
    },
    {
      title: '🏢 B2B & Logística',
      items: [
        { href: '/almacenes-b2b', label: 'Almacenes de Insumos', desc: 'Vitrina comercial, fertilizantes y maquinaria', icon: Store },
        { href: '/transportistas', label: 'Directorio de Transportistas', desc: 'Fletes, camiones y furgones refrigerados', icon: Truck }
      ]
    },
    {
      title: '👷 Empleo & Comunidad Rural',
      items: [
        { href: '/empleos', label: 'Bolsa de Empleo Agropecuario', desc: 'Vacantes, administradores y cosecheros', icon: Briefcase, badge: 'Activo' },
        { href: '/academia-ia', label: 'Academia Agrícola con IA', desc: 'Asistente fitosanitario y capacitación', icon: Bot },
        { href: '/agremiaciones', label: 'Gremios & Fundaciones', desc: 'Cooperativas, FEDEGAN, Fedecacao y ONGs', icon: Users2 }
      ]
    },
    {
      title: '🛡️ Administración & Seguridad',
      items: [
        { href: '/admin', label: 'Panel Administrativo', desc: 'Moderación, noticias y control KYC', icon: ShieldCheck }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* Barra superior de cotizaciones y alertas */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-900 text-emerald-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-emerald-800/60 shadow-xs">
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
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-800/90 hover:bg-emerald-700 px-3 py-1 rounded-full border border-emerald-600/50 transition-all cursor-pointer shadow-xs"
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

            <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ley 527/1999 Verificada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegación Principal Limpia */}
      <nav className="bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 py-3">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* LOGO Y NOMBRE - SIEMPRE VISIBLE Y NUNCA OBSTRUIDO */}
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
                Directorio & Ecosistema Agropecuario
              </p>
            </div>
          </Link>

          {/* Accesos Rápidos Principales y Botón Menú Hamburguesa */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Botón Mapa Rápido */}
            <Link
              href="/mapa-cosechas"
              className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-emerald-200 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mapa Nacional</span>
            </Link>

            {/* Botón Chat Rápido */}
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Mensajes</span>
              <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">3</span>
            </Link>

            {/* Botón Publicar Cosecha */}
            <Link
              href="/mapa-cosechas?publicar=true"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Publicar Cosecha</span>
              <span className="sm:hidden">Publicar</span>
            </Link>

            {/* BOTÓN MENÚ HAMBURGUESA DESTACADO */}
            <button
              onClick={() => setMenuDrawerOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer border border-emerald-800"
              aria-label="Abrir Menú de Módulos"
            >
              <Menu className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline">Menú</span>
            </button>
          </div>
        </div>
      </nav>

      {/* DRAWER LATERAL ELEGANTE (SIDEBAR MENU HAMBURGUESA) */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop con desenfoque suave */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMenuDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-emerald-100 animate-in slide-in-from-right duration-300">
              
              {/* Header del Drawer */}
              <div className="p-5 bg-gradient-to-r from-emerald-950 to-green-900 text-white flex items-center justify-between border-b border-emerald-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Sprout className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-black text-base leading-none">Módulos de la Plataforma</h3>
                    <p className="text-[11px] text-emerald-200 mt-1">AGROPACCIOLI Colombia</p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuDrawerOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-colors"
                  title="Cerrar Menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido con Scroll de Módulos por Categoría */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#f8faf9]">
                {menuSections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-emerald-950 px-2 flex items-center gap-1.5">
                      <span>{sec.title}</span>
                    </h4>

                    <div className="bg-white rounded-2xl border border-emerald-100/80 shadow-xs divide-y divide-zinc-100 overflow-hidden">
                      {sec.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuDrawerOpen(false)}
                            className={`p-3.5 flex items-center justify-between gap-3 hover:bg-emerald-50/60 transition-colors group ${
                              isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2.5 rounded-xl shrink-0 ${
                                isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-md">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight line-clamp-1">
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer del Drawer con acceso a Alertas y Soporte */}
              <div className="p-4 bg-white border-t border-emerald-100 space-y-2">
                <button
                  onClick={() => {
                    setMenuDrawerOpen(false);
                    setConfiguradorOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 py-2.5 px-4 rounded-xl border border-emerald-200 transition-colors"
                >
                  <Sliders className="w-4 h-4 text-emerald-700" />
                  <span>Configurar Alertas & "Avísame cuando..."</span>
                </button>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                  <span>Plataforma Verificada Ley 527/1999</span>
                  <span className="font-bold text-emerald-800">Versión 2.4</span>
                </div>
              </div>

            </div>
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
