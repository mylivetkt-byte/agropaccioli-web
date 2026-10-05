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
  Users2,
  GraduationCap,
  ChevronRight,
  Sparkles,
  CalendarClock,
  Wallet
} from 'lucide-react';
import { TRM_DATA, ALERTAS_NOTIFICACIONES_DATA } from '@/lib/agro-data';
import NotificacionesDropdown from '@/components/alertas/NotificacionesDropdown';
import ConfiguradorAlertasModal from '@/components/alertas/ConfiguradorAlertasModal';

interface NavModuleItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  desc?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificacionesOpen, setNotificacionesOpen] = useState(false);
  const [configuradorOpen, setConfiguradorOpen] = useState(false);

  const noLeidas = ALERTAS_NOTIFICACIONES_DATA.filter(n => !n.leido).length;

  // FILA 1 DE MÓDULOS: Mercado, Productos, Precios y Negocios
  const fila1Modulos: NavModuleItem[] = [
    { href: '/', label: 'Inicio', icon: Sprout, desc: 'Portada y directorio comercial' },
    { href: '/mapa-cosechas', label: 'Mapa de Productos', icon: MapPin, badge: 'En Vivo', desc: 'Geolocalización satelital en tiempo real de productos' },
    { href: '/agricultura-contrato', label: 'Cosechas a Futuro', icon: CalendarClock, badge: 'Contratos', desc: 'Asegure ventas antes de sembrar' },
    { href: '/inteligencia-mercado', label: 'Inteligencia IA', icon: LineChart, badge: 'Nuevo', desc: 'Tendencias y proyecciones de mercado' },
    { href: '/empleos', label: 'Bolsa de Empleo', icon: Briefcase, badge: '47 Ofertas', desc: 'Vacantes de cosechas y administradores' },
    { href: '/precios-mercado', label: 'Precios SIPSA / DANE', icon: TrendingUp, desc: 'Boletín diario de centrales mayoristas' },
    { href: '/mi-escaparate', label: 'Mi Escaparate', icon: Store, badge: 'Productor', desc: 'Gestión de cosechas y ventas' },
    { href: '/mis-intereses', label: 'Mis Favoritos', icon: ShoppingBag, desc: 'Lotes y transportistas guardados' }
  ];

  // FILA 2 DE MÓDULOS: Educación, B2B, Logística, Software y Apoyo
  const fila2Modulos: NavModuleItem[] = [
    { href: '/escuela', label: 'Escuela Rural', icon: GraduationCap, badge: 'Cursos', desc: 'Capacitación agrícola y diplomas con QR' },
    { href: '/almacenes-b2b', label: 'Almacenes B2B', icon: Store, desc: 'Insumos, fertilizantes y maquinaria' },
    { href: '/agro-fintech', label: 'AgroFintech & Pools', icon: Wallet, badge: 'Crédito', desc: 'Crédito insumos y Compras comunitarias' },
    { href: '/transportistas', label: 'Transportistas', icon: Truck, desc: 'Directorio de camiones y fletes de carga' },
    { href: '/academia-ia', label: 'Asistente IA', icon: Bot, desc: 'Asistente fitosanitario para cultivos' },
    { href: '/agremiaciones', label: 'Gremios & ONGs', icon: Users2, desc: 'Cooperativas y asociaciones campesinas' },
    { href: '/software', label: 'Software ERP', icon: ShieldCheck, badge: 'ERP', desc: 'Software de gestión para el agro' },
    { href: '/admin', label: 'Panel Admin', icon: ShieldCheck, desc: 'Moderación, noticias y control KYC' }
  ];

  const todosModulos: NavModuleItem[] = [...fila1Modulos, ...fila2Modulos];

  return (
    <header className="sticky top-0 z-50 w-full font-sans shadow-md">
      {/* 1. BARRA SUPERIOR DE TRM Y ESTADO (RESPONSIVE) */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-900 text-emerald-100 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 flex items-center justify-between border-b border-emerald-800/60">
        <div className="flex items-center justify-between container mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white tracking-wide text-[10px] sm:text-xs">RED AGROPACCIOLI</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>TRM Dólar: <strong className="text-white">$${TRM_DATA.dolarCOP.toLocaleString('es-CO')} COP</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-emerald-200">
            {/* Botón Centro de Notificaciones en Barra Superior */}
            <div className="relative">
              <button
                onClick={() => setNotificacionesOpen(!notificacionesOpen)}
                className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white bg-emerald-800/90 hover:bg-emerald-700 px-2.5 sm:px-3 py-0.5 rounded-full border border-emerald-600/50 transition-all cursor-pointer shadow-xs"
              >
                <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-bounce" />
                <span>(${noLeidas}) Alertas</span>
              </button>

              <NotificacionesDropdown
                isOpen={notificacionesOpen}
                onClose={() => setNotificacionesOpen(false)}
                onOpenConfigurador={() => setConfiguradorOpen(true)}
              />
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-emerald-200 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ley 527/1999 Verificada</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CABECERA PRINCIPAL: LOGO + ACCIONES CLAVE */}
      <div className="bg-white border-b border-emerald-100 py-2 px-3 sm:px-6">
        <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* LOGOTIPO OFICIAL Y TÍTULO (RESPONSIVE) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <img 
              src="/logo-agropaccioli.png" 
              alt="Logo AGROPACCIOLI" 
              className="h-9 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
            />

            <div>
              <div className="text-base sm:text-2xl font-black text-emerald-950 tracking-tight leading-none flex items-center gap-0.5 sm:gap-1">
                <span>AGRO</span>
                <span className="text-emerald-600">PACCIOLI</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-700 mt-0.5 tracking-tight sm:tracking-wide">
                Directorio & Ecosistema Agropecuario
              </p>
            </div>
          </Link>

          {/* ACCIONES DE USUARIO EN LA PARTE DERECHA */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Mensajes / Chat */}
            <Link
              href="/chat"
              className="inline-flex items-center gap-1 sm:gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 sm:px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Mensajes</span>
              <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">3</span>
            </Link>

            {/* Mis Favoritos (Desktop) */}
            <Link
              href="/mis-intereses"
              className="hidden lg:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-200 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Favoritos</span>
            </Link>

            {/* BOTÓN DESTACADO: PUBLICAR PRODUCTO */}
            <Link
              href="/mapa-cosechas?publicar=true"
              className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-extrabold px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Publicar Producto</span>
              <span className="sm:hidden text-[11px]">Publicar</span>
            </Link>

            {/* Botón Menú Hamburguesa para Móvil */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-emerald-950 text-white hover:bg-emerald-900 transition-colors flex items-center gap-1"
              aria-label="Abrir Menú Completo"
            >
              <Menu className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase">Menú</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. BARRA DE MÓDULOS EN DESKTOP (2 FILAS LIMPIAS) */}
      <div className="hidden md:block bg-gradient-to-b from-white to-emerald-50/40 border-b border-emerald-200/80 py-1.5 px-4 sm:px-6">
        <div className="container mx-auto space-y-1.5">
          
          {/* FILA 1: Mercado & Cosechas */}
          <div className="flex items-center justify-start gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            <span className="text-[10px] font-black uppercase text-emerald-950 bg-emerald-100/90 px-2 py-0.5 rounded-md shrink-0">
              🌾 Mercado:
            </span>
            {fila1Modulos.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.desc}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-zinc-700 hover:text-emerald-950 hover:bg-emerald-100/60 bg-white/80 border border-zinc-200/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded font-black uppercase ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : item.badge.includes('Ofertas')
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* FILA 2: Educación, B2B, Logística & Software */}
          <div className="flex items-center justify-start gap-1.5 overflow-x-auto pt-0.5 scrollbar-none">
            <span className="text-[10px] font-black uppercase text-emerald-950 bg-emerald-100/90 px-2 py-0.5 rounded-md shrink-0">
              🏢 Servicios:
            </span>
            {fila2Modulos.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.desc}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-zinc-700 hover:text-emerald-950 hover:bg-emerald-100/60 bg-white/80 border border-zinc-200/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded font-black uppercase ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. TIRA DESLIZABLE COMPACTA EN MÓVIL (HORIZONTAL SWIPE FÁCIL) */}
      <div className="md:hidden bg-white border-b border-emerald-100 py-1.5 px-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {todosModulos.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-zinc-700 bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100'
                }`}
              >
                <Icon className="w-3 h-3 text-emerald-600" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. MENÚ DRAWER LATERAL COMPLETO PARA MÓVIL (DESPLIEGUE FLUIDO AL TOCAR 'MENÚ') */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Fondo oscuro con desenfoque */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between border-l border-emerald-100 animate-in slide-in-from-right duration-300">
              
              {/* Header del Drawer */}
              <div className="p-4 bg-gradient-to-r from-emerald-950 to-green-900 text-white flex items-center justify-between border-b border-emerald-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Sprout className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm leading-none">Menú Principal</h3>
                    <p className="text-[10px] text-emerald-200 mt-0.5">AGROPACCIOLI Colombia</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-colors"
                  title="Cerrar Menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de Módulos Grandes para Tocar con el Dedo */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8faf9]">
                
                {/* Bloque Mercado */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950 px-2 block">
                    🌾 Mercado & Cosechas
                  </span>
                  <div className="bg-white rounded-2xl border border-emerald-100 shadow-xs divide-y divide-zinc-100 overflow-hidden">
                    {fila1Modulos.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          title={item.desc}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`p-3 flex items-center justify-between hover:bg-emerald-50/70 transition-colors ${
                            isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                                <span>{item.label}</span>
                                {item.badge && (
                                  <span className="text-[8px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{item.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bloque Servicios & Educación */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950 px-2 block">
                    🏢 Servicios, Cursos & Software
                  </span>
                  <div className="bg-white rounded-2xl border border-emerald-100 shadow-xs divide-y divide-zinc-100 overflow-hidden">
                    {fila2Modulos.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          title={item.desc}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`p-3 flex items-center justify-between hover:bg-emerald-50/70 transition-colors ${
                            isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                                <span>{item.label}</span>
                                {item.badge && (
                                  <span className="text-[8px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{item.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Footer del Drawer */}
              <div className="p-4 bg-white border-t border-emerald-100 space-y-2">
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
