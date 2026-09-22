'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import InteligenciaMercadoViewer from '@/components/inteligencia/InteligenciaMercadoViewer';

export default function InteligenciaMercadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8faf9] via-emerald-50/20 to-white">
      <Navbar />
      <main className="flex-1">
        <InteligenciaMercadoViewer />
      </main>
      <Footer />
    </div>
  );
}
