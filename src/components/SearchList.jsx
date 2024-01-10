import EmptyMsg from "./EmptyMsg";

export default function SearchList({ searchAnimeList, onSelectAnime }) {
  return (
    <div className="flex h-[calc(100%-4rem)] flex-col gap-y-4 overflow-y-scroll md:h-full">
      {searchAnimeList.length ? (
        searchAnimeList.map((item, index) => (
          <Anime key={index} data={item} onSelectAnime={onSelectAnime} />
        ))
      ) : (
        <EmptyMsg message="Search for anime" />
      )}
    </div>
  );
}

function Anime({ data, onSelectAnime }) {
  const releaseYear = data.aired.from?.split("-").at(0);

  const handleSelectAnime = function () {
    onSelectAnime(data.mal_id);
  };
  return (
    <div
      className="cursor-pointer border-b-2 border-slate-500 pb-4"
      onClick={handleSelectAnime}
    >
      <div className="flex items-center gap-x-6">
        <img
          className="w-16"
          src={data.images.webp.small_image_url}
          alt={`${data.title} cover`}
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="text-xl font-medium">
            {data.title_english || data.title}
          </h3>
          <p className="text-base text-slate-300">
            {releaseYear ? `📆 ${releaseYear}` : "⛔ Not Found"}
          </p>
        </div>
      </div>
    </div>
  );
}
