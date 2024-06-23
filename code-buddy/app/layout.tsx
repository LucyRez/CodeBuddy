import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBuddy",
  description: "A service for code generation of mobile applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style = {{background:"#2c3150"}}className={inter.className}>
        <ClientProvider></ClientProvider>
        <Header/>
        {children}
      </body>
    </html>
  );
}
