// src/app/dashboard/components/AdminDashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchUserMe } from '@/api/userapi';
import './styles/AdminDashboardPage.css';
import AdminSidebar from './components/AdminSidebar';
import AdminMovieEditor from './components/AdminMovieEditor';

type Tab = 'stats' | 'movie-editor';

const AdminDashboardPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<Tab>('stats');

    useEffect(() => {
        (async () => {
            try { await fetchUserMe(); }
            catch {}
            setLoading(false);
        })();
    }, []);

    if (loading) return <div className="admin-loading">Yükleniyor…</div>;

    return (
        <main className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-dashboard__wrap">
                <AdminSidebar activeTab={tab} onTabChange={setTab} />
                <section className="admin-dashboard__content">
                    {tab === 'stats' && (
                        <div className="admin-stats">
                            {/* İstatistikleriniz buraya */}
                            İstatistikler burada görünecek.
                        </div>
                    )}
                    {tab === 'movie-editor' && <AdminMovieEditor />}
                </section>
            </div>
        </main>
    );
};

export default AdminDashboardPage;
