'use client';

import React, { useState } from 'react';
import { User, MapPin, Star, Calendar, Home, CheckCircle2, X, Send, ShieldCheck, Briefcase } from 'lucide-react';
import { EmpleoItem, PostulacionItem } from '@/types/agro';

interface Props {
  empleo: EmpleoItem;
  onClose: () => void;
  onSubmit: (postulacion: PostulacionItem) => void;
}

export default function ModalPostulacion({ empleo, onClose, onSubmit }: Props) {
  const [nombre, setNombre] = useState('José Pérez Morales');
  const [telefono, setTelefono] = useState('+573124567890');
  const [whatsapp, setWhatsapp] = useState('573124567890');
  const [departamento, setDepartamento] = useState('Quindío');
  const [municipio, setMunicipio] = useState('Armenia');
  const [experiencia, setExperiencia] = useState('Recolección y beneficio café (6 temporadas), poda, fertilización y curvas de secado solar.');
  const [calendario, setCalendario] = useState('Septiembre – Diciembre 2026');
  const [requiereAlojamiento, setRequiereAlojamiento] = useState(empleo.incluyeVivienda);
  const [mensaje, setMensaje] = useState(
    `Hola, me interesa postularme a la vacante de ${empleo.titulo} en ${empleo.empresaOFinca}. Cuento con experiencia comprobable en labores de ${empleo.sector}, disponibilidad inmediata y referencias al día. ${empleo.incluyeVivienda ? 'Me traslado sin inconveniente al predio.' : ''} ¿Cuándo podemos coordinar la vinculación?`
  );
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaPostulacion: PostulacionItem = {
      id: `post-${Date.now()}`,
      ofertaId: empleo.id,
      ofertaTitulo: empleo.titulo,
      postulante: {
        nombre,
        telefono,
        whatsapp,
        departamento,
        municipio,
        calificacion: 4.9,
        trabajosCompletados: 14,
        experienciaResumen: experiencia.split(',').map(s => s.trim()),
        calendarioDisponible: calendario,
        requiereAlojamiento
      },
      mensaje,
      fechaPostulacion: 'Hoy',
      estado: 'enviada'
    };

    setEnviado(true);
    setTimeout(() => {
      onSubmit(nuevaPostulacion);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Postulación Laboral Agropecuaria</span>
            </div>
            <h2 className="text-xl font-black text-emerald-950">
              Postularme a: {empleo.titulo}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Empleador: <strong className="text-emerald-900">{empleo.empresaOFinca}</strong> ({empleo.municipio}, {empleo.departamento})
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {enviado ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">¡Postulación Enviada con Éxito!</h3>
            <p className="text-xs text-zinc-600">
              El empleador ha recibido tu perfil y mensaje formal. Te contactará directamente al número proporcionado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            {/* Tarjeta de Perfil del Trabajador */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    {nombre.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-xs">{nombre}</h4>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {municipio}, {departamento} • Calificación: ⭐ 4.9 (14 trabajos)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                  Perfil Verificado KYC
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 mb-1 block">Tu Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 mb-1 block">WhatsApp de Contacto *</label>
                <input
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 mb-1 block">Departamento y Municipio Base *</label>
                <input
                  type="text"
                  required
                  value={`${municipio}, ${departamento}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(',');
                    setMunicipio(parts[0] || '');
                    setDepartamento(parts[1] || 'Colombia');
                  }}
                  className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 mb-1 block">Disponibilidad de Calendario</label>
                <input
                  type="text"
                  value={calendario}
                  onChange={(e) => setCalendario(e.target.value)}
                  className="w-full border border-emerald-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 mb-1 block">Experiencia y Habilidades Principales</label>
              <textarea
                rows={2}
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                className="w-full border border-emerald-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-700 mb-1 block">Mensaje de Presentación al Empleador *</label>
              <textarea
                rows={3}
                required
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="w-full border border-emerald-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <label className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 cursor-pointer">
              <input
                type="checkbox"
                checked={requiereAlojamiento}
                onChange={(e) => setRequiereAlojamiento(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="font-bold text-zinc-800">
                🏡 Requiere vivienda o alojamiento en la finca
              </span>
            </label>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg transition-all flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Postulación</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
