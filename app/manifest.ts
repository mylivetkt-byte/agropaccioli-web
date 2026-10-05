import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Agropaccioli - Plataforma Rural',
    short_name: 'Agropaccioli',
    description: 'La herramienta definitiva para el agro colombiano. Mercado, logística y educación.',
    start_url: '/',
    display: 'standalone',
    background_color: '#064e3b',
    theme_color: '#064e3b',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
