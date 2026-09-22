'use client';

import React, { useState } from 'react';
import { RefreshCw, X, CheckCircle2, Calendar, DollarSign, Package } from 'lucide-react';
import { PropuestaFormal } from '@/types/agro';

interface Props {
  propuesta: PropuestaFormal;
  onClose: () => void;
  onSubmit: (contraofertaData: {
    cantidad: number;
    precioUnitario: number;
    fechaEntrega: string;
    comentarios?: string;
  }) => void;
}

export default function ModalContraoferta({ propuesta, onClose, onSubmit }: Props) {
  const [cantidad, setCantidad] = useState(propuesta.cantidadDeseada);
  const [precioUnitario, setPrecioUnitario] = useState(propuesta.precioOfrecidoUnitario + 200);
  const [fechaEntrega, setFechaEntrega] = useState(propuesta.fechaEntregaDeseada);
  const [comentarios, setComentarios] = useState('');
  const [enviado, setEnviado] = useState(false);

  const totalCalculado = cantidad * precioUnitario;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      onSubmit({
        cantidad: Number(cantidad),
        precioUnitario: Number(precioUnitario),
        fechaEntrega,
        comentarios
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-orange-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full mb-1">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Contraoferta del Productor</span>
            </div>
            <h2 className="text-xl font-black text-emerald-950">
              Ajustar Términos y Contraofertar
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Propuesta original: <strong>{propuesta.id}</strong> ({propuesta.cantidadDeseada} {propuesta.unidad} a ${propuesta.precioOfrecidoUnitario.toLocaleString('es-CO')})
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {enviado ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">¡Contraoferta Enviada!</h3>
            <p className="text-xs text-zinc-600">
              El comprador ha recibido tus nuevos términos para su revisión y aceptación.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 mb-1 block">
                  Cantidad a Despachar ({propuesta.unidad}) *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    required
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 border border-orange-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-700 mb-1 block">
                  Tu Precio por {propuesta.unidad} (COP) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="100"
                    step="100"
                    required
                    value={precioUnitario}
                    onChange={(e) => setPrecioUnitario(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 border border-orange-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold text-orange-950"
                  />
                </div>
              </div>
            </div>

            {/* Total Contraoferta */}
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-zinc-600 block">Nuevo Total Estimado:</span>
                <span className="text-xs text-zinc-400 font-normal">{cantidad} {propuesta.unidad} × ${precioUnitario.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="text-lg font-black text-orange-950">
                ${totalCalculado.toLocaleString('es-CO')} COP
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 mb-1 block">
                Nueva Fecha de Entrega o Disponibilidad *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ej: 29 de Septiembre, 2026"
                  value={fechaEntrega}
                  onChange={(e) => setFechaEntrega(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-orange-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 mb-1 block">
                Motivo del Ajuste o Condiciones para el Comprador
              </label>
              <textarea
                rows={3}
                placeholder="Explica por qué ajustas el precio o fecha (ej: calidad premium, empaque especial, tiempos de cargue)..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="w-full border border-orange-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl shadow-lg transition-all"
              >
                Enviar Contraoferta
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
