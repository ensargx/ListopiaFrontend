// src/app/api.ts
import { Movie } from '@/types/movie';
import { FrontMovie, PagedResponse } from '@/types/front';

const BASE_URL = 'api/';

export async function fetchMovieById(
    movieId: number,
    language: string = 'en'
): Promise<Movie> {
    const res = await fetch(
        `${BASE_URL}/movies/${movieId}?language=${language}`
    );
    if (!res.ok) throw new Error('Failed to fetch movie');
    return res.json();
}

export async function fetchFrontMovies(
    options: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: 'popularity' | 'ratingAverage';
        sortOrder?: 'dsc' | 'asc';
        genre?: string;
        language?: string;
    } = {}
): Promise<PagedResponse<FrontMovie>> {
    const {
        pageNumber = 0,
        pageSize = 20,
        sortBy = 'popularity',
        sortOrder = 'dsc',
        genre,
        language = 'en',
    } = options;

    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        sortBy,
        sortOrder,
        language,
    });
    if (genre) params.append('genre', genre);

    const res = await fetch(`${BASE_URL}/movies/front?${params}`);
    if (!res.ok) throw new Error('Failed to fetch front movies');
    return res.json();
}
