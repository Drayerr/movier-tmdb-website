import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface DetailsSkeletonProps {
  isLoading: boolean;
}
export default function DetailsSkeleton({ isLoading }: DetailsSkeletonProps) {
  return (
    <>
      {!isLoading ? (
        <div className="flex justify-center gap-4 text-2xl">
          <SentimentVeryDissatisfiedIcon fontSize="large" /> MOVIE NOT FOUND
        </div>
      ) : (
        <div className="mx-auto w-full p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="w-40 h-60 rounded-2xl bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 max-w-60 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="col-span-2 h-2 w-full rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 w-full rounded bg-gray-200"></div>
                <div className="h-2 w-full rounded bg-gray-200"></div>
                <div className="h-2 w-full rounded bg-gray-200"></div>
                <div className="h-2 w-full rounded bg-gray-200"></div>
                <div className="h-2 w-full rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
