import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserMe } from '@/api/userapi';
import { User } from '@/types/user';
import { fetchAdminMovieById } from '@/api/adminapi';

import './styles/DashboardPage.css';
import {Movie} from "@/types/movie";

type Tab = 'stats' | 'movie-editor';

const DashboardPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [tab, setTab] = useState<Tab>('stats');

    // film edit için
    const [movieIdInput, setMovieIdInput] = useState('');
    const [movieData, setMovieData] = useState<Movie | null>(null);
    const [loadingMovie, setLoadingMovie] = useState(false);

    const navigate = useNavigate();

    // admin-giriş + rol kontrol
    useEffect(() => {
        fetchUserMe()
            .then(u => {
                if (u.role !== 'ADMIN') {
                    navigate('/', { replace: true });
                } else {
                    setUser(u);
                }
            })
            .catch(() => navigate('/', { replace: true }))
            .finally(() => setLoading(false));
    }, [navigate]);

    // film getir
    const handleFetchMovie = async () => {
        if (!movieIdInput) return;
        setLoadingMovie(true);
        setMovieData(null);
        try {
            const fm = await fetchAdminMovieById(Number(movieIdInput));
            setMovieData(fm);
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setLoadingMovie(false);
        }
    };

    if (loading) return <div>Yükleniyor…</div>;

    return (
        <main>
            <h1>Admin Dashboard</h1>
            <div className="admin-container">
                {/* --- Sol Menü --- */}
                <nav className="sidebar">
                    <ul>
                        <li
                            className={tab === 'stats' ? 'active' : ''}
                            onClick={() => setTab('stats')}
                        >
                            📊 Genel İstatistik
                        </li>
                        <li
                            className={tab === 'movie-editor' ? 'active' : ''}
                            onClick={() => setTab('movie-editor')}
                        >
                            🎬 Film Düzenle
                        </li>
                    </ul>
                </nav>

                {/* --- Sağ İçerik --- */}
                <div className="content">
                    {tab === 'stats' && (
                        <div>
                            <h2>Genel İstatistik Placeholder</h2>
                            <p>Buraya ileride grafik veya sayılar gelecek.</p>
                        </div>
                    )}

                    {tab === 'movie-editor' && (
                        <div>
                            <h2>Film Düzenleme</h2>
                            <div style={{ marginBottom: '1rem' }}>
                                <input
                                    type="number"
                                    placeholder="Movie ID"
                                    value={movieIdInput}
                                    onChange={e => setMovieIdInput(e.target.value)}
                                />
                                <button
                                    onClick={handleFetchMovie}
                                    disabled={loadingMovie}
                                    style={{ marginLeft: '0.5rem' }}
                                >
                                    {loadingMovie ? 'Yükleniyor…' : 'Getir'}
                                </button>
                            </div>

                            {movieData && (
                                <form className="movie-form">
                                    <label>Original Title</label>
                                    <input
                                        value={movieData.originalTitle}
                                        onChange={e =>
                                            setMovieData({ ...movieData, originalTitle: e.target.value })
                                        }
                                    />

                                    <label>Title</label>
                                    <input
                                        value={movieData.title}
                                        onChange={e =>
                                            setMovieData({ ...movieData, title: e.target.value })
                                        }
                                    />

                                    <label>Overview</label>
                                    <textarea
                                        value={movieData.overview}
                                        onChange={e =>
                                            setMovieData({ ...movieData, overview: e.target.value })
                                        }
                                    />

                                    <label>Tagline</label>
                                    <input
                                        value={movieData.tagline}
                                        onChange={e =>
                                            setMovieData({ ...movieData, tagline: e.target.value })
                                        }
                                    />

                                    <label>Release Date</label>
                                    <input
                                        type="date"
                                        value={movieData.releaseDate.slice(0,10)}
                                        onChange={e =>
                                            setMovieData({ ...movieData, releaseDate: e.target.value })
                                        }
                                    />

                                    <label>Runtime (dk)</label>
                                    <input
                                        type="number"
                                        value={movieData.runtime}
                                        onChange={e =>
                                            setMovieData({ ...movieData, runtime: Number(e.target.value) })
                                        }
                                    />

                                    {/* ... diğer alanlar da benzer şekilde */}
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                                        <button type="button" disabled>
                                            Güncelle (coming soon)
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
