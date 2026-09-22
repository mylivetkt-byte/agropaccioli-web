'use client';

import React, { useState } from 'react';
import { FileText, ShieldCheck, X, CheckCircle2, Calendar, MapPin, DollarSign, Package } from 'lucide-react';
import { CosechaItem, PropuestaFormal } from '@/types/agro';

interface Props {
  lote: {
    id: string;
    titulo: string;
    precioUnitario: number;
    unidad: string;
    cantidadDisponible: number;
    productorNombre: string;
    productorFinca: string;
  };
  onClose: () => void;
  onSubmit: (propuesta: PropuestaFormal) => void;
}

export default function ModalPropuestaFormal({ lote, onClose, onSubmit }: Props) {
  const [cantidad, setCantidad] = useState(Math.min(lote.cantidadDisponible, 10));
  const [precioOfrecido, setPrecioOfrecido] = useState(lote.precioUnitario);
  const [fechaEntrega, setFechaEntrega] = useState('2026-09-30');
  const [lugarEntrega, setLugarEntrega] = useState('En finca del productor (Cargue)');
  const [comentarios, setComentarios] = useState('');
  const [enviado, setEnviado] = useState(false);

  const totalEstimado = cantidad * precioOfrecido;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hashGenerado = Array.from(crypto.getRandomValues(new Uint8Array(20)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const nuevaPropuesta: PropuestaFormal = {
      id: `AGP-PROP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      loteId: lote.id,
      loteTitulo: lote.titulo,
      compradorId: 'usr-buyer-current',
      compradorNombre: 'Comercializadora AgroCaribe S.A.S. (Tú)',
      compradorKYC: true,
      productorId: 'prod-current',
      productorNombre: lote.productorNombre,
      productorFinca: lote.productorFinca,
      cantidadDeseada: Number(cantidad),
      unidad: lote.unidad as any,
      precioOfrecidoUnitario: Number(precioOfrecido),
      precioTotalEstimado: totalEstimado,
      fechaEntregaDeseada: fechaEntrega,
      lugarEntrega,
      comentarios,
      estado: 'pendiente',
      fechaCreacion: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      estampaTiempoIso: new Date().toISOString(),
      hashIntegridadLegal: hashGenerado
    };

    setEnviado(true);
    setTimeout(() => {
      onSubmit(nuevaPropuesta);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Validez Legal Ley 527/1999</span>
            </div>
            <h2 className="text-xl font-black text-emerald-950">
              Enviar Propuesta Formal de Compra
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Lote: <strong className="text-emerald-900">{lote.titulo}</strong>
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {enviado ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">¡Propuesta Formal Registrada!</h3>
            <p className="text-xs text-zinc-600">
              Se ha generado el comprobante de mensaje de datos inmutable. El lote pasa a estado <strong>🟡 En Negociación</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 mb-1 block">
                  Cantidad Deseada ({lote.unidad}) *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max={lote.cantidadDisponible * 2}
                    required
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 mt-0.5 block">Disponible: {lote.cantidadDisponible} {lote.unidad}</span>
              </div>

              <div>
                <label className="font-bold text-zinc-700 mb-1 block">
                  Precio Ofrecido por {lote.unidad} (COP) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="100"
                    step="100"
                    required
                    value={precioOfrecido}
                    onChange={(e) => setPrecioOfrecido(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-900"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 mt-0.5 block">Base: ${lote.precioUnitario.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            {/* Total Calculado */}
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-zinc-600 block">Monto Total de la Propuesta:</span>
                <span className="text-xs text-zinc-400 font-normal">{cantidad} {lote.unidad} × ${precioOfrecido.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="text-lg font-black text-emerald-950">
                ${totalEstimado.toLocaleString('es-CO')} COP
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 mb-1 block">
                  Fecha Deseada de Entrega *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-700 mb-1 block">
                  Lugar / Modalidad de Entrega *
                </label>
                <select
                  value={lugarEntrega}
                  onChange={(e) => setLugarEntrega(e.target.value)}
                  className="w-full p-2.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium cursor-pointer"
                >
                  <option value="En finca del productor (Cargue)">En finca del productor (Cargue)</option>
                  <option value="Transporte a cargo del comprador">Transporte a cargo del comprador</option>
                  <option value="Entrega en central mayorista / Bodega">Entrega en central mayorista / Bodega</option>
                  <option value="Punto de acopio veredal acordado">Punto de acopio veredal acordado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 mb-1 block">
                Términos, Calibre o Condiciones Adicionales
              </label>
              <textarea
                rows={3}
                placeholder="Especifica requerimientos de empaque, calibre, humedad o forma de pago..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="w-full border border-emerald-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantía Jurídica y Probatoria</span>
              </div>
              <p>
                Al enviar esta propuesta se registrará una estampa cronológica inmutable bajo la Ley 527 de 1999 de Comercio Electrónico. El productor podrá <strong>Aceptar</strong>, <strong>Contraofertar</strong> o <strong>Rechazar</strong>.
              </p>
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
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg transition-all"
              >
                Registrar y Enviar Propuesta
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
