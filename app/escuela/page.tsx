import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CatalogoEscuela from './CatalogoEscuela';
import { obtenerCatalogoCursos } from '@/app/actions/escuela';

export const metadata = {
  title: 'La Escuela Rural | AGROPACCIOLI',
  description: 'Aprenda a cultivar y criar animales con audios y videos desde su celular.',
};

export default async function EscuelaPage() {
  const cursosDB = await obtenerCatalogoCursos();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1">
        <CatalogoEscuela cursos={cursosDB} />
      </main>
      <Footer />
    </div>
  );
}
