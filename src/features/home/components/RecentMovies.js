import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFrontMovies } from '@/app/api';
import { CardSlider } from './CardSlider';
import './RecentMovies.css';
import { getPosterUrl } from '@/app/utils';
export const RecentMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchFrontMovies({
            sortBy: 'releaseDate',
            sortOrder: 'dsc',
            pageSize: 20
        })
            .then(res => setMovies(res.content))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);
    if (loading)
        return _jsx("div", { className: "loading", children: "Loading recent movies\u2026" });
    return (_jsxs("section", { className: "section", children: [_jsx("h2", { children: "Recent Movies" }), _jsx(CardSlider, { items: movies, renderItem: m => (_jsx(Link, { to: `/movies/${m.movieId}`, className: "slider-card", children: _jsx("div", { className: "slider-poster", children: _jsx("img", { src: getPosterUrl(m.poster), alt: m.title }) }) })) })] }));
};
