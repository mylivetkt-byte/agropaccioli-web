import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ShieldCheck, Scale, FileText, Mail, MapPin } from 'lucide-react';

export default function PoliticasPrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
            <div className="bg-emerald-900 p-8 text-center text-white">
              <ShieldCheck className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
              <h1 className="text-3xl font-black mb-2">Política de Tratamiento de Datos Personales</h1>
              <p className="text-emerald-200">Ley Estatutaria 1581 de 2012 y Decreto 1074 de 2015</p>
            </div>
            
            <div className="p-8 md:p-12 prose prose-emerald max-w-none prose-sm md:prose-base text-zinc-600">
              <p>
                Dando estricto cumplimiento a lo dispuesto en el Artículo 15 de la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1074 de 2015 y las demás normas que las modifiquen, adicionen o complementen, se establece la presente Política de Tratamiento de Datos Personales.
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                1. Identificación del Responsable del Tratamiento
              </h3>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><strong>Razón Social:</strong> TODOSOFT</li>
                <li><strong>Representante Legal / Titular:</strong> Adolfo León Quintero H.</li>
                <li><strong>NIT / Cédula:</strong> 16.354.715-5</li>
                <li><strong>Domicilio:</strong> Cra. 13 Nro. 6-49 2do. Piso</li>
                <li><strong>Correo electrónico de contacto:</strong> todosoft2009@gmail.com</li>
              </ul>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                2. Finalidad del Tratamiento
              </h3>
              <p>
                Los datos personales proporcionados a <strong>TODOSOFT</strong> serán recolectados, almacenados, usados, circulados y eventualmente suprimidos, única y exclusivamente para los siguientes fines específicos:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li>Gestión integral de los procesos de <strong>facturación</strong> y cobro.</li>
                <li><strong>Atención al cliente</strong>, respuesta a peticiones, quejas, reclamos y sugerencias (PQRS).</li>
                <li>Envío de <strong>información comercial</strong>, publicitaria y ofertas de servicios de la plataforma.</li>
                <li>Ejecución de campañas y estrategias de <strong>marketing</strong>.</li>
              </ul>
              <p>
                <strong>TODOSOFT</strong> garantiza que los datos recolectados no serán utilizados para finalidades distintas a las aquí descritas sin obtener una nueva autorización previa y expresa por parte del titular.
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                3. Autorización Previa, Expresa e Informada
              </h3>
              <p className="mb-6">
                El tratamiento de los datos personales por parte de <strong>TODOSOFT</strong> requiere el consentimiento libre, previo, expreso e informado del titular. Esta autorización será obtenida a través de los formularios físicos, digitales o plataformas electrónicas dispuestos por la empresa, conservando en todo momento prueba de dicha autorización (registros de log, checkboxes digitales, firmas, etc.).
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                4. Derechos de los Titulares
              </h3>
              <p>De conformidad con el Artículo 8 de la Ley 1581 de 2012, los titulares de la información tienen derecho a:</p>
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a TODOSOFT. Este derecho se podrá ejercer, entre otros, frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error o cuyo tratamiento esté expresamente prohibido o no haya sido autorizado.</li>
                <li>Solicitar <strong>prueba de la autorización</strong> otorgada a TODOSOFT.</li>
                <li>Ser <strong>informado</strong>, previa solicitud, respecto del uso que se le ha dado a sus datos personales.</li>
                <li><strong>Revocar la autorización</strong> y/o solicitar la <strong>supresión de los datos</strong> cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                <li><strong>Acceder en forma gratuita</strong> a los datos personales que hayan sido objeto de tratamiento.</li>
                <li>Presentar ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> quejas por infracciones a lo dispuesto en la ley.</li>
              </ol>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                5. Procedimiento y Canales para Ejercer los Derechos
              </h3>
              <p>
                Los titulares podrán ejercer sus derechos enviando una solicitud formal al correo electrónico: <strong>todosoft2009@gmail.com</strong>. Los tiempos legales de respuesta son los siguientes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Consultas:</strong> Las peticiones para conocer la información personal serán atendidas en un término máximo de diez (10) días hábiles. Si no fuere posible atenderla en dicho término, se informará al titular expresando los motivos, y se responderá en un plazo que no superará cinco (5) días hábiles siguientes al vencimiento del primer plazo.</li>
                <li><strong>Reclamos (Actualización, Rectificación, Supresión, Revocatoria):</strong> Serán atendidos en un término máximo de quince (15) días hábiles. Si el reclamo está incompleto, se requerirá al titular dentro de los cinco (5) días siguientes para subsanar. Si transcurren dos (2) meses sin respuesta del titular, se entenderá desistido el reclamo. De ser necesario, se podrá ampliar el plazo inicial de 15 días por máximo ocho (8) días hábiles adicionales, previa justificación.</li>
              </ul>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                6. Área Responsable
              </h3>
              <p className="mb-6">
                El área encargada de la recepción, atención y respuesta de peticiones, consultas y reclamos relacionados con la protección de datos personales es el <strong>Área de Protección de Datos de TODOSOFT</strong>, la cual puede ser contactada directamente en el domicilio principal (Cra. 13 Nro. 6-49 2do. Piso) o en el correo <strong>todosoft2009@gmail.com</strong>.
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                7. Medidas de Seguridad
              </h3>
              <p className="mb-6">
                <strong>TODOSOFT</strong> ha adoptado las medidas de seguridad técnicas, humanas y administrativas necesarias para otorgar protección a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento, implementando protocolos de cifrado y controles de acceso estandarizados.
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                8. Transferencia y Transmisión de Datos
              </h3>
              <p className="mb-6">
                <strong>TODOSOFT</strong> declara que, por regla general, <strong>no realizará</strong> transferencias de bases de datos a terceros países. En el caso excepcional en que requiera transmitir (tercerizar el manejo) o transferir datos a terceros (nacionales o internacionales), lo hará suscribiendo los respectivos contratos de transmisión que obliguen al encargado a cumplir con las mismas medidas de seguridad aquí establecidas, o requerirá autorización expresa del titular para la transferencia, asegurando niveles de protección adecuados según la SIC.
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                9. Tratamiento de Datos de Menores de Edad
              </h3>
              <p className="mb-6">
                En cumplimiento de la Circular Externa 005 de 2017 de la SIC, <strong>TODOSOFT</strong> velará por el uso adecuado de los datos personales de los niños, niñas y adolescentes, y respetará en su tratamiento el interés superior de los mismos, asegurando la preservación de sus derechos fundamentales. Cualquier recopilación de datos de menores será de carácter estrictamente opcional y requerirá siempre la <strong>autorización previa, expresa y comprobable del representante legal</strong> (padre, madre o tutor).
              </p>

              <h3 className="flex items-center gap-2 text-emerald-900 font-bold mt-8 border-b pb-2">
                10. Registro Nacional de Bases de Datos (RNBD)
              </h3>
              <p className="mb-6">
                <strong>TODOSOFT</strong> reconoce su obligación y procederá con la inscripción de sus bases de datos en el Registro Nacional de Bases de Datos (RNBD) administrado por la Superintendencia de Industria y Comercio, en los plazos y condiciones (topes de activos) estipulados por la ley y el Decreto 1074 de 2015.
              </p>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 text-xs mt-10">
                <p>
                  <strong>⚠️ NOTA LEGAL:</strong> Esta política ha sido redactada conforme a la normativa colombiana vigente y la Ley Estatutaria 1581 de 2012. Fecha de entrada en vigencia: 01 de Septiembre de 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
