import * as React from "react";
import {Card, CardContent, CardDescription} from "../components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel";
import { movies, Movie } from '../components/utils/image_urls';

const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const movieUrls = movies.map((movie: Movie) => movie.url);
const firstSet = shuffleArray(movieUrls);

export function ListCarousel() {
    const [shuffledImages] = React.useState<string[]>(firstSet);
    const displayedImages = shuffledImages.slice(0, 5);

    return (
        <Carousel
            opts={{ align: "start" }}
            className="relative w-full h-full px-10 py-4"
        >
            <p className="font-bold text-xl mb-4">Trending Lists</p>
            <CarouselContent>
                {displayedImages.map((src, index) => (
                    <CarouselItem key={index} className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="p-2">
                            <div>List {index + 1}</div>
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center text-center p-5">
                                    <img
                                        loading="lazy"
                                        src={src}
                                        alt={`Poster ${index + 1}`}
                                        width={200}
                                        height={300}
                                        className="object-cover rounded-md shadow-lg border-gray-900"
                                    />
                                    <CardDescription className="text-xl font-bold mt-2">Liste Başlığı {index + 1}</CardDescription>
                                    <p className="text-gray-600 text-center">
                                        Bu listeyi Orçun yaptı.
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <span className="text-yellow-500">⭐</span>
                                        <span className="ml-1">4.5</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
    );
}
