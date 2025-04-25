import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/home/components/CardSlider.tsx
import { useRef } from 'react';
import './CardSlider.css';
export function CardSlider({ items, renderItem }) {
    const sliderRef = useRef(null);
    const scroll = (offset) => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };
    return (_jsxs("div", { className: "card-slider", children: [_jsx("button", { className: "nav prev", onClick: () => scroll(-300), children: "\u2039" }), _jsx("div", { className: "slider-container", ref: sliderRef, children: items.map((item, i) => (_jsx("div", { className: "card", children: renderItem(item) }, i))) }), _jsx("button", { className: "nav next", onClick: () => scroll(300), children: "\u203A" })] }));
}
