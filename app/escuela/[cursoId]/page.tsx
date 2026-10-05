import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import SalonDeClases from './SalonDeClases';
import prisma from '@/lib/prisma';

export default async function CultivoPage({ params }: { params: Promise<{ cursoId: string }> }) {
  const resolvedParams = await params;
  const cursoId = resolvedParams.cursoId;

  // Buscar el curso en la BD real
  const curso = await prisma.academiaCurso.findUnique({
    where: { id: cursoId }
  });

  const nombreReal = curso ? curso.nombre : 'Curso Desconocido';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1">
        <SalonDeClases cursoId={cursoId} nombreReal={nombreReal} />
      </main>
      <Footer />
    </div>
  );
}
