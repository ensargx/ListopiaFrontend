import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { fetchFrontMovies } from '@/app/api';
import { CardSlider } from '@/features/home/components/CardSlider';
import { Link } from 'react-router-dom';
import './SimilarMovies.css';
const SimilarMovies = ({ genre }) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        if (!genre)
            return;
        fetchFrontMovies({ genre, pageSize: 15 })
            .then(res => setMovies(res.content))
            .catch(console.error);
    }, [genre]);
    if (!movies.length)
        return null;
    return (_jsxs("section", { className: "similar-movies", children: [_jsx("h2", { children: "Similar Films" }), _jsx(CardSlider, { items: movies, renderItem: m => (_jsx(Link, { to: `/movies/${m.movieId}`, children: _jsx("img", { src: `https://image.tmdb.org/t/p/w300${m.poster}`, alt: m.title }) }, m.movieId)) })] }));
};
export default SimilarMovies;
