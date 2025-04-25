import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { fetchFrontMovies } from '@/app/api';
import { Link } from 'react-router-dom';
import './SidebarSpecial.css';
export const SidebarSpecial = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchFrontMovies({
            sortBy: 'popularity',
            sortOrder: 'dsc',
            pageSize: 5, // sidebar’da sadece 5 tane göster
        })
            .then(res => setMovies(res.content))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);
    return (_jsxs("div", { className: "sidebar-popular", children: [_jsx("h3", { children: "Special Movies" }), loading ? (_jsx("div", { className: "loading", children: "Loading\u2026" })) : (_jsx("ul", { children: movies.map(m => (_jsx("li", { children: _jsxs(Link, { to: `/movies/${m.movieId}`, className: "item", children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w92${m.poster}`, alt: m.title }), _jsx("span", { children: m.title })] }) }, m.movieId))) }))] }));
};
export default SidebarSpecial;
