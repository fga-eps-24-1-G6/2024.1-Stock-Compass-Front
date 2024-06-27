import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "../components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Home, WalletMinimal, Search, Bitcoin } from 'lucide-react';
import Link from "next/link";
import { SideMenu } from "@/components/SideMenu";

const inter = Inter({ subsets: ["latin"] });

const TopBar = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex gap-2 font-semibold text-xl md:text-3xl tracking-widest">
        stock <p className="text-teal-400">compass</p>
      </div>

      <div className="hidden md:block">
        <SignedOut>
          <SignInButton>
            <Button variant="default" size="default">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <div className="block md:hidden">
        <SideMenu />
      </div>
    </header>
  );
};

const SideBar = () => {
  return (
    <div className="hidden md:flex flex-col items-start border border-muted rounded-full gap-2 p-1">
      <Link className="p-3 rounded-full hover:bg-muted" href={"/"}>
        <Home className="w-6 h-6" />
      </Link>
      <Link className="p-3 rounded-full hover:bg-muted" href={"/search"}>
        <Search className="w-6 h-6" />
      </Link>
      <Link className="p-3 rounded-full hover:bg-muted" href={"/wallets"}>
        <WalletMinimal className="w-6 h-6" />
      </Link>
      <Link className="p-3 rounded-full hover:bg-muted" href={"/crypto"}>
        <Bitcoin className="w-6 h-6" />
      </Link>
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
    <ClerkProvider>
      <html lang="en" className="h-screen">
        <body className={`${inter.className} flex flex-col !px-6 !py-4 min-h-full`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TopBar />
            <main className="flex flex-grow gap-6 w-full">
              <SideBar />
              <section className="flex-grow w-full">
                {children}
              </section>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
