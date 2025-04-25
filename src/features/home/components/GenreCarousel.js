import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { movies } from "@/components/utils/image_urls";
export function GenreCarousel() {
    return (_jsxs("div", { className: "px-2", children: [_jsx("p", { className: "font-bold text-xl mb-4", children: "Trending Genres" }), _jsxs(Carousel, { opts: { align: "start" }, children: [_jsx(CarouselContent, { children: movies.slice(5, 13).map((movie, index) => (_jsx(CarouselItem, { className: "sm:basis-1/2 md:basis-1/4 lg:basis-1/6", children: _jsx("div", { className: "p-2", children: _jsx("img", { src: movie.url, alt: `Genre ${index + 1}`, className: "rounded-md shadow-md" }) }) }, index))) }), _jsx(CarouselPrevious, { className: "absolute left-0 top-1/2 -translate-y-1/2 z-10" }), _jsx(CarouselNext, { className: "absolute right-0 top-1/2 -translate-y-1/2 z-10" })] })] }));
}
