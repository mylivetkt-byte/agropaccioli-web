'use server';

import prisma from '@/lib/prisma';
import ytSearch from 'yt-search';

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
                    curso: true
                  }
                }
              }
            }
          }
        },
        // Incluir sus diplomas ganados
        diplomasAcademia: {
          include: {
            curso: true
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
      const cursoDb = progreso.leccion.etapa.curso;
      if (!cursosEnProgresoMap.has(cursoDb.id)) {
        cursosEnProgresoMap.set(cursoDb.id, {
          id: cursoDb.id,
          nombre: cursoDb.nombre,
          icono: cursoDb.icono,
          leccionesCompletadas: 0,
          // Para el MVP, asumimos un total de 4 lecciones por curso para calcular el %
          totalLecciones: 4 
        });
      }
      
      if (progreso.completado) {
        const cursoInfo = cursosEnProgresoMap.get(cursoDb.id);
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
  const fallbackCursos = [
    { id: '1', nombre: 'Riego por Goteo Casero', descripcion: 'Módulo Agrícola: Aprenda a optimizar el agua.', icono: '💧', sector: 'agricola', categoria: 'Agrícola' },
    { id: '2', nombre: 'Aguacate Hass (Exportación)', descripcion: 'Módulo Agrícola: BPA y requisitos ICA.', icono: '🥑', sector: 'agricola', categoria: 'Agrícola' },
    { id: '3', nombre: 'Ceba de Novillos Brahman', descripcion: 'Módulo Ganadero: Nutrición y pasturas.', icono: '🐄', sector: 'ganadero', categoria: 'Ganadería' },
    { id: '4', nombre: 'Cría de Tilapia Roja', descripcion: 'Módulo Piscícola: Oxigenación y estanques.', icono: '🐟', sector: 'acuicola', categoria: 'Piscícola' },
    { id: '5', nombre: 'Café Especial (Taza Limpia)', descripcion: 'Módulo Agrícola: Beneficio y secado.', icono: '☕', sector: 'agricola', categoria: 'Agrícola' },
    { id: '6', nombre: 'Gallinas Ponedoras', descripcion: 'Módulo Avícola: Galpones y bioseguridad.', icono: '🐔', sector: 'avicola', categoria: 'Avícola' }
  ];

  const colors = ['bg-amber-100 text-amber-800', 'bg-emerald-100 text-emerald-800', 'bg-sky-100 text-sky-800', 'bg-orange-100 text-orange-800', 'bg-purple-100 text-purple-800', 'bg-rose-100 text-rose-800'];

  try {
    let cursos = await prisma.academiaCurso.findMany({
      where: { estado: 'ACTIVO' },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        icono: true,
        sector: true
      }
    });
    
    // Fallback de catálogo (Directorio Inicial MVP si la BD aún no tiene registros)
    if (!cursos || cursos.length === 0) {
      cursos = fallbackCursos as any[];
    }

    return cursos.map((curso, i) => {
      const parts = colors[i % colors.length].split(' ');
      const sectorStr = (curso as any).sector ? (curso as any).sector.toLowerCase() : 'agricola';
      return {
        ...curso,
        sector: sectorStr,
        colorBg: parts[0],
        colorText: parts[1],
        categoria: sectorStr === 'ganadero' ? 'Ganadería' : 
                   sectorStr === 'acuicola' || sectorStr === 'piscicola' ? 'Piscícola' : 
                   sectorStr === 'avicola' ? 'Avícola' : 'Agrícola'
      };
    });
  } catch (error) {
    console.error("Error al obtener el catálogo de la BD:", error);
    // Garantizar que la UI NUNCA salga vacía en producción si falla la conexión a BD
    return fallbackCursos.map((curso, i) => {
      const parts = colors[i % colors.length].split(' ');
      return {
        ...curso,
        colorBg: parts[0],
        colorText: parts[1]
      };
    });
  }
}

// Función para guardar el progreso cuando un campesino termina una etapa
export async function guardarProgresoClase(telefonoUsuario: string, cursoId: string, etapaActual: number) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { telefono: telefonoUsuario }
    });
    
    if (!usuario) return { success: false, error: 'Usuario no encontrado' };

    // Buscar la lección correspondiente a esta etapa
    // En el MVP, cada etapa tiene 1 lección, así que buscamos por orden de etapa
    const etapa = await prisma.academiaEtapa.findFirst({
      where: { 
        cursoId: cursoId,
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
    // Buscar videos reales en YouTube usando yt-search (sin necesidad de API Key)
    const buscarVideo = async (query: string) => {
      try {
        const r = await ytSearch(query + " agricola tutorial");
        const videos = r.videos;
        // Filtrar los más relevantes o tomar el primero con buenas vistas
        if (videos.length > 0) {
          return videos[0].url;
        }
        return '';
      } catch (e) {
        return '';
      }
    };

    const urlEtapa1 = await buscarVideo(`preparacion suelo para ${nombreCurso}`);
    const urlEtapa2 = await buscarVideo(`siembra y abono para ${nombreCurso}`);
    const urlEtapa3 = await buscarVideo(`plagas y enfermedades ${nombreCurso}`);
    const urlEtapa4 = await buscarVideo(`cosecha ${nombreCurso}`);

    const nuevoCurso = await prisma.academiaCurso.create({
      data: {
        nombre: nombreCurso.toLowerCase().includes('curso') ? nombreCurso : `Curso de ${nombreCurso}`,
        descripcion: `Curso oficial generado con Inteligencia Artificial con las mejores prácticas para ${nombreCurso}.`,
        icono: '🌱',
        estado: 'ACTIVO',
        etapas: {
          create: [
            { orden: 1, titulo: 'Preparación de Terreno', lecciones: { create: [{ orden: 1, titulo: 'El Suelo', tipo: 'VIDEO', urlContenido: urlEtapa1 }] } },
            { orden: 2, titulo: 'Siembra y Nutrición', lecciones: { create: [{ orden: 1, titulo: 'La Semilla', tipo: 'VIDEO', urlContenido: urlEtapa2 }] } },
            { orden: 3, titulo: 'Control de Plagas', lecciones: { create: [{ orden: 1, titulo: 'Manejo Integrado', tipo: 'VIDEO', urlContenido: urlEtapa3 }] } },
            { orden: 4, titulo: 'Cosecha y Ventas', lecciones: { create: [{ orden: 1, titulo: 'Comercialización', tipo: 'VIDEO', urlContenido: urlEtapa4 }] } }
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
