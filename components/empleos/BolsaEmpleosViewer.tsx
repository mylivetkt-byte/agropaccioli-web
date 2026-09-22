'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Home, 
  Utensils, 
  ShieldCheck, 
  MessageCircle, 
  Phone, 
  Search, 
  PlusCircle, 
  Filter, 
  X, 
  CheckCircle2, 
  Clock, 
  Users, 
  DollarSign, 
  Sparkles,
  Award,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { EMPLEOS_DATA } from '@/lib/agro-data';
import { EmpleoItem, SectorType, TipoContrato } from '@/types/agro';

export default function BolsaEmpleosViewer() {
  const [empleos, setEmpleos] = useState<EmpleoItem[]>(EMPLEOS_DATA);
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState<string>('todos');
  const [contratoFiltro, setContratoFiltro] = useState<string>('todos');
  const [soloConVivienda, setSoloConVivienda] = useState(false);
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string>('todos');
  
  // Modales
  const [selectedEmpleo, setSelectedEmpleo] = useState<EmpleoItem | null>(null);
  const [showModalPublicar, setShowModalPublicar] = useState(false);
  const [publicadoExitoso, setPublicadoExitoso] = useState(false);

  // Formulario nuevo empleo
  const [formData, setFormData] = useState({
    titulo: '',
    empresaOFinca: '',
    sector: 'agricola' as SectorType | 'profesional',
    cargo: '',
    tipoContrato: 'mensual' as TipoContrato,
    departamento: 'Antioquia',
    municipio: '',
    vereda: '',
    salarioTexto: '',
    salarioNumerico: 2000000,
    incluyeVivienda: true,
    incluyeAlimentacion: false,
    vacantesDisponibles: 1,
    experienciaRequerida: '',
    descripcion: '',
    requisitos: '',
    beneficios: '',
    contactoNombre: '',
    contactoTelefono: '',
    contactoWhatsapp: ''
  });

  // Departamentos únicos para filtro
  const departamentos = Array.from(new Set(empleos.map(e => e.departamento))).sort();

  // Filtrado reactivo
  const filtrados = empleos.filter(item => {
    const matchText = 
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.empresaOFinca.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.municipio.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.departamento.toLowerCase().includes(busqueda.toLowerCase());

    const matchSector = sectorFiltro === 'todos' || item.sector === sectorFiltro;
    const matchContrato = contratoFiltro === 'todos' || item.tipoContrato === contratoFiltro;
    const matchVivienda = !soloConVivienda || item.incluyeVivienda;
    const matchDepto = departamentoFiltro === 'todos' || item.departamento === departamentoFiltro;

    return matchText && matchSector && matchContrato && matchVivienda && matchDepto;
  });

  const handleCrearEmpleo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.empresaOFinca || !formData.contactoWhatsapp) {
      alert('Por favor completa los campos principales: Título, Finca y WhatsApp de contacto.');
      return;
    }

    const nuevo: EmpleoItem = {
      id: `emp-${Date.now()}`,
      titulo: formData.titulo,
      empresaOFinca: formData.empresaOFinca,
      sector: formData.sector,
      cargo: formData.cargo || formData.titulo,
      tipoContrato: formData.tipoContrato,
      departamento: formData.departamento,
      municipio: formData.municipio || 'Cabecera Municipal',
      vereda: formData.vereda || 'Zona Rural',
      salarioTexto: formData.salarioTexto || `$${formData.salarioNumerico.toLocaleString('es-CO')} COP`,
      salarioNumerico: Number(formData.salarioNumerico),
      incluyeVivienda: formData.incluyeVivienda,
      incluyeAlimentacion: formData.incluyeAlimentacion,
      vacantesDisponibles: Number(formData.vacantesDisponibles) || 1,
      experienciaRequerida: formData.experienciaRequerida || 'Experiencia en labores del campo.',
      descripcion: formData.descripcion || 'Labores agropecuarias en finca tecnificada.',
      requisitos: formData.requisitos ? formData.requisitos.split(',').map(r => r.trim()) : ['Compromiso y puntualidad', 'Disponibilidad inmediata'],
      beneficios: formData.beneficios ? formData.beneficios.split(',').map(b => b.trim()) : ['Pago puntual', 'Seguridad social'],
      contactoNombre: formData.contactoNombre || 'Administrador',
      contactoTelefono: formData.contactoTelefono || formData.contactoWhatsapp,
      contactoWhatsapp: formData.contactoWhatsapp.replace(/\D/g, ''),
      fechaPublicacion: 'Hoy',
      verificadoKYC: true,
      urgente: true
    };

    setEmpleos([nuevo, ...empleos]);
    setPublicadoExitoso(true);
    setTimeout(() => {
      setPublicadoExitoso(false);
      setShowModalPublicar(false);
      // Reset form
      setFormData({
        titulo: '',
        empresaOFinca: '',
        sector: 'agricola',
        cargo: '',
        tipoContrato: 'mensual',
        departamento: 'Antioquia',
        municipio: '',
        vereda: '',
        salarioTexto: '',
        salarioNumerico: 2000000,
        incluyeVivienda: true,
        incluyeAlimentacion: false,
        vacantesDisponibles: 1,
        experienciaRequerida: '',
        descripcion: '',
        requisitos: '',
        beneficios: '',
        contactoNombre: '',
        contactoTelefono: '',
        contactoWhatsapp: ''
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-green-900 text-white py-14 px-4 border-b border-emerald-700/60 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
                <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                <span>Bolsa Oficial de Empleo del Campo Colombiano</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Mano de Obra & Empleo Rural <span className="text-emerald-300">Sin Intermediarios</span>
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base mt-3 leading-relaxed">
                Conectamos directamente a fincas, productores y agroempresas con mayordomos, jornaleros, tractoristas, veterinarios y administradores en toda Colombia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModalPublicar(true)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 text-emerald-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-950/30 text-sm transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5 text-emerald-900" />
                <span>Publicar Oferta de Empleo</span>
              </button>
            </div>
          </div>

          {/* Tarjetas de Estadísticas Rápidas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            <div className="bg-emerald-950/40 backdrop-blur-md border border-emerald-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                <Briefcase className="w-4 h-4" />
                <span>Vacantes Activas</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{empleos.length} Ofertas</div>
            </div>

            <div className="bg-emerald-950/40 backdrop-blur-md border border-emerald-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                <Home className="w-4 h-4" />
                <span>Con Vivienda en Finca</span>
              </div>
              <div className="text-2xl font-black text-emerald-200 mt-1">
                {empleos.filter(e => e.incluyeVivienda).length} Vacantes
              </div>
            </div>

            <div className="bg-emerald-950/40 backdrop-blur-md border border-emerald-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Departamentos</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{departamentos.length} Regiones</div>
            </div>

            <div className="bg-emerald-950/40 backdrop-blur-md border border-emerald-700/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verificación</span>
              </div>
              <div className="text-2xl font-black text-green-300 mt-1">100% KYC</div>
            </div>
          </div>
        </div>
      </section>

      {/* Buscador & Barra de Filtros */}
      <section className="container mx-auto max-w-6xl px-4 -mt-6">
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-emerald-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Input de Búsqueda */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por cargo (ej: Mayordomo, Recolector, Tractorista, Agrónomo)..."
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Selector de Sector */}
            <div className="md:col-span-3">
              <select
                value={sectorFiltro}
                onChange={(e) => setSectorFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">🌾 Todos los Sectores</option>
                <option value="agricola">🟢 Sector Agrícola</option>
                <option value="ganadero">🟠 Sector Ganadero</option>
                <option value="acuicola">🔵 Sector Acuícola</option>
                <option value="profesional">🟣 Técnico & Profesional</option>
              </select>
            </div>

            {/* Selector de Departamento */}
            <div className="md:col-span-2">
              <select
                value={departamentoFiltro}
                onChange={(e) => setDepartamentoFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">📍 Toda Colombia</option>
                {departamentos.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Selector de Contrato */}
            <div className="md:col-span-2">
              <select
                value={contratoFiltro}
                onChange={(e) => setContratoFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">📋 Tipo Contrato</option>
                <option value="mensual">Fijo Mensual</option>
                <option value="jornal">Jornal Diario</option>
                <option value="temporada">Por Cosecha</option>
                <option value="prestacion_servicios">Servicios</option>
              </select>
            </div>
          </div>

          {/* Filtro toggle para Vivienda */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoloConVivienda(!soloConVivienda)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
                  soloConVivienda 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Solo con Vivienda / Alojamiento Incluido 🏡</span>
              </button>

              {(busqueda || sectorFiltro !== 'todos' || contratoFiltro !== 'todos' || soloConVivienda || departamentoFiltro !== 'todos') && (
                <button
                  onClick={() => {
                    setBusqueda('');
                    setSectorFiltro('todos');
                    setContratoFiltro('todos');
                    setSoloConVivienda(false);
                    setDepartamentoFiltro('todos');
                  }}
                  className="text-emerald-700 hover:underline font-semibold ml-2"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="text-zinc-500 font-medium">
              Mostrando <strong className="text-emerald-950 font-bold">{filtrados.length}</strong> ofertas laborales disponibles
            </div>
          </div>
        </div>
      </section>

      {/* Listado de Ofertas */}
      <section className="container mx-auto max-w-6xl px-4 mt-8">
        {filtrados.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-emerald-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">No encontramos ofertas con esos filtros</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6">
              Intenta cambiar los términos de búsqueda o sé el primero en publicar una oferta para tu vereda o municipio.
            </p>
            <button
              onClick={() => setShowModalPublicar(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
            >
              Publicar Vacante Ahora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtrados.map((item) => {
              let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
              let badgeIcon = '🟢';
              if (item.sector === 'ganadero') { badgeColor = 'bg-orange-100 text-orange-800 border-orange-200'; badgeIcon = '🟠'; }
              if (item.sector === 'acuicola') { badgeColor = 'bg-sky-100 text-sky-800 border-sky-200'; badgeIcon = '🔵'; }
              if (item.sector === 'profesional') { badgeColor = 'bg-purple-100 text-purple-800 border-purple-200'; badgeIcon = '🟣'; }

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header de la Tarjeta */}
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                        {badgeIcon} {item.sector.toUpperCase()}
                      </span>

                      {item.urgente && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                          🔥 URGENTE
                        </span>
                      )}
                    </div>

                    {/* Título & Finca */}
                    <h3 className="text-base font-bold text-emerald-950 mt-2.5 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {item.titulo}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 mt-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.empresaOFinca}</span>
                    </div>

                    {/* Ubicación */}
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item.municipio}, {item.departamento} ({item.vereda || 'Rural'})</span>
                    </div>

                    {/* Bloque de Salario */}
                    <div className="mt-4 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100/80">
                      <div className="text-[11px] text-zinc-500">Compensación Ofrecida:</div>
                      <div className="text-base font-black text-emerald-900 mt-0.5">
                        {item.salarioTexto}
                      </div>
                    </div>

                    {/* Badges de Beneficios */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.incluyeVivienda && (
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <Home className="w-3 h-3 text-amber-600" />
                          <span>Vivienda en Finca</span>
                        </span>
                      )}
                      {item.incluyeAlimentacion && (
                        <span className="text-[10px] font-bold bg-green-50 text-green-900 border border-green-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-green-600" />
                          <span>Alimentación</span>
                        </span>
                      )}
                      <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-lg">
                        👥 {item.vacantesDisponibles} {item.vacantesDisponibles > 1 ? 'Vacantes' : 'Vacante'}
                      </span>
                    </div>

                    {/* Breve descripción */}
                    <p className="text-xs text-zinc-600 mt-3 line-clamp-2 leading-relaxed">
                      {item.descripcion}
                    </p>
                  </div>

                  {/* Botones de Acción */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedEmpleo(item)}
                      className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 rounded-xl text-xs transition-colors border border-emerald-200 flex items-center justify-center gap-1"
                    >
                      <span>Ver Detalles</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${item.contactoWhatsapp}?text=Hola%20${encodeURIComponent(item.contactoNombre)},%20te%20contacto%20desde%20la%20Bolsa%20de%20Empleo%20de%20AGROPACCIOLI%20por%20la%20vacante:%20${encodeURIComponent(item.titulo)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2.5 rounded-xl text-xs flex items-center justify-center shadow-md transition-colors"
                      title="Postularme por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal de Detalle de Oferta */}
      {selectedEmpleo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  {selectedEmpleo.sector} • Contrato {selectedEmpleo.tipoContrato}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950 mt-2">
                  {selectedEmpleo.titulo}
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-600 mt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-900">{selectedEmpleo.empresaOFinca}</span>
                  <span>•</span>
                  <span>{selectedEmpleo.municipio}, {selectedEmpleo.departamento} ({selectedEmpleo.vereda || 'Rural'})</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEmpleo(null)}
                className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuadro Salarial y Beneficios Clave */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div>
                <div className="text-[11px] text-zinc-500 font-semibold">Salario Ofrecido:</div>
                <div className="text-base font-black text-emerald-900 mt-0.5">{selectedEmpleo.salarioTexto}</div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-semibold">Vivienda Campesina:</div>
                <div className="text-xs font-bold text-emerald-900 mt-0.5">
                  {selectedEmpleo.incluyeVivienda ? '✅ Incluye Alojamiento' : '❌ Sin Alojamiento'}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-semibold">Alimentación:</div>
                <div className="text-xs font-bold text-emerald-900 mt-0.5">
                  {selectedEmpleo.incluyeAlimentacion ? '🍲 Alimentación Incluida' : '⚪ Por cuenta del trabajador'}
                </div>
              </div>
            </div>

            {/* Descripción del puesto */}
            <div className="mt-5 space-y-4 text-xs text-zinc-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-emerald-950 text-sm mb-1">Descripción del Cargo & Labores:</h4>
                <p>{selectedEmpleo.descripcion}</p>
              </div>

              <div>
                <h4 className="font-bold text-emerald-950 text-sm mb-1">Experiencia Solicitada:</h4>
                <p className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">{selectedEmpleo.experienciaRequerida}</p>
              </div>

              {selectedEmpleo.requisitos && selectedEmpleo.requisitos.length > 0 && (
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm mb-1.5">Requisitos del Postulante:</h4>
                  <ul className="space-y-1">
                    {selectedEmpleo.requisitos.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEmpleo.beneficios && selectedEmpleo.beneficios.length > 0 && (
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm mb-1.5">Beneficios Adicionales:</h4>
                  <ul className="space-y-1">
                    {selectedEmpleo.beneficios.map((ben, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Modal con Contacto Directo */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-zinc-500">
                <span>Contacto directo: <strong>{selectedEmpleo.contactoNombre}</strong></span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${selectedEmpleo.contactoTelefono}`}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Llamar</span>
                </a>

                <a
                  href={`https://wa.me/${selectedEmpleo.contactoWhatsapp}?text=Hola%20${encodeURIComponent(selectedEmpleo.contactoNombre)},%20te%20contacto%20desde%20la%20Bolsa%20de%20Empleo%20de%20AGROPACCIOLI%20por%20la%20vacante:%20${encodeURIComponent(selectedEmpleo.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Postularme por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Publicar Oferta de Empleo */}
      {showModalPublicar && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Módulo de Empleo para Productores</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                  Publicar Oferta de Trabajo Rural
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Llega a jornaleros, mayordomos y personal calificado en tu vereda o departamento.
                </p>
              </div>
              <button 
                onClick={() => setShowModalPublicar(false)}
                className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {publicadoExitoso ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950">¡Oferta Publicada con Éxito!</h3>
                <p className="text-xs text-zinc-600">Tu vacante ya está visible en la Bolsa de Empleo de AGROPACCIOLI.</p>
              </div>
            ) : (
              <form onSubmit={handleCrearEmpleo} className="mt-5 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Título de la Vacante *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Mayordomo Ganadero, Recolectores de Café"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Nombre de Finca / Empresa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Finca La Esperanza, Hacienda Los Robles"
                      value={formData.empresaOFinca}
                      onChange={(e) => setFormData({ ...formData, empresaOFinca: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Sector Productivo *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value as any })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="agricola">🟢 Agrícola (Cosechas/Frutas)</option>
                      <option value="ganadero">🟠 Ganadero (Bovinos/Lechería)</option>
                      <option value="acuicola">🔵 Acuícola (Piscicultura)</option>
                      <option value="profesional">🟣 Técnico / Agrónomo</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Tipo de Contrato *</label>
                    <select
                      value={formData.tipoContrato}
                      onChange={(e) => setFormData({ ...formData, tipoContrato: e.target.value as any })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="mensual">Mensual Fijo</option>
                      <option value="jornal">Jornal Diario</option>
                      <option value="temporada">Por Cosecha</option>
                      <option value="prestacion_servicios">Prestación de Servicios</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">N° de Vacantes *</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.vacantesDisponibles}
                      onChange={(e) => setFormData({ ...formData, vacantesDisponibles: Number(e.target.value) })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Departamento *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Antioquia, Huila, Meta"
                      value={formData.departamento}
                      onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Municipio *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Sonsón, Pitalito"
                      value={formData.municipio}
                      onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Vereda / Sector</label>
                    <input
                      type="text"
                      placeholder="Ej: Vereda La Soledad"
                      value={formData.vereda}
                      onChange={(e) => setFormData({ ...formData, vereda: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Salario o Jornal Ofrecido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: $2.400.000 COP / mes o $70.000 COP / jornal"
                      value={formData.salarioTexto}
                      onChange={(e) => setFormData({ ...formData, salarioTexto: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.incluyeVivienda}
                        onChange={(e) => setFormData({ ...formData, incluyeVivienda: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="font-bold text-zinc-800">🏡 Incluye Vivienda</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.incluyeAlimentacion}
                        onChange={(e) => setFormData({ ...formData, incluyeAlimentacion: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="font-bold text-zinc-800">🍲 Incluye Alimentación</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-zinc-700 mb-1 block">Descripción del Trabajo y Funciones *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe las labores a realizar en la finca, horario, condiciones del predio..."
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full border border-emerald-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Requisitos (Separados por coma)</label>
                    <input
                      type="text"
                      placeholder="Ej: Experiencia en ordeño, Saber podar, Documento al día"
                      value={formData.requisitos}
                      onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 mb-1 block">Beneficios (Separados por coma)</label>
                    <input
                      type="text"
                      placeholder="Ej: Bonos por cosecha, Dotación, Pago semanal"
                      value={formData.beneficios}
                      onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
                      className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                  <div>
                    <label className="font-bold text-emerald-950 mb-1 block">Nombre de Contacto *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Don Carlos Ramírez"
                      value={formData.contactoNombre}
                      onChange={(e) => setFormData({ ...formData, contactoNombre: e.target.value })}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-emerald-950 mb-1 block">WhatsApp (Con código país) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: 573114567890"
                      value={formData.contactoWhatsapp}
                      onChange={(e) => setFormData({ ...formData, contactoWhatsapp: e.target.value })}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-emerald-950 mb-1 block">Teléfono de Llamadas</label>
                    <input
                      type="text"
                      placeholder="Ej: +573114567890"
                      value={formData.contactoTelefono}
                      onChange={(e) => setFormData({ ...formData, contactoTelefono: e.target.value })}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModalPublicar(false)}
                    className="px-5 py-2.5 rounded-xl border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    Publicar Vacante Ahora
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
