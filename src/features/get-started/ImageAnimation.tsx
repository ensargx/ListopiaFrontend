import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { movies, Movie } from '@/components/utils/image_urls';

// Generic Fisher–Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function ResetPosterFlow() {
    const [startPosition, setStartPosition] = useState<number>(0);
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);

    useEffect(() => {
        // Random starting position between 0 and 100
        const randomStart = Math.floor(Math.random() * 100);
        setStartPosition(randomStart);

        // Extract image URLs from the movie objects
        const movieImageUrls = movies.map((movie: Movie) => movie.url);

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

    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.div
                style={{ display: 'flex' }}
                initial={{ x: `-${startPosition}%` }}
                animate={{ x: [`-${startPosition}%`, `-${startPosition + 100}%`] }}
                transition={{
                    duration: 20,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
            >
                {shuffledImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Poster ${index + 1}`}
                        width={500}
                        height={750}
                        className="px-2"
                        style={{
                            width: imageWidthPercentage,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
