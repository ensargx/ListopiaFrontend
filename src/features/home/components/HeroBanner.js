import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './HeroBanner.css';
export const HeroBanner = ({ movie }) => {
    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop}`;
    return (_jsx(Link, { to: `/movies/${movie.movieId}`, children: _jsx("section", { className: "hero-banner", style: {
                backgroundImage: `url(${backdropUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }, children: _jsx("div", { className: "overlay", children: _jsxs("div", { className: "content", children: [_jsx("h1", { children: movie.title }), _jsx("p", { children: movie.tagline || movie.overview }), _jsx("button", { className: "btn-primary", children: "View Details" })] }) }) }) }));
};
