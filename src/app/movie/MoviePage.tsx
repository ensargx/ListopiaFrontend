import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    fetchMovieById,
    fetchMovieCasts,
    fetchMovieCrews,
} from '@/api/movieapi';
import {CrewMember} from "@/types/crew";
import {CastMember} from "@/types/crew";
import { Movie } from '@/types/movie';
import MovieHeader from '../../components/MovieHeader';
import CastList from '../../components/CastList';
import CrewList from '../../components/CrewList';
import ReviewList from '../../components/ReviewList';
import SimilarMovies from '../../components/SimilarMovies';
import './MoviePage.css';

export const MoviePage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [casts, setCasts] = useState<CastMember[]>([]);
    const [crews, setCrews] = useState<CrewMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!movieId) return;
        const id = Number(movieId);
        Promise.all([
            fetchMovieById(id),
            fetchMovieCasts(id),
            fetchMovieCrews(id),
        ])
            .then(([m, castRes, crewRes]) => {
                setMovie(m);
                document.title = `${m.title} - Listopia`
                setCasts(castRes.content);
                setCrews(crewRes.content);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [movieId]);

    if (loading) return <p>Loading…</p>;
    if (!movie) return <p>Movie not found</p>;

    const primaryGenre = movie.genres[0]?.name || '';

    return (
        <main className="movie-page">
            <MovieHeader movie={movie} />

            <div className="people-and-lists">
                <div className="people">
                    <CastList casts={casts} />
                    <CrewList crews={crews} />
                </div>
            </div>

            <ReviewList />

            <SimilarMovies genre={primaryGenre} />
        </main>
    );
};

export default MoviePage;
