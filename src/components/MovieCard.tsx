import { toRoundedPercentage } from "../utils/toRoundedPercentage";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface MovieCard {
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  id: number;
  isLoading: boolean;
}

const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

export function MovieCard({
  backdrop_path,
  poster_path,
  vote_average,
  id,
  isLoading,
}: MovieCard) {
  let imgUrl: string | null = null;
  let posterIsString = false;

  if (typeof poster_path === "string") {
    imgUrl = posterBaseUrl + poster_path;
    posterIsString = true;
  }
  if (!posterIsString && typeof backdrop_path === "string") {
    imgUrl = posterBaseUrl + backdrop_path;
  }

  return (
    <div
      className={`group relative p-0 w-40 min-w-40 h-60 flex flex-col justify-end hover:cursor-pointer rounded-md hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden `}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center border-1 border-slate-600 rounded-md">
          <CircularProgress />
        </div>
      ) : (
        <Link to={`/movie/${id}`}>
          {imgUrl === null ? (
            <div className="absolute inset-0 flex justify-center items-center bg-slate-600 ">
              Cover not found
            </div>
          ) : (
            <img
              src={imgUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover z-0   "
            />
          )}
          {vote_average >= 6 ? (
            <div className="absolute top-0 ml-2">
              <span className="absolute inline-flex justify-center items-center size-8 h-full w-full rounded-b-lg bg-green-500 "></span>
              <span className="relative inline-flex justify-center items-center size-8  font-bold  ">
                {toRoundedPercentage(vote_average)}
              </span>
            </div>
          ) : (
            <></>
          )}
        </Link>
      )}
    </div>
  );
}
