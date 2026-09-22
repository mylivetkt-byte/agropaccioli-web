'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ConfiguradorAlertasModal from '@/components/alertas/ConfiguradorAlertasModal';

export default function AlertasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8faf9] via-emerald-50/20 to-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10">
        <ConfiguradorAlertasModal isStandalonePage={true} />
      </main>
      <Footer />
    </div>
  );
}
