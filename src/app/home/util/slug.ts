import { FrontMovie } from "@/types/front";

export function createSlug(movie: FrontMovie): string {
  const slugifiedTitle = movie.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${slugifiedTitle}-${movie.movieId}`;
}
  
export function movieIdFromSlug(slug: string): number | null {
  const idPart = slug.split('-').pop(); // Take the last part after the last hyphen
  const id = Number(idPart);
  if (isNaN(id)) {
    return null;
  }
  return id;
}

export function movieToSlug(movie: FrontMovie): string {
    let slug = createSlug(movie);
    return `/movies/${slug}`
}
