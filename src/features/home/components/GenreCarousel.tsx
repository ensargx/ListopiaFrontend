import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { movies } from "@/components/utils/image_urls";

export function GenreCarousel() {
    return (
        <div className="px-2">
            <p className="font-bold text-xl mb-4">Trending Genres</p>
            <Carousel opts={{ align: "start" }}>
                <CarouselContent>
                    {movies.slice(5, 13).map((movie, index) => (
                        <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
                            <div className="p-2">
                                <img
                                    src={movie.url}
                                    alt={`Genre ${index + 1}`}
                                    className="rounded-md shadow-md"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    );
}
