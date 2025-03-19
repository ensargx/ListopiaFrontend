    import type { Metadata } from "next";
    import "./globals.css";



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
            className={`antialiased`}>
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
