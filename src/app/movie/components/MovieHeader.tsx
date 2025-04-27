import React, { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import '../style/MovieHeader.css';
import { getPosterUrl } from "@/lib/utils";
import { likeMovie } from "@/api/movieapi";
import { fetchLikedMovies } from "@/api/userapi";

interface Props {
    movie: Movie;
    initialLikedStatus?: boolean;
}

const MovieHeader: React.FC<Props> = ({ movie, initialLikedStatus = false }) => {
    const [liked, setLiked] = useState<boolean>(initialLikedStatus);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Başlangıç durumunu ayarlamak için (opsiyonel, prop yeterli olabilir)
    // useEffect(() => {
    //    setLiked(initialLikedStatus);
    // }, [initialLikedStatus]);

    const handleLike = async () => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        const newLikedStatus = !liked;

        try {
            // movie.id'nin Movie tipinde var olduğundan emin olun
            const response = await likeMovie(movie.movieId, newLikedStatus);

            if (response.success) {
                setLiked(newLikedStatus);
            } else {
                setError(response.message || 'Failed to update like status.');
                console.error('API reported failure:', response.message);
            }
        } catch (err) {
            console.error('Error calling likeMovie API:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="movie-header">
            <div className="poster">
                {/* movie.poster alanının varlığını ve türünü kontrol edin */}
                <img src={getPosterUrl(movie.poster || '')} alt={movie.title} />
            </div>
            <div className="info">
                <h1>{movie.title}</h1>
                {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}
                <p>
                    <strong>Release:</strong> {movie.releaseDate} &nbsp;|&nbsp;
                    <strong>Runtime:</strong> {movie.runtime} min
                </p>
                <p>
                    <strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ') || 'N/A'}
                </p>
                <p>
                    <strong>Rating:</strong> {movie.ratingAverage?.toFixed(1)} ({movie.ratingCount} votes)
                </p>

                {movie.overview && (
                    <p className="overview">
                        <strong>Overview:</strong> {movie.overview}
                    </p>
                )}

                <div className="actions">
                    <button
                        onClick={handleLike}
                        disabled={isLoading}
                        className={`like-button ${liked ? 'liked' : ''}`}
                    >
                        {isLoading ? 'Processing...' : (liked ? 'Unlike' : 'Like')}
                    </button>
                    {error && <p className="error-message" style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
                </div>
            </div>
        </header>
    );
};

export default MovieHeader;