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
  Calendar,
  Flag,
  Check,
  Star,
  Lock,
  Truck,
  Building,
  HelpCircle,
  Eye,
  Flame,
  ArrowRight
} from 'lucide-react';
import { EMPLEOS_DATA, POSTULACIONES_MOCK_DATA, TEMPORADAS_COSECHA_DATA } from '@/lib/agro-data';
import { 
  EmpleoItem, 
  PostulacionItem, 
  AreaTrabajo, 
  CargoAgro, 
  ModalidadEmpleo, 
  CosechaEspecifica, 
  TipoContrato,
  EstadoOfertaEmpleo
} from '@/types/agro';
import TemporadasCosechaWidget from './TemporadasCosechaWidget';
import ModalPostulacion from './ModalPostulacion';
import ModalDenunciaOferta from './ModalDenunciaOferta';

export default function BolsaEmpleosViewer() {
  const [empleos, setEmpleos] = useState<EmpleoItem[]>(EMPLEOS_DATA);
  const [postulaciones, setPostulaciones] = useState<PostulacionItem[]>(POSTULACIONES_MOCK_DATA);

  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState<string>('todos');
  const [areaFiltro, setAreaFiltro] = useState<string>('todos');
  const [cargoFiltro, setCargoFiltro] = useState<string>('todos');
  const [modalidadFiltro, setModalidadFiltro] = useState<string>('todos');
  const [cosechaFiltro, setCosechaFiltro] = useState<string>('todos');
  const [alojamientoFiltro, setAlojamientoFiltro] = useState<string>('todos');
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos');

  // Modales
  const [empleoParaPostular, setEmpleoParaPostular] = useState<EmpleoItem | null>(null);
  const [empleoParaDenunciar, setEmpleoParaDenunciar] = useState<EmpleoItem | null>(null);
  const [empleoDetalle, setEmpleoDetalle] = useState<EmpleoItem | null>(null);
  const [showModalPublicar, setShowModalPublicar] = useState(false);
  const [publicadoExitoso, setPublicadoExitoso] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Formulario en 5 Pasos
  const [formData, setFormData] = useState({
    // Paso 1: Datos Empleador
    empresaOFinca: '',
    responsable: '',
    departamento: 'Antioquia',
    municipio: '',
    vereda: '',
    confidencial: false,

    // Paso 2: Puesto y Condiciones
    titulo: '',
    areaTrabajo: 'agricultura' as AreaTrabajo,
    cargoTipo: 'Jornalero' as CargoAgro,
    cosechaEspecifica: 'cafe' as CosechaEspecifica,
    tipoContrato: 'temporada' as TipoContrato,
    modalidad: 'Temporal / Por Temporada' as ModalidadEmpleo,
    duracionEstimada: '3 meses',
    fechaInicio: 'Inmediata',
    vacantesDisponibles: 10,
    descripcion: '',

    // Paso 3: Remuneración y Beneficios
    salarioTexto: '$75.000 / día + alimentación',
    salarioNumerico: 75000,
    incluyeAlimentacion: true,
    incluyeVivienda: true,
    incluyeTransporte: true,

    // Paso 4: Requisitos
    experienciaRequerida: '1 año en labores de campo',
    edadMinima: 18,
    documentos: 'Cédula de ciudadanía',

    // Paso 5: Contacto y Cierre
    contactoNombre: '',
    contactoTelefono: '',
    contactoWhatsapp: '',
    fechaLimite: '2026-10-15'
  });

  // Departamentos únicos para el selector
  const departamentos = Array.from(new Set(empleos.map(e => e.departamento))).sort();

  // Filtrado reactivo de ofertas
  const filtrados = empleos.filter(item => {
    const matchText = 
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.empresaOFinca.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.municipio.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.departamento.toLowerCase().includes(busqueda.toLowerCase());

    const matchRegion = regionFiltro === 'todos' || item.departamento === regionFiltro;
    const matchArea = areaFiltro === 'todos' || item.areaTrabajo === areaFiltro || item.sector === areaFiltro;
    const matchCargo = cargoFiltro === 'todos' || item.cargoTipo === cargoFiltro || item.cargo.toLowerCase().includes(cargoFiltro.toLowerCase());
    const matchModalidad = modalidadFiltro === 'todos' || item.tipoContrato === modalidadFiltro || item.modalidad === modalidadFiltro;
    const matchCosecha = cosechaFiltro === 'todos' || item.cosechaEspecifica === cosechaFiltro;
    
    let matchAlojamiento = true;
    if (alojamientoFiltro === 'con_alojamiento') matchAlojamiento = item.incluyeVivienda === true;
    if (alojamientoFiltro === 'sin_alojamiento') matchAlojamiento = item.incluyeVivienda === false;

    const matchEstado = estadoFiltro === 'todos' || (item.estado || 'activa') === estadoFiltro;

    return matchText && matchRegion && matchArea && matchCargo && matchModalidad && matchCosecha && matchAlojamiento && matchEstado;
  });

  const handlePostulacionSubmit = (postulacion: PostulacionItem) => {
    setPostulaciones([postulacion, ...postulaciones]);
    setEmpleoParaPostular(null);
    alert(`¡Postulación registrada con éxito! El empleador de ${postulacion.ofertaTitulo} ha sido notificado.`);
  };

  const handleCrearOferta = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoEmpleo: EmpleoItem = {
      id: `emp-${Date.now()}`,
      titulo: formData.titulo,
      empresaOFinca: formData.confidencial ? 'Finca Certificada (Confidencial)' : formData.empresaOFinca,
      sector: formData.areaTrabajo === 'ganaderia' ? 'ganadero' : formData.areaTrabajo === 'acuicultura' ? 'acuicola' : 'agricola',
      areaTrabajo: formData.areaTrabajo,
      cargo: formData.titulo,
      cargoTipo: formData.cargoTipo,
      tipoContrato: formData.tipoContrato,
      modalidad: formData.modalidad,
      cosechaEspecifica: formData.cosechaEspecifica,
      departamento: formData.departamento,
      municipio: formData.municipio || 'Cabecera Municipal',
      vereda: formData.vereda || 'Zona Rural',
      salarioTexto: formData.salarioTexto,
      salarioNumerico: Number(formData.salarioNumerico),
      incluyeVivienda: formData.incluyeVivienda,
      incluyeAlimentacion: formData.incluyeAlimentacion,
      incluyeTransporte: formData.incluyeTransporte,
      vacantesDisponibles: Number(formData.vacantesDisponibles),
      experienciaRequerida: formData.experienciaRequerida,
      descripcion: formData.descripcion || 'Labores agropecuarias en predio tecnificado.',
      requisitos: [formData.experienciaRequerida, `Edad mínima: ${formData.edadMinima} años`, formData.documentos],
      beneficios: [
        formData.incluyeVivienda ? 'Alojamiento en finca' : 'Sin alojamiento',
        formData.incluyeAlimentacion ? 'Alimentación incluida' : '',
        formData.incluyeTransporte ? 'Ruta de transporte veredal' : ''
      ].filter(Boolean),
      contactoNombre: formData.responsable || 'Administrador',
      contactoTelefono: formData.contactoTelefono || '+573110000000',
      contactoWhatsapp: (formData.contactoWhatsapp || '573110000000').replace(/\D/g, ''),
      fechaPublicacion: '21/09/2026',
      fechaInicio: formData.fechaInicio,
      duracionEstimada: formData.duracionEstimada,
      fechaLimite: formData.fechaLimite,
      verificadoKYC: true,
      estado: 'activa',
      postulacionesRecibidas: 0,
      calificacionEmpleador: 4.9,
      urgente: true,
      confidencial: formData.confidencial
    };

    setEmpleos([nuevoEmpleo, ...empleos]);
    setPublicadoExitoso(true);
    setTimeout(() => {
      setPublicadoExitoso(false);
      setShowModalPublicar(false);
      setCurrentStep(1);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Portada de la Bolsa de Trabajo */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-green-900 text-white py-12 px-4 border-b border-emerald-700/60 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-200 text-xs font-black uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                <span>FASE 3 — BOLSA DE TRABAJO AGROPECUARIA DE COLOMBIA</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                🌾 Bolsa de Trabajo Agropecuaria
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Encuentra personal o empleo en el campo colombiano, verificado y confiable. Conectamos jornaleros, cuadrillas de recolección, técnicos y veterinarios con fincas de todo el país.
              </p>
            </div>

            <button
              onClick={() => setShowModalPublicar(true)}
              className="self-start md:self-center inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 text-emerald-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-950/30 text-sm transition-all hover:scale-105 shrink-0"
            >
              <PlusCircle className="w-5 h-5 text-emerald-950" />
              <span>Publicar Oferta — Gratis (KYC)</span>
            </button>
          </div>

          {/* Contadores en Vivo */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-emerald-700/50 text-xs">
            <div className="flex items-center gap-2 bg-emerald-950/50 px-3.5 py-1.5 rounded-xl border border-emerald-600/40">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>🟢 Ofertas Activas: <strong className="text-white text-sm">47</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/50 px-3.5 py-1.5 rounded-xl border border-emerald-600/40">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>🟡 Postulaciones Recibidas: <strong className="text-white text-sm">128</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/50 px-3.5 py-1.5 rounded-xl border border-emerald-600/40">
              <Users className="w-3.5 h-3.5 text-green-300" />
              <span>👥 Vacantes Totales: <strong className="text-green-300 text-sm">650+ Puestos</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenedor Principal */}
      <div className="container mx-auto max-w-6xl px-4 -mt-6 relative z-20">
        {/* Buscador y Filtros Detallados */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Input de Búsqueda */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por puesto, cultivo, finca o municipio..."
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            {/* Región / Departamento */}
            <div className="md:col-span-2">
              <select
                value={regionFiltro}
                onChange={(e) => setRegionFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">📍 Región: Todas</option>
                {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Área de Trabajo */}
            <div className="md:col-span-2">
              <select
                value={areaFiltro}
                onChange={(e) => setAreaFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">🏷️ Área: Todas</option>
                <option value="agricultura">Agricultura</option>
                <option value="ganaderia">Ganadería</option>
                <option value="acuicultura">Acuicultura</option>
                <option value="logistica">Logística / Carga</option>
                <option value="tecnica_asistencia">Técnica / Agrónomos</option>
                <option value="administracion">Administración</option>
              </select>
            </div>

            {/* Cargo / Función */}
            <div className="md:col-span-2">
              <select
                value={cargoFiltro}
                onChange={(e) => setCargoFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">👔 Cargo: Todos</option>
                <option value="Jornalero">Jornalero / Recolector</option>
                <option value="Capataz">Capataz / Mayordomo</option>
                <option value="Técnico Agrónomo">Técnico Agrónomo</option>
                <option value="Médico Veterinario">Médico Veterinario</option>
                <option value="Operario">Operario Maquinaria</option>
                <option value="Conductor">Conductor</option>
              </select>
            </div>

            {/* Modalidad */}
            <div className="md:col-span-2">
              <select
                value={modalidadFiltro}
                onChange={(e) => setModalidadFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-2xl px-3 py-3 text-xs text-zinc-700 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="todos">⏳ Tipo: Todos</option>
                <option value="temporada">Temporal / Cosecha</option>
                <option value="jornal">Jornal Diario</option>
                <option value="mensual">Tiempo Completo</option>
                <option value="prestacion_servicios">Por Obra / Servicios</option>
              </select>
            </div>
          </div>

          {/* Segunda fila de filtros: Cosecha específica + Alojamiento + Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-100 text-xs">
            <div>
              <label className="text-[11px] font-bold text-zinc-500 mb-1 block">Cosecha Específica:</label>
              <select
                value={cosechaFiltro}
                onChange={(e) => setCosechaFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-medium outline-none"
              >
                <option value="todos">🌾 Todos los cultivos</option>
                <option value="cafe">☕ Café Especial</option>
                <option value="aguacate">🥑 Aguacate Hass</option>
                <option value="cacao">🍫 Cacao Criollo</option>
                <option value="platano_frutas">🍌 Plátano & Frutas</option>
                <option value="cana">🎋 Caña de Azúcar</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-500 mb-1 block">Alojamiento / Vivienda:</label>
              <select
                value={alojamientoFiltro}
                onChange={(e) => setAlojamientoFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-medium outline-none"
              >
                <option value="todos">Indiferente</option>
                <option value="con_alojamiento">🏡 Con Alojamiento Incluido</option>
                <option value="sin_alojamiento">Sin Alojamiento</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-500 mb-1 block">Estado de la Vacante:</label>
              <select
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
                className="w-full bg-zinc-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-medium outline-none"
              >
                <option value="todos">Todos los estados</option>
                <option value="activa">🟢 Activas (Recibiendo)</option>
                <option value="en_proceso">🟠 En Proceso</option>
                <option value="ocupada">🔴 Ocupadas (Historial)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Widget Especial: Temporadas de Cosecha */}
        <TemporadasCosechaWidget 
          onSelectCosecha={(slug) => setCosechaFiltro(slug)}
          selectedCosecha={cosechaFiltro}
        />

        {/* Listado de Ofertas de Trabajo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-emerald-950">
              Ofertas de Empleo Disponibles ({filtrados.length})
            </h2>
            <div className="text-xs text-zinc-500">
              Ordenadas por fecha y temporada
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtrados.map((item) => {
              const estado = item.estado || 'activa';
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header de la tarjeta con Estado */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {estado === 'activa' && (
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            🟢 ACTIVA
                          </span>
                        )}
                        {estado === 'en_proceso' && (
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                            🟠 EN PROCESO
                          </span>
                        )}
                        {estado === 'ocupada' && (
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                            🔴 OCUPADA
                          </span>
                        )}
                        {item.urgente && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white">
                            URGENTE
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setEmpleoParaDenunciar(item)}
                        className="text-zinc-400 hover:text-rose-600 text-[10px] flex items-center gap-0.5"
                        title="Denunciar oferta fraudulenta"
                      >
                        <Flag className="w-3 h-3" />
                      </button>
                    </div>

                    <h3 className="font-bold text-emerald-950 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {item.titulo}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 mt-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.empresaOFinca}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item.municipio}, {item.departamento} ({item.vereda || 'Rural'})</span>
                    </div>

                    {/* Bloque Salarial y Beneficios */}
                    <div className="mt-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                      <div className="text-[10px] text-zinc-500">Compensación Ofrecida:</div>
                      <div className="text-sm font-black text-emerald-950 mt-0.5">
                        {item.salarioTexto}
                      </div>
                    </div>

                    {/* Badges de Beneficios */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.incluyeVivienda && (
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <Home className="w-3 h-3 text-amber-600" />
                          <span>Con Alojamiento</span>
                        </span>
                      )}
                      {item.incluyeAlimentacion && (
                        <span className="text-[10px] font-bold bg-green-50 text-green-900 border border-green-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-green-600" />
                          <span>Alimentación</span>
                        </span>
                      )}
                      <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-lg">
                        👥 Vacantes: {item.vacantesDisponibles}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 mt-3 line-clamp-2 leading-relaxed">
                      {item.descripcion}
                    </p>
                  </div>

                  {/* Botones de Acción */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center gap-2">
                    <button
                      onClick={() => setEmpleoDetalle(item)}
                      className="px-3 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl text-xs transition-colors"
                    >
                      Detalles
                    </button>

                    <button
                      onClick={() => setEmpleoParaPostular(item)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:shadow-emerald-600/30"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Postularme</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Publicación en 5 Pasos para Empleadores */}
      {showModalPublicar && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Publicación Verificada KYC • Paso {currentStep} de 5</span>
                </div>
                <h2 className="text-xl font-black text-emerald-950">
                  Publicar Oferta de Trabajo Rural
                </h2>
              </div>
              <button onClick={() => setShowModalPublicar(false)} className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Visual */}
            <div className="grid grid-cols-5 gap-1 my-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all ${
                    step <= currentStep ? 'bg-emerald-600' : 'bg-zinc-200'
                  }`}
                />
              ))}
            </div>

            {publicadoExitoso ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950">¡Oferta Publicada con Éxito!</h3>
                <p className="text-xs text-zinc-600">
                  Tu oferta está activa y comenzará a recibir postulaciones verificadas de trabajadores de la región.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCrearOferta} className="mt-4 space-y-4 text-xs">
                {/* PASO 1: Datos del Empleador */}
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-emerald-950 text-sm">1. Datos del Empleador y Predio</h3>
                    
                    <div>
                      <label className="font-bold text-zinc-700 mb-1 block">Nombre de la Finca, Hacienda o Empresa *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Hacienda El Cafetal, Agropecuaria La Pradera"
                        value={formData.empresaOFinca}
                        onChange={(e) => setFormData({ ...formData, empresaOFinca: e.target.value })}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-700 mb-1 block">Responsable de Contratación *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Don Carlos Ramírez (Administrador)"
                        value={formData.responsable}
                        onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Departamento *</label>
                        <input
                          type="text"
                          required
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
                          placeholder="Ej: Pitalito"
                          value={formData.municipio}
                          onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Vereda</label>
                        <input
                          type="text"
                          placeholder="Ej: Vereda Criollo"
                          value={formData.vereda}
                          onChange={(e) => setFormData({ ...formData, vereda: e.target.value })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.confidencial}
                        onChange={(e) => setFormData({ ...formData, confidencial: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="font-bold text-zinc-800">
                        🔒 Oferta confidencial (No mostrar el nombre exacto de la finca públicamente)
                      </span>
                    </label>
                  </div>
                )}

                {/* PASO 2: Puesto y Condiciones */}
                {currentStep === 2 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-emerald-950 text-sm">2. Puesto y Condiciones de Trabajo</h3>

                    <div>
                      <label className="font-bold text-zinc-700 mb-1 block">Título del Puesto *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Recolectores de Café Especial, Mayordomo Ganadero"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Área de Trabajo *</label>
                        <select
                          value={formData.areaTrabajo}
                          onChange={(e) => setFormData({ ...formData, areaTrabajo: e.target.value as any })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none bg-white font-medium"
                        >
                          <option value="agricultura">Agricultura (Cultivos)</option>
                          <option value="ganaderia">Ganadería (Bovinos/Lechería)</option>
                          <option value="acuicultura">Acuicultura (Piscicultura)</option>
                          <option value="logistica">Logística y Carga</option>
                          <option value="tecnica_asistencia">Asistencia Agronómica</option>
                          <option value="administracion">Administración de Campo</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Cosecha Específica</label>
                        <select
                          value={formData.cosechaEspecifica}
                          onChange={(e) => setFormData({ ...formData, cosechaEspecifica: e.target.value as any })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none bg-white font-medium"
                        >
                          <option value="cafe">Café Especial</option>
                          <option value="aguacate">Aguacate Hass</option>
                          <option value="cacao">Cacao Criollo</option>
                          <option value="platano_frutas">Plátano / Frutales</option>
                          <option value="cana">Caña de Azúcar</option>
                          <option value="cultivos_varios">Cultivos Varios</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Modalidad de Contrato *</label>
                        <select
                          value={formData.modalidad}
                          onChange={(e) => setFormData({ ...formData, modalidad: e.target.value as any })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none bg-white font-medium"
                        >
                          <option value="Temporal / Por Temporada">Temporal / Por Cosecha</option>
                          <option value="Jornal">Jornal Diario</option>
                          <option value="Tiempo Completo">Tiempo Completo</option>
                          <option value="Por Obra">Por Obra / Labor</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Duración Estimada</label>
                        <input
                          type="text"
                          placeholder="Ej: 3 meses, Oct-Dic"
                          value={formData.duracionEstimada}
                          onChange={(e) => setFormData({ ...formData, duracionEstimada: e.target.value })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">N° de Vacantes *</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={formData.vacantesDisponibles}
                          onChange={(e) => setFormData({ ...formData, vacantesDisponibles: Number(e.target.value) })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-zinc-700 mb-1 block">Descripción de Labores y Funciones *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detalla las actividades diarias en la finca..."
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        className="w-full border border-emerald-300 rounded-xl p-3 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* PASO 3: Remuneración y Beneficios */}
                {currentStep === 3 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-emerald-950 text-sm">3. Remuneración y Beneficios Ofrecidos</h3>

                    <div>
                      <label className="font-bold text-zinc-700 mb-1 block">Salario / Jornal Ofrecido *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: $75.000 / día + alimentación o $2.500.000 / mes"
                        value={formData.salarioTexto}
                        onChange={(e) => setFormData({ ...formData, salarioTexto: e.target.value })}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none font-bold text-emerald-950"
                      />
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.incluyeVivienda}
                          onChange={(e) => setFormData({ ...formData, incluyeVivienda: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className="font-bold text-zinc-800">🏡 Incluye Alojamiento / Vivienda en la Finca</span>
                      </label>

                      <label className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.incluyeAlimentacion}
                          onChange={(e) => setFormData({ ...formData, incluyeAlimentacion: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className="font-bold text-zinc-800">🍲 Incluye Alimentación Completa</span>
                      </label>

                      <label className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.incluyeTransporte}
                          onChange={(e) => setFormData({ ...formData, incluyeTransporte: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className="font-bold text-zinc-800">🚌 Ruta de Transporte Veredal</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* PASO 4: Requisitos */}
                {currentStep === 4 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-emerald-950 text-sm">4. Requisitos para Postularse</h3>

                    <div>
                      <label className="font-bold text-zinc-700 mb-1 block">Experiencia Solicitada *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Mínimo 1 año o 2 temporadas en café"
                        value={formData.experienciaRequerida}
                        onChange={(e) => setFormData({ ...formData, experienciaRequerida: e.target.value })}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Edad Mínima</label>
                        <input
                          type="number"
                          min="18"
                          value={formData.edadMinima}
                          onChange={(e) => setFormData({ ...formData, edadMinima: Number(e.target.value) })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Documentos Requeridos</label>
                        <input
                          type="text"
                          value={formData.documentos}
                          onChange={(e) => setFormData({ ...formData, documentos: e.target.value })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PASO 5: Contacto y Cierre */}
                {currentStep === 5 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-emerald-950 text-sm">5. Contacto y Cierre de la Oferta</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">WhatsApp de Contacto Directo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 573123456789"
                          value={formData.contactoWhatsapp}
                          onChange={(e) => setFormData({ ...formData, contactoWhatsapp: e.target.value })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none font-bold"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 mb-1 block">Fecha Límite para Recibir Postulaciones</label>
                        <input
                          type="date"
                          value={formData.fechaLimite}
                          onChange={(e) => setFormData({ ...formData, fechaLimite: e.target.value })}
                          className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                      🔒 <strong>Garantía de Calidad AGROPACCIOLI:</strong> Tu oferta quedará vinculada a tu cuenta verificada KYC, generando confianza en los trabajadores y cuadrillas de la región.
                    </div>
                  </div>
                )}

                {/* Botones de Navegación del Stepper */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-4 py-2 rounded-xl border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100"
                    >
                      ← Anterior
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md"
                    >
                      Siguiente →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg"
                    >
                      ✅ Publicar Oferta Oficial
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal de Postulación para Trabajadores */}
      {empleoParaPostular && (
        <ModalPostulacion
          empleo={empleoParaPostular}
          onClose={() => setEmpleoParaPostular(null)}
          onSubmit={handlePostulacionSubmit}
        />
      )}

      {/* Modal de Denuncia Anti-Fraude */}
      {empleoParaDenunciar && (
        <ModalDenunciaOferta
          empleo={empleoParaDenunciar}
          onClose={() => setEmpleoParaDenunciar(null)}
        />
      )}

      {/* Modal de Detalle */}
      {empleoDetalle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  {empleoDetalle.areaTrabajo || empleoDetalle.sector} • {empleoDetalle.modalidad || empleoDetalle.tipoContrato}
                </span>
                <h2 className="text-xl font-black text-emerald-950 mt-1">{empleoDetalle.titulo}</h2>
                <p className="text-xs text-zinc-500">{empleoDetalle.empresaOFinca} • {empleoDetalle.municipio}, {empleoDetalle.departamento}</p>
              </div>
              <button onClick={() => setEmpleoDetalle(null)} className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 my-4 space-y-1">
              <div className="text-[11px] text-zinc-600">Compensación:</div>
              <div className="text-base font-black text-emerald-950">{empleoDetalle.salarioTexto}</div>
              <div className="text-xs text-zinc-500">Vacantes: {empleoDetalle.vacantesDisponibles} personas</div>
            </div>

            <div className="text-xs text-zinc-700 space-y-3 leading-relaxed">
              <div>
                <h4 className="font-bold text-emerald-950 mb-1">Descripción:</h4>
                <p>{empleoDetalle.descripcion}</p>
              </div>

              <div>
                <h4 className="font-bold text-emerald-950 mb-1">Requisitos:</h4>
                <ul className="list-disc pl-4 space-y-0.5 text-zinc-600">
                  {empleoDetalle.requisitos.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-emerald-950 mb-1">Beneficios:</h4>
                <ul className="list-disc pl-4 space-y-0.5 text-zinc-600">
                  {empleoDetalle.beneficios.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button onClick={() => setEmpleoDetalle(null)} className="px-4 py-2 text-xs font-bold text-zinc-600">
                Cerrar
              </button>
              <button
                onClick={() => {
                  setEmpleoParaPostular(empleoDetalle);
                  setEmpleoDetalle(null);
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md"
              >
                Postularme Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
