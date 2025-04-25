import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/home/HomePage.tsx
import { useEffect, useState } from 'react';
import { fetchMovieById } from '@/app/api';
import { HeroBanner } from './components/HeroBanner';
import { PopularMovies } from './components/PopularMovies';
import { RecentMovies } from './components/RecentMovies';
import { SidebarSpecial } from './components/SidebarSpecial';
import './HomePage.css';
export const HomePage = () => {
    const [featured, setFeatured] = useState(null);
    const [loadingHero, setLoadingHero] = useState(true);
    useEffect(() => {
        fetchMovieById(98, 'en')
            .then(m => setFeatured(m))
            .catch(console.error)
            .finally(() => setLoadingHero(false));
    }, []);
    return (_jsxs("main", { className: "home-page", children: [_jsxs("div", { className: "hero-row", children: [_jsx("div", { className: "hero-container", children: loadingHero
                            ? _jsx("div", { className: "hero-loading", children: "Loading featured\u2026" })
                            : featured && _jsx(HeroBanner, { movie: featured }) }), _jsx("aside", { className: "hero-sidebar", children: _jsx(SidebarSpecial, {}) })] }), _jsx(PopularMovies, {}), _jsx(RecentMovies, {})] }));
};
export default HomePage;
