'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowDown, ArrowUp } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function SoftwarePage() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <Navbar />

      {/* Sticky Header with Action Buttons */}
      <div className="sticky top-[108px] z-40 bg-white/90 backdrop-blur-md border-b border-emerald-200 shadow-sm p-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Regresar
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold px-4 py-2 rounded-xl transition-all"
            >
              <ArrowUp className="w-5 h-5" />
              <span className="hidden sm:inline">Ir Primera Página</span>
              <span className="sm:hidden">Inicio</span>
            </button>
            <button 
              onClick={scrollToBottom}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
            >
              <ArrowDown className="w-5 h-5" />
              <span className="hidden sm:inline">Ir Última Página</span>
              <span className="sm:hidden">Final</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Viewer Container */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto bg-white shadow-2xl relative">
        {/* We use an unoptimized img tag to guarantee 100% original sharpness of the infographic */}
        <div className="w-full relative min-h-screen">
          <img 
            src="/infografia-software.png" 
            alt="Infografía Software ERP Agropaccioli" 
            className="w-full h-auto object-contain block"
          />
          
          {/* Note for the user in case the image is missing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none" style={{ zIndex: -1 }}>
            <div className="bg-white/80 backdrop-blur p-8 rounded-3xl border-2 border-dashed border-emerald-300 pointer-events-auto">
              <h2 className="text-xl font-black text-emerald-900 mb-2">Imagen no encontrada</h2>
              <p className="text-sm text-zinc-600 max-w-md mx-auto">
                Para que la imagen se vea aquí, por favor guarda el archivo que enviaste en el chat dentro de la carpeta <strong>public/</strong> con el nombre exacto de: <br/><br/>
                <code className="bg-emerald-100 text-emerald-900 px-2 py-1 rounded font-mono font-bold">infografia-software.png</code>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
