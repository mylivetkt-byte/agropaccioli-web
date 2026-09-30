import React, { Suspense } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import MapaCosechasViewer from '@/components/mapa/MapaCosechasViewer';
import FormularioPublicarModal from '@/components/mapa/FormularioPublicar';


export default function MapaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <Navbar />
      <main className="flex-1 relative">
        <MapaCosechasViewer />
        <Suspense fallback={null}>
          <FormularioPublicarModal />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
