import React, { useState } from 'react';
import { Movie } from '@/types/movie';
import './MovieHeader.css';
import { getPosterUrl } from "@/app/utils";

interface Props {
    movie: Movie;
}

const MovieHeader: React.FC<Props> = ({ movie }) => {
    const [liked, setLiked] = useState(false);

    // Beğenme butonu fonksiyonu
    const handleLike = () => {
        setLiked(!liked);
        // API bağlandığında burada isteği yapabilirsiniz
    };

    return (
        <header className="movie-header">
            <div className="poster">
                <img src={getPosterUrl(movie.poster)} alt={movie.title} />
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

                {/* Film açıklaması */}
                {movie.overview && (
                    <p className="overview">
                        <strong>Overview:</strong> {movie.overview}
                    </p>
                )}
            </div>
        </header>
    );
};

export default MovieHeader;
