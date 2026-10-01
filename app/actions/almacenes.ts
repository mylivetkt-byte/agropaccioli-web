'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { ALMACENES_INSUMOS_DATA } from '@/lib/agro-data';

export async function getAlmacenesList() {
  try {
    const almacenes = await prisma.almacenInsumos.findMany({
      orderBy: { calificacion: 'desc' }
    });
    if (almacenes && almacenes.length > 0) {
      return almacenes;
    }
  } catch (e) {
    console.warn('Error fetching db almacenes, using fallback catalog:', e);
  }

  return ALMACENES_INSUMOS_DATA.map((a: any) => ({
    id: a.id,
    nombre: a.nombreComercial,
    departamento: a.departamento,
    municipio: a.municipio,
    direccion: `${a.municipio}, ${a.departamento}`,
    telefono: a.telefono,
    whatsapp: a.whatsapp,
    calificacion: a.calificacion,
    marcas: Array.isArray(a.marcasAutorizadas) ? a.marcasAutorizadas.join(', ') : 'Insumos',
    categoria: a.categoria || 'mixto',
    imagen: a.fotoFachada || '',
    descripcion: a.razonSocial || '',
    origen: 'D',
    createdAt: new Date('2026-10-01')
  }));
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
