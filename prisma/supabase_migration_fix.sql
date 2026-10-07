-- ==========================================================
-- AGROPACCIOLI - SCRIPT DE MIGRACIÓN INCREMENTAL
-- ==========================================================
-- Ejecuta este script en Supabase -> SQL Editor -> Run
-- Solo agrega las columnas y tablas FALTANTES sin tocar los datos existentes.

-- ==========================================================
-- PASO 1: Agregar columnas faltantes en PerfilTransportista
-- (Seguridad Asimétrica Veredal vs Nacional)
-- ==========================================================
ALTER TABLE "PerfilTransportista"
  ALTER COLUMN "licenciaConduccion" DROP NOT NULL,
  ALTER COLUMN "placaVehiculo" DROP NOT NULL;

ALTER TABLE "PerfilTransportista"
  ADD COLUMN IF NOT EXISTS "categoriaTransporte" TEXT NOT NULL DEFAULT 'NACIONAL',
  ADD COLUMN IF NOT EXISTS "zonaOperacion" TEXT,
  ADD COLUMN IF NOT EXISTS "recomendacionesComunidad" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "fotoVehiculoFrontal" TEXT;

-- ==========================================================
-- PASO 2: Crear tabla CosechaConsulta (faltaba completamente)
-- ==========================================================
CREATE TABLE IF NOT EXISTS "CosechaConsulta" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "cosechaId" TEXT NOT NULL REFERENCES "Cosecha"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "compradorNombre" TEXT NOT NULL,
    "compradorTelefono" TEXT NOT NULL,
    "mensaje" TEXT,
    "fechaConsulta" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE' -- PENDIENTE, RESPONDIDO
);

-- Índice para búsqueda rápida por cosecha
CREATE INDEX IF NOT EXISTS "idx_cosecha_consulta_cosecha" ON "CosechaConsulta"("cosechaId");

-- ==========================================================
-- PASO 3: Crear tablas nuevas si aún no existen
-- (Estas se agregaron recientemente y pueden no estar en BD)
-- ==========================================================

-- RequerimientoCosecha
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
CREATE INDEX IF NOT EXISTS "idx_req_estado" ON "RequerimientoCosecha"("estado");

-- ParticipacionContratoFuturo
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

-- PoolCompra
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
CREATE INDEX IF NOT EXISTS "idx_pool_estado" ON "PoolCompra"("estado");

-- PoolParticipacion
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

-- CreditoInsumo
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

-- SolicitudKYC
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
