import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Listopia • Social Platform",
  description: "Create Lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
           <main className="flex-grow">
               {children}
          </main>
        <footer className="px-8 py-4 bg-gray-900 ">
          <p className="text-center text-sm text-neutral-500">Listopia <br/> All rights reserved. </p>
        </footer>
      </body>
    </html>
  );
}
