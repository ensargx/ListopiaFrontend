import type React from "react"
import type { Movie } from "@/types/movie"
import { movieToSlug } from "@/app/home/util/slug"
import { Link } from "react-router-dom"
import { CardSlider } from "@/app/home/components/CardSlider"

interface LikedMoviesProps {
    likedMovies: Movie[]
    likedMoviesLoading: boolean
    likedMoviesError: string | null
}

const LikedMovies: React.FC<LikedMoviesProps> = ({
                                                     likedMovies,
                                                     likedMoviesLoading,
                                                     likedMoviesError,
                                                 }) => {
    if (likedMoviesLoading) return <p>Loading liked movies...</p>
    if (likedMoviesError) return <p style={{ color: "red" }}>Error: {likedMoviesError}</p>
    if (likedMovies.length === 0) return <p>No liked movies found.</p>

    return (
        <div className="liked-movies-section">
            <h2>Liked Movies</h2>
            <CardSlider
                className="movie-cards-slider"
                items={likedMovies}
                renderItem={(movie) => (
                    <Link key={movie.movieId} to={movieToSlug(movie)} className="movie-card">
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
                    </Link>
                )}
            />
        </div>
    )
}

export default LikedMovies
