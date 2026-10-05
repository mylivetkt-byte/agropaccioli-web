'use server';

import prisma from '@/lib/prisma';

export async function obtenerCursoCompleto(cursoId: string) {
  try {
    const curso = await prisma.academiaCurso.findUnique({
      where: { id: cursoId },
      include: {
        etapas: {
          orderBy: { orden: 'asc' },
          include: {
            lecciones: {
              orderBy: { orden: 'asc' }
            }
          }
        }
      }
    });

    if (curso) return curso;

    // Fallback: Si no hay base de datos, estructuramos el temario completo
    return {
      id: cursoId,
      nombre: 'Curso Teórico-Práctico',
      etapas: [
        { id: 'e1', orden: 1, titulo: 'Semillas y Preparación', lecciones: [{ titulo: 'Selección de la Semilla' }] },
        { id: 'e2', orden: 2, titulo: 'Siembra', lecciones: [{ titulo: 'Técnicas de Siembra' }] },
        { id: 'e3', orden: 3, titulo: 'Crecimiento', lecciones: [{ titulo: 'Etapa Fenológica' }] },
        { id: 'e4', orden: 4, titulo: 'Abonos', lecciones: [{ titulo: 'Nutrición y Fertilizantes' }] },
        { id: 'e5', orden: 5, titulo: 'Fumigaciones', lecciones: [{ titulo: 'Manejo de Químicos' }] },
        { id: 'e6', orden: 6, titulo: 'Controles Biológicos', lecciones: [{ titulo: 'Manejo Integrado Sano' }] },
        { id: 'e7', orden: 7, titulo: 'Cosechas', lecciones: [{ titulo: 'Recolección y Venta' }] }
      ]
    };
  } catch (error) {
    console.error("Error al obtener curso completo:", error);
    return null;
  }
}
