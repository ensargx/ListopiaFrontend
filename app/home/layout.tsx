import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import HeaderLayout from "@/components/header/HeaderLayout";

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

export default function  PageLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
            <HeaderLayout/> 
        </header>
        {children}
        <footer
          style={{
            padding: "1rem",
          }}>
            <p>Footer</p>
        </footer>
      </body>
    </>
  );
}
