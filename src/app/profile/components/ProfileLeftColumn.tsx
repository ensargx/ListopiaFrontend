"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MessageCircle, UserPlus, UserMinus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "@/lib/utils";
import { userProfilePath } from "@/app/home/util/slug";
import type { User } from "@/types/user";
import {
    acceptFriendRequest,
    removeFriendRequest,
    addFriendRequest,
    cancelFriendRequest,
rejectFriendRequest,

} from "@/api/userapi";
import ProfileListFriends from "@/app/profile/components/ProfileFriends";

interface ProfileLeftColumnProps {
    user: User;
    friends: User[];
    sentRequests: User[];
    receivedRequests: User[];
    isOwn: boolean;
    isFriend: boolean;
    activeTab: "requests" | "friends";
    setActiveTab: (tab: "requests" | "friends") => void;
    lists: {
        lists: number;
        reviews: number;
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
    const [listFriendsLoading, setListFriendsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    // true if both sent and received
    const isRequestedBefore = useMemo(() => {
        const sent = sentRequests.some((u) => u.uuid === user.uuid);
        const received = receivedRequests.some((u) => u.uuid === user.uuid);
        return sent && received;
    }, [sentRequests, receivedRequests, user.uuid]);

    // sync props → state
    useEffect(() => {
        setIsRequestSent(sentRequests.some((u) => u.uuid === user.uuid));
    }, [sentRequests, user.uuid]);

    useEffect(() => {
        setLocalSent(sentRequests);
    }, [sentRequests]);

    useEffect(() => {
        setLocalReceived(receivedRequests);
    }, [receivedRequests]);

    // debug
    useEffect(() => {
        console.log("isRequestedBefore:", isRequestedBefore);
    }, [isRequestedBefore]);

    // actions
    const handleAddFriend = async () => {
        setIsProcessing(true);
        try {
            await addFriendRequest(user.uuid);
            setIsRequestSent(true);
        } catch {
            alert("Arkadaş isteği gönderilemedi.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRemoveFriend = async () => {
        if (!confirm("Bu arkadaşlığı kaldırmak istediğinize emin misiniz?")) return;
        try {
            await removeFriendRequest(user.uuid);
            setIsRequestSent(false);
        } catch {
            alert("Arkadaş kaldırma işlemi başarısız.");
        }
    };

    const handleCancel = async (uuid: string) => {
        try {
            await cancelFriendRequest(uuid);
            setLocalSent((s) => s.filter((u) => u.uuid !== uuid));
        } catch {
            alert("İstek iptali başarısız.");
        }
    };

    const handleAccept = async (uuid: string) => {
        try {
            await acceptFriendRequest(uuid);
            setLocalReceived((r) => r.filter((u) => u.uuid !== uuid));
        } catch {
            alert("İstek kabul edilemedi.");
        }
    };

    const handleDecline = async (uuid: string) => {
        try {
            await rejectFriendRequest(uuid);
            setLocalReceived((r) => r.filter((u) => u.uuid !== uuid));
        } catch {
            alert("İstek reddedilemedi.");
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

                {/* Buttons */}
                {!isOwn && (
                    <div className="social-stats">
                        {!isFriend ? (
                            <button
                                className="stat-item"
                                onClick={handleAddFriend}
                                disabled={isProcessing || isRequestSent || isRequestedBefore}
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
                                            : isRequestedBefore
                                                ? "Already Sending"
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

            {/* Gelen istek butonları */}
            {!isOwn && !isFriend && isRequestedBefore && (
                <section className="received-requests">
                    {localReceived.length > 0 ? (
                        <ul>
                            <li key={user.uuid} className="flex items-center">
                                <button
                                    onClick={() => handleAccept(user.uuid)}
                                    className="ml-auto btn btn-sm"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(user.uuid)}
                                    className="ml-2 btn btn-sm btn-danger"
                                >
                                    Decline
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <p>No incoming requests.</p>
                    )}
                </section>
            )}

            {/* Last online / joined */}
            <div className="user-info">
                <div className="info-row">
                    <span className="info-label">Last Seen</span>
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
                <br/>
                <p>{user.biography || "Hello, I am using Listopia."}</p>
            </div>

            {/* Statistics */}
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
                {isOwn && (
                    <button
                        className={`tab-button ${activeTab === "requests" ? "active" : ""}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        Requests
                    </button>
                )}
                <button
                    className={`tab-button ${activeTab === "friends" ? "active" : ""}`}
                    onClick={() => setActiveTab("friends")}
                >
                    Friends ({friends.length})
                </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "requests" && isOwn && (
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
                        <h3>Sending Requests</h3>
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
                <>
                    <ProfileListFriends
                        friends={friends}
                        friendsLoading={listFriendsLoading}
                        friendsError=""
                    />
                </>
            )}
        </div>
    );
};

export default ProfileLeftColumn;
