import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import DefaultLayout from "../layouts/DefaultLayout";
import { getDiscover } from "../services/movieService";
import type { SearchedMovieDetails } from "../types/movieServiceTypes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { genres, orderOptions } from "../data/data";

export function MovieDiscover() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [movies, setMovies] = useState<SearchedMovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [genreFilter, setGenreFilter] = useState<number>(0);
  const [orderFilter, setOrderFilter] = useState<string>("popularity.desc");
  const [maxPages, setMaxPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const [triggerSearch, setTriggerSearch] = useState(0);

  const [movieTitle, setMovieTitle] = useState(t("discover_list"));

  function handleApplyFilters() {
    setTriggerSearch((prev) => prev + 1);
  }

  function setPageBack() {
    if (page <= 1) return;
    setPage(page - 1);
    setTriggerSearch((prev) => prev + 1);
  }
  function setPageForward() {
    if (page >= maxPages) return;
    setPage(page + 1);
    setTriggerSearch((prev) => prev + 1);
  }

  useEffect(() => {
    async function discoverMovies() {
      try {
        setIsLoading(true);
        const movieList = await getDiscover(orderFilter, genreFilter, page);
        if (movieList) {
          setMovies(movieList.results);
          setMaxPages(movieList.total_pages);
          setPage(movieList.page);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    discoverMovies();
  }, [triggerSearch]);

  return (
    <>
      <DefaultLayout>
        <div className="mx-24 w-full p-4 flex justify-center items-center md:items-start flex-col md:flex-row gap-8 ">
          <div className="liquid-glass h-40 w-56 rounded-md ">
            <div className="liquid-glass rounded-t-md text-center font-bold text-lg">
              {t("discover_filters")}
            </div>
            <div className="px-2 pt-4 gap-4 flex h-full flex-col justify-start">
              <div className="flex gap-2 justify-between w-full items-center">
                <div className="text-sm">{t("discover_genres")}</div>
                <select
                  onChange={(e) => setGenreFilter(Number(e.target.value))}
                  className="bg-slate-700 max-w-32"
                >
                  {genres.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {currentLanguage === "en" ? opt.name : opt.name_br}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-between w-full items-center">
                <div className="text-sm">{t("discover_order")}</div>
                <select
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-slate-700 max-w-32"
                >
                  {orderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {currentLanguage === "en" ? opt.desc : opt.desc_br}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-center w-full items-center ">
                <Button
                  variant="contained"
                  sx={{ paddingY: 0, fontSize: 12 }}
                  onClick={handleApplyFilters}
                >
                  {t("discover_apply_button")}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col liquid-glass rounded-md w-2/3 h-180 justify-between">
            <p className="text-lg font-bold text-center rounded-t-md liquid-glass">
              {movieTitle}
            </p>
            <div className="flex w-full justify-center max-h-1/1 overflow-y-scroll py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <div onMouseOver={() => setMovieTitle(movie.title)}>
                    <MovieCard
                      isLoading={isLoading}
                      backdrop_path={movie.backdrop_path}
                      id={movie.id}
                      poster_path={movie.poster_path}
                      title={movie.title}
                      vote_average={movie.vote_average}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 p-2 border-t-1 border-slate-600">
              <button
                onClick={setPageBack}
                disabled={page <= 1}
                className="hover:cursor-pointer"
              >
                <ArrowBackIosIcon
                  sx={page <= 1 ? { color: "#afb1b2" } : { color: "#3594d4" }}
                />
              </button>
              {t("discover_page")} {page}
              <button
                onClick={setPageForward}
                disabled={page >= maxPages}
                className="hover:cursor-pointer"
              >
                <ArrowForwardIosIcon
                  sx={
                    page >= maxPages
                      ? { color: "#afb1b2" }
                      : { color: "#3594d4" }
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
