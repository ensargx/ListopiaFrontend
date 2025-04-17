// src/features/home/components/TrendingGenres.tsx
import React, { useEffect, useState } from 'react';
import { Genre } from '@/types/genre';
import { fetchTrendingGenres } from '@/app/api';
import { CardSlider } from './CardSlider';

export const TrendingGenres: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingGenres()
            .then(setGenres)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading genres…</div>;

    return (
        <section className="section">
            <h2>Trending Genres</h2>
            <CardSlider
                items={genres}
                renderItem={(g) => (
                    <div className="genre-card">
                        <span>{g.name}</span>
                    </div>
                )}
            />
        </section>
    );
};
