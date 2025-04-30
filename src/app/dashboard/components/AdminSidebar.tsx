import React from 'react';
import '../styles/AdminSidebar.css';

type Props = {
    activeTab: 'stats' | 'movie-editor';
    onTabChange: (tab: 'stats' | 'movie-editor') => void;
};

const AdminSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => (
    <nav className="admin-sidebar">
        <button
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => onTabChange('stats')}
        >
            İstatistikler
        </button>
        <button
            className={activeTab === 'movie-editor' ? 'active' : ''}
            onClick={() => onTabChange('movie-editor')}
        >
            Film Düzenle
        </button>
    </nav>
);

export default AdminSidebar;
