'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ShieldCheck, Newspaper, DollarSign, Users, CheckCircle, Plus, Trash2, Scale, Search, XCircle, Clock } from 'lucide-react';
import { NOTICIAS_DATA, TRM_DATA } from '@/lib/agro-data';
import { NoticiaAgraria } from '@/types/agro';
import { getUsuariosAdmin, cambiarEstadoUsuario } from '@/app/actions/admin';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorPass, setErrorPass] = useState('');

  const [tab, setTab] = useState<'noticias' | 'kyc' | 'trm' | 'legales'>('kyc');
  const [noticias, setNoticias] = useState<NoticiaAgraria[]>(NOTICIAS_DATA);
  const [modal, setModal] = useState(false);
  const [trmVal, setTrmVal] = useState(TRM_DATA.dolarCOP);

  // KYC State
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUsuarios(true);
    const res = await getUsuariosAdmin(password);
    setLoadingUsuarios(false);
    
    if (res.error) {
      setErrorPass(res.error);
    } else if (res.usuarios) {
      setIsAuthenticated(true);
      setUsuarios(res.usuarios);
    }
  };

  const handleCambiarEstado = async (id: string, nuevoEstado: string) => {
    const res = await cambiarEstadoUsuario(id, nuevoEstado, password);
    if (res.success) {
      // Actualizar estado local
      setUsuarios(usuarios.map(u => u.id === id ? { ...u, estadoVerificacion: nuevoEstado } : u));
    }
  };

  // Filtrar usuarios por búsqueda (nombre, cédula, razón social)
  const usuariosFiltrados = usuarios.filter(u => {
    const termino = search.toLowerCase().trim();
    if (!termino) return true;
    return (
      (u.nombre && u.nombre.toLowerCase().includes(termino)) || 
      (u.cedula && u.cedula.includes(termino)) ||
      (u.telefono && u.telefono.includes(termino))
    );
  });

  // Paginación lógica
  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsuarios = usuariosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  // Efecto para resetear la página cuando se busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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

  // PANTALLA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 max-w-sm w-full">
            <ShieldCheck className="w-12 h-12 text-emerald-600 mb-4 mx-auto" />
            <h1 className="text-xl font-black text-emerald-950 text-center mb-6">Acceso Restringido</h1>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Clave de Administrador</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 bg-zinc-50"
                  placeholder="********"
                />
              </div>
              {errorPass && <p className="text-xs text-red-500 font-bold text-center">{errorPass}</p>}
              <button 
                type="submit" 
                disabled={loadingUsuarios}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
              >
                {loadingUsuarios ? 'Verificando...' : 'Entrar al Panel'}
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  // PANTALLA DE ADMIN
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
            onClick={() => setTab('kyc')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold ${tab === 'kyc' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-700'}`}
          >
            <Users className="w-4 h-4" />
            <span>Moderación KYC ({usuarios.length})</span>
          </button>
          <button
            onClick={() => setTab('noticias')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold ${tab === 'noticias' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-zinc-700'}`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Noticias ({noticias.length})</span>
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

        {/* TAB KYC: GRILLA DE USUARIOS */}
        {tab === 'kyc' && (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-lg font-bold text-emerald-950">Grilla de Usuarios Registrados</h2>
                <p className="text-xs text-zinc-500">Aprueba o bloquea usuarios para que puedan publicar o comprar.</p>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Buscar por cédula o nombre..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent w-full text-xs outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3">Razón Social / Nombre</th>
                    <th className="px-4 py-3">Cédula / NIT</th>
                    <th className="px-4 py-3">Ubicación</th>
                    <th className="px-4 py-3">Celular</th>
                    <th className="px-4 py-3">Rol</th>
                    <th className="px-4 py-3 text-center">Estado KYC</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {currentUsuarios.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-zinc-400 text-xs font-bold">
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    currentUsuarios.map((u) => {
                      const ubicacion = u.cosechas && u.cosechas.length > 0 
                        ? `${u.cosechas[0].municipio}, ${u.cosechas[0].departamento}`
                        : 'No Registrada';

                      const tooltipText = u.cosechas && u.cosechas.length > 0
                        ? `Cosechas registradas:\n` + u.cosechas.map((c: any) => `- ${c.titulo} (${c.estado})`).join('\n')
                        : 'Sin cosechas registradas';

                      return (
                        <tr key={u.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="px-4 py-4 font-bold text-emerald-950">{u.nombre || 'Sin nombre'}</td>
                          <td className="px-4 py-4 text-emerald-700 font-mono text-xs cursor-help underline decoration-emerald-300 decoration-dotted underline-offset-4" title={tooltipText}>
                            {u.cedula || 'N/A'}
                          </td>
                          <td className="px-4 py-4 text-zinc-600 text-xs">{ubicacion}</td>
                          <td className="px-4 py-4 text-zinc-600">{u.telefono}</td>
                          <td className="px-4 py-4">
                            <span className="bg-zinc-200 text-zinc-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
                              {u.rol}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            {u.estadoVerificacion === 'APROBADO' && (
                              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded-full uppercase">
                                <CheckCircle className="w-3 h-3" /> Aprobado
                              </span>
                            )}
                            {u.estadoVerificacion === 'PENDIENTE' && (
                              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-1 rounded-full uppercase">
                                <Clock className="w-3 h-3" /> Pendiente
                              </span>
                            )}
                            {u.estadoVerificacion === 'RECHAZADO' && (
                              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-1 rounded-full uppercase">
                                <XCircle className="w-3 h-3" /> Bloqueado
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right space-x-2">
                            <button 
                              onClick={() => handleCambiarEstado(u.id, 'APROBADO')}
                              disabled={u.estadoVerificacion === 'APROBADO'}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1.5 rounded-lg disabled:opacity-50"
                            >
                              Aprobar
                            </button>
                            <button 
                              onClick={() => handleCambiarEstado(u.id, 'RECHAZADO')}
                              disabled={u.estadoVerificacion === 'RECHAZADO'}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1.5 rounded-lg disabled:opacity-50"
                            >
                              Bloquear
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginador */}
            {totalPages > 1 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                <span className="text-xs text-zinc-500">
                  Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, usuariosFiltrados.length)} de {usuariosFiltrados.length} usuarios
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-zinc-100 text-zinc-600 rounded-xl text-xs font-bold disabled:opacity-50 hover:bg-zinc-200"
                  >
                    Anterior
                  </button>
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-black">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-zinc-100 text-zinc-600 rounded-xl text-xs font-bold disabled:opacity-50 hover:bg-zinc-200"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* NOTICIAS, TRM, LEGALES... */}
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

      {/* Modal Nueva Noticia */}
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
