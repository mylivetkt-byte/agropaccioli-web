import type { Metadata } from "next";
import "./globals.css";
import WhatsAppAdvisorPopup from "@/components/ui/WhatsAppAdvisorPopup";

export const metadata: Metadata = {
  title: "AGROPACCIOLI - El Ecosistema Agropecuario de Colombia",
  description: "Portal transaccional, educativo y comercial para Productores Agrícolas, Ganaderos, Acuícolas, Almacenes de Insumos B2B y Transportistas de Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-[#f8faf9] text-[#152417]">
        {children}
        <WhatsAppAdvisorPopup />
      </body>
    </html>
  );
}
