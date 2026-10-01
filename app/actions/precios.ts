'use server'

import prisma from '@/lib/prisma';

export async function getPreciosMercadoList() {
  try {
    const precios = await prisma.precioMercado.findMany({
      orderBy: { fechaActualizacion: 'desc' }
    });
    return precios;
  } catch (e) {
    console.error('Error fetching precios mercado:', e);
    return [];
  }
}
