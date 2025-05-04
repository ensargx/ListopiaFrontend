
import {BASE_URL} from "./apiClient";
import { User } from "@/types/user";
import { FrontMovie } from "@/types/front";
// import { PagedResponse }     from "@/types/front";

const API_URL = BASE_URL + "api/v1/search";


// A direct mapping of Spring’s Page<T> JSON:
export interface SpringPage<T> {
    content:       T[];
    number:        number;        // current page (0-based)
    size:          number;        // pageSize
    totalElements: number;
    totalPages:    number;
    last:          boolean;
    first:         boolean;
    // …plus any other fields you need (sort, pageable), or drop them
}

export interface SearchResponse {
    results: {
        users:  SpringPage<User>;
        movies: SpringPage<FrontMovie>;
    };
}


export enum SearchCategory {
    ALL = 'all',
    USERS = 'users',
    MOVIES = 'movies'
}


export async function searchUsersMovies(
    query: string,
    category: SearchCategory,
    pageNumber = 0,
    pageSize   = 15
): Promise<SearchResponse> {
    const url = new URL(API_URL);
    url.searchParams.set("query",     query);
    url.searchParams.set("category",  category);
    url.searchParams.set("pageNumber", pageNumber.toString());
    url.searchParams.set("pageSize",   pageSize.toString());

    const res = await fetch(url.toString(), { credentials: "include" });
    if (!res.ok) throw new Error("Search failed");

    const json = await res.json();
    const normalize = <T>(p: any): PagedResponse<T> => ({
        content:       p.content || [],
        pageNumber:    p.number     ?? 0,
        pageSize:      p.size       ?? pageSize,
        totalElements: p.totalElements ?? 0,
        totalPages:    p.totalPages ?? 0,
        lastPage:      p.last       ?? true,
    });

    return {
        results: {
            users:  normalize<User>(json.results.users),
            movies: normalize<FrontMovie>(json.results.movies),
        }
    };
}
