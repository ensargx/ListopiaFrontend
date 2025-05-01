import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, MoreVertical, Send } from 'lucide-react';
import type { UserMessage } from "../../types/user/usermessage";
import './style/MessagePage.css';
import type { User } from "@/types/user";

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
        profilePicture: "/avatars/janesmith.jpg",
    }
];

export const mockMessages: UserMessage[] = [
    {
        id: 1,
        from: mockUsers[0],
        recipient: mockUsers[1],
        sentAt: 1714680000000,
        message: "Merhaba Jane, nasılsın?",
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
];

const ChatPage: React.FC = () => {
    const currentUser = mockUsers[0];

    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const openChat = (friend: User) => {
        setSelectedFriend(friend);

        const convo = mockMessages.filter(
            m =>
                (m.from.uuid === currentUser.uuid && m.recipient.uuid === friend.uuid) ||
                (m.from.uuid === friend.uuid && m.recipient.uuid === currentUser.uuid)
        );

        setMessages(convo);
    };

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

    return (
        <div className={`discord-container${selectedFriend ? ' chat-open' : ''}`}>
            <section className="main-panel">
                <div className="friends-header">
                    <h2>Friends</h2>
                </div>
                <div className="friends-list">
                    {mockUsers
                        .filter(u => u.uuid !== currentUser.uuid)
                        .map(friend => (
                            <div
                                key={friend.uuid}
                                className={`friend-item ${selectedFriend?.uuid === friend.uuid ? 'selected' : ''}`}
                                onClick={() => openChat(friend)}
                            >
                                <div className="friend-info">
                                    <img className="avatar" src={friend.profilePicture} alt={`${friend.firstName} ${friend.lastName}`} />
                                    <div className="text-info">
                                        <span className="name">{friend.firstName} {friend.lastName}</span>
                                        <div className="status-info">
                                            <span className="status-indicator online" />
                                            <span className="status-text">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="actions">
                                    <MessageCircle size={18} />
                                    <MoreVertical size={18} />
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {selectedFriend && (
                <section className="chat-panel">
                    <div className="chat-header">
                        <img className="avatar" src={selectedFriend.profilePicture} alt={`${selectedFriend.firstName} ${selectedFriend.lastName}`} />
                        <div>
                            <span className="name">{selectedFriend.firstName} {selectedFriend.lastName}</span>
                            <span className="status-text-small">Online</span>
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
                </section>
            )}
        </div>
    );
};

export default ChatPage;
