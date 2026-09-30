import React from 'react';
import Link from 'next/link';
import { Sprout, ShieldCheck, FileText, Lock, Scale, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-emerald-50/40 to-emerald-950 text-zinc-700 pt-14 pb-10 border-t border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm mb-12">
          <Link href="/?registro_comprador=true" className="flex items-start gap-4 group hover:bg-emerald-50 p-2 rounded-xl transition-all cursor-pointer">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl group-hover:scale-110 transition-transform"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm group-hover:text-emerald-700 transition-colors">Verificación KYC Anti-Fraude</h4>
              <p className="text-xs text-zinc-600 mt-1">Validación de predios ICA, RUT y productores.</p>
            </div>
          </Link>
          <Link href="/contratos" className="flex items-start gap-4 group hover:bg-emerald-50 p-2 rounded-xl transition-all cursor-pointer">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl group-hover:scale-110 transition-transform"><FileText className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm group-hover:text-emerald-700 transition-colors">Contratos Ley 527/1999</h4>
              <p className="text-xs text-zinc-600 mt-1">Mensajes de datos con validez jurídica probatoria.</p>
            </div>
          </Link>
          <Link href="/politicas-privacidad" className="flex items-start gap-4 group hover:bg-emerald-50 p-2 rounded-xl transition-all cursor-pointer">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl group-hover:scale-110 transition-transform"><Lock className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm group-hover:text-emerald-700 transition-colors">Habeas Data (Ley 1581/2012)</h4>
              <p className="text-xs text-zinc-600 mt-1">Protección estricta de datos personales de usuarios.</p>
            </div>
          </Link>
          <Link href="/mapa-cosechas" className="flex items-start gap-4 group hover:bg-amber-50 p-2 rounded-xl transition-all cursor-pointer">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-xl group-hover:scale-110 transition-transform"><Scale className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm group-hover:text-amber-700 transition-colors">Facilitador Tecnológico</h4>
              <p className="text-xs text-zinc-600 mt-1">Directorio verificado para acuerdos directos.</p>
            </div>
          </Link>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950 text-emerald-200 text-xs leading-relaxed border border-emerald-800 mb-8">
          <div className="flex items-center gap-2 font-bold text-emerald-300 mb-1">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>CLÁUSULA DE EXENCIÓN DE RESPONSABILIDAD COMERCIAL</span>
          </div>
          <p>
            AGROPACCIOLI opera exclusivamente como una plataforma tecnológica de directorio e información agropecuaria. NO interviene en la fijación de precios, pagos, calidades ni transportes acordados entre las partes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-emerald-800 mb-6">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span>•</span>
          <Link href="/mapa-cosechas" className="hover:underline">Mapa de Cosechas</Link>
          <span>•</span>
          <Link href="/empleos" className="hover:underline text-emerald-900 font-bold">Bolsa de Empleo Rural</Link>
          <span>•</span>
          <Link href="/precios-mercado" className="hover:underline">Precios DANE/SIPSA</Link>
          <span>•</span>
          <Link href="/almacenes-b2b" className="hover:underline">Almacenes B2B</Link>
          <span>•</span>
          <Link href="/academia-ia" className="hover:underline">Academia IA</Link>
          <span>•</span>
          <Link href="/transportistas" className="hover:underline">Transportistas</Link>
          <span>•</span>
          <Link href="/agremiaciones" className="hover:underline">Gremios & ONGs</Link>
          <span>•</span>
          <Link href="/admin" className="hover:underline">Admin</Link>
          <span>•</span>
          <Link href="/politicas-privacidad" className="hover:underline font-bold text-emerald-900">Privacidad y Datos (Ley 1581)</Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-900 border-t border-emerald-200/60 pt-6">
          <p>© 2026 AGROPACCIOLI S.A.S. - Colombia. Todos los derechos reservados.</p>
          <span className="text-emerald-700 font-semibold">Hecho con ❤️ para el Campo Colombiano</span>
        </div>
      </div>
    </footer>
  );
}
