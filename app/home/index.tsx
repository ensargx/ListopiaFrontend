'use client';

import React from 'react';
import {MovieCarousel} from "@/app/home/MovieCarousel";
import {GenreCarousel} from "@/app/home/GenreCarousel";
import {ListCarousel} from "@/app/home/ListCarousel";
import {Pagination} from "@/components/ui/pagination";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";



export default function Page() {
    return (
        <div className="relative">
            <section className="flex justify-center p-4">
                <div className="w-full max-w-[450px]">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src="https://live.staticflickr.com/4038/4686112993_efe13b4937_h.jpg"
                            alt="header"
                            className="rounded-md object-cover"
                            fill
                        />
                    </AspectRatio>
                </div>
            </section>

            <main className="space-y-8">
                <section>
                    <MovieCarousel />
                    <Pagination />
                </section>

                <section>
                    <GenreCarousel />
                    <Pagination />
                </section>

                <section>
                    <ListCarousel />
                    <Pagination />
                </section>
            </main>
        </div>
    );
}
