// src/app/dashboard/components/AdminMovieEditor.tsx
import React, { useState } from 'react';
import {
    fetchExternalAdminMovieById,
    updateAdminMovieById,
} from '@/api/adminapi';
import { Movie } from '@/types/movie';
import { toast } from 'react-toastify';
import '../styles/AdminMovieEditor.css';

const AdminMovieEditor: React.FC = () => {
    const [idInput, setIdInput] = useState('');
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchMovie = async () => {
        if (!idInput) return;
        setLoading(true);
        setMovie(null);
        try {
            const fetched = await fetchExternalAdminMovieById(Number(idInput));
            setMovie(fetched);
            toast.success('Veri kaynaktan çekildi');
        } catch (e) {
            alert((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const saveMovie = async () => {
        if (!movie) return;
        try {
            const updated = await updateAdminMovieById(movie.movieId, movie);
            setMovie(updated);
            toast.success('Film başarıyla güncellendi');
        } catch (e) {
            alert((e as Error).message);
        }
    };

    const handleChange = <K extends keyof Omit<Movie, 'movieId'>>(
        field: K,
        value: string
    ) => {
        if (!movie) return;
        setMovie({
            ...movie,
            [field]: value,
        } as Movie);
    };

    return (
        <div className="admin-movie-editor">
            <h2>Film Düzenle</h2>

            <div className="controls">
                <input
                    type="number"
                    placeholder="Movie ID"
                    value={idInput}
                    onChange={e => setIdInput(e.target.value)}
                />
                <button onClick={fetchMovie} disabled={loading}>
                    {loading ? 'Yükleniyor…' : 'Çek'}
                </button>
            </div>

            {movie && (
                <form className="movie-form" onSubmit={e => e.preventDefault()}>
                    <div className="form-row">
                        <label>Movie ID</label>
                        <input type="number" value={movie.movieId} disabled />
                    </div>

                    <div className="form-row">
                        <label>Başlık</label>
                        <input
                            type="text"
                            value={movie.title}
                            onChange={e => handleChange('title', e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label>Orijinal Başlık</label>
                        <input
                            type="text"
                            value={movie.originalTitle}
                            onChange={e => handleChange('originalTitle', e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label>Dil</label>
                        <input
                            type="text"
                            value={movie.originalLanguage}
                            onChange={e =>
                                handleChange('originalLanguage', e.target.value)
                            }
                        />
                    </div>

                    <div className="form-row">
                        <label>Özet</label>
                        <textarea
                            value={movie.overview}
                            onChange={e => handleChange('overview', e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label>Tagline</label>
                        <input
                            type="text"
                            value={movie.tagline}
                            onChange={e => handleChange('tagline', e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label>Çıkış Tarihi</label>
                        <input
                            type="date"
                            value={movie.releaseDate}
                            onChange={e => handleChange('releaseDate', e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label>Fragman Linki</label>
                        <input
                            type="url"
                            value={movie.trailerLink || ''}
                            onChange={e => handleChange('trailerLink', e.target.value)}
                        />
                    </div>

                    <div className="actions">
                        <button type="button" onClick={saveMovie}>
                            Kaydet
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AdminMovieEditor;
