import type React from "react"
import type { Movie } from "@/types/movie"

interface LikedMoviesProps {
    likedMovies: Movie[]
    likedMoviesLoading: boolean
    likedMoviesError: string | null
}

const LikedMovies: React.FC<LikedMoviesProps> = ({ likedMovies, likedMoviesLoading, likedMoviesError }) => {
    return (
        <div className="liked-movies-section">
            <h2>Liked Movies</h2>

            {/* Loading State */}
            {likedMoviesLoading && <p>Loading liked movies...</p>}

            {/* Error State */}
            {likedMoviesError && <p style={{ color: "red" }}>Error: {likedMoviesError}</p>}

            {/* Content: Display only when not loading and no error */}
            {!likedMoviesLoading && !likedMoviesError && (
                <div className="horizontal-scroll-container">
                    {likedMovies.length === 0 ? (
                        <p>No liked movies found.</p>
                    ) : (
                        <div className="movie-cards-container">
                            {likedMovies.map((movie) => (
                                <div key={movie.movieId} className="movie-card">
                                    <div className="movie-poster">
                                        <img
                                            src={
                                                movie.poster
                                                    ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                                                    : "/placeholder.svg?height=150&width=100"
                                            }
                                            alt={movie.title}
                                            className="movie-poster-img"
                                            onError={(e) => {
                                                // Fallback if image fails to load
                                                const target = e.target as HTMLImageElement
                                                target.src = "/placeholder.svg?height=150&width=100"
                                            }}
                                        />
                                    </div>
                                    <div className="movie-info">
                                        <h4 className="movie-title">{movie.title}</h4>
                                        <div className="movie-meta">
                      <span className="movie-year">
                        {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                      </span>
                                            {movie.ratingAverage !== undefined && movie.ratingAverage > 0 && (
                                                <span className="movie-rating">★ {movie.ratingAverage.toFixed(1)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default LikedMovies
