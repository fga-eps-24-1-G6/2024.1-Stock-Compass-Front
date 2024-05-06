import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Button } from "../components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const TopBar = () => {
  return (
    <div className="top-bar flex items-center justify-between px-4 py-2">
      <h1>
        <span className="text-white font-bold">Stock </span>
        <span className="font-bold text-teal-400">Compass</span>
      </h1>
      <Button variant="default" size="default" className="bg-white text-black">
        Login
      </Button>
    </div>
  );
};

const SideMenu = () => {
  return (
    <div className="side-menu rounded-r-lg border-r-4 border-gray-700 flex flex-col justify-start items-center" style={{ height: '85vh', marginLeft: '0.5vw'}}>
      <div className="flex flex-col items-center">
        <Button variant="default" size="default" className="mb-4" style={{ marginTop: '1vh' }}>
          <img src="../assets/iconHome.png" alt="" />
        </Button>
        <Button variant="default" size="default" className="mb-4">
          <img src="../assets/iconPesquisa.png" alt="" />
        </Button>
        <Button variant="default" size="default" className="mb-4">
          <img src="../assets/iconDash.png" alt="" />
        </Button>
      </div>
    </div>
  );
}

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
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />
          <div className="flex justify-center items-center">
            <SideMenu />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
