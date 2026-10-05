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

  console.log('Iniciando el proceso de seeding de la Escuela Rural...');

  // 1. Crear el usuario estudiante principal
  const donCarlos = await prisma.usuario.upsert({
    where: { telefono: '573111111111' },
    update: {},
    create: {
      nombre: 'Carlos Giraldo',
      telefono: '573111111111',
      cedula: '12345678',
      rol: 'PRODUCTOR',
      nivelAcademia: 3,
      puntosAcademia: 450,
      estadoVerificacion: 'APROBADO',
      origen: 'D'
    }
  });

  // 2. Crear Cursos de la Escuela
  const cursoCacao = await prisma.academiaCurso.create({
    data: {
      nombre: 'Cultivo de Cacao',
      descripcion: 'Aprenda todo sobre el cacao, desde la siembra hasta la cosecha.',
      icono: '🍫',
      sector: 'agricola',
      etapas: {
        create: [
          {
            orden: 1,
            titulo: 'Poda y Siembra de Cacao',
            lecciones: {
              create: [
                { orden: 1, titulo: 'Tipos de Suelo para Cacao', tipo: 'AUDIO', duracionMinutos: 15 }
              ]
            }
          }
        ]
      }
    }
  });

  const cursoRiego = await prisma.academiaCurso.create({
    data: {
      nombre: 'Riego por Goteo Casero',
      descripcion: 'Optimice el uso del agua en su finca de manera económica.',
      icono: '💧',
      sector: 'agricola',
      etapas: {
        create: [
          {
            orden: 1,
            titulo: 'Instalación Básica',
            lecciones: {
              create: [
                { orden: 1, titulo: 'Materiales Necesarios', tipo: 'VIDEO', duracionMinutos: 10 }
              ]
            }
          }
        ]
      }
    }
  });

  const cursoBPA = await prisma.academiaCurso.create({
    data: {
      nombre: 'Buenas Prácticas Agrícolas (BPA)',
      descripcion: 'Normas y certificación oficial para exportar.',
      icono: '📜',
      sector: 'agricola',
      etapas: {
        create: [
          {
            orden: 1,
            titulo: 'Manejo de Agroquímicos',
            lecciones: {
              create: [
                { orden: 1, titulo: 'Bodegas Seguras', tipo: 'AUDIO', duracionMinutos: 20 }
              ]
            }
          }
        ]
      }
    }
  });

  // 3. Asignarle notas y diplomas a Don Carlos
  await prisma.academiaProgreso.create({
    data: {
      usuarioId: donCarlos.id,
      leccionId: (await prisma.academiaLeccion.findFirst({ where: { titulo: 'Tipos de Suelo para Cacao' } }))!.id,
      completado: true,
      fechaCompletado: new Date()
    }
  });

  await prisma.academiaDiploma.create({
    data: {
      usuarioId: donCarlos.id,
      cursoId: cursoBPA.id,
      notaFinal: 5.0,
      codigoVerificacion: 'BPA-2025-' + Math.floor(Math.random() * 10000)
    }
  });

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
