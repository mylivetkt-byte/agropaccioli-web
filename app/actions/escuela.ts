'use server';

import prisma from '@/lib/prisma';

// Función para obtener la información completa de la Libreta de Notas de un estudiante
export async function obtenerLibretaEstudiante(telefonoUsuario: string) {
  try {
    // 1. Buscar al estudiante por su teléfono (simulando autenticación)
    const usuario = await prisma.usuario.findUnique({
      where: { telefono: telefonoUsuario },
      include: {
        // Incluir sus progresos (Cursos actuales)
        progresosAcademia: {
          include: {
            leccion: {
              include: {
                etapa: {
                  include: {
                    cultivo: true
                  }
                }
              }
            }
          }
        },
        // Incluir sus diplomas ganados
        diplomasAcademia: {
          include: {
            cultivo: true
          }
        }
      }
    });

    if (!usuario) {
      return { success: false, error: 'Usuario no encontrado. Por favor, regístrese primero.' };
    }

    // 2. Procesar los datos para entregárselos limpios al Frontend
    // Agrupar progresos por cultivo (curso)
    const cursosEnProgresoMap = new Map();
    
    usuario.progresosAcademia.forEach(progreso => {
      const cultivo = progreso.leccion.etapa.cultivo;
      if (!cursosEnProgresoMap.has(cultivo.id)) {
        cursosEnProgresoMap.set(cultivo.id, {
          id: cultivo.id,
          nombre: cultivo.nombre,
          icono: cultivo.icono,
          leccionesCompletadas: 0,
          // Para el MVP, asumimos un total de 4 lecciones por curso para calcular el %
          totalLecciones: 4 
        });
      }
      
      if (progreso.completado) {
        const cursoInfo = cursosEnProgresoMap.get(cultivo.id);
        cursoInfo.leccionesCompletadas += 1;
      }
    });

    const cursosActivos = Array.from(cursosEnProgresoMap.values()).map(curso => ({
      ...curso,
      porcentaje: Math.min(100, Math.round((curso.leccionesCompletadas / curso.totalLecciones) * 100)),
      notaActual: 4.0 + (curso.leccionesCompletadas * 0.25) // Simulador didáctico de notas parciales
    }));

    return {
      success: true,
      estudiante: {
        nombre: usuario.nombre,
        nivel: usuario.nivelAcademia,
        puntos: usuario.puntosAcademia,
        telefono: usuario.telefono
      },
      cursosActivos,
      diplomas: usuario.diplomasAcademia
    };
    
  } catch (error) {
    console.error("Error al obtener la libreta:", error);
    return { success: false, error: 'Error interno del servidor al consultar la base de datos.' };
  }
}

// Función para obtener todo el catálogo de cursos disponibles
export async function obtenerCatalogoCursos() {
  try {
    const cursos = await prisma.academiaCultivo.findMany({
      where: { estado: 'ACTIVO' },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        icono: true
      }
    });
    
    // Agregamos colores didácticos para la UI que no vienen de BD
    const colors = ['bg-amber-100 text-amber-800', 'bg-emerald-100 text-emerald-800', 'bg-sky-100 text-sky-800', 'bg-orange-100 text-orange-800', 'bg-purple-100 text-purple-800'];
    
    return cursos.map((curso, i) => {
      const parts = colors[i % colors.length].split(' ');
      return {
        ...curso,
        colorBg: parts[0],
        colorText: parts[1]
      };
    });
  } catch (error) {
    console.error("Error al obtener el catálogo:", error);
    return [];
  }
}

// Función para guardar el progreso cuando un campesino termina una etapa
export async function guardarProgresoClase(telefonoUsuario: string, cultivoId: string, etapaActual: number) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { telefono: telefonoUsuario }
    });
    
    if (!usuario) return { success: false, error: 'Usuario no encontrado' };

    // Buscar la lección correspondiente a esta etapa
    // En el MVP, cada etapa tiene 1 lección, así que buscamos por orden de etapa
    const etapa = await prisma.academiaEtapa.findFirst({
      where: { 
        cultivoId: cultivoId,
        orden: etapaActual
      },
      include: { lecciones: true }
    });

    if (!etapa || etapa.lecciones.length === 0) return { success: false, error: 'Etapa no encontrada en BD' };

    const leccionId = etapa.lecciones[0].id;

    // Guardar el progreso (upsert para no duplicar si ya la había hecho)
    await prisma.academiaProgreso.upsert({
      where: {
        usuarioId_leccionId: {
          usuarioId: usuario.id,
          leccionId: leccionId
        }
      },
      update: { completado: true, fechaCompletado: new Date() },
      create: {
        usuarioId: usuario.id,
        leccionId: leccionId,
        completado: true,
        fechaCompletado: new Date()
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error al guardar progreso:", error);
    return { success: false, error: 'Error interno' };
  }
}

// FASE 1: Motor del Generador IA para registrar en BD
export async function crearCursoDesdeGeneradorIA(nombreCurso: string) {
  try {
    const nuevoCurso = await prisma.academiaCultivo.create({
      data: {
        nombre: nombreCurso.toLowerCase().includes('curso') ? nombreCurso : `Curso de ${nombreCurso}`,
        descripcion: `Curso oficial generado con Inteligencia Artificial con las mejores prácticas para ${nombreCurso}.`,
        icono: '🌱',
        estado: 'ACTIVO',
        etapas: {
          create: [
            { orden: 1, titulo: 'Preparación de Terreno', lecciones: { create: [{ orden: 1, titulo: 'El Suelo', tipo: 'VIDEO' }] } },
            { orden: 2, titulo: 'Siembra y Nutrición', lecciones: { create: [{ orden: 1, titulo: 'La Semilla', tipo: 'VIDEO' }] } },
            { orden: 3, titulo: 'Control de Plagas', lecciones: { create: [{ orden: 1, titulo: 'Manejo Integrado', tipo: 'VIDEO' }] } },
            { orden: 4, titulo: 'Cosecha y Ventas', lecciones: { create: [{ orden: 1, titulo: 'Comercialización', tipo: 'VIDEO' }] } }
          ]
        }
      }
    });
    return { success: true, id: nuevoCurso.id };
  } catch (error) {
    console.error("Error al crear curso mágico:", error);
    return { success: false, error: 'Fallo al guardar en BD' };
  }
}
