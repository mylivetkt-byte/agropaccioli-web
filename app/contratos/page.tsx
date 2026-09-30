import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { FileSignature, ShieldCheck, Scale, MapPin, Truck, CheckCircle2, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function ContratoDemoPage() {
  // Datos simulados del contrato basados en el nuevo schema
  const contrato = {
    id: 'CTR-2026-9482',
    fechaCreacion: new Date().toLocaleDateString('es-CO'),
    estado: 'PENDIENTE_FIRMAS',
    volumen: 5000,
    unidad: 'kg',
    precioPactado: 4500,
    lugarEntrega: 'Bodega Principal Corabastos, Bogotá (Bodega 45)',
    clausulaSaneamiento: true,
    producto: 'Aguacate Hass Calibre 14-22 de Exportación',
    productor: {
      nombre: 'Juan Carlos Gómez',
      cedula: '1000222333',
      finca: 'Finca La Esperanza, Sonsón (Antioquia)',
      firmaDigital: null
    },
    comprador: {
      nombre: 'AgroExportaciones S.A.S',
      nit: '900.123.456-7',
      estadoSarlaft: 'VERIFICADO',
      firmaDigital: null
    },
    transporte: {
      placa: 'TXZ-892',
      tipo: 'Furgón Refrigerado',
      conductor: 'Carlos Mario Pineda',
      resolucion: 'Res. 0456 MinTransporte',
      manifiestoCarga: 'PENDIENTE'
    }
  };

  const valorTotal = contrato.volumen * contrato.precioPactado;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Encabezado del Contrato */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
              <FileSignature className="w-4 h-4 text-emerald-600" />
              <span>SMART CONTRACT AGRÍCOLA B2B</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Contrato de Compraventa</h1>
            <p className="text-sm font-bold text-zinc-500 mt-1">Ref: {contrato.id} • Creado el {contrato.fechaCreacion}</p>
          </div>
          <div className="bg-amber-100 text-amber-800 border border-amber-200 px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            ESPERANDO FIRMAS DIGITALES
          </div>
        </div>

        {/* Documento Físico Simulado */}
        <div className="bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative">
          
          {/* Sello de agua */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Scale className="w-96 h-96" />
          </div>

          <div className="p-8 sm:p-12 relative z-10">
            
            <h2 className="text-center font-black text-xl text-zinc-800 uppercase tracking-widest border-b-2 border-zinc-100 pb-4 mb-8">
              Contrato de Compraventa de Cosecha Futura/Inmediata y Manifiesto de Carga
            </h2>

            {/* Partes Involucradas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider mb-3">El Productor (Vendedor)</h3>
                <p className="font-bold text-zinc-900 text-lg">{contrato.productor.nombre}</p>
                <p className="text-sm text-zinc-600 font-mono mt-1">C.C. {contrato.productor.cedula}</p>
                <div className="mt-3 text-xs text-zinc-500 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {contrato.productor.finca}
                </div>
              </div>

              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                <h3 className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  El Comprador <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full text-[9px] flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> SARLAFT OK</span>
                </h3>
                <p className="font-bold text-emerald-950 text-lg">{contrato.comprador.nombre}</p>
                <p className="text-sm text-emerald-700 font-mono mt-1">NIT. {contrato.comprador.nit}</p>
              </div>
            </div>

            {/* Cláusulas y Condiciones */}
            <div className="space-y-6 text-sm text-zinc-700 leading-relaxed mb-10">
              <p>
                <strong>PRIMERA. OBJETO DEL CONTRATO:</strong> El Productor se compromete a vender y entregar al Comprador la cantidad de <strong className="bg-zinc-100 px-1 rounded">{contrato.volumen.toLocaleString('es-CO')} {contrato.unidad}</strong> del producto agropecuario descrito como <strong className="text-emerald-700">{contrato.producto}</strong>.
              </p>
              
              <p>
                <strong>SEGUNDA. PRECIO Y FORMA DE PAGO:</strong> Las partes acuerdan un precio de <strong className="font-mono text-zinc-900">${contrato.precioPactado.toLocaleString('es-CO')} COP</strong> por {contrato.unidad}, para un <strong>VALOR TOTAL DEL CONTRATO de ${valorTotal.toLocaleString('es-CO')} COP</strong>. El pago se realizará mediante transferencia bancaria protegida al confirmar la recepción en el lugar de entrega.
              </p>
              
              <p>
                <strong>TERCERA. LUGAR DE ENTREGA Y LOGÍSTICA:</strong> El producto será entregado en <strong className="text-zinc-900">{contrato.lugarEntrega}</strong>. El transporte será realizado bajo responsabilidad del transportador autorizado con placa <strong className="font-mono border px-1 rounded">{contrato.transporte.placa}</strong>.
              </p>
              
              <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex gap-3">
                <Truck className="w-6 h-6 text-sky-600 shrink-0" />
                <p className="text-xs text-sky-900">
                  <strong>Manifiesto Electrónico de Carga (RNDC):</strong> Se generará automáticamente con el Ministerio de Transporte una vez se firme este contrato. El vehículo <strong>{contrato.transporte.tipo}</strong> ({contrato.transporte.resolucion}) cuenta con pólizas activas.
                </p>
              </div>

              <p>
                <strong>CUARTA. CLÁUSULA DE SANEAMIENTO:</strong> El Productor declara bajo la gravedad de juramento que es el legítimo propietario de la cosecha, que la finca no está incursa en procesos de restitución de tierras y que el producto está libre de embargos, pleitos o condiciones que impidan su comercialización, asumiendo el saneamiento por evicción.
              </p>
            </div>

            {/* Zona de Firmas Digitales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 border-t border-zinc-100 pt-8">
              <div className="text-center">
                <div className="h-24 border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center mb-3 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
                  <span className="text-emerald-600 font-bold text-sm group-hover:scale-105 transition-transform">✍️ Clic para Firmar (Productor)</span>
                </div>
                <hr className="border-zinc-300 w-3/4 mx-auto mb-2" />
                <p className="font-bold text-zinc-900">{contrato.productor.nombre}</p>
                <p className="text-xs text-zinc-500">Firma Electrónica Ley 527 de 1999</p>
              </div>

              <div className="text-center">
                <div className="h-24 border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center mb-3 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
                  <span className="text-emerald-600 font-bold text-sm group-hover:scale-105 transition-transform">✍️ Clic para Firmar (Comprador)</span>
                </div>
                <hr className="border-zinc-300 w-3/4 mx-auto mb-2" />
                <p className="font-bold text-zinc-900">{contrato.comprador.nombre}</p>
                <p className="text-xs text-zinc-500">Representante Legal (Validado Cámara Comercio)</p>
              </div>
            </div>
            
            {/* Hash Criptográfico Blockchain (Simulado) */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-zinc-900 text-zinc-400 text-[10px] px-4 py-2 rounded-xl font-mono">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>HASH BLOCKCHAIN: 0x8f3c...9a4b (Pendiente de Generación)</span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Acciones flotantes */}
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/mapa-cosechas" className="px-6 py-3 rounded-xl font-bold text-zinc-600 bg-zinc-200 hover:bg-zinc-300 transition-colors">
            Volver al Mapa
          </Link>
          <button className="px-6 py-3 rounded-xl font-black text-white bg-gradient-to-r from-emerald-600 to-green-500 shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all">
            Descargar PDF Borrador
          </button>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
