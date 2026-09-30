import { PrismaClient } from '@prisma/client';
import { COSECHAS_DATA } from '../lib/agro-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el proceso de seeding (Demos)...');

  for (const item of COSECHAS_DATA) {
    // 1. Crear el usuario (Productor)
    // Generar un número de teléfono/cédula basado en el ID para evitar colisiones
    const telefonoUnico = item.productor.telefono || `573000${item.id.replace('cos-', '')}`;
    const cedulaFalsa = `1000${item.id.replace('cos-', '')}`;

    const productor = await prisma.usuario.upsert({
      where: { telefono: telefonoUnico },
      update: {},
      create: {
        nombre: item.productor.nombre,
        telefono: telefonoUnico,
        cedula: cedulaFalsa,
        rol: 'PRODUCTOR',
        estadoVerificacion: 'APROBADO',
        origen: 'D' // D de Demo
      }
    });

    // 2. Crear la cosecha
    await prisma.cosecha.create({
      data: {
        titulo: item.titulo,
        sector: item.sector,
        categoria: item.categoria,
        variedad: item.variedad,
        producto: item.titulo,
        precio: item.precioUnitario,
        unidad: item.unidad,
        cantidadDisponible: item.cantidadDisponible,
        departamento: item.departamento,
        municipio: item.municipio,
        vereda: item.vereda,
        ubicacion: `${item.municipio}, ${item.departamento}`,
        latitud: item.coordenadas[1],
        longitud: item.coordenadas[0],
        fechaCosechaStr: item.fechaCosechaEstimada,
        descripcion: item.descripcion,
        imagenes: JSON.stringify(item.imagenes),
        certificaciones: JSON.stringify(item.certificaciones || []),
        estado: item.estado || 'disponible',
        origen: 'D', // D de Demo
        productorId: productor.id
      }
    });
    
    console.log(`Cargado en DB: ${item.titulo}`);
  }

  console.log('Seeding completado con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
