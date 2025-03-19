'use client';
import * as React from "react";
import Image from 'next/image';
import {Card, CardAction, CardContent} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { posters } from '@/components/utils/image_urls';

const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const firstSet = shuffleArray(posters);


export function MovieCarousel() {
    const [shuffledImages] = React.useState<string[]>(firstSet);

    const displayedImages = shuffledImages.slice(0, 5);


    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="relative w-full h-full px-10 py-4"
        >
            <p className="font-bold text-xl mb-4">Top Rated Movies</p>
            <CarouselContent>
                {displayedImages.map((src, index) => (
                    <CarouselItem key={index} className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="p-2">
                            Movie {index + 1}
                            <Card>

                                <CardContent className="flex flex-col items-center p-5">
                                    <Image
                                        loading="lazy"
                                        src={src}
                                        alt={`Poster ${index + 1}`}
                                        width={200}
                                        height={300}
                                        className="object-cover rounded-md shadow-lg border-gray-900"
                                    />
                                    <h3 className="text-xl font-bold mt-2">Film Başlığı {index + 1}</h3>
                                    <p className="text-gray-600 text-center">
                                        Bu film hakkında kısa bir açıklama yer alabilir. Örneğin; aksiyon dolu, duygu yüklü ve etkileyici.
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <span className="text-yellow-500">⭐</span>
                                        <span className="ml-1">4.5</span>
                                    </div>
                                </CardContent>
                                <CardAction className="flex items-center gap-5">
                                    <button className="flex items-center px-3 py-2 bg-gray-900 text-white rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="lucide lucide-eye">
                                            <path
                                                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                        Watch Later

                                    </button>
                                    <button className=" flex items-center px-3 py-2 bg-gray-900 text-white rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="lucide lucide-circle-plus">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M8 12h8"/>
                                            <path d="M12 8v8"/>
                                        </svg>
                                        Add to List

                                    </button>
                                </CardAction>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10"/>
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10"/>
        </Carousel>
    );
}
