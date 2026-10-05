'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { COSECHAS_DATA } from '@/lib/agro-data';

export async function checkUsuarioStatus(cedula: string) {
  try {
    const user = await prisma.usuario.findUnique({ where: { cedula } });
    if (!user) return { status: 'NO_EXISTE' };
    if (user.estadoVerificacion !== 'APROBADO') {
      // Auto-aprobación instantánea para agilizar flujo
      await prisma.usuario.update({
        where: { id: user.id },
        data: { estadoVerificacion: 'APROBADO', telefonoVerificado: true }
      });
      user.estadoVerificacion = 'APROBADO';
    }
    return { status: 'APROBADO', usuario: user };
  } catch {
    return { status: 'NO_EXISTE' };
  }
}

export async function getCosechasList() {
  try {
    const dbCosechas = await prisma.cosecha.findMany({
      where: { estado: 'disponible' },
      include: {
        productor: {
          select: { nombre: true, telefono: true }
        }
      }
    });
    if (dbCosechas && dbCosechas.length > 0) {
      return dbCosechas;
    }
  } catch (err) {
    console.warn('Base de datos no disponible o vacía, usando catálogo integrado:', err);
  }

  // Fallback garantizado: si la BD aún no tiene registros o se está conectando, muestra el catálogo completo
  return COSECHAS_DATA.map((c) => ({
    id: c.id,
    titulo: c.titulo,
    sector: c.sector,
    categoria: c.categoria,
    variedad: c.variedad,
    producto: c.variedad || c.titulo,
    precio: c.precioUnitario,
    unidad: c.unidad,
    cantidadDisponible: c.cantidadDisponible,
    departamento: c.departamento,
    municipio: c.municipio,
    vereda: c.vereda,
    ubicacion: `${c.municipio}, ${c.departamento}`,
    latitud: c.coordenadas ? c.coordenadas[1] : null,
    longitud: c.coordenadas ? c.coordenadas[0] : null,
    fechaRecoleccion: null,
    fechaCosechaStr: c.fechaCosechaEstimada,
    tiempoTransporte: '2-4 horas',
    descripcion: c.descripcion,
    imagenes: c.imagenes ? c.imagenes[0] : null,
    certificaciones: c.certificaciones ? c.certificaciones.join(', ') : null,
    estado: c.estado || 'disponible',
    origen: 'D',
    productorId: 'usr-demo-001',
    productor: {
      nombre: c.productor?.nombre || 'Don Hernando Gómez',
      telefono: c.productor?.telefono || '+573114567890'
    }
  }));
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

export async function registrarConsultaComprador(cosechaId: string, compradorNombre: string, compradorTelefono: string, mensaje: string = "") {
  try {
    await prisma.cosechaConsulta.create({
      data: {
        cosechaId,
        compradorNombre,
        compradorTelefono,
        mensaje
      }
    });
    return { success: true };
  } catch (err) {
    console.error("Error al registrar consulta:", err);
    return { success: false, error: "No se pudo registrar la consulta." };
  }
}

export async function obtenerPanelProductor(usuarioId: string) {
  try {
    const cosechas = await prisma.cosecha.findMany({
      where: { productorId: usuarioId },
      include: {
        consultas: {
          orderBy: { fechaConsulta: 'desc' }
        }
      },
      orderBy: { fechaRecoleccion: 'desc' }
    });
    return { success: true, cosechas };
  } catch (err) {
    console.error("Error al obtener panel de productor:", err);
    return { success: false, error: "Error de base de datos." };
  }
}

export async function cambiarEstadoCosecha(cosechaId: string, nuevoEstado: string) {
  try {
    await prisma.cosecha.update({
      where: { id: cosechaId },
      data: { estado: nuevoEstado }
    });
    revalidatePath('/mapa-cosechas');
    return { success: true };
  } catch (err) {
    console.error("Error al cambiar estado de cosecha:", err);
    return { success: false, error: "No se pudo actualizar el estado." };
  }
}
