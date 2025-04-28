// src/features/profile/components/ProfileLikedMovies.tsx
import React from 'react'
import type { Movie } from '@/types/movie'
import { movieToSlug } from '@/app/home/util/slug'
import { Link } from 'react-router-dom'
import { ProfileCardSlider } from '../components/ProfileCardSlider'
import '../style/ProfileLikedMovies.css'

interface ProfileLikedMoviesProps {
    likedMovies: Movie[]
    likedMoviesLoading: boolean
    likedMoviesError: string | null
}

const ProfileLikedMovies: React.FC<ProfileLikedMoviesProps> = ({
                                                                   likedMovies,
                                                                   likedMoviesLoading,
                                                                   likedMoviesError,
                                                               }) => {
    if (likedMoviesLoading) return <p>Loading liked movies…</p>
    if (likedMoviesError)   return <p className="error">Error: {likedMoviesError}</p>
    if (likedMovies.length === 0) return <p>No liked movies found.</p>

    return (
        <section className="section profile-liked-movies-section">
            <h2>Liked Movies</h2>
            <ProfileCardSlider
                items={likedMovies}
                renderItem={movie => (
                    <Link
                        key={movie.movieId}
                        to={movieToSlug(movie)}
                        className="profile-movie-card"
                    >
                        <div className="profile-movie-poster">
                            <img
                                src={
                                    movie.poster
                                        ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                                        : '/placeholder.svg?height=150&width=100'
                                }
                                alt={movie.title}
                                onError={e => {
                                    const t = e.target as HTMLImageElement
                                    t.src = '/placeholder.svg?height=150&width=100'
                                }}
                            />
                        </div>
                        <div className="profile-movie-info">
                            <h4 className="profile-movie-title">{movie.title}</h4>
                            <div className="profile-movie-meta">
                <span className="profile-movie-year">
                  {movie.releaseDate
                      ? new Date(movie.releaseDate).getFullYear()
                      : 'N/A'}
                </span>
                                {movie.ratingAverage !== undefined &&
                                    movie.ratingAverage > 0 && (
                                        <span className="profile-movie-rating">
                      ★ {movie.ratingAverage.toFixed(1)}
                    </span>
                                    )}
                            </div>
                        </div>
                    </Link>
                )}
            />
        </section>
    )
}

export default ProfileLikedMovies
