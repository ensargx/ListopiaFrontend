"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "./style/ProfilePage.css"
import { Settings, Brush, MessageCircle, UserPlus, UserMinus, Clock } from "lucide-react"
import { useParams } from "react-router-dom" // Assuming react-router-dom v6+
// Adjust paths as needed for your project structure
import { fetchFriendsByUUID, fetchUserByUsername, fetchLikedMovies } from "@/api/userapi"
import type { User } from "@/types/user"
import type { Movie } from "@/types/movie" // Import Movie and PaginatedResponse types
import { formatTimeAgo } from "@/lib/utils"
import {useAuth} from "@/app/auth/hooks/AuthContext"; // Assuming this utility exists

// Mock data for parts not replaced yet
const mockStats = {
    watching: 1,
    completed: 3,
    onHold: 0,
    dropped: 1,
    totalFilms: 5,
}

const mockLists = {
    lists: 2,
    reviews: 3,
    communities: 1,
    recommendations: 5,
}

// Mock data for profile updates
const mockProfileUpdates = [
    {
        id: 1,
        type: "completed",
        movie: {
            id: 101,
            title: "The Shawshank Redemption",
            releaseDate: "1994-09-23",
            posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            voteAverage: 8.7,
            overview:
                "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 2,
        type: "completed",
        movie: {
            id: 102,
            title: "The Lord of the Rings",
            releaseDate: "2001-12-19",
            posterPath: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            voteAverage: 8.4,
            overview:
                "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 3,
        type: "watching",
        movie: {
            id: 103,
            title: "Forrest Gump",
            releaseDate: "1994-07-06",
            posterPath: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            voteAverage: 8.5,
            overview:
                "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 4,
        type: "completed",
        movie: {
            id: 104,
            title: "Interstellar",
            releaseDate: "2014-11-05",
            posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            voteAverage: 8.4,
            overview:
                "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 5,
        type: "dropped",
        movie: {
            id: 105,
            title: "Pulp Fiction",
            releaseDate: "1994-10-14",
            posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            voteAverage: 8.5,
            overview:
                "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
        },
        updatedAt: 174574515714,
    },
]


const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"all" | "friends">("all") // Kept 'friends' tab option if needed later
    const { username } = useParams<{ username: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [friends, setFriends] = useState<User[]>([])
    const [likedMovies, setLikedMovies] = useState<Movie[]>([]) // State for liked movies
    const [loading, setLoading] = useState(true)
    const [likedMoviesLoading, setLikedMoviesLoading] = useState(true) // Separate loading state for movies
    const [likedMoviesError, setLikedMoviesError] = useState<string | null>(null) // Separate error state for movies
    const auth = useAuth();
    const userMe = auth.user;
    const isOwn = userMe?.username === username;
    const [isFriend, setIsFriend] = useState(false)
    document.title = `${username} - Listopia`
    // const [newFriendUsername, setNewFriendUsername] = useState("") // Keep if needed for add friend functionality

    // Using mock data for stats and lists as they were not part of the request to change
    const stats = mockStats
    const lists = mockLists
    // Using mock data for profile updates
    const profileUpdates = mockProfileUpdates

    useEffect(() => {
        console.log("ProfilePage mounted with username:", username)

        if (!username) {
            console.log("No username provided, exiting early")
            setLoading(false) // Stop loading if no username
            // Consider navigating away: navigator("/");
            return
        }


        // Reset states on username change
        setLoading(true)
        setLikedMoviesLoading(true)
        setLikedMoviesError(null)
        setUser(null)
        setFriends([])
        setLikedMovies([])

        fetchUserByUsername(username)
            .then((userData) => {
                setUser(userData)

                // Fetch friends
                // TODO: Implement pagination for friends if necessary
                fetchFriendsByUUID(userData.uuid)
                    .then((retFriends) => {
                        setFriends(retFriends.content)
                        // userMe’in UUID’si arkadaşlar arasında var mı?
                        const amIInFriends = retFriends.content.some(f => f.uuid === userMe?.uuid)
                        setIsFriend(amIInFriends)
                    })
                    .catch((err) => {
                        console.error("Error fetching friends: ", err.message)
                        // Optionally set a specific error state for friends display
                    })

                // Fetch liked movies
                // Using default pageNumber=0, pageSize=30 from API function definition
                // TODO: Implement pagination for liked movies if needed
                fetchLikedMovies(userData.uuid)
                    .then((likedMoviesData) => {
                        // Assuming PaginatedResponse has a 'content' array of Movie objects
                        setLikedMovies(likedMoviesData.content)
                    })
                    .catch((err: Error) => {
                        console.error("Error fetching liked movies: ", err.message)
                        setLikedMoviesError(err.message || "Failed to load liked movies.")
                    })
                    .finally(() => {
                        setLikedMoviesLoading(false) // Mark liked movies as loaded (or failed)
                    })

                setLoading(false) // Mark main profile data as loaded *after* initiating other fetches
            })
            .catch((err: Error) => {
                console.error("Error fetching user profile: ", err.message)
                // Optionally set a global error state to display: setError(JSON.parse(err.message).message);
                setUser(null) // Ensure user is null on error
                setLoading(false) // Stop main loading on error
                setLikedMoviesLoading(false) // Also stop liked movies loading if user fetch fails
            })
    }, [username, userMe]) // Re-run effect if username changes

    // Display main loading indicator
    if (loading) {
        return (
            <div className="profile-page-loading">
                {" "}
                {/* Optional: Add specific styling */}
                <h1>Loading profile...</h1>
            </div>
        )
    }

    // Display user not found message
    if (!user) {
        return (
            <div className="profile-page-error">
                {" "}
                {/* Optional: Add specific styling */}
                <h1>User '{username}' not found.</h1>
            </div>
        )
    }

    // Render the profile page
    return (
        <div className="profile-page">
            {/* Header */}
            <div className="profile-header">
                <h1>{user.username}'s Profile</h1>
                <div className="profile-actions">
                    {/* TODO: Implement functionality for these buttons */}
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
                    {/* Avatar */}
                    <div className="profile-avatar-container">
                        {/* TODO: Use user.profilePicture if available */}
                        <img
                            src={user.profilePicture || "/placeholder.svg?height=200&width=200"}
                            alt={`${user.username}'s Avatar`}
                            className="profile-avatar"
                        />
                    </div>

                    {/* Social Actions */}
                    {!isOwn?<div className="social-stats">
                            {!isFriend?
                                <div className="stat-item">
                                    <UserPlus size={24} className="friend-action-icon" />
                                    <span className="stat-label">Add Friend</span>
                                </div>:<>
                                    <div className="stat-item">
                                        <UserMinus size={24} className="friend-action-icon" />
                                        <span className="stat-label">Remove Friend</span>
                                    </div>
                                    <div className="stat-item">
                                        <MessageCircle size={24} />
                                        <span className="stat-label">Message</span>
                                    </div>
                                </>
                            }


                    </div>:null}
                    {/* TODO: Implement functionality for these actions */}

                    {/* User Info */}
                    <div className="user-info">
                        <div className="info-row">
                            <span className="info-label">Last Online</span>
                            <span className="info-value">{formatTimeAgo(user.lastOnline)}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Joined</span>
                            <span className="info-value">{formatTimeAgo(user.createdAt)}</span>
                        </div>
                    </div>

                    {/* User Lists (using mockLists) */}
                    {/* TODO: Fetch this data from API if needed */}
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

                    {/* Friends Section */}
                    <div className="friends-section">
                        <div className="friends-header">
                            <h3>Friends</h3>
                            <span className="friends-count">{friends.length}</span>
                            {/* Tabs - Currently only 'All' is functional */}
                            <div className="friends-tabs">
                                <button
                                    className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                                    onClick={() => setActiveTab("all")}
                                >
                                    All ({friends.length})
                                </button>
                                {/* Add other tabs like 'Online' if needed later */}
                            </div>
                        </div>

                        <div className="friends-grid">
                            {friends.length === 0 && <p>No friends yet.</p>}
                            {friends.map((friend) => (
                                <div key={friend.uuid} className="friend-item">
                                    {/* TODO: Use friend.profilePicture if available */}
                                    <img
                                        src={friend.profilePicture || "/placeholder.svg?height=50&width=50"}
                                        alt={friend.username}
                                        className="friend-avatar"
                                    />
                                    {/* Display username or full name based on availability */}
                                    <span className="friend-name">
                    {friend.firstName ? `${friend.firstName} ${friend.lastName}` : friend.username}
                  </span>
                                </div>
                            ))}
                        </div>
                        {/* TODO: Add Friend Input/Button if needed */}
                        {/* <div className="add-friend-section"> ... </div> */}
                    </div>
                </div>{" "}
                {/* End Left Column */}
                {/* Right column */}
                <div className="profile-right-column">
                    {/* Statistics section (using mockStats) */}
                    {/* TODO: Fetch this data from API if needed */}
                    <div className="statistics-section">
                        <h2>Statistics</h2>
                        <div className="movie-stats">
                            <h3>
                                <span className="stats-icon">📊</span> Movie Stats
                            </h3>
                            {/* Progress Bar */}
                            <div className="progress-bar">
                                <div
                                    className="progress-segment watching"
                                    style={{ width: `${(stats.watching / stats.totalFilms) * 100}%` }}
                                    title={`Watching: ${stats.watching}`}
                                ></div>
                                <div
                                    className="progress-segment completed"
                                    style={{ width: `${(stats.completed / stats.totalFilms) * 100}%` }}
                                    title={`Completed: ${stats.completed}`}
                                ></div>
                                <div
                                    className="progress-segment on-hold"
                                    style={{ width: `${(stats.onHold / stats.totalFilms) * 100}%` }}
                                    title={`On Hold: ${stats.onHold}`}
                                ></div>
                                <div
                                    className="progress-segment dropped"
                                    style={{ width: `${(stats.dropped / stats.totalFilms) * 100}%` }}
                                    title={`Dropped: ${stats.dropped}`}
                                ></div>
                            </div>
                            {/* Stats List */}
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
                    </div>{" "}
                    {/* End Statistics section */}
                    {/* Liked Movies section - HORIZONTAL SCROLLING */}
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
                    </div>{" "}
                    {/* End Liked Movies section */}
                    {/* Profile Updates section */}
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
                    </div>{" "}
                    {/* End Profile Updates section */}
                </div>{" "}
                {/* End Right Column */}
            </div>{" "}
            {/* End Profile Content */}
        </div> /* End Profile Page */
    )
}

export default ProfilePage
