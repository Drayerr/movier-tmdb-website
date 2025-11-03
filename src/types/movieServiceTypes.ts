export interface PopularMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
}

export interface SearchedMovieDetails {
  adult: false;
  backdrop_path: string | null;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SearchResponse {
  page: number;
  results: SearchedMovieDetails[];
  total_pages: number;
  total_results: number;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}
export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
export interface ReviewsList {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface VideoDetails {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube" | string;
  size: number;
  type: "Trailer" | "Teaser" | "Clip" | "Featurette" | string;
  official: boolean;
  published_at: string;
  id: string;
}
