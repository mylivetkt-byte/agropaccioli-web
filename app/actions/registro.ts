'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function registrarProductor(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const telefono = formData.get('telefono') as string;
  const cedula = formData.get('cedula') as string;
  
  // En un sistema real aquí guardaríamos el archivo de la cédula en S3 o Cloudinary.
  // Por ahora simularemos que subió la foto guardando un texto.
  const fotoFicticia = "url_foto_subida.jpg";

  // Verificamos si ya existe el teléfono o cédula
  const existe = await prisma.usuario.findFirst({
    where: {
      OR: [
        { telefono: telefono },
        { cedula: cedula }
      ]
    }
  });

  if (existe) {
    // Podríamos devolver un error, pero por simplicidad redirigimos con un flag de error
    redirect('/mapa-cosechas?error_registro=existe');
  }

  await prisma.usuario.create({
    data: {
      nombre,
      telefono,
      cedula,
      fotoCedulaFrontal: fotoFicticia,
      fotoCedulaTrasera: fotoFicticia,
      estadoVerificacion: 'PENDIENTE',
      rol: 'Productor'
    }
  });

  revalidatePath('/mapa-cosechas');
  redirect('/mapa-cosechas?registro_exito=true');
}

export async function registrarTransportador(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const telefono = formData.get('telefono') as string;
  const cedula = formData.get('cedula') as string;
  const placaVehiculo = formData.get('placaVehiculo') as string;
  const tipoVehiculo = formData.get('tipoVehiculo') as string;
  const licenciaConduccion = formData.get('licenciaConduccion') as string;
  const resolucionMinTransporte = formData.get('resolucionMinTransporte') as string;
  const polizaSeguroCarga = formData.get('polizaSeguroCarga') as string;
  const pathname = formData.get('pathname') as string || '/transportistas';
  
  const existe = await prisma.usuario.findFirst({
    where: { OR: [{ telefono }, { cedula }] }
  });

  if (existe) {
    redirect(`${pathname}?error_registro=existe`);
  }

  const usuario = await prisma.usuario.create({
    data: {
      nombre,
      telefono,
      cedula,
      estadoVerificacion: 'PENDIENTE',
      rol: 'Transportista'
    }
  });

  const perfil = await prisma.perfilTransportista.create({
    data: {
      usuarioId: usuario.id,
      licenciaConduccion,
      fotoLicencia: "licencia.jpg",
      placaVehiculo,
      tipoVehiculo,
      capacidadToneladas: 5,
    }
  });
  
  await prisma.vehiculoLogistico.create({
    data: {
      transportistaId: perfil.id,
      resolucionMinTransporte,
      placaVehiculo,
      tipoVehiculo,
      polizaSeguroCarga
    }
  });

  revalidatePath(pathname);
  redirect(`${pathname}?registro_exito=true`);
}

export async function registrarComprador(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const telefono = formData.get('telefono') as string;
  const cedula = formData.get('cedula') as string;
  const tipoDocumento = formData.get('tipoDocumento') as string;
  const numeroDocumento = formData.get('numeroDocumento') as string;
  const pathname = formData.get('pathname') as string || '/';
  
  const existe = await prisma.usuario.findFirst({
    where: { OR: [{ telefono }, { cedula }] }
  });

  if (existe) {
    redirect(`${pathname}?error_registro_comprador=existe`);
  }

  const usuario = await prisma.usuario.create({
    data: {
      nombre,
      telefono,
      cedula,
      estadoVerificacion: 'PENDIENTE',
      rol: 'Comprador'
    }
  });

  await prisma.compradorVerificado.create({
    data: {
      usuarioId: usuario.id,
      tipoDocumento,
      numeroDocumento,
      rutDigital: 'rut_subido.pdf',
      certificadoCamaraComercio: 'camara_comercio.pdf',
      estadoSarlaft: false, // Por defecto pendiente de revisión
      firmaDigital: 'HASH_PENDIENTE'
    }
  });

  revalidatePath(pathname);
  redirect(`${pathname}?registro_exito_comprador=true`);
}
