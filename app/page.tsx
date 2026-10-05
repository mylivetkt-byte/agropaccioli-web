import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ClimaWidget from '@/components/home/ClimaWidget';
import HeroSection from '@/components/home/HeroSection';

// FASE 2: Carga Diferida (Lazy Loading) para mejorar velocidad en conexiones 3G
// Separamos el código (Bundle splitting) de los componentes que están debajo del primer impacto
const BuscadorCosechas = dynamic(() => import('@/components/home/BuscadorCosechas'), { 
  loading: () => <div className="h-40 flex items-center justify-center text-zinc-400 text-sm">Cargando cosechas...</div> 
});
const BolsaEmpleosPreview = dynamic(() => import('@/components/home/BolsaEmpleosPreview'));
const BuscadorPreciosNacional = dynamic(() => import('@/components/home/BuscadorPreciosNacional'));
const PortalAlmacenesB2B = dynamic(() => import('@/components/home/PortalAlmacenesB2B'));
const AcademiaAgroIA = dynamic(() => import('@/components/home/AcademiaAgroIA'));
const RedTransportistas = dynamic(() => import('@/components/home/RedTransportistas'));
const PoolCosechasB2B = dynamic(() => import('@/components/home/PoolCosechasB2B'));

// Los modales NO necesitan SSR (Server Side Rendering), ahorramos más peso
const FormularioCompradorModal = dynamic(() => import('@/components/mapa/FormularioComprador'));
const FormularioTransportadorModal = dynamic(() => import('@/components/mapa/FormularioTransportador'));

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-4">
          <ClimaWidget />
        </div>
        
        <HeroSection />
        
        {/* Componentes pesados aplazados */}
        <BuscadorCosechas />
        <PoolCosechasB2B />
        <BolsaEmpleosPreview />
        <BuscadorPreciosNacional />
        <PortalAlmacenesB2B />
        <AcademiaAgroIA />
        <RedTransportistas />
        
        <Suspense fallback={null}>
          <FormularioCompradorModal />
          <FormularioTransportadorModal />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

