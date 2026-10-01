'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getNoticiasList() {
  try {
    const noticias = await prisma.noticiaAgraria.findMany({
      orderBy: { fechaPublicacion: 'desc' }
    });
    return noticias;
  } catch (e) {
    console.error('Error fetching noticias:', e);
    return [];
  }
}

export async function crearNoticia(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const resumen = formData.get('resumen') as string;
  const contenido = formData.get('contenido') as string;
  const categoria = (formData.get('categoria') as string) || 'Nacional';
  const fuente = (formData.get('fuente') as string) || 'Ministerio de Agricultura';
  const imagenUrl = (formData.get('imagenUrl') as string) || '';
  const destacada = formData.get('destacada') === 'true';

  const nueva = await prisma.noticiaAgraria.create({
    data: {
      titulo,
      resumen,
      contenido,
      categoria,
      fuente,
      imagenUrl,
      destacada,
      origen: 'O' // Original
    }
  });

  revalidatePath('/admin');
  return { success: true, id: nueva.id };
}
