const fs = require('fs');

fs.writeFileSync('e:/agroweb/app/layout.tsx', import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: AGROPACCIOLI - El Ecosistema Agropecuario de Colombia,
  description: Portal transaccional, educativo y comercial para Productores Agrícolas, Ganaderos, Acuícolas, Almacenes de Insumos B2B y Transportistas de Colombia.,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang=es>
      <body className=antialiased bg-[#f8faf9] text-[#152417]>
        {children}
      </body>
    </html>
  );
}
, 'utf8');

fs.writeFileSync('e:/agroweb/app/page.tsx', import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ClimaWidget from '@/components/home/ClimaWidget';
import HeroSection from '@/components/home/HeroSection';
import BuscadorCosechas from '@/components/home/BuscadorCosechas';
import PortalAlmacenesB2B from '@/components/home/PortalAlmacenesB2B';
import BuscadorPreciosNacional from '@/components/home/BuscadorPreciosNacional';
import AcademiaAgroIA from '@/components/home/AcademiaAgroIA';
import RedTransportistas from '@/components/home/RedTransportistas';

export default function HomePage() {
  return (
    <div className=min-h-screen flex flex-col bg-white selection:bg-emerald-200 selection:text-emerald-900>
      <Navbar />

      <main className=flex-1>
        <div className=container mx-auto px-4 pt-4>
          <ClimaWidget />
        </div>

        <HeroSection />
        <BuscadorCosechas />
        <BuscadorPreciosNacional />
        <PortalAlmacenesB2B />
        <AcademiaAgroIA />
        <RedTransportistas />
      </main>

      <Footer />
    </div>
  );
}
, 'utf8');

fs.writeFileSync('e:/agroweb/app/mapa-cosechas/page.tsx', import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import MapaCosechasViewer from '@/components/mapa/MapaCosechasViewer';

export default function MapaPage() {
  return (
    <div className=min-h-screen flex flex-col bg-zinc-100>
      <Navbar />
      <main className=flex-1 relative>
        <MapaCosechasViewer />
      </main>
      <Footer />
    </div>
  );
}
, 'utf8');

fs.writeFileSync('e:/agroweb/app/transportistas/page.tsx', import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import RedTransportistas from '@/components/home/RedTransportistas';

export default function TransportistasPage() {
  return (
    <div className=min-h-screen flex flex-col bg-white>
      <Navbar />
      <main className=flex-1>
        <RedTransportistas />
      </main>
      <Footer />
    </div>
  );
}
, 'utf8');
fs.writeFileSync('e:/agroweb/app/agremiaciones/page.tsx', import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Users2, ShieldCheck, HeartHandshake, ExternalLink, Globe } from 'lucide-react';
import { AGREMIACIONES_DATA } from '@/lib/agro-data';

export default function AgremiacionesPage() {
  return (
    <div className=min-h-screen flex flex-col bg-white>
      <Navbar />

      <main className=flex-1 container mx-auto px-4 py-8>
        <div className=bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-xl>
          <span className=bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider>
            TEJIDO SOCIAL & COOPERATIVISMO RURAL
          </span>
          <h1 className=text-3xl sm:text-5xl font-black text-white mt-2>
            Directorio de Agremiaciones, Cooperativas y Fundaciones
          </h1>
          <p className=text-xs sm:text-sm text-emerald-100 max-w-2xl mt-2 leading-relaxed>
            Conecta con los gremios de representación nacional, cooperativas de pequeños agricultores y ONGs de apoyo al desarrollo productivo y soberanía alimentaria en Colombia.
          </p>
        </div>

        <div className=grid grid-cols-1 md:grid-cols-2 gap-6 mb-16>
          {AGREMIACIONES_DATA.map((agr) => (
            <div key={agr.id} className=bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between>
              <div>
                <div className=flex items-center justify-between mb-3>
                  <span className=bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full>
                    {agr.tipo}
                  </span>
                  <span className=text-xs text-zinc-500 font-semibold>
                    {agr.afiliados.toLocaleString('es-CO')} Familias Afiliadas
                  </span>
                </div>

                <h3 className=text-xl font-black text-emerald-950>{agr.nombre} ({agr.sigla})</h3>
                <p className=text-xs text-zinc-600 mt-2 leading-relaxed>{agr.descripcion}</p>

                <div className=mt-4 p-3.5 bg-emerald-50/70 rounded-2xl>
                  <span className=text-xs font-bold text-emerald-900 block mb-1.5>Programas de Apoyo Activos:</span>
                  <div className=flex flex-wrap gap-1.5>
                    {agr.programasApoyo.map((prog, pIdx) => (
                      <span key={pIdx} className=bg-white text-emerald-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-emerald-200>
                        ? {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className=mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs>
                <span className=text-zinc-500>Contacto: <strong>{agr.contacto}</strong></span>
                {agr.web && (
                  <a href={agr.web} target=_blank rel=noopener noreferrer className=text-emerald-700 font-bold flex items-center gap-1 hover:underline>
                    <span>Sitio Oficial</span>
                    <ExternalLink className=w-3.5 h-3.5 />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
, 'utf8');

fs.writeFileSync('e:/agroweb/app/academia-ia/page.tsx', 'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AcademiaAgroIA from '@/components/home/AcademiaAgroIA';
import { 
  Bot, 
  Sparkles, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Users, 
  Video, 
  FileText 
} from 'lucide-react';

export default function AcademiaIAPage() {
  return (
    <div className=min-h-screen flex flex-col bg-white>
      <Navbar />

      <main className=flex-1 container mx-auto px-4 py-8>
        <div className=bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-xl>
          <div className=max-w-3xl space-y-3>
            <span className=bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider>
              TRANSFERENCIA TECNOLÓGICA Y ASISTENCIA TÉCNICA
            </span>
            <h1 className=text-3xl sm:text-5xl font-black text-white>
              Academia Agrícola & Pecuaria con IA
            </h1>
            <p className=text-xs sm:text-sm text-emerald-100 leading-relaxed>
              Capacítate en Buenas Prácticas Agrícolas (BPA), manejo integrado de plagas, bioseguridad en estanques y nutrición de precisión. Consulta a nuestra IA entrenada con protocolos del ICA y AGROSAVIA.
            </p>
          </div>
        </div>

        <AcademiaAgroIA />

        <div className=mt-14 mb-16>
          <h2 className=text-2xl font-black text-emerald-950 mb-6 flex items-center gap-2>
            <BookOpen className=w-6 h-6 text-emerald-600 />
            <span>Guías Técnicas y Protocolos Oficiales para Colombia</span>
          </h2>

          <div className=grid grid-cols-1 md:grid-cols-3 gap-6>
            <div className=p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-sm>
              <span className=text-2xl mb-2 block>??</span>
              <h3 className=font-bold text-emerald-950 text-base>Manejo Fitosanitario en Aguacate Hass</h3>
              <p className=text-xs text-zinc-600 mt-1>Protocolos de exportación ICA, control de pasador del fruto y marchitez por Phytophthora.</p>
              <div className=mt-4 flex items-center justify-between text-xs font-bold text-emerald-700>
                <span>PDF Oficial ICA • 45 Págs</span>
                <span className=bg-emerald-100 px-2 py-0.5 rounded>Descargar</span>
              </div>
            </div>

            <div className=p-5 rounded-2xl bg-orange-50/50 border border-orange-200 shadow-sm>
              <span className=text-2xl mb-2 block>??</span>
              <h3 className=font-bold text-emerald-950 text-base>Ganadería Sostenible y Silvopastoreo</h3>
              <p className=text-xs text-zinc-600 mt-1>Sistemas silvopastoriles intensivos con botón de oro y leucaena para aumentar carga animal.</p>
              <div className=mt-4 flex items-center justify-between text-xs font-bold text-orange-700>
                <span>Guía FEDEGAN • 62 Págs</span>
                <span className=bg-orange-100 px-2 py-0.5 rounded>Descargar</span>
              </div>
            </div>

            <div className=p-5 rounded-2xl bg-sky-50/50 border border-sky-200 shadow-sm>
              <span className=text-2xl mb-2 block>??</span>
              <h3 className=font-bold text-emerald-950 text-base>Parámetros de Calidad del Agua en Tilapia</h3>
              <p className=text-xs text-zinc-600 mt-1>Control de amonio, nitritos, alcalinidad y uso de aireadores tipo paleta en estanques de tierra.</p>
              <div className=mt-4 flex items-center justify-between text-xs font-bold text-sky-700>
                <span>Manual AUNAP • 38 Págs</span>
                <span className=bg-sky-100 px-2 py-0.5 rounded>Descargar</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
, 'utf8');
fs.writeFileSync('e:/agroweb/app/almacenes-b2b/page.tsx', 'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  Store, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Search, 
  Award, 
  Zap, 
  Package 
} from 'lucide-react';
import { ALMACENES_INSUMOS_DATA } from '@/lib/agro-data';

export default function AlmacenesB2BPage() {
  const [filtro, setFiltro] = useState('');

  return (
    <div className=min-h-screen flex flex-col bg-white>
      <Navbar />

      <main className=flex-1 container mx-auto px-4 py-8>
        <div className=bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-xl>
          <div className=max-w-3xl space-y-3>
            <span className=bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider>
              DIRECTORIO NACIONAL DE PROVEEDORES & INSUMOS B2B
            </span>
            <h1 className=text-3xl sm:text-5xl font-black text-white>
              Almacenes Agrícolas, Ganaderos y Piscícolas
            </h1>
            <p className=text-xs sm:text-sm text-emerald-100 leading-relaxed>
              Encuentra distribuidores autorizados de fertilizantes, semillas certificadas ICA, biológicos, fármacos veterinarios y concentrados acuícolas en tu departamento con despacho a finca.
            </p>
          </div>
        </div>

        <div className=grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16>
          {ALMACENES_INSUMOS_DATA.map((almacen) => (
            <div
              key={almacen.id}
              className=bg-white rounded-3xl border border-emerald-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between
            >
              <div className=h-36 relative>
                <img src={almacen.banner} alt={almacen.nombreComercial} className=w-full h-full object-cover />
                <div className=absolute inset-0 bg-gradient-to-t from-black/80 to-transparent></div>
                <div className=absolute bottom-3 left-4 text-white>
                  <span className=text-xs font-bold bg-emerald-600 px-2.5 py-0.5 rounded-full>
                    {almacen.municipio}, {almacen.departamento}
                  </span>
                  <h3 className=font-bold text-sm text-white mt-1>{almacen.nombreComercial}</h3>
                </div>
              </div>

              <div className=p-5 flex-1 flex flex-col justify-between>
                <div>
                  <div className=flex items-center gap-1.5 text-xs text-emerald-700 font-bold mb-3>
                    <ShieldCheck className=w-4 h-4 />
                    <span>NIT Verificado: {almacen.nit}</span>
                  </div>

                  <span className=text-xs font-bold text-zinc-900 block mb-2>Catálogo Disponible:</span>
                  <div className=space-y-2>
                    {almacen.catalogoDestacado.map((prod, idx) => (
                      <div key={idx} className=flex justify-between items-center text-xs p-2 bg-emerald-50/60 rounded-xl>
                        <span className=font-medium text-zinc-700>{prod.nombre}</span>
                        <span className=font-black text-emerald-800></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className=mt-5 pt-3 border-t border-zinc-100 flex gap-2>
                  <a
                    href={https://wa.me/}
                    target=_blank
                    rel=noopener noreferrer
                    className=flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5
                  >
                    <MessageCircle className=w-4 h-4 />
                    <span>Contactar Asesor B2B</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
, 'utf8');

fs.writeFileSync('e:/agroweb/app/precios-mercado/page.tsx', 'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Download, 
  FileSpreadsheet, 
  Building2, 
  DollarSign, 
  Scale, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';
import { PRECIOS_MERCADO_DATA, TRM_DATA } from '@/lib/agro-data';

export default function PreciosMercadoPage() {
  const [filtro, setFiltro] = useState('');
  const [fuenteFiltro, setFuenteFiltro] = useState('todos');

  const filtrados = PRECIOS_MERCADO_DATA.filter(p => {
    const matchText = p.producto.toLowerCase().includes(filtro.toLowerCase()) ||
                      p.mercado.toLowerCase().includes(filtro.toLowerCase());
    const matchFuente = fuenteFiltro === 'todos' || p.fuente === fuenteFiltro;
    return matchText && matchFuente;
  });

  return (
    <div className=min-h-screen flex flex-col bg-white>
      <Navbar />

      <main className=flex-1 container mx-auto px-4 py-8>
        <div className=bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl>
          <div className=flex flex-col lg:flex-row lg:items-center justify-between gap-6>
            <div>
              <div className=inline-flex items-center gap-2 bg-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3>
                <TrendingUp className=w-4 h-4 />
                <span>OBSERVATORIO DE PRECIOS AGROPECUARIOS DE COLOMBIA</span>
              </div>
              <h1 className=text-3xl sm:text-4xl font-black text-white>
                Inteligencia de Mercado & Precios Mayoristas
              </h1>
              <p className=text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1>
                Boletines diarios del Sistema de Información de Precios (SIPSA - DANE), Federación Nacional de Cafeteros, FEDEGAN y FEDEACUA.
              </p>
            </div>

            <div className=bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[240px]>
              <div className=flex items-center gap-2 text-xs text-emerald-200>
                <DollarSign className=w-4 h-4 text-emerald-400 />
                <span>TRM Oficial Dólar</span>
              </div>
              <div className=text-2xl font-black text-white mt-1>
                 COP
              </div>
              <div className=text-[11px] text-emerald-300 mt-0.5>
                Euro:  COP • {TRM_DATA.fecha}
              </div>
            </div>
          </div>
        </div>

        <div className=bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200 mb-6>
          <div className=grid grid-cols-1 sm:grid-cols-3 gap-3>
            <div className=sm:col-span-2 relative>
              <Search className=w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 />
              <input
                type=text
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder=Filtrar por producto, central de abastos o ciudad...
                className=w-full bg-white border border-emerald-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500
              />
            </div>
            <div>
              <select
                value={fuenteFiltro}
                onChange={(e) => setFuenteFiltro(e.target.value)}
                className=w-full bg-white border border-emerald-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-700 outline-none focus:ring-2 focus:ring-emerald-500
              >
                <option value=todos>?? Todas las Fuentes Oficiales</option>
                <option value=SIPSA / DANE>SIPSA / DANE</option>
                <option value=FNC>FNC (Café)</option>
                <option value=FEDEGAN>FEDEGAN (Ganado)</option>
                <option value=FEDEACUA>FEDEACUA (Piscícola)</option>
              </select>
            </div>
          </div>
        </div>

        <div className=bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden mb-12>
          <div className=overflow-x-auto>
            <table className=w-full text-left border-collapse>
              <thead>
                <tr className=bg-emerald-800 text-white text-xs uppercase tracking-wider>
                  <th className=p-3.5>Producto</th>
                  <th className=p-3.5>Sector</th>
                  <th className=p-3.5>Mercado / Central</th>
                  <th className=p-3.5>Precio Promedio</th>
                  <th className=p-3.5>Mín - Máx</th>
                  <th className=p-3.5>Tendencia 24h</th>
                  <th className=p-3.5>Fuente Oficial</th>
                </tr>
              </thead>
              <tbody className=text-xs divide-y divide-emerald-100 text-zinc-700>
                {filtrados.map((p) => (
                  <tr key={p.id} className=hover:bg-emerald-50/50 transition-colors>
                    <td className=p-3.5 font-bold text-emerald-950>{p.producto}</td>
                    <td className=p-3.5>
                      <span className={px-2 py-0.5 rounded-full font-bold text-[10px] }>
                        {p.sector.toUpperCase()}
                      </span>
                    </td>
                    <td className=p-3.5 text-zinc-600>{p.mercado}</td>
                    <td className=p-3.5 font-black text-emerald-700 text-sm>
                       <span className=text-[10px] text-zinc-400 font-normal>/{p.unidad}</span>
                    </td>
                    <td className=p-3.5 text-zinc-500>
                       - 
                    </td>
                    <td className=p-3.5>
                      <div className={lex items-center gap-1 font-bold }>
                        {p.variacion24h > 0 ? +% ? : p.variacion24h < 0 ? ${p.variacion24h}% ? : '0.0% ='}
                      </div>
                    </td>
                    <td className=p-3.5>
                      <span className=bg-zinc-100 px-2 py-0.5 rounded text-[10px] font-semibold text-zinc-600>
                        {p.fuente}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
, 'utf8');

fs.writeFileSync('e:/agroweb/app/admin/page.tsx', 'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  ShieldCheck, 
  Newspaper, 
  DollarSign, 
  Users, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  Scale, 
  AlertTriangle, 
  Eye 
} from 'lucide-react';
import { NOTICIAS_DATA, TRM_DATA, COSECHAS_DATA, ALMACENES_INSUMOS_DATA } from '@/lib/agro-data';
import { NoticiaAgraria } from '@/types/agro';

export default function AdminPage() {
  const [tabActiva, setTabActiva] = useState<'noticias' | 'kyc' | 'trm' | 'legales'>('noticias');
  const [noticias, setNoticias] = useState<NoticiaAgraria[]>(NOTICIAS_DATA);
  const [modalNuevaNoticia, setModalNuevaNoticia] = useState(false);
  const [trmVal, setTrmVal] = useState(TRM_DATA.dolarCOP);

  const eliminarNoticia = (id: string) => {
    setNoticias(noticias.filter(n => n.id !== id));
  };

  const handleCrearNoticia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nueva: NoticiaAgraria = {
      id: 'not-' + Date.now(),
      titulo: formData.get('titulo') as string,
      resumen: formData.get('resumen') as string,
      contenido: formData.get('contenido') as string,
      categoria: formData.get('categoria') as string,
      autor: formData.get('autor') as string,
      fecha: '10 de Septiembre, 2026',
      imagen: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
      destacada: false,
      fuenteOficial: formData.get('fuente') as string
    };
    setNoticias([nueva, ...noticias]);
    setModalNuevaNoticia(false);
  };

  return (
    <div className=min-h-screen flex flex-col bg-zinc-50>
      <Navbar />

      <main className=flex-1 container mx-auto px-4 py-8>
        <div className=bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4>
          <div className=flex items-center gap-3>
            <div className=p-3 bg-emerald-600 text-white rounded-2xl shadow-md>
              <ShieldCheck className=w-6 h-6 />
            </div>
            <div>
              <h1 className=text-2xl font-black text-emerald-950>Panel de Control & Administración Global</h1>
              <p className=text-xs text-zinc-500>Gestión de Contenidos, Moderación KYC Anti-Fraude y Divisas</p>
            </div>
          </div>

          <div className=flex items-center gap-2>
            <span className=bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5>
              <span className=w-2 h-2 rounded-full bg-emerald-500 animate-pulse></span>
              SuperAdmin Activo
            </span>
          </div>
        </div>

        <div className=flex flex-wrap gap-2 mb-6>
          <button
            onClick={() => setTabActiva('noticias')}
            className={lex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all }
          >
            <Newspaper className=w-4 h-4 />
            <span>CRUD de Noticias & Boletines ({noticias.length})</span>
          </button>

          <button
            onClick={() => setTabActiva('kyc')}
            className={lex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all }
          >
            <Users className=w-4 h-4 />
            <span>Moderación KYC Anti-Humo ({COSECHAS_DATA.length + ALMACENES_INSUMOS_DATA.length})</span>
          </button>

          <button
            onClick={() => setTabActiva('trm')}
            className={lex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all }
          >
            <DollarSign className=w-4 h-4 />
            <span>Monedas & TRM Diaria</span>
          </button>

          <button
            onClick={() => setTabActiva('legales')}
            className={lex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all }
          >
            <Scale className=w-4 h-4 />
            <span>Marco Legal & Exención</span>
          </button>
        </div>

        {tabActiva === 'noticias' && (
          <div className=bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm>
            <div className=flex items-center justify-between mb-6>
              <div>
                <h2 className=text-lg font-bold text-emerald-950>Gestor de Noticias y Alertas Fitosanitarias</h2>
                <p className=text-xs text-zinc-500>Publica boletines oficiales del sector agropecuario</p>
              </div>
              <button
                onClick={() => setModalNuevaNoticia(true)}
                className=inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors
              >
                <Plus className=w-4 h-4 />
                <span>Nueva Noticia</span>
              </button>
            </div>

            <div className=space-y-4>
              {noticias.map((n) => (
                <div key={n.id} className=p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4>
                  <div className=flex-1>
                    <div className=flex items-center gap-2 mb-1>
                      <span className=bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded>
                        {n.categoria}
                      </span>
                      <span className=text-[11px] text-zinc-400>{n.fecha} • {n.fuenteOficial}</span>
                    </div>
                    <h3 className=font-bold text-emerald-950 text-sm>{n.titulo}</h3>
                    <p className=text-xs text-zinc-600 line-clamp-1 mt-0.5>{n.resumen}</p>
                  </div>

                  <div className=flex items-center gap-2>
                    <button
                      onClick={() => alert('Previsualizando noticia:\n\n' + n.titulo + '\n\n' + n.contenido)}
                      className=p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100
                      title=Ver
                    >
                      <Eye className=w-4 h-4 />
                    </button>
                    <button
                      onClick={() => eliminarNoticia(n.id)}
                      className=p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100
                      title=Eliminar
                    >
                      <Trash2 className=w-4 h-4 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tabActiva === 'kyc' && (
          <div className=bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm>
            <h2 className=text-lg font-bold text-emerald-950 mb-2>Cuentas y Publicaciones en Verificación KYC</h2>
            <p className=text-xs text-zinc-500 mb-6>Filtro de seguridad para evitar publicaciones fraudulentas (Anti-Humo)</p>

            <div className=space-y-3>
              {COSECHAS_DATA.map((c) => (
                <div key={c.id} className=p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between>
                  <div>
                    <span className=text-xs font-bold text-emerald-950 block>{c.productor.nombre} ({c.productor.finca})</span>
                    <span className=text-[11px] text-zinc-500>Publicación: {c.titulo} • {c.municipio}, {c.departamento}</span>
                  </div>
                  <div className=flex items-center gap-2>
                    <span className=bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1>
                      <CheckCircle className=w-3.5 h-3.5 text-emerald-600 /> Aprobado KYC
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tabActiva === 'trm' && (
          <div className=bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm max-w-xl>
            <h2 className=text-lg font-bold text-emerald-950 mb-2>Ajuste de Monedas y TRM Diaria</h2>
            <p className=text-xs text-zinc-500 mb-6>Modifica los valores de referencia cambiaria para el cálculo de exportaciones</p>

            <div className=space-y-4 text-xs>
              <div>
                <label className=font-bold text-zinc-700 block mb-1>TRM Dólar (USD / COP):</label>
                <input
                  type=number
                  value={trmVal}
                  onChange={(e) => setTrmVal(Number(e.target.value))}
                  className=w-full border border-emerald-300 rounded-xl p-2.5 font-bold text-sm text-emerald-950 outline-none
                />
              </div>

              <div className=p-3 bg-emerald-50 rounded-xl text-emerald-900>
                Valor actual proyectado en el portal: <strong> COP</strong>
              </div>

              <button
                onClick={() => alert('¡TRM actualizada con éxito en todo el portal!')}
                className=w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md
              >
                Guardar y Publicar en Barra Superior
              </button>
            </div>
          </div>
        )}

        {tabActiva === 'legales' && (
          <div className=bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm space-y-4 text-xs leading-relaxed text-zinc-700>
            <h2 className=text-lg font-bold text-emerald-950>Políticas y Cláusulas del Ecosistema AGROPACCIOLI</h2>

            <div className=p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2>
              <h4 className=font-bold text-emerald-900 text-sm>1. Ley 527 de 1999 (Comercio Electrónico y Firmas Digitales)</h4>
              <p>Los mensajes de datos, cotizaciones y acuerdos registrados gozan de plena validez jurídica conforme a los artículos 5 al 13 de la Ley 527 de 1999.</p>
            </div>

            <div className=p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2>
              <h4 className=font-bold text-emerald-900 text-sm>2. Ley 1581 de 2012 (Protección de Datos Personales / Habeas Data)</h4>
              <p>Los datos de los productores, coordenadas de fincas y números de contacto son tratados con estricta autorización y finalidad exclusiva de contacto comercial directo.</p>
            </div>

            <div className=p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-amber-950>
              <h4 className=font-bold text-amber-900 text-sm>3. Cláusula de Exención de Responsabilidad Comercial</h4>
              <p>AGROPACCIOLI actúa como facilitador tecnológico y directorio verificado. No asume responsabilidad solidaria ni directa sobre los pagos, contratos, fletes, calidades ni entregas pactadas privadamente entre usuarios.</p>
            </div>
          </div>
        )}

      </main>

      {modalNuevaNoticia && (
        <div className=fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4>
          <div className=bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 max-h-[90vh] overflow-y-auto>
            <h3 className=font-bold text-emerald-950 text-base mb-3>Redactar Nueva Noticia / Boletín</h3>
            <form onSubmit={handleCrearNoticia} className=space-y-3 text-xs>
              <div>
                <label className=font-bold text-zinc-700 block mb-1>Título del Artículo *</label>
                <input required name=titulo placeholder=Ej: Nueva Alerta de Precios de Cacao className=w-full border border-emerald-300 rounded-xl p-2.5 outline-none />
              </div>
              <div>
                <label className=font-bold text-zinc-700 block mb-1>Categoría *</label>
                <select name=categoria className=w-full border border-emerald-300 rounded-xl p-2.5 outline-none>
                  <option>Mercados</option>
                  <option>Alertas Fitosanitarias</option>
                  <option>Políticas & Créditos</option>
                  <option>Innovación & Clima</option>
                </select>
              </div>
              <div>
                <label className=font-bold text-zinc-700 block mb-1>Resumen Corto *</label>
                <input required name=resumen placeholder=Resumen de dos líneas... className=w-full border border-emerald-300 rounded-xl p-2.5 outline-none />
              </div>
              <div>
                <label className=font-bold text-zinc-700 block mb-1>Contenido Completo *</label>
                <textarea required name=contenido rows={4} placeholder=Detalles de la noticia... className=w-full border border-emerald-300 rounded-xl p-2.5 outline-none></textarea>
              </div>
              <div className=grid grid-cols-2 gap-2>
                <div>
                  <label className=font-bold text-zinc-700 block mb-1>Autor *</label>
                  <input required name=autor placeholder=Redacción Agropaccioli className=w-full border border-emerald-300 rounded-xl p-2.5 outline-none />
                </div>
                <div>
                  <label className=font-bold text-zinc-700 block mb-1>Fuente Oficial *</label>
                  <input required name=fuente placeholder=Ministerio de Agricultura className=w-full border border-emerald-300 rounded-xl p-2.5 outline-none />
                </div>
              </div>
              <div className=flex gap-2 pt-2>
                <button type=button onClick={() => setModalNuevaNoticia(false)} className=flex-1 bg-zinc-100 font-bold py-2.5 rounded-xl>Cancelar</button>
                <button type=submit className=flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-xl>Publicar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
, 'utf8');

console.log('All files updated perfectly');
