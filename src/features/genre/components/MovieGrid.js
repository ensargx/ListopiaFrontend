import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './MovieGrid.css';
import { getPosterUrl } from '@/app/utils';
function truncate(text, maxLen = 50) {
    return text.length > maxLen
        ? text.slice(0, maxLen) + '…'
        : text;
}
export const MovieGrid = ({ movies }) => (_jsx("div", { className: "movie-grid", children: movies.map(movie => {
        // Eğer API full URL döndürdüyse olduğu gibi kullan, aksi halde base URL + relative path
        const posterUrl = getPosterUrl(movie.poster);
        // console.log('poster path:', movie.poster); // debug için
        const title = truncate(movie.title, 50);
        return (_jsxs(Link, { to: `/movies/${movie.movieId}`, className: "movie-card", children: [_jsx("img", { src: posterUrl, alt: movie.title, className: "movie-poster" }), _jsx("h3", { className: "movie-title", children: title })] }, movie.movieId));
    }) }));
