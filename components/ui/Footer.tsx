import React from 'react';
import Link from 'next/link';
import { Sprout, ShieldCheck, FileText, Lock, Scale, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-emerald-500/10 border-t border-emerald-200 overflow-hidden font-sans pt-10 pb-6 mt-8">
      {/* Decorative Blur Orbs to match ClimaWidget */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl pointer-events-none -mr-32 -mb-32"></div>
      
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">
        
        {/* TOP SECTION: Grid for all content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* COLUMN 1: Logo & Company Info (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-4 group inline-block">
              <img 
                src="/logo-agropaccioli.png" 
                alt="Logo AGROPACCIOLI" 
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
              />
            </Link>
            
            <p className="text-emerald-800/80 text-xs sm:text-sm leading-relaxed mb-4 pr-4 font-medium">
              Plataforma tecnológica, comercial y educativa diseñada para empoderar al agricultor colombiano y eliminar la intermediación abusiva.
            </p>
            
            <div className="w-full space-y-2.5 text-emerald-950 text-sm font-bold">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-600"/> Línea Gratuita: 01 8000 123 456</div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-600"/> soporte@agropaccioli.co</div>
              
              {/* Dirección y Redes Sociales en la misma línea */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600"/> Bogotá D.C., Colombia
                </div>
                
                {/* Social Icons - Alineados a la derecha de la dirección */}
                <div className="flex items-center gap-2">
                  <a href="#" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all shadow-sm border border-emerald-100">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all shadow-sm border border-emerald-100">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all shadow-sm border border-emerald-100">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2, 3, 4: Navigation Links (Span 8 columns total) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            
            {/* Nav Group 1 */}
            <div>
              <h4 className="text-emerald-950 font-black text-base mb-4 tracking-wide">La Plataforma</h4>
              <ul className="space-y-2.5 text-emerald-800 text-[13px] font-semibold">
                <li><Link href="/" className="hover:text-emerald-600 hover:underline transition-colors block">Inicio</Link></li>
                <li><Link href="/mapa-cosechas" className="hover:text-emerald-600 hover:underline transition-colors block">Mapa de Cosechas en Vivo</Link></li>
                <li><Link href="/empleos" className="hover:text-emerald-600 hover:underline transition-colors block">Bolsa de Empleo Rural</Link></li>
                <li><Link href="/precios-mercado" className="hover:text-emerald-600 hover:underline transition-colors block">Precios DANE Oficiales</Link></li>
              </ul>
            </div>
            
            {/* Nav Group 2 */}
            <div>
              <h4 className="text-emerald-950 font-black text-base mb-4 tracking-wide">Red de Aliados</h4>
              <ul className="space-y-2.5 text-emerald-800 text-[13px] font-semibold">
                <li><Link href="/almacenes-b2b" className="hover:text-emerald-600 hover:underline transition-colors block">Almacenes Agrícolas B2B</Link></li>
                <li><Link href="/transportistas" className="hover:text-emerald-600 hover:underline transition-colors block">Directorio de Transporte</Link></li>
                <li><Link href="/escuela" className="hover:text-emerald-600 hover:underline transition-colors block">La Escuela Rural</Link></li>
                <li><Link href="/agremiaciones" className="hover:text-emerald-600 hover:underline transition-colors block">Gremios & ONGs</Link></li>
              </ul>
            </div>

            {/* Nav Group 3 */}
            <div>
              <h4 className="text-emerald-950 font-black text-base mb-4 tracking-wide">Transparencia</h4>
              <ul className="space-y-2.5 text-emerald-800 text-[13px] font-semibold">
                <li><Link href="/contratos" className="hover:text-emerald-600 hover:underline transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Contratos (Ley 527)</Link></li>
                <li><Link href="/politicas-privacidad" className="hover:text-emerald-600 hover:underline transition-colors flex items-center gap-1.5"><Lock className="w-3.5 h-3.5"/> Habeas Data</Link></li>
                <li><Link href="/derechos-autor" className="hover:text-emerald-600 hover:underline transition-colors flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5"/> Derechos de Autor</Link></li>
                <li><Link href="/admin" className="hover:text-emerald-600 hover:underline transition-colors flex items-center gap-1.5"><Scale className="w-3.5 h-3.5"/> Portal Admin</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION: Legal Badges */}
        <div className="py-6 border-y border-emerald-200/60 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-emerald-100 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h5 className="text-emerald-950 font-bold text-[13px] mb-0.5">Verificación Anti-Fraude</h5>
                <p className="text-[11px] text-emerald-700/80 leading-snug">Validación estricta de predios ICA y documentos RUT de compradores.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-emerald-100 shrink-0">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h5 className="text-emerald-950 font-bold text-[13px] mb-0.5">Validez Jurídica</h5>
                <p className="text-[11px] text-emerald-700/80 leading-snug">Contratos amparados bajo la Ley 527 de 1999 de comercio electrónico.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-emerald-100 shrink-0">
                <Lock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h5 className="text-emerald-950 font-bold text-[13px] mb-0.5">Protección de Datos</h5>
                <p className="text-[11px] text-emerald-700/80 leading-snug">Cumplimiento total de la Ley 1581 de 2012 de Habeas Data.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-emerald-100 shrink-0">
                <Scale className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h5 className="text-emerald-950 font-bold text-[13px] mb-0.5">Plataforma Neutral</h5>
                <p className="text-[11px] text-emerald-700/80 leading-snug">0% comisiones. Negociación 100% directa y libre entre las partes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* DISCLAIMER SECTION */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
              <Scale className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h5 className="text-emerald-900 font-bold text-[11px] uppercase tracking-widest mb-1">Cláusula Oficial de Exención de Responsabilidad</h5>
              <p className="text-emerald-800/80 font-medium text-[11px] leading-relaxed max-w-5xl">
                AGROPACCIOLI opera de manera exclusiva como un facilitador tecnológico e informativo. La plataforma <strong>no participa en la negociación, no retiene dinero, no interviene en fijación de precios y no asume responsabilidad civil, penal ni comercial</strong> sobre las transacciones entre productores, compradores y transportistas.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-emerald-700 font-bold tracking-wide">
          <p>© {new Date().getFullYear()} AGROPACCIOLI S.A.S. - Colombia. Todos los derechos reservados.</p>
          <div className="mt-2 md:mt-0 flex items-center gap-1.5">
            Construido con <span className="text-red-500 animate-pulse">❤️</span> para dignificar el Campo Colombiano
          </div>
        </div>

      </div>
    </footer>
  );
}
