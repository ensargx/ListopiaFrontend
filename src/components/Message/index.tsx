import React from 'react';
import './style.css';

interface ChatMessage {
    id: string;
    from: 'me' | 'them';
    text: string;
    time: string;
}

const mockChatData: Record<string, ChatMessage[]> = {
    '1': [
        { id: 'm1', from: 'them', text: 'Hey, nasılsın?', time: '10:00 AM' },
        { id: 'm2', from: 'me',   text: 'İyiyim, sen nasılsın?', time: '10:02 AM' },
        { id: 'm3', from: 'them', text: 'Harika, projeyi gözden geçirelim.', time: '10:05 AM' },
    ],
    '2': [
        { id: 'm1', from: 'them', text: 'Toplantı ne zaman?', time: '9:15 AM' },
        { id: 'm2', from: 'me',   text: 'Çarşamba uygun mu?', time: '9:17 AM' },
    ],
    '3': [
        { id: 'm1', from: 'them', text: 'Sunum çok iyiydi!', time: 'Yesterday' },
        { id: 'm2', from: 'me',   text: 'Çok teşekkürler!', time: 'Yesterday' },
    ],
};

interface Props {
    chatId: string;
}

const ChatPanel: React.FC<Props> = ({ chatId }) => {
    const chat = mockChatData[chatId] || [];

    return (
        <div className="chat-panel">
            <div className="chat-panel-header">Sohbet #{chatId}</div>
            <div className="chat-panel-messages">
                {chat.map(msg => (
                    <div key={msg.id} className={`chat-message ${msg.from}`}>
                        <p className="chat-text">{msg.text}</p>
                        <span className="chat-time">{msg.time}</span>
                    </div>
                ))}
            </div>
            <div className="chat-panel-input">
                <input type="text" placeholder="Type..." disabled />
                <button disabled>Send</button>
            </div>
        </div>
    );
};

export default ChatPanel;
