import React, { useState, useEffect } from 'react';
import { fetchFrontMovies } from '@/api/movieapi';
import { FrontMovie } from '@/types/front';
import { CardSlider } from '@/components/CardSlider';
import { Link } from 'react-router-dom';
import './SimilarMovies.css';

interface Props {
    genre: string;
}

const SimilarMovies: React.FC<Props> = ({ genre }) => {
    const [movies, setMovies] = useState<FrontMovie[]>([]);

    useEffect(() => {
        if (!genre) return;
        fetchFrontMovies({ genre, pageSize: 15 })
            .then(res => setMovies(res.content))
            .catch(console.error);
    }, [genre]);

    if (!movies.length) return null;

    return (
        <section className="similar-movies">
            <h2>Similar Films</h2>
            <CardSlider
                items={movies}
                renderItem={m => (
                    <Link key={m.movieId} to={`/movies/${m.movieId}`}>
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

export default SimilarMovies;
