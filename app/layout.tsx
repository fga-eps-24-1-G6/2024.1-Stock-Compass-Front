import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Button } from "../components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { Home } from 'lucide-react';
import { Search } from 'lucide-react';
import { Laptop } from 'lucide-react';


const inter = Inter({ subsets: ["latin"] });

const TopBar = () => {
  return (
    <div className="top-bar flex items-center justify-between px-4 py-4">
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
    <div className="side-menu border border-gray-700 rounded-3xl p-0 ml-4 h-[32rem]">
      <div className="flex flex-col items-start">
        <Button variant="default" size="default" className="mb-6 mt-6 bg-transparent">
          <Home color="white" size={26} />
        </Button>
        <Button variant="default" size="default" className="mb-6 bg-transparent">
          <Search color="white" size={26} />
        </Button>
        <Button variant="default" size="default" className="mb-6 bg-transparent">
          <Laptop color="white" size={26} />
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
