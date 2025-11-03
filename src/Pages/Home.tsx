import { Button } from "@mui/material";
import { MovieCard } from "../components/MovieCard";
import { getPopularMovies } from "../services/movieService";
import { useEffect, useState } from "react";
import type { PopularMovie } from "../types/movieServiceTypes";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState<PopularMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  const posterBaseUrl = "https://image.tmdb.org/t/p/original";
  const [randomImg, setRandomImg] = useState<string>("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError(null);

        const data = await getPopularMovies();

        if (data.length > 0) {
          const randomImgIndex = Math.floor(Math.random() * 5) + 1;
          setRandomImg(`${posterBaseUrl + data[randomImgIndex].backdrop_path}`);
        }

        setMovies(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch popular movies: ", err);
        setIsError(t("home_error_loading_movies"));
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <DefaultLayout backgroundImg={randomImg} isImgLoading={isLoading}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div
              id="Home-Container"
              className="p-12 flex flex-col justify-center items-center pt-10 "
            >
              <div className="gap-0 pb-12 justify-center items-center z-10">
                <div>{t("home_welcome_message")}</div>
                <div>{t("home_sub_welcome_message")}</div>
              </div>

              <Link to={"/discover"}>
                <Button variant="contained">
                  {t("home_show_more_button")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-center mt-6 text-2xl font-bold z-10">
            {t("home_grid_title")}
          </div>
          {isLoading ?? <div>{t("home_loading_movies")}</div>}
          {isError && <div>{isError}</div>}
          <div className="flex flex-col  items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5  gap-6 mt-6 px-16 pb-8">
              {movies.slice(0, 5).map((movie) => (
                <MovieCard
                  isLoading={isLoading}
                  backdrop_path={movie.backdrop_path}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  key={movie.id}
                  id={movie.id}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </DefaultLayout>
    </>
  );
}
