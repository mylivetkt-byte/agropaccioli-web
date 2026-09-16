export type SectorType = 'agricola' | 'ganadero' | 'acuicola';

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
  };
  fechaCosechaEstimada: string;
  fechaPublicacion: string;
  imagenes: string[];
  descripcion: string;
  certificaciones?: string[];
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
