import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  // CRON JOB: Vencimiento de Cursos de la Escuela Rural
  
  try {
    // 1. Definir la regla de vencimiento: ej. si no ha avanzado en 30 días
    const limiteInactividad = new Date();
    limiteInactividad.setDate(limiteInactividad.getDate() - 30);

    // Buscar progresos que no se han completado y llevan inactivos
    const progresosVencidos = await prisma.academiaProgreso.findMany({
      where: {
        completado: false, // Curso no terminado
        fechaCompletado: {
          lt: limiteInactividad
        }
      },
      include: {
        usuario: true,
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
    });

    if (progresosVencidos.length === 0) {
      return NextResponse.json({ success: true, message: 'No hay estudiantes con inactividad crítica hoy.' });
    }

    // 2. Borrar progresos inactivos (Cancelar curso)
    const borrados = await prisma.academiaProgreso.deleteMany({
      where: {
        id: { in: progresosVencidos.map(p => p.id) }
      }
    });

    // 3. Simular el envío de notificaciones WhatsApp
    const notificacionesEnviadas = progresosVencidos.map(progreso => {
      const nombreCurso = progreso.leccion.etapa.curso.nombre;
      return {
        telefono: progreso.usuario.telefono,
        mensaje: `Hola ${progreso.usuario.nombre}, notamos que dejaste tu curso de "${nombreCurso}" a medias hace más de 30 días. Por inactividad, el sistema ha cancelado tu cupo. Recuerda que si quieres volver a intentarlo, puedes empezar de cero en AGROPACCIOLI Escuela Rural.`
      };
    });

    return NextResponse.json({ 
      success: true, 
      cursosCancelados: borrados.count,
      notificacionesSimuladas: notificacionesEnviadas
    });

  } catch (error) {
    console.error('Error en CRON vencimiento de escuela:', error);
    return NextResponse.json({ success: false, error: 'Fallo al ejecutar el CRON' }, { status: 500 });
  }
}
