'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Layers, X, MessageCircle, Phone, MapPin, ShieldCheck, Eye, Compass } from 'lucide-react';
import { COSECHAS_DATA } from '@/lib/agro-data';
import { CosechaItem } from '@/types/agro';

type MapStyleKey = 'vivid' | 'satelite' | 'topo' | 'osm';

export default function MapaCosechasViewer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selected, setSelected] = useState<CosechaItem | null>(null);
  const [sectorFiltro, setSectorFiltro] = useState<string>('todos');
  const [activeStyle, setActiveStyle] = useState<MapStyleKey>('vivid');

  const STYLES_CONFIG: Record<MapStyleKey, { name: string; icon: string; tiles: string[]; attribution: string }> = {
    vivid: {
      name: 'Vívido HD',
      icon: '🌱',
      tiles: ['https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'],
      attribution: '© CARTO | © OpenStreetMap | AGROPACCIOLI'
    },
    satelite: {
      name: 'Satélite HD',
      icon: '🛰️',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      attribution: '© Esri World Imagery | AGROPACCIOLI'
    },
    topo: {
      name: 'Relieve & Topo',
      icon: '⛰️',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'],
      attribution: '© Esri Topo | AGROPACCIOLI'
    },
    osm: {
      name: 'Calles & Vías',
      icon: '🗺️',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      attribution: '© OpenStreetMap contributors'
    }
  };

  const renderMarkers = (map: any, maplibregl: any, sector: string) => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtrados = COSECHAS_DATA.filter(
      (item) => sector === 'todos' || item.sector === sector
    );

    filtrados.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'group cursor-pointer transform hover:scale-125 transition-all duration-200 relative';
      
      let emoji = '🥑';
      let bg = '#16a34a';
      let glow = 'rgba(22, 163, 74, 0.45)';
      if (item.sector === 'ganadero') { emoji = '🐂'; bg = '#ea580c'; glow = 'rgba(234, 88, 12, 0.45)'; }
      if (item.sector === 'acuicola') { emoji = '🐟'; bg = '#0284c7'; glow = 'rgba(2, 132, 199, 0.45)'; }

      el.innerHTML = `
        <div style="position:relative;">
          <div style="position:absolute; inset:-4px; border-radius:50%; background:${glow}; animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; z-index:0;"></div>
          <div style="position:relative; z-index:1; background:${bg}; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 8px 24px rgba(0,0,0,0.4); font-size:22px;">
            ${emoji}
          </div>
          <div class="hidden group-hover:flex" style="position:absolute; bottom:52px; left:50%; transform:translateX(-50%); background:#064e3b; color:white; font-size:11px; font-weight:800; padding:5px 10px; border-radius:10px; white-space:nowrap; box-shadow:0 6px 18px rgba(0,0,0,0.35); z-index:20; border:1px solid rgba(255,255,255,0.2); pointer-events:none; align-items:center; gap:4px;">
            <span>${item.titulo.split(' ')[0]} ${item.titulo.split(' ')[1] || ''}</span>
            <span style="opacity:0.8; font-size:10px;">(${item.municipio})</span>
          </div>
        </div>
      `;

      el.addEventListener('click', () => {
        setSelected(item);
        map.flyTo({ center: item.coordenadas, zoom: 10.5, speed: 1.2 });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(item.coordenadas)
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  const changeMapLayer = (styleKey: MapStyleKey) => {
    setActiveStyle(styleKey);
    if (!mapInstance.current || !mapInstance.current.map) return;
    const map = mapInstance.current.map;
    const cfg = STYLES_CONFIG[styleKey];

    if (map.getSource('base-tiles')) {
      if (map.getLayer('base-tiles-layer')) {
        map.removeLayer('base-tiles-layer');
      }
      map.removeSource('base-tiles');
    }

    map.addSource('base-tiles', {
      type: 'raster',
      tiles: cfg.tiles,
      tileSize: 256,
      attribution: cfg.attribution
    });

    map.addLayer({
      id: 'base-tiles-layer',
      type: 'raster',
      source: 'base-tiles'
    });
  };

  const recenterColombia = () => {
    if (!mapInstance.current || !mapInstance.current.map) return;
    mapInstance.current.map.fitBounds(
      [
        [-79.5, -4.2],
        [-67.5, 12.5]
      ],
      { padding: 30, duration: 1200 }
    );
  };

  useEffect(() => {
    let map: any = null;

    import('maplibre-gl').then((maplibreglModule: any) => {
      const maplibregl = maplibreglModule.default || maplibreglModule;

      if (!mapContainer.current) return;

      map = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'base-tiles': {
              type: 'raster',
              tiles: STYLES_CONFIG.vivid.tiles,
              tileSize: 256,
              attribution: STYLES_CONFIG.vivid.attribution
            }
          },
          layers: [{ id: 'base-tiles-layer', type: 'raster', source: 'base-tiles' }]
        },
        center: [-73.8, 4.5],
        zoom: 6.0,
        minZoom: 5.0,
        maxZoom: 17,
        maxBounds: [
          [-83.0, -5.0],
          [-65.5, 14.0]
        ]
      });

      mapInstance.current = { map, maplibregl };
      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');

      map.on('load', () => {
        recenterColombia();
        renderMarkers(map, maplibregl, sectorFiltro);
      });
    });

    return () => {
      if (map) map.remove();
    };
  }, []);

  const handleFilter = (sec: string) => {
    setSectorFiltro(sec);
    if (mapInstance.current) {
      renderMarkers(mapInstance.current.map, mapInstance.current.maplibregl, sec);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-112px)] overflow-hidden bg-emerald-950/10">
      {/* Contenedor del Mapa MapLibre */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Barra Superior Izquierda: Filtros de Sector */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-emerald-200">
        <div className="flex items-center gap-1.5 px-2 text-xs font-bold text-emerald-950">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">Cosechas:</span>
        </div>

        <button
          onClick={() => handleFilter('todos')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            sectorFiltro === 'todos' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          🌾 Todas ({COSECHAS_DATA.length})
        </button>

        <button
          onClick={() => handleFilter('agricola')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            sectorFiltro === 'agricola' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          🟢 Agrícola ({COSECHAS_DATA.filter((c) => c.sector === 'agricola').length})
        </button>

        <button
          onClick={() => handleFilter('ganadero')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            sectorFiltro === 'ganadero' ? 'bg-orange-500 text-white shadow-md scale-105' : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
          }`}
        >
          🟠 Ganadero ({COSECHAS_DATA.filter((c) => c.sector === 'ganadero').length})
        </button>

        <button
          onClick={() => handleFilter('acuicola')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            sectorFiltro === 'acuicola' ? 'bg-sky-500 text-white shadow-md scale-105' : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
          }`}
        >
          🔵 Acuícola ({COSECHAS_DATA.filter((c) => c.sector === 'acuicola').length})
        </button>
      </div>

      {/* Barra Superior Derecha: Selector de Estilo de Mapa HD & Recentrar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-emerald-200">
          <div className="px-2 text-[11px] font-bold text-zinc-500 hidden md:flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vista:</span>
          </div>

          {(['vivid', 'satelite', 'topo', 'osm'] as MapStyleKey[]).map((st) => (
            <button
              key={st}
              onClick={() => changeMapLayer(st)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeStyle === st
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
              title={STYLES_CONFIG[st].name}
            >
              <span>{STYLES_CONFIG[st].icon}</span>
              <span className="hidden sm:inline text-[11px]">{STYLES_CONFIG[st].name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={recenterColombia}
          className="bg-white/95 backdrop-blur-md text-emerald-900 hover:bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-1.5 transition-all"
          title="Centrar en Colombia"
        >
          <Compass className="w-4 h-4 text-emerald-600" />
          <span className="hidden lg:inline">Centrar Colombia</span>
        </button>
      </div>

      {/* Ficha Flotante de Cosecha */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 z-30 bg-white rounded-3xl p-5 shadow-2xl border border-emerald-200 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start">
            <div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                selected.sector === 'agricola' ? 'bg-emerald-100 text-emerald-800' :
                selected.sector === 'ganadero' ? 'bg-orange-100 text-orange-800' : 'bg-sky-100 text-sky-800'
              }`}>
                {selected.sector === 'agricola' ? '🟢 Agrícola' : selected.sector === 'ganadero' ? '🟠 Ganadero' : '🔵 Acuícola'}
              </span>
              <h3 className="text-base font-bold text-emerald-950 mt-1">{selected.titulo}</h3>
              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selected.municipio}, {selected.departamento} ({selected.vereda || 'Vereda Rural'})</span>
              </p>
            </div>
            <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-zinc-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 h-36 rounded-2xl overflow-hidden bg-zinc-100">
            <img src={selected.imagenes[0]} alt={selected.titulo} className="w-full h-full object-cover" />
          </div>

          <div className="mt-3 p-3 bg-emerald-50 rounded-xl text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-zinc-500">Disponible:</span>
              <span className="font-bold text-emerald-950">{selected.cantidadDisponible} {selected.unidad}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Precio base productor:</span>
              <span className="font-black text-emerald-700 text-sm">${selected.precioUnitario.toLocaleString('es-CO')} COP</span>
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-zinc-50 rounded-xl text-xs space-y-1 border border-zinc-100">
            <div className="flex items-center gap-1 font-bold text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selected.productor.nombre}</span>
            </div>
            <p className="text-zinc-500 text-[11px]">{selected.productor.finca} • Calificación: ⭐ {selected.productor.calificacion}</p>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed mt-2">
            {selected.descripcion}
          </p>

          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
            <a
              href="/chat"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear en Plataforma</span>
            </a>
            <a
              href={`tel:${selected.productor.telefono}`}
              title="Llamada directa"
              className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
