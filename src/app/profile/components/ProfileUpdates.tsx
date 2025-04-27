import type React from "react"
import { Clock } from "lucide-react"
import { formatTimeAgo } from "@/lib/utils"

interface MovieType {
    id: number
    title: string
    releaseDate: string
    posterPath: string
    voteAverage: number
    overview: string
}

interface ProfileUpdate {
    id: number
    type: string
    movie: MovieType
    updatedAt: number
}

interface ProfileUpdatesProps {
    profileUpdates: ProfileUpdate[]
}

const ProfileUpdates: React.FC<ProfileUpdatesProps> = ({ profileUpdates }) => {
    return (
        <div className="profile-updates">
            <h2>Profile Updates</h2>
            <div className="updates-list">
                {profileUpdates.map((update) => (
                    <div key={update.id} className="update-item">
                        <div className="update-poster">
                            <img
                                src={
                                    update.movie.posterPath
                                        ? `https://image.tmdb.org/t/p/w200${update.movie.posterPath}`
                                        : "/placeholder.svg?height=150&width=100"
                                }
                                alt={update.movie.title}
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg?height=150&width=100"
                                }}
                            />
                        </div>
                        <div className="update-details">
                            <div className="update-header">
                                <h4>{update.movie.title}</h4>
                                <span className="update-year">
                  {update.movie.releaseDate ? new Date(update.movie.releaseDate).getFullYear() : "N/A"}
                </span>
                                {update.movie.voteAverage !== undefined && update.movie.voteAverage > 0 && (
                                    <span className="update-rating">★ {update.movie.voteAverage.toFixed(1)} / 10</span>
                                )}
                            </div>
                            {update.movie.overview && (
                                <p className="update-description">
                                    {update.movie.overview.substring(0, 150)}
                                    {update.movie.overview.length > 150 ? "..." : ""}
                                </p>
                            )}
                            <div className="update-status">
                <span className={`status-badge ${update.type}`}>
                  {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                </span>
                                <div className="update-time">
                                    <Clock size={14} />
                                    <span>{formatTimeAgo(update.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileUpdates
