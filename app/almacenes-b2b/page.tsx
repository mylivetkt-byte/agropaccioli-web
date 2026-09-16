'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import PortalAlmacenesB2B from '@/components/home/PortalAlmacenesB2B';

export default function AlmacenesB2BPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PortalAlmacenesB2B />
      </main>
      <Footer />
    </div>
  );
}
