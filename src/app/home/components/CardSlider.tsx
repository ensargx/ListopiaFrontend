import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import '../style/CardSlider.css';

type CardSliderProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
};

export function CardSlider<T>({
                                  items,
                                  renderItem,
                                  className,
                              }: CardSliderProps<T>) {
    const sliderRef = useRef<HTMLDivElement>(null);
    // Start with the initial items, and we'll keep appending the head of `items`
    const [loadedItems, setLoadedItems] = useState<T[]>(items);
    const showNav = items.length > 1;

    // Basic smooth scroll
    const scroll = (offset: number) => {
        sliderRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
    };

    // Always scroll forward 300px; never jump back to start
    const next = () => scroll(300);

    // Infinite‐scroll handler: when you're near the end, append the original items
    const handleScroll = () => {
        const container = sliderRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        // if within 50px of the right edge, append another batch
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
            setLoadedItems(prev => [
                ...prev,
                ...items, // append the entire original list again
            ]);
        }
    };

    useEffect(() => {
        const container = sliderRef.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [items]);

    return (
        <div className={clsx('card-slider', className)}>
            {showNav && (
                <button className="nav prev" onClick={() => scroll(-300)}>
                    ‹
                </button>
            )}

            <div className="slider-container" ref={sliderRef}>
                {loadedItems.map((item, i) => (
                    <div className="card" key={i}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>

            {showNav && (
                <button className="nav next" onClick={next}>
                    ›
                </button>
            )}
        </div>
    );
}
