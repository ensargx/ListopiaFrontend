import { getMessagesSentToUser, getMessagesWithUser, sendMessageToUser } from "@/api/user/usermessage";
import { User } from "@/types/user";
import { UserMessage } from "@/types/user/usermessage";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatSingleProps {
    user: User
    friend: User
}

const ChatSingle: React.FC<ChatSingleProps> = ({ user, friend }) => {
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getMessages = async (pageNumber = 0) => {
        setLoading(true);
        const response = await getMessagesWithUser(friend.uuid, pageNumber);
        if (response.content.length === 0) {
            setHasMore(false);
        } else {
            setMessages(prevMessages => {
                const newMessages = response.content.filter(msg => 
                    !prevMessages.some(existingMessage => existingMessage.id === msg.id)
                );
                // Eski mesajlarla yeni gelen mesajları birleştirerek setliyoruz
                return [...prevMessages, ...newMessages];
            });
        }
            setLoading(false);
    };

    useEffect(() => {
        getMessages();
    }, []);

    const handleSend = async () => {
        const text = inputRef.current?.value.trim();
        if (!text || !friend) return;

        if (inputRef.current) inputRef.current.value = ''; // Mesaj kutusunu temizle
        setLoading(true); // Mesaj gönderme sırasında yükleniyor durumunu aktif et
        try {
            const sent: UserMessage = await sendMessageToUser(text, friend.uuid);
            setMessages(prev => [...prev, sent]);
        } catch (error) {
            console.error("Mesaj gönderilemedi:", error);
            // Kullanıcıya bir hata mesajı gösterebilirsiniz
        } finally {
            setLoading(false); // Yükleme durumu sonlandırılıyor
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <section className="main chat-panel">
            <div className="chat-header">
                <img
                    className="avatar"
                    src={friend.profilePicture}
                    alt={`${friend.firstName} ${friend.lastName}`}
                />
                <div>
                    <span className="name">{friend.firstName} {friend.lastName}</span>
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
        </section>
    )
}
export default ChatSingle;
