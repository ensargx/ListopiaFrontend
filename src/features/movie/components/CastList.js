import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/movie/components/CastList.tsx
import { useState } from 'react';
import './CastList.css';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';
const CastList = ({ casts }) => {
    const [expanded, setExpanded] = useState(false);
    const limit = 8;
    const toShow = expanded ? casts : casts.slice(0, limit);
    // Filter out cast members with no profile image
    const filteredCasts = toShow.filter((c) => c.profilePath);
    return (_jsxs("section", { className: "cast-list", children: [_jsx("h3", { children: "Cast" }), _jsx("div", { className: "cast-grid", children: filteredCasts.map((c) => (_jsxs("div", { className: "cast-card", children: [_jsx("img", { src: `${IMAGE_BASE_URL}${c.profilePath}`, alt: c.originalName, loading: "lazy" }), _jsx("p", { className: "name", children: c.originalName }), _jsx("p", { className: "character", children: c.character })] }))) }), casts.length > limit && (_jsx("button", { className: "cast-expand-btn", onClick: () => setExpanded(!expanded), children: expanded ? 'Show less' : '… Show all' }))] }));
};
export default CastList;
