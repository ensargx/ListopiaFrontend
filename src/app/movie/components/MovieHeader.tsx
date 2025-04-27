import React, { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import '../style/MovieHeader.css';
import { getPosterUrl } from '@/lib/utils';
import { likeMovie } from '@/api/movieapi';
import { useAuth } from '@/app/auth/hooks/AuthContext';
import { fetchLikedMovies } from '@/api/userapi';

interface Props {
    movie: Movie;
    /** Optional seed for liked status before fetching real data */
    initialLikedStatus?: boolean;
}

const MovieHeader: React.FC<Props> = ({ movie, initialLikedStatus = false }) => {
    const { user } = useAuth();

    // Local like state
    const [liked, setLiked] = useState<boolean>(initialLikedStatus);
    // State for like/unlike action
    const [isLiking, setIsLiking] = useState<boolean>(false);
    const [likeError, setLikeError] = useState<string | null>(null);
    // State for initial fetch of liked status
    const [isFetchingStatus, setIsFetchingStatus] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setIsFetchingStatus(false);
            return;
        }

        // Seed with prop value, then fetch real status
        setLiked(initialLikedStatus);
        setIsFetchingStatus(true);
        setFetchError(null);

        fetchLikedMovies(user.uuid)
            .then(data => {
                // Compare by IDs, not object reference
                const hasLiked = data.content.some(m => m.movieId === movie.movieId);
                setLiked(hasLiked);
            })
            .catch(err => {
                console.error('Error fetching liked movies:', err);
                setFetchError(err.message || 'Failed to fetch liked status.');
            })
            .finally(() => {
                setIsFetchingStatus(false);
            });
    }, [user?.uuid, movie.movieId, initialLikedStatus]);

    const handleLike = async () => {
        if (isLiking || isFetchingStatus) return;

        setIsLiking(true);
        setLikeError(null);

        try {
            const response = await likeMovie(movie.movieId, !liked);
            if (response.success) {
                setLiked(!liked);
            } else {
                console.error('API reported failure:', response.message);
                setLikeError(response.message || 'Failed to update like status.');
            }
        } catch (err) {
            console.error('Error calling likeMovie API:', err);
            setLikeError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <header className="movie-header">
            <div className="poster">
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
                        disabled={isLiking || isFetchingStatus}
                        className={`like-button ${liked ? 'liked' : ''}`}
                    >
                        {isLiking ? 'Processing...' : (liked ? 'Unlike' : 'Like')}
                    </button>

                    {(likeError || fetchError) && (
                        <p className="error-message" style={{ marginTop: '5px' }}>
                            {likeError || fetchError}
                        </p>
                    )}
                </div>
            </div>
        </header>
    );
};

export default MovieHeader;