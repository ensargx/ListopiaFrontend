// src/app/dashboard/components/AdminStats.tsx
import React, { useState, useEffect } from 'react';
import { fetchAdminStatsAll } from '@/api/adminapi';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    AdminStats,
    MovieStat,
    GenreStat,
    UserStat
} from '@/types/stats';
import '../styles/AdminStats.css';

const COLORS = ['#bb86fc', '#03dac6', '#cf6679', '#3700b3', '#018786'];

const AdminStats: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAdminStatsAll();
                setStats(data);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div className="admin-stats__loading">Yükleniyor…</div>;
    if (error)   return <div className="admin-stats__error">Hata: {error}</div>;
    if (!stats)  return null;

    // sadece ilk 5 elemanı alıyoruz
    const topWatchedMovies = stats.mostWatchedMovies.slice(0, 5);
    const topLikedMovies   = stats.mostLikedMovies.slice(0, 5);
    const topVisitedMovies = stats.mostVisitedMovies.slice(0, 5);

    const topWatchedGenres = stats.mostWatchedGenres.slice(0, 5);
    const topLikedGenres   = stats.mostLikedGenres.slice(0, 5);
    const topVisitedGenres = stats.mostVisitedGenres.slice(0, 5);

    const topUsersByWatched = stats.usersByWatchedListSize.slice(0, 5);
    const topUsersByLiked   = stats.usersByLikedListSize.slice(0, 5);

    return (
        <div className="admin-stats-grid">
            {/* Özet Kartları */}
            <div className="summary-card">
                <h4>Toplam Film</h4>
                <span>{stats.movieCount.toLocaleString()}</span>
            </div>
            <div className="summary-card">
                <h4>Toplam Kullanıcı</h4>
                <span>{stats.userCount.toLocaleString()}</span>
            </div>

            {/* Filmler Çubuk Grafikleri */}
            <section className="chart-card">
                <h3>En Çok İzlenen Filmler</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topWatchedMovies}>
                        <XAxis dataKey="title" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#e0e0e0' }} />
                        <Tooltip />
                        <Bar dataKey="watchCount" fill={COLORS[0]} name="İzlenme" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            <section className="chart-card">
                <h3>En Çok Beğenilen Filmler</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topLikedMovies}>
                        <XAxis dataKey="title" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#e0e0e0' }} />
                        <Tooltip />
                        <Bar dataKey="likeCount" fill={COLORS[1]} name="Beğeni" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            <section className="chart-card">
                <h3>En Çok Ziyaret Edilen Filmler</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topVisitedMovies}>
                        <XAxis dataKey="title" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#e0e0e0' }} />
                        <Tooltip />
                        <Bar dataKey="clickCount" fill={COLORS[2]} name="Tıklama" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            {/* Türler Pasta Grafikleri */}
            <section className="chart-card">
                <h3>En Çok İzlenen Türler</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={topWatchedGenres}
                            dataKey="watchCount"
                            nameKey="name"
                            outerRadius={80}
                            label
                        >
                            {topWatchedGenres.map((genre: GenreStat, idx: number) => (
                                <Cell
                                    key={genre.genreId}
                                    fill={COLORS[idx % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </section>

            <section className="chart-card">
                <h3>En Çok Beğenilen Türler</h3>
                { (
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={topLikedGenres}>
                            <XAxis dataKey="name" tick={{ fill: 'var(--text-main)', fontSize: 12 }} />
                            <YAxis tick={{ fill: 'var(--text-main)' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="likeCount" name="Beğeni" fill={COLORS[1]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) }
            </section>

            <section className="chart-card">
                <h3>En Çok Ziyaret Edilen Türler</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={topVisitedGenres}
                            dataKey="clickCount"
                            nameKey="name"
                            outerRadius={80}
                            label
                        >
                            {topVisitedGenres.map((genre: GenreStat, idx: number) => (
                                <Cell
                                    key={genre.genreId}
                                    fill={COLORS[(idx + 2) % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </section>

            {/* Kullanıcılar Çubuk Grafikleri */}
            <section className="chart-card">
                <h3>En Aktif İzleyen Kullanıcılar</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topUsersByWatched}>
                        <XAxis dataKey="username" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#e0e0e0' }} />
                        <Tooltip />
                        <Bar dataKey="watchedCount" fill={COLORS[3]} name="İzleme" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            <section className="chart-card">
                <h3>En Aktif Beğenen Kullanıcılar</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topUsersByLiked}>
                        <XAxis dataKey="username" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#e0e0e0' }} />
                        <Tooltip />
                        <Bar dataKey="likedCount" fill={COLORS[4]} name="Beğeni" />
                    </BarChart>
                </ResponsiveContainer>
            </section>
        </div>
    );
};

export default AdminStats;
