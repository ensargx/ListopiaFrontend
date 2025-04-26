import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { useAuth } from '@/app/auth/hooks/AuthContext';

// Message interface representing each chat preview
interface Message {
    id: string;
    senderName: string;
    senderAvatar: string;
    text: string;
    time: string;
}

// Dummy data for demonstration
const dummyMessages: Message[] = [
    { id: '1', senderName: 'Alice Johnson', senderAvatar: 'https://via.placeholder.com/40', text: 'Hey, did you see the latest update?', time: '2h' },
    { id: '2', senderName: 'Bob Smith',    senderAvatar: 'https://via.placeholder.com/40', text: 'Let’s schedule a meeting for next week.', time: '4h' },
    { id: '3', senderName: 'Catherine Lee',senderAvatar: 'https://via.placeholder.com/40', text: 'Great job on the presentation!', time: '1d' }
];

const LinkedInMessagePopup: React.FC = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleButtonClick = () => {
        if (user) setIsOpen(o => !o);
        // else you could alert('Lütfen giriş yapın');
    };

    return (
        <div className="message-popup-container" ref={containerRef}>
            <button
                className="message-popup-button"
                onClick={handleButtonClick}
                disabled={!user}
                aria-label={user ? "Messages" : "Login to view messages"}
            >
                {/* Message icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M4 4H20V16H5.17L4 17.17V4Z"
                        stroke="#333"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="message-popup-label">Message</span>
                {user && dummyMessages.length > 0 && (
                    <div className="message-popup-badge">{dummyMessages.length}</div>
                )}
            </button>

            {isOpen && user && (
                <div className="message-popup-popup">
                    <div className="message-popup-header">Messages</div>
                    <ul className="message-popup-list">
                        {dummyMessages.map(msg => (
                            <li
                                key={msg.id}
                                className="message-popup-item"
                                onClick={() => alert(`Open chat with ${msg.senderName}`)}
                            >
                                <img src={msg.senderAvatar}
                                     alt={msg.senderName}
                                     className="message-popup-avatar"/>
                                <div className="message-popup-content">
                                    <div className="message-popup-sender">{msg.senderName}</div>
                                    <div className="message-popup-text">{msg.text}</div>
                                    <div className="message-popup-time">{msg.time}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="message-popup-footer">
                        <a href="/messages" className="message-popup-view-all">View all messages</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedInMessagePopup;