import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/home/components/MovieGenres.tsx
import { useEffect, useState } from 'react';
import { fetchFrontMovies } from '@/app/api';
// import { FrontMovie } from '@/types/front';
import { CardSlider } from './CardSlider';
const GENRES = ['Action', 'Adventure', 'Drama', 'Comedy', 'Thriller'];
export const MovieGenres = () => {
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Promise.all(GENRES.map((g) => fetchFrontMovies({ genre: g, pageSize: 1 })
            .then((res) => ({
            genre: g,
            poster: res.content[0]?.poster || '',
        }))))
            .then(setPreviews)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);
    if (loading)
        return _jsx("div", { children: "Loading genres\u2026" });
    return (_jsxs("section", { className: "section", children: [_jsx("h2", { children: "Movie Genres" }), _jsx(CardSlider, { items: previews, renderItem: (gp) => (_jsxs("div", { className: "genre-card", children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w300${gp.poster}`, alt: gp.genre }), _jsx("span", { className: "genre-label", children: gp.genre })] })) })] }));
};
