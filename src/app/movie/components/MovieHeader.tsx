import React, { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import '../style/MovieHeader.css'; // Orijinal CSS dosyasının yolu
import { getPosterUrl } from '@/lib/utils';
import { likeMovie } from '@/api/movieapi';
import { useAuth } from '@/app/auth/hooks/AuthContext';
import { fetchLikedMovies } from '@/api/userapi';
import { useNavigate } from "react-router-dom";

interface Props {
    movie: Movie;
    initialLikedStatus?: boolean;
}

const MovieHeader: React.FC<Props> = ({ movie, initialLikedStatus = false }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Like State
    const [liked, setLiked] = useState<boolean>(initialLikedStatus);
    const [isLiking, setIsLiking] = useState<boolean>(false);
    const [likeError, setLikeError] = useState<string | null>(null);

    // Watched State (İzledim) - Başlangıç değeri ve API çağrısı eklenmeli
    const [watched, setWatched] = useState<boolean>(false);
    const [isUpdatingWatched, setIsUpdatingWatched] = useState<boolean>(false);
    // const [watchedError, setWatchedError] = useState<string | null>(null); // Hata yönetimi istenirse eklenebilir

    // Watchlist State (İzleyeceğim) - Başlangıç değeri ve API çağrısı eklenmeli
    const [watchlist, setWatchlist] = useState<boolean>(false);
    const [isUpdatingWatchlist, setIsUpdatingWatchlist] = useState<boolean>(false);
    // const [watchlistError, setWatchlistError] = useState<string | null>(null); // Hata yönetimi istenirse eklenebilir

    // Fetch Status State
    const [isFetchingStatus, setIsFetchingStatus] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null); // Sadece like fetch hatası

    useEffect(() => {
        if (!user) {
            setIsFetchingStatus(false);
            return;
        }
        setLiked(initialLikedStatus);
        setIsFetchingStatus(true);
        setFetchError(null);
        fetchLikedMovies(user.uuid)
            .then(data => {
                const hasLiked = data.content.some(m => m.movieId === movie.movieId);
                setLiked(hasLiked);
                // TODO: İzledim ve İzleyeceğim durumlarını da API'den çek
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
        if (!user) { navigate('/login/'); return; }
        if (isLiking || isFetchingStatus || isUpdatingWatched || isUpdatingWatchlist) return;
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

    // İzledim Butonu İşlevi (API bağlantısı gerekir)
    const handleWatched = async () => {
        if (!user) { navigate('/login/'); return; }
        if (isUpdatingWatched || isLiking || isFetchingStatus || isUpdatingWatchlist) return;
        setIsUpdatingWatched(true);
        // setWatchedError(null);
        console.log("İzledim butonuna tıklandı. API çağrısı yapılacak.");
        // TODO: API çağrısı ekle
        // Geçici: Sadece state'i değiştir (API olmadan)
        setWatched(!watched);
        if (!watched) setWatchlist(false); // İzlediyse izleme listesinden çıkar
        setIsUpdatingWatched(false);
    };

    // İzleyeceğim Butonu İşlevi (API bağlantısı gerekir)
    const handleWatchlist = async () => {
        if (!user) { navigate('/login/'); return; }
        if (isUpdatingWatchlist || isLiking || isFetchingStatus || isUpdatingWatched) return;
        setIsUpdatingWatchlist(true);
        // setWatchlistError(null);
        console.log("İzleyeceğim butonuna tıklandı. API çağrısı yapılacak.");
        // TODO: API çağrısı ekle
        // Geçici: Sadece state'i değiştir (API olmadan)
        setWatchlist(!watchlist);
        if (!watchlist) setWatched(false); // İzleme listesine eklediyse izlenmişten çıkar
        setIsUpdatingWatchlist(false);
    };

    // Butonların herhangi biri meşgul mü?
    const isBusy = isLiking || isUpdatingWatched || isUpdatingWatchlist || isFetchingStatus;

    return (
        // Orijinal header yapısı korunuyor
        <header className="movie-header">
            <div className="poster">
                <img src={getPosterUrl(movie.poster || '')} alt={movie.title} />
            </div>
            <div className="info">
                {/* Film bilgileri orijinal formatta */}
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

                {/* Butonların eklendiği actions div'i */}
                <div className="actions">
                    {/* Beğen Butonu (Unicode Kalp) */}
                    <button
                        title={liked ? "Unlike" : "Like"}
                        onClick={handleLike}
                        disabled={isBusy}
                        className={`action-button like-button ${liked ? 'liked' : ''} ${isLiking ? 'processing' : ''}`}
                        aria-label={liked ? "Unlike" : "Like"}
                    >
                        {liked ? '❤️' : '♡'}
                    </button>

                    {/* İzledim Butonu */}
                    <button
                        title={watched ? "Mark as unwatched" : "Mark as watched"}
                        onClick={handleWatched}
                        disabled={isBusy}
                        className={`action-button watched-button ${watched ? 'active' : ''} ${isUpdatingWatched ? 'processing' : ''}`}
                    >
                        İzledim
                    </button>

                    {/* İzleyeceğim Butonu */}
                    <button
                        title={watchlist ? "Remove from watchlist" : "Add to watchlist"}
                        onClick={handleWatchlist}
                        disabled={isBusy}
                        className={`action-button watchlist-button ${watchlist ? 'active' : ''} ${isUpdatingWatchlist ? 'processing' : ''}`}
                    >
                        İzleyeceğim
                    </button>

                    {/* Hata Mesajları (Sadece like/fetch için) */}
                    {(likeError || fetchError) && (
                        <p className="error-message" style={{ marginTop: '10px', flexBasis: '100%' }}>
                            {likeError || fetchError}
                        </p>
                    )}
                </div>
            </div>
        </header>
    );
};

export default MovieHeader;