import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import BolsaEmpleosViewer from '@/components/empleos/BolsaEmpleosViewer';

export const metadata: Metadata = {
  title: 'Bolsa de Empleo Agropecuario & Rural | AGROPACCIOLI Colombia',
  description: 'Encuentra y publica ofertas de empleo en el campo colombiano: mayordomos, administradores de finca, recolectores, tractoristas, veterinarios y agrónomos sin intermediarios.'
};

export default function EmpleosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1">
        <BolsaEmpleosViewer />
      </main>
      <Footer />
    </div>
  );
}
