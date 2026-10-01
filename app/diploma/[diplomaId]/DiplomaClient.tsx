'use client';

import React, { useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function DiplomaClient({ diplomaNombre }: { diplomaNombre: string }) {
  const [descargando, setDescargando] = useState(false);

  const descargarPDF = async () => {
    try {
      setDescargando(true);
      const input = document.getElementById('diploma-pdf-container');
      if (!input) return;

      // Guardar el estilo original para restaurarlo después
      const originalTransform = input.style.transform;
      
      // Quitar la transformación temporalmente para que html2canvas capture 100% de la resolución sin recortar
      input.style.transform = 'none';
      
      // Asegurarse de que las imágenes se carguen sin CORS errors (aunque sean locales)
      const canvas = await html2canvas(input, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Restaurar el tamaño visual en pantalla
      input.style.transform = originalTransform;

      // Crear PDF (A4 en formato landscape)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1056, 816]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 1056, 816);
      pdf.save(`${diplomaNombre}.pdf`);
      
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Hubo un error descargando el PDF. Intente de nuevo.");
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="print:hidden w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-4">
      <Link 
        href="/escuela/libreta" 
        className="bg-white border-2 border-zinc-200 text-zinc-600 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-zinc-50 transition-colors shadow-sm"
      >
        <ArrowLeft className="w-5 h-5" /> Volver a mi Libreta
      </Link>
      
      <button 
        onClick={descargarPDF}
        disabled={descargando}
        className={`text-white font-black text-lg px-8 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 ${descargando ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 active:scale-95'}`}
      >
        <Download className="w-6 h-6" /> 
        {descargando ? 'GENERANDO ARCHIVO PDF...' : 'DESCARGAR DIPLOMA (PDF)'}
      </button>
    </div>
  );
}
