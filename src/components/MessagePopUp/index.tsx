import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { useAuth } from '@/app/auth/hooks/AuthContext';
import ChatPanel from '../Message';
import {useNavigate} from "react-router-dom";

interface Message {
    id: string;
    senderName: string;
    senderAvatar: string;
    text: string;
    time: string;
}

// Demo amaçlı mesajlar
const dummyMessages: Message[] = [
    { id: '1', senderName: 'Emilia', senderAvatar: 'https://pa1.aminoapps.com/6327/5686466cc20763220339b8d4aca424bca5c3aaf5_128.gif', text: 'Harika, projeyi gözden geçirelim.', time: '10:05 AM' },
    { id: '2', senderName: 'Subaru',     senderAvatar: 'https://media1.tenor.com/m/XOLX8LL_AbUAAAAC/rezero-subaru-rezero-season-3.gif', text: 'Çarşamba uygun mu?', time: '9:17 AM' },
    { id: '3', senderName: 'Rem', senderAvatar: 'https://media1.tenor.com/m/hr-tm5gQFwYAAAAC/happy-anime.gif', text: 'Çok teşekkürler!', time: 'Yesterday' }
];

const LinkedInMessagePopup: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSelectedId(null);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleButtonClick = () => {
        if (!user) {
            navigate('/login/');
            return;
        }
        setIsOpen(o => !o);
        if (isOpen) setSelectedId(null);
    };

    return (
        <div
            className={`message-popup-container${isOpen ? ' open' : ''}`}
            ref={containerRef}
        >
            <button className="message-popup-button" onClick={handleButtonClick}>
                {/* ikon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20V16H5.17L4 17.17V4Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="message-popup-label">Message</span>
                {dummyMessages.length > 0 && (
                    <div className="message-popup-badge">{dummyMessages.length}</div>
                )}
            </button>

            {isOpen && (
                <div className="message-popup-popup">
                    <div className="message-list">
                        <div className="message-popup-header">Messages</div>
                        <ul className="message-popup-list">
                            {dummyMessages.map(msg => (
                                <li
                                    key={msg.id}
                                    className={`message-popup-item${selectedId === msg.id ? ' selected' : ''}`}
                                    onClick={() => setSelectedId(msg.id)}
                                >
                                    <img src={msg.senderAvatar} alt={msg.senderName} className="message-popup-avatar" />
                                    <div className="message-popup-content">
                                        <div className="message-popup-sender">{msg.senderName}</div>
                                        <div className="message-popup-text">{msg.text}</div>
                                        <div className="message-popup-time">{msg.time}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="chat-panel-wrapper">
                        {selectedId
                            ? <ChatPanel chatId={selectedId} />
                            : <div className="chat-placeholder">Sohbet seçin</div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedInMessagePopup;
