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
  Users2, 
  ShieldCheck, 
  PlusCircle, 
  Menu, 
  X, 
  DollarSign, 
  Briefcase,
  MessageSquare,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { TRM_DATA } from '@/lib/agro-data';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Inicio', icon: Sprout },
    { href: '/mapa-cosechas', label: 'Mapa', icon: MapPin },
    { href: '/chat', label: 'Mensajes', icon: MessageSquare, badge: '3' },
    { href: '/mi-escaparate', label: 'Mi Escaparate', icon: Store, badge: 'Productor' },
    { href: '/mis-intereses', label: 'Mis Intereses', icon: ShoppingBag },
    { href: '/empleos', label: 'Bolsa Empleo', icon: Briefcase },
    { href: '/precios-mercado', label: 'Precios SIPSA', icon: TrendingUp },
    { href: '/almacenes-b2b', label: 'Almacenes', icon: Store },
    { href: '/academia-ia', label: 'Academia IA', icon: Bot },
    { href: '/transportistas', label: 'Transportistas', icon: Truck },
    { href: '/admin', label: 'Admin', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 text-emerald-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-emerald-700/50">
        <div className="flex items-center justify-between container mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">RED AGROPACCIOLI COLOMBIA</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-200">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>TRM Dólar: <strong className="text-white">${TRM_DATA.dolarCOP.toLocaleString('es-CO')} COP</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-emerald-200">
            <Link
              href="/chat"
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700/70 hover:bg-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-500/50 transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>(3) Propuestas & Mensajes</span>
            </Link>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ley 527/1999 Verificada</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 py-2.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-emerald-950 font-sans">
                AGRO<span className="text-emerald-600">PACCIOLI</span>
              </span>
              <p className="text-[9px] font-medium text-emerald-700">Directorio & Negociación</p>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chat</span>
            </Link>

            <Link
              href="/mapa-cosechas?publicar=true"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/25 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publica Cosecha</span>
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-xl text-zinc-700 hover:bg-emerald-50">
            {open ? <X className="w-6 h-6 text-emerald-700" /> : <Menu className="w-6 h-6 text-emerald-700" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-emerald-100 px-4 pt-2 pb-6 shadow-xl space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-emerald-50"
              >
                <span>{link.label}</span>
                {link.badge && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{link.badge}</span>}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
