import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { movies } from '@/components/utils/image_urls';
// Generic Fisher–Yates shuffle algorithm
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
export default function ResetPosterFlow() {
    const [startPosition, setStartPosition] = useState(0);
    const [shuffledImages, setShuffledImages] = useState([]);
    useEffect(() => {
        // Random starting position between 0 and 100
        const randomStart = Math.floor(Math.random() * 100);
        setStartPosition(randomStart);
        // Extract image URLs from the movie objects
        const movieImageUrls = movies.map((movie) => movie.url);
        // Create three sets of shuffled images for a longer loop
        const firstSet = shuffleArray(movieImageUrls);
        const secondSet = shuffleArray(movieImageUrls);
        const thirdSet = shuffleArray(movieImageUrls);
        // Combine the three shuffled sets
        setShuffledImages([...firstSet, ...secondSet, ...thirdSet]);
    }, []);
    // Calculate a dynamic width for each image based on the number of movies.
    // Original formula: 60 / (movies.length / 4) == (60 * 4) / movies.length
    const imageWidthPercentage = `${(60 * 4) / movies.length}%`;
    return (_jsx("div", { style: { overflow: 'hidden', width: '100%' }, children: _jsx(motion.div, { style: { display: 'flex' }, initial: { x: `-${startPosition}%` }, animate: { x: [`-${startPosition}%`, `-${startPosition + 100}%`] }, transition: {
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
            }, children: shuffledImages.map((src, index) => (_jsx("img", { src: src, alt: `Poster ${index + 1}`, width: 500, height: 750, className: "px-2", style: {
                    width: imageWidthPercentage,
                } }, index))) }) }));
}
