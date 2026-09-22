export type SectorType = 'agricola' | 'ganadero' | 'acuicola';

export type EstadoLote = 'disponible' | 'en_negociacion' | 'reservado' | 'vendido';

export interface CosechaItem {
  id: string;
  titulo: string;
  sector: SectorType;
  categoria: string;
  variedad: string;
  cantidadDisponible: number;
  unidad: 'Kg' | 'Toneladas' | 'Cabezas' | 'Bultos' | 'Cargas';
  precioUnitario: number;
  moneda: 'COP';
  departamento: string;
  municipio: string;
  vereda?: string;
  coordenadas: [number, number];
  productor: {
    nombre: string;
    finca: string;
    verificadoKYC: boolean;
    calificacion: number;
    telefono: string;
    whatsapp: string;
    experienciaAnos: number;
    enLinea?: boolean;
  };
  fechaCosechaEstimada: string;
  fechaPublicacion: string;
  imagenes: string[];
  descripcion: string;
  certificaciones?: string[];
  estado?: EstadoLote;
  propuestasPendientes?: number;
}

export type EstadoPropuesta = 'pendiente' | 'contraofertada' | 'aceptada' | 'rechazada' | 'cerrada_vendida';

export interface PropuestaFormal {
  id: string;
  loteId: string;
  loteTitulo: string;
  compradorId: string;
  compradorNombre: string;
  compradorKYC: boolean;
  productorId: string;
  productorNombre: string;
  productorFinca: string;
  cantidadDeseada: number;
  unidad: 'Kg' | 'Toneladas' | 'Cabezas' | 'Bultos' | 'Cargas';
  precioOfrecidoUnitario: number;
  precioTotalEstimado: number;
  fechaEntregaDeseada: string;
  lugarEntrega: 'En finca del productor' | 'Transporte a cargo del comprador' | 'Centro de acopio / Bodega convenida' | string;
  comentarios?: string;
  estado: EstadoPropuesta;
  contraoferta?: {
    cantidad: number;
    precioUnitario: number;
    fechaEntrega: string;
    comentarios?: string;
    fechaContraoferta: string;
  };
  fechaCreacion: string;
  estampaTiempoIso: string;
  hashIntegridadLegal: string;
  calificacionComprador?: { estrellas: number; comentario: string };
  calificacionProductor?: { estrellas: number; comentario: string };
}

export interface ChatMessage {
  id: string;
  conversacionId: string;
  remitente: 'comprador' | 'productor' | 'sistema';
  remitenteNombre: string;
  texto: string;
  timestamp: string;
  leido: boolean;
  tipo: 'texto' | 'propuesta' | 'contraoferta' | 'aceptacion' | 'rechazo' | 'sistema';
  propuestaId?: string;
  propuestaData?: Partial<PropuestaFormal>;
}

export interface Conversacion {
  id: string;
  loteId: string;
  loteTitulo: string;
  loteImagen: string;
  loteEstado: EstadoLote;
  comprador: {
    id: string;
    nombre: string;
    verificadoKYC: boolean;
    transaccionesPrevias: number;
    calificacion: number;
  };
  productor: {
    id: string;
    nombre: string;
    finca: string;
    municipio: string;
    departamento: string;
    verificadoKYC: boolean;
    calificacion: number;
    activoHoy: boolean;
  };
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  mensajesNoLeidos: number;
  propuestaActivaId?: string;
  mensajes: ChatMessage[];
}

export interface PrecioMercado {
  id: string;
  producto: string;
  sector: SectorType;
  mercado: string;
  departamento: string;
  precioPromedio: number;
  precioMin: number;
  precioMax: number;
  unidad: string;
  variacion24h: number;
  tendencia: 'alza' | 'baja' | 'estable';
  fechaActualizacion: string;
  fuente: 'SIPSA / DANE' | 'FEDEGAN' | 'FEDEACUA' | 'FNC' | 'AGROPACCIOLI Direct';
}

export interface AlmacenInsumos {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  nit: string;
  verificadoKYC: boolean;
  destacado: boolean;
  sectorEspecialidad: ('agricola' | 'ganadero' | 'acuicola')[];
  departamento: string;
  municipio: string;
  direccion: string;
  telefono: string;
  whatsapp: string;
  email: string;
  logo: string;
  banner: string;
  calificacion: number;
  catalogoDestacado: {
    nombre: string;
    categoria: string;
    precio: number;
    unidad: string;
    imagen: string;
    enStock: boolean;
  }[];
  planesDisponibles: string[];
}

export interface Transportista {
  id: string;
  nombre: string;
  tipoVehiculo: string;
  capacidadToneladas: number;
  departamentoBase: string;
  municipioBase: string;
  rutasFrecuentes: string[];
  verificadoKYC: boolean;
  calificacion: number;
  viajesCompletados: number;
  telefono: string;
  whatsapp: string;
  tarifaBaseKm: number;
  disponibleInmediato: boolean;
  fotoVehiculo: string;
}

export interface Agremiacion {
  id: string;
  nombre: string;
  sigla: string;
  tipo: string;
  cobertura: string;
  afiliados: number;
  programasApoyo: string[];
  contacto: string;
  web?: string;
  logo: string;
  descripcion: string;
}

export interface NoticiaAgraria {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: string;
  autor: string;
  fecha: string;
  imagen: string;
  destacada: boolean;
  fuenteOficial: string;
}

// ==================== FASE 3: BOLSA DE TRABAJO AGROPECUARIA ====================

export type EstadoOfertaEmpleo = 'activa' | 'cerrada' | 'en_proceso' | 'ocupada' | 'vencida';

export type AreaTrabajo = 
  | 'agricultura' 
  | 'ganaderia' 
  | 'acuicultura' 
  | 'logistica' 
  | 'tecnica_asistencia' 
  | 'administracion';

export type CargoAgro = 
  | 'Jornalero' 
  | 'Capataz' 
  | 'Técnico Agrónomo' 
  | 'Médico Veterinario' 
  | 'Conductor' 
  | 'Administrativo' 
  | 'Operario' 
  | 'Otro';

export type ModalidadEmpleo = 
  | 'Tiempo Completo' 
  | 'Temporal / Por Temporada' 
  | 'Jornal' 
  | 'Medio Tiempo' 
  | 'Por Obra';

export type CosechaEspecifica = 
  | 'cafe' 
  | 'aguacate' 
  | 'cacao' 
  | 'cana' 
  | 'platano_frutas' 
  | 'cultivos_varios' 
  | 'ganaderia' 
  | 'acuicultura';

export type TipoContrato = 'jornal' | 'mensual' | 'temporada' | 'prestacion_servicios';

export interface EmpleoItem {
  id: string;
  titulo: string;
  empresaOFinca: string;
  sector: SectorType | 'profesional';
  areaTrabajo?: AreaTrabajo;
  cargo: string;
  cargoTipo?: CargoAgro;
  tipoContrato: TipoContrato;
  modalidad?: ModalidadEmpleo;
  cosechaEspecifica?: CosechaEspecifica;
  departamento: string;
  municipio: string;
  vereda?: string;
  salarioTexto: string;
  salarioNumerico?: number;
  incluyeVivienda: boolean;
  incluyeAlimentacion: boolean;
  incluyeTransporte?: boolean;
  vacantesDisponibles: number;
  experienciaRequerida: string;
  descripcion: string;
  requisitos: string[];
  beneficios: string[];
  contactoNombre: string;
  contactoTelefono: string;
  contactoWhatsapp: string;
  fechaPublicacion: string;
  fechaInicio?: string;
  duracionEstimada?: string;
  fechaLimite?: string;
  verificadoKYC: boolean;
  estado?: EstadoOfertaEmpleo;
  postulacionesRecibidas?: number;
  calificacionEmpleador?: number;
  urgente?: boolean;
  confidencial?: boolean;
}

export interface PostulacionItem {
  id: string;
  ofertaId: string;
  ofertaTitulo: string;
  postulante: {
    nombre: string;
    telefono: string;
    whatsapp: string;
    departamento: string;
    municipio: string;
    calificacion: number;
    trabajosCompletados: number;
    experienciaResumen: string[];
    calendarioDisponible: string;
    requiereAlojamiento: boolean;
  };
  mensaje: string;
  fechaPostulacion: string;
  estado: 'enviada' | 'en_revision' | 'aceptada' | 'favorito' | 'rechazada';
}

export interface TemporadaCosecha {
  id: string;
  nombre: string;
  cultivo: string;
  region: string;
  meses: string;
  ofertasActivas: number;
  vacantesTotales: number;
  imagen: string;
  cosechaSlug: CosechaEspecifica;
}


// ==================== FASE 4: INTELIGENCIA Y ALERTAS + CIERRE DE PLATAFORMA ====================

export type RolAlerta = 'comprador' | 'productor' | 'buscador_empleo';

export interface PreferenciaAlertas {
  id: string;
  usuarioId: string;
  rolPrincipal: RolAlerta;
  canales: {
    inApp: boolean;
    email: boolean;
    whatsapp: boolean;
    telefonoWhatsapp?: string;
    emailDestino?: string;
  };
  compradorFiltros: {
    aguacateHass: boolean;
    cafeEspecial: boolean;
    papaParamo: boolean;
    cacaoFino: boolean;
    tilapia: boolean;
    trmVariacion2Porciento: boolean;
    regionesInteres: string[];
  };
  productorFiltros: {
    cafeVariacion3Porciento: boolean;
    precioDaneSipsaCambie: boolean;
    notificarCompradoresBuscandoMiCosecha: boolean;
    nuevaOfertaTransporteEnRegion: boolean;
    alertaClimaFinca: boolean;
  };
  empleoFiltros: {
    recoleccionValle: boolean;
    aguacateCaldas: boolean;
    conAlojamiento: boolean;
    departamentosInteres: string[];
  };
  frecuenciaResumenEmail: 'inmediato' | 'diario' | 'semanal';
}

export interface AlertaNotificacionItem {
  id: string;
  tipo: 'lote_nuevo' | 'cambio_precio' | 'clima_alerta' | 'trm_cambio' | 'nueva_postulacion' | 'transporte_disponible' | 'recordatorio_favorito' | 'propuesta_recibida';
  titulo: string;
  descripcion: string;
  detallesTexto?: string;
  cultivoOCategoria?: string;
  region?: string;
  precioRef?: string;
  enlace: string;
  enlaceTexto: string;
  timestamp: string;
  leido: boolean;
  prioridad: 'alta' | 'media' | 'baja';
  icono?: string;
  tiempoLimiteHoras?: number;
}

export interface TendenciaMercadoItem {
  id: string;
  producto: string;
  icono: string;
  variacionPorcentaje: number;
  tipoTendencia: 'alza' | 'baja' | 'estable';
  precioActual: string;
  unidad: string;
  resumen: string;
  recomendacion: string;
  accionRecomendada: 'vender' | 'esperar' | 'comprar' | 'ajustar_siembra';
}

export interface HistoricoPrecioPunto {
  mes: string;
  precioPromedio: number;
  volumenToneladas?: number;
}

export interface HistoricoPrecioProducto {
  id: string;
  producto: string;
  unidad: string;
  puntos3Meses: HistoricoPrecioPunto[];
  puntos6Meses: HistoricoPrecioPunto[];
  puntos12Meses: HistoricoPrecioPunto[];
  comparativaRegiones: {
    region: string;
    precioActual: number;
    variacionVsNacional: string;
  }[];
  estacionalidadPicos: string;
}

export interface FavoritoSeguimientoItem {
  id: string;
  tipo: 'lote' | 'productor' | 'transportista';
  referenciaId: string;
  titulo: string;
  subtitulo: string;
  ubicacion: string;
  imagen: string;
  estadoVenta?: 'disponible' | 'en_negociacion' | 'vendido' | 'vence_pronto';
  diasParaVencer?: number;
  precioActual?: number;
  precioAnterior?: number;
  precioTexto?: string;
  actividadRecienteBadge?: string;
  disponibleInmediato?: boolean;
  telefonoWhatsapp: string;
}

export interface SelloVerificacionInfo {
  usuarioId: string;
  nombreFincaOEmpresa: string;
  cedulaORutVerificado: boolean;
  numeroRegistroIca?: string;
  fechaVerificacionKyc: string;
  contratosLey527Cumplidos: number;
  tasaCumplimientoEntrega: number;
  calificacionPromedio: number;
  totalResenas: number;
  inspeccionSanitariaBpa: boolean;
  garantiaCeroFraude: boolean;
}
