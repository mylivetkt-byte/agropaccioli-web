'use client';

import React from 'react';
import { ShieldCheck, Scale, Printer, Download, X, CheckCircle2, Lock, FileText, Calendar, MapPin, Building, User } from 'lucide-react';
import { PropuestaFormal } from '@/types/agro';

interface Props {
  propuesta: PropuestaFormal;
  onClose: () => void;
}

export default function ComprobanteLegalViewer({ propuesta, onClose }: Props) {
  const handlePrint = () => {
    window.print();
  };

  const mdNumero = `AGP-MD-2026-${propuesta.id.replace(/\D/g, '').padEnd(6, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-200 max-h-[92vh] overflow-y-auto print:p-0 print:border-none print:shadow-none">
        {/* Header Acciones (Oculto al imprimir) */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-100 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Documento Probatorio Electrónico</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Descargar PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-xl hover:bg-zinc-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificado Formal */}
        <div className="mt-4 space-y-6 text-zinc-800 font-sans">
          {/* Encabezado del Certificado */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b-2 border-emerald-700">
            <div>
              <div className="text-xl font-black tracking-tight text-emerald-950">
                AGROPACCIOLI <span className="text-emerald-600 text-xs font-bold uppercase block tracking-normal">Plataforma Tecnológica Agropecuaria Nacional</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">Certificado de Mensaje de Datos y Acuerdo Comercial</p>
            </div>
            <div className="text-right sm:text-right w-full sm:w-auto p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">Radicado Oficial</div>
              <div className="text-xs font-black text-emerald-950 font-mono mt-0.5">{mdNumero}</div>
              <div className="text-[9px] text-zinc-500 mt-0.5">Estampa: {propuesta.fechaCreacion}</div>
            </div>
          </div>

          {/* Marco Legal */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-700 leading-relaxed flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950">Validez Jurídica y Probatoria (Ley 527 de 1999):</strong>
              <span className="block mt-0.5 text-zinc-600">
                El presente mensaje de datos goza de presunción de autenticidad, integridad y no repudio conforme a los artículos 6°, 7°, 8° y 10° de la Ley 527 de 1999 de la República de Colombia.
              </span>
            </div>
          </div>

          {/* Partes Intervinientes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Comprador */}
            <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
                <User className="w-4 h-4 text-emerald-600" />
                <span>PARTE COMPRADORA</span>
              </div>
              <div className="text-xs space-y-1">
                <div><strong className="text-zinc-900">{propuesta.compradorNombre}</strong></div>
                <div className="text-zinc-500">ID Comprador: {propuesta.compradorId}</div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verificación KYC Aprobada</span>
                </div>
              </div>
            </div>

            {/* Productor */}
            <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>PARTE VENDEDORA (PRODUCTOR)</span>
              </div>
              <div className="text-xs space-y-1">
                <div><strong className="text-zinc-900">{propuesta.productorNombre}</strong></div>
                <div className="text-zinc-500">{propuesta.productorFinca}</div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Predio Verificado KYC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalle del Lote y Condiciones Pactadas */}
          <div className="border border-emerald-200 rounded-2xl overflow-hidden">
            <div className="bg-emerald-800 text-white px-4 py-2.5 text-xs font-bold flex justify-between items-center">
              <span>TÉRMINOS PACTADOS DEL LOTE AGROPECUARIO</span>
              <span className="text-[10px] uppercase bg-emerald-700 px-2 py-0.5 rounded">Estado: {propuesta.estado}</span>
            </div>
            
            <div className="p-4 bg-white text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-zinc-100">
                <span className="text-zinc-500">Producto / Lote:</span>
                <span className="font-bold text-emerald-950">{propuesta.loteTitulo}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-2 border-b border-zinc-100">
                <div>
                  <span className="text-zinc-500 block text-[11px]">Cantidad Transada:</span>
                  <span className="font-bold text-zinc-900 text-sm">{propuesta.contraoferta ? propuesta.contraoferta.cantidad : propuesta.cantidadDeseada} {propuesta.unidad}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Precio Unitario:</span>
                  <span className="font-bold text-emerald-700 text-sm">${(propuesta.contraoferta ? propuesta.contraoferta.precioUnitario : propuesta.precioOfrecidoUnitario).toLocaleString('es-CO')} /{propuesta.unidad}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Monto Total Pactado:</span>
                  <span className="font-black text-emerald-950 text-sm">
                    ${((propuesta.contraoferta ? propuesta.contraoferta.cantidad * propuesta.contraoferta.precioUnitario : propuesta.precioTotalEstimado)).toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              <div className="flex justify-between pb-2 border-b border-zinc-100">
                <span className="text-zinc-500">Fecha Estimada de Entrega:</span>
                <span className="font-bold text-zinc-900">{propuesta.contraoferta ? propuesta.contraoferta.fechaEntrega : propuesta.fechaEntregaDeseada}</span>
              </div>

              <div className="flex justify-between pb-2 border-b border-zinc-100">
                <span className="text-zinc-500">Lugar de Entrega / Cargue:</span>
                <span className="font-medium text-zinc-900">{propuesta.lugarEntrega}</span>
              </div>

              {propuesta.comentarios && (
                <div>
                  <span className="text-zinc-500 block text-[11px]">Condiciones Especiales / Calibre:</span>
                  <p className="mt-0.5 text-zinc-700 italic bg-zinc-50 p-2 rounded-lg">{propuesta.comentarios}</p>
                </div>
              )}
            </div>
          </div>

          {/* Huella Digital SHA-256 e Integridad */}
          <div className="p-3 bg-zinc-900 text-emerald-400 rounded-2xl font-mono text-[10px] space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-300 font-bold uppercase text-[9px]">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Firma Digital & Hash de Integridad SHA-256:</span>
            </div>
            <div className="break-all tracking-wider text-emerald-300 font-bold">
              {propuesta.hashIntegridadLegal}
            </div>
            <div className="text-zinc-400 text-[9px] pt-1 border-t border-zinc-800">
              Emitido y validado por AGROPACCIOLI S.A.S. • Código de verificación en línea activo.
            </div>
          </div>

          {/* Pie de página Legal */}
          <div className="text-[10px] text-zinc-400 text-center pt-2 border-t border-zinc-100">
            Este certificado electrónico presta mérito probatorio del acuerdo directo entre partes conforme al Código General del Proceso y la Ley 527 de 1999 de Colombia.
          </div>
        </div>
      </div>
    </div>
  );
}
