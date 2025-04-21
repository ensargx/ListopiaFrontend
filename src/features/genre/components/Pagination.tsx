// src/features/genre/components/Pagination.tsx
import React from 'react';
import './Pagination.css';

interface Props {
    pageNumber: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}

export const Pagination: React.FC<Props> = ({
                                                pageNumber,
                                                totalPages,
                                                onPageChange
                                            }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i);
    return (
        <div className="pagination">
            <button
                disabled={pageNumber <= 0}
                onClick={() => onPageChange(pageNumber - 1)}
            >
                ‹ Prev
            </button>
            {pages.map(p => (
                <button
                    key={p}
                    className={p === pageNumber ? 'active' : ''}
                    onClick={() => onPageChange(p)}
                >
                    {p + 1}
                </button>
            ))}
            <button
                disabled={pageNumber >= totalPages - 1}
                onClick={() => onPageChange(pageNumber + 1)}
            >
                Next ›
            </button>
        </div>
    );
};
