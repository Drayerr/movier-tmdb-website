import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getReviews,
  getVideos,
} from "../services/movieService";
import {
  type MovieDetails,
  type Review,
  type VideoDetails,
} from "../types/movieServiceTypes";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailsCard from "../components/DetailsCard";

import EditNoteIcon from "@mui/icons-material/EditNote";
import ReviewCard from "../components/ReviewCard";
import DetailsSkeleton from "../components/skeletons/DetailsSkeleton";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = Number(id);

  console.log(movieId);

  const [details, setDetails] = useState<MovieDetails>();
  const [reviewList, setReviewsList] = useState<Review[]>([]);
  const [video, setVideo] = useState<VideoDetails>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);

        const [details, reviewList, video] = await Promise.all([
          getMovieDetails(movieId),
          getReviews(movieId),
          getVideos(movieId),
        ]);

        setDetails(details);

        if (reviewList.results) {
          setReviewsList(reviewList.results);
        }
        if (video) {
          setVideo(video);
        }
      } catch (error) {
        console.error(
          "An error has occurred while getting movie details: ",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
    setBgOpacity(20);
  }, [id]);

  const posterBaseUrl = "https://image.tmdb.org/t/p/original/";
  const backdropImg = `${posterBaseUrl}${details?.backdrop_path}`;
  const posterImg = `${posterBaseUrl}${details?.poster_path}`;

  return (
    <>
      <DefaultLayout backgroundImg={backdropImg} isImgLoading={isLoading}>
        <div
          id="content-holder"
          className="z-10 flex flex-col gap-6 justify-center mx-24 w-2/3 p-4 rounded-2xl liquid-glass mb-12"
        >
          {!details ? (
            <DetailsSkeleton isLoading={isLoading} />
          ) : (
            <>
              <DetailsCard
                bgOpacity={bgOpacity}
                genres={details.genres}
                original_title={details.original_title}
                overview={details.overview}
                posterImg={posterImg}
                videoId={video ? video.key : ""}
              />
              <div className="liquid-glass w-full" />
              <div className="flex gap-2 items-center">
                <EditNoteIcon fontSize="large" />
                <h1 className="text-xl">Users Reviews:</h1>
              </div>
              {reviewList.map((review) => (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  author={review.author}
                  author_details={review.author_details}
                  content={review.content}
                  created_at={review.created_at}
                  updated_at=""
                  url=""
                />
              ))}
            </>
          )}
        </div>
      </DefaultLayout>
    </>
  );
}
