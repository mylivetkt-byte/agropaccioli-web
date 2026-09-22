import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ClimaWidget from '@/components/home/ClimaWidget';
import HeroSection from '@/components/home/HeroSection';
import BuscadorCosechas from '@/components/home/BuscadorCosechas';
import BolsaEmpleosPreview from '@/components/home/BolsaEmpleosPreview';
import PortalAlmacenesB2B from '@/components/home/PortalAlmacenesB2B';
import BuscadorPreciosNacional from '@/components/home/BuscadorPreciosNacional';
import AcademiaAgroIA from '@/components/home/AcademiaAgroIA';
import RedTransportistas from '@/components/home/RedTransportistas';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-4">
          <ClimaWidget />
        </div>
        <HeroSection />
        <BuscadorCosechas />
        <BolsaEmpleosPreview />
        <BuscadorPreciosNacional />
        <PortalAlmacenesB2B />
        <AcademiaAgroIA />
        <RedTransportistas />
      </main>
      <Footer />
    </div>
  );
}

