'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ScrollButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar botones cuando baje un poco (más de 200px)
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3">
      <button 
        onClick={scrollToTop} 
        className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-400"
        aria-label="Subir al inicio"
        title="Subir"
      >
        <ChevronUp className="w-7 h-7" />
      </button>
      
      <button 
        onClick={scrollToBottom} 
        className="w-12 h-12 bg-zinc-800 hover:bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all border-2 border-white focus:outline-none focus:ring-4 focus:ring-zinc-400"
        aria-label="Bajar al final"
        title="Bajar"
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </div>
  );
}
