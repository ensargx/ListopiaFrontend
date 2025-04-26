// src/features/home/components/HeroBanner.tsx
import React from 'react';
import { Movie } from '@/types/movie';
import {Link} from 'react-router-dom';
import '../style/HeroBanner.css';
import { movieToSlug } from '../util/slug';

type Props = { movie: Movie };

export const HeroBanner: React.FC<Props> = ({ movie }) => {
    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop}`;

    return (
        <Link to={movieToSlug(movie)}>
        <section
            className="hero-banner"
            style={{
                backgroundImage: `url(${backdropUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="overlay">
                <div className="content">
                    <h1>{movie.title}</h1>
                    <p>{movie.tagline || movie.overview}</p>
                    {/*<button className="btn-primary">Get Started – Sign Up</button>*/}

                        <button className="btn-primary">
                            View Details
                        </button>
                </div>
            </div>
        </section>
        </Link>
    );
};
