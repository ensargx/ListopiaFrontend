import React, { useState, useRef, useEffect } from 'react';
import type { UserMessage } from "../../types/user/usermessage";
import './style/Chat.css';
import type { User } from "@/types/user";
import { SearchBar } from "@/app/genre/components/SearchBar";
import {getMessagesSent, sendMessageToUser} from "@/api/user/usermessage";
import {Navigate} from "react-router-dom";
import {fetchFriendsByUUID, fetchUserMe} from "@/api/userapi";
import ChatSingle from './components/ChatSingle';

// Mock users

// FriendContainer component
type FriendContainerProps = {
    friend: User;
    isSelected: boolean;
    onClick: (friend: User) => void;
};

type Message ={
    message: UserMessage;
    isServer: boolean; // TODO: Bu mesaj server mesajı oldu mu ona göre render edilecek cssi değişecek
}

const FriendContainer: React.FC<FriendContainerProps> = ({ friend, isSelected, onClick }) => (
    <div
        className={`friend-container ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(friend)}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: isSelected ? '#3a3f47' : '#2f3136',
            borderRadius: '8px',
            marginBottom: '4px',
        }}
    >
        <img
            className="avatar"
            src={friend.profilePicture}
            alt={`${friend.firstName} ${friend.lastName}`}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
        {friend.firstName} {friend.lastName}
        </span>
            <span style={{ fontSize: '0.75rem', color: '#4caf50', marginTop: '2px' }}>
        Online
        </span>
        </div>
    </div>
);

// UserInfo component
const UserInfo: React.FC<{ user: User }> = ({ user }) => (
    <aside className="top-right" style={{ padding: '16px', backgroundColor: '#2f3136', borderLeft: '1px solid #202225' }}>
        <img
            className="avatar"
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '12px' }}
        />
        <div>
        <span style={{ fontWeight: 'bold', display: 'block' }}>
        {user.firstName} {user.lastName}
        </span>
            <span style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>
        @{user.username}
        </span>
            {user.biography && (
                <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                    {user.biography}
                </p>
            )}
            <span style={{ fontSize: '0.8rem', marginBottom: '4px', display: 'block' }}>
        Role: {user.role}
        </span>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>
        Son Görülme: {new Date(user.lastOnline).toLocaleString([], {
                hour: '2-digit', minute: '2-digit',
                day: '2-digit', month: '2-digit', year: 'numeric'
            })}
        </span>
        </div>
    </aside>
);

// Main Chat component
const Chat: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [user, setUser] = useState<User|null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [isLoading, setLoading] = useState(true);

    document.title = `Chat - Listopia`;

    useEffect(() => {
        if(!user){return}
        fetchFriendsByUUID(user.uuid).then((res)=>{
            setFriends(res.content);
        })
    }, [user]);

    useEffect(() => {
        fetchUserMe().then(setUser).finally(()=>{
            setLoading(false);
        })
    }, []);

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/" replace />;
    }

    // Open chat with selected friend
    const openChat = (friend: User) => {
        if (friend == selectedFriend) return; 
        setSelectedFriend(friend);
    };

    // Filter friends by search term
    const filteredFriends = friends
        .filter(u => u.uuid !== user.uuid)
        .filter(u =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="chat-page">
            {/* Search bar */}
            <div className="top-left">
                <SearchBar
                    value={searchTerm}
                    onChange={(v: string) => setSearchTerm(v)}
                    placeholder="Search friends..."
                />
            </div>

            {/* Friends list */}
            <section className="main-left">
                <div className="friends-header">
                    <h2>Friends</h2>
                </div>
                <div className="friends-list">
                    {filteredFriends.map(friend => (
                        <FriendContainer
                            key={friend.uuid}
                            friend={friend}
                            isSelected={selectedFriend?.uuid === friend.uuid}
                            onClick={openChat}
                        />
                    ))}
                </div>
            </section>

            {selectedFriend ? (
                <ChatSingle key={selectedFriend.uuid} user={user} friend={selectedFriend} />
                ) : (
                    <div className="empty-state">
                        Bir arkadaş seçin ve sohbete başlayın.
                    </div>
                )
            }

            {/* User info panel */}
            {selectedFriend && <UserInfo user={selectedFriend} />}
        </div>
    );
};

export default Chat;
