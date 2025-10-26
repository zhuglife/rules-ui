// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Rule Engine",
  description: "Sistema de gerenciamento de clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="py-8">
          {children}
        </main>
      </body>
    </html>
  );
}