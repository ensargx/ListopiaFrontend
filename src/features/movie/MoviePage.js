import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchMovieCasts, fetchMovieCrews, } from '@/app/api';
import MovieHeader from './components/MovieHeader';
import CastList from './components/CastList';
import CrewList from './components/CrewList';
import ReviewList from './components/ReviewList';
import SimilarMovies from './components/SimilarMovies';
import './MoviePage.css';
export const MoviePage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [casts, setCasts] = useState([]);
    const [crews, setCrews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!movieId)
            return;
        const id = Number(movieId);
        Promise.all([
            fetchMovieById(id),
            fetchMovieCasts(id),
            fetchMovieCrews(id),
        ])
            .then(([m, castRes, crewRes]) => {
            setMovie(m);
            setCasts(castRes.content);
            setCrews(crewRes.content);
        })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [movieId]);
    if (loading)
        return _jsx("p", { children: "Loading\u2026" });
    if (!movie)
        return _jsx("p", { children: "Movie not found" });
    const primaryGenre = movie.genres[0]?.name || '';
    return (_jsxs("main", { className: "movie-page", children: [_jsx(MovieHeader, { movie: movie }), _jsx("div", { className: "people-and-lists", children: _jsxs("div", { className: "people", children: [_jsx(CastList, { casts: casts }), _jsx(CrewList, { crews: crews })] }) }), _jsx(ReviewList, {}), _jsx(SimilarMovies, { genre: primaryGenre })] }));
};
export default MoviePage;
