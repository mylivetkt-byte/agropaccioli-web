import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { MapPin, TrendingUp, ShieldCheck, PlusCircle } from 'lucide-react';

// Función para limpiar el slug y hacerlo legible 
// Ej: aguacate-hass-antioquia -> "Aguacate Hass en Antioquia"
function formatearSlug(slug: string) {
  const palabras = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  if (palabras.length > 1) {
    const lugar = palabras.pop();
    return `${palabras.join(' ')} en ${lugar}`;
  }
  return palabras.join(' ');
}

type Props = {
  params: Promise<{ slug: string }>
};

// FASE 3: Generación dinámica de Meta Etiquetas para SEO Programático
// Esto es lo que lee Google para indexar la página y posicionarla en los primeros lugares.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const terminoBusqueda = formatearSlug(slug);

  return {
    title: `Precio y Compradores de ${terminoBusqueda} | Mercado AGROPACCIOLI`,
    description: `Descubre el precio actual, encuentra compradores directos y publica tu cosecha de ${terminoBusqueda} sin intermediarios. Negocio seguro y verificado.`,
    keywords: [terminoBusqueda, 'comprar', 'vender', 'precio hoy', 'agricultura colombia', 'sin intermediarios', 'agropaccioli'],
  };
}

export default async function MercadoDynamicPage({ params }: Props) {
  const { slug } = await params;
  const terminoBusqueda = formatearSlug(slug);
  
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Hero de la Landing Page SEO altamente enfocada */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-900 p-8 md:p-14 text-center text-white relative overflow-hidden">
              
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              
              <span className="inline-block px-4 py-1.5 bg-emerald-700/50 rounded-full text-emerald-100 text-xs font-bold mb-6 uppercase tracking-widest border border-emerald-500/50">
                Mercado Directo Colombia
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Comercialización de <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                  {terminoBusqueda}
                </span>
              </h1>
              <p className="text-emerald-100/90 md:text-lg max-w-2xl mx-auto font-medium">
                Conecta directamente con productores y mayoristas verificados. 
                Garantiza el mejor precio del mercado hoy, 100% sin intermediarios.
              </p>
            </div>
            
            <div className="p-8 md:p-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 bg-white">
              <Link
                href={`/mapa-cosechas?publicar=true&ref=${slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-lg px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Vender mi Cosecha
              </Link>
              <Link
                href={`/?registro_comprador=true&ref=${slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-black text-lg px-8 py-4 rounded-xl shadow-md transition-all"
              >
                <ShieldCheck className="w-5 h-5" />
                Soy Comprador / Mayorista
              </Link>
            </div>
          </div>

          {/* Widgets Contextuales para enriquecer la experiencia y el SEO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-xl mb-2">Tendencia de Precio</h3>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  Consulta el precio oficial de referencia (SIPSA/DANE) para tu región. Actualizamos diariamente para que negocies siempre con datos reales y justos.
                </p>
                <Link href="/precios-mercado" className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  Consultar precios oficiales <TrendingUp className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-xl mb-2">Lotes Disponibles</h3>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  Revisa nuestro mapa satelital interactivo para descubrir lotes verificados que están listos para negociar directamente desde la finca.
                </p>
                <Link href="/mapa-cosechas" className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                  Ver Mapa de Cosechas <MapPin className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
