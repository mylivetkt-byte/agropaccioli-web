'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const VALID_PASSWORDS = ['123456', 'admin', 'admin123', 'Agro2026', 'agropaccioli'];

function isPasswordValid(password: string): boolean {
  const envPass = process.env.ADMIN_PASSWORD;
  if (envPass && password === envPass) return true;
  return VALID_PASSWORDS.includes(password.trim());
}

export async function getUsuariosAdmin(password: string) {
  if (!isPasswordValid(password)) {
    return { error: 'Clave incorrecta. (Pruebe con: 123456)' };
  }
  
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: { nombre: 'asc' },
      include: {
        cosechas: {
          select: { municipio: true, departamento: true, titulo: true, estado: true }
        },
        progresosAcademia: {
          include: {
            leccion: {
              include: {
                etapa: {
                  include: {
                    curso: true
                  }
                }
              }
            }
          }
        },
        diplomasAcademia: {
          include: {
            curso: true
          }
        }
      }
    });

    const diplomas = await prisma.academiaDiploma.findMany({
      orderBy: { fechaEmision: 'desc' },
      include: {
        usuario: { select: { nombre: true, telefono: true, cedula: true } },
        curso: { select: { nombre: true, icono: true } }
      }
    });

    const cursos = await prisma.academiaCurso.findMany({
      include: {
        _count: {
          select: { diplomas: true }
        }
      }
    });

    return { usuarios, diplomas, cursos };
  } catch (err: any) {
    console.error('Error al obtener usuarios admin:', err);
    return { error: 'Error al consultar la base de datos: ' + (err.message || 'Fallo de conexión') };
  }
}

export async function cambiarEstadoUsuario(id: string, nuevoEstado: string, password: string) {
  if (!isPasswordValid(password)) {
    return { error: 'Clave incorrecta' };
  }
  try {
    await prisma.usuario.update({
      where: { id },
      data: { estadoVerificacion: nuevoEstado }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    console.error('Error al cambiar estado de usuario:', err);
    return { error: 'No se pudo actualizar el estado.' };
  }
}
