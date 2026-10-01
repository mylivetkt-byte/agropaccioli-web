import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ClientLibreta from './ClientLibreta';

export const metadata = {
  title: 'Mi Libreta de Notas | AGROPACCIOLI',
  description: 'Revise sus calificaciones, cursos y descargue sus diplomas.',
};

export default function LibretaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-amber-50 to-white">
        <ClientLibreta />
      </main>
      <Footer />
    </div>
  );
}
