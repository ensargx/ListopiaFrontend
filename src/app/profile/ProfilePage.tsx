"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "./style/ProfilePage.css"
import { Settings, Brush } from "lucide-react"
import { useParams } from "react-router-dom"
import { fetchWatchedMoviesByUser, fetchWatchlistMoviesByUser } from "@/api/movieapi"
import { fetchFriendsByUUID, fetchUserByUsername, fetchLikedMovies } from "@/api/userapi"
import type { User } from "@/types/user"
import type { Movie } from "@/types/movie"
import { useAuth } from "@/app/auth/hooks/AuthContext"

// Import components
import ProfileLeftColumn from "./components/ProfileLeftColumn"
import ProfileStatistics from "./components/ProfileStatistics"
import LikedMovies from "./components/ProfileLikedMovies"
import ProfileUpdates from "./components/ProfileUpdates"

// Mock data for parts not replaced yet
const mockStats = {
    watched: 3,
    wantToWatch: 2,
    liked: 6,
    totalFilms: 11,
}

const mockLists = {
    lists: 2,
    reviews: 3,
}

// Mock data for profile updates
const mockProfileUpdates = [
    {
        id: 1,
        type: "Watched",
        movie: {
            id: 101,
            title: "The Shawshank Redemption",
            releaseDate: "1994-09-23",
            posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            overview:
                "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 2,
        type: "Watched",
        movie: {
            id: 102,
            title: "The Lord of the Rings",
            releaseDate: "2001-12-19",
            posterPath: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            overview:
                "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 3,
        type: "Want to Watch",
        movie: {
            id: 103,
            title: "Forrest Gump",
            releaseDate: "1994-07-06",
            posterPath: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            overview:
                "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 4,
        type: "Watched",
        movie: {
            id: 104,
            title: "Interstellar",
            releaseDate: "2014-11-05",
            posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            overview:
                "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        },
        updatedAt: 174574515714,
    },
    {
        id: 5,
        type: "Liked",
        movie: {
            id: 105,
            title: "Pulp Fiction",
            releaseDate: "1994-10-14",
            posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            overview:
                "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
        },
        updatedAt: 174574515714,
    },
]

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"requests" | "friends">("requests")
    const { username } = useParams<{ username: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [friends, setFriends] = useState<User[]>([])
    const [likedMovies, setLikedMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)
    const [likedMoviesLoading, setLikedMoviesLoading] = useState(true)
    const [likedMoviesError, setLikedMoviesError] = useState<string | null>(null)

    // Single useAuth call
    const { user: userMe, sendingRequests, receivedRequests } = useAuth()

    const isOwn = userMe?.username === username
    const [isFriend, setIsFriend] = useState(false)

    document.title = `${username} - Listopia`

    // Using mock data
    const stats = mockStats
    const lists = mockLists
    const profileUpdates = mockProfileUpdates

    useEffect(() => {
        if (!username) {
            setLoading(false)
            return
        }

        setLoading(true)
        setLikedMoviesLoading(true)
        setLikedMoviesError(null)
        setUser(null)
        setFriends([])
        setLikedMovies([])

        fetchUserByUsername(username)
            .then((userData) => {
                setUser(userData)

                fetchFriendsByUUID(userData.uuid)
                    .then((retFriends) => {
                        setFriends(retFriends.content)
                        setIsFriend(retFriends.content.some((f) => f.uuid === userMe?.uuid))
                    })
                    .catch((err) => console.error("Error fetching friends:", err))

                fetchLikedMovies(userData.uuid)
                    .then((liked) => setLikedMovies(liked.content))
                    .catch((err: Error) => {
                        console.error("Error fetching liked movies:", err)
                        setLikedMoviesError(err.message || "Failed to load liked movies.")
                    })
                    .finally(() => setLikedMoviesLoading(false))

                fetchWatchedMoviesByUser(userData.uuid).catch((err) => console.error("Error fetching watched movies:", err))

                fetchWatchlistMoviesByUser(userData.uuid).catch((err) => console.error("Error fetching watchlist movies:", err))

                setLoading(false)
            })
            .catch((err: Error) => {
                console.error("Error fetching user profile:", err)
                setUser(null)
                setLoading(false)
                setLikedMoviesLoading(false)
            })
    }, [username, userMe])

    if (loading) {
        return (
            <div className="profile-page-loading">
                <h1>Loading profile...</h1>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="profile-page-error">
                <h1>User '{username}' not found.</h1>
            </div>
        )
    }

    return (
        <div className="profile-page">
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
                <ProfileLeftColumn
                    user={user}
                    friends={friends}
                    sentRequests={sendingRequests}
                    receivedRequests={receivedRequests}
                    isOwn={isOwn}
                    isFriend={isFriend}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    lists={lists}
                />

                <div className="profile-right-column">
                    <ProfileStatistics stats={stats} userUuid={user.uuid} />

                    <LikedMovies
                        likedMovies={likedMovies}
                        likedMoviesLoading={likedMoviesLoading}
                        likedMoviesError={likedMoviesError}
                    />

                    <ProfileUpdates profileUpdates={profileUpdates} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
