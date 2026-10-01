'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Home, ArrowUpRight, PlusCircle, ShieldCheck, MessageCircle, Sparkles, Flame, CheckCircle2, Search } from 'lucide-react';
import { getEmpleosList } from '@/app/actions/empleos';

export default function BolsaEmpleosPreview() {
  const [busqueda, setBusqueda] = useState('');
  const [empleos, setEmpleos] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const raw = await getEmpleosList();
        if (raw && raw.length > 0) {
          const mapped = raw.map((e: any) => ({
            id: e.id,
            titulo: e.titulo,
            sector: e.sector,
            tipoContrato: e.tipoContrato,
            ubicacion: e.ubicacion,
            departamento: e.departamento,
            municipio: e.municipio,
            salario: e.salario,
            salarioTexto: e.salarioTexto || (e.salario ? `$${e.salario.toLocaleString('es-CO')}` : 'A convenir'),
            requiereExperiencia: e.requiereExperiencia,
            incluyeHospedaje: e.incluyeHospedaje,
            incluyeAlimentacion: e.incluyeAlimentacion,
            empresaOFinca: e.empleadorNombre || 'Finca Verificada',
            telefonoContacto: e.empleadorTelefono || '+573000000000',
            fechaPublicacion: e.fechaPublicacion ? new Date(e.fechaPublicacion).toISOString().split('T')[0] : '2026-10-01',
            estado: e.estado.toLowerCase()
          }));
          setEmpleos(mapped);
        }
      } catch (err) {
        console.error('Error fetching dynamic empleos:', err);
      }
    }
    load();
  }, []);

  const filtrados = empleos.filter((e) => {
    const isActive = e.estado === 'activa' || !e.estado;
    const matchText = (e.titulo || '').toLowerCase().includes(busqueda.toLowerCase()) || 
                      (e.municipio || '').toLowerCase().includes(busqueda.toLowerCase()) ||
                      (e.empresaOFinca || '').toLowerCase().includes(busqueda.toLowerCase());
    return isActive && matchText;
  });

  // Mostramos 3 por defecto, o hasta 6 si el usuario está buscando algo
  const destacadas = busqueda.trim() !== '' ? filtrados.slice(0, 6) : filtrados.slice(0, 3);
  const totalActivas = filtrados.length;

  return (
    <section className="py-14 bg-gradient-to-b from-white via-emerald-50/30 to-white border-b border-emerald-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Oportunidades Laborales del Campo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
              Bolsa de Empleo Agropecuario & Rural
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
              Fincas y empresas verificadas buscan mayordomos, administradores, cuadrillas de cosecha y técnicos en toda Colombia.
            </p>

            {/* Micro Live Indicators */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>🟢 {totalActivas} Ofertas Activas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                <Flame className="w-3 h-3 text-amber-600" />
                <span>Temporadas: Café · Aguacate · Cacao</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/empleos"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-300 px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <span>Ver Todas las Vacantes ({empleos.length})</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </div>
        </div>

        {/* Buscador Rápido de Empleos */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-4 md:p-5 mb-6 max-w-3xl">
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por cargo (ej: Mayordomo, Recolector) o municipio..."
              className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl pl-5 pr-12 py-3 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-shadow"
            />
          </div>
        </div>

        {/* Season Badges */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-black text-zinc-500 uppercase shrink-0 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Temporadas:
          </span>
          {[
            { id: 't1', slug: 'cafe', icono: '☕', nombre: 'Pico Cosecha Cafetera', vacantes: 45 },
            { id: 't2', slug: 'aguacate', icono: '🥑', nombre: 'Cosecha Aguacate Hass', vacantes: 28 },
            { id: 't3', slug: 'cacao', icono: '🍫', nombre: 'Recolección de Cacao', vacantes: 18 }
          ].map((temp) => (
            <Link
              key={temp.id}
              href={`/empleos?cosecha=${temp.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-full text-xs text-zinc-700 font-semibold shadow-xs shrink-0 transition-all hover:border-emerald-400"
            >
              <span>{temp.icono}</span>
              <span>{temp.nombre}</span>
              <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {temp.vacantes} vacantes
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {destacadas.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {item.sector === 'agricola' ? '🟢 Agrícola' : item.sector === 'ganadero' ? '🟠 Ganadero' : item.sector === 'acuicola' ? '🔵 Acuícola' : '🟣 Profesional'}
                  </span>
                  {item.urgente && (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                      URGENTE
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-emerald-950 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {item.titulo}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-600 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.empresaOFinca}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.municipio}, {item.departamento}</span>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[10px] text-zinc-500">Compensación:</div>
                  <div className="text-xs font-black text-emerald-900 mt-0.5">{item.salarioTexto}</div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {item.incluyeVivienda && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                      <Home className="w-3 h-3 text-amber-600" />
                      <span>Vivienda 🏡</span>
                    </span>
                  )}
                  {item.incluyeAlimentacion && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Alimentación 🍲
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <Link
                  href="/empleos"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  <span>Ver y Postularme</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${item.contactoWhatsapp}?text=Hola%20${encodeURIComponent(item.contactoNombre)},%20te%20contacto%20desde%20la%20Bolsa%20de%20Empleo%20de%20AGROPACCIOLI%20por%20la%20vacante:%20${encodeURIComponent(item.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors"
                  title="Contactar por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA para Productores */}
        <div className="mt-8 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-200 uppercase tracking-wide mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Publicación Gratuita Verificada</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold">¿Tienes una finca y necesitas cuadrillas o administradores?</h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Publica en 5 sencillos pasos y recibe postulaciones verificadas de trabajadores rurales en tu región.
            </p>
          </div>
          <Link
            href="/empleos"
            className="shrink-0 bg-white hover:bg-emerald-50 text-emerald-950 font-black px-5 py-2.5 rounded-2xl text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Publicar Oferta en 5 Pasos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
