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
  id: string; // ej: AGP-PROP-2026-0842
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
  hashIntegridadLegal: string; // Hash SHA-256 de validez Ley 527/1999
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

export type TipoContrato = 'jornal' | 'mensual' | 'temporada' | 'prestacion_servicios';

export interface EmpleoItem {
  id: string;
  titulo: string;
  empresaOFinca: string;
  sector: SectorType | 'profesional';
  cargo: string;
  tipoContrato: TipoContrato;
  departamento: string;
  municipio: string;
  vereda?: string;
  salarioTexto: string;
  salarioNumerico?: number;
  incluyeVivienda: boolean;
  incluyeAlimentacion: boolean;
  vacantesDisponibles: number;
  experienciaRequerida: string;
  descripcion: string;
  requisitos: string[];
  beneficios: string[];
  contactoNombre: string;
  contactoTelefono: string;
  contactoWhatsapp: string;
  fechaPublicacion: string;
  verificadoKYC: boolean;
  urgente?: boolean;
}
