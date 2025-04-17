// src/features/home/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { fetchMovieById } from '@/app/api';
import { Movie } from '@/types/movie';
import { HeroBanner } from './components/HeroBanner';
import { PopularMovies } from './components/PopularMovies';
import { RecentMovies } from './components/RecentMovies';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const [featured, setFeatured] = useState<Movie | null>(null);
    const [loadingHero, setLoadingHero] = useState(true);

    useEffect(() => {
        fetchMovieById(98, 'en')
            .then(m => setFeatured(m))
            .catch(console.error)
            .finally(() => setLoadingHero(false));
    }, []);

    return (
        <main className="home-page">
            {/* --- Hero + Sidebar Row --- */}
            <div className="hero-row">
                <div className="hero-container">
                    {loadingHero
                        ? <div className="hero-loading">Loading featured…</div>
                        : featured && <HeroBanner movie={featured} />
                    }
                </div>
                <aside className="hero-sidebar">
                    <h3>What's New</h3>
                    <ul>
                        <li>🔥 New Releases</li>
                        <li>⭐ Top Rated</li>
                        <li>🎬 Upcoming</li>
                    </ul>
                </aside>
            </div>

            {/* --- Aşağıdaki iki slider --- */}
            <PopularMovies />
            <RecentMovies />
        </main>
    );
};
