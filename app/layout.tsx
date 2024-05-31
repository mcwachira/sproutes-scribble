import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navigation/navbar";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;

}>) {

  const isAdmin= false;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("px-6 md:px-12 max-w-7xl mx-auto", `${inter.className}`)}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
      <Navbar/>
      {children}
      {/*{isAdmin && profile}*/}

      </ThemeProvider>
      </body>
    </html>
  );
}
