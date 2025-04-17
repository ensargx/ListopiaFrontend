// src/features/home/components/MovieGenres.tsx
import React, { useEffect, useState } from 'react';
import { fetchFrontMovies } from '@/app/api';
// import { FrontMovie } from '@/types/front';
import { CardSlider } from './CardSlider';

const GENRES = ['Action', 'Adventure', 'Drama', 'Comedy', 'Thriller'];

type GenrePreview = { genre: string; poster: string };

export const MovieGenres: React.FC = () => {
    const [previews, setPreviews] = useState<GenrePreview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(
            GENRES.map((g) =>
                fetchFrontMovies({ genre: g, pageSize: 1 })
                    .then((res) => ({
                        genre: g,
                        poster: res.content[0]?.poster || '',
                    }))
            )
        )
            .then(setPreviews)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading genres…</div>;

    return (
        <section className="section">
            <h2>Movie Genres</h2>
            <CardSlider
                items={previews}
                renderItem={(gp) => (
                    <div className="genre-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${gp.poster}`}
                            alt={gp.genre}
                        />
                        <span className="genre-label">{gp.genre}</span>
                    </div>
                )}
            />
        </section>
    );
};
