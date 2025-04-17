// import * as React from "react";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "../../components/ui/carousel.tsx";
// import { movies, Movie } from '../../components/utils/image_urls.ts';
//
// import {HomeCard} from "../../components/ui/HomeCard.tsx";
//
// // Utility function to shuffle the movies array
// const shuffleArray = <T,>(array: T[]): T[] => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
// };
//
//
// // Main MovieCarousel component that uses the MovieCard component
// export function MovieCarousel() {
//     const [shuffledMovies] = React.useState<Movie[]>(() => shuffleArray(movies));
//     const displayedMovies = shuffledMovies.slice(0, 5);
//
//     return (
//         <Carousel
//             opts={{ align: "start" }}
//             className="relative w-full h-full px-10 py-4"
//         >
//             <p className="font-bold text-xl mb-4">Top Rated Movies</p>
//             <CarouselContent>
//                 {displayedMovies.map(movie => (
//                     <CarouselItem key={movie.id} className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
//                         <div className="p-2">
//                             Movie {movie.id + 1}
//                             <HomeCard{...movie} />
//                         </div>
//                     </CarouselItem>
//                 ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
//             <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
//         </Carousel>
//     );
// }
