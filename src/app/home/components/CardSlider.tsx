// src/features/home/components/CardSlider.tsx
import React, { useRef } from 'react';
import '../style/CardSlider.css';

type CardSliderProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
};

export function CardSlider<T>({ items, renderItem }: CardSliderProps<T>) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const scroll = (offset: number) => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    return (
        <div className="card-slider">
            <button className="nav prev" onClick={() => scroll(-300)}>
                ‹
            </button>
            <div className="slider-container" ref={sliderRef}>
                {items.map((item, i) => (
                    <div className="card" key={i}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>
            <button className="nav next" onClick={() => scroll(300)}>
                ›
            </button>
        </div>
    );
}