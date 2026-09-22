'use client';

import React, { useState } from 'react';
import { Flag, AlertTriangle, CheckCircle2, X, ShieldAlert } from 'lucide-react';
import { EmpleoItem } from '@/types/agro';

interface Props {
  empleo: EmpleoItem;
  onClose: () => void;
}

export default function ModalDenunciaOferta({ empleo, onClose }: Props) {
  const [motivo, setMotivo] = useState('sospecha_estafa');
  const [detalle, setDetalle] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Control de Calidad & Anti-Fraude</span>
            </div>
            <h2 className="text-lg font-black text-rose-950">
              Denunciar Oferta de Trabajo
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Oferta: <strong>{empleo.titulo}</strong>
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {enviado ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-rose-950">Denuncia Registrada</h3>
            <p className="text-xs text-zinc-600">
              El equipo de moderación y auditoría KYC revisará esta oferta en menos de 24 horas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="font-bold text-zinc-700 mb-1 block">Motivo de la Denuncia *</label>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full border border-rose-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-rose-500 bg-white font-medium cursor-pointer"
              >
                <option value="sospecha_estafa">🚩 Sospecha de Estafa / Cobro previo para trabajar</option>
                <option value="datos_falsos">🚩 Datos de finca o teléfono falsos</option>
                <option value="condiciones_abusivas">🚩 Salario o condiciones abusivas</option>
                <option value="duplicada">🚩 Oferta duplicada o spam</option>
                <option value="otro">🚩 Otro motivo grave</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-zinc-700 mb-1 block">Detalles adicionales</label>
              <textarea
                rows={3}
                required
                placeholder="Por favor cuéntanos qué anomalía encontraste en esta oferta..."
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                className="w-full border border-rose-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-md"
              >
                Enviar Denuncia
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
