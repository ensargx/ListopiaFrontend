// src/features/home/components/TopRatedMovies.tsx
import React, { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { fetchTopRatedMovies } from '@/app/api';
import { CardSlider } from './CardSlider';

export const TopRatedMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopRatedMovies()
            .then(setMovies)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading top‑rated…</div>;

    return (
        <section className="section">
            <h2>Top Rated Lists</h2>
            <CardSlider
                items={movies}
                renderItem={(m) => (
                    <img
                        src={`https://image.tmdb.org/t/p/w300${m.poster}`}
                        alt={m.title}
                    />
                )}
            />
        </section>
    );
};
