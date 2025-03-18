'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import React from 'react';
import Image from 'next/image';


function HeroBanner() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        width={800}
        height={20}
        src="https://live.staticflickr.com/4038/4686112993_efe13b4937_h.jpg"
        alt="header"
        className="h-100 w-full rounded object-cover"
      />
    </AspectRatio>
  );
}

export default function Hero() {
  return (
    <HeroBanner/>
     
  );
}
