// src/app/api/adminapi.ts
import { apiFetch, BASE_URL } from './apiClient';
import {Movie} from "@/types/movie";

// Admin endpoint’inden bir film getirir
export async function fetchAdminMovieById(id: number): Promise<Movie> {
    const res = await apiFetch(`${BASE_URL}api/v1/admin/movies/${id}`, {
        method:"GET",
        credentials: 'include'
    });
    if (!res.ok) {
        throw new Error('Film getirilemedi');
    }
    return res.json();
}

// ileride güncelleme metodu buraya gelecek
// export async function updateAdminMovieById(...) { … }
