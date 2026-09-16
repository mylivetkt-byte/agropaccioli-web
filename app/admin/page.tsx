'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ShieldCheck, Newspaper, DollarSign, Users, CheckCircle, Plus, Trash2, Scale } from 'lucide-react';
import { NOTICIAS_DATA, TRM_DATA, COSECHAS_DATA, ALMACENES_INSUMOS_DATA } from '@/lib/agro-data';
import { NoticiaAgraria } from '@/types/agro';

export default function AdminPage() {
  const [tab, setTab] = useState<'noticias' | 'kyc' | 'trm' | 'legales'>('noticias');
  const [noticias, setNoticias] = useState<NoticiaAgraria[]>(NOTICIAS_DATA);
  const [modal, setModal] = useState(false);
  const [trmVal, setTrmVal] = useState(TRM_DATA.dolarCOP);

  const eliminarNoticia = (id: string) => {
    setNoticias(noticias.filter((n) => n.id !== id));
  };

  const crearNoticia = (e: React.FormEvent<HTMLFormElement>) => {
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
    setModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-emerald-950">Panel de Control & Administración</h1>
              <p className="text-xs text-zinc-500">Gestión de Contenidos, Moderación KYC Anti-Fraude y Divisas</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SuperAdmin Activo
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setTab('noticias')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold ${tab === 'noticias' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-700'}`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Noticias ({noticias.length})</span>
          </button>
          <button
            onClick={() => setTab('kyc')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold ${tab === 'kyc' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-700'}`}
          >
            <Users className="w-4 h-4" />
            <span>Moderación KYC ({COSECHAS_DATA.length + ALMACENES_INSUMOS_DATA.length})</span>
          </button>
          <button
            onClick={() => setTab('trm')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold ${tab === 'trm' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-700'}`}
          >
            <DollarSign className="w-4 h-4" />
            <span>TRM Diaria</span>
          </button>
          <button
            onClick={() => setTab('legales')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold ${tab === 'legales' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-700'}`}
          >
            <Scale className="w-4 h-4" />
            <span>Marco Legal</span>
          </button>
        </div>

        {tab === 'noticias' && (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-emerald-950">Gestor de Noticias y Boletines</h2>
                <p className="text-xs text-zinc-500">Publica alertas agrarias oficiales</p>
              </div>
              <button
                onClick={() => setModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Noticia</span>
              </button>
            </div>

            <div className="space-y-3">
              {noticias.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded mr-2">{n.categoria}</span>
                    <span className="text-xs font-bold text-emerald-950">{n.titulo}</span>
                  </div>
                  <button onClick={() => eliminarNoticia(n.id)} className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'kyc' && (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-emerald-950 mb-2">Publicaciones en Verificación KYC</h2>
            <div className="space-y-3 mt-4">
              {COSECHAS_DATA.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">{c.productor.nombre} ({c.productor.finca})</span>
                    <span className="text-[11px] text-zinc-500">{c.titulo} • {c.municipio}, {c.departamento}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Aprobado KYC
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'trm' && (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm max-w-xl">
            <h2 className="text-lg font-bold text-emerald-950 mb-4">Ajuste de Monedas y TRM</h2>
            <div className="space-y-3 text-xs">
              <label className="font-bold text-zinc-700 block">TRM Dólar (COP):</label>
              <input
                type="number"
                value={trmVal}
                onChange={(e) => setTrmVal(Number(e.target.value))}
                className="w-full border border-emerald-300 rounded-xl p-2.5 font-bold text-sm text-emerald-950 outline-none"
              />
              <button onClick={() => alert('TRM Guardada!')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md">
                Guardar y Actualizar
              </button>
            </div>
          </div>
        )}

        {tab === 'legales' && (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm space-y-4 text-xs text-zinc-700 leading-relaxed">
            <h2 className="text-lg font-bold text-emerald-950">Políticas y Cláusulas</h2>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
              <h4 className="font-bold text-emerald-900 text-sm">Ley 527 de 1999 (Comercio Electrónico)</h4>
              <p className="mt-1">Los mensajes de datos gozan de plena validez jurídica probatoria en Colombia.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-amber-900 text-sm">Cláusula de Exención de Responsabilidad Comercial</h4>
              <p className="mt-1">AGROPACCIOLI actúa exclusivamente como facilitador tecnológico y directorio verificado.</p>
            </div>
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-emerald-950 text-base mb-3">Nueva Noticia</h3>
            <form onSubmit={crearNoticia} className="space-y-3 text-xs">
              <input required name="titulo" placeholder="Título..." className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none" />
              <select name="categoria" className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none">
                <option>Mercados</option>
                <option>Alertas Fitosanitarias</option>
                <option>Políticas & Créditos</option>
              </select>
              <input required name="resumen" placeholder="Resumen..." className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none" />
              <textarea required name="contenido" rows={3} placeholder="Contenido..." className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none"></textarea>
              <input required name="autor" placeholder="Autor..." className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none" />
              <input required name="fuente" placeholder="Fuente Oficial..." className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 bg-zinc-100 font-bold py-2 rounded-xl">Cancelar</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-2 rounded-xl">Publicar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
