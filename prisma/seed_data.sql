-- ==========================================================
-- AGROPACCIOLI - INSERCIÓN DE DATOS INICIALES (SEED SQL)
-- ==========================================================
-- Copia y pega este script en Supabase -> SQL Editor -> Run

-- 1. Insertar Productores Iniciales
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES 
  ('usr-prod-001', 'Don Hernando Gómez', '+573114567890', true, '71234567', 'APROBADO', 'Productor', 'D', 3, 450),
  ('usr-prod-002', 'Asociación Cafetera El Mirador', '+573138901234', true, '900876543-1', 'APROBADO', 'Productor', 'D', 5, 1200),
  ('usr-prod-003', 'Cooperativa Agroplátano del Eje', '+573123344556', true, '890123456', 'APROBADO', 'Productor', 'D', 2, 300)
ON CONFLICT ("telefono") DO NOTHING;

-- 2. Insertar Cosechas Iniciales
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES
  (
    'cos-001',
    'Aguacate Hass Calibre 14-22 de Exportación',
    'agricola',
    'Frutas Frescas',
    'Aguacate Hass',
    'Aguacate Hass',
    5200,
    'kg',
    28000,
    'Antioquia',
    'Sonsón',
    'La Soledad',
    'Sonsón, Antioquia',
    5.7114,
    -75.3106,
    'Lote con certificación ICA y GlobalGAP. Materia seca > 24%. Listo para cargue en finca.',
    'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80',
    'GlobalGAP, BPA ICA, Predio Exportador',
    'disponible',
    'D',
    'usr-prod-001'
  ),
  (
    'cos-002',
    'Café Especial Castillo - Taza Limpia 86+',
    'agricola',
    'Cafés Especiales',
    'Castillo Lavado Suave',
    'Café Especial',
    24500,
    'kg',
    6500,
    'Huila',
    'Pitalito',
    'Criollo',
    'Pitalito, Huila',
    1.8542,
    -76.0506,
    'Café a 1.750 msnm. Notas a panela, frutos rojos y acidez cítrica brillante.',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    'Denominación Huila, FairTrade, Rainforest Alliance',
    'disponible',
    'D',
    'usr-prod-002'
  ),
  (
    'cos-003',
    'Plátano Hartón Verde de Primera Selección',
    'agricola',
    'Musáceas',
    'Plátano Dominico Hartón',
    'Plátano Hartón',
    3100,
    'kg',
    35000,
    'Quindío',
    'Armenia',
    'El Caimo',
    'Armenia, Quindío',
    4.5339,
    -75.6811,
    'Racimos de alto peso y longitud superior a 25 cm, ideal para supermercados y plantas de patacón.',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
    'BPA ICA',
    'disponible',
    'D',
    'usr-prod-003'
  )
ON CONFLICT ("id") DO NOTHING;

-- 3. Insertar Módulos de la Academia Rural
INSERT INTO "AcademiaCurso" ("id", "nombre", "descripcion", "icono", "estado", "sector")
VALUES 
  ('curso-cafe-01', 'Café de Especialidad y Sostenibilidad', 'Aprende las mejores prácticas agronómicas desde la siembra hasta la taza limpia.', '☕', 'ACTIVO', 'agricola')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AcademiaEtapa" ("id", "cursoId", "orden", "titulo", "descripcion")
VALUES 
  ('etapa-cafe-1', 'curso-cafe-01', 1, 'Etapa 1: Germinación y Preparación de Suelos', 'Selección de semillas certificadas y control de pH.')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AcademiaLeccion" ("id", "etapaId", "orden", "titulo", "tipo", "urlContenido", "duracionMinutos", "climaRecomendado")
VALUES 
  ('leccion-cafe-1-1', 'etapa-cafe-1', 1, 'Cómo realizar un análisis de suelo de bajo costo', 'AUDIO', 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3', 8, 'TEMPLADO')
ON CONFLICT ("id") DO NOTHING;
