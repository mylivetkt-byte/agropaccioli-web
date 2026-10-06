import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Evitar Clickjacking (Que otra página "incruste" AgroPaccioli en un Iframe)
  response.headers.set('X-Frame-Options', 'DENY');

  // 2. Prevenir ataques de sniffing de MIME types
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 3. Forzar el uso de HTTPS en el navegador (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // 4. Política de Referencia (Privacidad al hacer clic en enlaces salientes)
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

// Configurar en qué rutas se aplica esta seguridad (todas)
export const config = {
  matcher: '/:path*',
};
