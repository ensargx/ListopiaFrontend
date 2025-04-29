import React, { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import '../style/MovieHeader.css';
import { getPosterUrl } from '@/lib/utils';
import {
    likeMovie,
    markMovieAsWatched,
    addMovieToWatchlist,
    removeMovieFromWatched,
    removeMovieFromWatchlist,
    fetchWatchedMoviesByUser,
    fetchWatchlistMoviesByUser
} from '@/api/movieapi';
import { useAuth } from '@/app/auth/hooks/AuthContext';
import {
    fetchLikedMovies,
} from '@/api/userapi';
import { useNavigate } from "react-router-dom";

interface Props {
    movie: Movie;
}

const MovieHeader: React.FC<Props> = ({ movie }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // State'ler...
    const [liked, setLiked] = useState<boolean>(false);
    const [isLiking, setIsLiking] = useState<boolean>(false);
    const [likeError, setLikeError] = useState<string | null>(null);

    const [watched, setWatched] = useState<boolean>(false);
    const [isUpdatingWatched, setIsUpdatingWatched] = useState<boolean>(false);
    const [watchedError, setWatchedError] = useState<string | null>(null);

    const [watchlist, setWatchlist] = useState<boolean>(false);
    const [isUpdatingWatchlist, setIsUpdatingWatchlist] = useState<boolean>(false);
    const [watchlistError, setWatchlistError] = useState<string | null>(null);

    const [isFetchingStatus, setIsFetchingStatus] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setIsFetchingStatus(false);
            setLiked(false);
            setWatched(false);
            setWatchlist(false);
            return;
        }
        setIsFetchingStatus(true);
        setFetchError(null);
        setLikeError(null);
        setWatchedError(null);
        setWatchlistError(null);


        Promise.allSettled([
            fetchLikedMovies(user.uuid),
            fetchWatchedMoviesByUser(user.uuid),
            fetchWatchlistMoviesByUser(user.uuid)
        ]).then(results => {
            // Like
            if (results[0].status === 'fulfilled') {
                setLiked(results[0].value.content.some((m: Movie) => m.movieId === movie.movieId));
            } else {
                console.error('Error fetching liked movies:', results[0].reason);
                setFetchError('Failed to fetch liked status.');
            }
            // Watched
            if (results[1].status === 'fulfilled') {
                setWatched(results[1].value.content.some((m: Movie) => m.movieId === movie.movieId));
            } else {
                console.error('Error fetching watched movies:', results[1].reason);
                setFetchError('Failed to fetch watched status.');
            }
            // Watchlist
            if (results[2].status === 'fulfilled') {
                setWatchlist(results[2].value.content.some((m: Movie) => m.movieId === movie.movieId));
            } else {
                console.error('Error fetching watchlist movies:', results[2].reason);
                setFetchError('Failed to fetch watchlist status.');
            }
        }).catch(err => {
            console.error('Error fetching initial movie statuses:', err);
            setFetchError('Failed to fetch initial movie statuses.');
        }).finally(() => {
            setIsFetchingStatus(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uuid, movie.movieId]);

    // handleLike fonksiyonu aynı...
    const handleLike = async () => {
        if (!user) { navigate('/login/'); return; }
        if (isLiking || isFetchingStatus || isUpdatingWatched || isUpdatingWatchlist) return;
        setIsLiking(true);
        setLikeError(null);
        const previousLiked = liked;
        setLiked(!previousLiked); // Optimistic UI

        try {
            const response = await likeMovie(movie.movieId, !previousLiked);
            if (!response.success) {
                console.error('API reported failure (Like):', response.message);
                setLikeError(response.message || 'Failed to update like status.');
                setLiked(previousLiked); // Rollback
            }
        } catch (err) {
            console.error('Error calling likeMovie API:', err);
            setLikeError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setLiked(previousLiked); // Rollback
        } finally {
            setIsLiking(false);
        }
    };


    const handleWatched = async () => {
        if (!user) { navigate('/login/'); return; }
        if (isUpdatingWatched || isLiking || isFetchingStatus || isUpdatingWatchlist) return;

        const currentWatchedStatus = watched;
        const currentWatchlistStatus = watchlist; // İzleme listesi durumu da lazım
        setIsUpdatingWatched(true);
        setWatchedError(null);
        setWatchlistError(null);

        try {
            if (!currentWatchedStatus) {
                if (currentWatchlistStatus) {
                    console.log("İzledim'e eklemeden önce izleme listesinden çıkarılıyor...");
                    try {
                        const removeRes = await removeMovieFromWatchlist(movie.movieId);
                        if (!removeRes.success) {

                            console.error("API Error (Remove from Watchlist):", removeRes.message);
                            setWatchlistError("Film izleme listesinden çıkarılamadı.");

                        } else {
                            console.log("İzleme listesinden başarıyla çıkarıldı.");
                        }
                    } catch (err) {
                        console.error("Network Error (Remove from Watchlist):", err);
                        setWatchlistError(err instanceof Error ? `İzleme listesinden çıkarma hatası: ${err.message}` : 'Bilinmeyen hata.');

                    }
                }

                console.log("Film izlendi olarak işaretleniyor...");
                const markRes = await markMovieAsWatched(movie.movieId);
                if (markRes.success) {
                    console.log("Film başarıyla izlendi olarak işaretlendi.");
                    setWatched(true);
                    setWatchlist(false);
                } else {
                    console.error("API Error (Mark as Watched):", markRes.message);
                    setWatchedError(markRes.message || 'Film izlendi olarak işaretlenemedi.');

                }

            } else {
                console.log("İzledim işareti kaldırılıyor...");
                const removeRes = await removeMovieFromWatched(movie.movieId);
                if (removeRes.success) {
                    console.log("İzledim işareti başarıyla kaldırıldı.");
                    setWatched(false);
                } else {
                    console.error("API Error (Remove from Watched):", removeRes.message);
                    setWatchedError(removeRes.message || 'İzledim işareti kaldırılamadı.');
                }
            }
        } catch (err) {
            console.error("Network Error (Watched Handler):", err);
            setWatchedError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.');
        } finally {
            setIsUpdatingWatched(false);
        }
    };

    const handleWatchlist = async () => {
        if (!user) { navigate('/login/'); return; }
        if (isUpdatingWatchlist || isLiking || isFetchingStatus || isUpdatingWatched) return;

        const currentWatchlistStatus = watchlist;
        const currentWatchedStatus = watched;
        setIsUpdatingWatchlist(true);
        setWatchlistError(null);
        setWatchedError(null);

        try {
            if (!currentWatchlistStatus) {
                if (currentWatchedStatus) {
                    console.log("İzleme listesine eklemeden önce izlenenlerden çıkarılıyor...");
                    try {
                        const removeRes = await removeMovieFromWatched(movie.movieId);
                        if (!removeRes.success) {
                            console.error("API Error (Remove from Watched):", removeRes.message);
                            setWatchedError("Film izlenenlerden çıkarılamadı.");
                        } else {
                            console.log("İzlenenlerden başarıyla çıkarıldı.");
                        }
                    } catch (err) {
                        console.error("Network Error (Remove from Watched):", err);
                        setWatchedError(err instanceof Error ? `İzlenenlerden çıkarma hatası: ${err.message}` : 'Bilinmeyen hata.');
                    }
                }

                console.log("Film izleme listesine ekleniyor...");
                const addRes = await addMovieToWatchlist(movie.movieId);
                if (addRes.success) {
                    console.log("Film başarıyla izleme listesine eklendi.");
                    setWatchlist(true);
                    setWatched(false);
                } else {
                    console.error("API Error (Add to Watchlist):", addRes.message);
                    setWatchlistError(addRes.message || 'Film izleme listesine eklenemedi.');
                }

            } else {
                console.log("İzleme listesinden kaldırılıyor...");
                const removeRes = await removeMovieFromWatchlist(movie.movieId);
                if (removeRes.success) {
                    console.log("İzleme listesinden başarıyla kaldırıldı.");
                    setWatchlist(false);
                } else {
                    console.error("API Error (Remove from Watchlist):", removeRes.message);
                    setWatchlistError(removeRes.message || 'Film izleme listesinden kaldırılamadı.');
                }
            }
        } catch (err) {
            console.error("Network Error (Watchlist Handler):", err);
            setWatchlistError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.');
        } finally {
            setIsUpdatingWatchlist(false);
        }
    };


    const isBusy = isLiking || isUpdatingWatched || isUpdatingWatchlist || isFetchingStatus;


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
                    {/* Butonlar */}
                    <button
                        title={liked ? "Unlike" : "Like"}
                        onClick={handleLike}
                        disabled={isBusy}
                        className={`action-button like-button ${liked ? 'liked' : ''} ${isLiking ? 'processing' : ''}`}
                        aria-label={liked ? "Unlike" : "Like"}
                    >
                        {liked ? '❤️' : '♡'}
                    </button>
                    <button
                        title={watched ? "Mark as unwatched" : "Mark as watched"}
                        onClick={handleWatched}
                        disabled={isBusy}
                        className={`action-button watched-button ${watched ? 'active' : ''} ${isUpdatingWatched ? 'processing' : ''}`}
                    >
                        Watched
                    </button>
                    <button
                        title={watchlist ? "Remove from watchlist" : "Add to watchlist"}
                        onClick={handleWatchlist}
                        disabled={isBusy}
                        className={`action-button watchlist-button ${watchlist ? 'active' : ''} ${isUpdatingWatchlist ? 'processing' : ''}`}
                    >
                        Want to Watch
                    </button>
                    {/* Hata Mesajları */}
                    {(likeError || fetchError || watchedError || watchlistError) && (
                        <p className="error-message" style={{ marginTop: '10px', color: 'red', flexBasis: '100%', fontSize: '0.9em' }}>
                            {/* Hataları birleştirerek göster */}
                            {[likeError, fetchError, watchedError, watchlistError].filter(Boolean).join(' ')}
                        </p>
                    )}
                </div>
            </div>
        </header>
    );
};

export default MovieHeader;