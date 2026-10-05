import { PrismaClient } from '@prisma/client';
import ytSearch from 'yt-search';

const prisma = new PrismaClient();

async function fixRiegoCourse() {
  console.log("Buscando el curso de Riego...");
  const curso = await prisma.academiaCurso.findFirst({
    where: { nombre: { contains: "Riego" } },
    include: {
      etapas: {
        include: { lecciones: true }
      }
    }
  });

  if (!curso) {
    console.log("Curso no encontrado.");
    return;
  }

  console.log(`Encontrado: ${curso.nombre} - Buscando videos en YouTube...`);

  for (const etapa of curso.etapas) {
    if (etapa.lecciones.length > 0) {
      const leccion = etapa.lecciones[0];
      const query = `como hacer riego por goteo casero paso ${etapa.orden} tutorial agricola`;
      console.log(`Buscando: ${query}`);
      
      const r = await ytSearch(query);
      if (r.videos.length > 0) {
        const url = r.videos[0].url;
        console.log(`Asignando video: ${url}`);
        
        await prisma.academiaLeccion.update({
          where: { id: leccion.id },
          data: { urlContenido: url }
        });
      }
    }
  }

  console.log("¡Curso actualizado con videos reales!");
}

fixRiegoCourse().catch(console.error).finally(() => prisma.$disconnect());
