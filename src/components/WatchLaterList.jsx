import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Error from "./Error";
import EmptyMsg from "./EmptyMsg";

export default function WatchLaterList({ onSelectedId }) {
  const db = getDatabase();

  const currentUserData = useSelector((state) => state.user.userInfo);

  const [watchedAnimeList, setWatchedAnimeList] = useState([]);

  useEffect(() => {
    onValue(ref(db, "watchLater/"), (snapshot) => {
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
          <EmptyMsg message="Your watch later list is empty" />
        )
      ) : (
        <EmptyMsg message="Please Login to see your watch later list" />
      )}
    </div>
  );
}

function WatchedAnime({ animeData, db, onSelectedId }) {
  const [animeDetails, setAnimeDetails] = useState({});
  const [error, setError] = useState("");

  const handleRemoveAnime = function (itemId) {
    confirm("Anime will be removed from watch later. Proceed ?") &&
      remove(ref(db, "watchLater/", itemId));
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
              className="w-24"
              src={animeDetails.images?.webp.image_url}
              alt={`${animeDetails.title} cover`}
            />
            <div className="flex flex-col justify-evenly gap-y-2">
              <h3 className="text-2xl font-medium">
                {animeDetails.title_english || animeDetails.title}
              </h3>
              <div className="flex gap-x-8 text-lg font-medium text-slate-300">
                <p>{releaseYear ? `📆 ${releaseYear}` : "⛔ Not Found"}</p>
                <p className="flex items-center">
                  <span className="mr-2 rounded-[4px] bg-blue-700 px-2 py-1 text-[0.8rem] font-bold leading-none text-white">
                    score
                  </span>
                  {animeDetails.score}
                </p>
              </div>
            </div>
          </div>

          <button
            className="mr-4 p-2 text-2xl text-red-500 duration-150 hover:text-red-700"
            onClick={() => handleRemoveAnime(animeData.itemId)}
          >
            <ImCross />
          </button>
        </div>
      )}
    </div>
  );
}
