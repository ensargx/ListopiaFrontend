import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { posters } from '@/components/utils/image_urls';


// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function ResetPosterFlow() {
  const [startPosition, setStartPosition] = useState(0);
  // Fix: Initialize with the correct type
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Random starting position (between 0 and 100)
    const randomStart = Math.floor(Math.random() * 100);
    setStartPosition(randomStart);
    
    // Create three sets of shuffled images for a longer loop
    const firstSet = shuffleArray(posters);
    const secondSet = shuffleArray(posters);
    const thirdSet = shuffleArray(posters);
    
    // Combine the three shuffled sets
    setShuffledImages([...firstSet, ...secondSet, ...thirdSet]);
  }, []);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }} >
      <motion.div
        style={{ display: 'flex' }}
        initial={{ x: `-${startPosition}%` }}
        animate={{ x: [`-${startPosition}%`, `-${startPosition + 100}%`] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }}
      >
        {shuffledImages.map((src, index) => (
          <Image
          key={index} 
          src={src} 
          alt={`Poster ${index + 1}`} 
          width={500} // Add an appropriate width value
          height={750} // Add an appropriate height value
          className="px-2" // Use className instead of style for padding
          style={{ 
            width: `${60/ (posters.length / 4)}%` // You can keep this for percentage-based width
          }} 
        />
        ))}
      </motion.div>
    </div>
  );
}