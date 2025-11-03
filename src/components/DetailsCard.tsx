import type { MovieDetails } from "../types/movieServiceTypes";
import ReactPlayer from "react-player";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface DetailsCardProps
  extends Pick<MovieDetails, "overview" | "genres" | "original_title"> {
  bgOpacity: number;
  posterImg: string;
  videoId: string;
}

export default function DetailsCard({
  bgOpacity,
  genres,
  original_title,
  overview,
  posterImg,
  videoId,
}: DetailsCardProps) {
  return (
    <div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div
          className={`group relative p-0 w-40 min-w-60 h-80 flex flex-col justify-end  overflow-hidden rounded-2xl `}
        >
          <img
            src={posterImg}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover z-0 opacity-${
              bgOpacity * 2
            } transition-transform duration-300 ease-in-out group-hover:scale-105`}
          />
        </div>
        <div className="w-full justify-center">
          <div className=" h-full liquid-glass rounded-2xl overflow-hidden">
            {videoId !== "" ? (
              <ReactPlayer
                width="100%"
                height="100%"
                controls
                autoPlay
                src={`https://www.youtube.com/watch?v=${videoId}`}
              />
            ) : (
              <div className="flex flex-col w-full h-full justify-center items-center">
                <SentimentVeryDissatisfiedIcon fontSize="large" />
                <p className="text-2xl font-bold">VIDEO NOT FOUND</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-4xl mb-2 font-bold">{original_title}</div>
        <div className="flex gap-2 mb-4">
          {genres.map((genre) => (
            <div
              className="border-amber-50 border-1 px-2 liquid-glass font-bold"
              key={genre.id}
            >
              {genre.name}
            </div>
          ))}
        </div>
        <div>{overview}</div>
      </div>
    </div>
  );
}
