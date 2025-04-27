"use client"

import type React from "react"
import { useState } from "react"
import "./style/ProfilePage.css"
import { Settings, Brush, MessageCircle, UserPlus, UserMinus, Clock } from "lucide-react"

// Mock data for demonstration
const mockUser = {
    username: "Orçun",
    firstName: "Orçun",
    lastName: "",
    uuid: "123",
    joinDate: "March 4, 2025",
    lastOnline: "Now",
}

const mockStats = {
    watching: 1,
    completed: 3,
    onHold: 0,
    dropped: 1,
    totalFilms: 5,
}

const mockActivity = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama/Crime",
        status: "Completed",
        date: "March 5, 2025, 04:41",
        poster: "/placeholder.svg?height=150&width=100",
    },
    {
        id: 2,
        title: "The Lord of the Rings",
        year: 2001,
        genre: "Fantasy/Adventure",
        status: "Completed",
        date: "March 3, 2025, 20:30",
        poster: "/placeholder.svg?height=150&width=100",
    },
    {
        id: 3,
        title: "Forrest Gump",
        year: 1994,
        genre: "Drama/Comedy",
        status: "Watching",
        date: "March 2, 2025, 22:20",
        poster: "/placeholder.svg?height=150&width=100",
    },
    {
        id: 4,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi/Adventure",
        status: "Completed",
        date: "March 1, 2025, 23:30",
        poster: "/placeholder.svg?height=150&width=100",
    },
    {
        id: 5,
        title: "Pulp Fiction",
        year: 1994,
        genre: "Crime/Drama",
        status: "Dropped",
        date: "Feb 28, 2025, 20:40",
        poster: "/placeholder.svg?height=150&width=100",
    },
]

const mockFriends = [
    { id: 1, name: "İabil", username: "iabil", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "Ensar", username: "ensar", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Ayşe", username: "ayse", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 4, name: "Mert", username: "mert", avatar: "/placeholder.svg?height=50&width=50" },
]

const mockLists = {
    lists: 2,
    reviews: 3,
    communities: 1,
    recommendations: 5,
}

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"all" | "friends">("all")
    const [newFriendUsername, setNewFriendUsername] = useState("")

    // For demonstration purposes, using mock data
    const user = mockUser
    const stats = mockStats
    const activity = mockActivity
    const friends = mockFriends
    const lists = mockLists

    return (
        <div className="profile-page">
            {/* Header with username and actions */}
            <div className="profile-header">
                <h1>{user.username}'s Profile</h1>
                <div className="profile-actions">
                    <button className="action-button">
                        <Brush size={16} /> Change Appearance
                    </button>
                    <button className="action-button">
                        <Settings size={16} /> Profile Settings
                    </button>
                </div>
            </div>

            <div className="profile-content">
                {/* Left column */}
                <div className="profile-left-column">
                    {/* Profile avatar */}
                    <div className="profile-avatar-container">
                        <img src="/placeholder.svg?height=200&width=200" alt="Profile Avatar" className="profile-avatar" />
                    </div>

                    {/* Social stats - replaced 8+ with friend actions and removed gift icon */}
                    <div className="social-stats">
                        <div className="stat-item">
                            <UserPlus size={24} className="friend-action-icon" />
                            <span className="stat-label">Add Friend</span>
                        </div>
                        <div className="stat-item">
                            <UserMinus size={24} className="friend-action-icon" />
                            <span className="stat-label">Remove Friend</span>
                        </div>
                        <div className="stat-item">
                            <MessageCircle size={24} />
                            <span className="stat-label">Message</span>
                        </div>
                    </div>

                    {/* User info */}
                    <div className="user-info">
                        <div className="info-row">
                            <span className="info-label">Last Online</span>
                            <span className="info-value">{user.lastOnline}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Created</span>
                            <span className="info-value">{user.joinDate}</span>
                        </div>
                    </div>

                    {/* User lists */}
                    <div className="user-lists">
                        <div className="list-row">
                            <span className="list-label">Lists</span>
                            <span className="list-value">{lists.lists}</span>
                        </div>
                        <div className="list-row">
                            <span className="list-label">Reviews</span>
                            <span className="list-value">{lists.reviews}</span>
                        </div>
                        <div className="list-row">
                            <span className="list-label">Communities</span>
                            <span className="list-value">{lists.communities}</span>
                        </div>
                        <div className="list-row">
                            <span className="list-label">Recommendations</span>
                            <span className="list-value">{lists.recommendations}</span>
                        </div>
                    </div>

                    {/* Friends section */}
                    <div className="friends-section">
                        <div className="friends-header">
                            <h3>Friends</h3>
                            <span className="friends-count">{friends.length}</span>
                            <div className="friends-tabs">
                                <button
                                    className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                                    onClick={() => setActiveTab("all")}
                                >
                                    All ({friends.length})
                                </button>
                            </div>
                        </div>

                        <div className="friends-grid">
                            {friends.map((friend) => (
                                <div key={friend.id} className="friend-item">
                                    <img src={friend.avatar || "/placeholder.svg"} alt={friend.name} className="friend-avatar" />
                                    <span className="friend-name">{friend.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="profile-right-column">
                    {/* Statistics section */}
                    <div className="statistics-section">
                        <h2>Statistics</h2>

                        <div className="movie-stats">
                            <h3>
                                <span className="stats-icon">📊</span> Movie Stats
                            </h3>

                            <div className="progress-bar">
                                <div
                                    className="progress-segment watching"
                                    style={{ width: `${(stats.watching / stats.totalFilms) * 100}%` }}
                                ></div>
                                <div
                                    className="progress-segment completed"
                                    style={{ width: `${(stats.completed / stats.totalFilms) * 100}%` }}
                                ></div>
                                <div
                                    className="progress-segment on-hold"
                                    style={{ width: `${(stats.onHold / stats.totalFilms) * 100}%` }}
                                ></div>
                                <div
                                    className="progress-segment dropped"
                                    style={{ width: `${(stats.dropped / stats.totalFilms) * 100}%` }}
                                ></div>
                            </div>

                            <div className="stats-list">
                                <div className="stat-row">
                                    <span className="stat-dot watching-dot"></span>
                                    <span className="stat-name">Watching</span>
                                    <span className="stat-count">{stats.watching}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-dot completed-dot"></span>
                                    <span className="stat-name">Completed</span>
                                    <span className="stat-count">{stats.completed}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-dot on-hold-dot"></span>
                                    <span className="stat-name">On-Hold</span>
                                    <span className="stat-count">{stats.onHold}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-dot dropped-dot"></span>
                                    <span className="stat-name">Dropped</span>
                                    <span className="stat-count">{stats.dropped}</span>
                                </div>
                                <div className="stat-row total">
                                    <span className="stat-name">Total Films</span>
                                    <span className="stat-count">{stats.totalFilms}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile updates section */}
                    <div className="profile-updates">
                        <h2>Profile Updates</h2>

                        <div className="updates-list">
                            {activity.map((movie) => (
                                <div key={movie.id} className="update-item">
                                    <div className="update-poster">
                                        <img src={movie.poster || "/placeholder.svg"} alt={movie.title} />
                                    </div>
                                    <div className="update-details">
                                        <div className="update-header">
                                            <h4>{movie.title}</h4>
                                            <span className="update-year">{movie.year}</span>
                                            <span className="update-genre">{movie.genre}</span>
                                            <span className="update-rating">★★★★☆</span>
                                        </div>
                                        <p className="update-description">
                                            {movie.status === "Completed" && "Finished watching this film and added it to completed list."}
                                            {movie.status === "Watching" && "Started watching this film."}
                                            {movie.status === "Dropped" && "Stopped watching this film and marked as dropped."}
                                        </p>
                                        <div className="update-status">
                                            <span className={`status-badge ${movie.status.toLowerCase()}`}>{movie.status}</span>
                                        </div>
                                        <div className="update-time">
                                            <Clock size={12} />
                                            <span>{movie.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
