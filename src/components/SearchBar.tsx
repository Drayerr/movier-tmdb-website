import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { SearchedMovieDetails } from "../types/movieServiceTypes";
import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import { useTranslation } from "react-i18next";
import formatDate from "../utils/formatDate";

export function SearchBar() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [movieList, setMovieList] = useState<SearchedMovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [openTable, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const posterBaseUrl = "https://image.tmdb.org/t/p/original";

  function handleOpenTable() {
    setOpen(true);
    setMovieList(movieList);
  }

  function handleCloseTable() {
    setOpen(false);
    setMovieList([]);
  }

  useEffect(() => {
    if (inputValue.length < 2) return;

    async function searchMovieByText() {
      try {
        setIsLoading(true);
        const data = await getMovies(inputValue);
        const list = data.results;

        if (list.length) {
          setMovieList(list);
        }

        if (list.length === 0) {
          setMovieList([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    }

    searchMovieByText();

    if (inputValue.length === 0) {
      setMovieList([]);
    }
  }, [inputValue]);

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Autocomplete
          sx={{
            minWidth: 180,
            width: "100%",
            borderRadius: 12,
            backgroundColor: "#FFF",
            border: "none",
            "& .MuiOutlinedInput-root": {
              border: "none",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          clearOnEscape
          loadingText={
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          }
          noOptionsText={
            inputValue.length >= 2 ? (
              <div className="flex justify-center">
                <h2>{t("nav_bar_search_not_found")}</h2>
              </div>
            ) : (
              <div className="flex justify-center">
                <h2>{t("nav_bar_search_start_typing")}</h2>
              </div>
            )
          }
          open={openTable}
          onOpen={handleOpenTable}
          onClose={handleCloseTable}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={movieList}
          loading={isLoading}
          renderInput={(params) => (
            <div>
              <TextField
                sx={{
                  height: 35,
                  justifyContent: "center",
                  alignContent: "center",
                }}
                placeholder={t("nav_search_placeholder")}
                onChange={(e) => setInputValue(e.target.value)}
                {...params}
              />
            </div>
          )}
          renderOption={(props, option) => {
            const { key } = props;
            return (
              <Link to={`/movie/${option.id}`}>
                <div
                  key={key}
                  className="flex p-2 hover:brightness-90 hover:cursor-pointer"
                >
                  {option.poster_path === null ? (
                    <div className="w-1/4 h-20 text-white mr-2 text-center rounded-md text-sm inset-0 flex justify-center items-center bg-slate-600 ">
                      Cover not found
                    </div>
                  ) : (
                    <img
                      loading="lazy"
                      className="w-1/4 h-1/4 rounded-md mr-2"
                      src={`${posterBaseUrl}${option.poster_path}`}
                      alt=""
                    />
                  )}
                  <div className="flex flex-col justify-center ">
                    <p className="font-bold">{option.title}</p>
                    <p className="text-sm">
                      {currentLanguage === "en"
                        ? option.release_date
                        : formatDate(option.release_date)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
    </>
  );
}
