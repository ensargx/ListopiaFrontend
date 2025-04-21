// src/features/home/components/PopularMovies.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchFrontMovies } from '@/app/api';
import { FrontMovie } from '@/types/front';
import { CardSlider } from './CardSlider';
import './PopularMovies.css';

export const PopularMovies: React.FC = () => {
    const [movies, setMovies] = useState<FrontMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFrontMovies({
            sortBy: 'popularity',
            sortOrder: 'dsc',
            pageSize: 20,
        })
            .then((res) => setMovies(res.content))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading popular movies…</div>;

    return (
        <section className="section">
            <h2>Popular Movies</h2>
            <CardSlider
                items={movies}
                renderItem={(m) => (
                    <Link to={`/movies/${m.movieId}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w300${m.poster}`}
                            alt={m.title}
                        />
                    </Link>
                )}
            />
        </section>
    );
};
