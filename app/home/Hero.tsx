'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import React from 'react';
import Image from 'next/image';


export default function HeroBanner() {
  return (
    <AspectRatio ratio={16 / 9} className="header opacity-50 blur-sm">
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

