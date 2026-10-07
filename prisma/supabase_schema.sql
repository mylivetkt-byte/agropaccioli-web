-- ==========================================================
-- AGROPACCIOLI - ESQUEMA COMPLETO PARA SUPABASE (POSTGRESQL)
-- ==========================================================
-- Ejecuta este script directamente en Supabase -> SQL Editor -> Run
-- Incluye todos los módulos: Usuarios, Cosechas, Transportistas,
-- Contratos, Academia, Almacenes B2B, Bolsa de Empleos,
-- Precios de Mercado, Agremiaciones, Noticias, Alertas y Temporadas.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: Usuario
CREATE TABLE IF NOT EXISTS "Usuario" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT UNIQUE NOT NULL,
    "telefonoVerificado" BOOLEAN NOT NULL DEFAULT false,
    "cedula" TEXT UNIQUE,
    "fotoCedulaFrontal" TEXT,
    "fotoCedulaTrasera" TEXT,
    "estadoVerificacion" TEXT NOT NULL DEFAULT 'PENDIENTE', -- PENDIENTE, APROBADO, RECHAZADO
    "rol" TEXT NOT NULL, -- Productor, Comprador, Transportista
    "origen" TEXT NOT NULL DEFAULT 'O', -- O = Original, D = Demo
    "nivelAcademia" INTEGER NOT NULL DEFAULT 1,
    "puntosAcademia" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA: PerfilTransportista
CREATE TABLE IF NOT EXISTS "PerfilTransportista" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "usuarioId" TEXT UNIQUE NOT NULL REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "licenciaConduccion" TEXT NOT NULL,
    "fotoLicencia" TEXT,
    "placaVehiculo" TEXT NOT NULL,
    "tipoVehiculo" TEXT NOT NULL,
    "capacidadToneladas" DOUBLE PRECISION NOT NULL,
    "aseguradoraCarga" TEXT,
    "numeroPoliza" TEXT,
    "coberturaSeguro" TEXT
);

-- 3. TABLA: CompradorVerificado
CREATE TABLE IF NOT EXISTS "CompradorVerificado" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "usuarioId" TEXT UNIQUE NOT NULL REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT UNIQUE NOT NULL,
    "rutDigital" TEXT,
    "certificadoCamaraComercio" TEXT,
    "estadoSarlaft" BOOLEAN NOT NULL DEFAULT false,
    "firmaDigital" TEXT
);

-- 4. TABLA: Cosecha
CREATE TABLE IF NOT EXISTS "Cosecha" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "titulo" TEXT NOT NULL DEFAULT 'Producto Agropecuario',
    "sector" TEXT NOT NULL DEFAULT 'agricola', -- agricola, ganadero, acuicola
    "categoria" TEXT,
    "variedad" TEXT,
    "producto" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "unidad" TEXT NOT NULL DEFAULT 'kg',
    "cantidadDisponible" INTEGER NOT NULL DEFAULT 0,
    "departamento" TEXT,
    "municipio" TEXT,
    "vereda" TEXT,
    "ubicacion" TEXT NOT NULL DEFAULT 'Colombia',
    "latitud" DOUBLE PRECISION,
    "longitud" DOUBLE PRECISION,
    "fechaRecoleccion" TIMESTAMP WITH TIME ZONE,
    "fechaCosechaStr" TEXT,
    "tiempoTransporte" TEXT,
    "descripcion" TEXT,
    "imagenes" TEXT,
    "certificaciones" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'disponible',
    "origen" TEXT NOT NULL DEFAULT 'O', -- O = Original, D = Demo
    "productorId" TEXT NOT NULL REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLA: VehiculoLogistico
CREATE TABLE IF NOT EXISTS "VehiculoLogistico" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "transportistaId" TEXT NOT NULL REFERENCES "PerfilTransportista"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "resolucionMinTransporte" TEXT,
    "placaVehiculo" TEXT UNIQUE NOT NULL,
    "tipoVehiculo" TEXT NOT NULL,
    "vencimientoSOAT" TIMESTAMP WITH TIME ZONE,
    "vencimientoTecnicomecanica" TIMESTAMP WITH TIME ZONE,
    "polizaSeguroCarga" TEXT
);

-- 6. TABLA: Contrato
CREATE TABLE IF NOT EXISTS "Contrato" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "fechaCreacion" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "cosechaId" TEXT NOT NULL REFERENCES "Cosecha"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "productorId" TEXT NOT NULL REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "compradorId" TEXT NOT NULL REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "vehiculoId" TEXT REFERENCES "VehiculoLogistico"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "volumen" DOUBLE PRECISION NOT NULL,
    "precioPactado" DOUBLE PRECISION NOT NULL,
    "lugarEntrega" TEXT NOT NULL,
    "clausulaSaneamiento" BOOLEAN NOT NULL DEFAULT true,
    "estadoContrato" TEXT NOT NULL DEFAULT 'PENDIENTE_FIRMAS',
    "manifiestoCarga" TEXT
);

-- 7. TABLA: AcademiaCurso
CREATE TABLE IF NOT EXISTS "AcademiaCurso" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "icono" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
    "sector" TEXT NOT NULL DEFAULT 'agricola'
);

-- 8. TABLA: AcademiaEtapa
CREATE TABLE IF NOT EXISTS "AcademiaEtapa" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "cursoId" TEXT NOT NULL REFERENCES "AcademiaCurso"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "orden" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT
);

-- 9. TABLA: AcademiaLeccion
CREATE TABLE IF NOT EXISTS "AcademiaLeccion" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "etapaId" TEXT NOT NULL REFERENCES "AcademiaEtapa"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "orden" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "urlContenido" TEXT,
    "duracionMinutos" INTEGER,
    "climaRecomendado" TEXT NOT NULL DEFAULT 'TODOS'
);

-- 10. TABLA: AcademiaProgreso
CREATE TABLE IF NOT EXISTS "AcademiaProgreso" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "usuarioId" TEXT NOT NULL REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "leccionId" TEXT NOT NULL REFERENCES "AcademiaLeccion"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "fechaCompletado" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "AcademiaProgreso_usuarioId_leccionId_key" UNIQUE ("usuarioId", "leccionId")
);

-- 11. TABLA: AcademiaDiploma
CREATE TABLE IF NOT EXISTS "AcademiaDiploma" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "usuarioId" TEXT NOT NULL REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "cursoId" TEXT NOT NULL REFERENCES "AcademiaCurso"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "notaFinal" DOUBLE PRECISION NOT NULL,
    "fechaEmision" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "codigoVerificacion" TEXT UNIQUE DEFAULT uuid_generate_v4()::TEXT,
    CONSTRAINT "AcademiaDiploma_usuarioId_cursoId_key" UNIQUE ("usuarioId", "cursoId")
);

-- 12. TABLA: AlmacenInsumos
CREATE TABLE IF NOT EXISTS "AlmacenInsumos" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "nombre" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT NOT NULL,
    "whatsapp" TEXT,
    "calificacion" DOUBLE PRECISION NOT NULL DEFAULT 4.8,
    "marcas" TEXT,
    "categoria" TEXT NOT NULL DEFAULT 'mixto',
    "imagen" TEXT,
    "descripcion" TEXT,
    "origen" TEXT NOT NULL DEFAULT 'O', -- O = Original, D = Demo
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. TABLA: OfertaEmpleo
CREATE TABLE IF NOT EXISTS "OfertaEmpleo" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "titulo" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "tipoContrato" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "salario" DOUBLE PRECISION,
    "salarioTexto" TEXT,
    "requiereExperiencia" BOOLEAN NOT NULL DEFAULT false,
    "incluyeHospedaje" BOOLEAN NOT NULL DEFAULT false,
    "incluyeAlimentacion" BOOLEAN NOT NULL DEFAULT false,
    "descripcion" TEXT NOT NULL,
    "requisitos" TEXT,
    "empleadorNombre" TEXT NOT NULL,
    "empleadorTelefono" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVA',
    "origen" TEXT NOT NULL DEFAULT 'O', -- O = Original, D = Demo
    "fechaPublicacion" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. TABLA: PostulacionEmpleo
CREATE TABLE IF NOT EXISTS "PostulacionEmpleo" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "empleoId" TEXT NOT NULL REFERENCES "OfertaEmpleo"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "candidatoNombre" TEXT NOT NULL,
    "candidatoTelefono" TEXT NOT NULL,
    "cedula" TEXT,
    "experienciaAnos" INTEGER NOT NULL DEFAULT 0,
    "mensaje" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "origen" TEXT NOT NULL DEFAULT 'O',
    "fechaPostulacion" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. TABLA: PrecioMercado
CREATE TABLE IF NOT EXISTS "PrecioMercado" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "producto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "variedad" TEXT,
    "centralAbastos" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "precioMinimo" DOUBLE PRECISION NOT NULL,
    "precioMaximo" DOUBLE PRECISION NOT NULL,
    "precioPromedio" DOUBLE PRECISION NOT NULL,
    "unidad" TEXT NOT NULL DEFAULT 'kg',
    "tendencia" TEXT NOT NULL DEFAULT 'estable',
    "variacionSemanal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "fechaActualizacion" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. TABLA: Agremiacion
CREATE TABLE IF NOT EXISTS "Agremiacion" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "nombre" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "logoUrl" TEXT,
    "sitioWeb" TEXT,
    "telefono" TEXT,
    "departamentoSede" TEXT,
    "programasApoyo" TEXT
);

-- 17. TABLA: NoticiaAgraria
CREATE TABLE IF NOT EXISTS "NoticiaAgraria" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "fuente" TEXT NOT NULL,
    "imagenUrl" TEXT,
    "fechaPublicacion" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "origen" TEXT NOT NULL DEFAULT 'O'
);

-- 18. TABLA: AlertaMercado
CREATE TABLE IF NOT EXISTS "AlertaMercado" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "tipo" TEXT NOT NULL,
    "nivel" TEXT NOT NULL DEFAULT 'info',
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "departamento" TEXT,
    "sector" TEXT,
    "fechaEmision" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true
);

-- 19. TABLA: TemporadaCosecha
CREATE TABLE IF NOT EXISTS "TemporadaCosecha" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "cultivo" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "mesesPico" TEXT NOT NULL,
    "intensidad" TEXT NOT NULL DEFAULT 'Alta',
    "observaciones" TEXT
);

-- 20. TABLA: RequerimientoCosecha (Agricultura por Contrato / Demanda Futura)
CREATE TABLE IF NOT EXISTS "RequerimientoCosecha" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "compradorId" TEXT,
    "compradorNombre" TEXT NOT NULL,
    "compradorTipo" TEXT NOT NULL DEFAULT 'Mayorista',
    "producto" TEXT NOT NULL,
    "variedad" TEXT,
    "cantidadNecesaria" DOUBLE PRECISION NOT NULL,
    "unidad" TEXT NOT NULL DEFAULT 'Toneladas',
    "precioOfrecido" DOUBLE PRECISION NOT NULL,
    "unidadPrecio" TEXT NOT NULL DEFAULT 'Bulto (50kg)',
    "fechaEntrega" TEXT NOT NULL,
    "fechaLimite" TIMESTAMP WITH TIME ZONE,
    "departamento" TEXT,
    "municipio" TEXT,
    "ubicacion" TEXT NOT NULL DEFAULT 'Colombia',
    "garantia" TEXT NOT NULL DEFAULT 'Contrato Escrow AgroPaccioli',
    "estado" TEXT NOT NULL DEFAULT 'ABIERTO',
    "origen" TEXT NOT NULL DEFAULT 'O',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 21. TABLA: ParticipacionContratoFuturo
CREATE TABLE IF NOT EXISTS "ParticipacionContratoFuturo" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "requerimientoId" TEXT NOT NULL REFERENCES "RequerimientoCosecha"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "productorId" TEXT,
    "productorNombre" TEXT NOT NULL,
    "productorTelefono" TEXT NOT NULL,
    "cantidadComprometida" DOUBLE PRECISION NOT NULL,
    "unidad" TEXT NOT NULL DEFAULT 'Toneladas',
    "estado" TEXT NOT NULL DEFAULT 'PRE_FIRMADO',
    "fechaFirma" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 22. TABLA: PoolCompra (Agro-Fintech / Compras Comunitarias)
CREATE TABLE IF NOT EXISTS "PoolCompra" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "titulo" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'insumo',
    "precioNormal" DOUBLE PRECISION NOT NULL,
    "precioPool" DOUBLE PRECISION NOT NULL,
    "unidad" TEXT NOT NULL DEFAULT 'Bulto',
    "metaCantidad" DOUBLE PRECISION NOT NULL,
    "cantidadActual" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaCierre" TIMESTAMP WITH TIME ZONE NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ABIERTO',
    "origen" TEXT NOT NULL DEFAULT 'O',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 23. TABLA: PoolParticipacion
CREATE TABLE IF NOT EXISTS "PoolParticipacion" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "poolId" TEXT NOT NULL REFERENCES "PoolCompra"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "campesinoNombre" TEXT NOT NULL,
    "campesinoTelefono" TEXT NOT NULL,
    "cantidadAportada" DOUBLE PRECISION NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "estadoPago" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 24. TABLA: CreditoInsumo
CREATE TABLE IF NOT EXISTS "CreditoInsumo" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "usuarioId" TEXT,
    "productorNombre" TEXT NOT NULL,
    "productorTelefono" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "montoSolicitado" DOUBLE PRECISION NOT NULL,
    "cupoAprobado" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "almacenDestino" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "fechaSolicitud" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 25. TABLA: SolicitudKYC (Auditoría B2B LA/FT)
CREATE TABLE IF NOT EXISTS "SolicitudKYC" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "razonSocial" TEXT NOT NULL,
    "nit" TEXT UNIQUE NOT NULL,
    "representanteNombre" TEXT NOT NULL,
    "representanteCedula" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT,
    "rutUrl" TEXT,
    "camaraComercioUrl" TEXT,
    "estadoSarlaft" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "scoreRiesgo" DOUBLE PRECISION DEFAULT 0.0,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ÍNDICES PARA RENDIMIENTO ÓPTIMO
-- ==========================================================
CREATE INDEX IF NOT EXISTS "idx_cosecha_sector" ON "Cosecha"("sector");
CREATE INDEX IF NOT EXISTS "idx_cosecha_estado" ON "Cosecha"("estado");
CREATE INDEX IF NOT EXISTS "idx_cosecha_origen" ON "Cosecha"("origen");
CREATE INDEX IF NOT EXISTS "idx_almacen_categoria" ON "AlmacenInsumos"("categoria");
CREATE INDEX IF NOT EXISTS "idx_almacen_departamento" ON "AlmacenInsumos"("departamento");
CREATE INDEX IF NOT EXISTS "idx_empleo_sector" ON "OfertaEmpleo"("sector");
CREATE INDEX IF NOT EXISTS "idx_empleo_estado" ON "OfertaEmpleo"("estado");
CREATE INDEX IF NOT EXISTS "idx_precio_producto" ON "PrecioMercado"("producto");
CREATE INDEX IF NOT EXISTS "idx_precio_central" ON "PrecioMercado"("centralAbastos");
CREATE INDEX IF NOT EXISTS "idx_req_estado" ON "RequerimientoCosecha"("estado");
CREATE INDEX IF NOT EXISTS "idx_pool_estado" ON "PoolCompra"("estado");

