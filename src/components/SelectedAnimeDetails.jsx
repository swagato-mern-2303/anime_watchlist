import { useEffect, useState } from "react";
import Error from "./Error";
import Loader from "./Loader";
import { TiArrowBack } from "react-icons/ti";
import StarRating from "./StarRating";

export default function SelectedAnimeDetails({ selectedId, onSelectedId }) {
  const [animeDetails, setAnimeDetails] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const handleWatchLater = function () {
    console.log("handlewatchlater");
  };
  const handleAddToWatchList = function () {
    console.log("handleAddToWatchList");
  };

  useEffect(() => {
    async function getAnimeDetails() {
      try {
        setIsLoading(true);

        const res = await fetch(`https://api.jikan.moe/v4/anime/${selectedId}`);
        if (!res.ok)
          throw new Error("Something went wrong while loading the data");

        const details = await res.json();
        setAnimeDetails(details.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getAnimeDetails();
  }, [selectedId]);

  const genres = animeDetails.genres?.map((item) => item.name).join(" , ");
  const aired = animeDetails.aired?.string.split(" to ").at(0);
  const producers = animeDetails.producers
    ?.map((item) => item.name)
    .join(" , ");
  const licensors = animeDetails.licensors
    ?.map((item) => item.name)
    .join(" , ");

  return (
    <div className="h-full overflow-y-scroll">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="pb-6 md:pb-10">
          <div className="flex flex-col items-center rounded-lg bg-bg-color-lighter pb-4 shadow-lg sm:flex-row sm:pb-0">
            <img
              className="w-48"
              src={animeDetails.images?.webp.image_url}
              alt={`${animeDetails.title} image`}
            />
            <div className="mt-2 sm:hidden ">
              <BackButton onClick={onSelectedId} />
            </div>
            <div className="ml-8 mr-4 flex grow flex-col gap-y-4 [&>p]:font-medium">
              <h3 className="text-center text-4xl font-medium sm:text-start">
                {animeDetails.title_enlish || animeDetails.title}
              </h3>
              <p>
                {aired} &bull; {animeDetails.episodes}{" "}
                {animeDetails.episodes > 1 ? "episodes" : "episode"}
              </p>
              <p>
                <em>{genres}</em>
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  Rating: ⭐ {animeDetails.popularity}
                </span>
                &bull;
                <span className="mx-2 rounded-[4px] bg-blue-700 px-2 py-[2px] text-[0.8rem] font-bold">
                  score
                </span>
                {animeDetails.score}
              </p>
              <p>{animeDetails.rating}</p>
            </div>
            <div className="hidden -translate-x-4 translate-y-2 self-start md:block">
              <BackButton onClick={onSelectedId} />
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-y-4 px-8">
            <div className="w-[280px] self-center rounded-lg bg-bg-color-lighter px-3 py-3 sm:scale-[1.2]">
              <StarRating
                size={18}
                maxRating={10}
                onUserRating={setUserRating}
              />
              {userRating ? (
                <AddtoWatchListButton onClick={handleAddToWatchList} />
              ) : (
                <WatchLaterButton onClick={handleWatchLater} />
              )}
            </div>
            <p className="text-sm">
              <em>{animeDetails.synopsis}</em>
            </p>
            <p>
              <strong>Producers : </strong>
              {producers}
            </p>
            <p>
              <strong>Licensors : </strong>
              {licensors}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      className="rounded-full bg-bg-color p-2 text-lg duration-150 hover:bg-bg-color-darker sm:text-3xl"
      onClick={() => onClick("")}
    >
      <TiArrowBack />
    </button>
  );
}

function WatchLaterButton({ onClick }) {
  return (
    <button
      className="mt-3 w-full rounded-full bg-primary-color py-1 text-sm font-medium duration-200 hover:bg-blue-800"
      onClick={onClick}
    >
      Watch Later
    </button>
  );
}

function AddtoWatchListButton({ onClick }) {
  return (
    <button
      className="mt-3 w-full rounded-full bg-primary-color py-1 text-sm font-medium duration-200 hover:bg-blue-800"
      onClick={onClick}
    >
      + Add to WatchList
    </button>
  );
}
