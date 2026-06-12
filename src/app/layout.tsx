import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perfect Mesh Solutions | Premium Mosquito Mesh & Aluminium Fabrication",
  description: "High-end mosquito mesh and aluminium solutions for modern homes. Invisible protection, maximum comfort.",
};

import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/chat/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark `}>
      <body className="min-h-full flex flex-col font-sans selection:bg-accent selection:text-background relative">
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
