import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { busqueda, sector, clima, departamento } = await req.json();

    // 1. Obtener los cursos del sector seleccionado
    const cursosBD = await prisma.academiaCurso.findMany({
      where: {
        estado: 'ACTIVO',
        ...(sector !== 'Todas' ? { sector: sector.toLowerCase() } : {})
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        sector: true
      }
    });

    if (cursosBD.length === 0) {
      return NextResponse.json({ recomendaciones: [] });
    }

    // 2. Si no hay una búsqueda específica, podemos simplemente retornar todos ordenados
    if (!busqueda || busqueda.trim() === '') {
      return NextResponse.json({ recomendaciones: cursosBD.map(c => c.id) });
    }

    // 3. Usar IA para encontrar los mejores cursos para el usuario basado en su búsqueda
    const cursosTexto = cursosBD.map(c => `ID: ${c.id} | Curso: ${c.nombre} | Descripción: ${c.descripcion}`).join('\n');

    const prompt = `
      Eres un experto agrónomo recomendando cursos a un campesino en Colombia.
      El usuario está en el departamento de ${departamento || 'Colombia'} con clima ${clima || 'desconocido'}.
      El usuario ha buscado: "${busqueda}".
      
      Estos son los cursos disponibles en la base de datos:
      ${cursosTexto}

      Tu tarea es seleccionar los cursos que mejor se adapten a la búsqueda y necesidades del usuario.
      Devuelve ÚNICAMENTE un arreglo con los IDs de los cursos recomendados, ordenados del mejor al menos relevante.
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        recomendacionesIds: z.array(z.string()).describe("Lista de IDs de cursos recomendados")
      }),
      prompt: prompt,
    });

    return NextResponse.json({ recomendaciones: object.recomendacionesIds });
    
  } catch (error) {
    console.error("Error en recomendación IA:", error);
    return NextResponse.json({ recomendaciones: [] }, { status: 500 });
  }
}
