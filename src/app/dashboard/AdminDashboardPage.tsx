// src/app/dashboard/components/AdminDashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchUserMe } from '@/api/userapi';
import './styles/AdminDashboardPage.css';
import AdminMovieEditor from './components/AdminMovieEditor';
import './styles/AdminSidebar.css';

import AdminStats  from './components/AdminStats';
import AdminUserEditor from './components/AdminUserEditor';
// type Tab = 'stats' | 'movie-editor' | 'user-editor';

interface Tab {
    name: string,
    component: React.FC
}

const TABS: Tab[] = [
    {
        name: "İstatistikler",
        component: AdminStats
    },
    {
        name: "Film Düzenle",
        component: AdminMovieEditor
    },
    {
        name: "Manage Users",
        component: AdminUserEditor
    },
]

const AdminDashboardPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);

    useEffect(() => {
        (async () => {
            try { await fetchUserMe(); }
            catch { /* empty */ }
            setLoading(false);
        })();
    }, []);

    if (loading) return <div className="admin-loading">Yükleniyor…</div>;

    return (
        <main className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-dashboard__wrap">

            <nav className="admin-sidebar">
                {TABS.map((tab)=>(
                <button
                    className={tab == activeTab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab.name}
                </button>
                ))}
            </nav>

            <section className="admin-dashboard__content">
                {< activeTab.component />}
            </section>

            </div>
        </main>
    );
};

export default AdminDashboardPage;
