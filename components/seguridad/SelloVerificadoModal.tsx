'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Award,
  FileText,
  Star,
  Building2,
  Calendar,
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { SelloVerificacionInfo } from '@/types/agro';
import { SELLO_VERIFICACION_MOCK } from '@/lib/agro-data';

interface SelloVerificadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  info?: SelloVerificacionInfo;
}

export default function SelloVerificadoModal({
  isOpen,
  onClose,
  info = SELLO_VERIFICACION_MOCK
}: SelloVerificadoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-emerald-200 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="p-3 rounded-2xl bg-emerald-700 text-white shadow-md">
            <ShieldCheck className="w-7 h-7 text-emerald-200" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Plataforma Verificada AGROPACCIOLI</span>
            </div>
            <h2 className="text-lg font-black text-emerald-950 mt-1">
              Sello de Confianza y Seguridad Rural
            </h2>
          </div>
        </div>

        {/* Ficha del Productor */}
        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 mb-5">
          <h3 className="text-xs font-black text-emerald-950">
            {info.nombreFincaOEmpresa}
          </h3>
          <p className="text-[11px] text-zinc-600 mt-0.5">
            Miembro verificado desde el {info.fechaVerificacionKyc}
          </p>
        </div>

        {/* Garantías Verificadas */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">1. Identidad y RUT / Cédula Verificada (KYC)</div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Titular validado con documento oficial y titularidad del predio productivo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">2. Registro Sanitario e ICA al Día</div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Código: <strong className="text-emerald-950 font-mono">{info.numeroRegistroIca}</strong> · Cumple Buenas Prácticas Agrícolas (BPA).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">3. Contratos Digitales Válidos (Ley 527/1999)</div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {info.contratosLey527Cumplidos} acuerdos cerrados con éxito · Tasa de entrega del <strong className="text-emerald-700">{info.tasaCumplimientoEntrega}%</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">4. Reputación de Compradores y Transportistas</div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Calificación promedio ⭐ <strong className="text-emerald-950">{info.calificacionPromedio} / 5.0</strong> basada en {info.totalResenas} transacciones reales.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>Garantía Cero Fraude & Anti-Humo</span>
          </span>

          <button
            onClick={onClose}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
