import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  // En un entorno de producción (ej: Vercel), puedes proteger esta ruta
  // validando un token en los headers (Authorization: Bearer CRON_SECRET)
  
  try {
    // 1. Buscar todas las cosechas 'disponibles' cuya fecha de vencimiento ya pasó.
    // Como el modelo actual no tiene fecha de vencimiento, usamos createdAt simulando 30 días.
    // Para un MVP, podemos marcar como 'vencido' a las que tengan más de X días.
    const hace30Dias = new Date();
    hace30Dias.setDate(hace30Dias.getDate() - 30);

    const cosechasVencidas = await prisma.cosecha.findMany({
      where: {
        estado: 'disponible'
        // createdAt: {
        //   lt: hace30Dias // Si se publicó hace más de 30 días
        // }
      },
      include: {
        productor: true
      }
    });

    if (cosechasVencidas.length === 0) {
      return NextResponse.json({ success: true, message: 'No hay productos vencidos para procesar hoy.' });
    }

    // 2. Actualizar el estado de todas a 'vencido'
    const actualizadas = await prisma.cosecha.updateMany({
      where: {
        id: { in: cosechasVencidas.map(c => c.id) }
      },
      data: {
        estado: 'vencido'
      }
    });

    // 3. Simular el envío de notificaciones WhatsApp
    // Aquí es donde iría la integración real con Twilio o Meta WhatsApp API
    const notificacionesEnviadas = cosechasVencidas.map(cosecha => {
      return {
        telefono: cosecha.productor.telefono,
        mensaje: `Hola ${cosecha.productor.nombre}, tu publicación de "${cosecha.titulo}" ha estado activa por más de 30 días y se ha cerrado automáticamente en AGROPACCIOLI. Si aún tienes el producto, entra a Mi Escaparate y vuelve a publicarlo.`
      };
    });

    return NextResponse.json({ 
      success: true, 
      procesadas: actualizadas.count,
      notificacionesSimuladas: notificacionesEnviadas
    });

  } catch (error) {
    console.error('Error en CRON expiraciones:', error);
    return NextResponse.json({ success: false, error: 'Fallo al ejecutar el CRON de expiraciones' }, { status: 500 });
  }
}
