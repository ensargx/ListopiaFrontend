import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import type { UserMessage } from "../../types/user/usermessage";
import './style/Chat.css';
import type { User } from "@/types/user";
import { SearchBar } from "@/app/genre/components/SearchBar";

// Mock veriler
export const mockUsers: User[] = [
    {
        uuid: "1e8d7c8a-1234-5678-a9b0-abcdef123456",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        biography: "Merhaba! Ben John Doe.",
        role: "user",
        lastOnline: 1714608000000,
        createdAt: 1609459200000,
        profilePicture: "/avatars/johndoe.png",
    },
    {
        uuid: "2f9a6b7c-2345-6789-b0c1-fedcba654321",
        username: "janesmith",
        firstName: "Jane",
        lastName: "Smith",
        biography: null,
        role: "admin",
        lastOnline: 1714694400000,
        createdAt: 1612137600000,
        profilePicture: "https://i.pinimg.com/736x/29/00/f4/2900f4b5e90c85147e5df0c6fae1e8fe.jpg",
    },
    {
        uuid: "f90c1876-789f-4031-afc3-723b37834714",
        username: "ensargok",
        firstName: "Ensar",
        lastName: "Gök",
        biography: "Ben ensar!",
        role: "USER",
        lastOnline: 1746218048203,
        createdAt: 174574515714,
        profilePicture: "https://i.pinimg.com/736x/9f/65/58/9f6558e8577b152aea517a09b748567c.jpg"
    }
];

export const mockMessages: UserMessage[] = [
    {
        id: 1,
        from: mockUsers[0],
        recipient: mockUsers[1],
        sentAt: 1799990000000,
        message: "Merhaba Orçun, nasılsın?",
        isRead: true,
    },
    {
        id: 2,
        from: mockUsers[1],
        recipient: mockUsers[0],
        sentAt: 1714683600000,
        message: "İyiyim John, teşekkürler! Ya sen?",
        isRead: true,
    },
    {
        id: 3,
        from: mockUsers[0],
        recipient: mockUsers[1],
        sentAt: 1714687200000,
        message: "Ben de iyiyim. Yarın için planın var mı?",
        isRead: false,
    }
].sort((a, b) => a.sentAt - b.sentAt);

// FriendContainer component
type FriendContainerProps = {
    friend: User;
    isSelected: boolean;
    onClick: (friend: User) => void;
};

const FriendContainer: React.FC<FriendContainerProps> = ({ friend, isSelected, onClick }) => (
    <div
        className={`friend-container ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(friend)}
        style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
    >
        <img
            className="avatar"
            src={friend.profilePicture}
            alt={`${friend.firstName} ${friend.lastName}`}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <div
            className="friend-details"
            style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}
        >
      <span className="name" style={{ fontWeight: 'bold' }}>
        {friend.firstName} {friend.lastName}
      </span>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
        <span
            className="status-indicator online"
            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'green', marginRight: '6px' }}
        />
                <span className="status-text">Online</span>
            </div>
        </div>
    </div>
);

// UserInfo component
const UserInfo: React.FC<{ user: User }> = ({ user }) => (
    <aside className="top-right">
        <img
            className="avatar"
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '12px' }}
        />
        <div className="user-details">
      <span className="name" style={{ fontWeight: 'bold', display: 'block' }}>
        {user.firstName} {user.lastName}
      </span>
            <span className="username" style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>
        @{user.username}
      </span>
            {user.biography && (
                <p className="bio" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                    {user.biography}
                </p>
            )}
            <span className="role" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
        Role: {user.role}
      </span>
            <span className="last-online" style={{ fontSize: '0.8rem', color: '#888' }}>
        Son Görülme: {new Date(user.lastOnline).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}
      </span>
        </div>
    </aside>
);

// Main Chat component
export const Chat: React.FC = () => {
    const currentUser = mockUsers[0];
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    document.title = `Chat - Listopia`;

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Open chat with selected friend
    const openChat = (friend: User) => {
        setSelectedFriend(friend);
        const convo = mockMessages.filter(
            m =>
                (m.from.uuid === currentUser.uuid && m.recipient.uuid === friend.uuid) ||
                (m.from.uuid === friend.uuid && m.recipient.uuid === currentUser.uuid)
        );
        setMessages(convo);
    };

    // Handle sending a new message
    const handleSend = () => {
        const text = inputRef.current?.value.trim();
        if (!text || !selectedFriend) return;
        const newMsg: UserMessage = {
            id: messages.length + 1,
            from: currentUser,
            recipient: selectedFriend,
            sentAt: Date.now(),
            message: text,
            isRead: false
        };
        setMessages(prev => [...prev, newMsg]);
        if (inputRef.current) inputRef.current.value = '';
    };

    // Filter friends by search term
    const filteredFriends = mockUsers
        .filter(u => u.uuid !== currentUser.uuid)
        .filter(u =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="chat-page">
            {/* Top-left search bar */}
            <div className="top-left">
                <SearchBar
                    value={searchTerm}
                    onChange={(value: string) => setSearchTerm(value)}
                    placeholder="Search friends..."
                />
            </div>

            {/* Friends list panel */}
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

            {/* Chat panel */}
            <section className={`main chat-panel ${selectedFriend ? '' : 'empty'}`}>
                {selectedFriend ? (
                    <>
                        <div className="chat-header">
                            <img
                                className="avatar"
                                src={selectedFriend.profilePicture}
                                alt={`${selectedFriend.firstName} ${selectedFriend.lastName}`}
                            />
                            <div>
                                <span className="name">{selectedFriend.firstName} {selectedFriend.lastName}</span>
                            </div>
                        </div>
                        <div className="messages">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`message-item ${msg.from.uuid === currentUser.uuid ? 'me' : 'them'}`}
                                >
                                    <div className="message-text">{msg.message}</div>
                                    <div className="message-time">
                                        {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="message-input">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Message..."
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={handleSend}><Send size={18} /></button>
                        </div>
                    </>
                ) : (
                    <div className="empty-state">
                        Bir arkadaş seçin ve sohbete başlayın.
                    </div>
                )}
            </section>

            {/* User info panel */}
            {selectedFriend?
                <UserInfo user={selectedFriend} />:
                 null
            }

        </div>
    );
};

export default Chat;
