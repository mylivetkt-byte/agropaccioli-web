'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const ADMIN_PASS = '123456'; // Clave sencilla para el MVP

export async function getUsuariosAdmin(password: string) {
  if (password !== ADMIN_PASS) {
    return { error: 'Clave incorrecta' };
  }
  const usuarios = await prisma.usuario.findMany({
    orderBy: { nombre: 'asc' }
  });
  return { usuarios };
}

export async function cambiarEstadoUsuario(id: string, nuevoEstado: string, password: string) {
  if (password !== ADMIN_PASS) {
    return { error: 'Clave incorrecta' };
  }
  await prisma.usuario.update({
    where: { id },
    data: { estadoVerificacion: nuevoEstado }
  });
  revalidatePath('/admin');
  return { success: true };
}
