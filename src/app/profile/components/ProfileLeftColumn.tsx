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

    // Sync props → local state
    useEffect(() => {
        setLocalSent(sentRequests);
        setLocalReceived(receivedRequests);
    }, [sentRequests, receivedRequests]);

    const hasSentRequest = localSent.some((u) => u.uuid === user.uuid);
    const hasReceivedRequest = localReceived.length > 0;

    const handleAddFriend = async () => {
        setIsProcessing(true);
        try {
            await addFriendRequest(user.uuid);
            setLocalSent((prev) => [...prev, user]);
        } catch {
            alert("Arkadaş isteği gönderilemedi.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = async (uuid: string) => {
        setIsProcessing(true);
        try {
            await cancelFriendRequest(uuid);
            setLocalSent((prev) => prev.filter((u) => u.uuid !== uuid));
        } catch {
            alert("İstek iptali başarısız.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRemoveFriend = async () => {
        if (!confirm("Bu arkadaşlığı kaldırmak istediğinize emin misiniz?")) return;
        setIsProcessing(true);
        try {
            await removeFriendRequest(user.uuid);
            // Eğer arkadaş listesinde yerel güncelleme istiyorsanız, burada yapabilirsiniz.
        } catch {
            alert("Arkadaş kaldırma işlemi başarısız.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAccept = async (uuid: string) => {
        setIsProcessing(true);
        try {
            await acceptFriendRequest(uuid);
            setLocalReceived((prev) => prev.filter((u) => u.uuid !== uuid));
        } catch {
            alert("İstek kabul edilemedi.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDecline = async (uuid: string) => {
        setIsProcessing(true);
        try {
            await rejectFriendRequest(uuid);
            setLocalReceived((prev) => prev.filter((u) => u.uuid !== uuid));
        } catch {
            alert("İstek reddedilemedi.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="profile-left-column">
            {/* Avatar */}
            <div className="profile-avatar-container mb-4">
                <img
                    src={user.profilePicture || "/placeholder.svg?height=200&width=200"}
                    alt={`${user.username}'s avatar`}
                    className="profile-avatar"
                />
            </div>

            {/* Friend/Add buttons */}
            {!isOwn && (
                <div className="social-stats flex space-x-2 mb-4">
                    {!isFriend ? (
                        <button
                            className="stat-item flex items-center"
                            onClick={
                                hasSentRequest
                                    ? () => handleCancel(user.uuid)
                                    : handleAddFriend
                            }
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <Clock size={24} className="animate-spin" />
                            ) : hasSentRequest ? (
                                <Clock size={24} />
                            ) : (
                                <UserPlus size={24} />
                            )}
                            <span className="stat-label ml-1">
                {isProcessing
                    ? hasSentRequest
                        ? "Cancelling..."
                        : "Sending..."
                    : hasSentRequest
                        ? "Pending"
                        : "Add Friend"}
              </span>
                        </button>
                    ) : (
                        <>
                            <button
                                className="stat-item flex items-center"
                                onClick={handleRemoveFriend}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <Clock size={24} className="animate-spin" />
                                ) : (
                                    <UserMinus size={24} />
                                )}
                                <span className="stat-label ml-1">
                  {isProcessing ? "Removing..." : "Remove Friend"}
                </span>
                            </button>

                            <Link
                                to={userProfilePath(user)}
                                className="stat-item flex items-center"
                            >
                                <MessageCircle size={24} />
                                <span className="stat-label ml-1">Message</span>
                            </Link>
                        </>
                    )}
                </div>
            )}

            {/* Incoming requests (if it's your own profile) */}
            {!isOwn && !isFriend && hasReceivedRequest && (
                <section className="received-requests mb-4">
                    <ul>
                        {localReceived.map((u) => (
                            <li key={u.uuid} className="flex items-center mb-2">
                                <button
                                    onClick={() => handleAccept(u.uuid)}
                                    className="ml-auto btn btn-sm"
                                    disabled={isProcessing}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(u.uuid)}
                                    className="ml-2 btn btn-sm btn-danger"
                                    disabled={isProcessing}
                                >
                                    Decline
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* User info */}
            <div className="user-info mb-4">
                <div className="info-row flex justify-between">
                    <span className="info-label">Last Seen</span>
                    <span className="info-value">
            {formatTimeAgo(user.lastOnline)}
          </span>
                </div>
                <div className="info-row flex justify-between">
                    <span className="info-label">Joined</span>
                    <span className="info-value">
            {formatTimeAgo(user.createdAt)}
          </span>
                </div>
            </div>

            {/* About */}
            <div className="about-section mb-4">
                <h3>About</h3>
                <p>{user.biography || "Hello, I am using Listopia."}</p>
            </div>

            {/* Stats */}


            {/* Tabs */}
            <div className="friends-tabs flex space-x-2 mb-4">
                {isOwn && (
                    <button
                        className={`tab-button ${
                            activeTab === "requests" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("requests")}
                    >
                        Requests
                    </button>
                )}
                <button
                    className={`tab-button ${
                        activeTab === "friends" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("friends")}
                >
                    Friends ({friends.length})
                </button>
            </div>

            {/* Tab contents */}
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
                                            alt={u.username}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <Link to={userProfilePath(u)}>
                                            {u.firstName || u.username}
                                        </Link>
                                        <button
                                            onClick={() => handleAccept(u.uuid)}
                                            className="ml-auto btn btn-sm"
                                            disabled={isProcessing}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDecline(u.uuid)}
                                            className="ml-2 btn btn-sm btn-danger"
                                            disabled={isProcessing}
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
                                            alt={u.username}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <Link to={userProfilePath(u)}>
                                            {u.firstName || u.username}
                                        </Link>
                                        <button
                                            onClick={() => handleCancel(u.uuid)}
                                            className="ml-auto btn btn-sm"
                                            disabled={isProcessing}
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
                <ProfileListFriends
                    friends={friends}
                    friendsLoading={true}
                    friendsError=""
                />
            )}
        </div>
    );
};

export default ProfileLeftColumn;
