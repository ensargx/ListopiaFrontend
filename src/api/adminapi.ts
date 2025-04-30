// src/app/api/adminapi.ts
import { apiFetch, BASE_URL } from './apiClient';
import { Movie } from "@/types/movie";

// Mevcut: GET ile film getiriyor
// export async function fetchAdminMovieById(id: number): Promise<Movie> {
//     const res = await apiFetch(`${BASE_URL}api/v1/admin/movies/${id}`, {
//         method: "GET",
//         credentials: 'include'
//     });
//     if (!res.ok) throw new Error('Film getirilemedi');
//     return res.json();
// }

// 1) Admin DB’ye PUT ile güncelleme
export async function updateAdminMovieById(id: number, data: Movie): Promise<Movie> {
    const res = await apiFetch(`${BASE_URL}api/v1/admin/movies/${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Film güncelleme başarısız');
    return res.json();
}

// 2) Dış kaynaktan (TMDB vb.) çekip DB’yi yenileyen endpoint
export async function fetchExternalAdminMovieById(id: number): Promise<Movie> {
    const res = await apiFetch(`${BASE_URL}api/v1/admin/movies/${id}/fetch`, {
        method: "PUT",
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Dış kaynaktan çekme başarısız');
    return res.json();
}
