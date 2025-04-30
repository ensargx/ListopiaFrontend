// src/components/ProfileUpdates.tsx
import React from "react"
import { Clock } from "lucide-react"
import { formatTimeAgo } from "@/lib/utils"
import "../style/ProfilePage.css"
import BecomeFriendUpdate from "./updates/BecomeFriendsUpdate"
import { UserAcitivity } from "@/types/user/useractivity"
import MovieAddWatchlistUpdate from "./updates/MovieAddWatchlistUpdate"
import MovieAddWatchedUpdate from "./updates/MovieAddWatchedUpdate"
import MovieLikedUpdate from "./updates/MovieLikedUpdate"
import MovieCommentedUpdate from "./updates/MovieCommentUpdate"

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
    profileUpdates: UserAcitivity[]
}

function renderUpdateComponent(update: UserAcitivity) {
    switch (update.type) {
      case "BECOME_FRIENDS":
        return <BecomeFriendUpdate activity={update} />;
      case "MOVIE_ADD_WATCHLIST":
        return <MovieAddWatchlistUpdate activity={update} />;
      case "MOVIE_ADD_WATCHED":
        return <MovieAddWatchedUpdate activity={update} />;
      case "MOVIE_LIKED":
        return <MovieLikedUpdate activity={update} />;
      case "MOVIE_COMMENT":
        return <MovieCommentedUpdate activity={update} />;
    };
    return null;
} 

function strTimeToCorrectDate(date: number) {
    let strnow = formatTimeAgo(date);
    if (strnow == "online")
        return "now";
    return strnow;
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
                    const { type, time } = update
                    const formattedType = toKebab(type)
                    const timeAgo = formatTimeAgo(time)

                    return (
                        <div key={update.id} className={`update-item ${formattedType}`}>
                            <div className="update-content">
                                {renderUpdateComponent(update)}
                            </div>
                            <div className="update-time">
                                <Clock size={16} />
                                <span>{strTimeToCorrectDate(update.time)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfileUpdates
