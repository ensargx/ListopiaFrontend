import React from 'react';
import { Movie } from '@/types/movie';
import { Link } from 'react-router-dom';
import './MovieHeader.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

interface Props {
    movie: Movie;
}

const MovieHeader: React.FC<Props> = ({ movie }) => (
    <header className="movie-header">
        <div className="poster">
            <img
                src={
                    movie.poster.startsWith('http')
                        ? movie.poster
                        : `${IMAGE_BASE_URL}${movie.poster}`
                }
                alt={movie.title}
            />
        </div>
        <div className="info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}
            <p>
                <strong>Release:</strong> {movie.releaseDate} &nbsp;|&nbsp;
                <strong>Runtime:</strong> {movie.runtime} min
            </p>
            <p>
                <strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}
            </p>
            <p>
                <strong>Rating:</strong> {movie.ratingAverage} ({movie.ratingCount} votes)
            </p>
            {movie.trailerLink && (
                <Link
                    to={movie.trailerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-trailer"
                >
                    Watch Trailer
                </Link>
            )}
        </div>
    </header>
);

export default MovieHeader;
