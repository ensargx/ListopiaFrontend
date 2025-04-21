// src/features/genre/components/SearchBar.tsx
import React from 'react';
import './SearchBar.css';

interface Props {
    value: string;
    onChange: (v: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => (
    <div className="search-bar">
        <input
            type="text"
            placeholder="Search movies..."
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    </div>
);
