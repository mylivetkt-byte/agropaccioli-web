'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, ShieldCheck, MessageCircle, Phone, Sparkles, Loader2 } from 'lucide-react';
import { getCosechasList } from '@/app/actions/cosechas';
import { CosechaItem, SectorType } from '@/types/agro';

export default function BuscadorCosechas() {
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState('todos');
  const [limite, setLimite] = useState(8);
  const [cosechas, setCosechas] = useState<CosechaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const raw = await getCosechasList();
        if (raw && raw.length > 0) {
          const mapped: CosechaItem[] = raw.map((d: any) => ({
            id: d.id,
            titulo: d.titulo || d.producto,
            sector: d.sector as any,
            categoria: d.categoria || '',
            variedad: d.variedad || '',
            cantidadDisponible: d.cantidadDisponible,
            unidad: d.unidad as any,
            precioUnitario: d.precio,
            moneda: 'COP',
            departamento: d.departamento || 'Colombia',
            municipio: d.municipio || d.ubicacion,
            vereda: d.vereda || '',
            coordenadas: [d.longitud || -74.0, d.latitud || 4.0],
            productor: {
              nombre: d.productor?.nombre || 'Productor Agropecuario',
              finca: d.vereda ? `Finca Vereda ${d.vereda}` : 'Finca Registrada',
              verificadoKYC: true,
              calificacion: 4.9,
              telefono: d.productor?.telefono || '+573000000000',
              whatsapp: d.productor?.telefono ? d.productor.telefono.replace('+', '') : '573000000000',
              experienciaAnos: 10
            },
            fechaCosechaEstimada: d.fechaCosechaStr || (d.fechaRecoleccion ? new Date(d.fechaRecoleccion).toLocaleDateString() : 'Inmediata'),
            fechaPublicacion: d.createdAt ? new Date(d.createdAt).toISOString().split('T')[0] : '2026-10-01',
            imagenes: d.imagenes ? [d.imagenes] : ['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80'],
            descripcion: d.descripcion || 'Lote de producción agropecuaria registrado en plataforma.',
            certificaciones: d.certificaciones ? d.certificaciones.split(', ') : ['Registro Verificado']
          }));
          setCosechas(mapped);
        }
      } catch (err) {
        console.error('Error loading dynamic cosechas:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtrados = cosechas.filter((item) => {
    const matchText = (item.titulo || '').toLowerCase().includes(busqueda.toLowerCase()) ||
                      (item.municipio || '').toLowerCase().includes(busqueda.toLowerCase()) ||
                      (item.departamento || '').toLowerCase().includes(busqueda.toLowerCase());
    const matchSector = sectorFiltro === 'todos' || item.sector === sectorFiltro;
    return matchText && matchSector;
  });

  const filtradosMostrar = filtrados.slice(0, limite);

  return (
    <section className="py-12 bg-white border-y border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Directorio Verificado de Cosechas & Lotes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">Buscar Cosechas Disponibles</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Contacta agricultores, ganaderos y piscicultores colombianos verificados.</p>
          </div>
          <Link href="/mapa-cosechas" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
            <MapPin className="w-4 h-4" />
            <span>Ver Mapa Satelital</span>
          </Link>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 md:p-5 mb-8 space-y-4 max-w-3xl">
          {/* Barra de Búsqueda */}
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="¿Qué buscas? (ej: Aguacate, Novillos, Trucha, Antioquia...)"
              className="w-full bg-white border border-emerald-300 rounded-2xl pl-5 pr-12 py-3 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-shadow"
            />
          </div>
          
          {/* Botones de Filtro Rápido (Pills) */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-xs font-bold text-emerald-800 mr-2 hidden sm:block">Filtrar por:</span>
            
            <button 
              onClick={() => setSectorFiltro('todos')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'todos' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-white text-zinc-600 hover:bg-emerald-100 border border-emerald-200'}`}
            >
              <span>🌾</span> Todos
            </button>
            
            <button 
              onClick={() => setSectorFiltro('agricola')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'agricola' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-white text-zinc-600 hover:bg-emerald-100 border border-emerald-200'}`}
            >
              <span>🥑</span> Agrícola
            </button>
            
            <button 
              onClick={() => setSectorFiltro('ganadero')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'ganadero' ? 'bg-orange-600 text-white shadow-md scale-105' : 'bg-white text-zinc-600 hover:bg-orange-100 border border-orange-200'}`}
            >
              <span>🐂</span> Ganadero
            </button>
            
            <button 
              onClick={() => setSectorFiltro('acuicola')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${sectorFiltro === 'acuicola' ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-white text-zinc-600 hover:bg-sky-100 border border-sky-200'}`}
            >
              <span>🐟</span> Peces
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtradosMostrar.map((item) => {
            const estado = item.estado || 'disponible';
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden group">
                <div className="relative h-44 w-full bg-zinc-100">
                  <img src={item.imagenes[0]} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <div className="bg-white/95 backdrop-blur-sm text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {item.sector === 'agricola' ? '🟢 Agrícola' : item.sector === 'ganadero' ? '🟠 Ganadero' : '🔵 Acuícola'}
                    </div>
                  </div>

                  {/* Badge de Estado del Lote */}
                  <div className="absolute top-3 right-3">
                    {estado === 'disponible' && (
                      <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        🟢 DISPONIBLE
                      </span>
                    )}
                    {estado === 'en_negociacion' && (
                      <span className="bg-amber-400/95 backdrop-blur-sm text-amber-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                        🟡 EN NEGOCIACIÓN
                      </span>
                    )}
                    {estado === 'reservado' && (
                      <span className="bg-orange-500/95 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        🟠 RESERVADO
                      </span>
                    )}
                    {estado === 'vendido' && (
                      <span className="bg-rose-600/95 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        🔴 VENDIDO
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{item.departamento}, {item.municipio}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-emerald-950 text-sm leading-snug line-clamp-2">{item.titulo}</h3>
                    
                    <div className="flex items-center justify-between text-xs text-zinc-500 mt-1">
                      <div className="flex items-center gap-1 truncate font-medium text-zinc-700">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.productor.nombre}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold shrink-0">🟢 Activo</span>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Disponible:</span>
                        <span className="font-bold text-emerald-950">{item.cantidadDisponible} {item.unidad}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1 pt-1 border-t border-emerald-200/50">
                        <span className="text-zinc-500">Precio base:</span>
                        <span className="font-black text-emerald-700">${item.precioUnitario.toLocaleString('es-CO')} /{item.unidad}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botón de Chat Interno en Plataforma */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-col gap-1.5">
                    <Link
                      href="/chat"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-emerald-600/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chatear con el Productor</span>
                    </Link>
                    <div className="text-[10px] text-center text-zinc-400 font-medium">
                      🔒 Acuerdo y Propuesta Legal en Plataforma
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtrados.length > limite && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setLimite(limite + 8)}
              className="px-8 py-3.5 bg-white border-2 border-emerald-600 text-emerald-700 font-bold rounded-2xl shadow-sm hover:bg-emerald-50 active:scale-95 transition-all"
            >
              Cargar más lotes ({filtrados.length - limite} ocultos)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
