import React from 'react';
import './PlaylistList.css';

interface Playlist {
    id: string;
    name: string;
    count: number;
}

const mockLists: Playlist[] = [
    { id: '1', name: 'Favorites', count: 12 },
    { id: '2', name: 'Watchlist', count: 8 },
    { id: '3', name: 'Top Rated', count: 20 },
];

const PlaylistList: React.FC = () => (
    <aside className="playlist-list">
        <h3>Popular Film Lists</h3>
        <ul>
            {mockLists.map(l => (
                <li key={l.id}>
                    <a href="#">{l.name} ({l.count})</a>
                </li>
            ))}
        </ul>
    </aside>
);

export default PlaylistList;
