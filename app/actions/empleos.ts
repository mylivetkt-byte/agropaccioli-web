'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { EMPLEOS_DATA } from '@/lib/agro-data';

export async function getEmpleosList() {
  try {
    const empleos = await prisma.ofertaEmpleo.findMany({
      orderBy: { fechaPublicacion: 'desc' },
      include: { postulaciones: true }
    });
    if (empleos && empleos.length > 0) {
      return empleos;
    }
  } catch (e) {
    console.warn('Error fetching db empleos, using fallback catalog:', e);
  }

  return EMPLEOS_DATA.map((e: any) => ({
    id: e.id,
    titulo: e.titulo,
    sector: e.sector,
    tipoContrato: e.tipoContrato || 'Jornal / Cosecha',
    ubicacion: e.ubicacion || `${e.municipio || ''}, ${e.departamento || 'Colombia'}`,
    departamento: e.departamento || 'Colombia',
    municipio: e.municipio || '',
    salario: e.salario || 0,
    salarioTexto: e.salarioTexto || '',
    requiereExperiencia: Boolean(e.requiereExperiencia),
    incluyeHospedaje: Boolean(e.incluyeHospedaje),
    incluyeAlimentacion: Boolean(e.incluyeAlimentacion),
    descripcion: e.descripcion || '',
    requisitos: Array.isArray(e.requisitos) ? e.requisitos.join('; ') : (e.requisitos || ''),
    empleadorNombre: e.empresaOFinca || 'Finca Verificada',
    empleadorTelefono: e.telefonoContacto || '+573000000000',
    estado: e.estado || 'ACTIVA',
    origen: 'D',
    fechaPublicacion: new Date(e.fechaPublicacion || '2026-10-01'),
    postulaciones: []
  }));
}

export async function publicarOfertaEmpleo(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const sector = (formData.get('sector') as string) || 'agricola';
  const tipoContrato = (formData.get('tipoContrato') as string) || 'Jornal / Cosecha';
  const ubicacion = (formData.get('ubicacion') as string) || 'Colombia';
  const departamento = (formData.get('departamento') as string) || 'Colombia';
  const municipio = (formData.get('municipio') as string) || '';
  const salarioTexto = formData.get('salarioTexto') as string;
  const salario = parseFloat(formData.get('salario') as string) || 0;
  const requiereExperiencia = formData.get('requiereExperiencia') === 'true';
  const incluyeHospedaje = formData.get('incluyeHospedaje') === 'true';
  const incluyeAlimentacion = formData.get('incluyeAlimentacion') === 'true';
  const descripcion = formData.get('descripcion') as string;
  const requisitos = formData.get('requisitos') as string;
  const empleadorNombre = formData.get('empleadorNombre') as string;
  const empleadorTelefono = formData.get('empleadorTelefono') as string;

  const nuevaOferta = await prisma.ofertaEmpleo.create({
    data: {
      titulo,
      sector,
      tipoContrato,
      ubicacion,
      departamento,
      municipio,
      salario,
      salarioTexto,
      requiereExperiencia,
      incluyeHospedaje,
      incluyeAlimentacion,
      descripcion,
      requisitos,
      empleadorNombre,
      empleadorTelefono,
      estado: 'ACTIVA',
      origen: 'O' // Original creado por usuario
    }
  });

  revalidatePath('/empleos');
  return { success: true, id: nuevaOferta.id };
}

export async function registrarPostulacion(formData: FormData) {
  const empleoId = formData.get('empleoId') as string;
  const candidatoNombre = formData.get('candidatoNombre') as string;
  const candidatoTelefono = formData.get('candidatoTelefono') as string;
  const cedula = formData.get('cedula') as string;
  const experienciaAnos = parseInt(formData.get('experienciaAnos') as string, 10) || 0;
  const mensaje = formData.get('mensaje') as string;

  const postulacion = await prisma.postulacionEmpleo.create({
    data: {
      empleoId,
      candidatoNombre,
      candidatoTelefono,
      cedula,
      experienciaAnos,
      mensaje,
      estado: 'PENDIENTE',
      origen: 'O'
    }
  });

  revalidatePath('/empleos');
  return { success: true, id: postulacion.id };
}
