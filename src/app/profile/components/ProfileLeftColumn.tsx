"use client";

import React, { useEffect, useState } from "react";
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
    const [localSent, setLocalSent] = useState<User[]>(sentRequests);
    const [localReceived, setLocalReceived] = useState<User[]>(receivedRequests);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [listFriendsLoading, setListFriendsLoading] = useState<boolean>(true);
    const [clkToggled, setClkToggled] = useState(false);


    // gönderilen ve gelen istekleri local state ile takip et
    const hasSentRequest = localSent.some((u) => u.uuid === user.uuid);
    const hasReceivedRequest = localReceived.length > 0;

    useEffect(() => {
        setLocalSent(sentRequests);
        setLocalReceived(receivedRequests);
    }, [sentRequests, receivedRequests]);

    const handleAddFriend = async () => {
        setIsProcessing(true);
        try {
            await addFriendRequest(user.uuid);
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
            {/* Avatar ve ana aksiyonlar */}
            <div className="profile-avatar-container">
                <img
                    src={user.profilePicture || "/placeholder.svg?height=200&width=200"}
                    alt={`${user.username}'s avatar`}
                    className="profile-avatar"
                />

            </div>
            {!isOwn && (
                <div className="social-stats flex space-x-2">
                    {!isFriend? (
                        <button
                            className="stat-item flex items-center"
                            onClick={
                                hasSentRequest
                                    ? () => handleCancel(user.uuid)
                                    : handleAddFriend
                            }
                            disabled={isProcessing}
                        >
                            { (isProcessing || hasSentRequest) ? (
                                clkToggled
                                    ? <UserMinus size={24} onClick={() => setClkToggled(false)} />
                                    : <Clock
                                        size={24}
                                        className={isProcessing ? "animate-spin" : ""}
                                        onClick={() => setClkToggled(true)}
                                    />
                            ) : (
                                <UserPlus size={24} />
                            )
                            }
                            <span className="stat-label ml-1">
                                    {isProcessing
                                        ? "Sending..."
                                        : hasSentRequest
                                            ? "Pending"
                                            : "Add Friend"}
                                </span>

                        </button>
                    ) : (
                        <>
                            <button className="stat-item flex items-center" onClick={handleRemoveFriend}>
                                <UserMinus size={24} />
                                <span className="stat-label ml-1">Remove Friend</span>
                            </button>
                            <Link to={userProfilePath(user)} className="stat-item flex items-center">
                                <MessageCircle size={24} />
                                <span className="stat-label ml-1">Message</span>
                            </Link>
                        </>
                    )}
                </div>
            )}

            {/* Gelen istekler (Profil diğerinin) */}
            {!isOwn && !isFriend && hasReceivedRequest && (
                <section className="received-requests my-4">
                    <ul>
                        {localReceived.map((u) => (
                            <li key={u.uuid} className="flex items-center mb-2">
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
                </section>
            )}

            {/* Kullanıcı bilgileri */}
            <div className="user-info mb-4">
                <div className="info-row flex justify-between">
                    <span className="info-label">Last Seen</span>
                    <span className="info-value">{formatTimeAgo(user.lastOnline)}</span>
                </div>
                <div className="info-row flex justify-between">
                    <span className="info-label">Joined</span>
                    <span className="info-value">{formatTimeAgo(user.createdAt)}</span>
                </div>
            </div>

            {/* About */}
            <div className="about-section mb-4">
                <h3>About</h3>
                <p>{user.biography || "Hello, I am using Listopia."}</p>
            </div>

            {/* İstatistikler */}
            <div className="user-lists mb-4">
                {Object.entries(lists).map(([label, val]) => (
                    <div key={label} className="flex justify-between mb-1">
                        <span className="capitalize">{label}</span>
                        <span>{val}</span>
                    </div>
                ))}
            </div>

            {/* Sekmeler */}
            <div className="friends-tabs flex space-x-2 mb-4">
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

            {/* Sekme içerikleri */}
            {activeTab === "requests" && isOwn && (
                <>
                    <section className="received-requests mb-4">
                        <h3>Received Requests</h3>
                        {localReceived.length > 0 ? (
                            <ul>
                                {localReceived.map((u) => (
                                    <li key={u.uuid} className="flex items-center mb-2">
                                        <img
                                            src={u.profilePicture || "/placeholder.svg"}
                                            alt={u.username} className="w-8 h-8 rounded-full mr-2" />
                                        <Link to={userProfilePath(u)}>{u.firstName || u.username}</Link>
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
                                    <li key={u.uuid} className="flex items-center mb-2">
                                        <img
                                            src={u.profilePicture || "/placeholder.svg"}
                                            alt={u.username} className="w-8 h-8 rounded-full mr-2" />
                                        <Link to={userProfilePath(u)}>{u.firstName || u.username}</Link>
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
                <ProfileListFriends friends={friends} friendsLoading={listFriendsLoading} friendsError="" />
            )}
        </div>
    );
};

export default ProfileLeftColumn;