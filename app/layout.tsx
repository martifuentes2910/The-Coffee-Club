import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "The Coffee Club | Cafe Premium desde 1988",
  description:
    "Descubre nuestra seleccion de cafes de especialidad de Kenya, Ethiopia y mas. Envios a todo el pais.",
  keywords: ["cafe", "coffee", "especialidad", "premium", "tienda", "eshop"],
};

export const viewport: Viewport = {
  themeColor: "#1a1410",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
