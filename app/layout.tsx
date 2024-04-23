import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Button } from "../components/ui/button";

const inter = Inter({ subsets: ["latin"] });

const TopBar = () => {
  return (
    <div className="top-bar">
      {/* Conteúdo da barra superior */}
      <h1>Stock Compass</h1>
      <Button variant="default" size="default">
        Login
      </Button>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Stock Compass",
  description: "Plataforma de educação financeira e investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar/>
        {children}
      </body>
    </html>
  );
}
