    import React, { useState, useRef, useEffect } from 'react';
    import { Send } from 'lucide-react';
    import type { UserMessage } from "../../types/user/usermessage";
    import './style/Chat.css';
    import type { User } from "@/types/user";
    import { SearchBar } from "@/app/genre/components/SearchBar";
    import {getMessagesSent, sendMessageToUser} from "@/api/user/usermessage";
    import {useAuth} from "@/app/auth/hooks/AuthContext";
    import {Navigate, useNavigate} from "react-router-dom";

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
        const [messages, setMessages] = useState<UserMessage[]>([]);
        const inputRef = useRef<HTMLInputElement>(null);
        const messagesEndRef = useRef<HTMLDivElement>(null);
        const {user, friends} = useAuth();

        document.title = `Chat - Listopia`;

        // Scroll to bottom on new message
        useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [messages]);

        useEffect(() => {
            getMessagesSent().then((res)=>{
                setMessages(res.content);
                console.log("REPSPONSE GELDİ AMCIK: ", res);
            })
        }, []);
        if(!user){
            console.log("REPSPONSE GELDİ AMCIK: ", user);
            return <Navigate to="/" replace />;
        }

        // Open chat with selected friend
        const openChat = (friend: User) => {
            setSelectedFriend(friend);
            const convo = messages.filter(
                m =>
                    (m.from.uuid === user.uuid && m.recipient.uuid === friend.uuid) ||
                    (m.from.uuid === friend.uuid && m.recipient.uuid === user.uuid)
            );
            setMessages(convo);
        };

        // Handle sending a new message
        const handleSend = async () => {
            const text = inputRef.current?.value.trim();
            if (!text || !selectedFriend) return;
            sendMessageToUser(text, selectedFriend.uuid).then((sent: UserMessage)=>{
                setMessages(prev => [...prev, sent]);
            });
            if (inputRef.current) inputRef.current.value = '';
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
                                        className={`message-item ${msg.from.uuid === user.uuid ? 'me' : 'them'}`}
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
                                <button onClick={handleSend}>
                                    <Send size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            Bir arkadaş seçin ve sohbete başlayın.
                        </div>
                    )}
                </section>

                {/* User info panel */}
                {selectedFriend && <UserInfo user={selectedFriend} />}
            </div>
        );
    };

    export default Chat;
