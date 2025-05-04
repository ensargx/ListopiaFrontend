
import { PaginatedResponse } from "@/types/friends";
import {BASE_URL} from "./apiClient";
import { User } from "@/types/user";
import { FrontMovie } from "@/types/front";

const API_URL = BASE_URL + "api/v1/search";

export enum SearchCategory {
    ALL = 'all',
    USERS = 'users',
    MOVIES = 'movies'
}

export async function searchUsersMovies(
    query: string, 
    category: SearchCategory
) {
    const url = new URL(`${API_URL}`);
    url.searchParams.append("query", query.toString());
    url.searchParams.append("category", category.toString());
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get received messages");
    }
    const data = await response.json();
    return data;
}
