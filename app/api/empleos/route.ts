import { NextResponse } from 'next/server';
import { EMPLEOS_DATA } from '@/lib/agro-data';

export async function GET() {
  return NextResponse.json(EMPLEOS_DATA);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevoEmpleo = {
      id: `emp-${Date.now()}`,
      ...body,
      fechaPublicacion: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      verificadoKYC: true
    };
    return NextResponse.json({ success: true, empleo: nuevoEmpleo }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Error al procesar solicitud' }, { status: 400 });
  }
}
