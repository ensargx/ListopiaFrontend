"use client"

import type React from "react"
import { useState, type CSSProperties } from "react"
import { Eye, Clock, Heart } from "lucide-react"
import { fetchWatchedMoviesByUser, fetchWatchlistMoviesByUser } from "@/api/movieapi"
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
        totalFilms: number
    }
    userUuid: string
}

const ProfileStatistics: React.FC<ProfileStatisticsProps> = ({ stats, userUuid }) => {
    // State hooks remain the same
    const [activeList, setActiveList] = useState<"watched" | "watchlist" | null>(null) // Removed 'liked' from type
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Updated handleStatClick to only accept 'watched' or 'watchlist'
    const handleStatClick = async (type: "watched" | "watchlist") => {
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

            if (type === "watched") {
                response = await fetchWatchedMoviesByUser(userUuid, { pageNumber: 0, pageSize: 20 })
            } else { // Only 'watchlist' remains
                response = await fetchWatchlistMoviesByUser(userUuid, { pageNumber: 0, pageSize: 20 })
            }

            setMovies(response.content)
            setTotalPages(response.totalPages)
        } catch (err) {
            console.error(`Error fetching ${type} movies:`, err)
            setError(`Failed to load ${type} movies. Please try again.`)
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    // Updated loadPage to remove the 'liked' condition
    const loadPage = async (page: number) => {
        // Removed check for activeList === 'liked'
        if (!activeList || page < 0 || (totalPages > 0 && page >= totalPages)) return

        setLoading(true)
        setError(null)

        try {
            let response: PaginatedResponse<Movie>

            if (activeList === "watched") {
                response = await fetchWatchedMoviesByUser(userUuid, { pageNumber: page, pageSize: 20 })
            } else { // Only 'watchlist' remains
                response = await fetchWatchlistMoviesByUser(userUuid, { pageNumber: page, pageSize: 20 })
            }

            setMovies(response.content)
            setCurrentPage(page)
        } catch (err) {
            console.error(`Error fetching ${activeList} movies:`, err)
            setError(`Failed to load ${activeList} movies. Please try again.`)
        } finally {
            setLoading(false)
        }
    }

    // Styles remain the same (or add specific overrides if needed)
    const containerStyle: CSSProperties = {
        marginBottom: "2rem",
    }

    const cardsContainerStyle: CSSProperties = {
        display: "flex",
        gap: "16px",
    }

    const cardBaseStyle: CSSProperties = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        borderRadius: "8px",
        // Removed cursor: "pointer" from base, will add it back to clickable ones
        transition: "transform 0.2s",
    }

    // Style for clickable cards specifically
    const clickableCardStyle: CSSProperties = {
        ...cardBaseStyle,
        cursor: "pointer",
    }

    const iconContainerBaseStyle: CSSProperties = {
        borderRadius: "50%",
        padding: "16px",
        marginBottom: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const countStyle: CSSProperties = {
        fontSize: "48px",
        fontWeight: "bold",
        color: "white",
        marginBottom: "8px",
    }

    const labelStyle: CSSProperties = {
        color: "#d1d1d1",
    }

    const movieListStyle: CSSProperties = {
        backgroundColor: "#121212",
        borderRadius: "8px",
        overflow: "hidden",
        marginTop: "24px",
        padding: "16px",
    }

    const movieListHeaderStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        margin: "0 0 16px 0",
        color: "#e0e0e0",
    }

    // Message and pagination styles remain the same
    const messageStyle: CSSProperties = {
        textAlign: "center",
        padding: "32px 16px",
    }

    const errorMessageStyle: CSSProperties = {
        ...messageStyle,
        color: "#e74c3c",
    }

    const emptyMessageStyle: CSSProperties = {
        ...messageStyle,
        color: "#aaa",
    }

    const paginationStyle: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0 0 0",
        borderTop: "1px solid #333",
        marginTop: "16px",
    }

    const pageInfoStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "#aaa",
    }

    const pageButtonsStyle: CSSProperties = {
        display: "flex",
        gap: "8px",
    }

    const getPageButtonStyle = (disabled: boolean): CSSProperties => ({
        padding: "4px 12px",
        fontSize: "0.875rem",
        borderRadius: "4px",
        backgroundColor: disabled ? "#222" : "#333",
        color: disabled ? "#666" : "white",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
    })
    // --- End of Styles ---

    return (
        <div style={containerStyle}>
            {/* Stats Cards */}
            <div style={cardsContainerStyle}>
                {/* Watched Movies Card - Remains clickable */}
                <div
                    onClick={() => handleStatClick("watched")}
                    style={{
                        ...clickableCardStyle, // Use clickable style
                        backgroundColor: "#0F2818",
                        border: "1px solid #1E5631",
                    }}
                    onMouseOver={(e) => {
                        ;(e.currentTarget.style as CSSProperties).transform = "scale(1.05)"
                    }}
                    onMouseOut={(e) => {
                        ;(e.currentTarget.style as CSSProperties).transform = "scale(1)"
                    }}
                >
                    <div
                        style={{
                            ...iconContainerBaseStyle,
                            backgroundColor: "#1E5631",
                        }}
                    >
                        <Eye size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.watched}</div>
                    <div style={labelStyle}>Watched</div>
                </div>

                {/* Want to Watch Card - Remains clickable */}
                <div
                    onClick={() => handleStatClick("watchlist")}
                    style={{
                        ...clickableCardStyle, // Use clickable style
                        backgroundColor: "#0F1A2A",
                        border: "1px solid #1E3A5F",
                    }}
                    onMouseOver={(e) => {
                        ;(e.currentTarget.style as CSSProperties).transform = "scale(1.05)"
                    }}
                    onMouseOut={(e) => {
                        ;(e.currentTarget.style as CSSProperties).transform = "scale(1)"
                    }}
                >
                    <div
                        style={{
                            ...iconContainerBaseStyle,
                            backgroundColor: "#1E3A5F",
                        }}
                    >
                        <Clock size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.wantToWatch}</div>
                    <div style={labelStyle}>To Watch</div>
                </div>

                {/* Liked Movies Card - Made non-interactive */}
                <div
                    // Removed onClick handler
                    style={{
                        ...cardBaseStyle, // Use base style (no cursor: pointer)
                        backgroundColor: "#2A0F0F",
                        border: "1px solid #5F1E1E",
                        cursor: "default", // Explicitly set default cursor
                    }}
                    // Removed onMouseOver and onMouseOut handlers
                >
                    <div
                        style={{
                            ...iconContainerBaseStyle,
                            backgroundColor: "#5F1E1E",
                        }}
                    >
                        <Heart size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.liked}</div>
                    <div style={labelStyle}>Liked</div>
                </div>
            </div>

            {/* Movie List Section - Logic remains mostly the same, but 'liked' case is unreachable */}
            {activeList && ( // activeList can now only be 'watched' or 'watchlist'
                <div style={movieListStyle}>
                    <h3 style={movieListHeaderStyle}>
                        {activeList === "watched"
                            ? "Movies Watched"
                            : "Movies to Watch"} {/* Removed Liked Movies title option */}
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
                                                {movie.ratingAverage !== undefined && movie.ratingAverage > 0 && (
                                                    <span className="profile-movie-rating">★ {movie.ratingAverage.toFixed(1)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            />

                            {/* Pagination - Logic remains the same */}
                            {totalPages > 1 && (
                                <div style={paginationStyle}>
                                    <div style={pageInfoStyle}>
                                        Sayfa {currentPage + 1} / {totalPages}
                                    </div>
                                    <div style={pageButtonsStyle}>
                                        <button
                                            onClick={() => loadPage(currentPage - 1)}
                                            disabled={currentPage === 0}
                                            style={getPageButtonStyle(currentPage === 0)}
                                        >
                                            Önceki
                                        </button>
                                        <button
                                            onClick={() => loadPage(currentPage + 1)}
                                            disabled={currentPage >= totalPages - 1}
                                            style={getPageButtonStyle(currentPage >= totalPages - 1)}
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