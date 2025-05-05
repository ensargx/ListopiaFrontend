import { getMessagesWithUser, sendMessageToUser } from "@/api/user/usermessage";
import { User } from "@/types/user";
import { UserMessage } from "@/types/user/usermessage";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatSingleProps {
    user: User
    friend: User
}

interface Message {
    message: UserMessage;
    isServer: boolean; // TODO: Bu mesaj server mesajı oldu mu ona göre render edilecek cssi değişecek
}

const ChatSingle: React.FC<ChatSingleProps> = ({ user, friend }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    let addToMessagesSorted = (msgs: UserMessage[]) => {
        setMessages(prevMessages => {
            const newMessages = msgs.map((msg) => ({
                message: msg, // UserMessage
                isServer: true, // Gelen mesajlar server'dan geldiği için true
            }))
            .filter(msg =>
                !prevMessages.some(existingMessage => existingMessage.message.id === msg.message.id)
            );
            // Combine old and new messages
            const allMessages = [...prevMessages, ...newMessages];

            // Sort messages by 'sent' timestamp
            const sortedMessages = allMessages.sort((a, b) => {
                return new Date(a.message.sentAt).getTime() - new Date(b.message.sentAt).getTime();
            });

            return sortedMessages;
        });
    }

    const getMessages = async (pageNumber = 0) => {
        setLoading(true);
        const response = await getMessagesWithUser(friend.uuid, pageNumber);
        if (response.content.length === 0) {
            setHasMore(false);
        } else {
            setMessages(prevMessages => {
                const newMessages = response.content.map((msg) => ({
                    message: msg, // UserMessage
                    isServer: true, // Gelen mesajlar server'dan geldiği için true
                }))
                .filter(msg =>
                    !prevMessages.some(existingMessage => existingMessage.message.id === msg.message.id)
                );
                // Combine old and new messages
                const allMessages = [...prevMessages, ...newMessages];

                // Sort messages by 'sent' timestamp
                const sortedMessages = allMessages.sort((a, b) => {
                    return new Date(a.message.sentAt).getTime() - new Date(b.message.sentAt).getTime();
                });

                return sortedMessages;
            });
        }
            setLoading(false);
    };

    useEffect(() => {
        getMessages();

        // Set up polling to check for new messages every second
        const intervalId = setInterval(() => {
            getMessages();
        }, 1000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);  // Empty dependency array ensures this runs only once on mount

    const handleSend = async () => {
        const text = inputRef.current?.value.trim();
        if (!text || !friend) return;

        if (inputRef.current) inputRef.current.value = ''; // Mesaj kutusunu temizle
        setLoading(true); // Mesaj gönderme sırasında yükleniyor durumunu aktif et
        try {
            let toSent: Message = {
                message: {
                    id: new Date().getSeconds(),
                    from: user,
                    recipient: friend,
                    sentAt: Date.now(),
                    message: text,
                    isRead: false,
                },
                isServer: false,
            };

            setMessages(prev => [...prev, toSent]);
            
            sendMessageToUser(text, friend.uuid).then((msg) => {
                addToMessagesSorted([msg]);
            }).finally(()=>{
                setMessages(prev => 
                    prev.filter((msg) => msg.message.id !== toSent.message.id)
                );
            });
        } catch (error) {
            console.error("Mesaj gönderilemedi:", error);
        } finally {
            setLoading(false);
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
                        key={msg.message.id}
                        className={`message-item ${msg.message.from.uuid === user.uuid ? 'me' : 'them'}`}
                    >
                        <div className="message-text">{msg.message.message}</div>
                        <div className="message-time">
                            {new Date(msg.message.sentAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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
