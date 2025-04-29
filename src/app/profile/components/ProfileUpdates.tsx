// src/components/ProfileUpdates.tsx
import React from "react"
import { Clock } from "lucide-react"
import { formatTimeAgo } from "@/lib/utils"
import "../style/ProfilePage.css"

interface MovieType {
    id: number
    title: string
    releaseDate: string
    posterPath: string
    overview: string
}

interface ProfileUpdate {
    id: number
    type: string    // e.g. "wantToWatch", "want to watch", "watched", "liked"
    movie: MovieType
    updatedAt: number
}

interface ProfileUpdatesProps {
    profileUpdates: ProfileUpdate[]
}

const ProfileUpdates: React.FC<ProfileUpdatesProps> = ({ profileUpdates }) => {
    // CamelCase ve boşluklu tipleri kebab-case'e çevirir:
    const toKebab = (str: string) =>
        str
            .replace(/\s+/g, "-")                // boşlukları değiştir
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // camelCase ayır
            .toLowerCase()

    return (
        <div className="profile-updates">
            <h2>Profile Updates</h2>
            <div className="updates-list">
                {profileUpdates.map((update) => {
                    const badgeClass = toKebab(update.type)
                    return (
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
                                        const img = e.target as HTMLImageElement
                                        img.src = "/placeholder.svg?height=150&width=100"
                                    }}
                                />
                            </div>
                            <div className="update-details">
                                <div className="update-header">
                                    <h4>{update.movie.title}</h4>
                                    <span className="update-year">
                    {update.movie.releaseDate
                        ? new Date(update.movie.releaseDate).getFullYear()
                        : "N/A"}
                  </span>
                                </div>

                                {update.movie.overview && (
                                    <p className="update-description">
                                        {update.movie.overview.slice(0, 150)}
                                        {update.movie.overview.length > 150 ? "…" : ""}
                                    </p>
                                )}

                                <div className="update-status">
                  <span className={`status-badge ${badgeClass}`}>
                    {/* Görünen metin için, orijinal tipten baş harf büyük */}
                      {update.type
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                                    <div className="update-time">
                                        <Clock size={14} />
                                        <span>{formatTimeAgo(update.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfileUpdates
