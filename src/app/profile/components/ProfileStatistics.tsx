"use client"

import type React from "react"
import { useState, type CSSProperties } from "react"
import { Eye, Clock, Heart } from "lucide-react"
import { fetchWatchedMoviesByUser, fetchWatchlistMoviesByUser } from "@/api/movieapi"
import type { Movie } from "@/types/movie"
import type { PaginatedResponse } from "@/types/friends"

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
    const [activeList, setActiveList] = useState<"watched" | "watchlist" | "liked" | null>(null)
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const handleStatClick = async (type: "watched" | "watchlist" | "liked") => {
        if (activeList === type) {
            // Toggle off if clicking the same list
            setActiveList(null)
            setMovies([])
            return
        }

        setActiveList(type)
        setLoading(true)
        setError(null)
        setCurrentPage(0) // Reset to first page when changing lists

        try {
            let response: PaginatedResponse<Movie>

            if (type === "watched") {
                response = await fetchWatchedMoviesByUser(userUuid, { pageNumber: 0, pageSize: 12 })
            } else if (type === "watchlist") {
                response = await fetchWatchlistMoviesByUser(userUuid, { pageNumber: 0, pageSize: 12 })
            } else {
                // For liked movies, we would need a similar API
                // This is a placeholder assuming there's a similar API
                response = {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    size: 0,
                    number: 0,
                    sort: { empty: true, sorted: false, unsorted: true },
                    pageable: {
                        offset: 0,
                        pageSize: 0,
                        pageNumber: 0,
                        paged: true,
                        unpaged: false,
                        sort: { empty: true, sorted: false, unsorted: true },
                    },
                    numberOfElements: 0,
                    empty: true,
                } as PaginatedResponse<Movie>
                setError("Liked movies list is not implemented yet")
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

    const loadPage = async (page: number) => {
        if (!activeList || page < 0 || (totalPages > 0 && page >= totalPages)) return

        setLoading(true)
        setError(null)

        try {
            let response: PaginatedResponse<Movie>

            if (activeList === "watched") {
                response = await fetchWatchedMoviesByUser(userUuid, { pageNumber: page, pageSize: 12 })
            } else if (activeList === "watchlist") {
                response = await fetchWatchlistMoviesByUser(userUuid, { pageNumber: page, pageSize: 12 })
            } else {
                // Placeholder for liked movies
                return
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

    // Styles
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
        cursor: "pointer",
        transition: "transform 0.2s",
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
    }

    const movieListHeaderStyle: CSSProperties = {
        padding: "16px",
        borderBottom: "1px solid #333",
        fontSize: "1.25rem",
        fontWeight: 600,
        margin: 0,
    }

    const movieItemsStyle: CSSProperties = {
        padding: "16px",
    }

    const movieItemStyle: CSSProperties = {
        display: "flex",
        padding: "16px 0",
        borderBottom: "1px solid #333",
    }

    const moviePosterStyle: CSSProperties = {
        width: "64px",
        height: "96px",
        objectFit: "cover",
        borderRadius: "4px",
    }

    const movieDetailsStyle: CSSProperties = {
        marginLeft: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }

    const movieTitleStyle: CSSProperties = {
        fontWeight: 500,
        margin: "0 0 4px 0",
    }

    const movieYearStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "#aaa",
        margin: 0,
    }

    const movieRatingStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "#f39c12",
        display: "flex",
        alignItems: "center",
    }

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
        padding: "16px",
        borderTop: "1px solid #333",
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

    return (
        <div style={containerStyle}>
            {/* Stats Cards */}
            <div style={cardsContainerStyle}>
                {/* Watched Movies Card */}
                <div
                    onClick={() => handleStatClick("watched")}
                    style={{
                        ...cardBaseStyle,
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
                    <div style={labelStyle}>İzledim</div>
                </div>

                {/* Want to Watch Card */}
                <div
                    onClick={() => handleStatClick("watchlist")}
                    style={{
                        ...cardBaseStyle,
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
                    <div style={labelStyle}>İzleyeceğim</div>
                </div>

                {/* Liked Movies Card */}
                <div
                    onClick={() => handleStatClick("liked")}
                    style={{
                        ...cardBaseStyle,
                        backgroundColor: "#2A0F0F",
                        border: "1px solid #5F1E1E",
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
                            backgroundColor: "#5F1E1E",
                        }}
                    >
                        <Heart size={24} color="white" />
                    </div>
                    <div style={countStyle}>{stats.liked}</div>
                    <div style={labelStyle}>Beğenilen</div>
                </div>
            </div>

            {/* Movie List Section */}
            {activeList && (
                <div style={movieListStyle}>
                    <h3 style={movieListHeaderStyle}>
                        {activeList === "watched"
                            ? "İzlenen Filmler"
                            : activeList === "watchlist"
                                ? "İzlenecek Filmler"
                                : "Beğenilen Filmler"}
                    </h3>

                    {loading && <div style={messageStyle}>Yükleniyor...</div>}

                    {error && <div style={errorMessageStyle}>{error}</div>}

                    {!loading && !error && movies.length === 0 && (
                        <div style={emptyMessageStyle}>Bu listede film bulunamadı.</div>
                    )}

                    {!loading && !error && movies.length > 0 && (
                        <>
                            <div style={movieItemsStyle}>
                                {movies.map((movie) => (
                                    <div key={movie.movieId} style={movieItemStyle}>
                                        <img
                                            src={movie.poster || "/placeholder.svg?height=150&width=100"}
                                            alt={movie.title}
                                            style={moviePosterStyle}
                                        />
                                        <div style={movieDetailsStyle}>
                                            <div>
                                                <h4 style={movieTitleStyle}>{movie.title}</h4>
                                                <p style={movieYearStyle}>
                                                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                                                </p>
                                            </div>
                                            {movie.ratingAverage > 0 && (
                                                <div style={movieRatingStyle}>
                                                    <span style={{ marginRight: "4px" }}>★</span>
                                                    {movie.ratingAverage.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div style={paginationStyle}>
                                <div style={pageInfoStyle}>
                                    Sayfa {currentPage + 1}
                                    {totalPages > 0 && ` / ${totalPages}`}
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
                                        disabled={totalPages > 0 && currentPage >= totalPages - 1}
                                        style={getPageButtonStyle(totalPages > 0 && currentPage >= totalPages - 1)}
                                    >
                                        Sonraki
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileStatistics
