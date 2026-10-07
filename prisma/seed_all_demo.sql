-- ==========================================================
-- AGROPACCIOLI - POBLACIÓN COMPLETA DE BASE DE DATOS DEMO
-- ==========================================================
-- Todos los registros precargados quedan marcados con origen = 'D' (Demo).
-- Nuevos registros ingresados por usuarios tendrán origen = 'O' (Original).

-- 1. PRODUCTORES DEMO
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-001', 'Don Hernando Gómez', '+573114567890', true, 'CC-DEMO-0001', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-002', 'Asociación Cafetera El Mirador', '+573138901234', true, 'CC-DEMO-0002', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-003', 'Cooperativa Agroplátano del Eje', '+573123344556', true, 'CC-DEMO-0003', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-004', 'Cultivos Don Álvaro Pinzón', '+573182233445', true, 'CC-DEMO-0004', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-005', 'Asocacao Yariguíes', '+573165544332', true, 'CC-DEMO-0005', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-006', 'Frutícola del Caribe', '+573012233445', true, 'CC-DEMO-0006', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-007', 'Asociación de Uchuveros de Boyacá', '+573154433221', true, 'CC-DEMO-0007', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-008', 'Agropecuaria Lago Verde', '+573189900112', true, 'CC-DEMO-0008', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-009', 'Hacienda Arrocera San Isidro', '+573176655443', true, 'CC-DEMO-0009', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-010', 'Cítricos del Chicamocha', '+573145566778', true, 'CC-DEMO-0010', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-011', 'Cooperativa Agrícola del Penderisco', '+573128899776', true, 'CC-DEMO-0011', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-012', 'Trapiche La Miel Dorada', '+573104433221', true, 'CC-DEMO-0012', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-013', 'Ganadería Santa Catalina (Carlos Restrepo)', '+573007654321', true, 'CC-DEMO-0013', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-014', 'Criadero & Finca El Remanso', '+573142211990', true, 'CC-DEMO-0014', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-015', 'Ganadería Llanos Orientales (Dr. Andrés Arango)', '+573108899776', true, 'CC-DEMO-0015', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-016', 'Bufalera del San Jorge', '+573153322110', true, 'CC-DEMO-0016', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-017', 'Ovinos del Valle del Cacique Upar', '+573117766554', true, 'CC-DEMO-0017', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-018', 'Hacienda Lechera Los Volcanes', '+573205544332', true, 'CC-DEMO-0018', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-019', 'Piscícola Los Llanos (Ing. Diego Moreno)', '+573159988776', true, 'CC-DEMO-0019', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-020', 'Acuícola Lago Sagrado', '+573105556677', true, 'CC-DEMO-0020', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-021', 'Acuícola del Caribe S.A.S.', '+573004455667', true, 'CC-DEMO-0021', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-022', 'Piscícola Betania Fish', '+573139988112', true, 'CC-DEMO-0022', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-023', 'Acuícola Embalse de Prado', '+573167788990', true, 'CC-DEMO-0023', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';
INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen", "nivelAcademia", "puntosAcademia")
VALUES ('usr-demo-prod-024', 'Estación de Alevinaje del Valle', '+573183344556', true, 'CC-DEMO-0024', 'APROBADO', 'Productor', 'D', 3, 500)
ON CONFLICT ("telefono") DO UPDATE SET "origen" = 'D', "estadoVerificacion" = 'APROBADO';

-- 2. COSECHAS Y LOTES DEMO (AGRÍCOLA, GANADERO, ACUÍCOLA)
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-001', 'Aguacate Hass Calibre 14-22 de Exportación', 'agricola', 'Frutas Frescas', 'Aguacate Hass', 'Aguacate Hass', 5200, 'Toneladas', 28, 'Antioquia', 'Sonsón', 'La Soledad', 'Sonsón, Antioquia', 5.7114, -75.3106, 'Lote con certificación ICA y GlobalGAP. Materia seca > 24%. Listo para cargue en finca.', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80', 'GlobalGAP, BPA ICA, Predio Exportador', 'en_negociacion', 'D', 'usr-demo-prod-001')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Aguacate Hass Calibre 14-22 de Exportación', "precio" = 5200, "imagenes" = 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-002', 'Café Especial Castillo - Taza Limpia 86+', 'agricola', 'Cafés Especiales', 'Castillo Lavado Suave', 'Castillo Lavado Suave', 2450000, 'Cargas', 65, 'Huila', 'Pitalito', 'Criollo', 'Pitalito, Huila', 1.8542, -76.0506, 'Café a 1.750 msnm. Notas a panela, frutos rojos y acidez cítrica brillante.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80', 'Denominación Huila, FairTrade, Rainforest Alliance', 'disponible', 'D', 'usr-demo-prod-002')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Café Especial Castillo - Taza Limpia 86+', "precio" = 2450000, "imagenes" = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-005', 'Plátano Hartón Verde de Primera Selección', 'agricola', 'Musáceas', 'Plátano Dominico Hartón', 'Plátano Dominico Hartón', 3100, 'Toneladas', 35, 'Quindío', 'Armenia', 'El Caimo', 'Armenia, Quindío', 4.5339, -75.6811, 'Racimos de alto peso y longitud superior a 25 cm, ideal para supermercados y plantas de patacón.', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80', 'BPA ICA', 'disponible', 'D', 'usr-demo-prod-003')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Plátano Hartón Verde de Primera Selección', "precio" = 3100, "imagenes" = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-006', 'Papa Pastusa y R-12 Lavada de Páramo', 'agricola', 'Tubérculos', 'Pastusa Suprema / Diacol Capiro', 'Pastusa Suprema / Diacol Capiro', 85000, 'Bultos', 600, 'Cundinamarca', 'Villapinzón', 'Chasquez', 'Villapinzón, Cundinamarca', 5.2153, -73.5936, 'Papa gruesa clasificada en bodega sobre asfalto, empacada en costales limpios de 50 kg.', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80', 'Registro ICA', 'disponible', 'D', 'usr-demo-prod-004')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Papa Pastusa y R-12 Lavada de Páramo', "precio" = 85000, "imagenes" = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-009', 'Cacao Fino y de Aroma Clon CCN-51 y TCH', 'agricola', 'Cacao & Chocolatería', 'CCN-51 / Fedecacao', 'CCN-51 / Fedecacao', 17800, 'Toneladas', 12, 'Santander', 'San Vicente de Chucurí', 'Cantagallos', 'San Vicente de Chucurí, Santander', 6.8814, -73.4147, 'Grano fermentado en cajones de laurel por 6 días, secado solar. Notas afrutadas.', 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=80', 'Denominación Santander, UTZ', 'disponible', 'D', 'usr-demo-prod-005')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Cacao Fino y de Aroma Clon CCN-51 y TCH', "precio" = 17800, "imagenes" = 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-010', 'Mango de Azúcar Gourmet del Magdalena', 'agricola', 'Frutas Tropicales', 'Mango de Azúcar', 'Mango de Azúcar', 2800, 'Toneladas', 40, 'Magdalena', 'Ciénaga', 'Cordobita', 'Ciénaga, Magdalena', 11.0069, -74.2464, 'Brix > 15°, libre de antracnosis con tratamiento hidrotérmico para despacho nacional.', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80', 'BPA ICA Exportación', 'disponible', 'D', 'usr-demo-prod-006')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Mango de Azúcar Gourmet del Magdalena', "precio" = 2800, "imagenes" = 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-015', 'Uchuva de Exportación sin Cáliz y con Capacho', 'agricola', 'Frutas Exóticas', 'Uchuva Ecovariedad Colombia', 'Uchuva Ecovariedad Colombia', 7500, 'Toneladas', 8, 'Boyacá', 'Ventaquemada', 'Montenegro', 'Ventaquemada, Boyacá', 5.3725, -73.5244, 'Uchuva dorada clasificada por calibre A y B, empacada en canastillas plásticas ventiladas.', 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80', 'GlobalGAP, BPA ICA', 'disponible', 'D', 'usr-demo-prod-007')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Uchuva de Exportación sin Cáliz y con Capacho', "precio" = 7500, "imagenes" = 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-016', 'Cebolla Junca Larga de Aquitania', 'agricola', 'Hortalizas', 'Junca Gigante', 'Junca Gigante', 48000, 'Bultos', 1200, 'Boyacá', 'Aquitania', 'Mombita', 'Aquitania, Boyacá', 5.5211, -72.8912, 'Tallo grueso y blanco, lavada con agua dulce y amarrada en rollos de 40 kg.', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=80', 'Registro ICA', 'disponible', 'D', 'usr-demo-prod-008')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Cebolla Junca Larga de Aquitania', "precio" = 48000, "imagenes" = 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-017', 'Arroz Paddy Verde Variedad Fedearroz 67', 'agricola', 'Cereales & Granos', 'Fedearroz 67 Riego', 'Fedearroz 67 Riego', 1850, 'Toneladas', 150, 'Tolima', 'Espinal', 'Chicoral', 'Espinal, Tolima', 4.1492, -74.8839, 'Arroz de alta masa molinera con humedad al 22% listo para entrega en molino.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80', 'FEDEARROZ, Distrito de Riego USOCOELLO', 'disponible', 'D', 'usr-demo-prod-009')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Arroz Paddy Verde Variedad Fedearroz 67', "precio" = 1850, "imagenes" = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-018', 'Limón Tahití Verde Esmeralda de Exportación', 'agricola', 'Cítricos', 'Lima Ácida Tahití', 'Lima Ácida Tahití', 3800, 'Toneladas', 30, 'Santander', 'Lebrija', 'El Centenario', 'Lebrija, Santander', 7.1147, -73.2183, 'Limón jugoso sin semilla, porcentaje de jugo superior al 45%, piel verde intensa.', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80', 'GlobalGAP, Predio Exportador ICA', 'disponible', 'D', 'usr-demo-prod-010')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Limón Tahití Verde Esmeralda de Exportación', "precio" = 3800, "imagenes" = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-019', 'Fríjol Cargamanto Rojo y Blanco de Origen', 'agricola', 'Legumbres', 'Cargamanto Rojo Valle de Aburrá', 'Cargamanto Rojo Valle de Aburrá', 320000, 'Bultos', 200, 'Antioquia', 'Urrao', 'Penderisco', 'Urrao, Antioquia', 6.3164, -76.1342, 'Grano grueso y parejo, cosechado tradicionalmente en espaldera.', 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=80', 'BPA ICA', 'disponible', 'D', 'usr-demo-prod-011')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Fríjol Cargamanto Rojo y Blanco de Origen', "precio" = 320000, "imagenes" = 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-020', 'Panela Pulverizada Orgánica y en Bloque Tradicional', 'agricola', 'Agroindustria Panelera', 'Caña Panelera RD-7511', 'Caña Panelera RD-7511', 4600, 'Toneladas', 15, 'Cundinamarca', 'Villeta', 'Bagazal', 'Villeta, Cundinamarca', 5.0119, -74.4744, 'Panela 100% natural libre de sulfito y clarificantes químicos. Registro sanitario INVIMA.', 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=80', 'INVIMA, Certificado Orgánico Ecocert, FEDEPANELA', 'disponible', 'D', 'usr-demo-prod-012')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Panela Pulverizada Orgánica y en Bloque Tradicional', "precio" = 4600, "imagenes" = 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-003', 'Lote de Novillos de Ceba Brahman Blanco Comercial', 'ganadero', 'Bovinos de Ceba', 'Brahman Blanco / F1', 'Brahman Blanco / F1', 9400, 'Cabezas', 80, 'Córdoba', 'Montería', 'Km 15 Vía Planeta Rica', 'Montería, Córdoba', 8.7479, -75.8814, 'Novillos promedio 460 kg con plan sanitario completo, libres de brucelosis y aftosa con guía ICA.', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=80', 'Hato Libre de Brucelosis ICA, Registro Ganadero', 'reservado', 'D', 'usr-demo-prod-013')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Lote de Novillos de Ceba Brahman Blanco Comercial', "precio" = 9400, "imagenes" = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-008', 'Vacas Doble Propósito Simmental x Gyr Lecheras', 'ganadero', 'Lechería y Cría', 'Simmgyr / Girolando', 'Simmgyr / Girolando', 4800000, 'Cabezas', 30, 'Santander', 'Socorro', 'Barirí', 'Socorro, Santander', 6.4678, -73.2625, 'Hembras de primer y segundo parto con producciones comprobadas de 18 Lts/día. Inseminación con toros alemanes.', 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=900&q=80', 'ASOSIMMENTAL, Hato Libre ICA', 'disponible', 'D', 'usr-demo-prod-014')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Vacas Doble Propósito Simmental x Gyr Lecheras', "precio" = 4800000, "imagenes" = 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-011', 'Terneros de Levante Brahman Rojo Puro Registrados', 'ganadero', 'Reproductores & Cría', 'Brahman Rojo ASOBICEBÚ', 'Brahman Rojo ASOBICEBÚ', 6200000, 'Cabezas', 25, 'Meta', 'Puerto López', 'La Venturosa', 'Puerto López, Meta', 4.0847, -72.9567, 'Hijos de toros campeones en Agroexpo, mansedumbre y excelente conformación cárnica.', 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=80', 'Registro Genealógico ASOCEBU', 'disponible', 'D', 'usr-demo-prod-015')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Terneros de Levante Brahman Rojo Puro Registrados', "precio" = 6200000, "imagenes" = 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-012', 'Búfalas Murrah y Mediterráneo Productoras Leche A2', 'ganadero', 'Bufalinos', 'Murrah / Mediterráneo', 'Murrah / Mediterráneo', 5300000, 'Cabezas', 20, 'Antioquia', 'Caucasia (Bajo Cauca)', 'El Silencio', 'Caucasia (Bajo Cauca), Antioquia', 7.9869, -75.195, 'Búfalas preñadas con 8.5% de grasa láctea ideal para quesería gourmet.', 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80', 'ASOBÚFALOS, Predio Libre Brucelosis', 'disponible', 'D', 'usr-demo-prod-016')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Búfalas Murrah y Mediterráneo Productoras Leche A2', "precio" = 5300000, "imagenes" = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-021', 'Lote de Ovejas y Corderos Dorper x Katahdin de Ceba', 'ganadero', 'Ovinos & Caprinos', 'Dorper / Katahdin', 'Dorper / Katahdin', 450000, 'Cabezas', 50, 'Cesar', 'Valledupar', 'Río Seco', 'Valledupar, Cesar', 10.4631, -73.2532, 'Excelente conformación de pierna y lomo, alimentados con pastoreo intensivo y guácimo.', 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=900&q=80', 'ASOOVINOS, Registro ICA', 'disponible', 'D', 'usr-demo-prod-017')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Lote de Ovejas y Corderos Dorper x Katahdin de Ceba', "precio" = 450000, "imagenes" = 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-022', 'Novillas Holstein Puras Registradas para Lechería', 'ganadero', 'Lechería Especializada', 'Holstein Canadiense', 'Holstein Canadiense', 7800000, 'Cabezas', 18, 'Nariño', 'Ipiales / Guachucal', 'San José', 'Ipiales / Guachucal, Nariño', 0.8286, -77.6444, 'Madres con récord superior a 8.500 kg de leche por lactancia. Inseminación sexada.', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=80', 'ASOHOLSTEIN, Hato Libre Tuberculosis e ICA', 'disponible', 'D', 'usr-demo-prod-018')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Novillas Holstein Puras Registradas para Lechería', "precio" = 7800000, "imagenes" = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-004', 'Tilapia Roja Entera Eviscerada Fresca / Congelada', 'acuicola', 'Piscicultura Comercial', 'Tilapia Roja (Oreochromis)', 'Tilapia Roja (Oreochromis)', 14800, 'Toneladas', 18, 'Meta', 'Villavicencio', 'Apiay', 'Villavicencio, Meta', 4.142, -73.5511, 'Tilapia de 450-550 grs criada en jaulones flotantes con aguas puras de piedemonte.', 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=80', 'AUNAP, Registro INVIMA, Buenas Prácticas Acuícolas', 'disponible', 'D', 'usr-demo-prod-019')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Tilapia Roja Entera Eviscerada Fresca / Congelada', "precio" = 14800, "imagenes" = 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-007', 'Trucha Arcoíris de Agua Fría de Alta Montaña', 'acuicola', 'Piscicultura Fría', 'Oncorhynchus mykiss', 'Oncorhynchus mykiss', 18900, 'Toneladas', 8, 'Boyacá', 'Aquitania (Lago de Tota)', 'Pérez', 'Aquitania (Lago de Tota), Boyacá', 5.5194, -72.8872, 'Trucha asalmonada y blanca de 350 grs criada a 3.015 msnm.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80', 'INVIMA, AUNAP', 'disponible', 'D', 'usr-demo-prod-020')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Trucha Arcoíris de Agua Fría de Alta Montaña', "precio" = 18900, "imagenes" = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-013', 'Camarón Blanco Marino de Cultivo IQF', 'acuicola', 'Camaronicultura', 'Litopenaeus vannamei', 'Litopenaeus vannamei', 26000, 'Toneladas', 15, 'Bolívar', 'Cartagena / Bayunca', 'Pontezuela', 'Cartagena / Bayunca, Bolívar', 10.4856, -75.4339, 'Talla 30-40 unidades por libra, congelado individual rápido en planta con agua marina.', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80', 'HACCP, BAP 4 Estrellas, INVIMA', 'disponible', 'D', 'usr-demo-prod-021')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Camarón Blanco Marino de Cultivo IQF', "precio" = 26000, "imagenes" = 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-014', 'Cachama Blanca y Bocachico de Represa de Betania', 'acuicola', 'Peces Nativos', 'Piaractus brachypomus', 'Piaractus brachypomus', 12500, 'Toneladas', 20, 'Huila', 'Betania (Represa de Betania)', 'El Guásimo', 'Betania (Represa de Betania), Huila', 2.7094, -75.4383, 'Pescado fresco de 1.0 a 1.4 kg por unidad, carne firme y blanca sin olor a barro.', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80', 'AUNAP, Registro Sanitario', 'disponible', 'D', 'usr-demo-prod-022')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Cachama Blanca y Bocachico de Represa de Betania', "precio" = 12500, "imagenes" = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-023', 'Filete Fresco de Tilapia Negra sin Espinas', 'acuicola', 'Filetes & Procesados', 'Oreochromis niloticus', 'Oreochromis niloticus', 24500, 'Toneladas', 10, 'Tolima', 'Prado (Represa de Prado)', 'Tomogó', 'Prado (Represa de Prado), Tolima', 3.7517, -74.9242, 'Filete grado sushi empacado al vacío con termoencogido, cadena de frío garantizada a 0-4°C.', 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=80', 'INVIMA, BPA Acuícola AUNAP', 'disponible', 'D', 'usr-demo-prod-023')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Filete Fresco de Tilapia Negra sin Espinas', "precio" = 24500, "imagenes" = 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=80';
INSERT INTO "Cosecha" ("id", "titulo", "sector", "categoria", "variedad", "producto", "precio", "unidad", "cantidadDisponible", "departamento", "municipio", "vereda", "ubicacion", "latitud", "longitud", "descripcion", "imagenes", "certificaciones", "estado", "origen", "productorId")
VALUES ('cos-024', 'Alevinos de Tilapia Roja Revertida y Cachama', 'acuicola', 'Semillas & Alevinaje', 'Tilapia Roja Monosexo 99%', 'Tilapia Roja Monosexo 99%', 160, 'Cabezas', 50000, 'Valle del Cauca', 'Guadalajara de Buga', 'Chambimbal', 'Guadalajara de Buga, Valle del Cauca', 3.9009, -76.3014, 'Alevinos de 1.5 a 2.0 gramos con alta tasa de conversión alimenticia y supervivencia comprobada.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80', 'Registro de Productor de Semilla AUNAP / ICA', 'disponible', 'D', 'usr-demo-prod-024')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Alevinos de Tilapia Roja Revertida y Cachama', "precio" = 160, "imagenes" = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80';

-- 3. TRANSPORTISTAS DEMO
-- Limpiar registros viejos/duplicados en orden de dependencia FK (VehiculoLogistico -> PerfilTransportista -> Usuario)
DELETE FROM "VehiculoLogistico" WHERE "transportistaId" IN (
    SELECT p."id" FROM "PerfilTransportista" p
    JOIN "Usuario" u ON p."usuarioId" = u."id"
    WHERE u."cedula" LIKE 'CC-TRP-%' OR u."telefono" IN ('+573128899001','+573157766554','+573009988112','+573174455667','+573112233990','+573158877665')
) OR "transportistaId" IN ('prf-demo-1','prf-demo-2','prf-demo-3','prf-demo-4','prf-demo-5','prf-demo-6');

DELETE FROM "PerfilTransportista" WHERE "usuarioId" IN (
    SELECT "id" FROM "Usuario" 
    WHERE "cedula" LIKE 'CC-TRP-%' OR "telefono" IN ('+573128899001','+573157766554','+573009988112','+573174455667','+573112233990','+573158877665')
) OR "id" IN ('prf-demo-1','prf-demo-2','prf-demo-3','prf-demo-4','prf-demo-5','prf-demo-6');

DELETE FROM "Usuario" WHERE "cedula" LIKE 'CC-TRP-%' OR "telefono" IN ('+573128899001','+573157766554','+573009988112','+573174455667','+573112233990','+573158877665');

INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen")
VALUES ('usr-demo-transp-001', 'Transportes Rápidos del Campo (Don Jaime Morales)', '+573128899001', true, 'CC-TRP-100', 'APROBADO', 'Transportista', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "rol" = 'Transportista', "estadoVerificacion" = 'APROBADO';
INSERT INTO "PerfilTransportista" ("id", "usuarioId", "licenciaConduccion", "placaVehiculo", "tipoVehiculo", "capacidadToneladas", "aseguradoraCarga", "coberturaSeguro")
VALUES ('prf-demo-1', 'usr-demo-transp-001', 'C2-NACIONAL', 'TRP-100', 'Turbo (4.5 Ton)', 4.5, 'Seguros SURA', 'Pérdida Total y Saqueo')
ON CONFLICT ("usuarioId") DO NOTHING;

INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen")
VALUES ('usr-demo-transp-002', 'Logística Frigorífica de los Andes (Carlos Bedoya)', '+573157766554', true, 'CC-TRP-101', 'APROBADO', 'Transportista', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "rol" = 'Transportista', "estadoVerificacion" = 'APROBADO';
INSERT INTO "PerfilTransportista" ("id", "usuarioId", "licenciaConduccion", "placaVehiculo", "tipoVehiculo", "capacidadToneladas", "aseguradoraCarga", "coberturaSeguro")
VALUES ('prf-demo-2', 'usr-demo-transp-002', 'C2-NACIONAL', 'TRP-101', 'Termo King Refrigerado (10 Ton)', 10, 'Seguros SURA', 'Pérdida Total y Saqueo')
ON CONFLICT ("usuarioId") DO NOTHING;

INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen")
VALUES ('usr-demo-transp-003', 'Camiones Ganaderos del Caribe (Jairo Fuentes)', '+573009988112', true, 'CC-TRP-102', 'APROBADO', 'Transportista', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "rol" = 'Transportista', "estadoVerificacion" = 'APROBADO';
INSERT INTO "PerfilTransportista" ("id", "usuarioId", "licenciaConduccion", "placaVehiculo", "tipoVehiculo", "capacidadToneladas", "aseguradoraCarga", "coberturaSeguro")
VALUES ('prf-demo-3', 'usr-demo-transp-003', 'C2-NACIONAL', 'TRP-102', 'Doble Troque Ganadero (17 Ton)', 17, 'Seguros SURA', 'Pérdida Total y Saqueo')
ON CONFLICT ("usuarioId") DO NOTHING;

INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen")
VALUES ('usr-demo-transp-004', 'Carga Pesada & Tractomulas del Pacífico (Mauricio Henao)', '+573174455667', true, 'CC-TRP-103', 'APROBADO', 'Transportista', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "rol" = 'Transportista', "estadoVerificacion" = 'APROBADO';
INSERT INTO "PerfilTransportista" ("id", "usuarioId", "licenciaConduccion", "placaVehiculo", "tipoVehiculo", "capacidadToneladas", "aseguradoraCarga", "coberturaSeguro")
VALUES ('prf-demo-4', 'usr-demo-transp-004', 'C2-NACIONAL', 'TRP-103', 'Tractomula (35 Ton)', 35, 'Seguros SURA', 'Pérdida Total y Saqueo')
ON CONFLICT ("usuarioId") DO NOTHING;

INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen")
VALUES ('usr-demo-transp-005', 'Fletes Boyacá & Páramo Express (Pedro Nel Albarracín)', '+573112233990', true, 'CC-TRP-104', 'APROBADO', 'Transportista', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "rol" = 'Transportista', "estadoVerificacion" = 'APROBADO';
INSERT INTO "PerfilTransportista" ("id", "usuarioId", "licenciaConduccion", "placaVehiculo", "tipoVehiculo", "capacidadToneladas", "aseguradoraCarga", "coberturaSeguro")
VALUES ('prf-demo-5', 'usr-demo-transp-005', 'C2-NACIONAL', 'TRP-104', 'Sencillo Estacas (8.5 Ton)', 8.5, 'Seguros SURA', 'Pérdida Total y Saqueo')
ON CONFLICT ("usuarioId") DO NOTHING;

INSERT INTO "Usuario" ("id", "nombre", "telefono", "telefonoVerificado", "cedula", "estadoVerificacion", "rol", "origen")
VALUES ('usr-demo-transp-006', 'Transportes Acuícolas del Huila (Héctor Fabio Murcia)', '+573158877665', true, 'CC-TRP-105', 'APROBADO', 'Transportista', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "rol" = 'Transportista', "estadoVerificacion" = 'APROBADO';
INSERT INTO "PerfilTransportista" ("id", "usuarioId", "licenciaConduccion", "placaVehiculo", "tipoVehiculo", "capacidadToneladas", "aseguradoraCarga", "coberturaSeguro")
VALUES ('prf-demo-6', 'usr-demo-transp-006', 'C2-NACIONAL', 'TRP-105', 'Furgón Isotérmico con Oxígeno (6 Ton)', 6, 'Seguros SURA', 'Pérdida Total y Saqueo')
ON CONFLICT ("usuarioId") DO NOTHING;


-- 4. ALMACENES DE INSUMOS B2B DEMO
INSERT INTO "AlmacenInsumos" ("id", "nombre", "departamento", "municipio", "direccion", "telefono", "whatsapp", "calificacion", "marcas", "categoria", "imagen", "descripcion", "origen")
VALUES ('alm-01', 'Almacén Agropecuario', 'Antioquia', 'Rionegro & Sonsón', 'Carrera 45 # 32-18 Parque Industrial del Oriente', '+57(4) 5612340', '573147890123', 4.9, '', 'mixto', '', '', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "nombre" = 'Almacén Agropecuario';
INSERT INTO "AlmacenInsumos" ("id", "nombre", "departamento", "municipio", "direccion", "telefono", "whatsapp", "calificacion", "marcas", "categoria", "imagen", "descripcion", "origen")
VALUES ('alm-02', 'Almacén Agropecuario', 'Córdoba', 'Montería', 'Avenida Circunvalar # 14-88', '+57(4) 7824490', '573014561234', 4.8, '', 'mixto', '', '', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "nombre" = 'Almacén Agropecuario';
INSERT INTO "AlmacenInsumos" ("id", "nombre", "departamento", "municipio", "direccion", "telefono", "whatsapp", "calificacion", "marcas", "categoria", "imagen", "descripcion", "origen")
VALUES ('alm-03', 'Almacén Agropecuario', 'Meta', 'Villavicencio & Restrepo', 'Zona Industrial Vía Catama Km 3', '+57(8) 6673322', '573176655443', 4.95, '', 'mixto', '', '', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "nombre" = 'Almacén Agropecuario';
INSERT INTO "AlmacenInsumos" ("id", "nombre", "departamento", "municipio", "direccion", "telefono", "whatsapp", "calificacion", "marcas", "categoria", "imagen", "descripcion", "origen")
VALUES ('alm-04', 'Almacén Agropecuario', 'Huila', 'Neiva & Pitalito', 'Avenida Pastrana Borrero # 20-50', '+57(8) 8721100', '573187766554', 4.88, '', 'mixto', '', '', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "nombre" = 'Almacén Agropecuario';
INSERT INTO "AlmacenInsumos" ("id", "nombre", "departamento", "municipio", "direccion", "telefono", "whatsapp", "calificacion", "marcas", "categoria", "imagen", "descripcion", "origen")
VALUES ('alm-05', 'Almacén Agropecuario', 'Valle del Cauca', 'Palmira & Tuluá', 'Carrera 28 # 45-12 Zona Agropecuaria', '+57(2) 2718899', '573169988776', 4.93, '', 'mixto', '', '', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "nombre" = 'Almacén Agropecuario';
INSERT INTO "AlmacenInsumos" ("id", "nombre", "departamento", "municipio", "direccion", "telefono", "whatsapp", "calificacion", "marcas", "categoria", "imagen", "descripcion", "origen")
VALUES ('alm-06', 'Almacén Agropecuario', 'Cesar', 'Valledupar & Aguachica', 'Calle 16B # 9-40', '+57(5) 5743322', '573005544332', 4.87, '', 'mixto', '', '', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "nombre" = 'Almacén Agropecuario';

-- 5. BOLSA DE EMPLEO AGROPECUARIO DEMO
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-001', 'Administrador de Finca Cafetera Especial', 'agricola', 'mensual', 'Colombia', 'Huila', 'Pitalito', 0, '$2.800.000 COP / mes + Bonos de Cosecha', false, false, true, 'Buscamos persona o pareja con experiencia comprobada en manejo de personal de recolección, beneficio ecológico por vía húmeda, curvas de secado solar y control de inventarios de fertilizantes.', 'Conocimiento en procesos de beneficio y tostión de cafés especiales; Manejo de nómina de recolectores (hasta 40 personas en cosecha); Buenas Prácticas Agrícolas (BPA ICA); Referencias laborales verificables', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Administrador de Finca Cafetera Especial';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-002', 'Mayordomo Ganadero y Encargado de Lotes de Ceba', 'ganadero', 'mensual', 'Colombia', 'Córdoba', 'Montería', 0, '$2.200.000 COP / mes + Prestaciones', false, false, false, 'Se requiere mayordomo de confianza para coordinar el manejo de 250 cabezas de ganado de ceba y cría, pesaje mensual, planes de vacunación oficial ICA y mantenimiento de cercas eléctricas.', 'Experiencia en inseminación artificial o monta controlada; Manejo de registros de ganancia de peso diaria; Mantenimiento básico de guadaña y motobomba', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Mayordomo Ganadero y Encargado de Lotes de Ceba';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-003', 'Operario Tractorista y Maquinaria Agrícola', 'agricola', 'mensual', 'Colombia', 'Meta', 'Villavicencio', 0, '$2.400.000 COP / mes + Horas Extras', false, false, true, 'Operación de maquinaria pesada para preparación de tierras de arroz y maíz, arado, rastrillada, siembra mecanizada y fumigación con aguilón.', 'Licencia de conducción C2 vigente; Conocimientos en mecánica diésel preventiva y cambio de implementos; Disponibilidad para turnos en temporada de preparación', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Operario Tractorista y Maquinaria Agrícola';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-004', 'Técnico Piscícola en Cultivo de Tilapia Roja y Trucha', 'acuicola', 'mensual', 'Colombia', 'Huila', 'Yaguará', 0, '$2.300.000 COP / mes + Bonos de Crecimiento', false, false, false, 'Monitoreo de parámetros físico-químicos del agua (oxígeno disuelto, pH, amonio, temperatura), tablas de alimentación por biomasa, biometrías semanales y despachos a plantas de eviscerado.', 'Saber nadar y manejo básico de embarcación con motor fuera de borda; Manejo de oxímetros digitales y sondas multiparamétricas; Conocimiento en normas de inocuidad piscícola INVIMA', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Técnico Piscícola en Cultivo de Tilapia Roja y Trucha';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-005', 'Cuadrilla de Recolectores de Aguacate Hass de Exportación', 'agricola', 'jornal', 'Colombia', 'Antioquia', 'Sonsón', 0, '$75.000 COP / Jornal Diario + Incentivos', false, false, true, 'Temporada de cosecha principal de aguacate Hass. Corte con pedúnculo adecuado, selección por calibre y cargue ordenado a camiones refrigerados.', 'Manejo cuidadoso de la fruta de exportación; Disponibilidad para iniciar labores a las 6:00 AM; Documento de identidad al día', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Cuadrilla de Recolectores de Aguacate Hass de Exportación';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-006', 'Ingeniero Agrónomo - Asistente Técnico en Cítricos y Aguacate', 'profesional', 'prestacion_servicios', 'Colombia', 'Valle del Cauca', 'Roldanillo', 0, '$3.800.000 COP / mes + Rodamiento', false, false, false, 'Diseño y supervisión de planes de fertilización edáfica y foliar, monitoreo de HLB en cítricos y trips en aguacate, formulación de bioinsumos y auditoría para recertificación Rainforest Alliance.', 'Tarjeta profesional vigente; Vehículo o motocicleta propia (se cubre auxilio de rodamiento); Manejo de software GIS o levantamientos satelitales', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Ingeniero Agrónomo - Asistente Técnico en Cítricos y Aguacate';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-007', 'Encargado de Invernadero Hidropónico (Tomate & Pimentón)', 'agricola', 'mensual', 'Colombia', 'Boyacá', 'Villa de Leyva', 0, '$2.000.000 COP / mes + Vivienda', false, false, false, 'Manejo diario de invernadero de 5.000 m2 con fertirriego computarizado. Limpieza, control biológico de plagas con extractos botánicos y empaque de tomate chonto gourmet.', 'Puntualidad y atención al detalle; Conocimiento en lectura de conductividad eléctrica y pH en sustrato de cascarilla', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Encargado de Invernadero Hidropónico (Tomate & Pimentón)';
INSERT INTO "OfertaEmpleo" ("id", "titulo", "sector", "tipoContrato", "ubicacion", "departamento", "municipio", "salario", "salarioTexto", "requiereExperiencia", "incluyeHospedaje", "incluyeAlimentacion", "descripcion", "requisitos", "empleadorNombre", "empleadorTelefono", "estado", "origen")
VALUES ('emp-008', 'Médico Veterinario Zootecnista para Hato Lechero Especializado', 'profesional', 'mensual', 'Colombia', 'Antioquia', 'Santa Rosa de Osos', 0, '$4.200.000 COP / mes + Habitación Suite', false, false, true, 'Dirección médica y reproductiva de lechería de 180 vacas en ordeño mecánico con tanque frío. Transferencia de embriones, control de mastitis, balanceo de raciones TMR y salud de terneraje.', 'Título profesional y matrícula profesional COMVEZCOL; Experiencia demostrable en ecografía reproductiva; Manejo de software ganadero (ej. TaurusWeb o Ganadero SG)', 'Empresa Agro', '+573000000000', 'ACTIVA', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Médico Veterinario Zootecnista para Hato Lechero Especializado';

-- 6. PRECIOS DE MERCADO MAYORISTA
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-001', 'Aguacate Hass Extra Exportación', 'Agricola', '', 'Corabastos', 'Cundinamarca / Nacional', 4800, 6000, 5400, 'Kg', 'alza', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-002', 'Café Carga 125 Kg (Precio Base FNC)', 'Agricola', '', 'Corabastos', 'Eje Cafetero & Huila', 2320000, 2420000, 2380000, 'Carga (125Kg)', 'alza', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-003', 'Ganado Macho de Ceba 1a (En Pie)', 'Agricola', '', 'Corabastos', 'Córdoba', 9200, 10100, 9650, 'Kg en pie', 'estable', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-004', 'Tilapia Roja Eviscerada', 'Agricola', '', 'Corabastos', 'Antioquia / Valle', 14200, 16500, 15200, 'Kg', 'baja', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-005', 'Papa Criolla Lavada Primera', 'Agricola', '', 'Corabastos', 'Boyacá / Cundinamarca', 110000, 135000, 120000, 'Bulto (50Kg)', 'baja', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-006', 'Plátano Hartón Verde de Primera', 'Agricola', '', 'Corabastos', 'Valle del Cauca', 2900, 3600, 3300, 'Kg', 'alza', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-007', 'Trucha Arcoíris Entera Eviscerada', 'Agricola', '', 'Corabastos', 'Santander / Boyacá', 18000, 21000, 19500, 'Kg', 'estable', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-008', 'Hembras Vientre F1 Certificadas', 'Agricola', '', 'Corabastos', 'Antioquia / Magdalena Medio', 4200000, 5400000, 4600000, 'Cabeza', 'alza', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-009', 'Cacao Grano Seco Fino y de Aroma', 'Agricola', '', 'Corabastos', 'Santander / Arauca', 17500, 19400, 18200, 'Kg', 'alza', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-010', 'Leche Cruda en Finca Grado A', 'Agricola', '', 'Corabastos', 'Antioquia / Cundinamarca', 2250, 2650, 2450, 'Litro', 'estable', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-011', 'Limón Tahití Extra', 'Agricola', '', 'Corabastos', 'Atlántico / Santander', 3600, 4700, 4100, 'Kg', 'alza', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-012', 'Camarón de Cultivo Marino Talla 30-40', 'Agricola', '', 'Corabastos', 'Bolívar / Valle', 25000, 29500, 27500, 'Kg', 'estable', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-013', 'Arroz Paddy Verde Húmedo', 'Agricola', '', 'Corabastos', 'Tolima / Meta', 184000, 198000, 192000, 'Carga (125Kg)', 'baja', 0)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "PrecioMercado" ("id", "producto", "categoria", "variedad", "centralAbastos", "departamento", "precioMinimo", "precioMaximo", "precioPromedio", "unidad", "tendencia", "variacionSemanal")
VALUES ('pr-demo-014', 'Cebolla Junca Larga', 'Agricola', '', 'Corabastos', 'Boyacá', 45000, 62000, 55000, 'Rollo (40Kg)', 'baja', 0)
ON CONFLICT ("id") DO NOTHING;

-- 7. AGREMIACIONES Y ONGS
INSERT INTO "Agremiacion" ("id", "nombre", "sigla", "sector", "descripcion", "logoUrl", "sitioWeb", "telefono", "departamentoSede")
VALUES ('agr-01', 'Federación Nacional de Cafeteros de Colombia', 'FNC', '', 'Representa legítimamente a las familias cafeteras de Colombia con asistencia técnica e investigación agronómica de vanguardia.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80', '', '', 'Colombia')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Agremiacion" ("id", "nombre", "sigla", "sector", "descripcion", "logoUrl", "sitioWeb", "telefono", "departamentoSede")
VALUES ('agr-02', 'Federación Colombiana de Ganaderos', 'FEDEGAN', '', 'Lidera la modernización pecuaria, sostenibilidad ambiental y apertura de mercados internacionales.', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=200&q=80', '', '', 'Colombia')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Agremiacion" ("id", "nombre", "sigla", "sector", "descripcion", "logoUrl", "sitioWeb", "telefono", "departamentoSede")
VALUES ('agr-03', 'Federación Colombiana de Acuicultores', 'FEDEACUA', '', 'Impulsa el desarrollo acuícola nacional con sostenibilidad ecológica e inocuidad alimentaria.', 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=200&q=80', '', '', 'Colombia')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Agremiacion" ("id", "nombre", "sigla", "sector", "descripcion", "logoUrl", "sitioWeb", "telefono", "departamentoSede")
VALUES ('agr-04', 'Fundación Agro Solidaria y Cooperativa Campesina', 'AGROSOLIDARIA', '', 'Red de apoyo campesino e indígena para el rescate de la soberanía alimentaria y comercialización sin intermediarios.', 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=200&q=80', '', '', 'Colombia')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Agremiacion" ("id", "nombre", "sigla", "sector", "descripcion", "logoUrl", "sitioWeb", "telefono", "departamentoSede")
VALUES ('agr-05', 'Federación Nacional de Cultivadores de Palma de Aceite', 'FEDEPALMA', '', 'Fomenta el cultivo de palma de aceite con altos estándares de conservación y formalización laboral.', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=200&q=80', '', '', 'Colombia')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Agremiacion" ("id", "nombre", "sigla", "sector", "descripcion", "logoUrl", "sitioWeb", "telefono", "departamentoSede")
VALUES ('agr-06', 'Asociación Hortofrutícola de Colombia', 'ASOHOFRUCOL', '', 'Administra el Fondo Nacional de Fomento Hortofrutícola para tecnificar a los productores de frutas y verduras.', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=200&q=80', '', '', 'Colombia')
ON CONFLICT ("id") DO NOTHING;

-- 8. NOTICIAS Y BOLETINES AGRARIOS DEMO
INSERT INTO "NoticiaAgraria" ("id", "titulo", "resumen", "contenido", "categoria", "fuente", "imagenUrl", "destacada", "origen")
VALUES ('not-001', 'Exportaciones de Aguacate Hass Colombiano Crecen un 24% Hacia Europa y EE.UU.', 'Antioquia y el Eje Cafetero lideran las ventas externas con estándares fitosanitarios de primera categoría.', 'Colombia sigue consolidándose como el principal proveedor emergente de aguacate Hass en los mercados internacionales gracias al cumplimiento de protocolos GlobalGAP e ICA.', 'Mercados', 'Ministerio de Agricultura', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1000&q=80', true, 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Exportaciones de Aguacate Hass Colombiano Crecen un 24% Hacia Europa y EE.UU.';
INSERT INTO "NoticiaAgraria" ("id", "titulo", "resumen", "contenido", "categoria", "fuente", "imagenUrl", "destacada", "origen")
VALUES ('not-002', 'Alerta Fitosanitaria por Clima: Manejo Preventivo de Roya y Broca del Café', 'El ICA y Cenicafé emiten boletín técnico ante las variaciones de precipitaciones en el Huila y Tolima.', 'Ante las recientes precipitaciones intercaladas con alta radiación solar, los comités departamentales instan a intensificar los monitoreos sanitarios semanales.', 'Alertas Fitosanitarias', 'Ministerio de Agricultura', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80', false, 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Alerta Fitosanitaria por Clima: Manejo Preventivo de Roya y Broca del Café';
INSERT INTO "NoticiaAgraria" ("id", "titulo", "resumen", "contenido", "categoria", "fuente", "imagenUrl", "destacada", "origen")
VALUES ('not-003', 'Lanzamiento de la Línea Especial de Crédito LEC con Tasa Subsidiada para Jóvenes Rurales', 'Finagro y Banco Agrario disponen de una bolsa de $450.000 millones para tecnificación y riego.', 'Con tasas desde el IBR - 3% EA, los nuevos créditos permitirán la instalación de paneles solares en salas de ordeño y estanques acuícolas con recirculación.', 'Políticas & Créditos', 'Ministerio de Agricultura', 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1000&q=80', false, 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Lanzamiento de la Línea Especial de Crédito LEC con Tasa Subsidiada para Jóvenes Rurales';
INSERT INTO "NoticiaAgraria" ("id", "titulo", "resumen", "contenido", "categoria", "fuente", "imagenUrl", "destacada", "origen")
VALUES ('not-004', 'Apertura de Nuevos Mercados en el Caribe para Carne Bovina Colombiana con Sello Verde', 'FEDEGAN y MinComercio anuncian protocolo sanitario para cortes finos producidos en sistemas silvopastoriles.', 'Los frigoríficos certificados de Córdoba, Magdalena Medio y Santander comenzarán despachos marítimos directos a las Antillas y Centroamérica.', 'Ganadería & Acuicultura', 'Ministerio de Agricultura', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1000&q=80', false, 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D', "titulo" = 'Apertura de Nuevos Mercados en el Caribe para Carne Bovina Colombiana con Sello Verde';

-- 9. ALERTAS DE MERCADO Y CLIMA
INSERT INTO "AlertaMercado" ("id", "tipo", "nivel", "titulo", "mensaje", "departamento", "activa")
VALUES ('alt-001', 'lote_nuevo', 'info', '🥑 Nuevo Lote Disponible: Aguacate Hass Extra', 'Finca La Esmeralda en Sonsón, Antioquia acaba de publicar 28 Toneladas a $5.200/Kg (Calibre 14-22).', 'Nacional', true)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "AlertaMercado" ("id", "tipo", "nivel", "titulo", "mensaje", "departamento", "activa")
VALUES ('alt-002', 'cambio_precio', 'info', '📈 Alza de Precio Café Especial (+3.8%)', 'El precio de referencia FNC subió a $2.380.000 / carga en Eje Cafetero y Huila.', 'Nacional', true)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "AlertaMercado" ("id", "tipo", "nivel", "titulo", "mensaje", "departamento", "activa")
VALUES ('alt-003', 'clima_alerta', 'info', '🌦️ Alerta Climática: Lluvias Fuertes en Huila y Tolima', 'IDEAM proyecta precipitaciones del 85% durante los próximos 4 días. Recomendación: ajustar recolección y rutas de secado.', 'Nacional', true)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "AlertaMercado" ("id", "tipo", "nivel", "titulo", "mensaje", "departamento", "activa")
VALUES ('alt-004', 'propuesta_recibida', 'info', '📜 Propuesta Formal de Compra Recibida (#AGP-PROP-2026-0512)', 'Comercializadora Frutas del Eje te envió una oferta formal con firma digital por 20 Cargas de Café a $2.400.000.', 'Nacional', true)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "AlertaMercado" ("id", "tipo", "nivel", "titulo", "mensaje", "departamento", "activa")
VALUES ('alt-005', 'recordatorio_favorito', 'info', '⏰ Recordatorio: Lote de Trucha Arcoíris vence en 48 horas', 'El lote en Lago de Tota tiene 2 compradores interesados negociando.', 'Nacional', true)
ON CONFLICT ("id") DO NOTHING;

-- 10. CALENDARIO DE TEMPORADAS DE COSECHA
INSERT INTO "TemporadaCosecha" ("id", "cultivo", "departamento", "mesesPico", "intensidad")
VALUES ('temp-demo-001', 'Café (Castillo, Caturra, Borbón)', '', '', 'Alta')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "TemporadaCosecha" ("id", "cultivo", "departamento", "mesesPico", "intensidad")
VALUES ('temp-demo-002', 'Aguacate Hass de Exportación', '', '', 'Alta')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "TemporadaCosecha" ("id", "cultivo", "departamento", "mesesPico", "intensidad")
VALUES ('temp-demo-003', 'Cacao Criollo e Híbridos', '', '', 'Alta')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "TemporadaCosecha" ("id", "cultivo", "departamento", "mesesPico", "intensidad")
VALUES ('temp-demo-004', 'Plátano Dominico, Banano & Cítricos', '', '', 'Alta')
ON CONFLICT ("id") DO NOTHING;

-- 11. REQUERIMIENTOS DE COSECHA A FUTURO (DEMO)
INSERT INTO "RequerimientoCosecha" ("id", "compradorNombre", "compradorTipo", "producto", "cantidadNecesaria", "unidad", "precioOfrecido", "unidadPrecio", "fechaEntrega", "ubicacion", "garantia", "estado", "origen")
VALUES ('FUT-8821', 'Corabastos (Bodega 45 - AgroSabana)', 'Mayorista', 'Papa Pastusa Calidad Primera', 50, 'Toneladas', 120000, 'Bulto (50kg)', '15 de Diciembre de 2026', 'Bogotá, D.C.', 'Fondo Nacional de Garantías', 'ABIERTO', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D';
INSERT INTO "RequerimientoCosecha" ("id", "compradorNombre", "compradorTipo", "producto", "cantidadNecesaria", "unidad", "precioOfrecido", "unidadPrecio", "fechaEntrega", "ubicacion", "garantia", "estado", "origen")
VALUES ('FUT-9012', 'Restaurantes Wok & Crepes', 'Cadena de Restaurantes', 'Tomate Chonto (Larga Vida)', 2, 'Toneladas', 3500, 'Kilo', 'Mensual (Inicia Enero 2027)', 'Medellín, Antioquia', 'Contrato Escrow AgroPaccioli', 'ABIERTO', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D';
INSERT INTO "RequerimientoCosecha" ("id", "compradorNombre", "compradorTipo", "producto", "cantidadNecesaria", "unidad", "precioOfrecido", "unidadPrecio", "fechaEntrega", "ubicacion", "garantia", "estado", "origen")
VALUES ('FUT-9055', 'Exportadores del Eje', 'Agroexportador', 'Aguacate Hass (Calibre 14-22)', 12, 'Toneladas', 4800, 'Kilo', 'Octubre 2026', 'Pereira, Risaralda', 'Carta de Crédito Bancolombia', 'CASI_LLENO', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D';

-- 12. POOLS DE COMPRA COMUNITARIOS (DEMO)
INSERT INTO "PoolCompra" ("id", "titulo", "proveedor", "tipo", "precioNormal", "precioPool", "unidad", "metaCantidad", "cantidadActual", "departamento", "municipio", "descripcion", "fechaCierre", "estado", "origen")
VALUES ('pool-demo-01', 'Urea YaraMila Integrador', 'Directo de Fábrica (Cartagena)', 'insumo', 180000, 125000, 'Bulto', 34, 22.1, 'Boyacá', 'Tunja', 'Lote destinado para entrega en Tunja, Boyacá. Faltan 11.9 toneladas para que despachen la tractomula.', now() + interval '2 days', 'ABIERTO', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D';
INSERT INTO "PoolCompra" ("id", "titulo", "proveedor", "tipo", "precioNormal", "precioPool", "unidad", "metaCantidad", "cantidadActual", "departamento", "municipio", "descripcion", "fechaCierre", "estado", "origen")
VALUES ('pool-demo-02', 'Alquiler de Tractor John Deere', 'Consorcio Regional', 'maquinaria', 80000, 45000, 'Hora', 100, 15, 'Valle del Cauca', 'Palmira', 'Arrendamiento de tractor pesado para arado profundo en el Valle del Cauca (Zona Norte).', now() + interval '7 days', 'ABIERTO', 'D')
ON CONFLICT ("id") DO UPDATE SET "origen" = 'D';

