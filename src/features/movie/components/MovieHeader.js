import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './MovieHeader.css';
import { getPosterUrl } from "@/app/utils";
const MovieHeader = ({ movie }) => {
    const [liked, setLiked] = useState(false);
    // Beğenme butonu fonksiyonu suan ise yaramıyor
    const handleLike = () => {
        setLiked(!liked);
        // API bağlandığında burada isteği yapabilirsiniz
    };
    return (_jsxs("header", { className: "movie-header", children: [_jsx("div", { className: "poster", children: _jsx("img", { src: getPosterUrl(movie.poster), alt: movie.title }) }), _jsxs("div", { className: "info", children: [_jsx("h1", { children: movie.title }), movie.tagline && _jsxs("p", { className: "tagline", children: ["\u201C", movie.tagline, "\u201D"] }), _jsxs("p", { children: [_jsx("strong", { children: "Release:" }), " ", movie.releaseDate, " \u00A0|\u00A0", _jsx("strong", { children: "Runtime:" }), " ", movie.runtime, " min"] }), _jsxs("p", { children: [_jsx("strong", { children: "Genres:" }), " ", movie.genres.map(g => g.name).join(', ')] }), _jsxs("p", { children: [_jsx("strong", { children: "Rating:" }), " ", movie.ratingAverage, " (", movie.ratingCount, " votes)"] }), movie.overview && (_jsxs("p", { className: "overview", children: [_jsx("strong", { children: "Overview:" }), " ", movie.overview] }))] })] }));
};
export default MovieHeader;
