import React, { Suspense } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import RedTransportistas from '@/components/home/RedTransportistas';
import FormularioTransportadorModal from '@/components/mapa/FormularioTransportador';

export default function TransportistasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 relative">
        <RedTransportistas />
        <Suspense fallback={null}>
          <FormularioTransportadorModal />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
