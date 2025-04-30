// ProfileStatistics.tsx
"use client"

import type React from "react"
import { useState, type CSSProperties } from "react"
import { Eye, Clock, Heart } from "lucide-react"
import { fetchLikedMovies } from "@/api/userapi"
import { fetchWatchedMoviesByUser, fetchWatchlistMoviesByUser} from "@/api/movieapi"
import type { Movie } from "@/types/movie"
import type { PaginatedResponse } from "@/types/friends"
import { Link } from "react-router-dom"
import { ProfileCardSlider } from "../components/ProfileCardSlider"
import { movieToSlug } from "@/app/home/util/slug"

interface ProfileStatisticsProps {
    stats: {
        watched: number
        wantToWatch: number
        liked: number
    }
    userUuid: string
}


const ProfileStatistics: React.FC<ProfileStatisticsProps> = ({ stats, userUuid }) => {
    const [activeList, setActiveList] = useState<"watched" | "watchlist" | "liked" | null>(null)
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const pageSize = 20;

    const handleStatClick = async (type: "watched" | "watchlist" | "liked") => {
        if (activeList === type) {
            setActiveList(null)
            setMovies([])
            return
        }

        setActiveList(type)
        setLoading(true)
        setError(null)
        setCurrentPage(0)

        try {
            let response: PaginatedResponse<Movie>
            const initialPageNumber = 0;

            if (type === "watched") {
                response = await fetchWatchedMoviesByUser(userUuid, { pageNumber: initialPageNumber, pageSize: pageSize })
            } else if (type === "watchlist") {
                response = await fetchWatchlistMoviesByUser(userUuid, { pageNumber: initialPageNumber, pageSize: pageSize })
            } else { // type === "liked"
                response = await fetchLikedMovies(userUuid, initialPageNumber, pageSize)
            }

            setMovies(response.content)
            setTotalPages(response.totalPages)
        } catch (err) {
            console.error(`Error fetching ${type} movies:`, err)
            const typeTurkish = type === 'watched' ? 'izlenen' : type === 'watchlist' ? 'izlenecek' : 'beğenilen';
            setError(`${typeTurkish} filmler yüklenemedi. Lütfen tekrar deneyin.`)
            setMovies([])
            setTotalPages(0)
        } finally {
            setLoading(false)
        }
    }

    const loadPage = async (page: number) => {
        if (!activeList || page < 0 || (totalPages > 0 && page >= totalPages)) return

        setLoading(true)
        setError(null)

        try {
            let response: PaginatedResponse<Movie>

            if (activeList === "watched") {
                response = await fetchWatchedMoviesByUser(userUuid, { pageNumber: page, pageSize: pageSize })
            } else if (activeList === "watchlist") {
                response = await fetchWatchlistMoviesByUser(userUuid, { pageNumber: page, pageSize: pageSize })
            } else { // activeList === "liked"
                response = await fetchLikedMovies(userUuid, page, pageSize)
            }

            setMovies(response.content)
            setCurrentPage(page)
        } catch (err) {
            console.error(`Error fetching page ${page} for ${activeList} movies:`, err)
            const typeTurkish = activeList === 'watched' ? 'izlenen' : activeList === 'watchlist' ? 'izlenecek' : 'beğenilen';
            setError(`${typeTurkish} filmlerin ${page + 1}. sayfası yüklenemedi.`)
        } finally {
            setLoading(false)
        }
    }

    // --- Stiller (Değişiklik Yok) ---
    const containerStyle: CSSProperties = { marginBottom: "2rem" }
    const cardsContainerStyle: CSSProperties = { display: "flex", gap: "16px", flexWrap: "wrap" }
    const cardBaseStyle: CSSProperties = { flex: '1 1 200px', display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", borderRadius: "8px", transition: "transform 0.2s", minWidth: '180px' }
    const clickableCardStyle: CSSProperties = { ...cardBaseStyle, cursor: "pointer" }
    const iconContainerBaseStyle: CSSProperties = { borderRadius: "50%", padding: "16px", marginBottom: "16px", display: "flex", justifyContent: "center", alignItems: "center" }
    const countStyle: CSSProperties = { fontSize: "clamp(24px, 5vw, 48px)", fontWeight: "bold", color: "white", marginBottom: "8px" }
    const labelStyle: CSSProperties = { color: "#d1d1d1" }
    const movieListStyle: CSSProperties = { backgroundColor: "#121212", borderRadius: "8px", overflow: "hidden", marginTop: "24px", padding: "16px", width: '100%' }
    const movieListHeaderStyle: CSSProperties = { fontSize: "1.25rem", fontWeight: 600, margin: "0 0 16px 0", color: "#e0e0e0" }
    const messageStyle: CSSProperties = { textAlign: "center", padding: "32px 16px" }
    const errorMessageStyle: CSSProperties = { ...messageStyle, color: "#e74c3c" }
    const emptyMessageStyle: CSSProperties = { ...messageStyle, color: "#aaa" }
    const paginationStyle: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 0 0", borderTop: "1px solid #333", marginTop: "16px" }
    const pageInfoStyle: CSSProperties = { fontSize: "0.875rem", color: "#aaa" }
    const pageButtonsStyle: CSSProperties = { display: "flex", gap: "8px" }
    const getPageButtonStyle = (disabled: boolean): CSSProperties => ({ padding: "4px 12px", fontSize: "0.875rem", borderRadius: "4px", backgroundColor: disabled ? "#222" : "#333", color: disabled ? "#666" : "white", border: "none", cursor: disabled ? "not-allowed" : "pointer" })
    // --- Stiller Sonu ---


    return (
        <div style={containerStyle}>
            <div style={cardsContainerStyle}>
                {/* Watched Movies Card */}
                <div
                    onClick={() => handleStatClick("watched")}
                    style={{ ...clickableCardStyle, backgroundColor: "#0F2818", border: "1px solid #1E5631" }}
                    onMouseOver={(e) => {(e.currentTarget.style as CSSProperties).transform = "scale(1.03)" }}
                    onMouseOut={(e) => {(e.currentTarget.style as CSSProperties).transform = "scale(1)" }}
                >
                    <div style={{ ...iconContainerBaseStyle, backgroundColor: "#1E5631" }}>
                        <Eye size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.watched}</div>
                    <div style={labelStyle}>Watched</div>
                </div>

                {/* Want to Watch Card */}
                <div
                    onClick={() => handleStatClick("watchlist")}
                    style={{ ...clickableCardStyle, backgroundColor: "#0F1A2A", border: "1px solid #1E3A5F" }}
                    onMouseOver={(e) => {(e.currentTarget.style as CSSProperties).transform = "scale(1.03)" }}
                    onMouseOut={(e) => {(e.currentTarget.style as CSSProperties).transform = "scale(1)" }}
                >
                    <div style={{ ...iconContainerBaseStyle, backgroundColor: "#1E3A5F" }}>
                        <Clock size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.wantToWatch}</div>
                    <div style={labelStyle}>To Watch</div>
                </div>

                {/* Liked Movies Card */}
                <div
                    onClick={() => handleStatClick("liked")}
                    style={{ ...clickableCardStyle, backgroundColor: "#2A0F0F", border: "1px solid #5F1E1E" }}
                    onMouseOver={(e) => {(e.currentTarget.style as CSSProperties).transform = "scale(1.03)" }}
                    onMouseOut={(e) => {(e.currentTarget.style as CSSProperties).transform = "scale(1)" }}
                >
                    <div style={{ ...iconContainerBaseStyle, backgroundColor: "#5F1E1E" }}>
                        <Heart size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.liked}</div>
                    <div style={labelStyle}>Liked</div>
                </div>
            </div>

            {/* Film Listesi Bölümü (Değişiklik yok) */}
            {activeList && (
                <div style={movieListStyle}>
                    <h3 style={movieListHeaderStyle}>
                        {activeList === "watched"
                            ? "Movies Watched"
                            : activeList === "watchlist"
                                ? "Movies to Watch"
                                : "Liked Movies"}
                    </h3>

                    {loading && <div style={messageStyle}>Yükleniyor...</div>}
                    {error && <div style={errorMessageStyle}>{error}</div>}
                    {!loading && !error && movies.length === 0 && (
                        <div style={emptyMessageStyle}>Bu listede film bulunamadı.</div>
                    )}
                    {!loading && !error && movies.length > 0 && (
                        <>
                            <ProfileCardSlider
                                items={movies}
                                renderItem={(movie) => (
                                    <Link key={movie.movieId} to={movieToSlug(movie)} className="profile-movie-card">
                                        <div className="profile-movie-poster">
                                            <img
                                                src={
                                                    movie.poster
                                                        ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                                                        : "/placeholder.svg?height=150&width=100"
                                                }
                                                alt={movie.title}
                                                loading="lazy"
                                                onError={(e) => {
                                                    const t = e.target as HTMLImageElement
                                                    t.src = "/placeholder.svg?height=150&width=100"
                                                }}
                                            />
                                        </div>
                                        <div className="profile-movie-info">
                                            <h4 className="profile-movie-title">{movie.title}</h4>
                                            <div className="profile-movie-meta">
                                                <span className="profile-movie-year">
                                                  {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            />
                            {totalPages > 1 && (
                                <div style={paginationStyle}>
                                    <div style={pageInfoStyle}>
                                        Sayfa {currentPage + 1} / {totalPages}
                                    </div>
                                    <div style={pageButtonsStyle}>
                                        <button
                                            onClick={() => loadPage(currentPage - 1)}
                                            disabled={currentPage === 0 || loading}
                                            style={getPageButtonStyle(currentPage === 0 || loading)}
                                        >
                                            Önceki
                                        </button>
                                        <button
                                            onClick={() => loadPage(currentPage + 1)}
                                            disabled={currentPage >= totalPages - 1 || loading}
                                            style={getPageButtonStyle(currentPage >= totalPages - 1 || loading)}
                                        >
                                            Sonraki
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileStatistics