import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ShieldCheck, Copyright, FileText, Scale } from 'lucide-react';

export default function DerechosAutorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
            <div className="bg-emerald-900 p-8 md:p-12 text-center text-white">
              <Copyright className="w-16 h-16 mx-auto text-emerald-400 mb-6" />
              <h1 className="text-3xl md:text-4xl font-black mb-4">Políticas de Derechos de Autor</h1>
              <p className="text-emerald-200 text-lg">Ley 23 de 1982 y Decisión Andina 351 de 1993</p>
            </div>
            
            <div className="p-8 md:p-16 text-zinc-700 leading-loose space-y-6">
              <p className="text-lg mb-10" style={{ textAlign: 'justify' }}>
                Dando cumplimiento a la legislación colombiana vigente en materia de Propiedad Intelectual, en particular la Ley 23 de 1982 sobre Derechos de Autor, la Ley 44 de 1993 y la Decisión 351 de 1993 de la Comunidad Andina de Naciones, se establecen los siguientes términos y condiciones sobre el uso de contenidos en <strong>AGROPACCIOLI</strong>.
              </p>

              <h3 className="flex items-center gap-3 text-emerald-900 font-bold text-xl md:text-2xl mt-12 border-b-2 border-emerald-100 pb-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                1. Propiedad Intelectual de AGROPACCIOLI
              </h3>
              <p style={{ textAlign: 'justify' }}>
                Todo el contenido disponible en la plataforma <strong>AGROPACCIOLI</strong>, incluyendo pero no limitándose a: textos, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales, compilaciones de datos, código fuente y software, es propiedad exclusiva de <strong>TODOSOFT</strong> (Adolfo León Quintero H.) o de sus proveedores de contenido, y está protegido por las leyes colombianas e internacionales de derechos de autor.
              </p>

              <h3 className="flex items-center gap-3 text-emerald-900 font-bold text-xl md:text-2xl mt-12 border-b-2 border-emerald-100 pb-3">
                <FileText className="w-6 h-6 text-emerald-600" />
                2. Licencia y Acceso a la Plataforma
              </h3>
              <p style={{ textAlign: 'justify' }}>
                <strong>TODOSOFT</strong> concede a los usuarios una licencia limitada, revocable y no exclusiva para acceder y hacer uso personal y comercial (según aplique a los servicios contratados) de la plataforma. Esta licencia <strong>no incluye</strong>:
              </p>
              <ul className="list-disc pl-10 space-y-3 my-6 marker:text-emerald-500">
                <li className="pl-2" style={{ textAlign: 'justify' }}>La reventa o el uso comercial de la plataforma o sus contenidos por fuera de los propósitos de la misma.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>La recolección y el uso de listados de productos, descripciones, precios o directorios.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Cualquier uso derivado de la plataforma o de sus contenidos.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>La extracción de datos, uso de robots, o herramientas similares de recolección y extracción de datos.</li>
              </ul>

              <h3 className="flex items-center gap-3 text-emerald-900 font-bold text-xl md:text-2xl mt-12 border-b-2 border-emerald-100 pb-3">
                <Scale className="w-6 h-6 text-emerald-600" />
                3. Contenido Generado por el Usuario
              </h3>
              <p style={{ textAlign: 'justify' }}>
                Los usuarios que publiquen contenido, ofertas, imágenes o cualquier otra información en la plataforma <strong>AGROPACCIOLI</strong>:
              </p>
              <ul className="list-disc pl-10 space-y-3 my-6 marker:text-emerald-500">
                <li className="pl-2" style={{ textAlign: 'justify' }}>Garantizan que son los autores y titulares de los derechos de autor de dicho contenido, o que cuentan con las autorizaciones necesarias para publicarlo.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Conceden a <strong>TODOSOFT</strong> una licencia no exclusiva, libre de regalías, perpetua, irrevocable y totalmente sublicenciable para usar, reproducir, modificar, adaptar, publicar, traducir, crear trabajos derivados, distribuir y mostrar dicho contenido en todo el mundo y en cualquier medio.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Eximen a <strong>TODOSOFT</strong> de cualquier responsabilidad derivada de reclamaciones de terceros por infracciones a derechos de autor originadas en el contenido publicado por el usuario.</li>
              </ul>

              <h3 className="flex items-center gap-3 text-emerald-900 font-bold text-xl md:text-2xl mt-12 border-b-2 border-emerald-100 pb-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                4. Reporte de Infracciones
              </h3>
              <p style={{ textAlign: 'justify' }}>
                Si usted considera que su obra ha sido copiada de una manera que constituye una infracción de los derechos de autor, por favor envíe su reclamación al correo electrónico: <a href="mailto:todosoft2009@gmail.com" className="text-emerald-700 font-bold hover:underline">todosoft2009@gmail.com</a>, proporcionando la siguiente información:
              </p>
              <ul className="list-disc pl-10 space-y-3 my-6 marker:text-emerald-500">
                <li className="pl-2" style={{ textAlign: 'justify' }}>Descripción de la obra protegida que usted afirma ha sido infringida.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Ubicación (URL o descripción) del material supuestamente infractor en la plataforma.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Sus datos de contacto: nombre, dirección, número de teléfono y correo electrónico.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Una declaración de que usted cree de buena fe que el uso disputado no está autorizado por el propietario de los derechos de autor.</li>
                <li className="pl-2" style={{ textAlign: 'justify' }}>Firma física o electrónica de la persona autorizada para actuar en nombre del titular de los derechos de autor.</li>
              </ul>

              <h3 className="flex items-center gap-3 text-emerald-900 font-bold text-xl md:text-2xl mt-12 border-b-2 border-emerald-100 pb-3">
                <Scale className="w-6 h-6 text-emerald-600" />
                5. Acciones Legales
              </h3>
              <p style={{ textAlign: 'justify' }}>
                <strong>TODOSOFT</strong> se reserva el derecho de tomar todas las acciones civiles, penales o administrativas que la ley colombiana permite (Ley 23 de 1982, Código Penal Colombiano, entre otras) para proteger sus derechos de propiedad intelectual, así como para remover contenidos que infrinjan los derechos de terceros.
              </p>

              <div className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-400 text-amber-900 mt-16 shadow-sm" style={{ textAlign: 'justify' }}>
                <p className="text-sm font-medium">
                  <strong>⚠️ NOTA LEGAL:</strong> Estas políticas han sido redactadas conforme a la normativa colombiana vigente en Derechos de Autor. Fecha de actualización: 30 de Septiembre de 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
