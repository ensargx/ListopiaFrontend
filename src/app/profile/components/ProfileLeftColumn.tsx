"use client"

import type React from "react"
import { MessageCircle, UserPlus, UserMinus } from "lucide-react"
import { Link } from "react-router-dom"
import { formatTimeAgo } from "@/lib/utils"
import { CardSlider } from "@/app/home/components/CardSlider"
import { userProfilePath } from "@/app/home/util/slug"
import type { User } from "@/types/user"

interface ProfileLeftColumnProps {
    user: User
    friends: User[]
    isOwn: boolean
    isFriend: boolean
    activeTab: "all" | "friends"
    setActiveTab: (tab: "all" | "friends") => void
    lists: {
        lists: number
        reviews: number
        communities: number
        recommendations: number
    }
}

const ProfileLeftColumn: React.FC<ProfileLeftColumnProps> = ({
                                                                 user,
                                                                 friends,
                                                                 isOwn,
                                                                 isFriend,
                                                                 activeTab,
                                                                 setActiveTab,
                                                                 lists,
                                                             }) => {
    return (
        <div className="profile-left-column">
            {/* Avatar */}
            <div className="profile-avatar-container">
                <img
                    src={user.profilePicture || "/placeholder.svg?height=200&width=200"}
                    alt={`${user.username}'s Avatar`}
                    className="profile-avatar"
                />
            </div>

            {/* Social Actions */}
            {!isOwn ? (
                <div className="social-stats">
                    {!isFriend ? (
                        <div className="stat-item">
                            <UserPlus size={24} className="friend-action-icon" />
                            <span className="stat-label">Add Friend</span>
                        </div>
                    ) : (
                        <>
                            <div className="stat-item">
                                <UserMinus size={24} className="friend-action-icon" />
                                <span className="stat-label">Remove Friend</span>
                            </div>
                            <div className="stat-item">
                                <MessageCircle size={24} />
                                <span className="stat-label">Message</span>
                            </div>
                        </>
                    )}
                </div>
            ) : null}

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

            {/* User Lists */}
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

                    {/* Tabs - Currently only 'All' is functional */}
                    <div className="friends-tabs">
                        <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
                            All ({friends.length})
                        </button>
                        {/* Add other tabs like 'Online' if needed later */}
                    </div>
                </div>

                <div className="friends-grid">
                    {friends.length === 0 && <p>No friends yet.</p>}
                    {friends.length > 0 && (
                        <CardSlider
                            items={friends}
                            className=""
                            renderItem={(friend) => (
                                <Link to={userProfilePath(friend)} className="">
                                    <div key={friend.uuid} className="friend-item">
                                        <img
                                            src={friend.profilePicture || "/placeholder.svg?height=50&width=50"}
                                            alt={friend.username}
                                            className=""
                                        />
                                        <span className="friend-name">
                      {friend.firstName ? `${friend.firstName} ${friend.lastName}` : friend.username}
                    </span>
                                    </div>
                                </Link>
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileLeftColumn
