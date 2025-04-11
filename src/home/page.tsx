import React, { Suspense, useState, useEffect } from 'react';

const HeroBanner = React.lazy(() => import('../home/Hero'));
const GenreCarousel = React.lazy(() => import('../home/GenreCarousel').then(mod => ({ default: mod.GenreCarousel })));
const MovieCarousel = React.lazy(() => import('../home/MovieCarousel').then(mod => ({ default: mod.MovieCarousel })));
const ListCarousel = React.lazy(() => import('../home/ListCarousel').then(mod => ({ default: mod.ListCarousel })));

interface SectionConfig {
    id: string;
    Component: React.ComponentType;
}

export default function MainPage() {
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
                        {/* Suspense ile yavaş yükleme */}
                        <Suspense fallback={<div>Loading {section.id}...</div>}>
                        <SectionComponent />
                        </Suspense>
                    </section>
                    );
                })}
            </main>
        </div>
    );
}
