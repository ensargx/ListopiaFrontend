import { Genre } from './genre';

export interface Movie {
    movieId: number;
    originalLanguage: string;
    originalTitle: string;
    title: string;
    overview: string;
    tagline: string;
    releaseDate: string;
    trailerLink: string;
    runtime: number;
    backdrop: string;
    poster: string;
    logo: string | null;
    genres: Genre[];
    watchCount: number;
    likeCount: number;
    ratingAverage: number;
    ratingCount: number;
    imdbId: string;
    wikidataId: string;
    facebookId: string | null;
    instagramId: string | null;
    twitterId: string | null;
}