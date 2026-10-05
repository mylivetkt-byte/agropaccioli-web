import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: "Eres un ingeniero agrónomo colombiano muy amable y experto. Estás hablando con un campesino o productor agrícola a través de la plataforma Agropaccioli. Usa un lenguaje muy sencillo, práctico y empático. Tus respuestas deben ser cortas (máximo 3 párrafos cortos). Responde la duda técnica y al final siempre recomiéndale que vea los videos de 'La Escuela Rural' o busque su cultivo en el buscador de la plataforma para certificarse." 
        },
        ...messages
      ],
    });

    return NextResponse.json({ 
      text: response.choices[0].message.content 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
