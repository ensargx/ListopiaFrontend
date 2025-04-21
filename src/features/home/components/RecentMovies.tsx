import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFrontMovies } from '@/app/api';
import { FrontMovie } from '@/types/front';
import { CardSlider } from './CardSlider';
import './RecentMovies.css';

export const RecentMovies: React.FC = () => {
    const [movies, setMovies] = useState<FrontMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFrontMovies({
            sortBy: 'ratingAverage',
            sortOrder: 'dsc',
            pageSize: 20
        })
            .then(res => setMovies(res.content))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Loading recent movies…</div>;

    return (
        <section className="section">
            <h2>Recent Movies</h2>
            <CardSlider
                items={movies}
                renderItem={m => (
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
