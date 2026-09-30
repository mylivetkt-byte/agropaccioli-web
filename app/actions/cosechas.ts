'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function checkUsuarioStatus(cedula: string) {
  const user = await prisma.usuario.findUnique({ where: { cedula } });
  if (!user) return { status: 'NO_EXISTE' };
  if (user.estadoVerificacion !== 'APROBADO') return { status: 'PENDIENTE', nombre: user.nombre };
  return { status: 'APROBADO', usuario: user };
}

export async function getCosechasList() {
  const cosechas = await prisma.cosecha.findMany({
    include: {
      productor: {
        select: { nombre: true, telefono: true }
      }
    },
    orderBy: {
      fechaRecoleccion: 'desc'
    }
  });
  return cosechas;
}

export async function publicarCosecha(formData: FormData) {
  const producto = formData.get('producto') as string;
  const precio = parseFloat(formData.get('precio') as string);
  const ubicacion = formData.get('ubicacion') as string;
  const departamento = formData.get('departamento') as string;
  const municipio = formData.get('municipio') as string;
  const vereda = formData.get('vereda') as string;
  
  const latitudStr = formData.get('latitud') as string;
  const longitudStr = formData.get('longitud') as string;
  const latitud = latitudStr ? parseFloat(latitudStr) : null;
  const longitud = longitudStr ? parseFloat(longitudStr) : null;
  
  const sector = formData.get('sector') as string;
  const unidad = formData.get('unidad') as string;
  const cantidadDisponible = parseInt(formData.get('cantidad') as string, 10) || 0;
  
  const fechaStr = formData.get('fechaRecoleccion') as string;
  const fechaRecoleccion = fechaStr ? new Date(fechaStr) : null;
  const tiempoTransporte = formData.get('tiempoTransporte') as string;

  // 1. Buscamos al productor por cedula para publicar
  const cedulaProductor = formData.get('cedula') as string;
  const usuario = await prisma.usuario.findUnique({
    where: { cedula: cedulaProductor }
  });

  if (!usuario) {
    // No existe la cuenta
    redirect('/mapa-cosechas?error_publicar=no_registrado');
  }

  if (usuario.estadoVerificacion !== 'APROBADO') {
    // Está registrado pero no aprobado
    redirect('/mapa-cosechas?error_publicar=no_aprobado');
  }

  // 2. Creamos la cosecha/producto amarrado a ese usuario
  await prisma.cosecha.create({
    data: {
      sector,
      producto,
      precio,
      unidad,
      cantidadDisponible,
      fechaRecoleccion,
      tiempoTransporte,
      ubicacion,
      departamento,
      municipio,
      vereda,
      latitud,
      longitud,
      origen: 'O',
      productorId: usuario.id
    }
  });

  // 3. Recargamos la página para que se vean los cambios
  revalidatePath('/mapa-cosechas');
  redirect('/mapa-cosechas?exito=true');
}
