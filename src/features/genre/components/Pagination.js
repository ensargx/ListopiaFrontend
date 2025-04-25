import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Pagination.css';
export const Pagination = ({ pageNumber, totalPages, onPageChange }) => {
    const getPaginationRange = () => {
        const pageNeighbours = 1; // aktif sayfanın etrafındaki komşu sayfa sayısı
        const totalBlocks = pageNeighbours * 2 + 5; // first, prev‑neigh, current, next‑neigh, last + 2×‘…’
        // eğer sayfa sayısı küçükse direkt tümünü döndür
        if (totalPages <= totalBlocks) {
            return Array.from({ length: totalPages }, (_, i) => i);
        }
        const range = [];
        const left = Math.max(1, pageNumber - pageNeighbours);
        const right = Math.min(totalPages - 2, pageNumber + pageNeighbours);
        range.push(0); // her zaman ilk sayfa
        if (left > 1) {
            range.push('…');
        }
        for (let i = left; i <= right; i++) {
            range.push(i);
        }
        if (right < totalPages - 2) {
            range.push('…');
        }
        range.push(totalPages - 1); // her zaman son sayfa
        return range;
    };
    const paginationRange = getPaginationRange();
    return (_jsxs("div", { className: "pagination", children: [_jsx("button", { disabled: pageNumber <= 0, onClick: () => onPageChange(pageNumber - 1), children: "\u2039 Prev" }), paginationRange.map((p, idx) => (_jsx("button", { disabled: typeof p === 'string', className: p === pageNumber ? 'active' : '', onClick: () => typeof p === 'number' && onPageChange(p), children: typeof p === 'string' ? p : p + 1 }, `pagination-${String(p)}-${idx}`))), _jsx("button", { disabled: pageNumber >= totalPages - 1, onClick: () => onPageChange(pageNumber + 1), children: "Next \u203A" })] }));
};
