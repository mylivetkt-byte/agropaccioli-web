import React from 'react';
import Link from 'next/link';
import { Sprout, ShieldCheck, FileText, Lock, Scale, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-emerald-50/40 to-emerald-950 text-zinc-700 pt-14 pb-10 border-t border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">Verificación KYC Anti-Fraude</h4>
              <p className="text-xs text-zinc-600 mt-1">Validación de predios ICA, RUT y productores.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl"><FileText className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">Contratos Ley 527/1999</h4>
              <p className="text-xs text-zinc-600 mt-1">Mensajes de datos con validez jurídica probatoria.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl"><Lock className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">Habeas Data (Ley 1581/2012)</h4>
              <p className="text-xs text-zinc-600 mt-1">Protección estricta de datos personales de usuarios.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-xl"><Scale className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">Facilitador Tecnológico</h4>
              <p className="text-xs text-zinc-600 mt-1">Directorio verificado para acuerdos directos.</p>
            </div>
          </div>
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

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-900 border-t border-emerald-200/60 pt-6">
          <p>© 2026 AGROPACCIOLI S.A.S. - Colombia. Todos los derechos reservados.</p>
          <span className="text-emerald-700 font-semibold">Hecho con ❤️ para el Campo Colombiano</span>
        </div>
      </div>
    </footer>
  );
}
