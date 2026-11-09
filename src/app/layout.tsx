import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Tesla — Elektr Avtomobillar, Quyosh Panellari va Toza Energiya",
  description:
    "Tesla rasmiy sayti klon loyihasi (Next.js): Model Y, Model 3, Model X, Model S, Cybertruck, Solar Panels va interaktiv 3D/Studio Avtomobil Konfiguratori.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <body className="antialiased bg-black text-white selection:bg-blue-600 selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
