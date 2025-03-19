// app/page.tsx (veya pages/index.tsx)
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import HeroBanner from "@/app/home/Hero";
const GenreCarousel = dynamic(
    () => import('@/app/home/GenreCarousel').then((mod) => mod.GenreCarousel),
    { ssr: false }
);
const MovieCarousel = dynamic(
    () => import('@/app/home/MovieCarousel').then((mod) => mod.MovieCarousel),
    { ssr: false }
);
const ListCarousel = dynamic(
    () => import('@/app/home/ListCarousel').then((mod) => mod.ListCarousel),
    { ssr: false }
);


interface SectionConfig {
    id: string;
    Component: React.ComponentType;
}

export default function Page() {
    const [sections, setSections] = useState<SectionConfig[]>([]);

    useEffect(() => {
        // API çağrısı yapabilir veya sabit yapılandırmayı burada tanımlayabilirsiniz.
        setSections([
            { id: 'movies', Component: MovieCarousel },
            { id: 'genres', Component: GenreCarousel },
            { id: 'lists', Component: ListCarousel },
        ]);
    }, []);

    return (
        <div className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <section  >
                <HeroBanner/>
            </section>
            <main>
                {sections.map((section) => {
                    const SectionComponent = section.Component;
                    return (
                        <section key={section.id} className="mb-8">
                            <SectionComponent />
                        </section>
                    );
                })}
            </main>
        </div>
    );
}
