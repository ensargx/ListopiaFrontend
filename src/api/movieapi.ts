// src/app/api.ts
import { Movie } from '@/types/movie';
import { FrontMovie, PagedResponse } from '@/types/front';
import { CrewMember, CastMember } from '@/types/crew';
import { Comment } from '@/types/movie';

// proxy kullanımı için başına “/” koyuyoruz
const BASE_URL = 'https://api.ensargok.com/api';

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

export async function fetchTopRatedMovies(
    language: string = 'en'
): Promise<FrontMovie[]> {
    const res = await fetch(
        `${BASE_URL}/movies/top-rated?language=${language}`
    );
    if (!res.ok) throw new Error('Failed to fetch top rated');
    return res.json();
}

export async function fetchTrendingGenres(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/genres/trending`);
    if (!res.ok) throw new Error('Failed to fetch trending genres');
    return res.json();
}

export async function fetchFrontMovies(
    options: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: 'popularity' | 'ratingAverage' | "releaseDate";
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

export async function searchFrontMovies(
    options: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: 'popularity' | 'ratingAverage';
        sortOrder?: 'dsc' | 'asc';
        genre?: string;
        language?: string;
        word: string;
    }
): Promise<PagedResponse<FrontMovie>> {
    const {
        pageNumber = 0,
        pageSize = 20,
        sortBy = 'popularity',
        sortOrder = 'dsc',
        genre,
        language = 'en',
        word,
    } = options;

    if (!word.trim()) throw new Error('Search word is required');

    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        sortBy,
        sortOrder,
        language,
        word,
    });
    if (genre) params.append('genre', genre);

    const res = await fetch(
        `${BASE_URL}/movies/front/search?${params.toString()}`
    );
    if (!res.ok) throw new Error('Failed to search front movies');
    return res.json();
}


export async function fetchMovieCrews(
    movieId: number,
    options: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: string;
        sortOrder?: string;
    } = {}
): Promise<PagedResponse<CrewMember>> {
    const {
        pageNumber = 0,
        pageSize = 30,
        sortBy = 'popularity',
        sortOrder = 'dsc',
    } = options;
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        sortBy,
        sortOrder,
    });
    const res = await fetch(
        `${BASE_URL}/movies/${movieId}/crews?${params.toString()}`
    );
    if (!res.ok) throw new Error('Failed to fetch movie crews');
    return res.json();
}

export async function fetchMovieCasts(
    movieId: number,
    options: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: string;
        sortOrder?: string;
    } = {}
): Promise<PagedResponse<CastMember>> {
    const {
        pageNumber = 0,
        pageSize = 30,
        sortBy = 'popularity',
        sortOrder = 'dsc',
    } = options;
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        sortBy,
        sortOrder,
    });
    const res = await fetch(
        `${BASE_URL}/movies/${movieId}/casts?${params.toString()}`
    );
    if (!res.ok) throw new Error('Failed to fetch movie casts');
    return res.json();
}

export async function fetchMovieComments(
    movieId: number,
    pageNumber: number = 0,
    pageSize: number = 30
): Promise<{ content: Comment[], totalPages: number, totalElements: number }> {
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
    });

    const res = await fetch(`${BASE_URL}/movies/${movieId}/comment?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch movie comments');

    const data = await res.json();

    // Returning relevant data from the response
    return {
        content: data.content || [],  // Ensure content is an array, default to empty array
        totalPages: data.totalPages || 0,  // Handle totalPages if not in the response
        totalElements: data.totalElements || 0  // Handle totalElements if not in the response
    };
}


// Submit a new comment for a movie
export async function submitMovieComment(
    movieId: number,
    userUUID: string,
    message: string,
    isSpoiler: boolean
): Promise<Comment> {
    // Construct the query parameters as per the API documentation
    const params = new URLSearchParams({
        message: message,  // Message in the query string
        isSpoiler: isSpoiler.toString(),  // Convert isSpoiler to a string (query parameter)
    });

    const response = await fetch(`${BASE_URL}/movies/${movieId}/comment?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure that cookies are sent if needed
        body: JSON.stringify({
            userUUID, // Only userUUID is sent in the body
            sentAtTimestampSeconds: Math.floor(Date.now() / 1000), // Current timestamp
        }),
    });

    if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Failed to submit comment:', errorResponse);
        throw new Error(`Failed to submit comment: ${errorResponse}`);
    }

    return response.json();
}


