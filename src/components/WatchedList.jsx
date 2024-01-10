import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Error from "./Error";
import EmptyMsg from "./EmptyMsg";

export default function WatchedList({ onSelectedId }) {
  const db = getDatabase();

  const currentUserData = useSelector((state) => state.user.userInfo);

  const [watchedAnimeList, setWatchedAnimeList] = useState([]);

  useEffect(() => {
    onValue(ref(db, "watchedList/"), (snapshot) => {
      const tempArr = [];
      snapshot.forEach((item) => {
        item.val().userId === currentUserData?.uid &&
          tempArr.push({ ...item.val(), itemId: item.key });
      });
      setWatchedAnimeList(tempArr);
    });
  }, [db, currentUserData?.uid]);

  return (
    <div className="h-[calc(100%-4rem)] overflow-y-scroll">
      {currentUserData ? (
        watchedAnimeList.length ? (
          watchedAnimeList.map((item, index) => (
            <WatchedAnime
              key={index}
              db={db}
              animeData={item}
              onSelectedId={onSelectedId}
            />
          ))
        ) : (
          <EmptyMsg message="Your watched list is empty" />
        )
      ) : (
        <EmptyMsg message="Please Login to see your watched anime" />
      )}
    </div>
  );
}

function WatchedAnime({ animeData, db, onSelectedId }) {
  const [animeDetails, setAnimeDetails] = useState({});
  const [error, setError] = useState("");

  const handleRemoveAnime = function (itemId) {
    confirm("Anime will be removed from watched list. Proceed ?") &&
      remove(ref(db, "watchedList/", itemId));
  };

  useEffect(() => {
    async function getAnimeDetails() {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${animeData.animeId}`,
        );
        if (!res.ok)
          throw new Error("Something went wrong while loading the data");

        const details = await res.json();
        setAnimeDetails(details.data);
      } catch (err) {
        setError(err.message);
      }
    }
    getAnimeDetails();
  }, [animeData.animeId]);

  const releaseYear = animeDetails.aired?.from?.split("-").at(0);
  return (
    <div>
      {error ? (
        <Error error={error} />
      ) : (
        <div
          className="flex cursor-pointer items-center justify-between border-b-2 border-slate-500 pb-4"
          onClick={() => onSelectedId(animeData.animeId)}
        >
          <div className="flex grow gap-x-6">
            <img
              className="w-20 lg:w-24"
              src={animeDetails.images?.webp.image_url}
              alt={`${animeDetails.title} cover`}
            />
            <div className="flex flex-col justify-evenly gap-y-2">
              <h3 className="text-lg font-medium lg:text-2xl">
                {animeDetails.title_english || animeDetails.title}
              </h3>
              <div className="flex gap-x-4 text-sm font-medium text-slate-300 lg:gap-x-8 lg:text-lg">
                <p className="flex flex-col items-center gap-x-1 sm:flex-row">
                  <span>{releaseYear && "📆"}</span>
                  {releaseYear ? `${releaseYear}` : "⛔ Not Found"}
                </p>
                <p className="flex flex-col items-center sm:flex-row">
                  <span className="rounded-[4px] bg-blue-700 px-2 py-1 text-[0.75rem] font-bold leading-none text-white sm:mr-2 lg:text-[0.8rem]">
                    score
                  </span>
                  {animeDetails.score}
                </p>
                <p className="flex flex-col items-center sm:flex-row">
                  <span>🌟</span> {animeData.userRating}
                </p>
              </div>
            </div>
          </div>

          <button
            className="p-2 text-2xl text-red-500 duration-150 hover:text-red-700 lg:mr-4"
            onClick={() => handleRemoveAnime(animeData.itemId)}
          >
            <ImCross />
          </button>
        </div>
      )}
    </div>
  );
}
