import type { Metadata } from "next";
import HeaderLayout from "@/components/header/HeaderLayout";


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
    <div >
        <header>
            <HeaderLayout/>
        </header>
        {/* Ana İçerik (Trending, Genre, vb.) */}
        <main className="px-10 py-0">
          {/* Trending Movies */}
          <section className="mb-1">

          </section>

          {/* Trending Genres */}
          <section className="mb-8">
          </section>
          {/* Top Rated Lists */}
          <section className="mb-8">
          </section>

          {children}
        </main>

    </div>
  );
}
