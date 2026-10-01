'use server'

import prisma from '@/lib/prisma';

import { AGREMIACIONES_DATA } from '@/lib/agro-data';

export async function getAgremiacionesList() {
  try {
    const agremiaciones = await prisma.agremiacion.findMany();
    if (agremiaciones && agremiaciones.length > 0) {
      return agremiaciones;
    }
  } catch (e) {
    console.warn('Error fetching db agremiaciones, using fallback catalog:', e);
  }

  return AGREMIACIONES_DATA.map((ag) => ({
    id: ag.id,
    nombre: ag.nombre,
    sigla: ag.sigla,
    sector: ag.tipo || 'Gremio',
    descripcion: ag.descripcion,
    logoUrl: null,
    sitioWeb: null,
    telefono: ag.contacto,
    departamentoSede: 'Colombia',
    programasApoyo: null
  }));
}
