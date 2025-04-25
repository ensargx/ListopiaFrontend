// src/app/utils.ts
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
export const PLACEHOLDER_POSTER = '/not-found.jpg';
// public/images altında koyduğunuz placeholder
export function getPosterUrl(poster) {
    if (!poster) {
        return PLACEHOLDER_POSTER;
    }
    return poster.startsWith('http')
        ? poster
        : `${IMAGE_BASE_URL}${poster}`;
}
