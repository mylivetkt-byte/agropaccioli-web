'use client';

import { useEffect } from 'react';

export default function EscudoAntiCopia() {
  useEffect(() => {
    // 1. Bloquear el clic derecho (Menú contextual)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Bloquear atajos de teclado para inspeccionar código o copiar la página
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || // Inspeccionar elemento
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || // DevTools
        (e.ctrlKey && (e.key === 'U' || e.key === 'S' || e.key === 'P')) || // Ver código fuente, Guardar, Imprimir
        (e.metaKey && (e.key === 'U' || e.key === 'S' || e.key === 'P')) // Versión Mac
      ) {
        e.preventDefault();
      }
    };

    // 3. Bloquear el arrastre de imágenes (para que no roben logos fácilmente)
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Prevenir la selección de texto en todo el documento (Opcional, pero agresivo)
    // document.body.style.userSelect = 'none';
    // document.body.style.webkitUserSelect = 'none';

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null;
}
