import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './GenreSidebar.css';
export const GenreSidebar = ({ genres, selected }) => (_jsxs("aside", { className: "genre-sidebar", children: [_jsx("h3", { children: "Genres" }), _jsx("ul", { children: genres.map(g => {
                const to = g === 'All' ? '/genres/' : `/genres/${g}`;
                return (_jsx("li", { children: _jsx(Link, { to: to, className: g === selected ? 'active' : '', children: g }) }, g));
            }) })] }));
