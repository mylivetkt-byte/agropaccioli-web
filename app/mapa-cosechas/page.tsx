import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import MapaCosechasViewer from '@/components/mapa/MapaCosechasViewer';

export default function MapaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <Navbar />
      <main className="flex-1 relative">
        <MapaCosechasViewer />
      </main>
      <Footer />
    </div>
  );
}
