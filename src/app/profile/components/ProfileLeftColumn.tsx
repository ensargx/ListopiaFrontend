"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, UserPlus, UserMinus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "@/lib/utils";
import { CardSlider } from "@/app/home/components/CardSlider";
import { userProfilePath } from "@/app/home/util/slug";
import type { User } from "@/types/user";
import {
    acceptFriendRequest,
    addFriendRequest,
    rejectFriendRequest,
    removeFriend,
} from "@/api/userapi";

interface ProfileLeftColumnProps {
    user: User;
    friends: User[];
    sentRequests: User[];
    receivedRequests: User[];
    isOwn: boolean;
    isFriend: boolean;
    activeTab: "all" | "friends";
    setActiveTab: (tab: "all" | "friends") => void;
    lists: {
        lists: number;
        reviews: number;
        communities: number;
        recommendations: number;
    };
}

const ProfileLeftColumn: React.FC<ProfileLeftColumnProps> = ({
                                                                 user,
                                                                 friends,
                                                                 sentRequests,
                                                                 receivedRequests,
                                                                 isOwn,
                                                                 isFriend,
                                                                 activeTab,
                                                                 setActiveTab,
                                                                 lists,
                                                             }) => {
    // local state for optimistic updates
    const [localSent, setLocalSent] = useState<User[]>(sentRequests);
    const [localReceived, setLocalReceived] = useState<User[]>(receivedRequests);
    const [isRequestSent, setIsRequestSent] = useState<boolean>(
        sentRequests.some((u) => u.uuid === user.uuid)
    );
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        setIsRequestSent(sentRequests.some((u) => u.uuid === user.uuid));
    }, [sentRequests, user.uuid]);

    useEffect(() => {
        setLocalSent(sentRequests);
    }, [sentRequests]);

    useEffect(() => {
        setLocalReceived(receivedRequests);
    }, [receivedRequests]);

    // send friend request
    const handleAddFriend = async () => {
        setIsProcessing(true);
        try {
            await addFriendRequest(user.uuid);
            setIsRequestSent(true);
        } catch {
            alert("Could not send friend request.");
        } finally {
            setIsProcessing(false);
        }
    };

    // remove existing friend
    const handleRemoveFriend = async () => {
        if (!confirm("Are you sure you want to remove this friend?")) return;
        try {
            await removeFriend(user.uuid);
            setIsRequestSent(false);
        } catch {
            alert("Could not remove friend.");
        }
    };

    // cancel a sent friend request
    const handleCancel = async (uuid: string) => {
        try {
            await rejectFriendRequest(uuid);
            setLocalSent((s) => s.filter((u) => u.uuid !== uuid));
        } catch {
            alert("Could not cancel request.");
        }
    };

    // accept an incoming friend request
    const handleAccept = async (uuid: string) => {
        try {
            await acceptFriendRequest(uuid);
            setLocalReceived((r) => r.filter((u) => u.uuid !== uuid));
        } catch {
            alert("Could not accept request.");
        }
    };

    // decline an incoming friend request
    const handleDecline = async (uuid: string) => {
        try {
            await rejectFriendRequest(uuid);
            setLocalReceived((r) => r.filter((u) => u.uuid !== uuid));
        } catch {
            alert("Could not decline request.");
        }
    };

    return (
        <div className="profile-left-column">
            {/* Avatar + primary actions */}
            <div className="profile-avatar-container">
                <img
                    src={user.profilePicture || "/placeholder.svg?height=200&width=200"}
                    alt={`${user.username}'s avatar`}
                    className="profile-avatar"
                />
                {!isOwn && (
                    <div className="social-stats">
                        {!isFriend ? (
                            <button
                                className="stat-item"
                                onClick={handleAddFriend}
                                disabled={isProcessing || isRequestSent}
                            >
                                {isProcessing ? (
                                    <Clock size={24} className="animate-spin" />
                                ) : isRequestSent ? (
                                    <Clock size={24} />
                                ) : (
                                    <UserPlus size={24} />
                                )}
                                <span className="stat-label">
                  {isProcessing
                      ? "Sending..."
                      : isRequestSent
                          ? "Pending"
                          : "Add Friend"}
                </span>
                            </button>
                        ) : (
                            <>
                                <button className="stat-item" onClick={handleRemoveFriend}>
                                    <UserMinus size={24} />
                                    <span className="stat-label">Remove Friend</span>
                                </button>
                                <Link to={userProfilePath(user)} className="stat-item">
                                    <MessageCircle size={24} />
                                    <span className="stat-label">Message</span>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Last online / joined */}
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

            {/* About */}
            <div className="about-section">
                <h3>About</h3>
                <p>{user.biography || "Hello, I am using Listopia."}</p>
            </div>

            {/* Stats */}
            <div className="user-lists">
                {Object.entries(lists).map(([label, val]) => (
                    <div key={label} className="list-row">
            <span className="list-label">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </span>
                        <span className="list-value">{val}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="friends-tabs">
                <button
                    className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                >
                    All
                </button>
                <button
                    className={`tab-button ${activeTab === "friends" ? "active" : ""}`}
                    onClick={() => setActiveTab("friends")}
                >
                    Friends ({friends.length})
                </button>
            </div>

            {/* Tab content */}
            {activeTab === "all" && isOwn && (
                <>
                    <section className="received-requests">
                        <h3>Received Requests</h3>
                        {localReceived.length > 0 ? (
                            <ul>
                                {localReceived.map((u) => (
                                    <li key={u.uuid} className="flex items-center">
                                        <img
                                            src={u.profilePicture || "/placeholder.svg"}
                                            alt={u.username}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <Link to={userProfilePath(u)}>
                                            {u.firstName || u.username}
                                        </Link>
                                        <button
                                            onClick={() => handleAccept(u.uuid)}
                                            className="ml-auto btn btn-sm"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDecline(u.uuid)}
                                            className="ml-2 btn btn-sm btn-danger"
                                        >
                                            Decline
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No incoming requests.</p>
                        )}
                    </section>
                    <section className="sent-requests">
                        <h3>Sent Requests</h3>
                        {localSent.length > 0 ? (
                            <ul>
                                {localSent.map((u) => (
                                    <li key={u.uuid} className="flex items-center">
                                        <img
                                            src={u.profilePicture || "/placeholder.svg"}
                                            alt={u.username}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <Link to={userProfilePath(u)}>
                                            {u.firstName || u.username}
                                        </Link>
                                        <button
                                            onClick={() => handleCancel(u.uuid)}
                                            className="ml-auto btn btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No sent requests.</p>
                        )}
                    </section>
                </>
            )}

            {activeTab === "friends" && (
                <div className="friends-section">
                    {friends.length > 0 ? (
                        <CardSlider
                            items={friends}
                            renderItem={(f) => (
                                <Link to={userProfilePath(f)} key={f.uuid} className="friend-item">
                                    <img
                                        src={f.profilePicture || "/placeholder.svg?height=50&width=50"}
                                        alt={f.username}
                                    />
                                    <span className="friend-name">
                    {f.firstName ? `${f.firstName} ${f.lastName}` : f.username}
                  </span>
                                </Link>
                            )}
                        />
                    ) : (
                        <p>No friends yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileLeftColumn;
