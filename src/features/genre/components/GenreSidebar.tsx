// src/features/genre/components/GenreSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './GenreSidebar.css';

interface Props {
    genres: string[];
    selected?: string;
}

export const GenreSidebar: React.FC<Props> = ({ genres, selected }) => (
    <aside className="genre-sidebar">
        <h3>Genres</h3>
        <ul>
            {genres.map(g => (
                <li key={g}>
                    <Link
                        to={`/genres/${g}`}
                        className={g === selected ? 'active' : ''}
                    >
                        {g}
                    </Link>
                </li>
            ))}
        </ul>
    </aside>
);
