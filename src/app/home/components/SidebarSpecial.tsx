import React, { useEffect, useState } from 'react';
import { fetchFrontMovies } from '@/api/movieapi';
import { FrontMovie } from '@/types/front';
import { Link } from 'react-router-dom';
import '../style/SidebarSpecial.css';

export const SidebarSpecial: React.FC = () => {
    const [movies, setMovies] = useState<FrontMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFrontMovies({
            sortBy: 'popularity',
            sortOrder: 'dsc',
            pageSize: 5,           // sidebar’da sadece 5 tane göster
        })
            .then(res => setMovies(res.content))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="sidebar-popular">
            <h3>Special Movies</h3>
            {loading ? (
                <div className="loading">Loading…</div>
            ) : (
                <ul>
                    {movies.map(m => (
                        <li key={m.movieId}>
                            <Link to={`/movies/${m.movieId}`} className="item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${m.poster}`}
                                    alt={m.title}
                                />
                                <span>{m.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SidebarSpecial;
