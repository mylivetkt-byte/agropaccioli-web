'use server'

import prisma from '@/lib/prisma';

import { PRECIOS_MERCADO_DATA } from '@/lib/agro-data';

export async function getPreciosMercadoList() {
  try {
    const precios = await prisma.precioMercado.findMany({
      orderBy: { fechaActualizacion: 'desc' }
    });
    if (precios && precios.length > 0) {
      return precios;
    }
  } catch (e) {
    console.warn('Error fetching db precios mercado, using fallback catalog:', e);
  }

  return PRECIOS_MERCADO_DATA.map((p: any, idx: number) => ({
    id: `pr-${idx}`,
    producto: p.producto,
    categoria: p.sector,
    variedad: p.variedad || '',
    centralAbastos: p.mercado,
    departamento: p.departamento || 'Nacional',
    precioMinimo: p.precioMin,
    precioMaximo: p.precioMax,
    precioPromedio: p.precioPromedio,
    unidad: p.unidad,
    tendencia: p.tendencia,
    variacionSemanal: p.variacionPorcentual || 0,
    fechaActualizacion: new Date()
  }));
}
