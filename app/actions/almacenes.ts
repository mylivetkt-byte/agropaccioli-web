'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAlmacenesList() {
  try {
    const almacenes = await prisma.almacenInsumos.findMany({
      orderBy: { calificacion: 'desc' }
    });
    return almacenes;
  } catch (e) {
    console.error('Error fetching almacenes:', e);
    return [];
  }
}

export async function registrarAlmacen(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const departamento = (formData.get('departamento') as string) || 'Colombia';
  const municipio = (formData.get('municipio') as string) || '';
  const direccion = formData.get('direccion') as string;
  const telefono = formData.get('telefono') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const marcas = formData.get('marcas') as string;
  const categoria = (formData.get('categoria') as string) || 'mixto';
  const descripcion = formData.get('descripcion') as string;
  const imagen = (formData.get('imagen') as string) || '';

  const nuevoAlmacen = await prisma.almacenInsumos.create({
    data: {
      nombre,
      departamento,
      municipio,
      direccion,
      telefono,
      whatsapp,
      marcas,
      categoria,
      descripcion,
      imagen,
      origen: 'O' // Original
    }
  });

  revalidatePath('/almacenes-b2b');
  return { success: true, id: nuevoAlmacen.id };
}
