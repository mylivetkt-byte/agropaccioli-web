const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const ts = require('./../node_modules/typescript');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Leyendo catálogo completo desde agro-data.ts...');
  
  const agroDataCode = fs.readFileSync(path.join(__dirname, '../lib/agro-data.ts'), 'utf8');
  const transpiled = ts.transpileModule(agroDataCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;

  const moduleObj = { exports: {} };
  const fn = new Function('module', 'exports', 'require', transpiled);
  fn(moduleObj, moduleObj.exports, (mod) => {
    if (mod === '@/types/agro') return {};
    return {};
  });

  const {
    COSECHAS_DATA,
    TRANSPORTISTAS_DATA,
    ALMACENES_INSUMOS_DATA,
    EMPLEOS_DATA,
    PRECIOS_MERCADO_DATA,
    AGREMIACIONES_DATA,
    NOTICIAS_DATA,
    ALERTAS_NOTIFICACIONES_DATA,
    TEMPORADAS_COSECHA_DATA
  } = moduleObj.exports;

  console.log('🌱 Sembrando Productores y Cosechas (origen = "D")...');
  if (COSECHAS_DATA) {
    for (let i = 0; i < COSECHAS_DATA.length; i++) {
      const cos = COSECHAS_DATA[i];
      const prod = cos.productor || {};
      const tel = prod.telefono || `+5730000000${(i + 1).toString().padStart(2, '0')}`;
      const cedula = `CC-DEMO-${(i + 1).toString().padStart(4, '0')}`;

      const usuario = await prisma.usuario.upsert({
        where: { telefono: tel },
        update: { origen: 'D', estadoVerificacion: 'APROBADO' },
        create: {
          nombre: prod.nombre || 'Productor Agropecuario',
          telefono: tel,
          telefonoVerificado: true,
          cedula: cedula,
          estadoVerificacion: 'APROBADO',
          rol: 'Productor',
          origen: 'D',
          nivelAcademia: 3,
          puntosAcademia: 500
        }
      });

      const cosId = cos.id || `cos-demo-${(i + 1).toString().padStart(3, '0')}`;
      let lat = null;
      let lng = null;
      if (cos.coordenadas && cos.coordenadas.length === 2) {
        lng = cos.coordenadas[0];
        lat = cos.coordenadas[1];
      }

      await prisma.cosecha.upsert({
        where: { id: cosId },
        update: { origen: 'D', precio: Number(cos.precioUnitario || 1000) },
        create: {
          id: cosId,
          titulo: cos.titulo || 'Cosecha Agro',
          sector: cos.sector || 'agricola',
          categoria: cos.categoria || '',
          variedad: cos.variedad || '',
          producto: cos.variedad || cos.titulo || 'Producto',
          precio: Number(cos.precioUnitario || 1000),
          unidad: cos.unidad || 'kg',
          cantidadDisponible: Number(cos.cantidadDisponible || 100),
          departamento: cos.departamento || 'Colombia',
          municipio: cos.municipio || '',
          vereda: cos.vereda || '',
          ubicacion: `${cos.municipio ? cos.municipio + ', ' : ''}${cos.departamento || 'Colombia'}`,
          latitud: lat,
          longitud: lng,
          descripcion: cos.descripcion || '',
          imagenes: Array.isArray(cos.imagenes) ? cos.imagenes[0] : (cos.imagenes || ''),
          certificaciones: Array.isArray(cos.certificaciones) ? cos.certificaciones.join(', ') : (cos.certificaciones || ''),
          estado: cos.estado || 'disponible',
          origen: 'D',
          productorId: usuario.id
        }
      });
    }
  }

  console.log('🌱 Sembrando Transportistas...');
  if (TRANSPORTISTAS_DATA) {
    for (let j = 0; j < TRANSPORTISTAS_DATA.length; j++) {
      const tr = TRANSPORTISTAS_DATA[j];
      const tel = tr.telefono || `+5732000000${(j + 1).toString().padStart(2, '0')}`;
      const usuarioTr = await prisma.usuario.upsert({
        where: { telefono: tel },
        update: { origen: 'D', rol: 'Transportista' },
        create: {
          nombre: tr.nombre || 'Transportista',
          telefono: tel,
          telefonoVerificado: true,
          cedula: `CC-TRP-${j + 100}`,
          estadoVerificacion: 'APROBADO',
          rol: 'Transportista',
          origen: 'D'
        }
      });

      await prisma.perfilTransportista.upsert({
        where: { usuarioId: usuarioTr.id },
        update: { placaVehiculo: tr.placa || `TRP-${j + 100}` },
        create: {
          usuarioId: usuarioTr.id,
          licenciaConduccion: 'C2-NACIONAL',
          placaVehiculo: tr.placa || `TRP-${j + 100}`,
          tipoVehiculo: tr.tipoVehiculo || tr.vehiculo || 'Furgón',
          capacidadToneladas: Number(tr.capacidadToneladas || 5),
          aseguradoraCarga: 'Seguros SURA',
          coberturaSeguro: 'Pérdida Total y Saqueo'
        }
      });
    }
  }

  console.log('🌱 Sembrando Almacenes B2B (origen = "D")...');
  if (ALMACENES_INSUMOS_DATA) {
    for (let k = 0; k < ALMACENES_INSUMOS_DATA.length; k++) {
      const alm = ALMACENES_INSUMOS_DATA[k];
      const almId = alm.id || `alm-demo-${(k + 1).toString().padStart(3, '0')}`;
      await prisma.almacenInsumos.upsert({
        where: { id: almId },
        update: { origen: 'D' },
        create: {
          id: almId,
          nombre: alm.nombre || 'Almacén Agropecuario',
          departamento: alm.departamento || 'Colombia',
          municipio: alm.municipio || '',
          direccion: alm.direccion || `${alm.municipio || ''}, ${alm.departamento || ''}`,
          telefono: alm.telefono || '+573000000000',
          whatsapp: alm.whatsapp || '',
          calificacion: Number(alm.calificacion || 4.8),
          marcas: Array.isArray(alm.marcas) ? alm.marcas.join(', ') : (alm.marcas || ''),
          categoria: alm.categoria || 'mixto',
          imagen: alm.imagen || '',
          descripcion: alm.descripcion || '',
          origen: 'D'
        }
      });
    }
  }

  console.log('🌱 Sembrando Bolsa de Empleo (origen = "D")...');
  if (EMPLEOS_DATA) {
    for (let m = 0; m < EMPLEOS_DATA.length; m++) {
      const emp = EMPLEOS_DATA[m];
      const empId = emp.id || `emp-demo-${(m + 1).toString().padStart(3, '0')}`;
      await prisma.ofertaEmpleo.upsert({
        where: { id: empId },
        update: { origen: 'D' },
        create: {
          id: empId,
          titulo: emp.titulo || 'Vacante Campo',
          sector: emp.sector || 'agricola',
          tipoContrato: emp.tipoContrato || 'Jornal / Cosecha',
          ubicacion: emp.ubicacion || 'Colombia',
          departamento: emp.departamento || 'Colombia',
          municipio: emp.municipio || '',
          salario: Number(emp.salario || 0),
          salarioTexto: emp.salarioTexto || '',
          requiereExperiencia: Boolean(emp.requiereExperiencia),
          incluyeHospedaje: Boolean(emp.incluyeHospedaje),
          incluyeAlimentacion: Boolean(emp.incluyeAlimentacion),
          descripcion: emp.descripcion || '',
          requisitos: Array.isArray(emp.requisitos) ? emp.requisitos.join('; ') : (emp.requisitos || ''),
          empleadorNombre: emp.empleador || 'Empresa Agro',
          empleadorTelefono: emp.telefono || '+573000000000',
          estado: 'ACTIVA',
          origen: 'D'
        }
      });
    }
  }

  console.log('🌱 Sembrando Precios de Mercado...');
  if (PRECIOS_MERCADO_DATA) {
    for (let p = 0; p < PRECIOS_MERCADO_DATA.length; p++) {
      const pr = PRECIOS_MERCADO_DATA[p];
      const prId = `pr-demo-${(p + 1).toString().padStart(3, '0')}`;
      await prisma.precioMercado.upsert({
        where: { id: prId },
        update: { precioPromedio: Number(pr.precioPromedio || 1500) },
        create: {
          id: prId,
          producto: pr.producto || 'Producto',
          categoria: pr.categoria || 'Agricola',
          variedad: pr.variedad || '',
          centralAbastos: pr.central || 'Corabastos',
          departamento: pr.departamento || 'Bogota',
          precioMinimo: Number(pr.precioMin || pr.precioPromedio || 1000),
          precioMaximo: Number(pr.precioMax || pr.precioPromedio || 2000),
          precioPromedio: Number(pr.precioPromedio || 1500),
          unidad: pr.unidad || 'kg',
          tendencia: pr.tendencia || 'estable',
          variacionSemanal: Number(pr.variacion || 0)
        }
      });
    }
  }

  console.log('🌱 Sembrando Agremiaciones, Noticias y Alertas...');
  if (AGREMIACIONES_DATA) {
    for (let a = 0; a < AGREMIACIONES_DATA.length; a++) {
      const ag = AGREMIACIONES_DATA[a];
      const agId = ag.id || `agr-demo-${(a + 1).toString().padStart(3, '0')}`;
      await prisma.agremiacion.upsert({
        where: { id: agId },
        update: {},
        create: {
          id: agId,
          nombre: ag.nombre || '',
          sigla: ag.sigla || '',
          sector: ag.sector || '',
          descripcion: ag.descripcion || '',
          logoUrl: ag.logo || '',
          sitioWeb: ag.sitioWeb || '',
          telefono: ag.telefono || '',
          departamentoSede: ag.sede || 'Colombia'
        }
      });
    }
  }

  if (NOTICIAS_DATA) {
    for (let n = 0; n < NOTICIAS_DATA.length; n++) {
      const not_ = NOTICIAS_DATA[n];
      const notId = not_.id || `not-demo-${(n + 1).toString().padStart(3, '0')}`;
      await prisma.noticiaAgraria.upsert({
        where: { id: notId },
        update: { origen: 'D' },
        create: {
          id: notId,
          titulo: not_.titulo || '',
          resumen: not_.resumen || '',
          contenido: not_.contenido || not_.resumen || '',
          categoria: not_.categoria || 'Nacional',
          fuente: not_.fuente || 'Ministerio de Agricultura',
          imagenUrl: not_.imagen || '',
          destacada: Boolean(not_.destacada),
          origen: 'D'
        }
      });
    }
  }

  console.log('🎉 ¡Todas las tablas y datos demo (origen = "D") han sido sincronizados!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
