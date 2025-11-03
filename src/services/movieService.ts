import type {
  MovieDetails,
  PopularMovie,
  ReviewsList,
  SearchResponse,
  VideoDetails,
} from "../types/movieServiceTypes";
import api from "./api";

export async function getPopularMovies(): Promise<PopularMovie[]> {
  try {
    const response = await api.get("/movie/popular");
    return response.data.results as PopularMovie[];
  } catch (error) {
    console.error("Error while searching popular movies: ", error);
    throw error;
  }
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data as MovieDetails;
  } catch (error) {
    console.error("Error while getting movie details: ", error);
    throw error;
  }
}

export async function getMovies(text: string): Promise<SearchResponse> {
  try {
    const response = await api.get(`/search/movie?query=${text}`);
    return response.data;
  } catch (error) {
    console.error("Error while searching movie", error);
    throw error;
  }
}

export async function getReviews(id: number): Promise<ReviewsList> {
  try {
    const response = await api.get(`/movie/${id}/reviews`);
    return response.data as ReviewsList;
  } catch (error) {
    console.error("Error loading recommendations", error);
    throw error;
  }
}

export async function getVideos(id: number): Promise<VideoDetails> {
  try {
    const response = await api.get(`/movie/${id}/videos`);
    return response.data.results[0] as VideoDetails;
  } catch (error) {
    console.error("Error loading trailers", error);
    throw error;
  }
}

export async function getDiscover(
  sortBy: string = "popularity.desc",
  genres?: number,
  page: number = 1
): Promise<SearchResponse> {
  const genresQuery = genres !== 0 ? "&with_genres=" + genres : "";
  try {
    const response = await api.get(
      `/discover/movie?sort_by=${sortBy}&page=${page}${genresQuery}`
    );
    return response.data as SearchResponse;
  } catch (error) {
    console.error("Error searching for movies", error);
    throw error;
  }
}
