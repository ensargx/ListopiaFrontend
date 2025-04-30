// src/app/dashboard/components/AdminSidebar.tsx
import React from 'react';
import '../styles/AdminSidebar.css';

type Props = {
    activeTab: 'stats' | 'movie-editor';
    onTabChange: (t: 'stats'|'movie-editor') => void;
};

const AdminSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => (
    <nav className="admin-sidebar">
        <ul>
            <li
                className={activeTab==='stats' ? 'active' : ''}
                onClick={()=>onTabChange('stats')}
            >İstatistikler</li>
            <li
                className={activeTab==='movie-editor' ? 'active' : ''}
                onClick={()=>onTabChange('movie-editor')}
            >Film Düzenle</li>
        </ul>
    </nav>
);

export default AdminSidebar;
