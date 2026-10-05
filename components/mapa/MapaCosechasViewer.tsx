'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Layers, X, MessageCircle, Phone, MapPin, ShieldCheck, Eye, Compass, Search, CalendarClock, Zap, CheckCircle2 } from 'lucide-react';
import { checkUsuarioStatus, registrarConsultaComprador } from '@/app/actions/cosechas';
import { CosechaItem } from '@/types/agro';
import { getCosechasList } from '@/app/actions/cosechas';
import { COSECHAS_DATA } from '@/lib/agro-data';
import Supercluster from 'supercluster';

type MapStyleKey = 'vivid' | 'satelite' | 'topo' | 'osm';
type DateFilter = 'todas' | 'inmediata' | 'futura';

const parseImages = (val: any): string[] => {
  if (!val) return ['https://images.unsplash.com/photo-1592688001655-b7700259b02a?q=80&w=600'];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return [val];
      }
    }
    return [val];
  }
  return ['https://images.unsplash.com/photo-1592688001655-b7700259b02a?q=80&w=600'];
};

const parseCerts = (val: any): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }
    return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

export default function MapaCosechasViewer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const clusterer = useRef(new Supercluster({ radius: 75, maxZoom: 16 }));
  
  const [selected, setSelected] = useState<CosechaItem | null>(null);
  const [sectorFiltro, setSectorFiltro] = useState<string>('todos');
  const [activeStyle, setActiveStyle] = useState<MapStyleKey>('vivid');
  
  // Inicializado con datos inmediatos + sincronización en tiempo real con Supabase
  const [dbData, setDbData] = useState<CosechaItem[]>(COSECHAS_DATA);

  // Nuevos estados para el Panel Lateral
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('todas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // En móviles puede cerrarse

  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [buyerCedula, setBuyerCedula] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Map Sync State
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const rawData = await getCosechasList();
        if (rawData && rawData.length > 0) {
          const mappedData: CosechaItem[] = rawData.map((d: any) => ({
            id: d.id,
            titulo: d.titulo || d.producto,
            sector: d.sector as any,
            categoria: d.categoria || '',
            variedad: d.variedad || '',
            cantidadDisponible: d.cantidadDisponible,
            unidad: d.unidad as any,
            precioUnitario: d.precio,
            moneda: 'COP',
            departamento: d.departamento || 'Colombia',
            municipio: d.municipio || d.ubicacion,
            vereda: d.vereda || '',
            coordenadas: [d.longitud || -74.0, d.latitud || 4.0],
            productor: {
              nombre: d.productor?.nombre || 'Productor Verificado',
              finca: d.vereda ? `Finca Vereda ${d.vereda}` : 'Finca Registrada',
              verificadoKYC: true,
              calificacion: 5,
              telefono: d.productor?.telefono || '+573114567890',
              whatsapp: d.productor?.telefono ? d.productor.telefono.replace('+', '') : '573114567890',
              experienciaAnos: 10,
            },
            fechaCosechaEstimada: d.fechaCosechaStr || (d.fechaRecoleccion ? new Date(d.fechaRecoleccion).toLocaleDateString() : 'Inmediata'),
            fechaPublicacion: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString(),
            imagenes: parseImages(d.imagenes),
            descripcion: d.descripcion || `Producto ${d.producto} disponible para negociación directa.`,
            certificaciones: parseCerts(d.certificaciones),
            estado: (d.estado as any) || 'disponible',
            origen: d.origen || 'D'
          }));
          setDbData(mappedData);
        }
      } catch (e) {
        console.error("Error loading cosechas from database:", e);
      }
    }
    loadData();
  }, []);

  const STYLES_CONFIG: Record<MapStyleKey, { name: string; icon: string; tiles: string[]; attribution: string }> = {
    vivid: {
      name: 'Vívido HD',
      icon: '🌱',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'],
      attribution: '© Esri | AGROPACCIOLI'
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

  const getFilteredData = () => {
    return dbData.filter((item) => {
      const matchSector = sectorFiltro === 'todos' || item.sector === sectorFiltro;
      const matchSearch = item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.municipio.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchDate = true;
      const esInmediata = item.fechaCosechaEstimada.toLowerCase().includes('inmediata') || 
                          item.fechaCosechaEstimada.toLowerCase().includes('disponible') ||
                          item.fechaCosechaEstimada.toLowerCase().includes('permanente') ||
                          item.fechaCosechaEstimada.toLowerCase().includes('curso');
      
      if (dateFilter === 'inmediata') matchDate = esInmediata;
      if (dateFilter === 'futura') matchDate = !esInmediata;

      return matchSector && matchSearch && matchDate;
    });
  };

  const updateClusters = () => {
    if (!mapInstance.current || !mapInstance.current.map || !mapLoaded) return;
    const map = mapInstance.current.map;
    const maplibregl = mapInstance.current.maplibregl;
    
    const bounds = map.getBounds();
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()] as [number, number, number, number];
    const zoom = Math.floor(map.getZoom());
    
    const clusters = clusterer.current.getClusters(bbox, zoom);
    
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    clusters.forEach((cluster) => {
      const [lng, lat] = cluster.geometry.coordinates;
      const { cluster: isCluster, point_count: pointCount, item } = cluster.properties as any;
      
      const el = document.createElement('div');
      
      if (isCluster) {
        // Marcador de Cluster (Burbuja)
        const size = Math.min(80, Math.max(40, 30 + (pointCount * 3)));
        el.className = 'cursor-pointer hover:scale-110 transition-transform';
        el.innerHTML = `
          <div style="background:rgba(16, 185, 129, 0.95); width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:900; border:4px solid white; box-shadow:0 8px 24px rgba(0,0,0,0.5); backdrop-filter:blur(4px); font-size:${size/3}px;">
            ${pointCount}
          </div>
        `;
        el.addEventListener('click', () => {
          const expansionZoom = clusterer.current.getClusterExpansionZoom(cluster.id as number);
          map.flyTo({ center: [lng, lat], zoom: expansionZoom, speed: 1.2 });
        });
      } else {
        // Marcador Individual (Finca)
        el.className = 'group cursor-pointer relative';
        
        let emoji = '🥑';
        let bg = '#16a34a';
        let glow = 'rgba(22, 163, 74, 0.45)';
        if (item.sector === 'ganadero') { emoji = '🐂'; bg = '#ea580c'; glow = 'rgba(234, 88, 12, 0.45)'; }
        if (item.sector === 'acuicola') { emoji = '🐟'; bg = '#0284c7'; glow = 'rgba(2, 132, 199, 0.45)'; }

        el.innerHTML = `
          <div style="position:relative; width: 44px; height: 44px;">
            <div style="position:absolute; inset:-4px; border-radius:50%; background:${glow}; animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; z-index:0; pointer-events:none;"></div>
            <div class="transform transition-transform duration-200 group-hover:scale-110" style="position:relative; z-index:1; background:${bg}; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 8px 24px rgba(0,0,0,0.4); font-size:22px;">
              ${emoji}
            </div>
            
            <div class="hidden group-hover:flex" style="position:absolute; bottom:52px; left:50%; transform:translateX(-50%); background:rgba(255,255,255,0.85); backdrop-filter:blur(4px); color:#064e3b; padding:4px 10px; border-radius:8px; white-space:nowrap; box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:50; border:1px solid rgba(255,255,255,0.5); pointer-events:none; align-items:center; gap:4px;">
              <span style="font-weight:900; font-size:11px;">${item.titulo}</span>
            </div>
          </div>
        `;

        el.addEventListener('click', () => {
          setSelected(item);
          map.flyTo({ center: item.coordenadas, zoom: 10.5, speed: 1.2 });
        });
      }

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (mapLoaded && mapInstance.current) {
      const filtrados = getFilteredData();
      const features = filtrados.map(item => ({
        type: 'Feature',
        properties: { cluster: false, item },
        geometry: { type: 'Point', coordinates: item.coordenadas }
      }));
      
      clusterer.current.load(features as any);
      updateClusters();
    }
  }, [mapLoaded, sectorFiltro, searchQuery, dateFilter, dbData]);

  // Sincronizar el evento move de MapLibre con la actualización de clusters
  useEffect(() => {
    if (!mapLoaded || !mapInstance.current) return;
    const map = mapInstance.current.map;
    
    const onMove = () => updateClusters();
    map.on('move', onMove);
    
    return () => {
      map.off('move', onMove);
    };
  }, [mapLoaded, sectorFiltro, searchQuery, dateFilter, dbData]);

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

  const handleSelectFromSidebar = (item: CosechaItem) => {
    setSelected(item);
    if (mapInstance.current) {
      mapInstance.current.map.flyTo({ center: item.coordenadas, zoom: 11, speed: 1.5 });
    }
    // En móviles ocultamos el sidebar para ver el mapa
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
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
        minZoom: 2.0,
        maxZoom: 18,
        maxBounds: [
          [-95.0, -20.0],
          [-50.0, 30.0]
        ]
      });

      mapInstance.current = { map, maplibregl };
      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');

      map.on('load', () => {
        recenterColombia();
        setMapLoaded(true);
      });
    });

    return () => {
      if (map) map.remove();
    };
  }, []);

  const dataFiltrada = getFilteredData();

  // ================= CÁLCULOS RADAR DE MERCADO =================
  const totalOfertas = dataFiltrada.length;
  const valorTotalMercado = dataFiltrada.reduce((acc, curr) => acc + (curr.precioUnitario * (curr.cantidadDisponible || 1)), 0);
  
  const conteoAgricola = dataFiltrada.filter(d => d.sector === 'agricola').length;
  const conteoGanadero = dataFiltrada.filter(d => d.sector === 'ganadero').length;
  const conteoAcuicola = dataFiltrada.filter(d => d.sector === 'acuicola').length;
  
  const pctAgricola = totalOfertas ? (conteoAgricola / totalOfertas) * 100 : 0;
  const pctGanadero = totalOfertas ? (conteoGanadero / totalOfertas) * 100 : 0;
  const pctAcuicola = totalOfertas ? (conteoAcuicola / totalOfertas) * 100 : 0;
  const conicGradient = `conic-gradient(#10b981 0% ${pctAgricola}%, #f97316 ${pctAgricola}% ${pctAgricola + pctGanadero}%, #0ea5e9 ${pctAgricola + pctGanadero}% 100%)`;

  const inmediatosCount = dataFiltrada.filter(item => {
    return item.fechaCosechaEstimada.toLowerCase().includes('inmediata') || item.fechaCosechaEstimada.toLowerCase().includes('disponible') || item.fechaCosechaEstimada.toLowerCase().includes('permanente') || item.fechaCosechaEstimada.toLowerCase().includes('curso');
  }).length;
  const futurosCount = totalOfertas - inmediatosCount;
  const pctInmediato = totalOfertas ? (inmediatosCount / totalOfertas) * 100 : 0;

  const productosAgrupados = dataFiltrada.reduce((acc, curr) => {
    if (!acc[curr.titulo]) acc[curr.titulo] = 0;
    acc[curr.titulo] += curr.cantidadDisponible || 1;
    return acc;
  }, {} as Record<string, number>);
  const topProductos = Object.entries(productosAgrupados).sort((a, b) => b[1] - a[1]).slice(0, 3);
  // ============================================================

  return (
    <div className="flex w-full h-[calc(100vh-112px)] overflow-hidden bg-zinc-100">
      
      {/* PANEL LATERAL DE DISPONIBILIDAD */}
      <div className={`absolute md:relative z-40 bg-white w-full md:w-96 h-full flex flex-col shadow-2xl border-r border-emerald-100 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Cabecera del Sidebar */}
        <div className="p-4 border-b border-emerald-100 bg-emerald-950 text-white shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-black text-lg">Directorio de Ofertas</h2>
            <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5 text-emerald-200" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-900/50 border border-emerald-700/50 rounded-xl px-3 py-2 mb-3">
            <Search className="w-4 h-4 text-emerald-300" />
            <input 
              type="text" 
              placeholder="Buscar producto o municipio..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-sm outline-none text-white placeholder:text-emerald-400"
            />
          </div>

          <div className="flex gap-1.5 p-1 bg-emerald-900 rounded-lg">
            <button 
              onClick={() => setDateFilter('todas')}
              className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${dateFilter === 'todas' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-200 hover:bg-emerald-800'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setDateFilter('inmediata')}
              className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${dateFilter === 'inmediata' ? 'bg-amber-400 text-amber-950 shadow-sm' : 'text-emerald-200 hover:bg-emerald-800'}`}
            >
              <Zap className="w-3 h-3" /> Inmediata
            </button>
            <button 
              onClick={() => setDateFilter('futura')}
              className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${dateFilter === 'futura' ? 'bg-sky-500 text-white shadow-sm' : 'text-emerald-200 hover:bg-emerald-800'}`}
            >
              <CalendarClock className="w-3 h-3" /> Próximas
            </button>
          </div>
        </div>

        {/* Lista de Resultados */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/50">
          <div className="text-xs font-bold text-zinc-500 mb-2">
            Mostrando {dataFiltrada.length} resultados listos para negocio
          </div>
          
          {dataFiltrada.length === 0 ? (
            <div className="text-center py-10 text-zinc-400 text-sm font-bold">
              No hay productos con estos filtros.
            </div>
          ) : (
            dataFiltrada.map((item) => {
              const esInmediata = item.fechaCosechaEstimada.toLowerCase().includes('inmediata') || item.fechaCosechaEstimada.toLowerCase().includes('disponible') || item.fechaCosechaEstimada.toLowerCase().includes('permanente') || item.fechaCosechaEstimada.toLowerCase().includes('curso');

              return (
                <div 
                  key={item.id} 
                  onClick={() => handleSelectFromSidebar(item)}
                  className={`bg-white p-3.5 rounded-2xl border cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${selected?.id === item.id ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'border-zinc-200 hover:border-emerald-300'}`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                      item.sector === 'agricola' ? 'bg-emerald-100 text-emerald-800' :
                      item.sector === 'ganadero' ? 'bg-orange-100 text-orange-800' : 'bg-sky-100 text-sky-800'
                    }`}>
                      {item.sector}
                    </span>
                    <div className="flex gap-1">
                      {(item as any).origen === 'D' && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-800" title="Dato de Demostración">
                          D - Demo
                        </span>
                      )}
                      {(item as any).origen === 'O' && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800" title="Dato Real">
                          O - Real
                        </span>
                      )}
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        esInmediata ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {esInmediata ? <Zap className="w-3 h-3" /> : <CalendarClock className="w-3 h-3" />}
                        {esInmediata ? 'Lista / Inmediata' : 'Reserva Futura'}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-emerald-950 text-sm leading-tight mb-1">{item.titulo}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      {item.municipio}
                    </p>
                    <p className="font-black text-emerald-700 text-sm">
                      ${item.precioUnitario.toLocaleString('es-CO')} <span className="text-[9px] font-bold text-zinc-400 uppercase">/ {item.unidad}</span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ÁREA DEL MAPA */}
      <div className="relative flex-1 bg-emerald-950/10">
        
        {/* Botón flotante para reabrir Sidebar en móviles */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 z-30 bg-emerald-600 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-xs"
          >
            <Search className="w-4 h-4" /> Directorio
          </button>
        )}

        {/* Contenedor del Mapa MapLibre */}
        <div ref={mapContainer} className="w-full h-full" />

        {/* Controles Flotantes Superiores (Responsive Flex) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-start justify-between gap-2 pointer-events-none">
          
          {/* Barra Izquierda: Filtros de Sector */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-emerald-200">
            <div className="flex items-center gap-1 px-1 sm:px-2 text-[11px] sm:text-xs font-bold text-emerald-950">
              <Layers className="w-4 h-4 text-emerald-600 hidden sm:block" />
              <span className="hidden lg:inline">Cosechas:</span>
            </div>
            <button onClick={() => setSectorFiltro('todos')} className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${sectorFiltro === 'todos' ? 'bg-emerald-600 text-white shadow-md' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>🌾<span className="hidden sm:inline"> Todas</span></button>
            <button onClick={() => setSectorFiltro('agricola')} className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${sectorFiltro === 'agricola' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-800'}`}>🟢<span className="hidden sm:inline"> Agrícola</span></button>
            <button onClick={() => setSectorFiltro('ganadero')} className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${sectorFiltro === 'ganadero' ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-50 text-orange-800'}`}>🟠<span className="hidden sm:inline"> Ganadero</span></button>
            <button onClick={() => setSectorFiltro('acuicola')} className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${sectorFiltro === 'acuicola' ? 'bg-sky-500 text-white shadow-md' : 'bg-sky-50 text-sky-800'}`}>🔵<span className="hidden sm:inline"> Acuícola</span></button>
          </div>

          {/* Barra Derecha: Vistas y Centrar */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-emerald-200">
              <div className="px-1 text-[10px] font-bold text-zinc-500 hidden xl:flex items-center gap-1">
                <Eye className="w-3 h-3 text-emerald-600" />
              </div>

              {(['vivid', 'satelite', 'topo', 'osm'] as MapStyleKey[]).map((st) => (
                <button
                  key={st}
                  onClick={() => changeMapLayer(st)}
                  className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 ${
                    activeStyle === st
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                  title={STYLES_CONFIG[st].name}
                >
                  <span>{STYLES_CONFIG[st].icon}</span>
                  <span className="hidden 2xl:inline">{STYLES_CONFIG[st].name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={recenterColombia}
              className="bg-white/95 backdrop-blur-md text-emerald-900 hover:bg-emerald-50 border border-emerald-200 p-2 sm:p-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-1.5 transition-all"
              title="Centrar en Colombia"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">Centrar</span>
            </button>
          </div>
        </div>

        {/* Ficha Flotante de Cosecha */}
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:left-4 md:w-96 z-30 bg-white rounded-3xl p-5 shadow-2xl border border-emerald-200 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
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
              <button onClick={() => { setSelected(null); recenterColombia(); }} className="text-zinc-400 hover:text-zinc-700 p-1 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 h-36 rounded-2xl overflow-hidden bg-zinc-100 relative group">
              <img src={selected.imagenes[0]} alt={selected.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <CalendarClock className="w-3 h-3" />
                Entrega: {selected.fechaCosechaEstimada}
              </div>
            </div>

            <div className="mt-3 p-3 bg-emerald-50 rounded-xl text-xs space-y-1.5 border border-emerald-100/50">
              <div className="flex justify-between">
                <span className="text-emerald-800 font-semibold">Disponible:</span>
                <span className="font-bold text-emerald-950">{selected.cantidadDisponible} {selected.unidad}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800 font-semibold">Precio base productor:</span>
                <span className="font-black text-emerald-700 text-sm">${selected.precioUnitario.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            <div className="mt-2 p-3 bg-zinc-50 rounded-xl text-xs space-y-1 border border-zinc-100">
              <div className="flex items-center gap-1 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{selected.productor.nombre}</span>
              </div>
              <p className="text-zinc-500 text-[11px] pl-5">{selected.productor.finca} • Calificación: ⭐ {selected.productor.calificacion}</p>
            </div>

            <p className="text-[11px] text-zinc-600 leading-relaxed mt-3 px-1">
              {selected.descripcion}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setContactModalOpen(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(5,150,105,0.3)] flex justify-center items-center gap-2"
              >
                Contactar Vendedor
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Contacto B2B */}
      {contactModalOpen && selected && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-800 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-sm">Verificación de Comprador</h3>
              <button onClick={() => { setContactModalOpen(false); setContactSuccess(false); setContactError(''); }} className="text-emerald-200 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="p-5">
              {!contactSuccess ? (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setContactLoading(true);
                  setContactError('');
                  const res = await checkUsuarioStatus(buyerCedula);
                  setContactLoading(false);
                  
                  if (res.status === 'APROBADO') {
                    setContactSuccess(true);
                    // Registrar el interés en el backend para el panel del productor
                    if (res.usuario && (selected as any).origen !== 'D') {
                      await registrarConsultaComprador(selected.id, res.usuario.nombre, res.usuario.telefono, 'Contacto desde Mapa de Cosechas');
                    }
                  } else if (res.status === 'NO_EXISTE') {
                    setContactError('Cédula no registrada. Por favor regístrate como comprador primero.');
                  } else {
                    setContactError('Tu cuenta está pendiente de aprobación.');
                  }
                }} className="space-y-4">
                  <p className="text-xs text-zinc-600">Por seguridad, para contactar a <strong>{selected.productor.nombre}</strong> y comprar su producto, debes identificarte con tu cédula registrada.</p>
                  
                  <div>
                    <input 
                      type="text" 
                      required
                      placeholder="Cédula de ciudadanía o NIT" 
                      value={buyerCedula}
                      onChange={e => setBuyerCedula(e.target.value)}
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  
                  {contactError && <p className="text-xs text-red-500 font-bold bg-red-50 p-2 rounded-lg">{contactError}</p>}

                  <button type="submit" disabled={contactLoading || !buyerCedula} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50">
                    {contactLoading ? 'Verificando...' : 'Verificar y Contactar'}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="font-black text-emerald-900 text-lg">¡Identidad Confirmada!</h4>
                  <p className="text-xs text-zinc-600">El productor ya fue notificado. Escríbele ahora mismo por WhatsApp para cerrar el negocio directamente, sin intermediarios.</p>
                  
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-left space-y-1">
                    <p className="text-[10px] font-bold text-emerald-800">CONTACTO DIRECTO:</p>
                    <p className="text-sm font-black text-emerald-950 flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-600" /> {selected.productor.telefono || 'Sin Teléfono'}</p>
                  </div>
                  
                  <a 
                    href={`https://wa.me/${(selected.productor.whatsapp || selected.productor.telefono || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${selected.productor.nombre}, estoy interesado en comprar tu lote de ${selected.titulo} publicado en AGROPACCIOLI. ¿Aún lo tienes disponible?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
                    onClick={() => { setContactModalOpen(false); setContactSuccess(false); }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Hablar por WhatsApp
                  </a>

                  <button onClick={() => { setContactModalOpen(false); setContactSuccess(false); }} className="w-full text-zinc-500 hover:text-zinc-700 font-bold py-2 text-xs">
                    Cerrar y volver al mapa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PANEL LATERAL DERECHO: RADAR DE MERCADO */}
      <div className="hidden lg:flex flex-col w-[280px] xl:w-80 bg-white/95 backdrop-blur-xl border-l border-emerald-100 shadow-2xl z-30 h-full overflow-y-auto shrink-0">
        <div className="p-4 border-b border-emerald-100 bg-emerald-950 text-white shrink-0">
          <h2 className="font-black text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Radar de Mercado
          </h2>
          <p className="text-xs text-emerald-200 mt-1">Inteligencia B2B en Tiempo Real</p>
        </div>

        <div className="p-5 space-y-6">
          {/* Valor Total Mercado */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Volumen Transaccional Vivo</p>
            <p className="text-2xl font-black text-emerald-950">${(valorTotalMercado / 1000000).toFixed(1)}M <span className="text-xs font-bold text-emerald-600">COP</span></p>
            <p className="text-xs text-emerald-600 font-medium mt-1">{totalOfertas} Lotes publicados</p>
          </div>

          {/* Gráfico de Pastel CSS */}
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Composición por Sector</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full shadow-inner flex-shrink-0" style={{ background: conicGradient }}>
                {/* Hueco del centro para hacerlo Donut */}
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-lg font-black text-emerald-950">{totalOfertas}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setSectorFiltro(sectorFiltro === 'agricola' ? 'todos' : 'agricola')}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className={`text-xs font-bold group-hover:text-emerald-600 ${sectorFiltro === 'agricola' ? 'text-emerald-700' : 'text-zinc-600'}`}>Agrícola</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400">{pctAgricola.toFixed(0)}%</span>
                </div>
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setSectorFiltro(sectorFiltro === 'ganadero' ? 'todos' : 'ganadero')}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                    <span className={`text-xs font-bold group-hover:text-orange-600 ${sectorFiltro === 'ganadero' ? 'text-orange-700' : 'text-zinc-600'}`}>Ganadero</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400">{pctGanadero.toFixed(0)}%</span>
                </div>
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setSectorFiltro(sectorFiltro === 'acuicola' ? 'todos' : 'acuicola')}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
                    <span className={`text-xs font-bold group-hover:text-sky-600 ${sectorFiltro === 'acuicola' ? 'text-sky-700' : 'text-zinc-600'}`}>Acuícola</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400">{pctAcuicola.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Inmediato vs Futuro */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Disponibilidad</h3>
            </div>
            <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-amber-400" style={{ width: `${pctInmediato}%` }} title="Inmediato"></div>
              <div className="h-full bg-sky-500" style={{ width: `${100 - pctInmediato}%` }} title="Futuro"></div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-bold text-zinc-600">Inmediata ({inmediatosCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarClock className="w-3 h-3 text-sky-500" />
                <span className="text-[10px] font-bold text-zinc-600">Futura ({futurosCount})</span>
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Top Productos */}
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Top Volúmenes</h3>
            <div className="space-y-2.5">
              {topProductos.map(([nombre, cant], idx) => (
                <div key={nombre} className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center text-[10px] font-black">{idx + 1}</span>
                    <span className="text-xs font-bold text-zinc-700 line-clamp-1">{nombre}</span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">{cant}</span>
                </div>
              ))}
              {topProductos.length === 0 && (
                <p className="text-xs text-zinc-400 font-medium">No hay productos en este filtro.</p>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
